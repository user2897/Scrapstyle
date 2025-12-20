export type ErrorCode = 'QUOTA_EXCEEDED' | 'RATE_LIMITED' | 'INVALID_KEY' | 'UNKNOWN';

export interface ClassifiedError {
  status: number;
  message: string;
  code: ErrorCode;
  retryAfter?: number;
}

export class ApiError extends Error {
  status: number;
  code: ErrorCode;
  retryAfter?: number;

  constructor(classified: ClassifiedError) {
    super(classified.message);
    this.name = 'ApiError';
    this.status = classified.status;
    this.code = classified.code;
    this.retryAfter = classified.retryAfter;
  }
}

/**
 * Extracts retry delay from Gemini error details if present.
 * Gemini errors may contain structured details with retryDelay.
 */
function extractRetryDelay(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) return undefined;

  const errorObj = error as Record<string, unknown>;

  // Check for errorDetails array (GoogleGenerativeAI error structure)
  if (Array.isArray(errorObj.errorDetails)) {
    for (const detail of errorObj.errorDetails) {
      if (detail && typeof detail === 'object' && 'retryDelay' in detail) {
        const delay = (detail as { retryDelay?: string }).retryDelay;
        if (typeof delay === 'string') {
          // Parse "59s" or "59.123s" format
          const match = delay.match(/^(\d+(?:\.\d+)?)s$/);
          if (match) {
            return Math.ceil(parseFloat(match[1]));
          }
        }
      }
    }
  }

  return undefined;
}

/**
 * Classifies Gemini API errors into structured error responses.
 */
export function classifyGeminiError(error: unknown): ClassifiedError {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const retryAfter = extractRetryDelay(error);

  // Check for quota/rate limit errors
  if (
    errorMessage.includes('429') ||
    errorMessage.includes('RESOURCE_EXHAUSTED') ||
    errorMessage.includes('quota')
  ) {
    // Check if it's a free tier with 0 limit (billing/config issue)
    if (errorMessage.includes('limit: 0') || errorMessage.includes('FreeTier')) {
      return {
        status: 429,
        message: 'Gemini API quota unavailable. Your API key may have no quota allocated. Please check your Google AI Studio billing settings or switch to OpenRouter.',
        code: 'QUOTA_EXCEEDED',
        retryAfter,
      };
    }

    return {
      status: 429,
      message: retryAfter
        ? `Gemini API quota exceeded. Please wait ${retryAfter} seconds and try again, or switch to OpenRouter in settings.`
        : 'Gemini API quota exceeded. Please wait and try again, or switch to OpenRouter in settings.',
      code: 'QUOTA_EXCEEDED',
      retryAfter,
    };
  }

  // Check for invalid API key
  if (
    errorMessage.includes('401') ||
    errorMessage.includes('API_KEY_INVALID') ||
    errorMessage.includes('invalid') && errorMessage.toLowerCase().includes('key')
  ) {
    return {
      status: 401,
      message: 'Invalid Gemini API key. Please check your API key in settings.',
      code: 'INVALID_KEY',
    };
  }

  // Unknown error
  return {
    status: 500,
    message: errorMessage || 'An unexpected error occurred with the Gemini API.',
    code: 'UNKNOWN',
  };
}

/**
 * Classifies OpenRouter API errors into structured error responses.
 */
export function classifyOpenRouterError(
  status: number,
  body: string,
  retryAfterHeader?: string | null
): ClassifiedError {
  const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;

  // Rate limited
  if (status === 429) {
    return {
      status: 429,
      message: retryAfter
        ? `Too many requests. Please wait ${retryAfter} seconds and try again.`
        : 'Too many requests. Please wait a moment and try again.',
      code: 'RATE_LIMITED',
      retryAfter: Number.isNaN(retryAfter) ? undefined : retryAfter,
    };
  }

  // Insufficient credits / payment required
  if (status === 402) {
    return {
      status: 402,
      message: 'OpenRouter credits exhausted. Please add credits at openrouter.ai or switch to Gemini in settings.',
      code: 'QUOTA_EXCEEDED',
    };
  }

  // Invalid API key
  if (status === 401) {
    return {
      status: 401,
      message: 'Invalid OpenRouter API key. Please check your API key in settings.',
      code: 'INVALID_KEY',
    };
  }

  // Parse body for additional context
  let errorDetail = body;
  try {
    const parsed = JSON.parse(body);
    if (parsed.error?.message) {
      errorDetail = parsed.error.message;
    } else if (parsed.message) {
      errorDetail = parsed.message;
    }
  } catch {
    // Body is not JSON, use as-is
  }

  // Unknown error
  return {
    status: status >= 500 ? 500 : status,
    message: `OpenRouter error: ${errorDetail}`,
    code: 'UNKNOWN',
  };
}

