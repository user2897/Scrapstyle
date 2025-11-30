# Style Guide

This style guide documents the design system for this website, providing a comprehensive resource for developers and designers to maintain consistency and coherence across the user interface.

## 1. Color Palette

This section defines the color palette used throughout the website.

### Primary

*   `#007aff`: Primary Blue (Used for primary actions, links)
*   `#FFFFFF`: Primary White

### Secondary

*   `#383838`: Secondary Dark Gray (Used for headings, important text)
*   `#2BA5FF`: Secondary Light Blue

### Accent

*   `#FFDE00`: Accent Yellow (Used for highlights, attention-grabbing elements)
*   `#53DBC9`: Accent Teal
*   `#FF7169`: Accent Red

### Neutrals/Grays

*   `#f1f1f1`: Light Gray
*   `#888`: Medium Gray
*   `#555`: Dark Gray
*   `#F8F8F7`: Very Light Gray
*   `#A1A1A1`: Dull Gray
*   `#adbac7`: muted Gray
*   `#768390`: dark muted Gray
*   `#ECEFF1`: Lightest Gray

### Semantic

*   **Success:** `#38C1B0`, `#B4F1B4`, `#1B4721`
*   **Error:** `#FF7169`, `#F38E84`, `#ffd8d3`, `#78191b`, `#f47067`
*   **Warning:** `#F5B161`, `#FDEDDA`, `#E1C427`, `#FFFDE7`, `#eac55f`, `#f69d50`

### Backgrounds

*   `#F4EFEA`: Light Tan
*   `#EBF9FF`: Light Blue Background
*   `#E8F5E9`: Light Green Background
*   `#F7F1FF`: Light Purple Background
*   `#F9FBE7`: Light Yellow Background
*   `rgba(248,248,247,0.7)`: Translucent Light Gray
*   `rgba(0,0,0,0)`: Transparent
*    `rgba(255,255,255,0)`: Transparent White

### Text Colors

*   `#000000`: Black
*   `#FFFFFF`: White
*   `#383838`: Dark Gray
*   `rgba(0,0,0,.5)`: Semi-transparent black text

## 2. Typography

This section defines the typographic styles used throughout the website.

### Font Families

*   **Primary:** `'Inter', Arial, sans-serif` (or just `'Inter', sans-serif`)
*   **Secondary:** `'Aeonik Mono', monospace` (or `'Aeonik Mono', sans-serif`)
*   **Fallback:** `sans-serif`, `serif`, `monospace`

### Type Scale

Based on extracted font sizes (in pixels):

*   **Display 1:** `80px`
*   **Display 2:** `72px`
*   **Display 3:** `56px`
*   **H1:** `52px`
*   **H2:** `48px`
*   **H3:** `40px`
*   **H4:** `32px`
*   **H5:** `24px`
*   **H6:** `20px`
*   **Body (Large):** `18px`
*   **Body (Regular):** `16px`
*   **Body (Small):** `14px`
*   **Caption:** `13px`
*   **Smallest:** `12px`
*   **Tiny:** `7px`

Also define 100% which is generally equivalent to 16px.

### Font Weights

*   `300`: Light
*   `400`: Regular
*   `600`: Semi-Bold
*   `700`: Bold

### Line Heights

*   `1`: Tight
*   `120%`: Condensed
*   `130%`: Normal
*   `140%`: Relaxed
*   `160%`: Loose

### Letter Spacing

*   `normal`
*   `0.01em`
*   `0.02em`

## 3. Spacing System

The spacing system is based on a base unit of `4px`.

*   **xxs:** `4px`
*   **xs:** `8px`
*   **sm:** `12px`
*   **md:** `16px`
*   **lg:** `24px`
*   **xl:** `32px`
*   **xxl:** `48px`
*   **xxxl:** `64px`
*   **Custom Values:** As needed (e.g., `5px`, `6px`, `9px`, `10px`, `11px`, `15px`, `18px`, `20px`, `21px`, `22px`, `23px`, `25px`, `28px`, `30px`, `34px`, `36px`, `40px`, `45px`, `50px`, `52px`, `56px`, `60px`, `62px`, `72px`, `74px`, `80px`, `82px`, `86px`, `90px`, `92px`, `94px`, `100px`, `110px`, `112px`, `120px`, `122px`, `130px`, `135px`, `136px`, `140px`, `141px`, `142px`, `150px`, `153px`, `154px`, `155px`, `160px`, `170px`, `174px`, `180px`, `192px`, `200px`, `214px`, `254px`, `270px`, `320px`) These should be reviewed and potentially rounded or adjusted to fit the base `4px` system wherever possible for consistency.  Values like `11.5px`, `12.8px`, `15.4px`, and `17.25px` should be avoided if possible.

