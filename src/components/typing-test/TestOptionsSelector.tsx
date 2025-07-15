"use client"

import { OptionButton } from "./ConfigButton"
import { 
  TIME_OPTIONS, 
  WORD_OPTIONS, 
  QUOTE_LENGTH_OPTIONS,
  type TestMode,
  type WordCount,
  type QuoteLength
} from "@/lib/typing-test/constants"

interface TestOptionsSelectorProps {
  testMode: TestMode
  timeLimit: number
  wordCount: WordCount
  quoteLength: QuoteLength
  onTimeLimitChange: (timeLimit: number) => void
  onWordCountChange: (wordCount: WordCount) => void
  onQuoteLengthChange: (quoteLength: QuoteLength) => void
}

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