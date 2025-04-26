import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPauseTimer } from '../src/createPauseTimer';
import { RandomPauseConfig } from '../src/types';

describe('createPauseTimer', () => {
  let pauseConfig: RandomPauseConfig;
  let onCompleteMock: () => void;
  let onTickMock: (remaining: number) => void;
  
  // Save the original Math.random
  const originalRandom = Math.random;

  beforeEach(() => {
    vi.useFakeTimers();
    onCompleteMock = vi.fn();
    onTickMock = vi.fn();
    pauseConfig = {
      minDuration: 30, // 30 seconds
      maxDuration: 90, // 90 seconds
    };
  });

  afterEach(() => {
    // Restore original Math.random
    Math.random = originalRandom;
    vi.restoreAllMocks();
  });

  it('should create a timer with random duration within range', () => {
    // Mock Math.random to return a predictable value (0.5)
    Math.random = vi.fn(() => 0.5);
    
    const timer = createPauseTimer(pauseConfig);
    
    // With a random value of 0.5, we expect the duration to be midway
    // between minDuration (30) and maxDuration (90), which is 60
    expect(timer.getDuration()).toBe(60);
    expect(timer.getState()).toBe('IDLE');
    expect(timer.getRemaining()).toBe(60);
    expect(timer.getElapsed()).toBe(0);
  });

  it('should create a timer with min duration when random is 0', () => {
    // Mock Math.random to return 0
    Math.random = vi.fn(() => 0);
    
    const timer = createPauseTimer(pauseConfig);
    
    expect(timer.getDuration()).toBe(30); // minDuration
    expect(timer.getRemaining()).toBe(30);
  });

  it('should create a timer with max duration when random is 1', () => {
    // Mock Math.random to return 1
    Math.random = vi.fn(() => 0.999999);
    
    const timer = createPauseTimer(pauseConfig);
    
    expect(timer.getDuration()).toBe(90); // maxDuration
    expect(timer.getRemaining()).toBe(90);
  });

  it('should handle fractional durations correctly', () => {
    // Mock with a value that would give a fractional duration
    Math.random = vi.fn(() => 0.33333);
    
    const timer = createPauseTimer(pauseConfig);
    
    // Expected: 30 + (0.33333 * (90 - 30)) = 30 + 20 = 50
    // But we should round to the nearest second
    expect(timer.getDuration()).toBeCloseTo(50, 0);
  });

  it('should start, pause, resume, and complete like regular timers', () => {
    // Fixed duration for this test
    Math.random = vi.fn(() => 0.5);
    
    const timer = createPauseTimer({
      ...pauseConfig,
      onComplete: onCompleteMock,
      onTick: onTickMock,
    });
    
    timer.start();
    expect(timer.getState()).toBe('RUNNING');
    
    // Advance 20 seconds
    vi.advanceTimersByTime(20 * 1000);
    expect(timer.getRemaining()).toBe(40);
    expect(timer.getElapsed()).toBe(20);
    
    // Pause
    timer.pause();
    expect(timer.getState()).toBe('PAUSED');
    
    // Advance while paused (should not change time)
    vi.advanceTimersByTime(10 * 1000);
    expect(timer.getRemaining()).toBe(40);
    
    // Resume and complete
    timer.resume();
    vi.advanceTimersByTime(40 * 1000);
    expect(timer.getState()).toBe('COMPLETED');
    expect(timer.getRemaining()).toBe(0);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
}); 