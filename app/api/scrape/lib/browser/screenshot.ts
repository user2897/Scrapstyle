import { Page } from 'puppeteer-core';
import { ScreenshotData } from '../types';
import { TIMEOUTS, SCROLL_AMOUNT, SCREENSHOT_QUALITY, VIEWPORT } from './constants';

export async function captureScreenshots(page: Page): Promise<ScreenshotData> {
  const viewport = page.viewport() || VIEWPORT;

  const top = (await page.screenshot({
    type: 'jpeg',
    quality: SCREENSHOT_QUALITY.high,
    clip: { x: 0, y: 0, width: viewport.width, height: viewport.height },
  })) as Buffer;

  await page.evaluate((amount) => window.scrollBy(0, amount), SCROLL_AMOUNT);
  await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.scrollDelay));

  const middle = (await page.screenshot({
    type: 'jpeg',
    quality: SCREENSHOT_QUALITY.high,
  })) as Buffer;

  const full = (await page.screenshot({
    type: 'jpeg',
    quality: SCREENSHOT_QUALITY.low,
    fullPage: true,
  })) as Buffer;

  return { top, middle, full };
}
