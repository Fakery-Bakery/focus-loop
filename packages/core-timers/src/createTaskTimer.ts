import { TimerConfig, TimerControls, TimerState } from './types';

/**
 * Creates a task timer with the specified configuration
 */
export function createTaskTimer(config: TimerConfig): TimerControls {
  // This is just a stub - will implement in next phase
  // We're writing tests first (red phase)
  
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
      return config.duration;
    },
    getElapsed: () => {
      return 0;
    },
    getDuration: () => {
      return config.duration;
    }
  };
} 