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
    <div className={cn("w-full max-w-3xl mx-auto p-4 bg-card/30 rounded border border-border/30", className)}>
      <h2 className="text-sm font-medium text-primary mb-4">Settings</h2>
      
      <div className="space-y-4">
        {/* Language Selection */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Language</h3>
          <div className="grid grid-cols-5 gap-1.5">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSettingChange('language', lang.code)}
                className={cn(
                  "px-2 py-1.5 text-xs rounded transition-colors",
                  settings.language === lang.code
                    ? "bg-muted/70 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard Layout */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Keyboard Layout</h3>
          <div className="flex gap-1.5 flex-wrap">
            {keyboardLayouts.map((layout) => (
              <button
                key={layout.code}
                onClick={() => handleSettingChange('keyboardLayout', layout.code)}
                className={cn(
                  "px-2 py-1.5 text-xs rounded transition-colors",
                  settings.keyboardLayout === layout.code
                    ? "bg-muted/70 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {layout.name}
              </button>
            ))}
          </div>
        </div>

        {/* WPM Display Options */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">WPM Display</h3>
          <div className="flex gap-1.5">
            {wpmDisplayOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSettingChange('wpmDisplay', option.code)}
                className={cn(
                  "px-2 py-1.5 text-xs rounded transition-colors",
                  settings.wpmDisplay === option.code
                    ? "bg-muted/70 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Toggle */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Sound</h3>
          <button
            onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
            className={cn(
              "px-2 py-1.5 text-xs rounded transition-colors",
              settings.soundEnabled
                ? "bg-muted/70 text-primary border border-primary/30"
                : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {settings.soundEnabled ? "Sound On" : "Sound Off"}
          </button>
        </div>

        {/* Theme Selection */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Theme</h3>
          <div className="flex gap-1.5">
            {["dark", "light", "auto"].map((theme) => (
              <button
                key={theme}
                onClick={() => handleSettingChange('theme', theme)}
                className={cn(
                  "px-2 py-1.5 text-xs rounded transition-colors capitalize",
                  settings.theme === theme
                    ? "bg-muted/70 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
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