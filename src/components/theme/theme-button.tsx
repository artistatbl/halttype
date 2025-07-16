import { Theme } from "./theme-config";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";
import { ThemeColorDots } from "./components/theme-color-dots";

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
      }, 150);
    } else if (!isSelected) {
      timeoutId = setTimeout(() => {
        setTheme(getFallbackTheme(currentTheme));
      }, 150);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isHovering, theme.name, setTheme, isSelected, currentTheme]);

  return (
    <Button
      variant="ghost"
      className={`w-full justify-between items-center h-auto p-3 rounded-md hover:bg-primary transition-colors ${isSelected ? 'bg-accent' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="text-sm">{theme.label}</span>
      <ThemeColorDots colors={theme.colors} />
    </Button>
  );
}