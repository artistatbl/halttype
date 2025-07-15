/**
 * Type definitions for typing test components
 */

export type TestMode = "time" | "words" | "quote"

export interface TypingTestProps {
  content: string
  timeLimit?: number // in seconds, undefined for unlimited
  wordCount?: number // for word mode, undefined for unlimited
  difficulty?: "easy" | "medium" | "hard"
  language?: string
  onComplete?: (results: TestResults) => void
  className?: string
  testMode?: TestMode
  testId?: string // ID of the test being taken
}

export interface TestResults {
  wpm: number
  accuracy: number
  timeSpent: number // in seconds (integer)
  wordsTyped: number
  correctWords: number
  incorrectWords: number
  keystrokes: {
    key: string
    timestamp: number
    correct: boolean
  }[]
}

export interface Keystroke {
  key: string
  timestamp: number
  correct: boolean
}

export type TestState = "idle" | "running" | "completed"