import { CONFIG } from '../config/gameConfig.js';

export class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        this.body = [
            { x: CONFIG.GRID_SIZE * 10, y: CONFIG.GRID_SIZE * 10 },
            { x: CONFIG.GRID_SIZE * 9, y: CONFIG.GRID_SIZE * 10 },
            { x: CONFIG.GRID_SIZE * 8, y: CONFIG.GRID_SIZE * 10 }
        ];
        this.direction = { x: CONFIG.GRID_SIZE, y: 0 };
        this.nextDirection = { x: CONFIG.GRID_SIZE, y: 0 };
        this.hasShield = false;
        this.shouldGrow = false;
    }

    update() {
        this.direction = { ...this.nextDirection };
        const head = { ...this.body[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        this.body.unshift(head);
        
        if (!this.shouldGrow) {
            this.body.pop();
        } else {
            this.shouldGrow = false;
        }
    }

    grow() {
        this.shouldGrow = true;
    }

    shrink() {
        this.body.pop();
    }

    checkWallCollision() {
        const head = this.body[0];
        return head.x < 0 || head.x >= CONFIG.CANVAS_WIDTH || 
               head.y < 0 || head.y >= CONFIG.CANVAS_HEIGHT;
    }

    checkSelfCollision() {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    checkCollision() {
        return this.checkWallCollision() || this.checkSelfCollision();
    }

    changeDirection(newDirection) {
        if (newDirection.x !== -this.direction.x || newDirection.y !== -this.direction.y) {
            this.nextDirection = newDirection;
        }
    }

    draw(ctx) {
        this.body.forEach((segment, index) => {
            if (index === 0) {
                const gradient = ctx.createRadialGradient(
                    segment.x + CONFIG.GRID_SIZE / 2, segment.y + CONFIG.GRID_SIZE / 2, 0,
                    segment.x + CONFIG.GRID_SIZE / 2, segment.y + CONFIG.GRID_SIZE / 2, CONFIG.GRID_SIZE
                );
                
                if (this.hasShield) {
                    gradient.addColorStop(0, '#0088ff');
                    gradient.addColorStop(1, '#004488');
                    ctx.shadowColor = '#0088ff';
                    ctx.shadowBlur = 15;
                } else {
                    gradient.addColorStop(0, '#00ffff');
                    gradient.addColorStop(1, '#008888');
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 10;
                }
                
                ctx.fillStyle = gradient;
            } else {
                const alpha = 1 - (index / this.body.length) * 0.5;
                ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 5;
            }
            
            ctx.fillRect(segment.x, segment.y, CONFIG.GRID_SIZE, CONFIG.GRID_SIZE);
        });
        
        ctx.shadowBlur = 0;
    }
}