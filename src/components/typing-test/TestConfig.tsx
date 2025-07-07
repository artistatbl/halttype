"use client"

import { cn } from "@/lib/utils"
import { useState } from
export interface TestConfigOptions {
  mode: "time" | "words" | "quote"
  timeLimit: number
  wordCount: number
  quoteLength: "short" | "medium" | "long"
  difficulty: "easy" | "medium" | "hard"
  language: string
}

interface TestConfigProps {
  onConfigChange: (config: TestConfigOptions) => void
  initialConfig?: TestConfigOptions
}

export function TestConfig({
  onConfigChange,
  initialConfig = {
    mode: "time",
    timeLimit: 30,
    wordCount: 25,
    quoteLength: "medium",
    difficulty: "medium",
    language: "english"
  }
}: TestConfigProps) {
  const [config, setConfig] = useState<TestConfigOptions>(initialConfig)

  const updateConfig = (updates: Partial<TestConfigOptions>) => {
    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    onConfigChange(newConfig)
  }

  const timeOptions = [15, 30, 60, 120]
  const wordOptions = [10, 25, 50, 100]
  const quoteLengthOptions: ("short" | "medium" | "long")[] = ["short", "medium", "long"]
  const difficultyOptions: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"]
  const languageOptions = ["english", "spanish", "french", "german"]

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 bg-zinc-200">
      {/* Test Mode and Options - Horizontal Layout */}
      <div className="flex items-center justify-center gap-8 mb-8">
        {/* Test Mode */}
        <div className="flex items-center gap-2">
          {["time", "words", "quote"].map((mode) => (
            <button
              key={mode}
              onClick={() => onTestModeChange(mode as "time" | "words" | "quote")}
              className={cn(
                "px-3 py-1 text-sm transition-colors",
                testMode === mode
                  ? "text-yellow-400"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-zinc-700" />

        {/* Time/Word/Quote Options */}
        <div className="flex items-center gap-2">
          {testMode === "time" && timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => onTimeLimitChange(time)}
              className={cn(
                "px-3 py-1 text-sm transition-colors",
                timeLimit === time
                  ? "text-yellow-400"
                  : "text-zinc-500 hover:text-zinc-300"
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
                "px-3 py-1 text-sm transition-colors",
                wordCount === count
                  ? "text-yellow-400"
                  : "text-zinc-500 hover:text-zinc-300"
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
                "px-3 py-1 text-sm transition-colors",
                quoteLength === length
                  ? "text-yellow-400"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {length}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-zinc-700" />

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          {difficultyOptions.map((diff) => (
            <button
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              className={cn(
                "px-3 py-1 text-sm transition-colors",
                difficulty === diff
                  ? "text-yellow-400"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-zinc-700" />

        {/* Language */}
        <div className="flex items-center gap-2">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={cn(
                "px-3 py-1 text-sm transition-colors",
                language === lang
                  ? "text-yellow-400"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}