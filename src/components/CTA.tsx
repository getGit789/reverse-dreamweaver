
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useSignIn } from '@clerk/clerk-react';

const CTA = () => {
  const { signIn } = useSignIn();
  
  const handleAuthClick = () => {
    signIn?.redirectToSignIn();
  };

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 40%), radial-gradient(circle at 70% 65%, rgba(255, 192, 203, 0.4) 0%, transparent 40%)'
          }}
        ></div>
        
        {/* Floating orbs */}
        {Array.from({ length: 10 }).map((_, i) => (
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
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block p-1 rounded-full bg-white/20 backdrop-blur-sm mb-6">
          <div className="px-6 py-1 rounded-full bg-white/20">
            <Sparkles className="inline-block h-4 w-4 text-white mr-2" />
            <span className="text-white text-sm font-medium">Ready to transform?</span>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 fade-in-on-scroll">
          Reverse Your Perspective Today
        </h2>
        
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 fade-in-on-scroll stagger-delay-1">
          Unlock new ways of seeing with our suite of powerful reversal tools.
        </p>
        
        <div className="flex justify-center fade-in-on-scroll stagger-delay-2">
          {/* Show different buttons based on authentication state */}
          <SignedIn>
            <Button 
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-7 text-lg shadow-xl group"
              asChild
            >
              <Link to="/text-reverser" className="flex items-center">
                Get Started 
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </SignedIn>
          
          <SignedOut>
            <Button 
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-7 text-lg shadow-xl group"
              onClick={handleAuthClick}
            >
              <span className="flex items-center">
                Sign In to Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </SignedOut>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl border border-white/20 shadow-lg">
            <p className="text-white/90 italic">
              "Using NunoReverse completely changed how I approach creative problems. 
              Seeing my ideas in reverse unlocked solutions I never would have found otherwise."
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-white/20 mr-3"></div>
              <div className="text-left">
                <div className="text-white font-medium">Sarah Johnson</div>
                <div className="text-white/70 text-sm">Creative Director</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
