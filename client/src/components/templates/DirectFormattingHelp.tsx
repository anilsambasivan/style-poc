import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Book, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const DirectFormattingHelp: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <HelpCircle size={16} />
          Direct Formatting Help
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="explanation">
          <TabsList className="mb-4">
            <TabsTrigger value="explanation">What is Direct Formatting</TabsTrigger>
            <TabsTrigger value="examples">Visual Examples</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explanation">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Direct Formatting vs. Style Definitions</AlertTitle>
                <AlertDescription>
                  Understanding the difference is crucial for consistent document styling.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium">What is Direct Formatting?</h3>
                <p className="text-sm">
                  Direct formatting refers to formatting applied directly to text or paragraphs 
                  without using styles. Examples include:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Highlighting text and clicking the Bold button</li>
                  <li>Manually changing font size for specific paragraphs</li>
                  <li>Changing alignment or spacing for individual sections</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium">What are Style Definitions?</h3>
                <p className="text-sm">
                  Styles are predefined formatting settings that can be applied consistently across a document.
                  Benefits include:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Consistent appearance throughout documents</li>
                  <li>Easy global updates by modifying the style definition</li>
                  <li>Better document structure and organization</li>
                  <li>Improved accessibility and navigation</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium">Why Does It Matter?</h3>
                <p className="text-sm">
                  Direct formatting can create inconsistencies in document appearance and make maintenance difficult.
                  Using styles creates consistent, maintainable documents that follow organizational standards.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-base font-medium mb-2">Direct Formatting Example</h3>
                  <div className="border-l-4 border-red-400 pl-3 py-1 mb-3">
                    <p className="text-sm font-semibold">This is what direct formatting looks like:</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-bold">Manually bolded text</span> in a paragraph.</p>
                    <p className="text-sm"><span className="italic">Manually italicized text</span> in another paragraph.</p>
                    <p className="text-sm text-blue-600">Text with manually changed color.</p>
                    <p className="text-sm" style={{ textIndent: '20px' }}>A paragraph with manual indentation applied.</p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-base font-medium mb-2">Style-Based Formatting Example</h3>
                  <div className="border-l-4 border-green-400 pl-3 py-1 mb-3">
                    <p className="text-sm font-semibold">This is what style-based formatting looks like:</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm bg-slate-100 p-1 rounded"><span className="font-mono text-xs">Heading 1</span> style applied consistently</p>
                    <p className="text-sm bg-slate-100 p-1 rounded"><span className="font-mono text-xs">Body Text</span> style used for paragraphs</p>
                    <p className="text-sm bg-slate-100 p-1 rounded"><span className="font-mono text-xs">Quote</span> style for quotations</p>
                    <p className="text-sm bg-slate-100 p-1 rounded"><span className="font-mono text-xs">List Paragraph</span> style for lists</p>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-amber-50 mt-4">
                <Book className="h-4 w-4" />
                <AlertTitle>Word Document Example</AlertTitle>
                <AlertDescription>
                  In Microsoft Word, you can see if text uses direct formatting by looking at the Styles pane.
                  If the style name has a "+" after it (like "Normal+"), it means direct formatting has been applied on top of the style.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          
          <TabsContent value="best-practices">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Best Practices for Document Formatting</h3>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">1. Use Styles Consistently</h4>
                <p className="text-sm">
                  Always use paragraph and character styles instead of direct formatting.
                  Create new styles when needed rather than applying manual formatting.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">2. Modify Styles, Don't Override Them</h4>
                <p className="text-sm">
                  If you need to change the appearance of text, modify the style definition
                  rather than applying direct formatting.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">3. Use Style Hierarchy</h4>
                <p className="text-sm">
                  Take advantage of style relationships (based on styles) to make global changes
                  efficiently and maintain consistency.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">4. Document Your Styles</h4>
                <p className="text-sm">
                  Keep a style guide that documents the purpose and usage of each style in your templates.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">5. Regular Cleanup</h4>
                <p className="text-sm">
                  Periodically check for and remove direct formatting using Word's "Clear Formatting" feature
                  and apply the appropriate style.
                </p>
              </div>
              
              <Alert className="bg-blue-50 mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Pro Tip</AlertTitle>
                <AlertDescription>
                  In Word, you can see all formatting applied to text by selecting it and pressing Shift+F1
                  to display the Reveal Formatting pane.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 