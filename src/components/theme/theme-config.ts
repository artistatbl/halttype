/**
 * Theme configuration and types
 */

export interface Theme {
  name: string;
  label: string;
  colors: string[];
}

export type ThemeName = 
  | 'halt'
  | 'amber'
  | 'caffiene'
  | 'nature'
  | 'notebook'
  | 'claude'
  | 'twitter'
  | 'mono';

export const themes: Theme[] = [
  {
    name: "halt",
    label: "Halt",
    colors: ["#fb923c", "#27272a", "#f97316", "#18181b"],
  },
  {
    name: "amber",
    label: "Amber",
    colors: ["#f59e0b", "#0f172a", "#fbbf24", "#1e293b"],
  },
  {
    name: "caffiene",
    label: "Caffiene",
    colors: ["#8b5cf6", "#0f172a", "#a78bfa", "#1e293b"],
  },
  {
    name: "nature",
    label: "Nature",
    colors: ["#10b981", "#0f172a", "#34d399", "#1e293b"],
  },
  {
    name: "notebook",
    label: "Notebook",
    colors: ["#3b82f6", "#f8fafc", "#60a5fa", "#e2e8f0"],
  },
  {
    name: "claude",
    label: "Claude",
    colors: ["#f97316", "#0f172a", "#fb923c", "#1e293b"],
  },
  {
    name: "twitter",
    label: "Twitter",
    colors: ["#1d9bf0", "#0f172a", "#3b9df8", "#1e293b"],
  },
  {
    name: "mono",
    label: "Mono",
    colors: ["#6b7280", "#0f172a", "#9ca3af", "#1e293b"],
  },
] as const;

/**
 * Get theme by name
 */
export function getThemeByName(name: string): Theme | undefined {
  return themes.find(theme => theme.name === name);
}

/**
 * Check if theme exists
 */
export function isThemeValid(name: string): name is ThemeName {
  return themes.some(theme => theme.name === name);
}