"use client"

import { useLanguageDisplay } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface LanguageDisplayProps {
  className?: string
  showFullText?: boolean
}

/**
 * Component to display the current language selection
 */
export function LanguageDisplay({ 
  className, 
  showFullText = false 
}: LanguageDisplayProps) {
  const { currentLanguage, displayName, displayText } = useLanguageDisplay()

  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
      <span className="font-medium">Language:</span>
      <span className="text-foreground">
        {showFullText ? displayText : displayName}
      </span>
      <span className="text-xs opacity-60">({currentLanguage})</span>
    </div>
  )
}

/**
 * Compact language indicator
 */
export function LanguageIndicator({ className }: { className?: string }) {
  const { displayName } = useLanguageDisplay()

  return (
    <span className={cn("text-xs px-2 py-1 bg-accent/50 rounded-md", className)}>
      {displayName}
    </span>
  )
}