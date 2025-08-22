"use client"

import * as React from "react"
import { useConfigStorage } from "@/hooks/useConfigStorage"

interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
  themes: string[]
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  themes: string[]
  defaultTheme?: string
  attribute?: string
  storageKey?: string // Keep for compatibility but won't be used
}

export function ThemeProvider({
  children,
  themes,
  defaultTheme = 'halt'
}: ThemeProviderProps) {
  const { userSettings, updateUserSettings, isLoaded } = useConfigStorage()
  const [mounted, setMounted] = React.useState(false)

  // Set mounted to true after hydration
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Apply theme to document
  React.useEffect(() => {
    if (!mounted || !isLoaded) return
    
    const root = document.documentElement
    const currentTheme = userSettings.theme === 'auto' ? defaultTheme : userSettings.theme
    
    // Remove all theme classes
    themes.forEach(theme => {
      root.classList.remove(theme)
    })
    
    // Add current theme class
    if (currentTheme && themes.includes(currentTheme)) {
      root.classList.add(currentTheme)
    } else {
      root.classList.add(defaultTheme)
    }
  }, [userSettings.theme, mounted, isLoaded, themes, defaultTheme])

  const setTheme = React.useCallback((newTheme: string) => {
    updateUserSettings({ theme: newTheme })
  }, [updateUserSettings])

  const contextValue = React.useMemo(() => ({
    theme: userSettings.theme,
    setTheme,
    themes
  }), [userSettings.theme, setTheme, themes])

  return (
    <ThemeContext.Provider value={contextValue}>
      {!mounted || !isLoaded ? (
        <div style={{ visibility: 'hidden' }}>{children}</div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  )
}