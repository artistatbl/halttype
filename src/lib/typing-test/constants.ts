
// Test mode types
export type TestMode = "time" | "words" | "quote"
export type WordCount = 10 | 25 | 50 | 100
export type QuoteLength = "short" | "medium" | "long"
export type Difficulty = "easy" | "medium" | "hard"

// Time options for time-based tests (in seconds)
export const TIME_OPTIONS = [15, 30, 60, 120] as const

// Word count options for word-based tests
export const WORD_OPTIONS: readonly WordCount[] = [10, 25, 50, 100] as const

// Quote length options for quote-based tests
export const QUOTE_LENGTH_OPTIONS: readonly QuoteLength[] = ["short", "medium", "long"] as const

// Difficulty levels
export const DIFFICULTY_OPTIONS: readonly Difficulty[] = ["easy", "medium", "hard"] as const

// Default configuration values
export const DEFAULT_CONFIG = {
  mode: "time" as TestMode,
  timeLimit: 30,
  wordCount: 25 as WordCount,
  quoteLength: "medium" as QuoteLength,
  difficulty: "medium" as Difficulty,
  punctuation: false,
  numbers: false,
} as const

// Punctuation marks for text generation
export const PUNCTUATION_MARKS = ['.', ',', '!', '?', ';', ':'] as const

// Test mode display names and descriptions
export const TEST_MODE_INFO = {
  time: {
    name: "Time",
    description: "Type for a set amount of time",
    icon: "clock",
  },
  words: {
    name: "Words",
    description: "Type a specific number of words",
    icon: "text",
  },
  quote: {
    name: "Quote",
    description: "Type a famous quote or passage",
    icon: "quote",
  },
} as const

// Quote length descriptions
export const QUOTE_LENGTH_INFO = {
  short: {
    name: "Short",
    description: "20-40 words",
    wordRange: [20, 40],
  },
  medium: {
    name: "Medium",
    description: "40-80 words",
    wordRange: [40, 80],
  },
  long: {
    name: "Long",
    description: "80-120 words",
    wordRange: [80, 120],
  },
} as const