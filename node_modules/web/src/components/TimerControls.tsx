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
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  timerState,
  onStart,
  onPause,
  onResume,
  onReset,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {/* Start button - only shown when idle */}
      {timerState === 'IDLE' && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={onStart}
        >
          Start
        </button>
      )}
      
      {/* Pause button - only shown when running */}
      {timerState === 'RUNNING' && (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={onPause}
        >
          Pause
        </button>
      )}
      
      {/* Resume button - only shown when paused */}
      {timerState === 'PAUSED' && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={onResume}
        >
          Resume
        </button>
      )}
      
      {/* Reset button - shown in all states */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}; 