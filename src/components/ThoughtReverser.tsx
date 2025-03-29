import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, CheckCircle2, Sparkles, BrainCircuit, ArrowRight, HelpCircle, AlertCircle, RefreshCw, Clock, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeThought, ThoughtAnalysis } from '@/services/ai';
import { checkPromptLimit, incrementPromptUsage } from '@/services/api';
import { useUser } from '@clerk/clerk-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';

const ThoughtReverser = () => {
  const [inputThought, setInputThought] = useState('');
  const [analysis, setAnalysis] = useState<ThoughtAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [promptLimit, setPromptLimit] = useState({ canUsePrompt: true, remainingPrompts: 3, totalUsed: 0 });
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const checkLimit = async () => {
      if (user) {
        try {
          const limitInfo = await checkPromptLimit(user.id);
          setPromptLimit(limitInfo);
          
          // If user has no prompts left, show the limit dialog
          if (!limitInfo.canUsePrompt) {
            setShowLimitDialog(true);
          }
        } catch (error) {
          // Silently handle initial load errors
          console.error('Error checking prompt limit:', error);
        }
      }
    };

    checkLimit();
  }, [user]);

  // Add effect to monitor for last prompt used
  useEffect(() => {
    // If user just used their last prompt, show a thank you toast
    if (promptLimit.remainingPrompts === 0 && promptLimit.totalUsed === 3) {
      toast("Daily limit reached!", {
        description: "Thank you for using NunoReverse! Come back tomorrow for fresh prompts.",
        duration: 6000,
        icon: <Clock className="h-5 w-5 text-purple-600" />
      });
      
      // After a small delay, show the feedback dialog
      setTimeout(() => {
        setShowLimitDialog(true);
      }, 2000);
    }
  }, [promptLimit.remainingPrompts, promptLimit.totalUsed]);

  const resetAtTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return format(tomorrow, 'h:mm a');
  };

  const submitFeedback = () => {
    // In a real app, you would send this feedback to your backend
    console.log("User feedback:", feedback);
    setFeedback('');
    setShowLimitDialog(false);
    
    // Show a thank you toast
    toast("Thank you for your feedback!", {
      description: "We appreciate your input and will use it to improve our service.",
      duration: 5000,
    });
  };
  
  const analyzeAndTransform = async () => {
    if (!inputThought.trim()) {
      setError('Please enter a thought to analyze.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      // Check if user can use prompt
      if (user) {
        const limitInfo = await checkPromptLimit(user.id);
        setPromptLimit(limitInfo);
        
        if (!limitInfo.canUsePrompt) {
          setIsAnalyzing(false);
          setShowLimitDialog(true);
          return;
        }
        
        // Notify user if they're about to use their last prompt
        if (limitInfo.remainingPrompts === 1) {
          toast("Last prompt for today!", {
            description: "This is your last prompt for today. Make it count!",
            duration: 4000,
            icon: <AlertCircle className="h-5 w-5 text-amber-500" />
          });
        }
      }

      const result = await analyzeThought(inputThought);
      setAnalysis(result);
      
      // Increment usage count after successful analysis
      if (user) {
        await incrementPromptUsage(user.id);
        // Update the limit info
        const updatedLimitInfo = await checkPromptLimit(user.id);
        setPromptLimit(updatedLimitInfo);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to analyze thought.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = () => {
    if (!analysis) return;
    
    const textToCopy = `${analysis.reversal}\n\n${analysis.explanation}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gradient">Thought Reverser</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px] text-sm">
            Enter a thought or belief you'd like to see from a different angle. The AI will analyze it and provide an alternative perspective.
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Prompt usage indicator */}
      {user && (
        <div className="mb-4 px-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-purple-500" />
              <span>Daily prompts remaining: </span>
              <span className={`ml-1 font-medium ${promptLimit.remainingPrompts === 0 ? 'text-red-500' : 'text-purple-600'}`}>
                {promptLimit.remainingPrompts} of 3
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6 sm:mb-8 px-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-thought" className="text-sm sm:text-base">Enter your thought:</Label>
        </div>
        <div className="mt-2">
          <textarea
            id="input-thought"
            className="w-full p-4 min-h-[120px] sm:min-h-[150px] text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={inputThought}
            onChange={(e) => setInputThought(e.target.value)}
            placeholder="Enter a thought, belief, or perspective you'd like to transform..."
            disabled={isAnalyzing}
          />
        </div>
      </div>

      <div className="px-2 mb-4">
        <Button 
          onClick={analyzeAndTransform} 
          disabled={isAnalyzing || !inputThought.trim() || !promptLimit.canUsePrompt}
          className="w-full gradient-bg text-white hover:opacity-90 py-6 text-lg relative"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" /> Transform Perspective
            </>
          )}
        </Button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {analysis && (
        <div className="p-6 mt-6 rounded-xl glass-card bg-gradient-to-br from-purple-100/50 to-pink-100/50 backdrop-blur-sm border border-purple-200/50">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-700 mb-3">Alternative Perspective</h3>
            <p className="text-gray-800 text-lg">{analysis.reversal}</p>
          </div>
          
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Why This Helps</h3>
            <p className="text-gray-700">{analysis.explanation}</p>
          </div>
          
          {analysis.pattern && (
            <div className="mt-5 pt-4 border-t border-purple-200/50">
              <h3 className="text-md font-semibold text-purple-700 mb-2">Pattern Identified</h3>
              <p className="text-gray-700 text-sm">{analysis.pattern}</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={copyToClipboard}
              className="text-purple-600"
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
        </div>
      )}
      
      {/* Limit Reached Dialog */}
      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white border-purple-200 overflow-hidden">
          {/* Confetti-like decoration at the top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400"></div>
          
          <DialogHeader className="pt-6">
            <DialogTitle className="text-xl text-center flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Daily Limit Reached
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              You've used all your 3 daily transformations.
              <br />Your prompts will reset at midnight ({resetAtTime()}).
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-5 my-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100/50 shadow-inner">
            <h4 className="font-medium text-purple-700 mb-2 flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2 text-purple-600" /> 
              We'd love your feedback
            </h4>
            <Textarea
              placeholder="What did you think of our Thought Reverser? Any suggestions?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none h-24 mt-1"
            />
          </div>
          
          <div className="text-center text-sm text-gray-500 my-1">
            <p>Thank you for using NunoReverse Beta!</p>
            <p className="text-purple-600 font-medium">Come back tomorrow for more transformations.</p>
          </div>
          
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowLimitDialog(false)}
              className="flex-1 sm:flex-none"
            >
              Close
            </Button>
            <Button 
              type="submit" 
              onClick={submitFeedback}
              disabled={!feedback.trim()}
              className="flex-1 sm:flex-none gradient-bg text-white hover:opacity-90"
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThoughtReverser;
