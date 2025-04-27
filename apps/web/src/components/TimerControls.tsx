"use client";

import React from 'react';
import { TimerState } from '@focus-loop/core-timers';

interface TimerControlsProps {
  /**
   * Current state of the timer
   */
  timerState: TimerState;
  
  /**
   * Callback for when the start button is clicked
   */
  onStart: () => void;
  
  /**
   * Callback for when the pause button is clicked
   */
  onPause: () => void;
  
  /**
   * Callback for when the resume button is clicked
   */
  onResume: () => void;
  
  /**
   * Callback for when the reset button is clicked
   */
  onReset: () => void;

  /**
   * Callback for when the skip button is clicked
   */
  onSkip?: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  timerState,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}) => {
  return (
    <div 
      className="flex justify-center space-x-4 mt-4"
      role="group"
      aria-label="Timer controls"
    >
      {/* Start button - only shown when idle */}
      {timerState === 'IDLE' && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={onStart}
          aria-label="Start timer"
        >
          Start
        </button>
      )}
      
      {/* Pause button - only shown when running */}
      {timerState === 'RUNNING' && (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={onPause}
          aria-label="Pause timer"
        >
          Pause
        </button>
      )}
      
      {/* Resume button - only shown when paused */}
      {timerState === 'PAUSED' && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={onResume}
          aria-label="Resume timer"
        >
          Resume
        </button>
      )}
      
      {/* Skip button - shown in running and paused states, if onSkip is provided */}
      {(timerState === 'RUNNING' || timerState === 'PAUSED') && onSkip && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={onSkip}
          aria-label="Skip timer"
        >
          Skip
        </button>
      )}
      
      {/* Reset button - shown in all states */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={onReset}
        aria-label="Reset timer"
      >
        Reset
      </button>
    </div>
  );
}; 