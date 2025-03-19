
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="w-full pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block p-3 bg-gray-100 rounded-full mb-6 fade-in-on-scroll">
          <RefreshCcw size={24} className="text-nuno-purple" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 fade-in-on-scroll stagger-delay-1" style={{ animationDelay: '0.1s' }}>
          <span className="text-gradient">Reverse Your Perspective</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10 fade-in-on-scroll stagger-delay-2" style={{ animationDelay: '0.2s' }}>
          Flip text, mirror images, and see your thoughts from a different angle. 
          Discover new insights with NunoReverse.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 fade-in-on-scroll stagger-delay-3" style={{ animationDelay: '0.3s' }}>
          <Button className="gradient-bg text-white hover:opacity-90 px-6 py-6 hover-lift" asChild>
            <Link to="/text-reverser">
              Try Text Reverser <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button variant="outline" className="border-nuno-purple text-nuno-purple hover:bg-nuno-purple/10 px-6 py-6 hover-lift" asChild>
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
