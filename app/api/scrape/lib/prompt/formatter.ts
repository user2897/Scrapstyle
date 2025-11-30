import { ExtractedData } from '../types';
import { FormattableStyles } from './types';
import { MAX_CSS_VARIABLES_DISPLAY } from './constants';

export function formatStyles(styles: FormattableStyles | null, label: string): string {
  if (!styles) return `${label}: Not found`;

  const lines = [
    `${label}:`,
    `- Background: ${styles.backgroundColor}`,
    `- Text Color: ${styles.color}`,
    `- Padding: ${styles.padding}`,
    `- Border Radius: ${styles.borderRadius}`,
    `- Border: ${styles.border}`,
    `- Box Shadow: ${styles.boxShadow}`,
  ];

  if (styles.fontFamily) lines.push(`- Font: ${styles.fontFamily}`);
  if (styles.fontSize) lines.push(`- Font Size: ${styles.fontSize}`);
  if (styles.fontWeight) lines.push(`- Font Weight: ${styles.fontWeight}`);

  return lines.join('\n');
}

function formatTypography(data: ExtractedData): string {
  const { typography } = data;

  return [
    typography.h1
      ? `H1: ${typography.h1.fontSize}, weight ${typography.h1.fontWeight}, ${typography.h1.fontFamily}`
      : 'H1: not found',
    typography.h2
      ? `H2: ${typography.h2.fontSize}, weight ${typography.h2.fontWeight}`
      : 'H2: not found',
    typography.h3
      ? `H3: ${typography.h3.fontSize}, weight ${typography.h3.fontWeight}`
      : 'H3: not found',
    typography.body
      ? `Body: ${typography.body.fontSize}, weight ${typography.body.fontWeight}, line-height ${typography.body.lineHeight}`
      : 'Body: not found',
  ].join('\n');
}

function formatButtons(data: ExtractedData): string {
  if (data.buttonStyles.length === 0) return 'No buttons found';

  return data.buttonStyles
    .map((btn, i) => formatStyles(btn.styles, `Button ${i + 1} "${btn.text}"`))
    .join('\n\n');
}

function formatSurfaces(data: ExtractedData): string {
  if (data.surfaceStyles.length === 0) return 'No surfaces found';

  return data.surfaceStyles
    .map((s, i) => formatStyles(s.styles, `Surface ${i + 1} (${s.type})`))
    .join('\n\n');
}

function formatCssVariables(data: ExtractedData): string {
  const entries = Object.entries(data.cssVariables).slice(0, MAX_CSS_VARIABLES_DISPLAY);
  if (entries.length === 0) return 'None found';

  return entries.map(([k, v]) => `${k}: ${v}`).join('\n');
}

export function buildDataSummary(data: ExtractedData): string {
  return `
## Extracted CSS Data (EXACT VALUES)

**Page Background:** ${data.pageBackground}

**All Colors Found:**
${data.allColors.join(', ')}

---

### Typography
${formatTypography(data)}

---

### Buttons (with exact CSS values)
${formatButtons(data)}

---

### Surfaces/Cards (with exact CSS values)
${formatSurfaces(data)}

---

### Input Field
${formatStyles(data.inputStyles, 'Input')}

---

### Links
${formatStyles(data.linkStyles, 'Link')}

---

### CSS Variables
${formatCssVariables(data)}
`.trim();
}
