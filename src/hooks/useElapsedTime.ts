import { useState, useEffect, useRef } from 'react';

export interface UseElapsedTimeReturn {
  elapsedTime: number; // in seconds
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  isRunning: boolean;
}

/**
 * Hook for tracking elapsed time during typing tests
 * Used for word-based tests to measure how long it took to complete
 */
export function useElapsedTime(): UseElapsedTimeReturn {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
      setIsRunning(true);
    }
  };

  // Stop the timer
  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  // Reset the timer
  const resetTimer = () => {
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Update elapsed time when running
  useEffect(() => {
    if (isRunning && startTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - (startTimeRef.current || now)) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning
  };
}