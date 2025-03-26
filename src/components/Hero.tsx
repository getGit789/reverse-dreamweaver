import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FloatingBubble = ({ delay, duration, size, left, top }: { delay: number; duration: number; size: number; left: number; top: number }) => (
  <div
    className="fixed rounded-full bg-purple-400/15 backdrop-blur-sm border border-purple-300/20 animate-float"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform'
    }}
  />
);

// Generate bubbles outside component to prevent regeneration on re-render
const generateBubbles = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    size: Math.random() * 40 + 20, // 20-60px
    left: Math.random() * 90 + 5, // 5-95%
    top: Math.random() * 90 + 5, // 5-95%
    delay: Math.random() * 5, // 0-5s delay
    duration: Math.random() * 4 + 10, // 10-14s duration
  }));
};

const BUBBLES = generateBubbles(8);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeText, setActiveText] = useState(0);
  const textOptions = [
    "Transform Your\nThoughts",
    "Gain New\nPerspectives",
    "Challenge Your\nAssumptions"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % textOptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/90 to-pink-50/90 -z-10" />
      
      {/* Simplified decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)'
          }}
        />
        
        {/* Optimized mobile bubbles */}
        <div className="block lg:hidden fixed inset-0 overflow-hidden pointer-events-none">
          {BUBBLES.map((bubble, i) => (
            <FloatingBubble
              key={i}
              size={bubble.size * 0.8}
              left={bubble.left}
              top={bubble.top}
              delay={bubble.delay}
              duration={bubble.duration}
            />
          ))}
        </div>
        
        {/* Simplified desktop orbs */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i}
            className="animate-pulse rounded-full bg-purple-400/10 hidden lg:block"
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              animationDuration: `${Math.random() * 6 + 4}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="flex-1 max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10 py-16 sm:py-20">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
          {/* AI Badge */}
          <div className="mb-6 sm:mb-8 inline-flex items-center px-4 py-2 rounded-full bg-purple-100/80 backdrop-blur-sm border border-purple-200/50">
            <BrainCircuit className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">AI-Powered Thought Transformation</span>
          </div>

          {/* Mobile animated headline */}
          <div className="relative min-h-[6rem] sm:min-h-[7rem] mb-4 sm:mb-6 w-full overflow-hidden lg:hidden">
            {textOptions.map((text, index) => (
              <h1 
                key={index}
                className={`absolute w-full transition-all duration-500 ease-in-out transform ${
                  activeText === index 
                    ? 'translate-y-0 opacity-100' 
                    : index < activeText 
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 leading-tight sm:leading-[1.15] whitespace-pre-line">
                  {text}
                </span>
              </h1>
            ))}
          </div>

          {/* Desktop animated headline */}
          <div className="relative min-h-[12rem] mb-8 w-full overflow-hidden hidden lg:block">
            {textOptions.map((text, index) => (
              <h1 
                key={index}
                className={`absolute w-full transition-all duration-500 ease-in-out transform ${
                  activeText === index 
                    ? 'translate-y-0 opacity-100' 
                    : index < activeText 
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                }`}
              >
                <span className="text-7xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 leading-[1.2] whitespace-pre-line">
                  {text}
                </span>
              </h1>
            ))}
          </div>
          
          {/* Enhanced subtitle */}
          <p className={`text-lg sm:text-xl text-gray-700 max-w-2xl mb-8 sm:mb-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Experience the power of AI-driven perspective transformation. 
            <span className="text-purple-600 font-medium"> Break free from limiting thoughts and discover new insights.</span>
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mb-8 sm:mb-12">
            {[
              {
                icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />,
                title: "AI-Powered Analysis",
                description: "Advanced AI identifies thought patterns and suggests transformative perspectives"
              },
              {
                icon: <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />,
                title: "Deep Insights",
                description: "Get profound, contextual reversals that challenge your assumptions"
              },
              {
                icon: <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />,
                title: "Instant Transformation",
                description: "Transform your thoughts in seconds with our intelligent system"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover-lift">
                <div className="bg-white/80 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="w-full flex flex-col items-center">
          <div className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-200 w-full sm:w-auto ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <Button 
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg group relative overflow-hidden shadow-lg enhanced-gradient hover-lift"
              asChild
            >
              <Link to="/thought-reverser" className="flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10" />
                <span className="relative z-10">Transform Your Thoughts</span>
                <ArrowRight size={18} className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
