// Main components
export { ThemeProvider } from './theme-provider';
export { ThemeSwitcher } from './theme-switcher';
export { ThemeModal } from './theme-modal';
export { ThemeButton } from './theme-button';

// Sub-components
export { ThemeColorDots } from './components/theme-color-dots';

// Configuration and types
export { themes, type Theme, type ThemeName, getThemeByName, isThemeValid } from './theme-config';

// Utilities
export {
  getAllThemeNames,
  getThemeLabel,
  isValidTheme,
  getFallbackTheme,
  applyThemeClass,
  createDebouncedThemeSetter,
} from './utils';

// Hooks
export { useTheme } from './theme-provider';
export { useThemePreview } from './hooks/use-theme-preview';