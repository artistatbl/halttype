'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { themes } from './theme-config';
import { ThemeColorDots } from './components/theme-color-dots';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { THEME_MODAL_MAX_WIDTH, THEME_MODAL_HEIGHT, THEME_PREVIEW_DELAY } from './constants';
import { getFallbackTheme } from './utils';

export function ThemeModal() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [originalTheme, setOriginalTheme] = useState<string | null>(null);

  // Handle theme preview on hover
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (hoveredTheme) {
      if (!originalTheme) {
        setOriginalTheme(getFallbackTheme(theme));
      }
      timeoutId = setTimeout(() => {
        setTheme(hoveredTheme);
      }, THEME_PREVIEW_DELAY);
    } else if (originalTheme && !hoveredTheme) {
      timeoutId = setTimeout(() => {
        setTheme(originalTheme);
      }, THEME_PREVIEW_DELAY);
    }
    
    return () => clearTimeout(timeoutId);
  }, [hoveredTheme, theme, setTheme, originalTheme]);

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName);
    setHoveredTheme(null);
    setOriginalTheme(null);
    setIsOpen(false);
  };

  const handleThemeHover = (themeName: string) => {
    setHoveredTheme(themeName);
  };

  const handleThemeLeave = () => {
    setHoveredTheme(null);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setHoveredTheme(null);
      if (originalTheme) {
        setTheme(originalTheme);
        setOriginalTheme(null);
      }
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Palette className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`${THEME_MODAL_MAX_WIDTH} ${THEME_MODAL_HEIGHT} flex flex-col`}>
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {themes.map((themeItem) => (
            <Button
              key={themeItem.name}
              variant="ghost"
              className={`w-full justify-between items-center h-12 px-4 rounded-sm hover:bg-muted ${theme === themeItem.name ? 'bg-muted' : ''}`}
              onClick={() => handleThemeSelect(themeItem.name)}
              onMouseEnter={() => handleThemeHover(themeItem.name)}
              onMouseLeave={handleThemeLeave}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{themeItem.label}</span>
                {theme === themeItem.name && (
                  <span className="text-xs text-muted-foreground">Current</span>
                )}
                {hoveredTheme === themeItem.name && (
                  <span className="text-xs text-muted-foreground animate-pulse">Preview</span>
                )}
              </div>
              <ThemeColorDots colors={themeItem.colors} />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}