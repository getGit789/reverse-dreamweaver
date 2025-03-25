import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

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
    "Reverse Your\nPerspective",
    "Transform Your Vision",
    "Reimagine Everything"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % textOptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center pt-16 sm:pt-20 lg:pt-24 pb-8 lg:pb-16 px-4 lg:px-6 relative overflow-hidden">
      {/* Optimized gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/80 to-indigo-50/80 -z-10" />
      
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
      
      <div className="flex-1 max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        {/* Main content wrapper - Improved mobile spacing */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Mobile animated headline */}
          <div className="relative min-h-[7rem] mb-6 w-full overflow-hidden lg:hidden">
            {textOptions.map((text, index) => (
              <h1 
                key={index}
                className={`absolute w-full transition-all duration-500 ease-in-out transform px-4 ${
                  activeText === index 
                    ? 'translate-y-0 opacity-100' 
                    : index < activeText 
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                }`}
              >
                <span className="text-4xl sm:text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 leading-[1.15] whitespace-pre-line">
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
                className={`absolute w-full transition-all duration-500 ease-in-out transform px-4 ${
                  activeText === index 
                    ? 'translate-y-0 opacity-100' 
                    : index < activeText 
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                }`}
              >
                <span className="text-7xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 leading-[1.2] whitespace-pre-line">
                  {text}
                </span>
              </h1>
            ))}
          </div>
          
          {/* Optimized subtitle */}
          <p className={`text-xl sm:text-2xl text-gray-700 max-w-2xl mb-10 sm:mb-12 transition-all duration-700 px-4 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Flip text, mirror images, and see your thoughts from a different angle. 
            <span className="text-purple-600 font-medium"> Discover new insights with NunoReverse.</span>
          </p>
        </div>

        {/* Optimized bottom section with CTA */}
        <div className="w-full flex flex-col items-center space-y-8 sm:space-y-12">
          {/* Improved CTA positioning */}
          <div className={`flex flex-col items-center sm:flex-row gap-4 transition-all duration-700 delay-200 w-full sm:w-auto px-4 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <Button 
              className="px-8 py-6 lg:py-7 text-lg sm:text-xl group relative overflow-hidden shadow-lg enhanced-gradient hover-lift w-full sm:w-auto"
              asChild
            >
              <Link to="/text-reverser" className="flex items-center justify-center">
                <span className="relative z-10">Try Text Reverser</span>
                <ArrowRight size={20} className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Optimized stats grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl w-full transition-all duration-700 delay-300 px-4 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {[
              { number: "10K+", label: "Texts Reversed" },
              { number: "4.9", label: "User Rating" },
              { number: "100%", label: "Creative Boost", className: "col-span-2 sm:col-span-1 max-w-[12rem] sm:max-w-none mx-auto" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`text-center hover-lift bg-white/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 ${stat.className || ''}`}
              >
                <div className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
