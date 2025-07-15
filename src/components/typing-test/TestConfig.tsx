"use client"

import { ConfigSeparator } from "./ConfigButton"
import { FeatureToggles } from "./FeatureToggles"
import { TestModeSelector } from "./TestModeSelector"
import { TestOptionsSelector } from "./TestOptionsSelector"

export interface TestConfigOptions {
  mode: "time" | "words" | "quote"
  timeLimit: number
  wordCount: 10 | 25 | 50 | 100
  quoteLength: "short" | "medium" | "long"
  difficulty: "easy" | "medium" | "hard"
  punctuation?: boolean
  numbers?: boolean
}

interface TestConfigProps {
  testMode: "time" | "words" | "quote"
  timeLimit: number
  wordCount: 10 | 25 | 50 | 100
  quoteLength: "short" | "medium" | "long"
  difficulty: "easy" | "medium" | "hard"
  punctuation: boolean
  numbers: boolean
  onTestModeChange: (mode: "time" | "words" | "quote") => void
  onTimeLimitChange: (timeLimit: number) => void
  onWordCountChange: (wordCount: 10 | 25 | 50 | 100) => void
  onQuoteLengthChange: (quoteLength: "short" | "medium" | "long") => void
  onPunctuationChange: (punctuation: boolean) => void
  onNumbersChange: (numbers: boolean) => void
}

function TestConfigInternal({
  testMode,
  timeLimit,
  wordCount,
  quoteLength,
  punctuation,
  numbers,
  onTestModeChange,
  onTimeLimitChange,
  onWordCountChange,
  onQuoteLengthChange,
  onPunctuationChange,
  onNumbersChange,
}: TestConfigProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex flex-wrap items-center bg-accent rounded-md p-2 justify-center gap-4 text-sm">
        <FeatureToggles
          punctuation={punctuation}
          numbers={numbers}
          onPunctuationChange={onPunctuationChange}
          onNumbersChange={onNumbersChange}
        />

        <ConfigSeparator />

        <TestModeSelector
          testMode={testMode}
          onTestModeChange={onTestModeChange}
        />

        <ConfigSeparator />

        <TestOptionsSelector
          testMode={testMode}
          timeLimit={timeLimit}
          wordCount={wordCount}
          quoteLength={quoteLength}
          onTimeLimitChange={onTimeLimitChange}
          onWordCountChange={onWordCountChange}
          onQuoteLengthChange={onQuoteLengthChange}
        />
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

  const handleWordCountChange = (wordCount: 10 | 25 | 50 | 100) => {
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