/**
 * Text Generation Module
 * 
 * This module provides utilities for generating random text for typing tests.
 * It supports different difficulty levels, word counts, and customization options.
 */

export {
  generateText,
  generatePresetText,
  generateSeededText,
  type TextGenerationOptions,
  type GeneratedText,
  type WordDifficulty
} from './text-generator';

export {
  getWordsByDifficulty,
  commonWords,
  mediumWords,
  hardWords,
  programmingWords
} from './word-lists';

import { generatePresetText, type WordDifficulty } from './text-generator';

/**
 * Quick generators for common test configurations
 */
export const textPresets = {
  /**
   * Generate a 10-word test
   */
  words10: (difficulty: WordDifficulty = 'medium', punctuation = false, numbers = false) => 
    generatePresetText(10, difficulty, punctuation, numbers),
  
  /**
   * Generate a 25-word test
   */
  words25: (difficulty: WordDifficulty = 'medium', punctuation = false, numbers = false) => 
    generatePresetText(25, difficulty, punctuation, numbers),
  
  /**
   * Generate a 50-word test
   */
  words50: (difficulty: WordDifficulty = 'medium', punctuation = false, numbers = false) => 
    generatePresetText(50, difficulty, punctuation, numbers),
  
  /**
   * Generate a 100-word test
   */
  words100: (difficulty: WordDifficulty = 'medium', punctuation = false, numbers = false) => 
    generatePresetText(100, difficulty, punctuation, numbers),
};