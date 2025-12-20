import type { AIProvider } from "./constants";

export type ErrorCode = 'QUOTA_EXCEEDED' | 'RATE_LIMITED' | 'INVALID_KEY' | 'UNKNOWN';

export interface ScrapeRequest {
  url: string;
  apiKey: string;
  provider: AIProvider;
  model?: string;
}

export interface ScrapeResponse {
  styleGuide: string;
  designTokens: {
    colors: string[];
    fonts: string[];
    cssVariables: Record<string, string>;
  };
}

export interface ApiErrorResponse {
  error: string;
  code?: ErrorCode;
}

export interface ScrapeError extends Error {
  status: number;
  code?: ErrorCode;
}

export async function scrapeUrl(request: ScrapeRequest): Promise<ScrapeResponse> {
  const response = await fetch("/api/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || "Failed to generate style guide") as ScrapeError;
    error.status = response.status;
    error.code = data.code;
    throw error;
  }

  return data;
}

export function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/^```(?:markdown)?\n?/i, "")
    .replace(/\n?```\s*$/i, "")
    .trim();
}
