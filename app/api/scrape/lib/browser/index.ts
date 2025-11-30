import { ScrapeResult } from '../types';
import { VIEWPORT, USER_AGENT, TIMEOUTS } from './constants';
import { getBrowser } from './manager';
import { captureScreenshots } from './screenshot';
import { extractPageData } from './extractor';

export async function scrapeWithBrowser(url: string): Promise<ScrapeResult> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setViewport(VIEWPORT);
    await page.setUserAgent(USER_AGENT);

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: TIMEOUTS.pageLoad,
    });

    await page.waitForSelector('body', { timeout: TIMEOUTS.bodySelector });
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.renderDelay));

    const screenshots = await captureScreenshots(page);
    const extractedData = await extractPageData(page);

    return { screenshots, extractedData };
  } finally {
    await page.close();
  }
}

export { closeBrowser } from './manager';
export type { ScrapeResult } from '../types';
