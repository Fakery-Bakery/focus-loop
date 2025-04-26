"use client";
import React, { useState, useRef, useEffect } from 'react';
import { createTaskTimer, TimerControls, TimerState } from '@focus-loop/core-timers';

export function TimerTest() {
  const [duration, setDuration] = useState<number>(60);
  const [remaining, setRemaining] = useState<number>(duration);
  const [state, setState] = useState<TimerState>('IDLE');
  const timerRef = useRef<TimerControls | null>(null);

  // Reset remaining if duration changes
  useEffect(() => {
    setRemaining(duration);
    setState('IDLE');
    timerRef.current = null;
  }, [duration]);

  const handleStart = () => {
    const timer = createTaskTimer({
      duration,
      type: 'TASK',
      onTick: (rem: number) => setRemaining(rem),
      onComplete: () => setState('COMPLETED')
    });
    timerRef.current = timer;
    setState(timer.getState());
    timer.start();
  };

  const handlePause = () => {
    timerRef.current?.pause();
    setState(timerRef.current?.getState() ?? state);
  };

  const handleResume = () => {
    timerRef.current?.resume();
    setState(timerRef.current?.getState() ?? state);
  };

  const handleReset = () => {
    timerRef.current?.reset();
    setRemaining(duration);
    setState('IDLE');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Task Timer Test</h2>
      <div>
        <label className="mr-2">Duration (s):</label>
        <input
          type="number"
          className="border p-1 w-20"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
        />
      </div>
      <div className="text-lg">State: <strong>{state}</strong></div>
      <div className="text-2xl">Remaining: <strong>{remaining}s</strong></div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={handleStart}>Start</button>
        <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={handlePause}>Pause</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleResume}>Resume</button>
        <button className="px-3 py-1 bg-gray-500 text-white rounded" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
} 