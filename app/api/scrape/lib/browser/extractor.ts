import { Page } from 'puppeteer-core';
import { ExtractedData } from '../types';
import { EXTRACTION_LIMITS } from './constants';

export async function extractPageData(page: Page): Promise<ExtractedData> {
  return await page.evaluate((limits) => {
    function rgbToHex(rgb: string): string {
      if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return 'transparent';
      const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return rgb;
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
    }

    function getElementStyles(el: Element | null) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        backgroundColor: s.backgroundColor,
        color: s.color,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        margin: `${s.marginTop} ${s.marginRight} ${s.marginBottom} ${s.marginLeft}`,
        borderRadius: s.borderRadius,
        border: `${s.borderWidth} ${s.borderStyle} ${s.borderColor}`,
        boxShadow: s.boxShadow,
        textTransform: s.textTransform,
        textDecoration: s.textDecoration,
      };
    }

    function getTypographyStyles(selector: string) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
      };
    }

    function extractAllColors(): string[] {
      const colors = new Set<string>();
      document.querySelectorAll('*').forEach((el) => {
        const computed = window.getComputedStyle(el);
        [computed.backgroundColor, computed.color, computed.borderColor].forEach((c) => {
          const hex = rgbToHex(c);
          if (hex && hex !== 'transparent') colors.add(hex);
        });
      });
      return Array.from(colors).slice(0, limits.maxColors);
    }

    function extractCssVariables(): Record<string, string> {
      const variables: Record<string, string> = {};
      try {
        Array.from(document.styleSheets).forEach((sheet) => {
          try {
            Array.from(sheet.cssRules).forEach((rule) => {
              if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
                const style = rule.style;
                for (let i = 0; i < style.length; i++) {
                  const prop = style[i];
                  if (prop.startsWith('--')) {
                    variables[prop] = style.getPropertyValue(prop).trim();
                  }
                }
              }
            });
          } catch {}
        });
      } catch {}
      return variables;
    }

    function extractButtonStyles() {
      const buttonStyles: Array<{
        text: string;
        styles: ReturnType<typeof getElementStyles>;
        classes: string;
      }> = [];
      const seenButtons = new Set<string>();

      const buttonSelectors =
        'button, a[class*="btn"], a[class*="button"], [role="button"], a[class*="cta"]';
      document.querySelectorAll(buttonSelectors).forEach((btn) => {
        if (buttonStyles.length >= limits.maxButtons) return;
        const classes = btn.className || '';
        const text = btn.textContent?.trim().slice(0, 30) || 'Button';
        const key = classes + text;

        if (!seenButtons.has(key)) {
          seenButtons.add(key);
          buttonStyles.push({ text, styles: getElementStyles(btn), classes });
        }
      });

      return buttonStyles;
    }

    function extractSurfaceStyles() {
      const surfaceStyles: Array<{
        type: string;
        styles: ReturnType<typeof getElementStyles>;
      }> = [];
      const seenSurfaces = new Set<string>();

      const surfaceSelectors =
        '[class*="card"], article, section, [class*="panel"], [class*="box"]';
      document.querySelectorAll(surfaceSelectors).forEach((el) => {
        if (surfaceStyles.length >= limits.maxSurfaces) return;
        const s = window.getComputedStyle(el);
        const bg = s.backgroundColor;

        if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && !seenSurfaces.has(bg)) {
          seenSurfaces.add(bg);
          surfaceStyles.push({
            type: el.tagName.toLowerCase(),
            styles: getElementStyles(el),
          });
        }
      });

      return surfaceStyles;
    }

    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;

    return {
      allColors: extractAllColors(),
      pageBackground: bodyBg !== 'rgba(0, 0, 0, 0)' ? bodyBg : htmlBg,
      typography: {
        h1: getTypographyStyles('h1'),
        h2: getTypographyStyles('h2'),
        h3: getTypographyStyles('h3'),
        body: getTypographyStyles('p'),
      },
      cssVariables: extractCssVariables(),
      buttonStyles: extractButtonStyles(),
      surfaceStyles: extractSurfaceStyles(),
      inputStyles: getElementStyles(
        document.querySelector(
          'input[type="text"], input[type="email"], input[type="password"], textarea'
        )
      ),
      linkStyles: getElementStyles(
        document.querySelector('a:not([class*="btn"]):not([class*="button"])')
      ),
    };
  }, EXTRACTION_LIMITS);
}
