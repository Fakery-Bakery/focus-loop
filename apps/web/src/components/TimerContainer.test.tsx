import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TimerContainer } from './TimerContainer';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the timer
vi.mock('@focus-loop/core-timers', () => {
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

describe('TimerContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders TimerDisplay and TimerControls', () => {
    render(<TimerContainer initialDuration={60} />);
    
    // Should render the time display
    expect(screen.getByText('01:00')).toBeInTheDocument();
    
    // Should render start and reset buttons (IDLE state)
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls timer methods when controls are clicked', () => {
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    const { rerender } = render(<TimerContainer initialDuration={60} />);
    
    // Click start button
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(mockTimer.start).toHaveBeenCalledTimes(1);
    
    // Mock a running state
    mockTimer.getState.mockReturnValue('RUNNING');
    
    // Re-render to update the UI based on the new state
    rerender(<TimerContainer initialDuration={60} />);
    
    // Click pause button
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(mockTimer.pause).toHaveBeenCalledTimes(1);
    
    // Mock a paused state
    mockTimer.getState.mockReturnValue('PAUSED');
    
    // Re-render to update the UI
    rerender(<TimerContainer initialDuration={60} />);
    
    // Click resume button
    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    expect(mockTimer.resume).toHaveBeenCalledTimes(1);
    
    // Click reset button
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(mockTimer.reset).toHaveBeenCalledTimes(1);
  });

  it('updates timer display when time changes', () => {
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    render(<TimerContainer initialDuration={60} />);
    
    // Initial time should be 01:00
    expect(screen.getByText('01:00')).toBeInTheDocument();
    
    // Mock a time update
    mockTimer.getRemaining.mockReturnValue(30);
    
    // Simulate tick callback
    act(() => {
      // Find the onTick callback from the createTaskTimer call
      const createTimerCall = createTaskTimer.mock.calls[0][0];
      createTimerCall.onTick(30);
    });
    
    // Display should update to 00:30
    expect(screen.getByText('00:30')).toBeInTheDocument();
  });

  it('calls onComplete callback when timer finishes', () => {
    const onCompleteMock = vi.fn();
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    render(<TimerContainer initialDuration={60} onComplete={onCompleteMock} />);
    
    // Start the timer
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    
    // Simulate timer completion
    act(() => {
      const createTimerCall = createTaskTimer.mock.calls[0][0];
      createTimerCall.onComplete();
    });
    
    // onComplete should be called
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
    
    // Timer should be in COMPLETED state (only reset button visible)
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });

  it('resets to initial duration when reset is clicked', () => {
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    render(<TimerContainer initialDuration={120} />);
    
    // Initial time should be 02:00
    expect(screen.getByText('02:00')).toBeInTheDocument();
    
    // Start timer and mock a time update
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    
    act(() => {
      const createTimerCall = createTaskTimer.mock.calls[0][0];
      createTimerCall.onTick(45); // 45 seconds remaining
    });
    
    // Display should update to 00:45
    expect(screen.getByText('00:45')).toBeInTheDocument();
    
    // Click reset button
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    
    // Display should reset to initial duration (02:00)
    expect(screen.getByText('02:00')).toBeInTheDocument();
    
    // Timer should be in IDLE state (start button visible)
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    const { container } = render(<TimerContainer initialDuration={60} className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('handles state transitions correctly', () => {
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    const { rerender } = render(<TimerContainer initialDuration={60} />);
    
    // Start -> Running
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(mockTimer.start).toHaveBeenCalledTimes(1);
    
    // In running state, should have pause button
    mockTimer.getState.mockReturnValue('RUNNING');
    rerender(<TimerContainer initialDuration={60} />);
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
    
    // Pause -> Paused
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(mockTimer.pause).toHaveBeenCalledTimes(1);
    
    // In paused state, should have resume button
    mockTimer.getState.mockReturnValue('PAUSED');
    rerender(<TimerContainer initialDuration={60} />);
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
    
    // Resume -> Running
    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    expect(mockTimer.resume).toHaveBeenCalledTimes(1);
    
    // Reset -> Idle
    mockTimer.getState.mockReturnValue('RUNNING');
    rerender(<TimerContainer initialDuration={60} />);
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(mockTimer.reset).toHaveBeenCalledTimes(1);
    
    // In idle state after reset, should have start button
    mockTimer.getState.mockReturnValue('IDLE');
    rerender(<TimerContainer initialDuration={60} />);
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });

  it('skips to completion when skip button is clicked in RUNNING state', () => {
    const onCompleteMock = vi.fn();
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    const { rerender } = render(<TimerContainer initialDuration={60} onComplete={onCompleteMock} />);
    
    // Start the timer
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    
    // Mock running state
    mockTimer.getState.mockReturnValue('RUNNING');
    rerender(<TimerContainer initialDuration={60} onComplete={onCompleteMock} />);
    
    // Check skip button is visible
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
    
    // Click skip button
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    
    // Timer should be in COMPLETED state
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
    
    // Display should show 00:00
    expect(screen.getByText('00:00')).toBeInTheDocument();
    
    // Only reset button should be visible
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });

  it('skips to completion when skip button is clicked in PAUSED state', () => {
    const onCompleteMock = vi.fn();
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    const { rerender } = render(<TimerContainer initialDuration={60} onComplete={onCompleteMock} />);
    
    // Start the timer
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    
    // Mock paused state
    mockTimer.getState.mockReturnValue('PAUSED');
    rerender(<TimerContainer initialDuration={60} onComplete={onCompleteMock} />);
    
    // Check skip button is visible
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
    
    // Click skip button
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    
    // Timer should be in COMPLETED state
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
    
    // Display should show 00:00
    expect(screen.getByText('00:00')).toBeInTheDocument();
    
    // Only reset button should be visible
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });
}); 