"use client"

import { cn } from "@/lib/utils"
import { CapsLockWarning } from "./CapsLock"
import { useMemo } from "react"

interface TextDisplayProps {
  text: string
  currentPosition: number
  errors: number[]
  timeRemaining?: number | null
  testState?: "idle" | "running" | "completed"
  capsLockOn?: boolean
  className?: string
  maxVisibleWords?: number // New prop to control how many words are visible
}

export function TextDisplay({
  text,
  currentPosition,
  errors,
  timeRemaining,
  testState = "idle",
  capsLockOn = false,
  className,
  maxVisibleWords = 20, // Default to showing 20 words at a time
}: TextDisplayProps) {
  // Calculate which words should be visible based on current position
  const { visibleText, visibleStartIndex } = useMemo(() => {
    const words = text.split(' ')
    
    // Find which word the current position is in
    let charCount = 0
    let currentWordIndex = 0
    
    for (let i = 0; i < words.length; i++) {
      const wordLength = (words[i]?.length || 0) + (i < words.length - 1 ? 1 : 0) // +1 for space
      if (charCount + wordLength > currentPosition) {
        currentWordIndex = i
        break
      }
      charCount += wordLength
    }
    
    // Calculate the window of words to show
    // Show some words before current position and fill up to maxVisibleWords
    const wordsBeforeCurrent = Math.min(5, currentWordIndex) // Show up to 5 words before current
    const startWordIndex = Math.max(0, currentWordIndex - wordsBeforeCurrent)
    const endWordIndex = Math.min(words.length, startWordIndex + maxVisibleWords)
    
    // Get the visible words
    const visibleWords = words.slice(startWordIndex, endWordIndex)
    const visibleText = visibleWords.join(' ')
    
    // Calculate the character index where visible text starts in the original text
    let visibleStartIndex = 0
    for (let i = 0; i < startWordIndex; i++) {
      visibleStartIndex += (words[i]?.length || 0) + (i < words.length - 1 ? 1 : 0)
    }
    
    return { visibleText, visibleStartIndex }
  }, [text, currentPosition, maxVisibleWords])

  return (
    <div 
      className={cn(
        "w-full text-accent-foreground text-xl sm:text-xl md:text-2xl leading-relaxed tracking-wide py-5 sm:py-6 md:py-8 px-4 sm:px-5 md:px-6 rounded-lg transition-all",
        className
      )}
    >
      <div className="relative w-full">
        <CapsLockWarning isOn={capsLockOn} />
        
        {/* Text content with improved styling and readability */}
        <div className="w-full leading-[1.7] tracking-[0.04em] [word-spacing:0.18em] sm:leading-[1.8] sm:tracking-[0.05em] sm:[word-spacing:0.2em] md:leading-[1.9] md:tracking-[0.06em] md:[word-spacing:0.22em] transition-opacity duration-200 ease-out">
          {visibleText.split('').map((char, index) => {
            const absoluteIndex = visibleStartIndex + index
            const isActive = absoluteIndex === currentPosition
            const isPast = absoluteIndex < currentPosition
            const isError = errors.includes(absoluteIndex)
            
            return (
              <span
                key={`${absoluteIndex}-${char}`}
                className={cn(
                   "transition-colors duration-100 ease-out",
                   isActive && "text-primary font-medium relative", 
                   isPast && !isError && "text-primary/50",
                   isPast && isError && "text-red-500",
                   !isPast && !isActive && "text-muted-foreground"
                 )}
              >
                {char}
                 {isActive && (
                   <span className="absolute -left-0.5 top-0 w-0.5 h-full bg-primary/80" />
                 )}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}