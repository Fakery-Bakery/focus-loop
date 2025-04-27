import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimerDisplay } from './TimerDisplay';
import { describe, it, expect } from 'vitest';

describe('TimerDisplay', () => {
  it('renders 00:00 by default when no props provided', () => {
    render(<TimerDisplay />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('formats single-digit seconds correctly', () => {
    render(<TimerDisplay secondsRemaining={5} />);
    expect(screen.getByText('00:05')).toBeInTheDocument();
  });

  it('formats single-digit minutes correctly', () => {
    render(<TimerDisplay secondsRemaining={65} />);
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('formats double-digit minutes correctly', () => {
    render(<TimerDisplay secondsRemaining={605} />);
    expect(screen.getByText('10:05')).toBeInTheDocument();
  });

  it('updates the display when props change', () => {
    const { rerender } = render(<TimerDisplay secondsRemaining={30} />);
    expect(screen.getByText('00:30')).toBeInTheDocument();
    
    rerender(<TimerDisplay secondsRemaining={15} />);
    expect(screen.getByText('00:15')).toBeInTheDocument();
  });
  
  it('includes proper accessibility attributes', () => {
    render(<TimerDisplay secondsRemaining={125} />);
    
    const timerElement = screen.getByRole('timer');
    expect(timerElement).toBeInTheDocument();
    expect(timerElement).toHaveAttribute('aria-live', 'polite');
    expect(timerElement).toHaveAttribute('aria-atomic', 'true');
    expect(timerElement).toHaveAttribute('aria-label', '02 minutes and 05 seconds remaining');
  });
}); 