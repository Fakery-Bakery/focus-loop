import React from 'react';

interface TimerDisplayProps {
  /**
   * Number of seconds remaining in the timer
   * @default 0
   */
  secondsRemaining?: number;
}

/**
 * Formats seconds into MM:SS display format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Displays the timer in MM:SS format
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  secondsRemaining = 0 
}) => {
  return (
    <div className="text-4xl font-mono font-bold text-center">
      {formatTime(secondsRemaining)}
    </div>
  );
}; 