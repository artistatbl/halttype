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
export { useThemePreview } from './hooks/use-theme-preview';

// Constants
export {
  DEFAULT_THEME,
  THEME_PREVIEW_DELAY,
  THEME_TRANSITION_DELAY,
  THEME_COLOR_DOT_SIZE,
  THEME_MODAL_MAX_WIDTH,
  THEME_MODAL_HEIGHT,
  THEME_COLOR_DOT_CLASSES,
  THEME_BUTTON_BASE_CLASSES,
} from './constants';