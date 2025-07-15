import { useState, useEffect, useMemo, useCallback } from 'react';
import { generateText, textPresets, type WordDifficulty, type GeneratedText } from '@/lib/text-generation';

export interface TextGenerationConfig {
  mode: 'time' | 'words' | 'quote';
  wordCount: 10 | 25 | 50 | 100;
  difficulty: WordDifficulty;
  punctuation: boolean;
  numbers: boolean;
  customText?: string; // For quote mode or custom content
  refreshKey?: number; // Used to generate new text on page refresh
}

export interface UseTextGenerationReturn {
  currentText: string;
  generatedData: GeneratedText | null;
  regenerateText: () => void;
  isGenerating: boolean;
  error: string | null;
}

/**
 * Hook for managing text generation in typing tests
 */
export function useTextGeneration(config: TextGenerationConfig): UseTextGenerationReturn {
  const [generatedData, setGeneratedData] = useState<GeneratedText | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regenerationKey, setRegenerationKey] = useState(0);

  // Generate text based on current configuration
  const generateNewText = useCallback(() => {
    setIsGenerating(true);
    setError(null);

    try {
      let result: GeneratedText;

      // Handle different modes
      switch (config.mode) {
        case 'quote':
          // For quote mode, use custom text if provided, otherwise generate medium difficulty
          if (config.customText) {
            result = {
              text: config.customText,
              wordCount: config.customText.split(/\s+/).length,
              difficulty: config.difficulty,
              options: {
                wordCount: config.customText.split(/\s+/).length,
                difficulty: config.difficulty,
                includePunctuation: config.punctuation,
                includeNumbers: config.numbers
              }
            };
          } else {
            // Generate a longer text for quote mode (50-100 words)
            const quoteWordCount = 75;
            result = generateText({
              wordCount: quoteWordCount,
              difficulty: config.difficulty,
              includePunctuation: true, // Quotes typically have punctuation
              includeNumbers: config.numbers,
              seed: `quote-${config.difficulty}-${config.numbers}-${config.refreshKey || Date.now()}-${regenerationKey}`
            });
          }
          break;

        case 'words':
          // Use preset generators for word mode
          // Instead of using presets, generate text directly with a seed that includes the refresh key
          result = generateText({
            wordCount: config.wordCount,
            difficulty: config.difficulty,
            includePunctuation: config.punctuation,
            includeNumbers: config.numbers,
            seed: `words-${config.wordCount}-${config.difficulty}-${config.punctuation}-${config.numbers}-${config.refreshKey || Date.now()}-${regenerationKey}`
          });
          break;

        case 'time':
        default:
          // For time mode, generate enough text to last the duration
          // Estimate: average typing speed is 40 WPM, so generate 2x the expected words
          const estimatedWords = Math.max(50, config.wordCount * 2);
          result = generateText({
            wordCount: estimatedWords,
            difficulty: config.difficulty,
            includePunctuation: config.punctuation,
            includeNumbers: config.numbers,
            seed: `time-${config.difficulty}-${config.punctuation}-${config.numbers}-${config.refreshKey || Date.now()}-${regenerationKey}`
          });
          break;
      }

      setGeneratedData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate text');
      console.error('Text generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [config.mode, config.wordCount, config.difficulty, config.punctuation, config.numbers, config.customText, config.refreshKey, regenerationKey]);

  // Generate text when configuration changes
  useEffect(() => {
    generateNewText();
  }, [generateNewText]);

  // Function to manually regenerate text
  const regenerateText = useCallback(() => {
    setRegenerationKey(prev => prev + 1);
  }, []);

  // Get current text
  const currentText = useMemo(() => {
    if (config.customText && config.mode === 'quote') {
      return config.customText;
    }
    return generatedData?.text || '';
  }, [generatedData, config.customText, config.mode]);

  return {
    currentText,
    generatedData,
    regenerateText,
    isGenerating,
    error
  };
}

/**
 * Hook for getting a quick text generation without state management
 */
export function useQuickTextGeneration() {
  return {
    generateQuick: (wordCount: 10 | 25 | 50 | 100, difficulty: WordDifficulty = 'medium') => {
      switch (wordCount) {
        case 10: return textPresets.words10(difficulty);
        case 25: return textPresets.words25(difficulty);
        case 50: return textPresets.words50(difficulty);
        case 100: return textPresets.words100(difficulty);
        default: return textPresets.words25(difficulty);
      }
    }
  };
}