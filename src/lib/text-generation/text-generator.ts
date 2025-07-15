import { getWordsByDifficulty, WordDifficulty } from './word-lists';

// Re-export WordDifficulty for convenience
export type { WordDifficulty };

export interface TextGenerationOptions {
  wordCount: number;
  difficulty: WordDifficulty;
  includePunctuation?: boolean;
  includeNumbers?: boolean;
  seed?: string; // For reproducible results
}

export interface GeneratedText {
  text: string;
  wordCount: number;
  difficulty: WordDifficulty;
  options: TextGenerationOptions;
}

/**
 * 
 * Simple seeded random number generator for reproducible results
 */
class SeededRandom {
  private seed: number;

  constructor(seed?: string | number) {
    if (seed === undefined) {
      this.seed = Date.now();
    } else if (typeof seed === 'string') {
      this.seed = this.hashString(seed);
    } else {
      this.seed = seed;
    }
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

/**
 * Generate random text for typing tests
 */
export function generateText(options: TextGenerationOptions): GeneratedText {
  const {
    wordCount,
    difficulty,
    includePunctuation = false,
    includeNumbers = false,
    seed
  } = options;

  const words = getWordsByDifficulty(difficulty);
  const random = new SeededRandom(seed);
  let generatedWords: string[] = [];

  // Punctuation marks to randomly add
  const punctuation = ['.', ',', '!', '?', ';', ':'];
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for (let i = 0; i < wordCount; i++) {
    // Select a random word
    const randomIndex = random.nextInt(0, words.length - 1);
    let word = words[randomIndex];
    
    // Ensure we have a valid word
    if (!word) {
      continue;
    }

    // Occasionally add numbers if enabled
    if (includeNumbers && random.next() < 0.1) { // 10% chance
      const numberCount = random.nextInt(1, 3);
      const randomNumbers = Array.from({ length: numberCount }, () => 
        numbers[random.nextInt(0, numbers.length - 1)]
      ).join('');
      word = word + randomNumbers;
    }

    // Add punctuation if enabled
    if (includePunctuation) {
      // Add comma occasionally (15% chance, but not at the end)
      if (i < wordCount - 1 && random.next() < 0.15) {
        word += ',';
      }
      // Add period at the end of sentences (20% chance, but not at the very end)
      else if (i < wordCount - 1 && random.next() < 0.2) {
        const punct = punctuation[random.nextInt(0, punctuation.length - 1)];
        if (punct) {
          word += punct;
          // Capitalize next word if it's a sentence-ending punctuation
          if (['.', '!', '?'].includes(punct) && i < wordCount - 1) {
            // We'll handle capitalization in the next iteration
          }
        }
      }
    }

    // Capitalize first word and words after sentence-ending punctuation only if punctuation is enabled
    if (includePunctuation) {
      const previousWord = generatedWords[i - 1];
      if (i === 0 || (previousWord && /[.!?]$/.test(previousWord))) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
    }

    generatedWords.push(word);
  }

  // Ensure the text ends with a period if punctuation is enabled
  if (includePunctuation && generatedWords.length > 0) {
    const lastWord = generatedWords[generatedWords.length - 1];
    if (lastWord && !/[.!?]$/.test(lastWord)) {
      generatedWords[generatedWords.length - 1] = lastWord + '.';
    }
  }
  
  // If punctuation is not enabled, ensure all text is lowercase
  if (!includePunctuation && generatedWords.length > 0) {
    generatedWords = generatedWords.map(word => word.toLowerCase());
  }

  const text = generatedWords.join(' ');

  return {
    text,
    wordCount: generatedWords.length,
    difficulty,
    options
  };
}

/**
 * Generate text with preset configurations for common test types
 */
export function generatePresetText(
  wordCount: 10 | 25 | 50 | 100,
  difficulty: WordDifficulty = 'medium',
  includePunctuation: boolean = false,
  includeNumbers: boolean = false
): GeneratedText {
  return generateText({
    wordCount,
    difficulty,
    includePunctuation,
    includeNumbers,
    seed: `${wordCount}-${difficulty}-${includePunctuation}-${includeNumbers}-${Date.now()}`
  });
}

/**
 * Generate reproducible text with a specific seed
 */
export function generateSeededText(
  wordCount: number,
  difficulty: WordDifficulty,
  seed: string,
  includePunctuation: boolean = false,
  includeNumbers: boolean = false
): GeneratedText {
  return generateText({
    wordCount,
    difficulty,
    includePunctuation,
    includeNumbers,
    seed
  });
}