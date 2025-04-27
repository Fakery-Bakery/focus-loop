import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TimerContainer } from './TimerContainer';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the core-timers module
vi.mock('@focus-loop/core-timers', () => {
  // Create a mock timer with all required methods
  const mockTimer = {
    start: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    reset: vi.fn(),
    getState: vi.fn().mockReturnValue('IDLE'),
    getRemaining: vi.fn().mockReturnValue(60),
    getElapsed: vi.fn().mockReturnValue(0),
    getDuration: vi.fn().mockReturnValue(60)
  };
  
  return {
    createTaskTimer: vi.fn().mockReturnValue(mockTimer),
    TimerState: {
      IDLE: 'IDLE',
      RUNNING: 'RUNNING',
      PAUSED: 'PAUSED',
      COMPLETED: 'COMPLETED'
    }
  };
});

describe('Timer Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('simulates a complete timer flow: start > pause > resume > reset', async () => {
    const onCompleteMock = vi.fn();
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    const { rerender } = render(
      <TimerContainer 
        initialDuration={60} 
        onComplete={onCompleteMock} 
        title="Test Timer"
      />
    );
    
    // Verify initial state
    expect(screen.getByText('Test Timer')).toBeInTheDocument();
    expect(screen.getByText('Ready to start')).toBeInTheDocument();
    expect(screen.getByText('01:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    
    // Start the timer
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(mockTimer.start).toHaveBeenCalledTimes(1);
    
    // Update mock to represent running state
    mockTimer.getState.mockReturnValue('RUNNING');
    
    // Re-render to reflect state changes
    rerender(
      <TimerContainer 
        initialDuration={60} 
        onComplete={onCompleteMock} 
        title="Test Timer"
      />
    );
    
    // Verify running state
    expect(screen.getByText('Timer running')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    
    // Simulate tick callback for time update
    act(() => {
      const createTimerCall = createTaskTimer.mock.calls[0][0];
      createTimerCall.onTick(45); // 45 seconds remaining
    });
    
    // Verify time update
    expect(screen.getByText('00:45')).toBeInTheDocument();
    
    // Pause the timer
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(mockTimer.pause).toHaveBeenCalledTimes(1);
    
    // Update mock to represent paused state
    mockTimer.getState.mockReturnValue('PAUSED');
    
    // Re-render to reflect state changes
    rerender(
      <TimerContainer 
        initialDuration={60} 
        onComplete={onCompleteMock} 
        title="Test Timer"
      />
    );
    
    // Verify paused state
    expect(screen.getByText('Timer paused')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    
    // Resume the timer
    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    expect(mockTimer.resume).toHaveBeenCalledTimes(1);
    
    // Update mock to represent running state again
    mockTimer.getState.mockReturnValue('RUNNING');
    
    // Re-render to reflect state changes
    rerender(
      <TimerContainer 
        initialDuration={60} 
        onComplete={onCompleteMock} 
        title="Test Timer"
      />
    );
    
    // Verify running state again
    expect(screen.getByText('Timer running')).toBeInTheDocument();
    
    // Simulate completion
    act(() => {
      const createTimerCall = createTaskTimer.mock.calls[0][0];
      createTimerCall.onComplete();
    });
    
    // Verify completion state and callback
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Timer completed')).toBeInTheDocument();
    
    // Reset the timer
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(mockTimer.reset).toHaveBeenCalledTimes(1);
    
    // Verify reset state
    mockTimer.getState.mockReturnValue('IDLE');
    
    // Re-render to reflect state changes
    rerender(
      <TimerContainer 
        initialDuration={60} 
        onComplete={onCompleteMock} 
        title="Test Timer"
      />
    );
    
    // Verify we're back to initial state
    expect(screen.getByText('Ready to start')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByText('01:00')).toBeInTheDocument();
  });
  
  it('tests accessibility features', () => {
    render(<TimerContainer initialDuration={60} title="Accessible Timer" />);
    
    // Test region role with label
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Accessible Timer');
    
    // Test timer role
    expect(screen.getByRole('timer')).toBeInTheDocument();
    
    // Test button a11y
    const startButton = screen.getByRole('button', { name: /start timer/i });
    expect(startButton).toHaveAttribute('aria-label', 'Start timer');
    
    // Test aria-live regions
    const statusElement = screen.getByText('Ready to start');
    expect(statusElement.parentElement).toHaveAttribute('aria-live', 'polite');
  });
}); 