// Language type definition
export type Language = 
  | 'english'
  | 'english_1k'
  | 'english_5k'
  | 'english_10k'
  | 'spanish'
  | 'spanish_1k'
  | 'french'
  | 'french_1k'
  | 'german'
  | 'german_1k'
  | 'chinese_simplified'
  | 'chinese_traditional'
  | 'japanese_hiragana'
  | 'japanese_katakana'
  | 'japanese_romaji'
  | 'korean'
  | 'russian'
  | 'arabic'
  | 'hindi'
  | 'code_python'
  | 'code_javascript'
  | 'code_typescript'
  | 'code_java'
  | 'code_c'
  | 'code_cpp'
  | 'code_rust'
  | 'code_go';

// Default language constant
export const DEFAULT_LANGUAGE: Language = 'english';

// Complete language list
export const LANGUAGE_LIST: Language[] = [
  'english',
  'english_1k',
  'english_5k',
  'english_10k',
  'spanish',
  'spanish_1k',
  'french',
  'french_1k',
  'german',
  'german_1k',
  'chinese_simplified',
  'chinese_traditional',
  'japanese_hiragana',
  'japanese_katakana',
  'japanese_romaji',
  'korean',
  'russian',
  'arabic',
  'hindi',
  'code_python',
  'code_javascript',
  'code_typescript',
  'code_java',
  'code_c',
  'code_cpp',
  'code_rust',
  'code_go'
];

// Language groups
export const LANGUAGE_GROUPS: Record<string, Language[]> = {
  english: ['english', 'english_1k', 'english_5k', 'english_10k'],
  spanish: ['spanish', 'spanish_1k'],
  french: ['french', 'french_1k'],
  german: ['german', 'german_1k'],
  chinese: ['chinese_simplified', 'chinese_traditional'],
  japanese: ['japanese_hiragana', 'japanese_katakana', 'japanese_romaji'],
  asian: ['korean', 'chinese_simplified', 'chinese_traditional', 'japanese_hiragana', 'japanese_katakana', 'japanese_romaji'],
  european: ['english', 'spanish', 'french', 'german', 'russian'],
  middle_eastern: ['arabic', 'hindi'],
  code: ['code_python', 'code_javascript', 'code_typescript', 'code_java', 'code_c', 'code_cpp', 'code_rust', 'code_go']
};

export type LanguageGroupName = keyof typeof LANGUAGE_GROUPS;

// Language display names for text display
export const LANGUAGE_DISPLAY_NAMES: Record<Language, string> = {
  // English variants
  english: 'English',
  english_1k: 'English 1K',
  english_5k: 'English 5K',
  english_10k: 'English 10K',
  
  // Spanish variants
  spanish: 'Spanish',
  spanish_1k: 'Spanish 1K',
  
  // French variants
  french: 'French',
  french_1k: 'French 1K',
  
  // German variants
  german: 'German',
  german_1k: 'German 1K',
  
  // Chinese variants
  chinese_simplified: 'Chinese (Simplified)',
  chinese_traditional: 'Chinese (Traditional)',
  
  // Japanese variants
  japanese_hiragana: 'Japanese (Hiragana)',
  japanese_katakana: 'Japanese (Katakana)',
  japanese_romaji: 'Japanese (Romaji)',
  
  // Other languages
  korean: 'Korean',
  russian: 'Russian',
  arabic: 'Arabic',
  hindi: 'Hindi',
  
  // Code languages
  code_python: 'Python',
  code_javascript: 'JavaScript',
  code_typescript: 'TypeScript',
  code_java: 'Java',
  code_c: 'C',
  code_cpp: 'C++',
  code_rust: 'Rust',
  code_go: 'Go',
};

/**
 * Language system configuration
 */
export interface LanguageConfig {
  currentLanguage: Language;
  availableLanguages: Language[];
  languageGroups: Record<string, Language[]>;
}

/**
 * Default language configuration
 */
