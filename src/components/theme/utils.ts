import { themes } from './theme-config';

/**
 * Theme utility functions
 */

/**
 * Get all available theme names
 */
export function getAllThemeNames(): string[] {
  return themes.map(theme => theme.name);
}

/**
 * Get theme label by name
 */
export function getThemeLabel(themeName: string | undefined): string {
  if (!themeName) return 'Theme';
  return themes.find(theme => theme.name === themeName)?.label || 'Theme';
}

/**
 * Check if a theme name is valid
 */
export function isValidTheme(themeName: string): boolean {
  return themes.some(theme => theme.name === themeName);
}

/**
 * Get fallback theme name
 */
export function getFallbackTheme(currentTheme?: string | null): string {
  return currentTheme || 'halt';
}

/**
 * Apply theme class to document element
 */
export function applyThemeClass(themeName: string): void {
  const allThemeNames = getAllThemeNames();
  
  // Remove all existing theme classes
  allThemeNames.forEach(name => {
    document.documentElement.classList.remove(name);
  });
  
  // Add the new theme class
  if (isValidTheme(themeName)) {
    document.documentElement.classList.add(themeName);
  }
}

/**
 * Create a debounced theme setter
 */
export function createDebouncedThemeSetter(
  setTheme: (theme: string) => void,
  delay: number = 0
): (theme: string) => void {
  return (theme: string) => {
    setTimeout(() => setTheme(theme), delay);
  };
}