import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Plus, Trash, Eye, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Template } from '@/types/template';
import { getTemplates, deleteTemplate, getTemplate } from '@/lib/api';
import { DirectFormattingPatterns } from '@/components/templates/DirectFormattingPatterns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    loadTemplates();
  }, []);
  
  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: 'Failed to load templates',
        description: 'Could not retrieve template data from the server',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewTemplate = async (id: number) => {
    try {
      const templateData = await getTemplate(id);
      setSelectedTemplate(templateData);
      setIsViewDialogOpen(true);
    } catch (error) {
      console.error('Error loading template details:', error);
      toast({
        title: 'Failed to load template',
        description: 'Could not retrieve template details from the server',
        variant: 'destructive'
      });
    }
  };
  
  const handleDeleteClick = (id: number) => {
    setTemplateToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (templateToDelete === null) return;
    
    setIsDeleting(true);
    try {
      await deleteTemplate(templateToDelete);
      setTemplates(templates.filter(t => t.id !== templateToDelete));
      toast({
        title: 'Template deleted',
        description: 'The template has been removed from your collection'
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Delete failed',
        description: 'Could not delete the template',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP');
  };
  
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-1">
            Manage your document style templates
          </p>
        </div>
        <Button onClick={() => navigate('/upload')} className="flex items-center gap-1.5">
          <Plus size={16} />
          New Template
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Template Collection</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : templates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Styles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.description || 'No description'}</TableCell>
                    <TableCell>{formatDate(template.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {template.styles?.length || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewTemplate(template.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteClick(template.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No Templates Found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first template by uploading a document
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => navigate('/upload')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Template Dialog */}
      <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <AlertDialogContent className="max-w-4xl w-[95vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedTemplate?.name}
            </AlertDialogTitle>
          </AlertDialogHeader>
          
          {selectedTemplate && (
            <div className="py-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                <p>{selectedTemplate.description || 'No description provided'}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Created</h4>
                <p>{formatDate(selectedTemplate.createdAt)}</p>
              </div>
              
              <Tabs defaultValue="styles" className="mt-6">
                <ScrollArea className="w-full pb-2">
                  <TabsList className="mb-4 w-max">
                    <TabsTrigger value="styles">Styles</TabsTrigger>
                    <TabsTrigger value="directFormatting">Direct Formatting</TabsTrigger>
                  </TabsList>
                </ScrollArea>
                
                <TabsContent value="styles">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Styles</h4>
                    <ScrollArea className="h-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Font</TableHead>
                            <TableHead>Attributes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedTemplate.styles.map((style) => (
                            <TableRow key={style.id}>
                              <TableCell className="font-medium">{style.name}</TableCell>
                              <TableCell>{style.styleType}</TableCell>
                              <TableCell>
                                <div className="text-xs">
                                  {style.fontFamily}, {style.fontSize}pt
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {style.isBold && (
                                    <Badge variant="outline" className="text-xs">Bold</Badge>
                                  )}
                                  {style.isItalic && (
                                    <Badge variant="outline" className="text-xs">Italic</Badge>
                                  )}
                                  {style.isUnderline && (
                                    <Badge variant="outline" className="text-xs">Underline</Badge>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                </TabsContent>
                
                <TabsContent value="directFormatting">
                  <ScrollArea className="h-[400px] w-[850px]">
                    <DirectFormattingPatterns 
                      patterns={selectedTemplate.styles.flatMap(style => style.directFormatPatterns || [])} 
                    />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Templates;
