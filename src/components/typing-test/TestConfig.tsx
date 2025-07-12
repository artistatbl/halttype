"use client"

import { cn } from "@/lib/utils"
import { ClockIcon } from "@/components/icons/clock"
import { TextIcon } from "@/components/icons/text"
import { QuoteIcon } from "@/components/icons/quote"
import { AtSignIcon } from "@/components/icons/at-sign"
import { HashIcon } from "@/components/icons/hash"

export interface TestConfigOptions {
  mode: "time" | "words" | "quote"
  timeLimit: number
  wordCount: number
  quoteLength: "short" | "medium" | "long"
  difficulty: "easy" | "medium" | "hard"
  punctuation?: boolean
  numbers?: boolean
}

interface TestConfigProps {
  testMode: "time" | "words" | "quote"
  timeLimit: number
  wordCount: number
  quoteLength: "short" | "medium" | "long"
  difficulty: "easy" | "medium" | "hard"
  punctuation: boolean
  numbers: boolean
  onTestModeChange: (mode: "time" | "words" | "quote") => void
  onTimeLimitChange: (time: number) => void
  onWordCountChange: (count: number) => void
  onQuoteLengthChange: (length: "short" | "medium" | "long") => void
  onDifficultyChange: (difficulty: "easy" | "medium" | "hard") => void
  onPunctuationChange: (enabled: boolean) => void
  onNumbersChange: (enabled: boolean) => void
}

function TestConfigInternal({
  testMode,
  timeLimit,
  wordCount,
  quoteLength,
  difficulty,
  punctuation,
  numbers,
  onTestModeChange,
  onTimeLimitChange,
  onWordCountChange,
  onQuoteLengthChange,
  onDifficultyChange,
  onPunctuationChange,
  onNumbersChange,
}: TestConfigProps) {
  const timeOptions = [15, 30, 60, 120]
  const wordOptions = [10, 25, 50, 100]
  const quoteLengthOptions: ("short" | "medium" | "long")[] = ["short", "medium", "long"]
  const difficultyOptions: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"]


  return (
    <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-6 p-2 sm:p-1 bg-accent rounded-md">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base">
        {/* Punctuation */}
        <button
          onClick={() => onPunctuationChange(!punctuation)}
          className={cn(
            "flex items-center gap-1.5 transition-all px-2 sm:px-2.5 py-1.5 rounded-md",
            punctuation
              ? "text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-primary "
          )}
        >
          <AtSignIcon className="w-3 h-3" />
          <span className="sm:inline">punctuation</span>
        </button>

        {/* Numbers */}
        <button
          onClick={() => onNumbersChange(!numbers)}
          className={cn(
            "flex items-center gap-1.5 transition-all px-2 sm:px-2.5 py-1.5 rounded-md",
            numbers
              ? "text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-primary "
          )}
        >
          <HashIcon className="w-3 h-3" />
          <span className="sm:inline">numbers</span>
        </button>

        {/* Test Mode */}
        <div className="flex items-center gap-0.5 sm:gap-1  p-0.5 rounded-md">
          <button
            onClick={() => onTestModeChange("time")}
            className={cn(
              "flex items-center gap-1.5 transition-all px-2.5 py-1.5 rounded-sm",
              testMode === "time"
                ? "text-accent-foreground font-medium"
                : "text-muted-foreground hover:text-primary "
            )}
          >
            <ClockIcon className="w-3 h-3" />
            <span className="sm:inline">time</span>
          </button>
          
          <button
            onClick={() => onTestModeChange("words")}
            className={cn(
              "flex items-center gap-1.5 transition-all px-2.5 py-1.5 rounded-sm",
              testMode === "words"
                ? "text-accent-foreground font-medium"
                : "text-muted-foreground hover:text-primary "
            )}
          >
            <TextIcon className="w-3 h-3" />
            <span className="sm:inline">words</span>
          </button>
          
          <button
            onClick={() => onTestModeChange("quote")}
            className={cn(
              "flex items-center gap-1.5 transition-all px-2.5 py-1.5 rounded-sm",
              testMode === "quote"
                ? "text-accent-foreground font-medium"
                : "text-muted-foreground hover:text-primary "
            )}
          >
            <QuoteIcon className="w-3 h-3" />
            <span className="sm:inline">quote</span>
          </button>
        </div>

        {/* Time/Word/Quote Options */}
        <div className="flex items-center gap-0.5 sm:gap-1  p-0.5 rounded-md">
          {testMode === "time" && timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => onTimeLimitChange(time)}
              className={cn(
                "px-1.5 sm:px-2.5 py-1.5 transition-all min-w-[1.75rem] sm:min-w-[2.25rem] text-center text-sm rounded-sm",
                timeLimit === time
                  ? "text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-primary "
              )}
            >
              {time}
            </button>
          ))}
          
          {testMode === "words" && wordOptions.map((count) => (
            <button
              key={count}
              onClick={() => onWordCountChange(count)}
              className={cn(
                "px-1.5 sm:px-2.5 py-1.5 transition-all min-w-[1.75rem] sm:min-w-[2.25rem] text-center text-sm rounded-sm",
                wordCount === count
                  ? "text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-primary "
              )}
            >
              {count}
            </button>
          ))}
          
          {testMode === "quote" && quoteLengthOptions.map((length) => (
            <button
              key={length}
              onClick={() => onQuoteLengthChange(length)}
              className={cn(
                "px-1.5 sm:px-2.5 py-1.5 transition-all min-w-[1.75rem] sm:min-w-[2.25rem] text-center text-sm rounded-sm",
                quoteLength === length
                  ? "text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-primary "
              )}
            >
              {length}
            </button>
          ))}
        </div>

        {/* Difficulty Options */}
        <div className="flex items-center gap-0.5 sm:gap-1  p-0.5 rounded-md">
          {difficultyOptions.map((diff) => (
            <button
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              className={cn(
                "px-1.5 sm:px-2.5 py-1.5 transition-all min-w-[1.75rem] sm:min-w-[2.25rem] text-center text-sm rounded-sm",
                difficulty === diff
                  ? "text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-primary "
              )}
            >
              {diff}
            </button>
          ))}
        </div>


      </div>
    </div>
  )
}

