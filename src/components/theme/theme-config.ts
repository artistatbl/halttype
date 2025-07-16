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
  | 'noonlight'
  | 'nord'
  | 'blue-light'
  | 'northern'
  | 'sailor'
  | 'soothers-red'
  | 'soothers'
  | 'bloom'
  | 'red-stars';

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
    colors: ["#8b4513", "#faf9f7", "#d2691e", "#f5f5f0"],
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
  {
    name: "nord",
    label: "Nord",
    colors: ["#88c0d0", "#2e3440", "#5e81ac", "#3b4252"],
  },
  {
    name: "blue-light",
    label: "Blue Light",
    colors: ["#3b82f6", "#f8fafc", "#60a5fa", "#e2e8f0"],
  },
  {
    name: "northern",
    label: "Northern",
    colors: ["#4c9aff", "#0d1421", "#7bb3ff", "#1a2332"],
  },
  {
    name: "sailor",
    label: "Sailor",
    colors: ["#1e40af", "#f1f5f9", "#3b82f6", "#cbd5e1"],
  },
  {
    name: "soothers-red",
    label: "Soothers Red",
    colors: ["#dc2626", "#fef7f7", "#ef4444", "#fecaca"],
  },
  {
    name: "soothers",
    label: "Soothers",
    colors: ["#22c55e", "#0f1419", "#16a34a", "#1a2e1a"],
  },
  {
    name: "bloom",
    label: "Bloom",
    colors: ["#8b5cf6", "#f3f0ff", "#a855f7", "#e9d5ff"],
  },
  {
    name: "red-stars",
    label: "Red Stars",
    colors: ["#dc2626", "#f5f5f5", "#ef4444", "#fecaca"],
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