import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { saveTemplate } from '@/lib/api';
import { TextStyle } from '@/types/template';

interface TemplateSaveFormProps {
  styles: TextStyle[];
  fileName: string;
}

const TemplateSaveForm: React.FC<TemplateSaveFormProps> = ({ styles, fileName }) => {
  const [templateName, setTemplateName] = useState(fileName.replace('.docx', ''));
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please provide a name for this template',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      await saveTemplate(templateName, description, styles);
      toast({
        title: 'Template saved successfully',
        description: 'The template has been saved to your collection',
      });
      
      // Navigate to templates page
      navigate('/templates');
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Save failed',
        description: error instanceof Error ? error.message : 'Failed to save template',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Save Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter a name for this template"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-description">Description (Optional)</Label>
            <Textarea
              id="template-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for this template"
              rows={3}
            />
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="w-full"
            >
              {isSaving ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSaveForm;
