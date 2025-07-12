"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { SettingsIcon as Settings } from "@/components/icons/settings"
import { themes } from "./theme-config"

export function ThemeModal() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [hoveredTheme, setHoveredTheme] = React.useState<string | null>(null)
  const [originalTheme, setOriginalTheme] = React.useState<string | null>(null)
  
  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme preview on hover
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (hoveredTheme) {
      if (!originalTheme) {
        setOriginalTheme(theme || 'system')
      }
      timeoutId = setTimeout(() => {
        setTheme(hoveredTheme)
      }, 150)
    } else if (originalTheme) {
      timeoutId = setTimeout(() => {
        setTheme(originalTheme)
      }, 150)
    }
    return () => clearTimeout(timeoutId)
  }, [hoveredTheme, theme, setTheme, originalTheme])

  // Find the current theme label
  const currentTheme = themes.find(t => t.name === theme)?.label || "Theme"

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName)
    setHoveredTheme(null)
    setOriginalTheme(null)
    setOpen(false)
  }

  const handleThemeHover = (themeName: string) => {
    setHoveredTheme(themeName)
  }

  const handleThemeLeave = () => {
    setHoveredTheme(null)
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setHoveredTheme(null)
      if (originalTheme) {
        setTheme(originalTheme)
        setOriginalTheme(null)
      }
    }
    setOpen(open)
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 flex items-center gap-2 px-2.5 hover:bg-muted"
        onClick={() => setOpen(true)}
      >
        <Settings className="h-3.5 w-3.5 text-muted-foreground" />
        {mounted && <span className="text-sm font-normal">{currentTheme}</span>}
        <span className="sr-only">Theme settings</span>
      </Button>
      
      <CommandDialog 
        open={open} 
        onOpenChange={handleDialogClose}
        title="Theme Selector"
        description="Search and select a theme"
        className="sm:max-w-[500px] h-[500px] top-[10%] translate-y-0"
      >
        <CommandInput placeholder="Search themes..." />
        <CommandList className="max-h-[500px]">
          <CommandEmpty>No themes found.</CommandEmpty>
          <CommandGroup heading="Available Themes">
            {themes.map((t) => (
              <CommandItem
                key={t.name}
                value={t.label}
                onSelect={() => handleThemeSelect(t.name)}
                onMouseEnter={() => handleThemeHover(t.name)}
                onMouseLeave={handleThemeLeave}
                className="flex items-center gap-3 p-3 cursor-pointer"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex gap-1">
                    {t.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ring-1 ring-inset ring-border transition-all duration-200 ${
                          hoveredTheme === t.name ? 'scale-110 ring-2' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{t.label}</span>
                  {hoveredTheme === t.name && (
                    <span className="ml-auto text-xs text-muted-foreground animate-pulse">Preview</span>
                  )}
                  {theme === t.name && hoveredTheme !== t.name && (
                    <span className="ml-auto text-xs text-muted-foreground">Current</span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}