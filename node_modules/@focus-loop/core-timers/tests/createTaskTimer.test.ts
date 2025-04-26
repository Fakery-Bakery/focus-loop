import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTaskTimer } from '../src/createTaskTimer';
import { TimerConfig, TimerState } from '../src/types';

describe('createTaskTimer', () => {
  let timerConfig: TimerConfig;
  let onCompleteMock: () => void;
  let onTickMock: (remaining: number) => void;

  beforeEach(() => {
    vi.useFakeTimers();
    onCompleteMock = vi.fn();
    onTickMock = vi.fn();
    timerConfig = {
      duration: 60, // 60 seconds
      type: 'TASK',
      onComplete: onCompleteMock,
      onTick: onTickMock,
    };
  });

  it('should create a timer in IDLE state', () => {
    const timer = createTaskTimer(timerConfig);
    expect(timer.getState()).toBe('IDLE');
    expect(timer.getRemaining()).toBe(60);
    expect(timer.getElapsed()).toBe(0);
    expect(timer.getDuration()).toBe(60);
  });

  it('should change to RUNNING state when started', () => {
    const timer = createTaskTimer(timerConfig);
    timer.start();
    expect(timer.getState()).toBe('RUNNING');
  });

  it('should count down correctly', () => {
    const timer = createTaskTimer(timerConfig);
    timer.start();
    
    // Advance timer by 10 seconds
    vi.advanceTimersByTime(10 * 1000);
    
    expect(timer.getRemaining()).toBe(50);
    expect(timer.getElapsed()).toBe(10);
    expect(onTickMock).toHaveBeenCalledTimes(10);
  });

  it('should call onComplete when timer reaches zero', () => {
    const timer = createTaskTimer(timerConfig);
    timer.start();
    
    // Fast-forward to the end
    vi.advanceTimersByTime(60 * 1000);
    
    expect(timer.getState()).toBe('COMPLETED');
    expect(timer.getRemaining()).toBe(0);
    expect(timer.getElapsed()).toBe(60);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('should pause and resume correctly', () => {
    const timer = createTaskTimer(timerConfig);
    timer.start();
    
    // Advance timer by 10 seconds
    vi.advanceTimersByTime(10 * 1000);
    expect(timer.getRemaining()).toBe(50);
    
    // Pause the timer
    timer.pause();
    expect(timer.getState()).toBe('PAUSED');
    
    // Advance timer by 10 more seconds (should not affect remaining time)
    vi.advanceTimersByTime(10 * 1000);
    expect(timer.getRemaining()).toBe(50);
    
    // Resume timer
    timer.resume();
    expect(timer.getState()).toBe('RUNNING');
    
    // Advance timer by 10 more seconds
    vi.advanceTimersByTime(10 * 1000);
    expect(timer.getRemaining()).toBe(40);
  });

  it('should reset correctly', () => {
    const timer = createTaskTimer(timerConfig);
    timer.start();
    
    // Advance timer by 10 seconds
    vi.advanceTimersByTime(10 * 1000);
    expect(timer.getRemaining()).toBe(50);
    
    // Reset the timer
    timer.reset();
    expect(timer.getState()).toBe('IDLE');
    expect(timer.getRemaining()).toBe(60);
    expect(timer.getElapsed()).toBe(0);
  });
}); 