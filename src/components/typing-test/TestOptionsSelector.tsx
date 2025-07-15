"use client"

import { OptionButton } from "./ConfigButton"

interface TestOptionsSelectorProps {
  testMode: "time" | "words" | "quote"
  timeLimit: number
  wordCount: 10 | 25 | 50 | 100
  quoteLength: "short" | "medium" | "long"
  onTimeLimitChange: (timeLimit: number) => void
  onWordCountChange: (wordCount: 10 | 25 | 50 | 100) => void
  onQuoteLengthChange: (quoteLength: "short" | "medium" | "long") => void
}

const TIME_OPTIONS = [15, 30, 60, 120]
const WORD_OPTIONS: (10 | 25 | 50 | 100)[] = [10, 25, 50, 100]
const QUOTE_LENGTH_OPTIONS: ("short" | "medium" | "long")[] = ["short", "medium", "long"]

export function TestOptionsSelector({
  testMode,
  timeLimit,
  wordCount,
  quoteLength,
  onTimeLimitChange,
  onWordCountChange,
  onQuoteLengthChange,
}: TestOptionsSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      {testMode === "time" && TIME_OPTIONS.map((time) => (
        <OptionButton
          key={time}
          isActive={timeLimit === time}
          onClick={() => onTimeLimitChange(time)}
        >
          {time}
        </OptionButton>
      ))}
      
      {testMode === "words" && WORD_OPTIONS.map((count) => (
        <OptionButton
          key={count}
          isActive={wordCount === count}
          onClick={() => onWordCountChange(count)}
        >
          {count}
        </OptionButton>
      ))}
      
      {testMode === "quote" && QUOTE_LENGTH_OPTIONS.map((length) => (
        <OptionButton
          key={length}
          isActive={quoteLength === length}
          onClick={() => onQuoteLengthChange(length)}
          className="capitalize"
        >
          {length}
        </OptionButton>
      ))}
    </div>
  )
}