
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

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
    toast.success('Text copied to clipboard!');
    
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
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gradient">Text Reverser</h2>
      
      <div className="mb-6">
        <Label htmlFor="input-text">Enter your text:</Label>
        <div className="mt-2">
          <textarea
            id="input-text"
            className="w-full p-3 min-h-[120px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nuno-purple"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
          />
        </div>
      </div>

      <div className="mb-6">
        <Label>Reverse type:</Label>
        <Tabs value={reverseType} onValueChange={handleTabChange} className="mt-2">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="words">Words</TabsTrigger>
            <TabsTrigger value="sentences">Sentences</TabsTrigger>
            <TabsTrigger value="capitalization">Capitalization</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Button 
        onClick={reverseText} 
        className="w-full gradient-bg text-white hover:opacity-90"
        disabled={!inputText}
      >
        <RefreshCw className="mr-2 h-4 w-4" /> Reverse Text
      </Button>

      {outputText && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="output-text">Result:</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyToClipboard}
              className="text-nuno-purple hover:text-nuno-purple/80"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" /> Copy
                </>
              )}
            </Button>
          </div>
          <div 
            id="output-text"
            className="p-4 bg-gray-50 border border-gray-200 rounded-md min-h-[80px] break-words"
          >
            {outputText}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextReverser;
