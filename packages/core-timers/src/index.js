// Export all types
export * from './types.js';

// Timer states
export const TIMER_STATE = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

// Timer types
export const TIMER_TYPE = {
  TASK: 'TASK',
  PAUSE: 'PAUSE',
  BREAK: 'BREAK'
};

// Version
export const VERSION = '0.0.1';

// Import and export timer creators
export { createTaskTimer } from './createTaskTimer.js';
export { createPauseTimer } from './createPauseTimer.js';
export { createBreakTimer } from './createBreakTimer.js';
