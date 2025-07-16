"use client"

import { useState, useEffect } from "react"
import { LanguageModal } from "./LanguageModal"
import { LanguageDisplay } from "./LanguageDisplay"
import { Language, DEFAULT_LANGUAGE } from "@/lib/language-system"
import { cn } from "@/lib/utils"

interface TextDisplayLanguageProps {
  className?: string
  onLanguageChange?: (language: Language) => void
  showDisplay?: boolean
}

/**
 * Standalone component for managing text display language
 * This is separate from test configuration and focuses solely on language selection for text display
 */
export function TextDisplayLanguage({
  className,
  onLanguageChange,
  showDisplay = true
}: TextDisplayLanguageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('textDisplayLanguage')
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage as Language)
    }
  }, [])

  // Save language to localStorage and notify parent when language changes
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    localStorage.setItem('textDisplayLanguage', language)
    onLanguageChange?.(language)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Text Language:</span>
        <LanguageModal />
      </div>
      
      {showDisplay && (
        <LanguageDisplay className="text-xs" />
      )}
    </div>
  )
}

/**
 * Compact version for smaller spaces
 */
export function CompactTextDisplayLanguage({
  className,
  onLanguageChange
}: Omit<TextDisplayLanguageProps, 'showDisplay'>) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('textDisplayLanguage')
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage as Language)
    }
  }, [])

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    localStorage.setItem('textDisplayLanguage', language)
    onLanguageChange?.(language)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs text-muted-foreground">Lang:</span>
      <LanguageModal />
    </div>
  )
}

/**
 * Hook to get the current text display language
 */
export function useTextDisplayLanguage() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('textDisplayLanguage')
    if (savedLanguage) {
      setLanguage(savedLanguage as Language)
    }

    // Listen for storage changes to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'textDisplayLanguage' && e.newValue) {
        setLanguage(e.newValue as Language)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('textDisplayLanguage', newLanguage)
  }

  return {
    language,
    updateLanguage
  }
}