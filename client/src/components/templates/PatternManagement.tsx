import React, { useState, useEffect } from 'react';
import { DirectFormatPattern } from '@/types/template';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash, Info, Check, Filter } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface PatternManagementProps {
  patterns: DirectFormatPattern[];
  onUpdatePattern: (pattern: DirectFormatPattern) => void;
  onDeletePattern: (patternId: number) => void;
}

export const PatternManagement: React.FC<PatternManagementProps> = ({ 
  patterns, 
  onUpdatePattern, 
  onDeletePattern 
}) => {
  const [filteredPatterns, setFilteredPatterns] = useState<DirectFormatPattern[]>(patterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [contextFilter, setContextFilter] = useState('all');
  const [infoPattern, setInfoPattern] = useState<DirectFormatPattern | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  
  useEffect(() => {
    let result = [...patterns];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.patternName.toLowerCase().includes(term) || 
        p.context.toLowerCase().includes(term) || 
        p.sampleText.toLowerCase().includes(term)
      );
    }
    
    if (contextFilter && contextFilter !== 'all') {
      result = result.filter(p => p.context === contextFilter);
    }
    
    setFilteredPatterns(result);
  }, [patterns, searchTerm, contextFilter]);
  
  // Get unique contexts from patterns
  const contexts = ['all', ...Array.from(new Set(patterns.map(p => p.context)))];
  
  const handleAllowedToggle = (pattern: DirectFormatPattern) => {
    // In a real implementation, this would be stored in the pattern
    // For now, we'll just update the pattern name to indicate it's allowed
    const updatedPattern = {
      ...pattern,
      patternName: pattern.patternName.includes('[Allowed]') 
        ? pattern.patternName.replace('[Allowed] ', '') 
        : `[Allowed] ${pattern.patternName}`
    };
    onUpdatePattern(updatedPattern);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Direct Formatting Patterns</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage formatting patterns found in the template
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search patterns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-[180px]">
              <Select value={contextFilter} onValueChange={setContextFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter size={14} />
                    <SelectValue placeholder="Filter by context" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {contexts.map(context => (
                    <SelectItem key={context} value={context}>
                      {context === 'all' ? 'All Contexts' : context}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredPatterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              No patterns match your filters
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pattern Name</TableHead>
                    <TableHead>Context</TableHead>
                    <TableHead>Occurrences</TableHead>
                    <TableHead>Allowed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatterns.map((pattern) => (
                    <TableRow key={pattern.id}>
                      <TableCell className="font-medium">{pattern.patternName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pattern.context}</Badge>
                      </TableCell>
                      <TableCell>{pattern.occurrenceCount}</TableCell>
                      <TableCell>
                        <Checkbox 
                          checked={pattern.patternName.includes('[Allowed]')}
                          onCheckedChange={() => handleAllowedToggle(pattern)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => {
                                  setInfoPattern(pattern);
                                  setIsInfoDialogOpen(true);
                                }}
                              >
                                <Info size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View details</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => onDeletePattern(pattern.id)}
                              >
                                <Trash size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete pattern</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pattern Details</DialogTitle>
            <DialogDescription>
              Detailed information about this formatting pattern
            </DialogDescription>
          </DialogHeader>
          
          {infoPattern && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pattern Name</p>
                  <p>{infoPattern.patternName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Context</p>
                  <Badge variant="outline">{infoPattern.context}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Sample Text</p>
                  <p className="text-sm">{infoPattern.sampleText}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Occurrences</p>
                  <p>{infoPattern.occurrenceCount}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Font Properties</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Font:</span>{' '}
                    {infoPattern.fontFamily || 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>{' '}
                    {infoPattern.fontSize ? `${infoPattern.fontSize}pt` : 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bold:</span>{' '}
                    {infoPattern.isBold ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Italic:</span>{' '}
                    {infoPattern.isItalic ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Underline:</span>{' '}
                    {infoPattern.isUnderline ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Color:</span>{' '}
                    {infoPattern.color ? (
                      <span className="inline-flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-1.5 inline-block border"
                          style={{ backgroundColor: infoPattern.color }}
                        />
                        {infoPattern.color}
                      </span>
                    ) : 'Not specified'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Paragraph Properties</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Alignment:</span>{' '}
                    {infoPattern.alignment || 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Before:</span>{' '}
                    {infoPattern.spacingBefore !== undefined ? `${infoPattern.spacingBefore}pt` : 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">After:</span>{' '}
                    {infoPattern.spacingAfter !== undefined ? `${infoPattern.spacingAfter}pt` : 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Line Spacing:</span>{' '}
                    {infoPattern.lineSpacing !== undefined ? infoPattern.lineSpacing : 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Left Indent:</span>{' '}
                    {infoPattern.indentationLeft !== undefined ? `${infoPattern.indentationLeft}pt` : 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Right Indent:</span>{' '}
                    {infoPattern.indentationRight !== undefined ? `${infoPattern.indentationRight}pt` : 'Not specified'}
                  </div>
                  <div>
                    <span className="text-muted-foreground">First Line:</span>{' '}
                    {infoPattern.firstLineIndent !== undefined ? `${infoPattern.firstLineIndent}pt` : 'Not specified'}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsInfoDialogOpen(false)}>Close</Button>
            {infoPattern && (
              <Button 
                variant="outline" 
                className="gap-1"
                onClick={() => {
                  handleAllowedToggle(infoPattern);
                  setIsInfoDialogOpen(false);
                }}
              >
                <Check size={16} />
                {infoPattern.patternName.includes('[Allowed]') ? 'Disallow Pattern' : 'Allow Pattern'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 