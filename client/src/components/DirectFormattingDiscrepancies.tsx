import React from 'react';
import { DirectFormattingDiscrepancy } from '@/types/template';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface DirectFormattingDiscrepanciesProps {
  discrepancies: DirectFormattingDiscrepancy[];
}

export const DirectFormattingDiscrepancies: React.FC<DirectFormattingDiscrepanciesProps> = ({ discrepancies }) => {
  if (discrepancies.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground border rounded-md">
        No direct formatting discrepancies found.
      </div>
    );
  }

  // Group discrepancies by context
  const groupedDiscrepancies = discrepancies.reduce((acc, disc) => {
    const context = disc.context || 'General';
    if (!acc[context]) {
      acc[context] = [];
    }
    acc[context].push(disc);
    return acc;
  }, {} as Record<string, DirectFormattingDiscrepancy[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedDiscrepancies).map(([context, items]) => (
        <div key={context}>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Badge variant="outline" className="mr-2">{context}</Badge>
            <span>{items.length} discrepancies</span>
          </h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Expected</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((disc, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{disc.patternName}</TableCell>
                    <TableCell>{disc.propertyName}</TableCell>
                    <TableCell className="font-mono text-xs">{disc.expectedValue}</TableCell>
                    <TableCell className="font-mono text-xs text-red-600">{disc.actualValue}</TableCell>
                    <TableCell className="text-xs">{disc.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}; 