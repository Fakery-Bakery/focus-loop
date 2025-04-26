import { TimerControls, TimerState, RandomPauseConfig } from './types';

/**
 * Creates a pause timer with randomized duration within the specified range
 */
export function createPauseTimer(config: RandomPauseConfig): TimerControls {
  // This is just a stub - will implement in next phase
  // We're writing tests first (red phase)
  
  // Generate a random duration between min and max
  const duration = 0; // Will implement random generation later
  
  return {
    start: () => {
      throw new Error('Not implemented');
    },
    pause: () => {
      throw new Error('Not implemented');
    },
    resume: () => {
      throw new Error('Not implemented');
    },
    reset: () => {
      throw new Error('Not implemented');
    },
    getState: (): TimerState => {
      return 'IDLE';
    },
    getRemaining: () => {
      return duration;
    },
    getElapsed: () => {
      return 0;
    },
    getDuration: () => {
      return duration;
    }
  };
} 