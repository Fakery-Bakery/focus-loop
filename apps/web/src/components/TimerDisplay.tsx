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
  const formattedTime = formatTime(secondsRemaining);
  const minutesPart = formattedTime.split(':')[0];
  const secondsPart = formattedTime.split(':')[1];
  
  return (
    <div 
      className="text-4xl font-mono font-bold text-center"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${minutesPart} minutes and ${secondsPart} seconds remaining`}
    >
      {formattedTime}
    </div>
  );
}; 