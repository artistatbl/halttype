import { useState, useEffect, useMemo, useCallback } from 'react';
import { textGenerationService, type TextGenerationRequest } from '@/lib/text-generation/text-generation-service';
import type { GeneratedText } from '@/lib/text-generation';

export interface UseTextGenerationConfig {
  mode: 'time' | 'words' | 'quote';
  wordCount: 10 | 25 | 50 | 100;
  difficulty: 'easy' | 'medium' | 'hard';
  punctuation: boolean;
  numbers: boolean;
  customText?: string;
  sessionId: string;
}

export interface UseTextGenerationReturn {
  currentText: string;
  generatedData: GeneratedText | null;
  regenerateText: () => void;
  isGenerating: boolean;
  error: string | null;
}

/**
 * Clean hook for managing text generation using the TextGenerationService
 */
export function useTextGeneration(config: UseTextGenerationConfig): UseTextGenerationReturn {
  const [generatedData, setGeneratedData] = useState<GeneratedText | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert config to service request format
  const request: TextGenerationRequest = useMemo(() => ({
    mode: config.mode,
    wordCount: config.wordCount,
    difficulty: config.difficulty,
    punctuation: config.punctuation,
    numbers: config.numbers,
    customText: config.customText
  }), [config.mode, config.wordCount, config.difficulty, config.punctuation, config.numbers, config.customText]);

  // Generate text based on current configuration
  const generateNewText = useCallback(() => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = textGenerationService.generateText(request, config.sessionId);
      setGeneratedData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate text');
      console.error('Text generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [request, config.sessionId]);

  // Generate text when configuration changes
  useEffect(() => {
    generateNewText();
  }, [generateNewText]);

  // Function to manually regenerate text
  const regenerateText = useCallback(() => {
    textGenerationService.regenerateForSession(config.sessionId);
    generateNewText();
  }, [config.sessionId, generateNewText]);

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