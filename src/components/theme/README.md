# Theme System

A clean, maintainable theme system for the application with proper TypeScript support and reusable components.

## Structure

```
theme/
├── components/
│   └── theme-color-dots.tsx    # Reusable color dots component
├── hooks/
│   └── use-theme-preview.ts     # Theme preview logic hook
├── constants.ts                 # Theme system constants
├── utils.ts                     # Theme utility functions
├── theme-config.ts              # Theme definitions and types
├── theme-provider.tsx           # Theme context provider
├── theme-switcher.tsx           # Theme class applier
├── theme-modal.tsx              # Theme selection modal
├── theme-button.tsx             # Individual theme button
├── index.ts                     # Main exports
└── README.md                    # This file
```

## Key Features

### 🎨 **Clean Architecture**
- Separation of concerns with dedicated files for different responsibilities
- Reusable components and utilities
- Proper TypeScript types and interfaces

### 🔧 **Maintainable Code**
- Constants file for all magic numbers and strings
- Utility functions for common operations
- Custom hooks for complex logic

### 🚀 **Developer Experience**
- Comprehensive exports from index.ts
- Well-documented functions and components
- Type-safe theme operations

## Usage

### Basic Theme Setup

```tsx
import { ThemeProvider, ThemeSwitcher } from '@/components/theme';

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Theme Selection Modal

```tsx
import { ThemeModal } from '@/components/theme';

function Header() {
  return (
    <div>
      <ThemeModal />
    </div>
  );
}
```

### Using Theme Utilities

```tsx
import { 
  getAllThemeNames, 
  isValidTheme, 
  getFallbackTheme 
} from '@/components/theme';

// Get all available themes
const themes = getAllThemeNames();

// Validate theme
if (isValidTheme('halt')) {
  // Theme is valid
}

// Get fallback theme
const theme = getFallbackTheme(userTheme);
```

### Custom Theme Preview

```tsx
import { useThemePreview } from '@/components/theme';

function CustomThemeButton() {
  const { handleThemeHover, handleThemeLeave } = useThemePreview();
  
  return (
    <button
      onMouseEnter={() => handleThemeHover('halt')}
      onMouseLeave={handleThemeLeave}
    >
      Preview Halt Theme
    </button>
  );
}
```

## Configuration

### Adding New Themes

1. Add theme CSS file to `/public/static/theme/`
2. Update `theme-config.ts`:

```tsx
export const themes: Theme[] = [
  // ... existing themes
  {
    name: "new-theme",
    label: "New Theme",
    colors: ["#color1", "#color2", "#color3", "#color4"],
  },
];
```

3. Update the `ThemeName` type:

```tsx
export type ThemeName = 
  | 'halt'
  | 'amber'
  // ... other themes
  | 'new-theme';
```

### Customizing Constants

Edit `constants.ts` to modify:
- Default theme
- Preview delays
- Component sizing
- CSS classes

## Best Practices

1. **Always use utilities**: Use functions from `utils.ts` instead of hardcoding theme logic
2. **Type safety**: Use the `ThemeName` type for theme-related parameters
3. **Constants**: Use constants from `constants.ts` for consistent values
4. **Reusable components**: Use `ThemeColorDots` for displaying theme colors
5. **Custom hooks**: Use `useThemePreview` for theme preview functionality

## Migration Guide

If migrating from the old theme system:

1. Replace hardcoded theme arrays with `getAllThemeNames()`
2. Replace hardcoded fallback themes with `getFallbackTheme()`
3. Use `ThemeColorDots` instead of inline color dot rendering
4. Import constants instead of using magic numbers
5. Use utility functions for theme validation and manipulation