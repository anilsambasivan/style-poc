
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TemplateUploader from '@/components/templates/TemplateUploader';
import StylePreview from '@/components/templates/StylePreview';
import StyleEditor from '@/components/templates/StyleEditor';
import TemplateSaveForm from '@/components/templates/TemplateSaveForm';
import { TextStyle } from '@/types/template';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Upload: React.FC = () => {
  const [extractedStyles, setExtractedStyles] = useState<TextStyle[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [selectedStyleIndex, setSelectedStyleIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('preview');

  const handleStylesExtracted = (styles: TextStyle[], name: string) => {
    setExtractedStyles(styles);
    setFileName(name);
    setSelectedStyleIndex(null);
  };

  const handleStyleChange = (index: number, updatedStyle: TextStyle) => {
    const newStyles = [...extractedStyles];
    newStyles[index] = updatedStyle;
    setExtractedStyles(newStyles);
  };

  const handleSelectStyle = (index: number) => {
    setSelectedStyleIndex(index === selectedStyleIndex ? null : index);
    setActiveTab('edit');
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Upload Template</h1>
        <p className="text-muted-foreground mt-1">
          Upload a DOCX template to extract and save its style information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TemplateUploader onStylesExtracted={handleStylesExtracted} />
          
          {extractedStyles.length > 0 && (
            <div className="mt-6">
              <TemplateSaveForm styles={extractedStyles} fileName={fileName} />
            </div>
          )}
        </div>

        {extractedStyles.length > 0 && (
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-muted-foreground">
                  {extractedStyles.length} style{extractedStyles.length !== 1 ? 's' : ''} found
                </div>
              </div>

              <TabsContent value="preview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extractedStyles.map((style, index) => (
                    <div key={index} className="relative">
                      <StylePreview style={style} index={index} />
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleSelectStyle(index)}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="edit">
                {selectedStyleIndex !== null ? (
                  <StyleEditor 
                    style={extractedStyles[selectedStyleIndex]} 
                    index={selectedStyleIndex} 
                    onStyleChange={handleStyleChange} 
                  />
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground">
                      Select a style from the preview tab to edit
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {extractedStyles.length === 0 && (
        <div className="text-center py-12 border rounded-lg mt-6 bg-muted/10">
          <p className="text-muted-foreground">
            Upload a DOCX file to extract and preview its styles
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default Upload;
