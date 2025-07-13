import { Theme } from "./theme-config";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeColorDots } from "./components/theme-color-dots";
import { THEME_PREVIEW_DELAY, THEME_BUTTON_BASE_CLASSES } from "./constants";
import { getFallbackTheme } from "./utils";

interface ThemeButtonProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
}

export function ThemeButton({ theme, isSelected, onClick }: ThemeButtonProps) {
  const { setTheme, theme: currentTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isHovering) {
      timeoutId = setTimeout(() => {
        setTheme(theme.name);
      }, THEME_PREVIEW_DELAY);
    } else if (!isSelected) {
      timeoutId = setTimeout(() => {
        setTheme(getFallbackTheme(currentTheme));
      }, THEME_PREVIEW_DELAY);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isHovering, theme.name, setTheme, isSelected, currentTheme]);

  return (
    <Button
      variant="ghost"
      className={`${THEME_BUTTON_BASE_CLASSES} ${isSelected ? 'bg-muted' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="text-sm">{theme.label}</span>
      <ThemeColorDots colors={theme.colors} />
    </Button>
  );
}