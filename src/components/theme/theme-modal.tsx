"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SettingsIcon as Settings } from "@/components/icons/settings"

// Define available themes from theme.md
const themes = [
  { name: "system", label: "System" },
  { name: "light", label: "Light" },
  { name: "dark", label: "Dark" },
  { name: "amber", label: "Amber" },
  { name: "caffiene", label: "Caffiene" },
  { name: "nature", label: "Nature" },
  { name: "notebook", label: "Notebook" },
  { name: "claude", label: "Claude" },
  { name: "twitter", label: "Twitter" },
  { name: "mono", label: "Mono" },
]

export function ThemeModal() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  
  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Find the current theme label
  const currentTheme = themes.find(t => t.name === theme)?.label || "Theme"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 flex items-center gap-2 px-3">
          <Settings className="h-4 w-4" />
          {mounted && <span>{currentTheme}</span>}
          <span className="sr-only">Theme settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
          <DialogDescription>
            Select a theme to customize your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {themes.map((t) => (
            <Button
              key={t.name}
              variant={theme === t.name ? "default" : "outline"}
              className="justify-start"
              onClick={() => {
                console.log('Setting theme to:', t.name)
                setTheme(t.name)
                setOpen(false)
              }}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}