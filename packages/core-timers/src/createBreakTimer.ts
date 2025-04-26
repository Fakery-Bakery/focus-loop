import { TimerConfig, TimerControls, TimerState } from './types';
import { createTaskTimer } from './createTaskTimer';

/**
 * Creates a break timer with the specified configuration
 */
export function createBreakTimer(config: TimerConfig): TimerControls {
  // Validate that this is a break timer
  if (config.type !== 'BREAK') {
    throw new Error('Timer type must be BREAK');
  }
  
  // Reuse the task timer implementation with break type
  return createTaskTimer(config);
} 