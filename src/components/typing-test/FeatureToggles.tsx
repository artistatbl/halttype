"use client"

import { ConfigButton } from "./ConfigButton"
import { AtSignIcon } from "@/components/icons/at-sign"
import { HashIcon } from "@/components/icons/hash"

interface FeatureTogglesProps {
  punctuation: boolean
  numbers: boolean
  onPunctuationChange: (punctuation: boolean) => void
  onNumbersChange: (numbers: boolean) => void
}

export function FeatureToggles({
  punctuation,
  numbers,
  onPunctuationChange,
  onNumbersChange,
}: FeatureTogglesProps) {
  return (
    <>
      <ConfigButton
        isActive={punctuation}
        onClick={() => onPunctuationChange(!punctuation)}
        icon={<AtSignIcon className="w-3 h-3" />}
      >
        punctuation
      </ConfigButton>

      <ConfigButton
        isActive={numbers}
        onClick={() => onNumbersChange(!numbers)}
        icon={<HashIcon className="w-3 h-3" />}
      >
        numbers
      </ConfigButton>
    </>
  )
}