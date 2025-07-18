'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Language, getLanguageDisplayName, LANGUAGE_LIST } from '@/lib/language-system';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageModal() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard shortcut (Cmd+L / Ctrl+L)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'l') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
  };

  // Get language indicator (flag emoji or first letter)
  const getLanguageIndicator = (language: Language) => {
    const indicators: Record<string, string> = {
      english: '🇺🇸',
      spanish: '🇪🇸',
      french: '🇫🇷',
      german: '🇩🇪',
      italian: '🇮🇹',
      portuguese: '🇵🇹',
      russian: '🇷🇺',
      chinese_simplified: '🇨🇳',
      japanese: '🇯🇵',
      korean: '🇰🇷',
      arabic: '🇸🇦',
      hindi: '🇮🇳',
      turkish: '🇹🇷',
      dutch: '🇳🇱',
      swedish: '🇸🇪',
      norwegian: '🇳🇴',
      danish: '🇩🇰',
      finnish: '🇫🇮',
      polish: '🇵🇱',
      czech: '🇨🇿',
      hungarian: '🇭🇺',
      romanian: '🇷🇴',
      bulgarian: '🇧🇬',
      ukrainian: '🇺🇦',
      greek: '🇬🇷'
    };
    
    return indicators[language] || language.charAt(0).toUpperCase();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 hover:bg-transparent text-primary hover:text-accent transition-colors flex items-center gap-1.5"
        onClick={() => setIsOpen(true)}
      >
        <Languages className="h-4 w-4" />
        <span className="text-xs font-medium">
          {getLanguageDisplayName(currentLanguage)}
        </span>
      </Button>
      
      <CommandDialog open={isOpen} onOpenChange={handleDialogClose} className="top-[35%]">
        <CommandInput placeholder="Search languages..." />
        <CommandList className="max-h-[600px]">
          <CommandEmpty>No languages found.</CommandEmpty>
          <CommandGroup>
            {LANGUAGE_LIST.map((language) => (
              <CommandItem
                key={language}
                value={getLanguageDisplayName(language)}
                onSelect={() => handleLanguageSelect(language)}
                className="flex items-center justify-between p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getLanguageIndicator(language)}</span>
                  <span className="text-sm font-medium">
                    {getLanguageDisplayName(language)}
                  </span>
                  {currentLanguage === language && (
                    <span className="text-xs text-muted-foreground">Current</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    {language}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// Compact version for smaller spaces
export function CompactLanguageModal() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const getLanguageIndicator = (language: Language) => {
    const indicators: Record<string, string> = {
      english: '🇺🇸',
      spanish: '🇪🇸',
      french: '🇫🇷',
      german: '🇩🇪',
      chinese_simplified: '🇨🇳',
      japanese: '🇯🇵',
      korean: '🇰🇷'
    };
    
    return indicators[language] || language.charAt(0).toUpperCase();
  };

  return (
    <>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="top-[35%]">
        <CommandInput placeholder="Search languages..." />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No languages found.</CommandEmpty>
          <CommandGroup>
            {LANGUAGE_LIST.map((language) => (
              <CommandItem
                key={language}
                value={getLanguageDisplayName(language)}
                onSelect={() => handleLanguageSelect(language)}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer",
                  currentLanguage === language && "bg-accent"
                )}
              >
                <span className="text-lg">{getLanguageIndicator(language)}</span>
                <span className="text-sm font-medium">
                  {getLanguageDisplayName(language)}
                </span>
                {currentLanguage === language && (
                  <span className="text-xs text-muted-foreground ml-auto">✓</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}