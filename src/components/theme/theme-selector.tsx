"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={theme === t.name ? "bg-accent" : ""}
          >
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}