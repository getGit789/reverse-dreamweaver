import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RotateCw, RefreshCw, ArrowDownUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TextExample = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [text, setText] = useState("Hello World");
  
  const reverseText = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setText(text.split('').reverse().join(''));
    }, 400);
  };
  
  const resetText = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setText("Hello World");
    }, 400);
  };
  
  return (
    <div className="border rounded-xl p-6 bg-white shadow-md hover-lift">
      <h3 className="text-xl font-bold mb-6 text-center">Text Reverser</h3>
      
      <div className="perspective mb-8 h-24">
        <div className={`flip-card w-full h-full text-center flex items-center justify-center ${isFlipped ? 'flip-card-flipped' : ''}`}>
          <div className="flip-card-front absolute w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold rounded-lg">
            {!isFlipped && text}
          </div>
          <div className="flip-card-back absolute w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold rounded-lg">
            {isFlipped && text}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        {!isFlipped ? (
          <Button onClick={reverseText} className="bg-nuno-purple hover:bg-nuno-purple/90">
            <RotateCw className="mr-2 h-4 w-4" /> Reverse Text
          </Button>
        ) : (
          <Button onClick={resetText} variant="outline" className="border-nuno-purple text-nuno-purple hover:bg-nuno-purple/10">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        )}
      </div>
    </div>
  );
};

const ImageExample = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="border rounded-xl p-6 bg-white shadow-md hover-lift">
      <h3 className="text-xl font-bold mb-6 text-center">Image Reverser</h3>
      
      <div className="perspective mb-8 h-48">
        <div className={`flip-card w-full h-full ${isFlipped ? 'flip-card-flipped' : ''}`}>
          <div className="flip-card-front absolute w-full h-full rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Original" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flip-card-back absolute w-full h-full rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Reversed" 
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setIsFlipped(!isFlipped)}
          className={isFlipped ? "border-nuno-purple text-nuno-purple hover:bg-nuno-purple/10" : "bg-nuno-purple hover:bg-nuno-purple/90"}
          variant={isFlipped ? "outline" : "default"}
        >
          <ArrowDownUp className="mr-2 h-4 w-4" /> 
          {isFlipped ? "View Original" : "Mirror Image"}
        </Button>
      </div>
    </div>
  );
};

const ThoughtExample = () => {
  const thoughts = [
    {
      original: "I'll never be good enough.",
      reversed: "I don't need to be perfect to be worthy. I can grow and improve at my own pace."
    },
    {
      original: "Everything always goes wrong for me.",
      reversed: "Some things go well and others don't. I can notice the positive experiences too."
    },
    {
      original: "I must succeed at everything I do.",
      reversed: "It's okay to try things and not succeed. That's how learning happens."
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReversed, setShowReversed] = useState(false);
  
  const handleNext = () => {
    setShowReversed(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % thoughts.length);
    }, 300);
  };
  
  return (
    <div className="border rounded-xl p-6 bg-white shadow-md hover-lift">
      <h3 className="text-xl font-bold mb-6 text-center">Thought Reverser</h3>
      
      <div className="mb-8 min-h-[100px]">
        <div className={`transition-opacity duration-300 ${showReversed ? 'opacity-0 h-0' : 'opacity-100'}`}>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">{thoughts[currentIndex].original}</p>
          </div>
        </div>
        
        <div className={`transition-opacity duration-300 ${showReversed ? 'opacity-100' : 'opacity-0 h-0'}`}>
          <div className="p-4 gradient-bg text-white rounded-lg">
            <p>{thoughts[currentIndex].reversed}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        {!showReversed ? (
          <Button 
            onClick={() => setShowReversed(true)}
            className="bg-nuno-purple hover:bg-nuno-purple/90"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Reverse Thought
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            variant="outline" 
            className="border-nuno-purple text-nuno-purple hover:bg-nuno-purple/10"
          >
            <ArrowRight className="mr-2 h-4 w-4" /> Next Example
          </Button>
        )}
      </div>
    </div>
  );
};

const ParallaxSection = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is from the center of the viewport
      const distanceFromCenter = sectionTop - windowHeight / 2;
      
      // Convert to a value between -50 and 50 for parallax effect
      const newOffset = -(distanceFromCenter / windowHeight) * 50;
      setOffset(newOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="relative h-[50vh] flex items-center justify-center overflow-hidden my-16"
    >
      <div 
        className="absolute inset-0 -z-10" 
        style={{
          backgroundImage: 'linear-gradient(135deg, #2A0A4C 0%, #345986 100%)',
          transform: `translateY(${offset * 0.5}px)`
        }}
      ></div>
      
      <div 
        className="absolute inset-0 -z-10 opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 70%)',
          transform: `translateY(${offset * -0.7}px) scale(${1 + Math.abs(offset) * 0.003})`
        }}
      ></div>
      
      <div className="text-center text-white max-w-3xl mx-auto px-8 py-10 z-10 rounded-xl bg-black/20 backdrop-blur-sm">
        <h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
          style={{ transform: `translateY(${offset * -0.2}px)` }}
        >
          Reverse Your Perspective Today
        </h2>
        
        <p 
          className="text-xl opacity-100 mb-8 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          style={{ transform: `translateY(${offset * -0.3}px)` }}
        >
          Unlock new ways of seeing with our suite of reversal tools.
        </p>
        
        <Button 
          className="bg-white text-nuno-purple hover:bg-gray-100 px-8 py-6 text-lg font-bold shadow-lg"
          style={{ transform: `translateY(${offset * -0.5}px)` }}
          asChild
        >
          <Link to="/text-reverser">
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Examples = () => {
  return (
    <section className="w-full py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">See It in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power of perspective through our interactive examples.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="slide-in-from-left stagger-delay-1">
            <TextExample />
          </div>
          <div className="scale-in-on-scroll stagger-delay-2">
            <ImageExample />
          </div>
          <div className="slide-in-from-right stagger-delay-3">
            <ThoughtExample />
          </div>
        </div>
        
        <ParallaxSection />
      </div>
    </section>
  );
};

export default Examples;
