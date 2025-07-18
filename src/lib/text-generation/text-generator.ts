import type { Language } from "@/lib/language-system";
import { getWordsByLanguage } from "./language-word-lists";
import { PUNCTUATION_MARKS } from "@/lib/typing-test/constants";

export interface TextGenerationOptions {
  wordCount: number;
  includePunctuation?: boolean;
  includeNumbers?: boolean;
  language?: Language;
  seed?: string; // For reproducible results
}

export interface GeneratedText {
  text: string;
  wordCount: number;
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
    } else if (typeof seed === "string") {
      this.seed = this.hashString(seed);
    } else {
      this.seed = seed;
    }
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
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
export async function generateText(
  options: TextGenerationOptions
): Promise<GeneratedText> {
  const {
    wordCount,
    includePunctuation = false,
    includeNumbers = false,
    language = "english",
    seed,
  } = options;

  // Load words for the specified language
  const words = await getWordsByLanguage(language);
  const random = new SeededRandom(seed);
  let generatedWords: string[] = [];

  // Use punctuation marks from constants
  const punctuation = [...PUNCTUATION_MARKS];

  for (let i = 0; i < wordCount; i++) {
    // Select a random word from the language word list
    // Language JSON files are already ordered by frequency, so common words appear more often
    const randomIndex = Math.min(
      random.nextInt(0, words.length - 1),
      words.length - 1
    );
    let word = words[randomIndex] || "";

    // Ensure we have a valid word
    if (!word) {
      continue;
    }

    // Occasionally add numbers if enabled
    if (includeNumbers && random.next() < 0.1) {
      // 10% chance
      // Add numbers in more meaningful ways
      const numberType = random.nextInt(1, 3);

      if (numberType === 1) {
        // Add a year (e.g., 2023, 1995)
        const year = random.nextInt(1950, 2030);
        word = word + " " + year;
      } else if (numberType === 2) {
        // Add a small quantity (1-100)
        const quantity = random.nextInt(1, 100);
        word = word + " " + quantity;
      } else {
        // Add a small number (1-9)
        const smallNumber = random.nextInt(1, 9);
        word = word + " " + smallNumber;
      }
    }

    // Add punctuation if enabled
    if (includePunctuation) {
      // Add comma occasionally (15% chance, but not at the end)
      if (i < wordCount - 1 && random.next() < 0.15) {
        word += ",";
      }
      // Add period at the end of sentences (20% chance, but not at the very end)
      else if (i < wordCount - 1 && random.next() < 0.2) {
        const punctIndex = Math.min(
          random.nextInt(0, punctuation.length - 1),
          punctuation.length - 1
        );
        const punct = punctuation[punctIndex];
        if (punct) {
          word += punct;
          // Capitalize next word if it's a sentence-ending punctuation
          if ([".", "!", "?"].includes(punct) && i < wordCount - 1) {
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
      generatedWords[generatedWords.length - 1] = lastWord + ".";
    }
  }

  // If punctuation is not enabled, ensure all text is lowercase
  if (!includePunctuation && generatedWords.length > 0) {
    generatedWords = generatedWords.map((word) => word.toLowerCase());
  }

  const text = generatedWords.join(" ");

  return {
    text,
    wordCount: generatedWords.length,

    options,
  };
}

/**
 * Generate text with preset configurations for common test types
 */
export async function generatePresetText(
  wordCount: 10 | 25 | 50 | 100,
  includePunctuation: boolean = false,
  includeNumbers: boolean = false
): Promise<GeneratedText> {
  return await generateText({
    wordCount,
    includePunctuation,
    includeNumbers,
    seed: `${wordCount}-${includePunctuation}-${includeNumbers}-${Date.now()}`,
  });
}

/**
 * Generate reproducible text with a specific seed
 */
export async function generateSeededText(
  wordCount: number,
  seed: string,
  includePunctuation: boolean = false,
  includeNumbers: boolean = false
): Promise<GeneratedText> {
  return await generateText({
    wordCount,
    includePunctuation,
    includeNumbers,
    seed,
  });
}
