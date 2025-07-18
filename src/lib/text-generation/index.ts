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
  type GeneratedText
} from './text-generator';

export {
  textGenerationService,
  TextGenerationService,
  type TextGenerationRequest,
  type TextGenerationSession
} from './text-generation-service';

// Removed word-lists exports (difficulty-related functionality removed)

import { generatePresetText } from './text-generator';

/**
 * Preset text generators for common word counts
 * These provide convenient shortcuts for generating text with standard configurations
 */
export const presets = {
  /**
   * Generate 10 words of text
   */
  words10: async (punctuation = false, numbers = false) =>
    await generatePresetText(10, punctuation, numbers),

  /**
   * Generate 25 words of text
   */
  words25: async (punctuation = false, numbers = false) =>
    await generatePresetText(25, punctuation, numbers),

  /**
   * Generate 50 words of text
   */
  words50: async (punctuation = false, numbers = false) =>
    await generatePresetText(50, punctuation, numbers),

  /**
   * Generate 100 words of text
   */
  words100: async (punctuation = false, numbers = false) =>
    await generatePresetText(100, punctuation, numbers),
};