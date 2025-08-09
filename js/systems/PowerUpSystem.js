import { CONFIG, POWERUP_TYPES, POWERUP_COLORS } from '../config/gameConfig.js';
import { PowerUp } from '../entities/PowerUp.js';
import { Particle } from '../entities/Particle.js';

export class PowerUpSystem {
    constructor(gameState) {
        this.gameState = gameState;
    }

    spawnPowerUp(snake, food) {
        const types = Object.values(POWERUP_TYPES);
        const type = types[Math.floor(Math.random() * types.length)];
        
        let x, y;
        do {
            x = Math.floor(Math.random() * (CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE)) * CONFIG.GRID_SIZE;
            y = Math.floor(Math.random() * (CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE)) * CONFIG.GRID_SIZE;
        } while (snake.body.some(segment => segment.x === x && segment.y === y) || 
                 (x === food.x && y === food.y));
        
        this.gameState.powerups.push(new PowerUp(x, y, type));
    }

    collectPowerUp(powerup, snake) {
        const endTime = Date.now() + CONFIG.POWERUP_DURATION;
        this.gameState.activePowerups.set(powerup.type, endTime);
        
        // Apply immediate effects
        switch (powerup.type) {
            case POWERUP_TYPES.SHIELD:
                snake.hasShield = true;
                break;
            case POWERUP_TYPES.SHRINK:
                this.applyShrinkEffect(snake);
                break;
        }
        
        this.createParticles(powerup.x, powerup.y, this.getPowerUpColor(powerup.type));
        this.gameState.addScore(5);
    }

    applyShrinkEffect(snake) {
        // Reduz o tamanho da cobra em 2 segmentos (mínimo 1)
        if (snake.body.length > 3) {
            snake.body.splice(-2, 2);
        } else if (snake.body.length > 1) {
            snake.body.splice(-1, 1);
        }
    }

    updateActivePowerUps(snake) {
        this.gameState.activePowerups.forEach((endTime, type) => {
            if (Date.now() > endTime) {
                this.gameState.activePowerups.delete(type);
                if (type === POWERUP_TYPES.SHIELD) {
                    snake.hasShield = false;
                }
            }
        });
    }

    updatePowerUps(deltaTime, snake) {
        this.gameState.powerups = this.gameState.powerups.filter(powerup => {
            const alive = powerup.update(deltaTime);
            
            // Check powerup collision
            const head = snake.body[0];
            if (head.x === powerup.x && head.y === powerup.y) {
                this.collectPowerUp(powerup, snake);
                return false;
            }
            
            return alive;
        });
    }

    getPowerUpColor(type) {
        return POWERUP_COLORS[type] || '#ffffff';
    }

    createParticles(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.gameState.particles.push(new Particle(
                x + CONFIG.GRID_SIZE / 2,
                y + CONFIG.GRID_SIZE / 2,
                color
            ));
        }
    }

    drawPowerUpIndicators(ctx) {
        let y = 10;
        this.gameState.activePowerups.forEach((endTime, type) => {
            const remaining = Math.max(0, endTime - Date.now());
            const progress = remaining / CONFIG.POWERUP_DURATION;
            
            // Background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(10, y, 120, 20);
            
            // Progress bar
            ctx.fillStyle = this.getPowerUpColor(type);
            ctx.fillRect(10, y, 120 * progress, 20);
            
            // Text
            ctx.fillStyle = '#fff';
            ctx.font = '12px Rajdhani';
            ctx.fillText(type.toUpperCase(), 15, y + 15);
            
            y += 25;
        });
    }
}