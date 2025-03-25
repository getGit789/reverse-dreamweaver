
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, RotateCw, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Showcase = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  
  const examples = [
    { original: "Hello World", reversed: "dlroW olleH" },
    { original: "Forward Thinking", reversed: "gniknihT drawroF" },
    { original: "New Perspective", reversed: "evitcepsreP weN" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [examples.length]);

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="absolute inset-0 -z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-on-scroll">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 backdrop-blur-sm mb-4">
            <h2 className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">DISCOVER THE MAGIC</h2>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">See Your World in Reverse</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our interactive tools help you break through creative blocks and gain new insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left side benefits */}
          <div className="col-span-1 lg:col-span-2 space-y-8 fade-in-on-scroll slide-in-from-left">
            <div className="space-y-6">
              {[
                {
                  title: "Enhance Creativity",
                  description: "See your ideas from an entirely new angle",
                  icon: <Sparkles className="h-8 w-8 text-purple-500" />
                },
                {
                  title: "Break Mental Blocks",
                  description: "Overcome creative roadblocks with fresh perspectives",
                  icon: <RotateCw className="h-8 w-8 text-indigo-500" />
                },
                {
                  title: "Instant Results",
                  description: "Transform your content in real-time with zero delay",
                  icon: <Zap className="h-8 w-8 text-blue-500" />
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 feature-card-hover p-4 rounded-xl">
                  <div className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full py-6 enhanced-gradient group"
              asChild
            >
              <Link to="/text-reverser" className="flex items-center justify-center space-x-2">
                <span>Start Reversing Now</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Interactive demo (right side) */}
          <div 
            className="col-span-1 lg:col-span-3 perspective-1000 fade-in-on-scroll slide-in-from-right"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-xl border border-purple-100 bg-white animate-float"
              style={{
                transform: isHovered ? 'rotateY(5deg) rotateX(2deg)' : 'rotateY(0deg) rotateX(0deg)',
                transition: 'transform 0.5s ease'
              }}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm font-medium">Text Reverser</div>
                <div></div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Input Text</label>
                  <div className="relative">
                    <div className="h-24 p-3 bg-gray-50 rounded-lg border border-gray-200 w-full text-left">
                      {examples[currentExample].original}
                    </div>
                    <div 
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center"
                      style={{
                        animation: isHovered ? 'pulse 2s infinite' : 'none'
                      }}
                    >
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Reversed Result</label>
                  <div className="h-24 p-3 bg-purple-50 rounded-lg border border-purple-200 w-full text-left">
                    {examples[currentExample].reversed}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Reverse", className: "bg-purple-600 text-white" },
                    { label: "Mirror", className: "bg-indigo-600 text-white" },
                    { label: "Scramble", className: "border border-gray-200 text-gray-700" }
                  ].map((button, i) => (
                    <button 
                      key={i}
                      className={`py-2 px-4 rounded-lg font-medium ${button.className} hover:opacity-90 transition-opacity`}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-3xl"></div>
            </div>
            
            <div className="mt-8 text-center">
              <Card className="bg-white/80 backdrop-blur-sm inline-block text-center p-2 rounded-xl shadow-md border border-purple-100">
                <CardContent className="p-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-purple-600">Pro tip:</span> Try reversing your favorite quotes to uncover hidden meanings
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
