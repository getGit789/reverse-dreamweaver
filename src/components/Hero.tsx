
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeText, setActiveText] = useState(0);
  const textOptions = [
    "Reverse Your Perspective",
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
    <section className="w-full pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 opacity-10 -z-10"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 65%, rgba(33, 150, 243, 0.4) 0%, transparent 40%)'
          }}
        ></div>
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="animate-pulse rounded-full bg-nuno-purple/10"
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
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="relative inline-block p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 shadow-xl border border-white/20">
          <Zap size={24} className="text-nuno-purple animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-500 animate-ping"></span>
        </div>
        
        <div className="relative h-24 md:h-32 mb-6 w-full overflow-hidden">
          {textOptions.map((text, index) => (
            <h1 
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-extrabold transition-all duration-700 ease-in-out ${
                activeText === index 
                  ? 'opacity-100 transform-none' 
                  : 'opacity-0 translate-y-16'
              }`}
            >
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400">
                {text}
              </span>
            </h1>
          ))}
        </div>
        
        <p className={`text-xl text-gray-700 max-w-2xl mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          Flip text, mirror images, and see your thoughts from a different angle. 
          <span className="text-nuno-purple font-medium"> Discover new insights with NunoReverse.</span>
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 px-6 py-6 group hover-lift relative overflow-hidden shadow-lg"
            asChild
          >
            <Link to="/text-reverser" className="flex items-center">
              <span className="relative z-10">Try Text Reverser</span>
              <ArrowRight size={16} className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/20 rotate-45 transform -translate-x-32 -translate-y-8 group-hover:translate-x-64 group-hover:translate-y-8 transition-all duration-700"></div>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-purple-400 text-purple-700 hover:bg-purple-50 px-6 py-6 hover-lift backdrop-blur-sm relative overflow-hidden group"
            asChild
          >
            <Link to="/about" className="flex items-center">
              <span className="relative z-10">Learn More</span>
              <Sparkles size={16} className="ml-2 text-purple-500 animate-pulse relative z-10" />
              <div className="absolute inset-0 bg-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
