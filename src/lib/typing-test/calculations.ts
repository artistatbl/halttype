/**
 * Utility functions for typing test calculations
 * Extracted from components to improve testability and reusability
 */

/**
 * Calculate Words Per Minute (WPM)
 * @param wordsTyped - Number of words typed
 * @param timeElapsed - Time elapsed in minutes
 * @returns Calculated WPM rounded to nearest integer
 */
export function calculateWPM(wordsTyped: number, timeElapsed: number): number {
  if (timeElapsed <= 0) return 0;
  return Math.round(wordsTyped / timeElapsed);
}

/**
 * Calculate typing accuracy percentage
 * @param correctChars - Number of correct characters
 * @param totalChars - Total number of characters typed
 * @returns Accuracy percentage rounded to nearest integer
 */
export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars <= 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

/**
 * Calculate accuracy based on errors
 * @param totalChars - Total number of characters typed
 * @param errorCount - Number of errors made
 * @returns Accuracy percentage rounded to nearest integer
 */
export function calculateAccuracyFromErrors(totalChars: number, errorCount: number): number {
  if (totalChars <= 0) return 100;
  const correctChars = totalChars - errorCount;
  return calculateAccuracy(correctChars, totalChars);
}

/**
 * Convert milliseconds to seconds
 * @param milliseconds - Time in milliseconds
 * @returns Time in seconds
 */
export function millisecondsToSeconds(milliseconds: number): number {
  return milliseconds / 1000;
}

/**
 * Convert seconds to minutes
 * @param seconds - Time in seconds
 * @returns Time in minutes
 */
export function secondsToMinutes(seconds: number): number {
  return seconds / 60;
}

/**
 * Count words in a string
 * @param text - Input text
 * @returns Number of words
 */
export function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * Count completed words based on spaces typed
 * @param userInput - User's input text
 * @returns Number of completed words
 */
export function countCompletedWords(userInput: string): number {
  const words = userInput.split(' ');
  // If input ends with space, all words are completed
  // If input doesn't end with space, exclude the last word as it's still being typed
  return userInput.endsWith(' ') ? words.length - 1 : Math.max(0, words.length - 1);
}

/**
 * Calculate real-time WPM during typing
 * @param userInput - Current user input
 * @param startTime - Test start time in milliseconds
 * @returns Current WPM
 */
export function calculateRealTimeWPM(userInput: string, startTime: number): number {
  const timeElapsed = millisecondsToSeconds(Date.now() - startTime);
  const timeInMinutes = secondsToMinutes(timeElapsed);
  const wordsTyped = countWords(userInput);
  return calculateWPM(wordsTyped, timeInMinutes);
}

/**
 * Calculate real-time accuracy during typing
 * @param userInput - Current user input
 * @param errors - Array of error positions
 * @returns Current accuracy percentage
 */
export function calculateRealTimeAccuracy(userInput: string, errors: number[]): number {
  return calculateAccuracyFromErrors(userInput.length, errors.length);
}

/**
 * Format time for display
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Calculate estimated completion time for word-based tests
 * @param wordsRemaining - Number of words remaining
 * @param currentWPM - Current typing speed in WPM
 * @returns Estimated time in seconds
 */
export function estimateCompletionTime(wordsRemaining: number, currentWPM: number): number {
  if (currentWPM <= 0) return 0;
  return Math.round((wordsRemaining / currentWPM) * 60);
}