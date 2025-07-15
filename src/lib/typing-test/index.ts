/**
 * Typing Test Utilities
 * 
 * This module provides utilities and functions for typing test functionality.
 * Extracted from components to improve testability and reusability.
 */

export {
  calculateWPM,
  calculateAccuracy,
  calculateAccuracyFromErrors,
  millisecondsToSeconds,
  secondsToMinutes,
  countWords,
  countCompletedWords,
  calculateRealTimeWPM,
  calculateRealTimeAccuracy,
  formatTime,
  estimateCompletionTime,
} from './calculations';

// Re-export types if needed
export type {
  // Add any types that need to be exported
} from './calculations';