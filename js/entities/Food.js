import { CONFIG } from '../config/gameConfig.js';

export class Food {
    constructor() {
        this.respawn();
    }

    respawn(excludePositions = []) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE)) * CONFIG.GRID_SIZE;
            y = Math.floor(Math.random() * (CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE)) * CONFIG.GRID_SIZE;
        } while (excludePositions.some(pos => pos.x === x && pos.y === y));
        
        this.x = x;
        this.y = y;
        this.pulsePhase = 0;
    }

    update() {
    }

    draw(ctx) {
        const centerX = this.x + CONFIG.GRID_SIZE / 2;
        const centerY = this.y + CONFIG.GRID_SIZE / 2;
        const radius = CONFIG.GRID_SIZE / 2;
        
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );
        gradient.addColorStop(0, '#ff00ff');
        gradient.addColorStop(0.7, '#ff0088');
        gradient.addColorStop(1, '#880044');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
    }
}