import React from 'react';
import { TextStyle } from '@/types/template';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StylePreviewProps {
  style: TextStyle;
  index: number;
}

const StylePreview: React.FC<StylePreviewProps> = ({ style, index }) => {
  // Set the CSS variables for the preview
  const previewStyle = {
    '--preview-font-family': style.fontFamily || 'Times New Roman',
    '--preview-font-size': `${style.fontSize}pt` || '12pt',
    '--preview-font-color': style.color || 'black',
    '--preview-text-align': style.alignment || 'left',
    '--preview-font-weight': style.isBold ? 'bold' : 'normal',
    '--preview-font-style': style.isItalic ? 'italic' : 'normal',
    '--preview-text-decoration': getTextDecoration(style),
    '--preview-spacing-before': `${style.spacingBefore}pt` || '0',
    '--preview-spacing-after': `${style.spacingAfter}pt` || '0',
    '--preview-indentation-left': `${style.indentationLeft}pt` || '0',
    '--preview-indentation-right': `${style.indentationRight}pt` || '0',
    '--preview-first-line-indent': `${style.firstLineIndent}pt` || '0',
    '--preview-border-style': style.borderStyle || 'none',
    '--preview-border-color': style.borderColor || 'black',
    '--preview-border-width': `${style.borderWidth}pt` || '0',
    '--preview-line-height': style.lineSpacing || '1.0',
    '--preview-list-number-style': style.listNumberStyle || 'decimal',
    '--preview-character-spacing': `${style.characterSpacing}pt` || 'normal',
    '--preview-highlight-color': style.highlighting || 'transparent',
  } as React.CSSProperties;
  
  // Helper function to combine text decorations
  function getTextDecoration(style: TextStyle): string {
    const decorations = [];
    if (style.isUnderline) decorations.push('underline');
    if (style.isStrikethrough) decorations.push('line-through');
    return decorations.length > 0 ? decorations.join(' ') : 'none';
  }
  
  // Determine border sides based on borderDirections
  let borderTop = 'none';
  let borderRight = 'none';
  let borderBottom = 'none';
  let borderLeft = 'none';
  
  if (style.borderDirections) {
    const directions = style.borderDirections.split(',').map(d => d.trim().toLowerCase());
    const hasBorder = directions.includes('all') || directions.length > 0;
    
    if (hasBorder && (directions.includes('all') || directions.includes('top'))) {
      borderTop = `${style.borderStyle} ${style.borderWidth}pt ${style.borderColor}`;
    }
    if (hasBorder && (directions.includes('all') || directions.includes('right'))) {
      borderRight = `${style.borderStyle} ${style.borderWidth}pt ${style.borderColor}`;
    }
    if (hasBorder && (directions.includes('all') || directions.includes('bottom'))) {
      borderBottom = `${style.borderStyle} ${style.borderWidth}pt ${style.borderColor}`;
    }
    if (hasBorder && (directions.includes('all') || directions.includes('left'))) {
      borderLeft = `${style.borderStyle} ${style.borderWidth}pt ${style.borderColor}`;
    }
  }
  
  // Apply transforms and effects based on the style
  const textTransform = style.isAllCaps ? 'uppercase' as const : 
                        style.isSmallCaps ? 'lowercase' as const : 'none' as const;
  
  const textShadow = style.hasShadow ? '1px 1px 2px rgba(0, 0, 0, 0.5)' : 'none';
  
  const textOutline = style.hasOutline ? 
    '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' : 'none';
  
  const finalStyle = {
    ...previewStyle,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    fontFamily: style.fontFamily || 'Times New Roman',
    fontSize: `${style.fontSize}pt` || '12pt',
    color: style.color || 'black',
    textAlign: style.alignment as any || 'left',
    fontWeight: style.isBold ? 'bold' : 'normal',
    fontStyle: style.isItalic ? 'italic' : 'normal',
    textDecoration: getTextDecoration(style),
    textTransform: textTransform,
    textShadow: textShadow,
    WebkitTextStroke: style.hasOutline ? '1px black' : 'none',
    paddingTop: `${style.spacingBefore}pt` || '0',
    paddingBottom: `${style.spacingAfter}pt` || '0',
    paddingLeft: `${style.indentationLeft}pt` || '0',
    paddingRight: `${style.indentationRight}pt` || '0',
    lineHeight: style.lineSpacing || '1.0',
    letterSpacing: `${style.characterSpacing}pt` || 'normal',
    backgroundColor: style.highlighting || 'transparent',
    textIndent: `${style.firstLineIndent}pt` || '0',
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{style.name}</CardTitle>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs">
              {style.styleType || 'Paragraph'}
            </Badge>
            {style.basedOnStyle && (
              <Badge variant="secondary" className="text-xs">
                Based on: {style.basedOnStyle}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="preview-section" style={finalStyle}>
          <p>This is a preview of the text styling from the template.</p>
          {style.listNumberStyle && (
            <ul className="ml-6">
              <li>List item example</li>
              <li>Another list item</li>
            </ul>
          )}
        </div>
        {style.styleType === 'Table' && (
          <div className="mt-4 border rounded bg-muted/20 p-2 text-xs text-center">
            Table styling preview available in document view
          </div>
        )}
        {style.styleType === 'Section' && (
          <div className="mt-4 border rounded bg-muted/20 p-2 text-xs text-center">
            Section formatting preview available in document view
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StylePreview;
