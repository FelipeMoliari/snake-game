export const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    GRID_SIZE: 20,
    INITIAL_SPEED: 150,
    SPEED_INCREASE: 10,
    POWERUP_SPAWN_CHANCE: 0.4,
    POWERUP_DURATION: 10000,
    MAX_RANKINGS: 10
};

export const POWERUP_TYPES = {
    SPEED: 'speed',
    DOUBLE: 'double',
    SHIELD: 'shield',
    SLOW: 'slow',
    SHRINK: 'shrink'
};

export const POWERUP_COLORS = {
    [POWERUP_TYPES.SPEED]: '#ffff00',
    [POWERUP_TYPES.DOUBLE]: '#00ff00',
    [POWERUP_TYPES.SHIELD]: '#0088ff',
    [POWERUP_TYPES.SLOW]: '#ff0088',
    [POWERUP_TYPES.SHRINK]: '#ff8800'
};

export const POWERUP_SYMBOLS = {
    [POWERUP_TYPES.SPEED]: '⚡',
    [POWERUP_TYPES.DOUBLE]: '×2',
    [POWERUP_TYPES.SHIELD]: '🛡',
    [POWERUP_TYPES.SLOW]: '⏱',
    [POWERUP_TYPES.SHRINK]: '↓'
};