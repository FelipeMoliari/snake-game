import { CONFIG } from '../config/gameConfig.js';

export function getRandomPosition(excludePositions = []) {
    let x, y;
    do {
        x = Math.floor(Math.random() * (CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE)) * CONFIG.GRID_SIZE;
        y = Math.floor(Math.random() * (CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE)) * CONFIG.GRID_SIZE;
    } while (excludePositions.some(pos => pos.x === x && pos.y === y));
    
    return { x, y };
}

export function formatScore(score) {
    return score.toString();
}

export function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

export function distance(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function isPositionValid(x, y, excludePositions = []) {
    return x >= 0 && x < CONFIG.CANVAS_WIDTH && 
           y >= 0 && y < CONFIG.CANVAS_HEIGHT &&
           !excludePositions.some(pos => pos.x === x && pos.y === y);
}