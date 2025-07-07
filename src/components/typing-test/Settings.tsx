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
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-lg", className)}>
      <h2 className="text-xl font-semibold text-zinc-100 mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Language Selection */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Language</h3>
          <div className="grid grid-cols-5 gap-2">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSettingChange('language', lang.code)}
                className={cn(
                  "px-3 py-2 text-sm rounded transition-colors",
                  settings.language === lang.code
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard Layout */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Keyboard Layout</h3>
          <div className="flex gap-2 flex-wrap">
            {keyboardLayouts.map((layout) => (
              <button
                key={layout.code}
                onClick={() => handleSettingChange('keyboardLayout', layout.code)}
                className={cn(
                  "px-3 py-2 text-sm rounded transition-colors",
                  settings.keyboardLayout === layout.code
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                )}
              >
                {layout.name}
              </button>
            ))}
          </div>
        </div>

        {/* WPM Display Options */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3">WPM Display</h3>
          <div className="flex gap-2">
            {wpmDisplayOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSettingChange('wpmDisplay', option.code)}
                className={cn(
                  "px-3 py-2 text-sm rounded transition-colors",
                  settings.wpmDisplay === option.code
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                )}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Toggle */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Sound</h3>
          <button
            onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
            className={cn(
              "px-3 py-2 text-sm rounded transition-colors",
              settings.soundEnabled
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            )}
          >
            {settings.soundEnabled ? "Sound On" : "Sound Off"}
          </button>
        </div>

        {/* Theme Selection */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Theme</h3>
          <div className="flex gap-2">
            {["dark", "light", "auto"].map((theme) => (
              <button
                key={theme}
                onClick={() => handleSettingChange('theme', theme)}
                className={cn(
                  "px-3 py-2 text-sm rounded transition-colors capitalize",
                  settings.theme === theme
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
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