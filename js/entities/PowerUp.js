import { CONFIG, POWERUP_COLORS, POWERUP_SYMBOLS } from '../config/gameConfig.js';

export class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.lifetime = 10000;
        this.age = 0;
        this.pulsePhase = 0;
    }

    update(deltaTime) {
        this.age += deltaTime;
        this.pulsePhase += deltaTime * 0.005;
        return this.age < this.lifetime;
    }

    draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.4 + 1;
        const size = CONFIG.GRID_SIZE * pulse;
        const offset = (CONFIG.GRID_SIZE - size) / 2;
        
        const color = POWERUP_COLORS[this.type] || '#ffffff';
        const shadowColor = color;
        
        const gradient = ctx.createRadialGradient(
            this.x + CONFIG.GRID_SIZE / 2, this.y + CONFIG.GRID_SIZE / 2, 0,
            this.x + CONFIG.GRID_SIZE / 2, this.y + CONFIG.GRID_SIZE / 2, size
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '44');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 20;
        ctx.fillRect(this.x + offset, this.y + offset, size, size);
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = '#000';
        ctx.font = '12px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const symbol = POWERUP_SYMBOLS[this.type] || '?';
        ctx.fillText(symbol, this.x + CONFIG.GRID_SIZE / 2, this.y + CONFIG.GRID_SIZE / 2);
    }
}
