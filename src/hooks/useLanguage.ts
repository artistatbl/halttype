"use client"

import { useState, useEffect } from 'react'
import { Language, DEFAULT_LANGUAGE, getLanguageDisplayName, LANGUAGE_GROUPS } from '@/lib/language-system'

/**
 * Hook to manage text display language (independent of test configuration)
 */
export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE)
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('textDisplayLanguage')
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage as Language)
    }
  }, [])
  
  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem('textDisplayLanguage', language)
  }
  
  const getAvailableLanguages = () => {
    return Object.values(LANGUAGE_GROUPS).flat()
  }
  
  const getLanguageGroups = () => {
    return LANGUAGE_GROUPS
  }
  
  return {
    currentLanguage,
    changeLanguage,
    getAvailableLanguages,
    getLanguageGroups,
    displayName: getLanguageDisplayName(currentLanguage)
  }
}

/**
 * Hook for language display utilities
 */
export function useLanguageDisplay() {
  const { currentLanguage, displayName } = useLanguage()

  return {
    currentLanguage,
    displayName,
    displayText: displayName, // Use displayName as displayText
    
    // Format language for UI display
    formatForDisplay: (language: Language) => {
      return getLanguageDisplayName(language)
    }
  }
}

/**
 * Hook for language selection in components
 */
export function useLanguageSelector() {
  const { 
    currentLanguage, 
    changeLanguage, 
    getAvailableLanguages, 
    getLanguageGroups
  } = useLanguage()

  return {
    selectedLanguage: currentLanguage,
    onLanguageChange: changeLanguage,
    availableLanguages: getAvailableLanguages(),
    languageGroups: getLanguageGroups()
  }
}