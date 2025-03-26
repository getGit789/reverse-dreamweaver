import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Copy, CheckCircle2, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TextReverser = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [reverseType, setReverseType] = useState('characters');
  const [copied, setCopied] = useState(false);

  const reverseText = () => {
    let result = '';

    if (reverseType === 'characters') {
      // Reverse all characters
      result = inputText.split('').reverse().join('');
    } else if (reverseType === 'words') {
      // Reverse the order of words
      result = inputText.split(' ').reverse().join(' ');
    } else if (reverseType === 'sentences') {
      // Reverse the order of sentences
      result = inputText.split(/(?<=[.!?])\s+/).reverse().join(' ');
    } else if (reverseType === 'capitalization') {
      // Reverse capitalization
      result = inputText.split('').map(char => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        }
        return char.toUpperCase();
      }).join('');
    }

    setOutputText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleTabChange = (value: string) => {
    setReverseType(value);
    if (inputText) {
      reverseText();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gradient">Text Reverser</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[200px] text-sm">
            Choose how you want to reverse your text: by characters, words, sentences, or capitalization.
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="mb-4 sm:mb-6 px-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-sm sm:text-base">Enter your text:</Label>
          <span className="text-xs text-gray-500">{inputText.length} characters</span>
        </div>
        <div className="mt-2">
          <textarea
            id="input-text"
            className="w-full p-4 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nuno-purple"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
          />
        </div>
      </div>

      <div className="mb-12 sm:mb-8 px-2">
        <Label className="text-sm sm:text-base mb-3 block">Reverse type:</Label>
        <Tabs value={reverseType} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-transparent">
            <TabsTrigger 
              value="characters" 
              className="text-[13px] leading-none sm:text-sm py-2.5 h-auto sm:h-9 px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-nuno-purple data-[state=active]:text-white bg-muted hover:bg-muted/80"
            >
              Characters
            </TabsTrigger>
            <TabsTrigger 
              value="words" 
              className="text-[13px] leading-none sm:text-sm py-2.5 h-auto sm:h-9 px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-nuno-purple data-[state=active]:text-white bg-muted hover:bg-muted/80"
            >
              Words
            </TabsTrigger>
            <TabsTrigger 
              value="sentences" 
              className="text-[13px] leading-none sm:text-sm py-2.5 h-auto sm:h-9 px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-nuno-purple data-[state=active]:text-white bg-muted hover:bg-muted/80"
            >
              Sentences
            </TabsTrigger>
            <TabsTrigger 
              value="capitalization" 
              className="text-[13px] leading-none sm:text-sm py-2.5 h-auto sm:h-9 px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-nuno-purple data-[state=active]:text-white bg-muted hover:bg-muted/80"
            >
              Caps
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-2">
        <Button 
          onClick={reverseText} 
          className="w-full gradient-bg text-white hover:opacity-90 py-3 sm:py-6 text-sm sm:text-lg mb-2"
          disabled={!inputText}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Reverse Text
        </Button>

        {outputText && (
          <div className="mt-6 sm:mt-8">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="output-text" className="text-sm sm:text-base">Result:</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard}
                className="text-nuno-purple hover:text-nuno-purple/80"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" /> 
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-4 w-4" /> 
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div 
              id="output-text"
              className="p-4 bg-gray-50 border border-gray-200 rounded-md min-h-[60px] sm:min-h-[80px] break-words text-sm sm:text-base"
            >
              {outputText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextReverser;