export const DEFAULT_LANGUAGE_CONFIG: LanguageConfig = {
  currentLanguage: DEFAULT_LANGUAGE,
  availableLanguages: LANGUAGE_LIST,
  languageGroups: LANGUAGE_GROUPS,
};

/**
 * Get display name for a language
 */
export function getLanguageDisplayName(language: Language): string {
  return LANGUAGE_DISPLAY_NAMES[language] || language.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Get languages by group
 */
export function getLanguagesByGroup(groupName: LanguageGroupName): Language[] {
  return LANGUAGE_GROUPS[groupName] || [];
}

/**
 * Check if a language is available
 */
export function isLanguageAvailable(language: string): language is Language {
  return LANGUAGE_LIST.includes(language as Language);
}

/**
 * Get popular languages (commonly used ones)
 */
export function getPopularLanguages(): Language[] {
  return [
    'english',
    'english_1k',
    'english_5k',
    'spanish',
    'french',
    'german',
    'chinese_simplified',
    'japanese_romaji',
    'korean',
    'russian',
    'code_python',
    'code_javascript',
    'code_typescript'
  ];
}

/**
 * Language system class for managing language state
 */
export class LanguageSystem {
  private config: LanguageConfig;
  
  constructor(initialConfig?: Partial<LanguageConfig>) {
    this.config = {
      ...DEFAULT_LANGUAGE_CONFIG,
      ...initialConfig
    };
  }
  
  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.config.currentLanguage;
  }
  
  /**
   * Set current language
   */
  setCurrentLanguage(language: Language): void {
    if (this.isLanguageAvailable(language)) {
      this.config.currentLanguage = language;
    } else {
      throw new Error(`Language '${language}' is not available`);
    }
  }
  
  /**
   * Get current language display name for text display
   */
  getCurrentLanguageDisplayName(): string {
    return getLanguageDisplayName(this.config.currentLanguage);
  }
  
  /**
   * Get all available languages
   */
  getAvailableLanguages(): Language[] {
    return this.config.availableLanguages;
  }
  
  /**
   * Check if language is available
   */
  isLanguageAvailable(language: string): language is Language {
    return isLanguageAvailable(language);
  }
  
  /**
   * Get language groups
   */
  getLanguageGroups(): Record<string, Language[]> {
    return this.config.languageGroups;
  }
  
  /**
   * Reset to default language (english)
   */
  resetToDefault(): void {
    this.config.currentLanguage = DEFAULT_LANGUAGE;
  }
  
  /**
   * Get configuration
   */
  getConfig(): LanguageConfig {
    return { ...this.config };
  }
  
  /**
   * Get formatted text for display with current language
   */
  getDisplayText(): string {
    return `Current Language: ${this.getCurrentLanguageDisplayName()}`;
  }
}

/**
 * Create a new language system instance
 */
export function createLanguageSystem(initialConfig?: Partial<LanguageConfig>): LanguageSystem {
  return new LanguageSystem(initialConfig);
}

/**
 * Export constants for easy access
 */
export const LANGUAGE_CONSTANTS = {
  DEFAULT_LANGUAGE,
  LANGUAGE_LIST,
  LANGUAGE_GROUPS,
  LANGUAGE_DISPLAY_NAMES,
  POPULAR_LANGUAGES: getPopularLanguages(),
} as const;

/**
 * Text display utilities
 */
export const TextDisplay = {
  /**
   * Get default language for text display
   */
  getDefaultLanguage(): Language {
    return DEFAULT_LANGUAGE;
  },
  
  /**
   * Format language name for display
   */
  formatLanguageName(language: Language): string {
    return getLanguageDisplayName(language);
  },
  
  /**
   * Get language info for display
   */
  getLanguageInfo(language: Language): { code: Language; name: string; group?: string } {
    const group = Object.keys(LANGUAGE_GROUPS).find(groupName => 
      LANGUAGE_GROUPS[groupName].includes(language)
    );
    
    return {
      code: language,
      name: getLanguageDisplayName(language),
      group
    };
  }
};