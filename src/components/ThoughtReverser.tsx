
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lightbulb, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

// Example thought reversals for demonstration purposes
const thoughtReversals = [
  {
    original: "I need to be perfect to succeed.",
    reversed: "Making mistakes is essential for growth and success.",
  },
  {
    original: "I always have to say yes to opportunities.",
    reversed: "Saying no creates space for what truly matters.",
  },
  {
    original: "Money is the most important measure of success.",
    reversed: "Success is measured by impact, fulfillment, and relationships.",
  },
  {
    original: "I need to work harder to be more productive.",
    reversed: "Rest and recovery are essential to sustained productivity.",
  },
  {
    original: "I must control everything to ensure good outcomes.",
    reversed: "Letting go allows for unexpected positive possibilities.",
  },
  {
    original: "Failure means I'm not good enough.",
    reversed: "Failure is feedback that helps me improve.",
  },
  {
    original: "I need everyone's approval.",
    reversed: "My own approval matters most.",
  },
  {
    original: "I need to know everything before starting.",
    reversed: "Starting creates the path for learning what I need.",
  },
  {
    original: "I don't have enough time.",
    reversed: "I prioritize what truly matters with the time I have.",
  },
  {
    original: "Change is risky and should be avoided.",
    reversed: "Embracing change opens doors to new possibilities.",
  },
  {
    original: "If it's not perfect, it's not worth doing.",
    reversed: "Progress is better than perfection.",
  },
  {
    original: "Problems are obstacles to be avoided.",
    reversed: "Problems are opportunities for creative solutions.",
  },
];

const ThoughtReverser = () => {
  const [inputThought, setInputThought] = useState('');
  const [result, setResult] = useState<{ original: string; reversed: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const generateReversedThought = () => {
    // For now, we'll randomly select one from our examples
    // In a real application, this could use an AI service to generate unique reversals
    
    if (inputThought.trim() === '') {
      toast.error('Please enter a thought to reverse');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * thoughtReversals.length);
    setResult({
      original: inputThought,
      reversed: thoughtReversals[randomIndex].reversed,
    });
    
    toast.success('Thought reversed successfully!');
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(result.reversed);
    setCopied(true);
    toast.success('Text copied to clipboard!');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gradient">Thought Reverser</h2>
      
      <div className="mb-6">
        <Label htmlFor="input-thought">Enter your thought or belief:</Label>
        <div className="mt-2">
          <textarea
            id="input-thought"
            className="w-full p-3 min-h-[100px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nuno-purple"
            value={inputThought}
            onChange={(e) => setInputThought(e.target.value)}
            placeholder="Enter a thought or belief you'd like to see differently..."
          />
        </div>
      </div>

      <Button 
        onClick={generateReversedThought} 
        className="w-full gradient-bg text-white hover:opacity-90"
        disabled={!inputThought.trim()}
      >
        Reverse My Thought
      </Button>

      {result && (
        <div className="mt-8">
          <Label className="mb-2 block">Your reversed perspective:</Label>
          
          <Card className="w-full shadow-md gradient-bg text-white mb-6">
            <CardContent className="p-6">
              <div>
                <p className="text-lg font-medium">{result.reversed}</p>
                <div className="flex items-center mt-4 text-sm text-white/80">
                  <Lightbulb className="h-4 w-4 mr-2" /> 
                  <p>Consider how this different view might be true</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            className="w-full border-nuno-purple text-nuno-purple hover:bg-nuno-purple/10"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Copied to Clipboard
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy Reversed Perspective
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThoughtReverser;
