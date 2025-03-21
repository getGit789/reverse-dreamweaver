
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 65%, rgba(255, 192, 203, 0.4) 0%, transparent 40%)'
          }}
        ></div>
        {/* Floating orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 fade-in-on-scroll text-shadow">
          Reverse Your Perspective Today
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 fade-in-on-scroll stagger-delay-1">
          Unlock new ways of seeing with our suite of reversal tools.
        </p>
        <Button 
          className="bg-white text-pink-600 hover:bg-white/90 px-6 py-6 text-lg glow-effect shadow-xl fade-in-on-scroll stagger-delay-2 group"
          asChild
        >
          <Link to="/text-reverser" className="flex items-center">
            Get Started 
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
