/**
 * Multilingual word lists for typing tests
 * Loads from JSON files in public/static/language/
 */

import type { Language } from '@/lib/language-system';

// Interface for language JSON files
interface LanguageFile {
  name: string;
  noLazyMode: boolean;
  orderedByFrequency: boolean;
  words: string[];
}

// Cache for loaded language files
const languageCache = new Map<string, string[]>();

/**
 * Load words from a language JSON file
 */
async function loadLanguageWords(language: string): Promise<string[]> {
  // Check cache first
  if (languageCache.has(language)) {
    return languageCache.get(language)!;
  }

  try {
    const response = await fetch(`/static/languages/${language}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load language file: ${language}`);
    }
    
    const languageFile: LanguageFile = await response.json();
    const words = languageFile.words || [];
    
    // Cache the words
    languageCache.set(language, words);
    
    return words;
  } catch (error) {
    console.warn(`Failed to load language ${language}, falling back to English:`, error);
    return await loadLanguageWords('english');
  }
}

// Removed difficulty-based word filtering

// All programming languages now load from JSON files in /static/languages/

// List of supported programming languages (those with JSON files)
const supportedProgrammingLanguages: Language[] = [
  'code_bash',
  'code_csharp', 
  'code_css',
  'code_dart',
  'code_elixir',
  'code_html',
  'code_java',
  'code_kotlin',
  'code_latex',
  'code_lua',
  'code_pascal',
  'code_python',
  'code_typescript'
];

/**
 * Get word list based on language
 */
export async function getWordsByLanguage(
  language: Language
): Promise<string[]> {
  // All languages (including programming languages) now load from JSON files
  try {
    const words = await loadLanguageWords(language);
    return words;
  } catch (error) {
    console.warn(`Failed to load words for ${language}, using fallback:`, error);
    // Final fallback to English
    return await loadLanguageWords('english');
  }
}

/**
 * Check if a language has specific word lists
 */
export function hasLanguageSupport(language: Language): boolean {
  // Programming languages are supported if they're in our list
  if (language.startsWith('code_')) {
    return supportedProgrammingLanguages.includes(language);
  }
  // Regular languages are supported if they have JSON files
  // For now, we assume all non-programming languages are supported via JSON
  return true;
}

/**
 * Get all supported languages for text generation
 */
export function getSupportedLanguages(): Language[] {
  // Return programming languages from our supported list
  // Regular languages are determined by available JSON files
  return supportedProgrammingLanguages;
}