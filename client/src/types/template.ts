export interface DirectFormatPattern {
  id: number;
  textStyleId: number;
  patternName: string;
  context: string;
  fontFamily?: string;
  fontSize?: number;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikethrough?: boolean;
  isAllCaps?: boolean;
  isSmallCaps?: boolean;
  highlighting?: string;
  characterSpacing?: number;
  hasShadow?: boolean;
  hasOutline?: boolean;
  language?: string;
  color?: string;
  alignment?: string;
  spacingBefore?: number;
  spacingAfter?: number;
  indentationLeft?: number;
  indentationRight?: number;
  firstLineIndent?: number;
  lineSpacing?: number;
  sampleText: string;
  occurrenceCount: number;
}

export interface TextStyle {
  id?: number;
  templateId?: number;
  name: string;
  fontFamily: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isAllCaps: boolean;
  isSmallCaps: boolean;
  hasShadow: boolean;
  hasOutline: boolean;
  highlighting: string;
  characterSpacing: number;
  language: string;
  color: string;
  alignment: string; // Left, Right, Center, Justify
  spacingBefore: number;
  spacingAfter: number;
  indentationLeft: number;
  indentationRight: number;
  firstLineIndent: number;
  widowOrphanControl: boolean;
  keepWithNext: boolean;
  keepTogether: boolean;
  tabStops: string; // JSON string of tab stop positions and alignments
  borderStyle: string;
  borderColor: string;
  borderWidth: number;
  borderDirections: string; // Top, Bottom, Left, Right, All
  listNumberStyle: string;
  lineSpacing: number;
  styleType: string; // Paragraph, Character, Table, Document, Section
  basedOnStyle: string; // Name of the style this style is based on
  priority: number; // Style priority indicator
  tableBorderStyle: string;
  tableBorderColor: string;
  tableBorderWidth: number;
  tableBorderDirections: string; // Top, Bottom, Left, Right, All
  directFormatPatterns: DirectFormatPattern[]; // New field for direct formatting patterns
}

export interface Template {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  styles: TextStyle[];
}

export interface VerificationResult {
  success: boolean;
  message: string;
  discrepancies: StyleDiscrepancy[];
  directFormattingDiscrepancies?: DirectFormattingDiscrepancy[]; // New field for direct formatting discrepancies
}

export interface StyleDiscrepancy {
  styleName: string;
  propertyName: string;
  expectedValue: string;
  actualValue: string;
  location: string;
  category?: string; // New field to categorize discrepancies (Character, Paragraph, Table, Section, DocumentDefaults)
}

export interface DirectFormattingDiscrepancy {
  patternName: string;
  context: string;
  propertyName: string;
  expectedValue: string;
  actualValue: string;
  location: string;
}

export interface VerificationOptions {
  templateId: number;
  ignoreDirectFormatting?: boolean;
}
