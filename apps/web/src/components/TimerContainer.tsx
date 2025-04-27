"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createTaskTimer, TimerState } from '@focus-loop/core-timers';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';

interface TimerContainerProps {
  /**
   * Initial duration for the timer in seconds
   * @default 60
   */
  initialDuration?: number;
  
  /**
   * Optional callback when timer completes
   */
  onComplete?: () => void;
  
  /**
   * Optional className for styling the container
   */
  className?: string;
  
  /**
   * Optional title for the timer
   * @default "Focus Timer"
   */
  title?: string;
}

/**
 * Container component that integrates the timer logic with UI components
 */
export const TimerContainer: React.FC<TimerContainerProps> = ({
  initialDuration = 60,
  onComplete,
  className = '',
  title = 'Focus Timer'
}) => {
  // State for time remaining and timer state
  const [remaining, setRemaining] = useState<number>(initialDuration);
  const [timerState, setTimerState] = useState<TimerState>('IDLE');
  
  // Ref to hold timer instance
  const timerRef = useRef<any | null>(null);
  
  // Reset timer if duration changes
  useEffect(() => {
    if (timerState === 'IDLE') {
      setRemaining(initialDuration);
    }
  }, [initialDuration, timerState]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // No explicit cleanup needed for the timer since it uses setInterval
      // that will be automatically cleaned up when the component unmounts
    };
  }, []);
  
  // Timer control handlers
  const handleStart = () => {
    const timer = createTaskTimer({
      duration: initialDuration,
      type: 'TASK',
      onTick: (remainingTime: number) => {
        setRemaining(remainingTime);
      },
      onComplete: () => {
        setTimerState('COMPLETED');
        onComplete?.();
      }
    });
    
    timerRef.current = timer;
    timer.start();
    setTimerState('RUNNING');
  };
  
  const handlePause = () => {
    if (timerRef.current) {
      timerRef.current.pause();
      setTimerState('PAUSED');
    }
  };
  
  const handleResume = () => {
    if (timerRef.current) {
      timerRef.current.resume();
      setTimerState('RUNNING');
    }
  };
  
  const handleReset = () => {
    if (timerRef.current) {
      timerRef.current.reset();
    }
    setRemaining(initialDuration);
    setTimerState('IDLE');
  };
  
  const handleSkip = () => {
    if (timerRef.current) {
      timerRef.current.reset();
    }
    setRemaining(0);
    setTimerState('COMPLETED');
    onComplete?.();
  };
  
  const getStatusText = (): string => {
    switch (timerState) {
      case 'IDLE':
        return 'Ready to start';
      case 'RUNNING':
        return 'Focusing...';
      case 'PAUSED':
        return 'Paused';
      case 'COMPLETED':
        return 'Completed';
      default:
        return '';
    }
  };
  
  return (
    <div className={`p-4 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
      <TimerDisplay secondsRemaining={remaining} />
      <p className="text-center text-gray-600 mt-2">{getStatusText()}</p>
      <TimerControls
        timerState={timerState}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
        onSkip={handleSkip}
      />
    </div>
  );
}; 