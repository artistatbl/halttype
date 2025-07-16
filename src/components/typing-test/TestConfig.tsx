"use client"

import { ConfigSeparator } from "./ConfigButton"
import { FeatureToggles } from "./FeatureToggles"
import { TestModeSelector } from "./TestModeSelector"
import { TestOptionsSelector } from "./TestOptionsSelector"
import { 
  type TestMode, 
  type WordCount, 
  type QuoteLength, 
  type Difficulty 
} from "@/lib/typing-test/constants"

export interface TestConfigOptions {
  mode: TestMode
  timeLimit: number
  wordCount: WordCount
  quoteLength: QuoteLength
  difficulty: Difficulty
  punctuation?: boolean
  numbers?: boolean
}

interface TestConfigProps {
  testMode: TestMode
  timeLimit: number
  wordCount: WordCount
  quoteLength: QuoteLength
  difficulty: Difficulty
  punctuation: boolean
  numbers: boolean
  onTestModeChange: (mode: TestMode) => void
  onTimeLimitChange: (timeLimit: number) => void
  onWordCountChange: (wordCount: WordCount) => void
  onQuoteLengthChange: (quoteLength: QuoteLength) => void
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
      <div className="flex flex-wrap items-center bg-accent/40  rounded-md p-2 justify-center gap-4 text-sm">
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
  const handleTestModeChange = (mode: TestMode) => {
    onConfigChange({ ...initialConfig, mode })
  }

  const handleTimeLimitChange = (timeLimit: number) => {
    onConfigChange({ ...initialConfig, timeLimit })
  }

  const handleWordCountChange = (wordCount: WordCount) => {
    onConfigChange({ ...initialConfig, wordCount })
  }

  const handleQuoteLengthChange = (quoteLength: QuoteLength) => {
    onConfigChange({ ...initialConfig, quoteLength })
  }

  const handleDifficultyChange = (difficulty: Difficulty) => {
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