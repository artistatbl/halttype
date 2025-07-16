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
  | 'mono'
  | 'oaky'
  | 'neobrutalims-dark'
  | 'neobrutalims'
  | 'neo-red'
  | 'peach'
  | 'nade'
  | 'terra'
  | 'forest'
  | 'noonlight';

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
  {
    name: "oaky",
    label: "Oaky",
    colors: ["#8b4513", "#f5f5dc", "#d2691e", "#deb887"],
  },
  {
    name: "neobrutalims-dark",
    label: "Neobrutalims Dark",
    colors: ["#ff0080", "#000000", "#00ff80", "#1a1a1a"],
  },
  {
    name: "neobrutalims",
    label: "Neobrutalims",
    colors: ["#ff0080", "#ffffff", "#00ff80", "#f0f0f0"],
  },
  {
    name: "neo-red",
    label: "Neo Red",
    colors: ["#dc2626", "#0f0f0f", "#ef4444", "#1f1f1f"],
  },
  {
    name: "peach",
    label: "Peach",
    colors: ["#ffab91", "#fff3e0", "#ff8a65", "#fbe9e7"],
  },
  {
    name: "nade",
    label: "Nade",
    colors: ["#4caf50", "#1b5e20", "#66bb6a", "#2e7d32"],
  },
  {
    name: "terra",
    label: "Terra",
    colors: ["#8d6e63", "#3e2723", "#a1887f", "#5d4037"],
  },
  {
    name: "forest",
    label: "Forest",
    colors: ["#2e7d32", "#1b5e20", "#43a047", "#2e7d32"],
  },
  {
    name: "noonlight",
    label: "Noonlight",
    colors: ["#fff59d", "#f57f17", "#ffeb3b", "#ff8f00"],
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