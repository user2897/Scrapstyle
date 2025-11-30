const STORAGE_KEYS = {
  apiKey: "gemini-api-key",
} as const;

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.apiKey);
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEYS.apiKey, key);
}

export function removeApiKey(): void {
  localStorage.removeItem(STORAGE_KEYS.apiKey);
}

