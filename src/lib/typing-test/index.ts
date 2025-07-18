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

export {
  TIME_OPTIONS,
  WORD_OPTIONS,
  QUOTE_LENGTH_OPTIONS,
  DIFFICULTY_OPTIONS,
  DEFAULT_CONFIG,
  TEST_MODE_INFO,
  QUOTE_LENGTH_INFO,
} from './constants';

export type {
  TestMode,
  WordCount,
  QuoteLength,
  Difficulty,
} from './constants';

export * from './types';