import React from 'react';
import { StyleDiscrepancy } from '@/types/template';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

interface FilteredDiscrepanciesProps {
  discrepancies: StyleDiscrepancy[];
}

export const FilteredDiscrepancies: React.FC<FilteredDiscrepanciesProps> = ({ discrepancies }) => {
  if (discrepancies.length === 0) {
    return (
      <div className="text-center p-6 bg-muted/20 rounded-md">
        <p className="text-muted-foreground">No discrepancies found in this category</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Style Name</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Expected</TableHead>
            <TableHead>Actual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discrepancies.map((discrepancy, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{discrepancy.styleName}</TableCell>
              <TableCell>{discrepancy.propertyName}</TableCell>
              <TableCell>{discrepancy.expectedValue}</TableCell>
              <TableCell className="text-red-600">{discrepancy.actualValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 