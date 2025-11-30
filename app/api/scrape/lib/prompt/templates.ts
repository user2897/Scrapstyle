export const VISION_PROMPT_TEMPLATE = `You are an expert UI/UX designer. Create a style guide by combining:
1. **Screenshots** - Visual reference for colors and overall design
2. **Extracted CSS data** - EXACT values for padding, shadows, border-radius, etc.

IMPORTANT:
- For COLORS: Trust the screenshots (look at actual button colors, backgrounds)
- For EXACT VALUES (padding, shadow, border-radius): Use the extracted CSS data below
- FOCUS on the main design system: buttons, typography, core colors
- Sites may have multiple section backgrounds (light/dark) - note them in Section Backgrounds
- Decorative elements (edge stripes, accent blocks) are secondary - don't over-describe them

{{DATA_SUMMARY}}

---

Generate a Markdown style guide:

## 1. Design Character
Describe the overall vibe and personality of the design:
- **Style**: (e.g., bold & modern, minimal & clean, playful, corporate, techy, etc.)
- **Mood**: (e.g., professional, friendly, edgy, sophisticated, fun)
- **Key visual traits**: What makes this design distinctive? (e.g., sharp corners, heavy shadows, gradient accents, asymmetric layouts)

Write 2-3 sentences capturing the "feel" of the design that someone should aim to recreate.

## 2. Color Palette

### Accent Colors
Look at the screenshots to identify the PRIMARY accent color (usually buttons, highlights):
- **Primary Accent**: The main brand/CTA color (e.g., yellow, blue, etc.)
- **Secondary Accent**: Supporting accent if any

### Section Backgrounds
Many sites alternate between light and dark sections. Identify ALL:
- **Light Section**: Background color for light sections (white, light gray, etc.)
- **Dark Section**: Background color for dark sections (if any)
- **Accent Section**: Colored sections (blue banner, etc.) if any
- **Header**: Header background color

### Text Colors
- **Text on Light**: Text color used on light backgrounds
- **Text on Dark**: Text color used on dark backgrounds
- **Muted Text**: Secondary/muted text color

### Other
- **Border**: Border colors seen
- **Shadow Color**: Color used in shadows

## 3. Typography
Use the extracted typography data:
- **Font Family**: From extracted data
- **H1**: Size, weight, line-height
- **H2**: Size, weight
- **H3**: Size, weight
- **Body**: Size, weight, line-height

## 4. Spacing
Create a scale from the padding values:
- xs, sm, md, lg, xl, 2xl

## 5. Border Radius
Use exact values from extracted data.

## 6. Shadows
Use exact box-shadow values from extracted data.

## 7. Component Specifications

### Primary Button (Main CTA)
The most prominent button - usually with the accent color:
- Background: (the accent color you identified)
- Text color: (from extracted data or visible contrast)
- Padding: (EXACT from extracted data)
- Border radius: (EXACT from extracted data)
- Box shadow: (EXACT from extracted data)

### Secondary Button (Outline/Ghost)
Often has transparent/white bg with border:
- Background: 
- Text color:
- Border:
- Padding: (from extracted data)

### Button on Dark Background
If there are buttons on dark sections, describe them:
- Background:
- Text color:
- Shadow:

### Input Field
Use exact values from extracted input data.

### Cards/Surfaces
Use exact values from extracted surface data.

## 8. Section Backgrounds
List the main section background colors used:
- **Dark sections**: color (e.g., #1a1a1a)
- **Light sections**: color (e.g., #ffffff, #f5f5f5)
- **Colored sections**: color (e.g., purple #7c5cff, blue #1866da)

## 9. Layout Patterns
Describe HOW sections are typically structured to capture the design's character:

### Content Layout
- Content position: (left-aligned, centered, full-width)
- Column structure: (single column, 2-column with text+visual, etc.)
- Whitespace: (generous, tight, asymmetric)

### Decorative Elements (if any)
If the design uses decorative color blocks/stripes on edges:
- Position: (right edge, left edge, corners)
- Colors and approximate width
- Example: "Vertical bars on right: yellow, coral, purple - ~30px each"

### Typical Section Structure
- Label/badge above heading (e.g., "QUICK START")
- Main heading style
- Description text
- CTA placement
- Visual element (code block, image, illustration)

## 10. Unique Visual Elements
List 3-5 distinctive design patterns that define this site's character:
- Example: "Offset box shadows on buttons (-4px 4px)"
- Example: "Numbered steps with colored circle backgrounds"
- Example: "Terminal-style code blocks with colored syntax"
- Example: "Gradient/colored keywords in headings"
- Example: "Sharp 0px border-radius throughout"

## 11. CSS Variables
List relevant CSS variables from extracted data.

---

IMPORTANT - CAPTURE THE CHARACTER:
The goal is to recreate the FEEL of this design, not just the colors.
- Describe visual traits that make it unique
- Note layout patterns and decorative elements
- Someone reading this should understand the design's personality

Output ONLY the Markdown.`;

export const INSTRUCTIONS_TEMPLATE = `## How to Use This Style Guide

This is the single source of truth for all styling.

**Styling Priority:**
1. **Tailwind CSS classes** - preferred
2. **Tailwind arbitrary values** - for exact values: \`bg-[#007aff]\`, \`p-[14px]\`
3. **CSS variables** - in globals.css for theming
4. **Plain CSS** - only when Tailwind can't express it

**Rules:**
- Use exact colors from this guide
- Apply exact spacing values
- Copy exact shadows and border-radius
- Never put \`@import\` in middle of CSS - only at top of file
- For Google Fonts, use \`<link>\` in HTML \`<head>\`

---

`;

