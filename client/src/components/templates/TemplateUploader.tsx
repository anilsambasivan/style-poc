import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, FileText, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uploadTemplate } from '@/lib/api';
import { TextStyle } from '@/types/template';

interface TemplateUploaderProps {
  onStylesExtracted: (styles: TextStyle[], fileName: string) => void;
}

const TemplateUploader: React.FC<TemplateUploaderProps> = ({ onStylesExtracted }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast({
          title: 'Invalid file format',
          description: 'Please upload a DOCX file',
          variant: 'destructive'
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast({
          title: 'Invalid file format',
          description: 'Please upload a DOCX file',
          variant: 'destructive'
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress (since fetch doesn't have progress events by default)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const result = await uploadTemplate(selectedFile);
      setUploadProgress(100);
      clearInterval(progressInterval);
      
      // Pass the extracted styles and filename to the parent component
      onStylesExtracted(result.styles, selectedFile.name);
      
      toast({
        title: 'Template uploaded successfully',
        description: `Extracted ${result.styles.length} styles from the document`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload template',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      clearInterval(progressInterval);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            selectedFile ? 'border-green-300 bg-green-50' : 'border-slate-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!selectedFile ? (
            <>
              <div className="mb-4 flex justify-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="mb-2 text-sm font-medium">
                Drag and drop your DOCX template or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Only DOCX files are supported
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="outline" type="button" className="cursor-pointer">
                  Select File
                </Button>
              </label>
            </>
          ) : (
            <div className="py-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium truncate max-w-[180px]">
                    {selectedFile.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </div>
              {isUploading ? (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {uploadProgress < 100
                      ? 'Extracting styles...'
                      : 'Processing complete'}
                  </p>
                </div>
              ) : (
                <Button onClick={handleUpload} className="w-full">
                  Extract Styles
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateUploader;
