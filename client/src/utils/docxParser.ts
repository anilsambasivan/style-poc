
import mammoth from 'mammoth';
import { TextStyle } from '@/types/template';

// Use mammoth.js to parse the DOCX file and extract styles
export const parseDocxFile = async (file: File): Promise<TextStyle[]> => {
  try {
    // Get the buffer from the file
    const buffer = await file.arrayBuffer();
    
    // Extract styles from docx using mammoth.js
    const result = await mammoth.extractRawText({
      arrayBuffer: buffer
    });
    
    // Get the document content and parse it for styles
    const content = result.value;
    
    // This is where we would analyze the document content to extract styles
    // For now we'll extract more comprehensive mock styles to demonstrate functionality
    // In a real implementation, you would parse the docx XML structure for style information
    
    // Create an array to hold all extracted styles
    const extractedStyles: TextStyle[] = [
      {
        font: 'Arial',
        fontSize: '11pt',
        fontColor: '#000000',
        textDecorations: [],
        textAlign: 'left',
        spacingBefore: '0pt',
        spacingAfter: '8pt',
        indentationLeft: '0pt',
        indentationRight: '0pt',
      },
      {
        font: 'Arial',
        fontSize: '14pt',
        fontColor: '#333333',
        textDecorations: ['bold'],
        textAlign: 'left',
        spacingBefore: '12pt',
        spacingAfter: '6pt',
      },
      {
        font: 'Times New Roman',
        fontSize: '12pt',
        fontColor: '#000000',
        textDecorations: ['italic'],
        textAlign: 'justify',
        spacingBefore: '0pt',
        spacingAfter: '10pt',
      },
      {
        font: 'Calibri',
        fontSize: '10pt',
        fontColor: '#444444',
        textDecorations: [],
        textAlign: 'left',
        spacingBefore: '0pt',
        spacingAfter: '6pt',
        borderStyle: 'solid',
        borderColor: '#cccccc',
        borderWidth: '1pt',
        borderDirections: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        },
      },
      {
        font: 'Georgia',
        fontSize: '12pt',
        fontColor: '#222222',
        textDecorations: ['underline'],
        textAlign: 'center',
        spacingBefore: '8pt',
        spacingAfter: '8pt',
        listNumberStyle: 'disc',
      },
      {
        font: 'Courier New',
        fontSize: '10pt',
        fontColor: '#333333',
        textDecorations: [],
        textAlign: 'left',
        indentationLeft: '12pt',
        indentationRight: '0pt',
        listNumberStyle: 'decimal',
      }
    ];
    
    return extractedStyles;
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

export const convertStylesToJson = (styles: TextStyle[]): string => {
  return JSON.stringify(styles, null, 2);
};
