import { generateText, type GeneratedText } from './text-generator';
import type { Language } from '@/lib/language-system';

export interface TextGenerationRequest {
  mode: 'time' | 'words' | 'quote';
  wordCount: 10 | 25 | 50 | 100;

  punctuation: boolean;
  numbers: boolean;
  language?: Language;
  customText?: string;
}

export interface TextGenerationSession {
  sessionId: string;
  refreshKey: number;
  regenerationCount: number;
}

/**
 * Service for managing text generation with proper session handling
 * and clean separation of concerns
 */
export class TextGenerationService {
  private static instance: TextGenerationService;
  private sessions = new Map<string, TextGenerationSession>();

  private constructor() {}

  static getInstance(): TextGenerationService {
    if (!TextGenerationService.instance) {
      TextGenerationService.instance = new TextGenerationService();
    }
    return TextGenerationService.instance;
  }

  /**
   * Create a new text generation session
   */
  createSession(sessionId: string): TextGenerationSession {
    const session: TextGenerationSession = {
      sessionId,
      refreshKey: Date.now(),
      regenerationCount: 0
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * Get or create a session
   */
  getSession(sessionId: string): TextGenerationSession {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = this.createSession(sessionId);
    }
    return session;
  }

  /**
   * Increment regeneration count for a session
   */
  regenerateForSession(sessionId: string): TextGenerationSession {
    const session = this.getSession(sessionId);
    session.regenerationCount += 1;
    return session;
  }

  /**
   * Generate a unique seed for text generation
   */
  private generateSeed(request: TextGenerationRequest, session: TextGenerationSession): string {
    const { mode, wordCount, punctuation, numbers } = request;
    return `${mode}-${wordCount}-${punctuation}-${numbers}-${session.refreshKey}-${session.regenerationCount}`;
  }

  /**
   * Generate text based on request and session
   */
  async generateText(request: TextGenerationRequest, sessionId: string): Promise<GeneratedText> {
    const session = this.getSession(sessionId);
    const seed = this.generateSeed(request, session);

    // Handle different modes
    switch (request.mode) {
      case 'quote':
        if (request.customText) {
          return {
            text: request.customText,
            wordCount: request.customText.split(/\s+/).length,

            options: {
              wordCount: request.customText.split(/\s+/).length,

              includePunctuation: request.punctuation,
              includeNumbers: request.numbers,
              seed
            }
          };
        }
        // Generate a longer text for quote mode (50-100 words)
        return await generateText({
          wordCount: 75,
          //difficulty: request.difficulty,
          includePunctuation: true, // Quotes typically have punctuation
          includeNumbers: request.numbers,
          language: request.language,
          seed
        });

      case 'words':
        return await generateText({
          wordCount: request.wordCount,
          //difficulty: request.difficulty,
          includePunctuation: request.punctuation,
          includeNumbers: request.numbers,
          language: request.language,
          seed
        });

      case 'time':
      default:
        // For time mode, generate enough text to last the duration
        // Estimate: average typing speed is 40 WPM, so generate 2x the expected words
        const estimatedWords = Math.max(50, request.wordCount * 2);
        return await generateText({
          wordCount: estimatedWords,
          //difficulty: request.difficulty,
          includePunctuation: request.punctuation,
          includeNumbers: request.numbers,
          language: request.language,
          seed
        });
    }
  }

  /**
   * Clean up old sessions (optional, for memory management)
   */
  cleanupOldSessions(maxAge: number = 24 * 60 * 60 * 1000): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.refreshKey > maxAge) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// Export singleton instance
export const textGenerationService = TextGenerationService.getInstance();