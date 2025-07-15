"use client"

import { ConfigButton } from "./ConfigButton"
import { ClockIcon } from "@/components/icons/clock"
import { TextIcon } from "@/components/icons/text"
import { QuoteIcon } from "@/components/icons/quote"

interface TestModeSelectorProps {
  testMode: "time" | "words" | "quote"
  onTestModeChange: (mode: "time" | "words" | "quote") => void
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