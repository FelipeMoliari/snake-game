import { CONFIG, POWERUP_TYPES } from '../config/gameConfig.js';
import { Snake } from '../entities/Snake.js';
import { Food } from '../entities/Food.js';
import { Particle } from '../entities/Particle.js';
import { GameState } from '../systems/GameState.js';
import { PowerUpSystem } from '../systems/PowerUpSystem.js';
import { BackgroundParticles } from '../systems/BackgroundParticles.js';
import { formatScore } from '../utils/helpers.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.backgroundCanvas = document.getElementById('particleCanvas');
        
        this.gameState = new GameState();
        this.snake = new Snake();
        this.food = new Food();
        this.powerUpSystem = new PowerUpSystem(this.gameState);
        this.backgroundParticles = new BackgroundParticles(this.backgroundCanvas);
        
        this.lastTime = 0;
        this.lastMoveTime = 0;
        this.lastPowerUpSpawn = 0;
        
        this.setupCanvas();
        this.setupEventListeners();
        this.updateUI();
        this.gameLoop();
    }

    setupCanvas() {
        this.canvas.width = CONFIG.CANVAS_WIDTH;
        this.canvas.height = CONFIG.CANVAS_HEIGHT;
        
        window.addEventListener('resize', () => {
            this.backgroundParticles.resize();
            this.backgroundParticles.createParticles();
        });
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        document.getElementById('playButton').addEventListener('click', () => {
            const button = document.getElementById('playButton');
            if (button.textContent === 'PLAY AGAIN') {
                this.restartGame();
            } else {
                this.startGame();
            }
        });
        document.getElementById('menuButton').addEventListener('click', () => this.showInstructions());
    }

    handleKeyPress(e) {
        const key = e.key.toLowerCase();
        
        if (key === ' ' || key === 'escape') {
            e.preventDefault();
            this.togglePause();
            return;
        }
        
        if (!this.gameState.isPlaying || this.gameState.isPaused) return;
        
        const directions = {
            'arrowup': { x: 0, y: -CONFIG.GRID_SIZE },
            'w': { x: 0, y: -CONFIG.GRID_SIZE },
            'arrowdown': { x: 0, y: CONFIG.GRID_SIZE },
            's': { x: 0, y: CONFIG.GRID_SIZE },
            'arrowleft': { x: -CONFIG.GRID_SIZE, y: 0 },
            'a': { x: -CONFIG.GRID_SIZE, y: 0 },
            'arrowright': { x: CONFIG.GRID_SIZE, y: 0 },
            'd': { x: CONFIG.GRID_SIZE, y: 0 }
        };
        
        if (directions[key]) {
            e.preventDefault();
            this.snake.changeDirection(directions[key]);
        }
    }

    startGame() {
        this.gameState.isPlaying = true;
        this.gameState.isPaused = false;
        this.hideOverlay();
        this.updateUI();
    }

    togglePause() {
        if (!this.gameState.isPlaying) return;
        this.gameState.isPaused = !this.gameState.isPaused;
        this.updateUI();
    }

    restartGame() {
        this.gameState.reset();
        this.snake.reset();
        this.food.respawn(this.snake.body);
        this.lastTime = 0;
        this.lastMoveTime = 0;
        this.lastPowerUpSpawn = 0;
        this.hideOverlay();
        this.startGame();
    }

    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.backgroundParticles.update();
        this.backgroundParticles.draw();
        
        if (this.gameState.isPlaying && !this.gameState.isPaused) {
            this.update(deltaTime, currentTime);
        }
        
        this.draw();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime, currentTime) {
        if (currentTime - this.lastMoveTime > this.getEffectiveSpeed()) {
            this.snake.update();
            this.lastMoveTime = currentTime;
            
            const head = this.snake.body[0];
            if (head.x === this.food.x && head.y === this.food.y) {
                this.snake.grow();
                this.gameState.addScore(10);
                this.food.respawn(this.snake.body.concat(this.gameState.powerups));
                this.createFoodParticles();
            }
            
            if (this.snake.checkSelfCollision()) {
                if (this.snake.hasShield) {
                    this.snake.hasShield = false;
                    this.gameState.activePowerups.delete(POWERUP_TYPES.SHIELD);
                } else {
                    this.gameOver();
                    return;
                }
            }
            
            if (this.snake.checkWallCollision()) {
                if (this.snake.hasShield) {
                    this.teleportSnake();
                    this.snake.hasShield = false;
                    this.gameState.activePowerups.delete(POWERUP_TYPES.SHIELD);
                } else {
                    this.gameOver();
                    return;
                }
            }
        }
        
        this.powerUpSystem.updateActivePowerUps(this.snake);
        this.powerUpSystem.updatePowerUps(deltaTime, this.snake);
        
        if (currentTime - this.lastPowerUpSpawn > 15000 && Math.random() < CONFIG.POWERUP_SPAWN_CHANCE) {
            this.powerUpSystem.spawnPowerUp(this.snake, this.food);
            this.lastPowerUpSpawn = currentTime;
        }
        
        this.gameState.particles = this.gameState.particles.filter(particle => particle.update());
        
        this.updateUI();
    }

    getEffectiveSpeed() {
        let speed = this.gameState.speed;
        if (this.gameState.activePowerups.has(POWERUP_TYPES.SPEED)) {
            speed *= 0.5;
        }
        if (this.gameState.activePowerups.has(POWERUP_TYPES.SLOW)) {
            speed *= 2;
        }
        return speed;
    }

    teleportSnake() {
        const head = this.snake.body[0];
        
        if (head.x < 0) {
            head.x = CONFIG.CANVAS_WIDTH - CONFIG.GRID_SIZE;
        } else if (head.x >= CONFIG.CANVAS_WIDTH) {
            head.x = 0;
        } else if (head.y < 0) {
            head.y = CONFIG.CANVAS_HEIGHT - CONFIG.GRID_SIZE;
        } else if (head.y >= CONFIG.CANVAS_HEIGHT) {
            head.y = 0;
        }
    }
    
    createFoodParticles() {
        for (let i = 0; i < 8; i++) {
            this.gameState.particles.push(new Particle(
                this.food.x + CONFIG.GRID_SIZE / 2,
                this.food.y + CONFIG.GRID_SIZE / 2,
                '#ff6b6b'
            ));
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);
        
        this.gameState.powerups.forEach(powerup => powerup.draw(this.ctx));
        
        this.gameState.particles.forEach(particle => particle.draw(this.ctx));
        
        this.powerUpSystem.drawPowerUpIndicators(this.ctx);
        
        if (this.gameState.isPaused) {
            this.drawPauseOverlay();
        }
    }

    drawPauseOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = '48px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSED', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2);
        
        this.ctx.font = '16px Rajdhani';
        this.ctx.fillText('Press SPACE or ESC to resume', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2 + 40);
    }

    gameOver() {
        this.gameState.gameOver();
        this.showGameOver();
        this.updateUI();
    }

    updateUI() {
        document.getElementById('currentScore').textContent = formatScore(this.gameState.score);
        document.getElementById('currentLevel').textContent = this.gameState.level;
        
        const highScore = this.gameState.rankings.length > 0 ? this.gameState.rankings[0].score : 0;
        document.getElementById('highScore').textContent = formatScore(highScore);
    }

    showGameOver() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const score = document.getElementById('overlayScore');
        const button = document.getElementById('playButton');
        
        title.textContent = 'GAME OVER';
        score.textContent = `Score: ${formatScore(this.gameState.score)}`;
        button.textContent = 'PLAY AGAIN';
        overlay.classList.add('active');
    }

    showInstructions() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const score = document.getElementById('overlayScore');
        const button = document.getElementById('playButton');
        
        title.textContent = 'INSTRUÇÕES';
        score.innerHTML = `Use as setas (↑↓←→) ou WASD para mover<br>
Colete power-ups especiais:<br>
⚡ Speed Boost - Aumenta velocidade<br>
×2 Double Points - Dobra pontuação<br>
🛡️ Shield - Proteção contra colisões<br>
⏱️ Slow Motion - Reduz velocidade<br>
↓ Shrink - Reduz tamanho da cobra<br><br>
Pressione SPACE para pausar`;
        button.textContent = 'START GAME';
        overlay.classList.add('active');
    }

    hideOverlay() {
        document.getElementById('gameOverlay').classList.remove('active');
    }
}
