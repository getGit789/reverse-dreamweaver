import { ArrowRight, FileText, Image, MessageSquare, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift ${
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
      
      <CardContent className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
        <p className="text-gray-600 mb-4">{feature.description}</p>
        <Link 
          to={feature.link} 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium group transition-colors"
        >
          <span>Try it now</span>
          <ArrowRight 
            size={16} 
            className="ml-1 group-hover:translate-x-1 transition-transform duration-300" 
          />
        </Link>
      </CardContent>
    </Card>
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
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      title: "Thought Reverser",
      description: "Challenge your thinking by seeing concepts from opposite perspectives.",
      link: "/thought-reverser",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: <Image className="h-10 w-10 text-white" />,
      title: "Image Reverser",
      description: "Mirror your images horizontally or vertically. Create symmetric and reversed versions.",
      link: "/image-reverser",
      color: "from-blue-500 to-teal-400"
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-gray-50 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-50 -z-10">
        <div className="absolute h-72 w-72 rounded-full bg-purple-200/50 blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute h-80 w-80 rounded-full bg-blue-200/50 blur-3xl bottom-20 right-20 animate-pulse" style={{animationDelay: '2s'}}></div>
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
    </section>
  );
};

export default Features;
