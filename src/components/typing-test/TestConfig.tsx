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
  onTimeLimitChange: (timeLimit: number) => void
  onWordCountChange: (wordCount: number) => void
  onQuoteLengthChange: (quoteLength: "short" | "medium" | "long") => void
  onPunctuationChange: (punctuation: boolean) => void
  onNumbersChange: (numbers: boolean) => void
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
  onPunctuationChange,
  onNumbersChange,
}: TestConfigProps) {
  const timeOptions = [15, 30, 60, 120]
  const wordOptions = [10, 25, 50, 100]
  const quoteLengthOptions: ("short" | "medium" | "long")[] = ["short", "medium", "long"]
  const difficultyOptions: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"]


  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        
        {/* Punctuation */}
        <button
          onClick={() => onPunctuationChange(!punctuation)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
            punctuation
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <AtSignIcon className="w-3 h-3" />
          <span>punctuation</span>
        </button>

        {/* Numbers */}
        <button
          onClick={() => onNumbersChange(!numbers)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
            numbers
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <HashIcon className="w-3 h-3" />
          <span>numbers</span>
        </button>

        {/* Separator */}
        <div className="w-px h-4 bg-border"></div>

        {/* Test Mode */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTestModeChange("time")}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
              testMode === "time"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ClockIcon className="w-3 h-3" />
            <span>time</span>
          </button>
          
          <button
            onClick={() => onTestModeChange("words")}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
              testMode === "words"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TextIcon className="w-3 h-3" />
            <span>words</span>
          </button>
          
          <button
            onClick={() => onTestModeChange("quote")}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
              testMode === "quote"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <QuoteIcon className="w-3 h-3" />
            <span>quote</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-border"></div>

        {/* Time/Word/Quote Options */}
        <div className="flex items-center gap-1">
          {testMode === "time" && timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => onTimeLimitChange(time)}
              className={cn(
                "px-2 py-1 rounded transition-colors min-w-[2rem] text-center",
                timeLimit === time
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
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
                "px-2 py-1 rounded transition-colors min-w-[2rem] text-center",
                wordCount === count
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
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
                "px-2 py-1 rounded transition-colors min-w-[2rem] text-center capitalize",
                quoteLength === length
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {length}
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
      onPunctuationChange={handlePunctuationChange}
      onNumbersChange={handleNumbersChange}
    />
  )
}