"use client"

import { cn } from "@/lib/utils";
import type { WordTestState } from "@/hooks/useWordTest";

interface WordCounterProps {
  wordTestState: WordTestState;
  className?: string;
}

/**
 * Component that displays word progress for word-based typing tests
 * Shows words completed, remaining, and a progress bar
 */
export function WordCounter({ wordTestState, className }: WordCounterProps) {
  const { wordsCompleted, wordsRemaining, totalWords } = wordTestState;
  const progressPercentage = totalWords > 0 ? (wordsCompleted / totalWords) * 100 : 0;

  return (
    <div className={cn(
      "w-full flex flex-col gap-2 sm:gap-3",
      className
    )}>
      {/* Word count display */}
      <div className="flex justify-between items-center">
        <div className="text-sm sm:text-base md:text-lg font-mono text-primary/90 font-semibold bg-background/50 px-2 sm:px-3 py-1 rounded-md">
          {wordsCompleted}/{totalWords} words
        </div>
        <div className="text-sm sm:text-base text-muted-foreground">
          {wordsRemaining} remaining
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted/30 rounded-full h-2 sm:h-3">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}