'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { themes } from './theme-config';
import { ThemeButton } from './theme-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { THEME_MODAL_MAX_WIDTH, THEME_MODAL_HEIGHT } from './constants';
import { getFallbackTheme } from './utils';

export function ThemeModal() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme || getFallbackTheme());
  const [originalTheme, setOriginalTheme] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !originalTheme) {
      setOriginalTheme(getFallbackTheme(theme));
    }
  }, [isOpen, theme, originalTheme]);

  const handleThemeSelect = (themeName: string) => {
    setSelectedTheme(themeName);
    setTheme(themeName);
  };

  const handleCancel = () => {
    if (originalTheme) {
      setTheme(originalTheme);
      setSelectedTheme(originalTheme);
    }
    setIsOpen(false);
    setOriginalTheme(null);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setOriginalTheme(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          {themes.map((theme) => (
            <ThemeButton
              key={theme.name}
              theme={theme}
              isSelected={selectedTheme === theme.name}
              onClick={() => handleThemeSelect(theme.name)}
            />
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}