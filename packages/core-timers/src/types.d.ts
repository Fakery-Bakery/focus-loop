/**
 * Timer types for Focus-Loop
 */
export type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED';
export type TimerType = 'TASK' | 'PAUSE' | 'BREAK';
export interface TimerConfig {
    /** Duration in seconds */
    duration: number;
    /** Timer type */
    type: TimerType;
    /** Optional callback when timer completes */
    onComplete?: () => void;
    /** Optional callback for timer tick (each second) */
    onTick?: (remainingSeconds: number) => void;
}
export interface RandomPauseConfig {
    /** Minimum pause duration in seconds */
    minDuration: number;
    /** Maximum pause duration in seconds */
    maxDuration: number;
}
export interface TimerControls {
    /** Start the timer */
    start: () => void;
    /** Pause the timer */
    pause: () => void;
    /** Resume from paused state */
    resume: () => void;
    /** Reset timer to initial state */
    reset: () => void;
    /** Get current timer state */
    getState: () => TimerState;
    /** Get remaining time in seconds */
    getRemaining: () => number;
    /** Get elapsed time in seconds */
    getElapsed: () => number;
    /** Get total duration in seconds */
    getDuration: () => number;
}
export interface SessionMetadata {
    /** Session title/task name */
    taskName: string;
    /** Focus note for the session */
    focusNote?: string;
    /** Timestamp when session started */
    startedAt: Date;
    /** Timestamp when session completed (if finished) */
    completedAt?: Date;
    /** Feedback collected at end of session */
    feedback?: string;
}
export interface TimerSession {
    /** Unique session identifier */
    id: string;
    /** Session metadata */
    metadata: SessionMetadata;
    /** Task timer duration in seconds */
    taskDuration: number;
    /** Pause timer configuration */
    pauseConfig: RandomPauseConfig;
    /** Break timer duration in seconds */
    breakDuration: number;
    /** Whether to show the pause timer to user */
    showPauseTimer: boolean;
    /** Whether sound effects are enabled */
    soundEffectsEnabled: boolean;
}
