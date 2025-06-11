import React from 'react';
import { DirectFormatPattern } from '@/types/template';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface DirectFormattingPatternsProps {
  patterns: DirectFormatPattern[];
}

export const DirectFormattingPatterns: React.FC<DirectFormattingPatternsProps> = ({ patterns }) => {
  // Group patterns by context
  const groupedPatterns = patterns.reduce((acc, pattern) => {
    const context = pattern.context || 'General';
    if (!acc[context]) {
      acc[context] = [];
    }
    acc[context].push(pattern);
    return acc;
  }, {} as Record<string, DirectFormatPattern[]>);

  const contexts = Object.keys(groupedPatterns);

  // Format a formatting property for display
  const formatProperty = (key: string, value: any) => {
    if (value === undefined || value === null) {
      return '-';
    }

    switch (key) {
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border border-gray-200" 
              style={{ backgroundColor: value }} 
            />
            {value}
          </div>
        );
      case 'isBold':
      case 'isItalic':
      case 'isUnderline':
        return value ? 'Yes' : 'No';
      default:
        return String(value);
    }
  };

  const renderPatternTable = (patternsToRender: DirectFormatPattern[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pattern Name</TableHead>
          <TableHead>Font Properties</TableHead>
          <TableHead>Paragraph Properties</TableHead>
          <TableHead>Sample Text</TableHead>
          <TableHead>Occurrences</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patternsToRender.map((pattern) => (
          <TableRow key={pattern.id}>
            <TableCell className="font-medium">{pattern.patternName}</TableCell>
            <TableCell>
              <div className="space-y-1">
                {pattern.fontFamily && (
                  <div className="text-xs">
                    Font: <span className="font-medium">{pattern.fontFamily}</span>
                  </div>
                )}
                {pattern.fontSize && (
                  <div className="text-xs">
                    Size: <span className="font-medium">{pattern.fontSize} pt</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mt-1">
                  {pattern.isBold && (
                    <Badge variant="outline" className="text-xs">Bold</Badge>
                  )}
                  {pattern.isItalic && (
                    <Badge variant="outline" className="text-xs">Italic</Badge>
                  )}
                  {pattern.isUnderline && (
                    <Badge variant="outline" className="text-xs">Underline</Badge>
                  )}
                </div>
                {pattern.color && (
                  <div className="text-xs flex items-center gap-1 mt-1">
                    Color: 
                    <div 
                      className="w-3 h-3 rounded-full border border-gray-200" 
                      style={{ backgroundColor: pattern.color }} 
                    />
                    <span className="font-mono text-[10px]">{pattern.color}</span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1 text-xs">
                {pattern.alignment && (
                  <div>Alignment: <span className="font-medium">{pattern.alignment}</span></div>
                )}
                {pattern.spacingBefore !== undefined && (
                  <div>Spacing Before: <span className="font-medium">{pattern.spacingBefore} pt</span></div>
                )}
                {pattern.spacingAfter !== undefined && (
                  <div>Spacing After: <span className="font-medium">{pattern.spacingAfter} pt</span></div>
                )}
                {pattern.lineSpacing !== undefined && (
                  <div>Line Spacing: <span className="font-medium">{pattern.lineSpacing}</span></div>
                )}
                {pattern.indentationLeft !== undefined && (
                  <div>Left Indent: <span className="font-medium">{pattern.indentationLeft} pt</span></div>
                )}
                {pattern.indentationRight !== undefined && (
                  <div>Right Indent: <span className="font-medium">{pattern.indentationRight} pt</span></div>
                )}
                {pattern.firstLineIndent !== undefined && (
                  <div>First Line: <span className="font-medium">{pattern.firstLineIndent} pt</span></div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="max-w-[200px] truncate" title={pattern.sampleText}>
                {pattern.sampleText || 'No sample text'}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">
                {pattern.occurrenceCount}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardContent className="pt-6">
        {patterns.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No direct formatting patterns found in this template.
          </div>
        ) : (
          <Tabs defaultValue={contexts[0]}>
            <ScrollArea className="w-full pb-2" type="scroll">
              <TabsList className="mb-4 w-max">
                {contexts.map(context => (
                  <TabsTrigger key={context} value={context} className="truncate max-w-[200px]" title={context}>
                    {context}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>
            
            {contexts.map(context => (
              <TabsContent key={context} value={context}>
                {renderPatternTable(groupedPatterns[context])}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}; 