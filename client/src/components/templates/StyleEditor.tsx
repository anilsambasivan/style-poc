import React, { useState } from 'react';
import { TextStyle } from '@/types/template';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StyleEditorProps {
  style: TextStyle;
  index: number;
  onStyleChange: (index: number, updatedStyle: TextStyle) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ style, index, onStyleChange }) => {
  const [localStyle, setLocalStyle] = useState<TextStyle>({...style});
  const [activeTab, setActiveTab] = useState('character');

  const handleChange = (field: keyof TextStyle, value: any) => {
    const updated = { ...localStyle, [field]: value };
    setLocalStyle(updated);
  };

  const handleBorderDirectionChange = (direction: 'top' | 'right' | 'bottom' | 'left', checked: boolean) => {
    // Get current directions as an array
    const currentDirections = localStyle.borderDirections 
      ? localStyle.borderDirections.split(',').map(d => d.trim())
      : [];
    
    // Add or remove the direction
    let newDirections: string[];
    if (checked && !currentDirections.includes(direction)) {
      newDirections = [...currentDirections, direction];
    } else if (!checked) {
      newDirections = currentDirections.filter(d => d !== direction);
    } else {
      newDirections = currentDirections;
    }
    
    // Join back into a comma-separated string
    handleChange('borderDirections', newDirections.join(', '));
  };

  const handleSave = () => {
    onStyleChange(index, localStyle);
  };

  const textAlignOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
    { value: 'justify', label: 'Justify' },
  ];

  const borderStyleOptions = [
    { value: 'none', label: 'None' },
    { value: 'solid', label: 'Solid' },
    { value: 'dotted', label: 'Dotted' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'double', label: 'Double' },
  ];

  const listStyleOptions = [
    { value: 'decimal', label: 'Decimal (1, 2, 3)' },
    { value: 'lower-alpha', label: 'Lower Alpha (a, b, c)' },
    { value: 'upper-alpha', label: 'Upper Alpha (A, B, C)' },
    { value: 'lower-roman', label: 'Lower Roman (i, ii, iii)' },
    { value: 'upper-roman', label: 'Upper Roman (I, II, III)' },
    { value: 'disc', label: 'Disc (•)' },
    { value: 'circle', label: 'Circle (○)' },
    { value: 'square', label: 'Square (■)' },
  ];

  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
    { value: 'it-IT', label: 'Italian' },
    { value: 'pt-BR', label: 'Portuguese' },
    { value: 'ja-JP', label: 'Japanese' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' },
    { value: 'ru-RU', label: 'Russian' },
  ];

  const styleTypeOptions = [
    { value: 'Paragraph', label: 'Paragraph' },
    { value: 'Character', label: 'Character' },
    { value: 'Table', label: 'Table' },
    { value: 'List', label: 'List' },
    { value: 'Section', label: 'Section' },
    { value: 'DocumentDefaults', label: 'Document Defaults' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Edit Style - {localStyle.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Style type and inheritance */}
        <div className="space-y-2 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`style-type-${index}`}>Style Type</Label>
              <Select 
                value={localStyle.styleType || 'Paragraph'} 
                onValueChange={(value) => handleChange('styleType', value)}
              >
                <SelectTrigger id={`style-type-${index}`}>
                  <SelectValue placeholder="Select style type" />
                </SelectTrigger>
                <SelectContent>
                  {styleTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`based-on-${index}`}>Based On</Label>
              <Input 
                id={`based-on-${index}`} 
                value={localStyle.basedOnStyle || ''} 
                onChange={(e) => handleChange('basedOnStyle', e.target.value)} 
                placeholder="Parent style name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`priority-${index}`}>Style Priority</Label>
            <div className="flex gap-2 items-center">
              <Slider 
                id={`priority-${index}`}
                value={[localStyle.priority || 0]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleChange('priority', value[0])}
                className="flex-1"
              />
              <div className="w-12 text-center">
                {localStyle.priority || 0}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="character">Character</TabsTrigger>
            <TabsTrigger value="paragraph">Paragraph</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="section">Section</TabsTrigger>
          </TabsList>

          {/* CHARACTER TAB */}
          <TabsContent value="character" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic font properties */}
              <div className="space-y-2">
                <Label htmlFor={`font-${index}`}>Font</Label>
                <Input 
                  id={`font-${index}`} 
                  value={localStyle.fontFamily || ''} 
                  onChange={(e) => handleChange('fontFamily', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`font-size-${index}`}>Font Size</Label>
                <Input 
                  id={`font-size-${index}`} 
                  value={localStyle.fontSize || ''} 
                  onChange={(e) => handleChange('fontSize', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`font-color-${index}`}>Font Color</Label>
                <div className="flex gap-2">
                  <Input 
                    id={`font-color-${index}`} 
                    value={localStyle.color || ''} 
                    onChange={(e) => handleChange('color', e.target.value)} 
                  />
                  <Input 
                    type="color" 
                    value={localStyle.color || '#000000'} 
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="w-12 p-1 h-10" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`highlight-color-${index}`}>Highlight Color</Label>
                <div className="flex gap-2">
                  <Input 
                    id={`highlight-color-${index}`} 
                    value={localStyle.highlighting || ''} 
                    onChange={(e) => handleChange('highlighting', e.target.value)} 
                  />
                  <Input 
                    type="color" 
                    value={localStyle.highlighting || '#ffffff'} 
                    onChange={(e) => handleChange('highlighting', e.target.value)}
                    className="w-12 p-1 h-10" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`character-spacing-${index}`}>Character Spacing</Label>
                <Input 
                  id={`character-spacing-${index}`} 
                  value={localStyle.characterSpacing || ''} 
                  onChange={(e) => handleChange('characterSpacing', e.target.value)} 
                  type="number"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`language-${index}`}>Language</Label>
                <Select 
                  value={localStyle.language || 'en-US'} 
                  onValueChange={(value) => handleChange('language', value)}
                >
                  <SelectTrigger id={`language-${index}`}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text style checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`bold-${index}`} 
                  checked={localStyle.isBold || false}
                  onCheckedChange={(checked) => handleChange('isBold', !!checked)} 
                />
                <Label htmlFor={`bold-${index}`}>Bold</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`italic-${index}`} 
                  checked={localStyle.isItalic || false}
                  onCheckedChange={(checked) => handleChange('isItalic', !!checked)} 
                />
                <Label htmlFor={`italic-${index}`}>Italic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`underline-${index}`} 
                  checked={localStyle.isUnderline || false}
                  onCheckedChange={(checked) => handleChange('isUnderline', !!checked)} 
                />
                <Label htmlFor={`underline-${index}`}>Underline</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`strikethrough-${index}`} 
                  checked={localStyle.isStrikethrough || false}
                  onCheckedChange={(checked) => handleChange('isStrikethrough', !!checked)} 
                />
                <Label htmlFor={`strikethrough-${index}`}>Strikethrough</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`all-caps-${index}`} 
                  checked={localStyle.isAllCaps || false}
                  onCheckedChange={(checked) => handleChange('isAllCaps', !!checked)} 
                />
                <Label htmlFor={`all-caps-${index}`}>All Caps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`small-caps-${index}`} 
                  checked={localStyle.isSmallCaps || false}
                  onCheckedChange={(checked) => handleChange('isSmallCaps', !!checked)} 
                />
                <Label htmlFor={`small-caps-${index}`}>Small Caps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`shadow-${index}`} 
                  checked={localStyle.hasShadow || false}
                  onCheckedChange={(checked) => handleChange('hasShadow', !!checked)} 
                />
                <Label htmlFor={`shadow-${index}`}>Shadow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`outline-${index}`} 
                  checked={localStyle.hasOutline || false}
                  onCheckedChange={(checked) => handleChange('hasOutline', !!checked)} 
                />
                <Label htmlFor={`outline-${index}`}>Outline</Label>
              </div>
            </div>
          </TabsContent>

          {/* PARAGRAPH TAB */}
          <TabsContent value="paragraph" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`text-align-${index}`}>Text Align</Label>
                <Select 
                  value={localStyle.alignment || 'left'} 
                  onValueChange={(value) => handleChange('alignment', value)}
                >
                  <SelectTrigger id={`text-align-${index}`}>
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    {textAlignOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`line-spacing-${index}`}>Line Spacing</Label>
                <Input 
                  id={`line-spacing-${index}`} 
                  value={localStyle.lineSpacing || ''} 
                  onChange={(e) => handleChange('lineSpacing', e.target.value)} 
                  type="number"
                  step="0.1"
                />
              </div>

              {/* Spacing properties */}
              <div className="space-y-2">
                <Label htmlFor={`spacing-before-${index}`}>Spacing Before</Label>
                <Input 
                  id={`spacing-before-${index}`} 
                  value={localStyle.spacingBefore || ''} 
                  onChange={(e) => handleChange('spacingBefore', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`spacing-after-${index}`}>Spacing After</Label>
                <Input 
                  id={`spacing-after-${index}`} 
                  value={localStyle.spacingAfter || ''} 
                  onChange={(e) => handleChange('spacingAfter', e.target.value)} 
                />
              </div>

              {/* Indentation properties */}
              <div className="space-y-2">
                <Label htmlFor={`indent-left-${index}`}>Indentation Left</Label>
                <Input 
                  id={`indent-left-${index}`} 
                  value={localStyle.indentationLeft || ''} 
                  onChange={(e) => handleChange('indentationLeft', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`indent-right-${index}`}>Indentation Right</Label>
                <Input 
                  id={`indent-right-${index}`} 
                  value={localStyle.indentationRight || ''} 
                  onChange={(e) => handleChange('indentationRight', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`first-line-indent-${index}`}>First Line Indent</Label>
                <Input 
                  id={`first-line-indent-${index}`} 
                  value={localStyle.firstLineIndent || ''} 
                  onChange={(e) => handleChange('firstLineIndent', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`list-style-${index}`}>List Number Style</Label>
                <Select 
                  value={localStyle.listNumberStyle || 'decimal'} 
                  onValueChange={(value) => handleChange('listNumberStyle', value as any)}
                >
                  <SelectTrigger id={`list-style-${index}`}>
                    <SelectValue placeholder="Select list style" />
                  </SelectTrigger>
                  <SelectContent>
                    {listStyleOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Paragraph behavior checkboxes */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`widow-orphan-${index}`} 
                  checked={localStyle.widowOrphanControl || false}
                  onCheckedChange={(checked) => handleChange('widowOrphanControl', !!checked)} 
                />
                <Label htmlFor={`widow-orphan-${index}`}>Widow/Orphan Control</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`keep-with-next-${index}`} 
                  checked={localStyle.keepWithNext || false}
                  onCheckedChange={(checked) => handleChange('keepWithNext', !!checked)} 
                />
                <Label htmlFor={`keep-with-next-${index}`}>Keep With Next</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`keep-together-${index}`} 
                  checked={localStyle.keepTogether || false}
                  onCheckedChange={(checked) => handleChange('keepTogether', !!checked)} 
                />
                <Label htmlFor={`keep-together-${index}`}>Keep Together</Label>
              </div>
            </div>

            {/* Tab Stops */}
            <Collapsible className="border rounded-md p-2 mt-4">
              <CollapsibleTrigger className="flex w-full justify-between items-center p-2">
                <span className="font-medium">Tab Stops</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                <div className="space-y-2">
                  <Label htmlFor={`tab-stops-${index}`}>Tab Stop Positions (comma-separated)</Label>
                  <Input 
                    id={`tab-stops-${index}`} 
                    value={localStyle.tabStops || ''} 
                    onChange={(e) => handleChange('tabStops', e.target.value)} 
                    placeholder="Example: 1cm left, 2cm center, 3cm right"
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: position alignment, position alignment, ...
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Border properties */}
            <Collapsible className="border rounded-md p-2 mt-4">
              <CollapsibleTrigger className="flex w-full justify-between items-center p-2">
                <span className="font-medium">Border Settings</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`border-style-${index}`}>Border Style</Label>
                    <Select 
                      value={localStyle.borderStyle || 'none'} 
                      onValueChange={(value) => handleChange('borderStyle', value)}
                    >
                      <SelectTrigger id={`border-style-${index}`}>
                        <SelectValue placeholder="Select border style" />
                      </SelectTrigger>
                      <SelectContent>
                        {borderStyleOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`border-color-${index}`}>Border Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id={`border-color-${index}`} 
                        value={localStyle.borderColor || ''} 
                        onChange={(e) => handleChange('borderColor', e.target.value)} 
                      />
                      <Input 
                        type="color" 
                        value={localStyle.borderColor || '#000000'} 
                        onChange={(e) => handleChange('borderColor', e.target.value)}
                        className="w-12 p-1 h-10" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`border-width-${index}`}>Border Width</Label>
                    <Input 
                      id={`border-width-${index}`} 
                      value={localStyle.borderWidth || ''} 
                      onChange={(e) => handleChange('borderWidth', e.target.value)} 
                    />
                  </div>
                </div>

                {/* Border directions */}
                <div className="space-y-2 mt-4">
                  <Label>Border Directions</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`border-top-${index}`} 
                        checked={localStyle.borderDirections?.includes('top') || false}
                        onCheckedChange={(checked) => handleBorderDirectionChange('top', !!checked)} 
                      />
                      <Label htmlFor={`border-top-${index}`}>Top</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`border-right-${index}`} 
                        checked={localStyle.borderDirections?.includes('right') || false}
                        onCheckedChange={(checked) => handleBorderDirectionChange('right', !!checked)} 
                      />
                      <Label htmlFor={`border-right-${index}`}>Right</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`border-bottom-${index}`} 
                        checked={localStyle.borderDirections?.includes('bottom') || false}
                        onCheckedChange={(checked) => handleBorderDirectionChange('bottom', !!checked)} 
                      />
                      <Label htmlFor={`border-bottom-${index}`}>Bottom</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`border-left-${index}`} 
                        checked={localStyle.borderDirections?.includes('left') || false}
                        onCheckedChange={(checked) => handleBorderDirectionChange('left', !!checked)} 
                      />
                      <Label htmlFor={`border-left-${index}`}>Left</Label>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>

          {/* TABLE TAB */}
          <TabsContent value="table" className="space-y-4">
            <div className="p-4 bg-muted rounded-md text-center">
              <p>Table style settings are applicable when Style Type is set to "Table"</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`table-border-style-${index}`}>Table Border Style</Label>
                <Select 
                  value={localStyle.tableBorderStyle || 'none'} 
                  onValueChange={(value) => handleChange('tableBorderStyle', value)}
                  disabled={localStyle.styleType !== 'Table'}
                >
                  <SelectTrigger id={`table-border-style-${index}`}>
                    <SelectValue placeholder="Select border style" />
                  </SelectTrigger>
                  <SelectContent>
                    {borderStyleOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`table-border-color-${index}`}>Table Border Color</Label>
                <div className="flex gap-2">
                  <Input 
                    id={`table-border-color-${index}`} 
                    value={localStyle.tableBorderColor || ''} 
                    onChange={(e) => handleChange('tableBorderColor', e.target.value)} 
                    disabled={localStyle.styleType !== 'Table'}
                  />
                  <Input 
                    type="color" 
                    value={localStyle.tableBorderColor || '#000000'} 
                    onChange={(e) => handleChange('tableBorderColor', e.target.value)}
                    className="w-12 p-1 h-10" 
                    disabled={localStyle.styleType !== 'Table'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`table-border-width-${index}`}>Table Border Width</Label>
                <Input 
                  id={`table-border-width-${index}`} 
                  value={localStyle.tableBorderWidth || ''} 
                  onChange={(e) => handleChange('tableBorderWidth', e.target.value)} 
                  disabled={localStyle.styleType !== 'Table'}
                />
              </div>
            </div>
          </TabsContent>

          {/* SECTION TAB */}
          <TabsContent value="section" className="space-y-4">
            <div className="p-4 bg-muted rounded-md text-center">
              <p>Section formatting settings are applicable when Style Type is set to "Section"</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`section-spacing-before-${index}`}>Section Spacing Before</Label>
                <Input 
                  id={`section-spacing-before-${index}`} 
                  value={localStyle.spacingBefore || ''} 
                  onChange={(e) => handleChange('spacingBefore', e.target.value)} 
                  disabled={localStyle.styleType !== 'Section'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`section-spacing-after-${index}`}>Section Spacing After</Label>
                <Input 
                  id={`section-spacing-after-${index}`} 
                  value={localStyle.spacingAfter || ''} 
                  onChange={(e) => handleChange('spacingAfter', e.target.value)} 
                  disabled={localStyle.styleType !== 'Section'}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handleSave} className="w-full mt-6">Save Changes</Button>
      </CardContent>
    </Card>
  );
};

export default StyleEditor;
