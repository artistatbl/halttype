import { useEffect, useState } from 'react';
import { useTheme } from '../theme-provider';

import { getFallbackTheme } from '../utils';

/**
 * Custom hook for handling theme preview functionality
 * Used for hover effects and temporary theme changes
 */
export function useThemePreview() {
  const { theme, setTheme } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [originalTheme, setOriginalTheme] = useState<string | null>(null);

  // Handle theme preview on hover
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (hoveredTheme) {
      // Store original theme if not already stored
      if (!originalTheme) {
        setOriginalTheme(getFallbackTheme(theme));
      }
      
      // Apply hovered theme after delay
      timeoutId = setTimeout(() => {
        setTheme(hoveredTheme);
      }, 150);
    } else if (originalTheme) {
      // Restore original theme after delay
      timeoutId = setTimeout(() => {
        setTheme(originalTheme);
      }, 150);
    }

    return () => clearTimeout(timeoutId);
  }, [hoveredTheme, theme, setTheme, originalTheme]);

  const handleThemeHover = (themeName: string) => {
    setHoveredTheme(themeName);
  };

  const handleThemeLeave = () => {
    setHoveredTheme(null);
  };

  const resetPreview = () => {
    setHoveredTheme(null);
    if (originalTheme) {
      setTheme(originalTheme);
      setOriginalTheme(null);
    }
  };

  const confirmPreview = () => {
    setHoveredTheme(null);
    setOriginalTheme(null);
  };

  return {
    hoveredTheme,
    originalTheme,
    handleThemeHover,
    handleThemeLeave,
    resetPreview,
    confirmPreview,
  };
}