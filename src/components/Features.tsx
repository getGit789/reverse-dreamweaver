
import { ArrowRight, FileText, Image, MessageSquare, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
        index === 0 ? 'slide-in-from-left' : 
        index === 2 ? 'slide-in-from-right' : 
        'scale-in-on-scroll'
      } stagger-delay-${index + 1}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`p-6 bg-gradient-to-r ${feature.color} relative overflow-hidden`}
        style={{
          height: isHovered ? '140px' : '120px',
          transition: 'all 0.5s ease'
        }}
      >
        <div className="rounded-full bg-white/20 w-16 h-16 flex items-center justify-center relative z-10">
          {feature.icon}
        </div>
        
        <div className="absolute top-0 right-0 opacity-20">
          <RotateCw 
            size={120} 
            className="text-white transform -translate-y-1/4 translate-x-1/4"
            style={{
              animation: isHovered ? 'spin 10s linear infinite' : 'none'
            }}
          />
        </div>
        
        <div 
          className="absolute bottom-0 left-0 w-full h-1 bg-white/30"
          style={{
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.5s ease'
          }}
        ></div>
      </div>
      
      <div className="p-6 border-t border-gray-100">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
        <p className="text-gray-600 mb-4">{feature.description}</p>
        <Link 
          to={feature.link} 
          className="inline-flex items-center text-nuno-purple hover:text-purple-700 font-medium group transition-colors"
        >
          <span>Try it now</span>
          <ArrowRight 
            size={16} 
            className="ml-1 group-hover:translate-x-1 transition-transform duration-300" 
          />
        </Link>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Text Reverser",
      description: "Flip your text backward, reverse words, or scramble sentences for a new perspective.",
      link: "/text-reverser",
      color: "from-purple-600 to-blue-500"
    },
    {
      icon: <Image className="h-10 w-10 text-white" />,
      title: "Image Reverser",
      description: "Mirror your images horizontally or vertically. Create symmetric and reversed versions.",
      link: "/image-reverser",
      color: "from-blue-500 to-teal-400"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      title: "Thought Reverser",
      description: "Challenge your thinking by seeing concepts from opposite perspectives.",
      link: "/thought-reverser",
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <section className="w-full py-16 px-6 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10"></div>
      <div className="absolute inset-0 opacity-50 -z-10">
        <div className="absolute h-56 w-56 rounded-full bg-purple-200/50 blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute h-64 w-64 rounded-full bg-blue-200/50 blur-3xl bottom-10 right-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-on-scroll">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 backdrop-blur-sm mb-4">
            <h2 className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">OUR TOOLS</h2>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Reversal Tools</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our suite of reversal tools designed to help you see things differently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
      
      {/* NEW: Add interesting showcase section */}
      <div className="max-w-7xl mx-auto mt-24 mb-6">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 relative z-10">
            <div className="fade-in-on-scroll">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                See Your World in Reverse
              </h2>
              
              <p className="text-gray-700 mb-6">
                Our reversal tools help you break through creative blocks and discover hidden patterns in your everyday life.
              </p>
              
              <div className="space-y-4">
                {[
                  "Solve problems from a new angle",
                  "Enhance creative thinking",
                  "Discover hidden patterns",
                  "Break through mental blocks"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/about" 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  Learn our approach
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative perspective-1000 fade-in-on-scroll stagger-delay-1">
              <div className="absolute inset-0 opacity-40 rounded-xl overflow-hidden">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-300 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full blur-xl"></div>
              </div>
              
              <div className="relative animate-float overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                <div className="grid grid-cols-2 gap-4 p-6 bg-white">
                  <div className="col-span-2 text-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Try Reversing Text</h3>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-gray-600 mb-1 text-xs">Original</p>
                    <p className="font-medium text-gray-800">Hello World</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <p className="text-purple-600 mb-1 text-xs">Reversed</p>
                    <p className="font-medium text-gray-800">dlroW olleH</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-gray-600 mb-1 text-xs">Original</p>
                    <p className="font-medium text-gray-800">New Perspective</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <p className="text-purple-600 mb-1 text-xs">Reversed</p>
                    <p className="font-medium text-gray-800">evitcepsreP weN</p>
                  </div>
                  
                  <div className="col-span-2">
                    <Link 
                      to="/text-reverser" 
                      className="w-full py-2 rounded-lg text-center block text-purple-600 border border-purple-200 hover:bg-purple-50 transition-colors"
                    >
                      Try Text Reverser
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
