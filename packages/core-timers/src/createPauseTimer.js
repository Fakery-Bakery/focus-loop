import { createTaskTimer } from './createTaskTimer';
/**
 * Creates a pause timer with randomized duration within the specified range
 */
export function createPauseTimer(config) {
    // Validate config
    if (config.minDuration <= 0) {
        throw new Error('Minimum duration must be greater than zero');
    }
    if (config.maxDuration <= config.minDuration) {
        throw new Error('Maximum duration must be greater than minimum duration');
    }
    // Generate a random duration between min and max
    const randomFactor = Math.random();
    const randomDuration = Math.round(config.minDuration + (randomFactor * (config.maxDuration - config.minDuration)));
    // Create a standard timer with the random duration
    const timerConfig = {
        duration: randomDuration,
        type: 'PAUSE',
        onComplete: config.onComplete,
        onTick: config.onTick
    };
    // Delegate to the task timer implementation
    return createTaskTimer(timerConfig);
}
