/**
 * Theme system constants
 */

// Default theme configuration
export const DEFAULT_THEME = 'halt' as const;

// Theme preview timing
export const THEME_PREVIEW_DELAY = 150; // milliseconds

// Theme transition timing
export const THEME_TRANSITION_DELAY = 0; // milliseconds

// Component sizing
export const THEME_COLOR_DOT_SIZE = 'w-3 h-3' as const;
export const THEME_MODAL_MAX_WIDTH = 'sm:max-w-[500px]' as const;
export const THEME_MODAL_HEIGHT = 'h-[500px]' as const;

// CSS classes
export const THEME_COLOR_DOT_CLASSES = 'rounded-full ring-1 ring-inset ring-border' as const;
export const THEME_BUTTON_BASE_CLASSES = 'w-full justify-between items-center h-9 px-4 rounded-sm hover:bg-muted' as const;