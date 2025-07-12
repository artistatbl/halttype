import { Theme } from "./theme-config"
import { Button } from "@/components/ui/button"

interface ThemeButtonProps {
  theme: Theme
  isSelected: boolean
  onClick: () => void
}

export function ThemeButton({ theme, isSelected, onClick }: ThemeButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-between items-center h-9 px-4 rounded-sm hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
      onClick={onClick}
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