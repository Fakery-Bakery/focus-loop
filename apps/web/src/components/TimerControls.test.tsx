import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimerControls } from './TimerControls';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('TimerControls', () => {
  const mockOnStart = vi.fn();
  const mockOnPause = vi.fn();
  const mockOnResume = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders start and reset buttons in IDLE state', () => {
    render(
      <TimerControls 
        timerState="IDLE"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume/i })).not.toBeInTheDocument();
  });

  it('renders pause and reset buttons in RUNNING state', () => {
    render(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume/i })).not.toBeInTheDocument();
  });

  it('renders resume and reset buttons in PAUSED state', () => {
    render(
      <TimerControls 
        timerState="PAUSED"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
  });

  it('only shows reset button in COMPLETED state', () => {
    render(
      <TimerControls 
        timerState="COMPLETED"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume/i })).not.toBeInTheDocument();
  });

  it('calls the correct callback when buttons are clicked', () => {
    const { rerender } = render(
      <TimerControls 
        timerState="IDLE"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    // Test Start button
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
    
    // Test Pause button
    rerender(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(mockOnPause).toHaveBeenCalledTimes(1);
    
    // Test Resume button
    rerender(
      <TimerControls 
        timerState="PAUSED"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    expect(mockOnResume).toHaveBeenCalledTimes(1);
    
    // Test Reset button (in any state)
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
  
  it('includes proper accessibility attributes', () => {
    render(
      <TimerControls 
        timerState="IDLE"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    // Test container has role="group" and aria-label
    const controlsGroup = screen.getByRole('group');
    expect(controlsGroup).toHaveAttribute('aria-label', 'Timer controls');
    
    // Test buttons have aria labels
    expect(screen.getByRole('button', { name: 'Start timer' })).toHaveAttribute('aria-label', 'Start timer');
    expect(screen.getByRole('button', { name: 'Reset timer' })).toHaveAttribute('aria-label', 'Reset timer');
  });
}); 