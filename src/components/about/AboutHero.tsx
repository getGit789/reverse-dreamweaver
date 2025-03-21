
import { Wand } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="w-full pt-10 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-500/10 -z-10"></div>
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
        <div className="relative inline-block p-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md rounded-full mb-6 shadow-xl border border-white/20">
          <Wand size={24} className="text-nuno-purple" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-500 animate-ping"></span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400">
            About NunoReverse
          </span>
        </h1>
        
        <p className="text-xl text-gray-700 max-w-2xl mb-10 fade-in-on-scroll">
          Discover the story behind NunoReverse and our mission to help you see the world differently.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
