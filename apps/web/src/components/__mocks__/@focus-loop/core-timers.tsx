// Mock for core-timers
import { vi } from 'vitest';

export type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED';
export type TimerType = 'TASK' | 'PAUSE' | 'BREAK';

export interface TimerConfig {
  duration: number;
  type: TimerType;
  onComplete?: () => void;
  onTick?: (remainingSeconds: number) => void;
}

export interface TimerControls {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  getState: () => TimerState;
  getRemaining: () => number;
  getElapsed: () => number;
  getDuration: () => number;
}

export const createTaskTimer = (config: TimerConfig): TimerControls => ({
  start: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  reset: vi.fn(),
  getState: vi.fn().mockReturnValue('IDLE'),
  getRemaining: vi.fn().mockReturnValue(config.duration),
  getElapsed: vi.fn().mockReturnValue(0),
  getDuration: vi.fn().mockReturnValue(config.duration)
});

export const createPauseTimer = createTaskTimer;
export const createBreakTimer = createTaskTimer;

export const TIMER_STATE = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

export const TIMER_TYPE = {
  TASK: 'TASK',
  PAUSE: 'PAUSE',
  BREAK: 'BREAK'
}; 