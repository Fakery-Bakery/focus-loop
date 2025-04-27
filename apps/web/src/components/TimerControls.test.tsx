import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimerControls } from './TimerControls';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('TimerControls', () => {
  const mockOnStart = vi.fn();
  const mockOnPause = vi.fn();
  const mockOnResume = vi.fn();
  const mockOnReset = vi.fn();
  const mockOnSkip = vi.fn();

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
        onSkip={mockOnSkip}
      />
    );
    
    expect(screen.getByRole('button', { name: /start timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset timer/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip timer/i })).not.toBeInTheDocument();
  });

  it('renders pause, skip, and reset buttons in RUNNING state', () => {
    render(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    expect(screen.getByRole('button', { name: /pause timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset timer/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume timer/i })).not.toBeInTheDocument();
  });

  it('renders resume, skip, and reset buttons in PAUSED state', () => {
    render(
      <TimerControls 
        timerState="PAUSED"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    expect(screen.getByRole('button', { name: /resume timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset timer/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause timer/i })).not.toBeInTheDocument();
  });

  it('only shows reset button in COMPLETED state', () => {
    render(
      <TimerControls 
        timerState="COMPLETED"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    expect(screen.getByRole('button', { name: /reset timer/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pause timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resume timer/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip timer/i })).not.toBeInTheDocument();
  });

  it('does not render skip button when onSkip is not provided', () => {
    render(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByRole('button', { name: /pause timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset timer/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip timer/i })).not.toBeInTheDocument();
  });

  it('calls the correct callback when buttons are clicked', () => {
    const { rerender } = render(
      <TimerControls 
        timerState="IDLE"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    // Test Start button
    fireEvent.click(screen.getByRole('button', { name: /start timer/i }));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
    
    // Test Pause button
    rerender(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /pause timer/i }));
    expect(mockOnPause).toHaveBeenCalledTimes(1);
    
    // Test Skip button in RUNNING state
    fireEvent.click(screen.getByRole('button', { name: /skip timer/i }));
    expect(mockOnSkip).toHaveBeenCalledTimes(1);
    
    // Test Resume button
    rerender(
      <TimerControls 
        timerState="PAUSED"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /resume timer/i }));
    expect(mockOnResume).toHaveBeenCalledTimes(1);
    
    // Test Skip button in PAUSED state
    fireEvent.click(screen.getByRole('button', { name: /skip timer/i }));
    expect(mockOnSkip).toHaveBeenCalledTimes(2);
    
    // Test Reset button (in any state)
    fireEvent.click(screen.getByRole('button', { name: /reset timer/i }));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
  
  it('includes proper accessibility attributes', () => {
    render(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    // Test container has role="group" and aria-label
    const controlsGroup = screen.getByRole('group');
    expect(controlsGroup).toHaveAttribute('aria-label', 'Timer controls');
    
    // Test buttons have aria labels
    expect(screen.getByRole('button', { name: 'Pause timer' })).toHaveAttribute('aria-label', 'Pause timer');
    expect(screen.getByRole('button', { name: 'Skip timer' })).toHaveAttribute('aria-label', 'Skip timer');
    expect(screen.getByRole('button', { name: 'Reset timer' })).toHaveAttribute('aria-label', 'Reset timer');
  });

  it('supports keyboard navigation', () => {
    render(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    const pauseButton = screen.getByRole('button', { name: /pause timer/i });
    const skipButton = screen.getByRole('button', { name: /skip timer/i });
    const resetButton = screen.getByRole('button', { name: /reset timer/i });
    
    // Verify Tab navigation works
    pauseButton.focus();
    expect(document.activeElement).toBe(pauseButton);
    
    // Simulate pressing Tab
    fireEvent.keyDown(pauseButton, { key: 'Tab', code: 'Tab' });
    
    // Can't directly test the focus movement since JSDOM doesn't fully implement focus,
    // but we can test that the elements are in the tab order
    expect(pauseButton.tabIndex).toBe(0);
    expect(skipButton.tabIndex).toBe(0);
    expect(resetButton.tabIndex).toBe(0);
    
    // Test keyboard activation
    fireEvent.keyDown(skipButton, { key: 'Enter', code: 'Enter' });
    expect(mockOnSkip).toHaveBeenCalledTimes(1);
  });

  it('applies correct button styling based on state', () => {
    const { rerender } = render(
      <TimerControls 
        timerState="IDLE"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    // Start button should have green styling
    const startButton = screen.getByRole('button', { name: /start timer/i });
    expect(startButton).toHaveClass('bg-green-500');
    expect(startButton).toHaveClass('hover:bg-green-600');
    
    // Reset button should have red styling
    const resetButton = screen.getByRole('button', { name: /reset timer/i });
    expect(resetButton).toHaveClass('bg-red-500');
    expect(resetButton).toHaveClass('hover:bg-red-600');
    
    // Pause button should have yellow styling
    rerender(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    const pauseButton = screen.getByRole('button', { name: /pause timer/i });
    expect(pauseButton).toHaveClass('bg-yellow-500');
    expect(pauseButton).toHaveClass('hover:bg-yellow-600');
    
    // Skip button should have blue styling
    const skipButton = screen.getByRole('button', { name: /skip timer/i });
    expect(skipButton).toHaveClass('bg-blue-500');
    expect(skipButton).toHaveClass('hover:bg-blue-600');
  });

  it('ensures all buttons have focus ring for accessibility', () => {
    const { rerender } = render(
      <TimerControls 
        timerState="IDLE"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    // Check all buttons have focus ring classes
    let buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:ring-2');
    });
    
    // Check in different states too
    rerender(
      <TimerControls 
        timerState="RUNNING"
        onStart={mockOnStart}
        onPause={mockOnPause}
        onResume={mockOnResume}
        onReset={mockOnReset}
        onSkip={mockOnSkip}
      />
    );
    
    buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:ring-2');
    });
  });
}); 