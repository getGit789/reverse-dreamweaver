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

const BUBBLES = generateBubbles(15);

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
    <section className="w-full min-h-[100vh] flex flex-col justify-start pt-12 sm:pt-16 md:pt-36 pb-8 md:pb-24 px-4 md:px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-50 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 65%, rgba(33, 150, 243, 0.4) 0%, transparent 40%)'
          }}
        ></div>
        
        {/* Animated bubbles for mobile */}
        <div className="block sm:hidden fixed inset-0 overflow-hidden pointer-events-none">
          {BUBBLES.map((bubble, i) => (
            <FloatingBubble
              key={i}
              size={bubble.size}
              left={bubble.left}
              top={bubble.top}
              delay={bubble.delay}
              duration={bubble.duration}
            />
          ))}
        </div>
        
        {/* Animated orbs - for desktop */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="animate-pulse rounded-full bg-purple-400/10 hidden sm:block"
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDuration: `${Math.random() * 8 + 4}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>
      
      <div className="flex-1 max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        {/* Main content wrapper */}
        <div className="flex flex-col items-center justify-center flex-1 w-full mt-4 sm:mt-8 md:mt-0">
          {/* Animated headline */}
          <div className="relative min-h-[5.5rem] sm:min-h-[4.5rem] md:min-h-[7rem] mb-4 sm:mb-6 md:mb-8 w-full overflow-hidden">
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
                <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 leading-tight md:leading-normal whitespace-pre-line">
                  {text}
                </span>
              </h1>
            ))}
          </div>
          
          {/* Subtitle */}
          <p className={`text-lg sm:text-lg md:text-xl text-gray-700 max-w-2xl mb-4 sm:mb-8 md:mb-12 transition-all duration-1000 px-4 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Flip text, mirror images, and see your thoughts from a different angle. 
            <span className="text-purple-600 font-medium"> Discover new insights with NunoReverse.</span>
          </p>
        </div>

        {/* Bottom section with CTA and stats */}
        <div className="w-full flex flex-col items-center space-y-4 md:space-y-12 -mt-8 sm:mt-0">
          {/* CTA button */}
          <div className={`flex flex-col items-center sm:flex-row gap-4 transition-all duration-1000 delay-300 w-full sm:w-auto px-4 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <Button 
              className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-7 text-base sm:text-base md:text-lg group relative overflow-hidden shadow-lg enhanced-gradient hover-lift w-full sm:w-auto"
              asChild
            >
              <Link to="/text-reverser" className="flex items-center justify-center">
                <span className="relative z-10">Try Text Reverser</span>
                <ArrowRight size={16} className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" />
                <div className="absolute top-0 left-0 w-20 h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:translate-x-[250%] transition-all duration-700"></div>
              </Link>
            </Button>
          </div>
          
          {/* Stats or trust indicators */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-3xl w-full transition-all duration-1000 delay-500 px-4 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            {[
              { number: "10K+", label: "Texts Reversed" },
              { number: "4.9", label: "User Rating" },
              { number: "100%", label: "Creative Boost", className: "col-span-2 sm:col-span-1 max-w-[12rem] sm:max-w-none mx-auto" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`text-center hover-lift bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-4 ${stat.className || ''}`}
              >
                <div className="font-bold text-2xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 -z-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="rgb(248 250 252)" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,149.3C384,149,480,203,576,218.7C672,235,768,213,864,186.7C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
