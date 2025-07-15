"use client"

import { ConfigButton } from "./ConfigButton"
import { ClockIcon } from "@/components/icons/clock"
import { TextIcon } from "@/components/icons/text"
import { QuoteIcon } from "@/components/icons/quote"
import { type TestMode } from "@/lib/typing-test/constants"

interface TestModeSelectorProps {
  testMode: TestMode
  onTestModeChange: (mode: TestMode) => void
}

export function TestModeSelector({
  testMode,
  onTestModeChange,
}: TestModeSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      <ConfigButton
        isActive={testMode === "time"}
        onClick={() => onTestModeChange("time")}
        icon={<ClockIcon className="w-3 h-3" />}
      >
        time
      </ConfigButton>
      
      <ConfigButton
        isActive={testMode === "words"}
        onClick={() => onTestModeChange("words")}
        icon={<TextIcon className="w-3 h-3" />}
      >
        words
      </ConfigButton>
      
      <ConfigButton
        isActive={testMode === "quote"}
        onClick={() => onTestModeChange("quote")}
        icon={<QuoteIcon className="w-3 h-3" />}
      >
        quote
      </ConfigButton>
    </div>
  )
}