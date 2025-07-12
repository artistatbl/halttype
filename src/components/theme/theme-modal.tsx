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
import { themes } from "./theme-config"
import { ThemeButton } from "./theme-button"

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
        <Button variant="ghost" size="sm" className="h-8 flex items-center gap-2 px-2.5 hover:bg-muted">
          <Settings className="h-3.5 w-3.5 text-muted-foreground" />
          {mounted && <span className="text-sm font-normal">{currentTheme}</span>}
          <span className="sr-only">Theme settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 space-y-1.5">
          <DialogTitle className="text-xl font-semibold">Themes</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Choose your visual style
          </DialogDescription>
        </DialogHeader>
        <div className="px-2 pb-4">
          <div className="space-y-0.5">
            {themes.map((t) => (
              <ThemeButton
                key={t.name}
                theme={t}
                isSelected={theme === t.name}
                onClick={() => {
                  setTheme(t.name)
                  setOpen(false)
                }}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}