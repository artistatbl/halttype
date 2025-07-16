"use client"

import { useState } from "react"
import { ConfigButton } from "./ConfigButton"
import { Language, LANGUAGE_DISPLAY_NAMES, LANGUAGE_GROUPS, getLanguageDisplayName } from "@/lib/language-system"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageSelectorProps {
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
  className?: string
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  className
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language)
    setIsOpen(false)
    setSelectedGroup(null)
  }

  const handleGroupSelect = (groupName: string) => {
    if (selectedGroup === groupName) {
      setSelectedGroup(null)
    } else {
      setSelectedGroup(groupName)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <ConfigButton
        isActive={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        icon={<ChevronDown className="w-3 h-3" />}
      >
        {getLanguageDisplayName(selectedLanguage)}
      </ConfigButton>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 min-w-[200px] max-h-[400px] overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2 px-2">Select Language</div>
            
            {/* Popular Languages */}
            <div className="mb-3">
              <div className="text-xs font-medium text-muted-foreground mb-1 px-2">Popular</div>
              <div className="grid grid-cols-1 gap-1">
                {['english', 'english_1k', 'spanish', 'french', 'german'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang as Language)}
                    className={cn(
                      "text-left px-2 py-1 text-sm rounded hover:bg-accent transition-colors",
                      selectedLanguage === lang && "bg-accent text-accent-foreground"
                    )}
                  >
                    {getLanguageDisplayName(lang as Language)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Groups */}
            {Object.entries(LANGUAGE_GROUPS).map(([groupName, languages]) => (
              <div key={groupName} className="mb-2">
                <button
                  onClick={() => handleGroupSelect(groupName)}
                  className="w-full text-left px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between"
                >
                  <span className="capitalize">{groupName.replace('_', ' ')}</span>
                  <ChevronDown 
                    className={cn(
                      "w-3 h-3 transition-transform",
                      selectedGroup === groupName && "rotate-180"
                    )} 
                  />
                </button>
                
                {selectedGroup === groupName && (
                  <div className="ml-2 grid grid-cols-1 gap-1 mt-1">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageSelect(lang)}
                        className={cn(
                          "text-left px-2 py-1 text-sm rounded hover:bg-accent transition-colors",
                          selectedLanguage === lang && "bg-accent text-accent-foreground"
                        )}
                      >
                        {getLanguageDisplayName(lang)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsOpen(false)
            setSelectedGroup(null)
          }}
        />
      )}
    </div>
  )
}

// Simple language selector for compact spaces
export function CompactLanguageSelector({
  selectedLanguage,
  onLanguageChange,
  className
}: LanguageSelectorProps) {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
      className={cn(
        "bg-background border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
    >
      <optgroup label="Popular">
        {['english', 'english_1k', 'spanish', 'french', 'german'].map((lang) => (
          <option key={lang} value={lang}>
            {getLanguageDisplayName(lang as Language)}
          </option>
        ))}
      </optgroup>
      
      {Object.entries(LANGUAGE_GROUPS).map(([groupName, languages]) => (
        <optgroup key={groupName} label={groupName.replace('_', ' ').toUpperCase()}>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {getLanguageDisplayName(lang)}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}