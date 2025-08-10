import { CONFIG } from '../config/gameConfig.js';

export class GameState {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.speed = CONFIG.INITIAL_SPEED;
        this.isPlaying = false;
        this.isPaused = false;
        this.powerups = [];
        this.activePowerups = new Map();
        this.particles = [];
        this.rankings = this.loadRankings();
    }

    loadRankings() {
        const saved = localStorage.getItem('snakeRankings');
        return saved ? JSON.parse(saved) : [];
    }

    saveRankings() {
        localStorage.setItem('snakeRankings', JSON.stringify(this.rankings));
    }

    addScore(points) {
        const multiplier = this.activePowerups.has('double') ? 2 : 1;
        this.score += points * multiplier;
        
        const newLevel = Math.floor(this.score / 500) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.speed = Math.max(50, CONFIG.INITIAL_SPEED - (this.level - 1) * CONFIG.SPEED_INCREASE);
        }
    }

    gameOver() {
        this.isPlaying = false;
        this.addToRankings(this.score);
    }

    addToRankings(score) {
        this.rankings.push({ score, date: new Date().toLocaleDateString() });
        this.rankings.sort((a, b) => b.score - a.score);
        this.rankings = this.rankings.slice(0, CONFIG.MAX_RANKINGS);
        this.saveRankings();
    }

    reset() {
        this.score = 0;
        this.level = 1;
        this.speed = CONFIG.INITIAL_SPEED;
        this.powerups = [];
        this.activePowerups.clear();
        this.particles = [];
    }
}