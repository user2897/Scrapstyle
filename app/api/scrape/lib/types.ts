export interface ScreenshotData {
  top: Buffer;
  middle: Buffer;
  full: Buffer;
}

export interface ElementStyles {
  backgroundColor: string;
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  padding: string;
  margin: string;
  borderRadius: string;
  border: string;
  boxShadow: string;
  textTransform: string;
  textDecoration: string;
}

export interface TypographyStyles {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
}

export interface TypographyHierarchy {
  h1: TypographyStyles | null;
  h2: TypographyStyles | null;
  h3: TypographyStyles | null;
  body: TypographyStyles | null;
}

export interface ButtonData {
  text: string;
  styles: ElementStyles | null;
  classes: string;
}

export interface SurfaceData {
  type: string;
  styles: ElementStyles | null;
}

export interface ExtractedData {
  allColors: string[];
  pageBackground: string;
  typography: TypographyHierarchy;
  cssVariables: Record<string, string>;
  buttonStyles: ButtonData[];
  surfaceStyles: SurfaceData[];
  inputStyles: ElementStyles | null;
  linkStyles: ElementStyles | null;
}

export interface ScrapeResult {
  screenshots: ScreenshotData;
  extractedData: ExtractedData;
}
