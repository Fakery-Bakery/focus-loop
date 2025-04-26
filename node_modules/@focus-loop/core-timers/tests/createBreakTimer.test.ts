import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBreakTimer } from '../src/createBreakTimer';
import { TimerConfig } from '../src/types';

describe('createBreakTimer', () => {
  let timerConfig: TimerConfig;
  let onCompleteMock: () => void;
  let onTickMock: (remaining: number) => void;

  beforeEach(() => {
    vi.useFakeTimers();
    onCompleteMock = vi.fn();
    onTickMock = vi.fn();
    timerConfig = {
      duration: 300, // 5 minutes break
      type: 'BREAK',
      onComplete: onCompleteMock,
      onTick: onTickMock,
    };
  });

  it('should create a break timer in IDLE state', () => {
    const timer = createBreakTimer(timerConfig);
    expect(timer.getState()).toBe('IDLE');
    expect(timer.getRemaining()).toBe(300);
    expect(timer.getElapsed()).toBe(0);
    expect(timer.getDuration()).toBe(300);
  });

  it('should transition to RUNNING when started', () => {
    const timer = createBreakTimer(timerConfig);
    timer.start();
    expect(timer.getState()).toBe('RUNNING');
  });

  it('should count down time correctly', () => {
    const timer = createBreakTimer(timerConfig);
    timer.start();
    
    // Advance by 1 minute
    vi.advanceTimersByTime(60 * 1000);
    
    expect(timer.getRemaining()).toBe(240); // 4 minutes left
    expect(timer.getElapsed()).toBe(60);
    expect(onTickMock).toHaveBeenCalledTimes(60); // Called once per second
  });

  it('should call onComplete when timer finishes', () => {
    const timer = createBreakTimer(timerConfig);
    timer.start();
    
    // Complete the full break
    vi.advanceTimersByTime(300 * 1000);
    
    expect(timer.getState()).toBe('COMPLETED');
    expect(timer.getRemaining()).toBe(0);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('should pause and resume correctly', () => {
    const timer = createBreakTimer(timerConfig);
    timer.start();
    
    // Run for 1 minute
    vi.advanceTimersByTime(60 * 1000);
    expect(timer.getRemaining()).toBe(240);
    
    // Pause
    timer.pause();
    expect(timer.getState()).toBe('PAUSED');
    
    // Time passes while paused (shouldn't affect the timer)
    vi.advanceTimersByTime(30 * 1000);
    expect(timer.getRemaining()).toBe(240);
    
    // Resume
    timer.resume();
    expect(timer.getState()).toBe('RUNNING');
    
    // Should continue counting from where it left off
    vi.advanceTimersByTime(60 * 1000);
    expect(timer.getRemaining()).toBe(180);
  });
  
  it('should reset properly', () => {
    const timer = createBreakTimer(timerConfig);
    timer.start();
    
    // Run for a while
    vi.advanceTimersByTime(120 * 1000);
    expect(timer.getRemaining()).toBe(180);
    
    // Reset
    timer.reset();
    expect(timer.getState()).toBe('IDLE');
    expect(timer.getRemaining()).toBe(300);
    expect(timer.getElapsed()).toBe(0);
  });
}); 