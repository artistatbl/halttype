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
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-center gap-4 text-xs">
        {/* Punctuation */}
        <button
          onClick={() => onPunctuationChange(!punctuation)}
          className={cn(
            "flex items-center gap-1 transition-colors px-2 py-1 rounded",
            punctuation
              ? "text-yellow-400 bg-zinc-800/50"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"
          )}
        >
          <AtSignIcon className="w-3 h-3" />
          punctuation
        </button>

        {/* Numbers */}
        <button
          onClick={() => onNumbersChange(!numbers)}
          className={cn(
            "flex items-center gap-1 transition-colors px-2 py-1 rounded",
            numbers
              ? "text-yellow-400 bg-zinc-800/50"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"
          )}
        >
          <HashIcon className="w-3 h-3" />
          numbers
        </button>

        {/* Test Mode */}
        <div className="flex items-center gap-1 bg-zinc-800/30 rounded p-0.5">
          <button
            onClick={() => onTestModeChange("time")}
            className={cn(
              "flex items-center gap-1 transition-colors px-2 py-1 rounded",
              testMode === "time"
                ? "text-yellow-400 bg-zinc-800/70"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
            )}
          >
            <ClockIcon className="w-3 h-3" />
            time
          </button>
          
          <button
            onClick={() => onTestModeChange("words")}
            className={cn(
              "flex items-center gap-1 transition-colors px-2 py-1 rounded",
              testMode === "words"
                ? "text-yellow-400 bg-zinc-800/70"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
            )}
          >
            <TextIcon className="w-3 h-3" />
            words
          </button>
          
          <button
            onClick={() => onTestModeChange("quote")}
            className={cn(
              "flex items-center gap-1 transition-colors px-2 py-1 rounded",
              testMode === "quote"
                ? "text-yellow-400 bg-zinc-800/70"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
            )}
          >
            <QuoteIcon className="w-3 h-3" />
            quote
          </button>
        </div>

        {/* Time/Word/Quote Options */}
        <div className="flex items-center gap-1 bg-zinc-800/30 rounded p-0.5">
          {testMode === "time" && timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => onTimeLimitChange(time)}
              className={cn(
                "px-2 py-1 transition-colors rounded min-w-[2rem] text-center",
                timeLimit === time
                  ? "text-yellow-400 bg-zinc-800/70"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
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
                "px-2 py-1 transition-colors rounded min-w-[2rem] text-center",
                wordCount === count
                  ? "text-yellow-400 bg-zinc-800/70"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
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
                "px-2 py-1 transition-colors rounded min-w-[2rem] text-center",
                quoteLength === length
                  ? "text-yellow-400 bg-zinc-800/70"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
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
      onDifficultyChange={handleDifficultyChange}
      onPunctuationChange={handlePunctuationChange}
      onNumbersChange={handleNumbersChange}
    />
  )
}