// Wrapper component that matches the expected API from page.tsx
interface TestConfigWrapperProps {
  onConfigChange: (config: TestConfigOptions) => void
  initialConfig: TestConfigOptions
}

export function TestConfig({
  onConfigChange,
  initialConfig,
}: TestConfigWrapperProps) {
  const handleTestModeChange = (mode: "time" | "words" | "quote") => {
    onConfigChange({ ...initialConfig, mode })
  }

  const handleTimeLimitChange = (timeLimit: number) => {
    onConfigChange({ ...initialConfig, timeLimit })
  }

  const handleWordCountChange = (wordCount: number) => {
    onConfigChange({ ...initialConfig, wordCount })
  }

  const handleQuoteLengthChange = (quoteLength: "short" | "medium" | "long") => {
    onConfigChange({ ...initialConfig, quoteLength })
  }

  const handleDifficultyChange = (difficulty: "easy" | "medium" | "hard") => {
    onConfigChange({ ...initialConfig, difficulty })
  }



  const handlePunctuationChange = (punctuation: boolean) => {
    onConfigChange({ ...initialConfig, punctuation })
  }

  const handleNumbersChange = (numbers: boolean) => {
    onConfigChange({ ...initialConfig, numbers })
  }

  return (
    <TestConfigInternal
      testMode={initialConfig.mode}
      timeLimit={initialConfig.timeLimit}
      wordCount={initialConfig.wordCount}
      quoteLength={initialConfig.quoteLength}
      difficulty={initialConfig.difficulty}
      punctuation={initialConfig.punctuation || false}
      numbers={initialConfig.numbers || false}
      onTestModeChange={handleTestModeChange}
      onTimeLimitChange={handleTimeLimitChange}
      onWordCountChange={handleWordCountChange}
      onQuoteLengthChange={handleQuoteLengthChange}
      onDifficultyChange={handleDifficultyChange}
      onPunctuationChange={handlePunctuationChange}
      onNumbersChange={handleNumbersChange}
    />
  )
}