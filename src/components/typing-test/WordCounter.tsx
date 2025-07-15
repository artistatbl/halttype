"use client"

import { cn } from "@/lib/utils";
import type { WordTestState } from "@/hooks/useWordTest";

interface WordCounterProps {
  wordTestState: WordTestState;
  className?: string;
}

/**
 * Component that displays word progress for word-based typing tests
 * Shows words completed in a simple format matching the timer design
 */
export function WordCounter({ wordTestState, className }: WordCounterProps) {
  const { wordsCompleted, totalWords } = wordTestState;

  return (
    <div className={cn(
      "w-full flex justify-start",
      className
    )}>
      <div className="text-sm sm:text-base md:text-lg font-mono text-primary/90 font-semibold bg-background/50 px-2 sm:px-3 py-1 rounded-md">
        {wordsCompleted}/{totalWords} words
      </div>
    </div>
  );
}