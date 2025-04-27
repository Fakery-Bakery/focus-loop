/**
 * Creates a task timer with the specified configuration
 */
export function createTaskTimer(config) {
    // Validate config
    if (config.duration <= 0) {
        throw new Error('Timer duration must be greater than zero');
    }
    let state = 'IDLE';
    let remainingTime = config.duration;
    let startTime = null;
    let pausedAt = null;
    let timerId = null;
    const clearTimerInterval = () => {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
    };
    const startInterval = () => {
        // Only start if not already running
        if (timerId !== null)
            return;
        const intervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            remainingTime = Math.max(0, config.duration - elapsed);
            // Call tick callback if provided
            config.onTick?.(remainingTime);
            // Check if timer has completed
            if (remainingTime <= 0) {
                clearTimerInterval();
                state = 'COMPLETED';
                config.onComplete?.();
            }
        }, 1000);
        timerId = intervalId;
    };
    return {
        start: () => {
            if (state !== 'IDLE') {
                return; // Only start from IDLE state
            }
            state = 'RUNNING';
            startTime = Date.now();
            remainingTime = config.duration;
            startInterval();
        },
        pause: () => {
            if (state !== 'RUNNING') {
                return; // Can only pause if running
            }
            clearTimerInterval();
            state = 'PAUSED';
            pausedAt = Date.now();
        },
        resume: () => {
            if (state !== 'PAUSED') {
                return; // Can only resume if paused
            }
            // Adjust startTime to account for the pause duration
            if (startTime !== null && pausedAt !== null) {
                const pauseDuration = Date.now() - pausedAt;
                startTime = startTime + pauseDuration;
                pausedAt = null;
            }
            state = 'RUNNING';
            startInterval();
        },
        reset: () => {
            clearTimerInterval();
            state = 'IDLE';
            remainingTime = config.duration;
            startTime = null;
            pausedAt = null;
        },
        getState: () => state,
        getRemaining: () => remainingTime,
        getElapsed: () => {
            if (startTime === null)
                return 0;
            if (state === 'PAUSED' && pausedAt !== null) {
                // If paused, calculate elapsed time up to the pause point
                return Math.min(config.duration, Math.floor((pausedAt - startTime) / 1000));
            }
            if (state === 'COMPLETED') {
                return config.duration;
            }
            // If running, calculate current elapsed time
            return Math.min(config.duration, Math.floor((Date.now() - startTime) / 1000));
        },
        getDuration: () => config.duration
    };
}
