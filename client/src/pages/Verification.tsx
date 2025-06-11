import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getTemplates, verifyDocument } from '@/lib/api';
import { Template, VerificationResult, StyleDiscrepancy } from '@/types/template';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FilteredDiscrepancies } from '@/components/FilteredDiscrepancies';
import { DirectFormattingDiscrepancies } from '@/components/DirectFormattingDiscrepancies';
import { Switch } from '@/components/ui/switch';

const Verification: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(false);
  const [ignoreDirectFormatting, setIgnoreDirectFormatting] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Fetch templates when component mounts
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoadingTemplates(true);
      try {
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: 'Failed to load templates',
          description: 'Could not fetch template list from the server',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    
    fetchTemplates();
  }, [toast]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVerificationResult(null);
    }
  };
  
  const handleTemplateChange = (value: string) => {
    setSelectedTemplateId(value);
    setVerificationResult(null);
  };
  
  const handleVerify = async () => {
    if (!file || !selectedTemplateId) {
      toast({
        title: 'Missing information',
        description: 'Please select both a template and a document',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await verifyDocument(file, parseInt(selectedTemplateId), ignoreDirectFormatting);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'Failed to verify document',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Verify Document</h1>
        <p className="text-muted-foreground mt-1">
          Check if a document follows the style guidelines defined in a template
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Verification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Select Template</Label>
                <Select
                  disabled={isLoadingTemplates}
                  value={selectedTemplateId}
                  onValueChange={handleTemplateChange}
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {templates.length > 0 ? (
                        templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="none">
                          {isLoadingTemplates ? 'Loading templates...' : 'No templates available'}
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-upload">Upload Document</Label>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-center mb-4">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-sm font-medium">
                      {file ? file.name : 'Upload a document to verify'}
                    </p>
                    {file && (
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>
                  <Input
                    id="document-upload"
                    type="file"
                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="document-upload">
                    <Button variant="outline" type="button" className="w-full cursor-pointer" onClick={() => document.getElementById('document-upload')?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      {file ? 'Change File' : 'Select File'}
                    </Button>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between space-x-2 pt-2">
                <Label htmlFor="ignore-direct-formatting" className="cursor-pointer">
                  Ignore Direct Formatting
                </Label>
                <Switch 
                  id="ignore-direct-formatting" 
                  checked={ignoreDirectFormatting} 
                  onCheckedChange={setIgnoreDirectFormatting}
                />
              </div>
              
              <Button 
                onClick={handleVerify} 
                disabled={isLoading || !file || !selectedTemplateId} 
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify Document'}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {verificationResult ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Verification Results</CardTitle>
                  <div className="flex items-center">
                    {verificationResult.success ? (
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCircle2 className="h-5 w-5 mr-1" />
                        Passed
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 text-sm font-medium">
                        <XCircle className="h-5 w-5 mr-1" />
                        Failed
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Alert className={verificationResult.success ? 'bg-green-50' : 'bg-red-50'}>
                  <AlertTriangle className={`h-4 w-4 ${verificationResult.success ? 'text-green-600' : 'text-red-600'}`} />
                  <AlertTitle>Verification {verificationResult.success ? 'Successful' : 'Failed'}</AlertTitle>
                  <AlertDescription>
                    {verificationResult.message}
                  </AlertDescription>
                </Alert>
                
                {verificationResult.discrepancies.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Style Discrepancies</h3>
                    
                    <Tabs defaultValue="all" className="mb-4">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="character">Character</TabsTrigger>
                        <TabsTrigger value="paragraph">Paragraph</TabsTrigger>
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="section">Section</TabsTrigger>
                        <TabsTrigger value="document">Document Defaults</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all">
                        <div className="border rounded-md overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Style Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Property</TableHead>
                                <TableHead>Expected</TableHead>
                                <TableHead>Actual</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {verificationResult.discrepancies.map((discrepancy: StyleDiscrepancy, i: number) => (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">{discrepancy.styleName}</TableCell>
                                  <TableCell>{discrepancy.category || 'General'}</TableCell>
                                  <TableCell>{discrepancy.propertyName}</TableCell>
                                  <TableCell>{discrepancy.expectedValue}</TableCell>
                                  <TableCell className="text-red-600">{discrepancy.actualValue}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="character">
                        <FilteredDiscrepancies 
                          discrepancies={verificationResult.discrepancies.filter(d => d.category === 'Character')} 
                        />
                      </TabsContent>
                      
                      <TabsContent value="paragraph">
                        <FilteredDiscrepancies 
                          discrepancies={verificationResult.discrepancies.filter(d => d.category === 'Paragraph')} 
                        />
                      </TabsContent>
                      
                      <TabsContent value="table">
                        <FilteredDiscrepancies 
                          discrepancies={verificationResult.discrepancies.filter(d => d.category === 'Table')} 
                        />
                      </TabsContent>
                      
                      <TabsContent value="section">
                        <FilteredDiscrepancies 
                          discrepancies={verificationResult.discrepancies.filter(d => d.category === 'Section')} 
                        />
                      </TabsContent>
                      
                      <TabsContent value="document">
                        <FilteredDiscrepancies 
                          discrepancies={verificationResult.discrepancies.filter(d => d.category === 'DocumentDefaults')} 
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
                
                {verificationResult.directFormattingDiscrepancies && verificationResult.directFormattingDiscrepancies.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Direct Formatting Discrepancies</h3>
                    <DirectFormattingDiscrepancies discrepancies={verificationResult.directFormattingDiscrepancies} />
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] border rounded-md">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No Results Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Select a template and upload a document to verify its style compliance
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Verification;
