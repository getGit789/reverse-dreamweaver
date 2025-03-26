import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, CheckCircle2, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeThought } from '@/services/ai';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface ThoughtAnalysis {
  pattern?: string;
  reversal: string;
  explanation: string;
}

const ThoughtReverser = () => {
  const [inputThought, setInputThought] = useState('');
  const [analysis, setAnalysis] = useState<ThoughtAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyzeAndTransform = async () => {
    if (!inputThought.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeThought(inputThought);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing thought:', error);
      toast.error('Failed to analyze thought. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = () => {
    if (!analysis) return;
    
    navigator.clipboard.writeText(analysis.reversal);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6 px-4 sm:px-6">
        <div className="flex items-center">
          <BrainCircuit className="w-6 h-6 text-purple-600 mr-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-gradient">AI Thought Transformer</h2>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-600">
              <BrainCircuit className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px] text-sm">
            Share your thought or belief, and our AI will help you see it from a different perspective.
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="mb-6 px-4 sm:px-6">
        <Label htmlFor="input-thought" className="text-base sm:text-lg font-medium text-gray-700 mb-2 block">
          What thought would you like to transform?
        </Label>
        <div className="mt-2">
          <textarea
            id="input-thought"
            className="w-full p-4 min-h-[120px] text-base sm:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={inputThought}
            onChange={(e) => setInputThought(e.target.value)}
            placeholder="Enter a thought, belief, or perspective you'd like to see differently..."
          />
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <Button 
          onClick={analyzeAndTransform} 
          className="w-full gradient-bg text-white hover:opacity-90 py-4 sm:py-6 text-lg sm:text-xl mb-2 rounded-xl relative overflow-hidden group"
          disabled={!inputThought.trim() || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              <span>Analyzing your thought...</span>
            </>
          ) : (
            <>
              <BrainCircuit className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              <span>Transform This Thought</span>
            </>
          )}
        </Button>

        <AnimatePresence mode="wait">
          {analysis && !isAnalyzing && (
            <motion.div 
              className="mt-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-100 bg-green-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <ArrowRight className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-900">Alternative Perspective</h3>
                  </div>
                  <p className="text-green-800">{analysis.reversal}</p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <BrainCircuit className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-900">Why This Helps</h3>
                  </div>
                  <p className="text-blue-800">{analysis.explanation}</p>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={copyToClipboard}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" /> 
                      <span>Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" /> 
                      <span>Copy New Perspective</span>
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThoughtReverser;
