/**
 * Multilingual word lists for typing tests
 * Loads from JSON files in public/static/language/
 */

import type { Language } from '@/lib/language-system';
import { WordDifficulty, commonWords, programmingWords } from './word-lists';

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
    return commonWords;
  }
}

/**
 * Get words by difficulty from a language's word list
 */
function getWordsByDifficultyFromList(words: string[], difficulty: WordDifficulty): string[] {
  const totalWords = words.length;
  
  switch (difficulty) {
    case 'easy':
      // First 30% of words (most common)
      return words.slice(0, Math.floor(totalWords * 0.3));
    case 'medium':
      // Middle 40% of words
      const startMedium = Math.floor(totalWords * 0.3);
      const endMedium = Math.floor(totalWords * 0.7);
      return words.slice(startMedium, endMedium);
    case 'hard':
      // Last 30% of words (least common)
      return words.slice(Math.floor(totalWords * 0.7));
    case 'programming':
      // For programming, return programming words or fallback to hard
      return programmingWords;
    default:
      return words.slice(0, Math.floor(totalWords * 0.3));
  }
}

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
 * Get word list based on language and difficulty
 */
export async function getWordsByLanguageAndDifficulty(
  language: Language,
  difficulty: WordDifficulty
): Promise<string[]> {
  // All languages (including programming languages) now load from JSON files
  try {
    const words = await loadLanguageWords(language);
    return getWordsByDifficultyFromList(words, difficulty);
  } catch (error) {
    console.warn(`Failed to load words for ${language}, using fallback:`, error);
    // Final fallback to English or programming words
    if (language.startsWith('code_')) {
      return programmingWords;
    }
    return getWordsByDifficultyFromList(commonWords, difficulty);
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