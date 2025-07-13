import { Theme } from "./theme-config"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeButtonProps {
  theme: Theme
  isSelected: boolean
  onClick: () => void
}

export function ThemeButton({ theme, isSelected, onClick }: ThemeButtonProps) {
  const { setTheme, theme: currentTheme } = useTheme()
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isHovering) {
      timeoutId = setTimeout(() => {
        setTheme(theme.name)
      }, 150)
    } else if (!isSelected) {
      timeoutId = setTimeout(() => {
        setTheme(currentTheme || 'halt')
      }, 150)
    }
    return () => clearTimeout(timeoutId)
  }, [isHovering, theme.name, setTheme, isSelected, currentTheme])

  return (
    <Button
      variant="ghost"
      className={`w-full justify-between items-center h-9 px-4 rounded-sm hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="text-sm">{theme.label}</span>
      <div className="flex gap-1.5">
        {theme.colors.map((color, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full ring-1 ring-inset ring-border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Button>
  )
}