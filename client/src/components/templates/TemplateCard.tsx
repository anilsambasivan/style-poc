
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash } from 'lucide-react';
import { Template } from '@/types/template';
import { format } from 'date-fns';

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDelete: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <FileText size={18} />
          {template.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {template.description || 'No description available'}
        </p>
        <div className="text-xs text-muted-foreground">
          <p>Created: {template.createdAt ? format(new Date(template.createdAt), 'MMM dd, yyyy') : 'N/A'}</p>
          <p>Styles: {template.styles.length}</p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onEdit(template)}
        >
          <Edit size={14} className="mr-1" /> Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-destructive hover:text-destructive"
          onClick={() => template.id && onDelete(template.id)}
        >
          <Trash size={14} className="mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
