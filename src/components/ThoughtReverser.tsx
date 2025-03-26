import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lightbulb, Copy, CheckCircle2, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

// Categories of cognitive distortions with their reversals
const thoughtPatterns = {
  catastrophizing: {
    patterns: [
      "worst", "terrible", "disaster", "can't handle", "catastrophe", "nightmare", 
      "end of the world", "horrible", "unbearable", "ruined"
    ],
    reversals: [
      "This is challenging but manageable. I've handled difficult situations before.",
      "While this isn't ideal, I can cope with it step by step.",
      "This feels difficult now, but it's just one moment in a larger journey.",
      "I can handle discomfort and still move forward toward what matters.",
      "This is uncomfortable but not dangerous. I can navigate through this."
    ]
  },
  blackAndWhite: {
    patterns: [
      "always", "never", "everything", "nothing", "everyone", "no one", "completely", 
      "totally", "perfect", "terrible", "impossible"
    ],
    reversals: [
      "There are degrees and nuances to most situations, not just extremes.",
      "Most things exist on a spectrum rather than as absolutes.",
      "There may be aspects of this situation that don't fit a simple category.",
      "I can look for the middle ground where multiple perspectives might be valid.",
      "Life often unfolds in shades of gray, not just black and white."
    ]
  },
  shouldStatements: {
    patterns: [
      "should", "must", "have to", "ought to", "supposed to", "need to", "required"
    ],
    reversals: [
      "I can choose what works best for me rather than following rigid rules.",
      "It's okay to consider what I want, not just what I think I should do.",
      "I can be flexible with my expectations of myself and others.",
      "There are often many valid approaches, not just one 'right' way.",
      "I can focus on preferences and choices rather than obligations."
    ]
  },
  mindReading: {
    patterns: [
      "thinks", "know they", "they believe", "they're thinking", "assumes", "judging", 
      "sees me as", "opinion of me", "impression"
    ],
    reversals: [
      "I don't actually know what others are thinking unless they tell me directly.",
      "People might have different perspectives than what I'm assuming.",
      "Others may be focused on their own concerns rather than judging me.",
      "I can ask for clarification instead of assuming I know what someone thinks.",
      "Different people can interpret the same situation in entirely different ways."
    ]
  },
  negativeFilter: {
    patterns: [
      "failure", "mistake", "wrong", "bad", "terrible", "awful", "useless", "worthless", 
      "inadequate", "incompetent"
    ],
    reversals: [
      "There are likely positives in this situation that I haven't focused on yet.",
      "I can acknowledge both challenges and successes in a balanced way.",
      "Every experience contains opportunities for learning and growth.",
      "I can choose to focus on what's going well alongside what's challenging.",
      "My attention shapes my experience - I can notice more than just the negatives."
    ]
  },
  "fortuneTelling": {
    patterns: [
      "will fail", "won't work", "going to be", "future", "predict", "know it will", 
      "inevitably", "destined to", "doomed", "hopeless"
    ],
    reversals: [
      "The future is not fixed - many different outcomes are possible.",
      "I can prepare for challenges without assuming the worst will happen.",
      "I've been surprised before by how things turned out differently than expected.",
      "I can stay open to possibilities rather than convincing myself of one outcome.",
      "I can focus on what I can control rather than trying to predict the unpredictable."
    ]
  },
  personalization: {
    patterns: [
      "my fault", "blame", "responsible for", "caused", "should have prevented", 
      "if only I had", "because of me", "my failure"
    ],
    reversals: [
      "Many factors beyond my control contribute to any situation.",
      "Other people make their own choices that I'm not responsible for.",
      "I can acknowledge the broader context rather than taking all responsibility.",
      "I'm just one factor in a complex situation with many influences.",
      "I can focus on my response now rather than blaming myself."
    ]
  }
};

const generateReversalFromPatterns = (thought: string): string => {
  // Convert to lowercase for pattern matching
  const lowerThought = thought.toLowerCase();
  
  // Check each category for matching patterns
  for (const [category, data] of Object.entries(thoughtPatterns)) {
    for (const pattern of data.patterns) {
      if (lowerThought.includes(pattern)) {
        // Return a random reversal from the matching category
        const reversals = data.reversals;
        return reversals[Math.floor(Math.random() * reversals.length)];
      }
    }
  }
  
  // Default reversals if no specific pattern is matched
  const defaultReversals = [
    "Consider viewing this situation from a different perspective.",
    "There may be alternative ways of thinking about this that I haven't considered yet.",
    "How might someone with a different viewpoint see this situation?",
    "This is one interpretation, but other valid perspectives might exist.",
    "I can hold this thought lightly, knowing it's just one way of seeing things."
  ];
  
  return defaultReversals[Math.floor(Math.random() * defaultReversals.length)];
};

const ThoughtReverser = () => {
  const [inputThought, setInputThought] = useState('');
  const [result, setResult] = useState<{ original: string; reversed: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReversedThought = () => {
    if (inputThought.trim() === '') {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate a brief "thinking" delay for better UX
    setTimeout(() => {
      const reversedThought = generateReversalFromPatterns(inputThought);
      setResult({
        original: inputThought,
        reversed: reversedThought,
      });
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(result.reversed);
    setCopied(true);
    
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
          <Textarea
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
        className="w-full gradient-bg text-white hover:opacity-90 relative overflow-hidden"
        disabled={!inputThought.trim() || isGenerating}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center">
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            <span>Generating new perspective...</span>
          </div>
        ) : (
          <span>Reverse My Thought</span>
        )}
      </Button>

      <AnimatePresence mode="wait">
        {result && !isGenerating && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Label className="mb-2 block">Your reversed perspective:</Label>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card className="w-full shadow-md gradient-bg text-white mb-6 overflow-hidden">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <p className="text-lg font-medium">{result.reversed}</p>
                    <motion.div 
                      className="flex items-center mt-4 text-sm text-white/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" /> 
                      <p>Consider how this different view might be true</p>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThoughtReverser;
