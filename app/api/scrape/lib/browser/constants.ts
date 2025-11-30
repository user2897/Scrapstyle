export const BROWSER_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
] as const;

export const VIEWPORT = {
  width: 1440,
  height: 900,
} as const;

export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export const TIMEOUTS = {
  pageLoad: 30000,
  renderDelay: 2000,
  bodySelector: 5000,
  scrollDelay: 500,
} as const;

export const SCROLL_AMOUNT = 600;

export const SCREENSHOT_QUALITY = {
  high: 80,
  low: 60,
} as const;

export const EXTRACTION_LIMITS = {
  maxColors: 50,
  maxButtons: 5,
  maxSurfaces: 3,
  maxCssVariables: 20,
} as const;

