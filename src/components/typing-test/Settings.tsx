"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

export interface UserSettings {
  language: string
  keyboardLayout: string
  wpmDisplay: "live" | "end" | "both"
  theme: "dark" | "light" | "auto"
  soundEnabled: boolean
}

interface SettingsProps {
  settings: UserSettings
  onSettingsChange: (settings: UserSettings) => void
  className?: string
}

export function Settings({ settings, onSettingsChange, className }: SettingsProps) {
  const languageOptions = [
    { code: "english", name: "English" },
    { code: "spanish", name: "Español" },
    { code: "french", name: "Français" },
    { code: "german", name: "Deutsch" },
    { code: "portuguese", name: "Português" },
    { code: "italian", name: "Italiano" },
    { code: "russian", name: "Русский" },
    { code: "japanese", name: "日本語" },
    { code: "korean", name: "한국어" },
    { code: "chinese", name: "中文" }
  ]

  const keyboardLayouts = [
    { code: "qwerty", name: "QWERTY" },
    { code: "dvorak", name: "Dvorak" },
    { code: "colemak", name: "Colemak" },
    { code: "azerty", name: "AZERTY" },
    { code: "qwertz", name: "QWERTZ" }
  ]

  const wpmDisplayOptions = [
    { code: "live", name: "Live WPM" },
    { code: "end", name: "End Only" },
    { code: "both", name: "Live + End" }
  ]

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className={cn("w-full max-w-full sm:max-w-3xl mx-auto p-3 sm:p-4 bg-card/30 rounded-md", className)}>
      <h2 className="text-sm font-medium text-primary mb-3 sm:mb-4 px-1">Settings</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Language Selection */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider px-1">Language</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSettingChange('language', lang.code)}
                className={cn(
                  "px-2 py-1.5 text-xs transition-all rounded-md",
                  settings.language === lang.code
                    ? "bg-muted/70 text-primary shadow-sm font-medium"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard Layout */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider px-1">Keyboard Layout</h3>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {keyboardLayouts.map((layout) => (
              <button
                key={layout.code}
                onClick={() => handleSettingChange('keyboardLayout', layout.code)}
                className={cn(
                  "px-2 py-1.5 text-xs transition-all rounded-md",
                  settings.keyboardLayout === layout.code
                    ? "bg-muted/70 text-primary shadow-sm font-medium"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {layout.name}
              </button>
            ))}
          </div>
        </div>

        {/* WPM Display Options */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider px-1">WPM Display</h3>
          <div className="flex gap-1.5 sm:gap-2">
            {wpmDisplayOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSettingChange('wpmDisplay', option.code)}
                className={cn(
                  "px-2 py-1.5 text-xs transition-all rounded-md",
                  settings.wpmDisplay === option.code
                    ? "bg-muted/70 text-primary shadow-sm font-medium"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Toggle */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider px-1">Sound</h3>
          <button
            onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
            className={cn(
              "px-3 py-1.5 text-xs transition-all rounded-md",
              settings.soundEnabled
                ? "bg-muted/70 text-primary shadow-sm font-medium"
                : "bg-muted/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {settings.soundEnabled ? "Sound On" : "Sound Off"}
          </button>
        </div>

        {/* Theme Selection */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider px-1">Theme</h3>
          <div className="flex gap-1.5 sm:gap-2">
            {["dark", "light", "auto"].map((theme) => (
              <button
                key={theme}
                onClick={() => handleSettingChange('theme', theme)}
                className={cn(
                  "px-3 py-1.5 text-xs transition-all capitalize rounded-md",
                  settings.theme === theme
                    ? "bg-muted/70 text-primary shadow-sm font-medium"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Default settings
export const defaultSettings: UserSettings = {
  language: "english",
  keyboardLayout: "qwerty",
  wpmDisplay: "live",
  theme: "dark",
  soundEnabled: false
}