## 4. Border Radius

*   **None:** `0px`
*   **Small:** `2px`
*   **Medium:** `4px`
*   **Large:** `36px`

## 5. Box Shadows

*   **Subtle:** `-5px 5px 0px 0px #383838`
*   **Medium:** `-6px 6px 0px 0px #383838`
*   **Large:** `-8px 8px 0px 0px #383838`
*   **Extra Large:** `-12px 12px 0px 0px #383838`

## 6. Component Specifications

### Buttons

*   **Primary Button:**
    *   Background Color: `#007aff` (Primary Blue)
    *   Text Color: `#FFFFFF` (White)
    *   Font Weight: `600` or `700` (Semi-Bold or Bold)
    *   Border Radius: `4px` (Medium)
    *   Padding: (To be defined based on content and size)
    *   Hover State: Lighter shade of `#007aff` or add subtle shadow
*   **Secondary Button:**
    *   Background Color: `Transparent`
    *   Text Color: `#383838` (Dark Gray)
    *   Border: `2px solid #383838`
    *   Font Weight: `600` or `700` (Semi-Bold or Bold)
    *   Border Radius: `4px` (Medium)
    *   Padding: (To be defined based on content and size)
    *   Hover State: Background color `#f1f1f1` (Light Gray)
*   **Disabled Button:**
    *   Opacity: `0.5` or similar visual cue
    *   Cursor: `not-allowed`

**Button Variants:**

*   **Sizes:** `small`, `medium`, `large` (define padding and font size accordingly)

Example Button Classes (based on extracted HTML):

```html
<button type="button" class="[base button classes] sc-ab121629-1 kfhFAq"><span>PRODUCT</span></button>
<button type="submit" disabled class="[base button classes] sc-ab121629-1 kjYieO"><span>SUBMIT</span></button>

<div class="sc-ab121629-0 erDYIo btn-styles"><a href="#" class="[base button classes] sc-ab121629-1 hxZGIC"><span>Button Text</span></a></div>
```

### Form Inputs

*   **Text Input:**
    *   Border: `1px solid #adbac7` (Light Gray)
    *   Border Radius: `4px` (Medium)
    *   Padding: (To be defined)
    *   Font Family: `'Inter', sans-serif`
    *   Text Color: `#383838` (Dark Gray)
    *   Focus State: Border color `#007aff` (Primary Blue) or add a shadow.

Example input class:

```html
<input type="text" class="[base input classes] sc-fcfd0274-4 fFAtFO input-element">
```

### Cards

Card Styles were not clearly represented in the extracted data.  A common pattern:

*   Background: `#FFFFFF` or `#F8F8F7`
*   Border Radius: Medium `4px` or None `0px` depending on style
*   Shadow: Subtle to Medium based on elevation needs
*   Padding: Consistent spacing based on the spacing system for content

### Navigation Links

*   Font Family: `'Inter', sans-serif` or `'Aeonik Mono', sans-serif`
*   Text Color: `#383838` (Dark Gray) or `#FFFFFF` (White) depending on background
*   Font Weight: `400` or `600` (Regular or Semi-Bold)
*   Hover State: Underline or color change.

Example link class:

```html
<a class="[base link classes] sc-ab121629-1 kfhFAq">DOCS</a>
```

## 7. CSS Variables

The following CSS variables are defined and should be used as primary design tokens:

*   `--swiper-theme-color: #007aff`
*   `--toastify-toast-min-height: fit-content`
*   `--toastify-toast-width: fit-content`
*   `--header-mobile: 70px`
*   `--header-desktop: 90px`
*   `--eyebrow-mobile: 70px`
*   `--eyebrow-desktop: 55px`

These variables should be used wherever possible to ensure consistency and allow for easy theme modifications in the future.