import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TimerContainer } from './TimerContainer';
import { vi } from 'vitest';

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
    const { getByRole } = render(<TimerContainer initialDuration={60} />);
    
    // Get the imported mock
    const { createTaskTimer } = require('@focus-loop/core-timers');
    const mockTimer = createTaskTimer();
    
    // Click start button
    fireEvent.click(getByRole('button', { name: /start/i }));
    expect(mockTimer.start).toHaveBeenCalledTimes(1);
    
    // Mock a running state
    mockTimer.getState.mockReturnValue('RUNNING');
    
    // Re-render to update the UI based on the new state
    render(<TimerContainer initialDuration={60} />);
    
    // Click pause button
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(mockTimer.pause).toHaveBeenCalledTimes(1);
    
    // Mock a paused state
    mockTimer.getState.mockReturnValue('PAUSED');
    
    // Re-render to update the UI
    render(<TimerContainer initialDuration={60} />);
    
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
}); 