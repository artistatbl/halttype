'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './theme-provider';
import { themes } from './theme-config';
import { ThemeColorDots } from './components/theme-color-dots';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

import { getFallbackTheme } from './utils';

export function ThemeModal() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [originalTheme, setOriginalTheme] = useState<string | null>(null);

  // Handle keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle theme preview on hover
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (hoveredTheme) {
      if (!originalTheme) {
        setOriginalTheme(getFallbackTheme(theme));
      }
      timeoutId = setTimeout(() => {
        setTheme(hoveredTheme);
      }, 150);
    } else if (originalTheme && !hoveredTheme) {
      timeoutId = setTimeout(() => {
        setTheme(originalTheme);
      }, 150);
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
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 hover:bg-transparent text-primary hover:text-accent transition-colors flex items-center gap-1.5"
        onClick={() => setIsOpen(true)}
      >
        <Palette className="h-4 w-4" />
        <span className="text-xs font-medium capitalize">{theme || 'halt'}</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={handleDialogClose} className="top-[25%]">
        <CommandInput placeholder="Search themes..." />
        <CommandList className="h-[600px]">
          <CommandEmpty>No themes found.</CommandEmpty>
          <CommandGroup>
            {themes.map((themeItem) => (
              <CommandItem
                key={themeItem.name}
                value={themeItem.label}
                onSelect={() => handleThemeSelect(themeItem.name)}
                onMouseEnter={() => handleThemeHover(themeItem.name)}
                onMouseLeave={handleThemeLeave}
                className="flex items-center justify-between p-4 cursor-pointer"
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
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}