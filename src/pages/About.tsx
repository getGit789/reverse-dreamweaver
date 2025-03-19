
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomCursor from '@/components/CustomCursor';

const About = () => {
  // Initialize state
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set up effects
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Only enable custom cursor on desktop
    const handleResize = () => {
      setShowCustomCursor(window.innerWidth >= 768);
    };
    
    // Initial check
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Add custom cursor class to body
    if (window.innerWidth >= 768) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    
    // Set loaded state after a short delay for animations
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Only render custom cursor on desktop */}
      {showCustomCursor && <CustomCursor />}
      
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 opacity-10 -z-10"></div>
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
              <Wand size={24} className="text-nuno-purple animate-pulse" />
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

        {/* Mission Section */}
        <section className="w-full py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="fade-in-on-scroll">
                <h2 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  At NunoReverse, we believe that seeing things from a different perspective can lead to breakthrough insights and creative solutions.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Our mission is to provide simple yet powerful tools that help you flip your perspective – whether it's text, images, or even your thoughts.
                </p>
                <p className="text-lg text-gray-700">
                  By reversing what's familiar, we help you discover new patterns, meanings, and possibilities hidden in plain sight.
                </p>
              </div>
              
              <div className="relative perspective-1000 w-full h-80 fade-in-on-scroll stagger-delay-1">
                <div className="absolute inset-0 animate-float">
                  <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-1">
                    <div className="bg-white h-full w-full rounded-lg p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                          <Wand size={48} className="text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Reverse - Reflect - Reimagine</h3>
                        <p className="text-gray-600">Our simple philosophy for seeing the world anew</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-on-scroll">
              <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The creative minds behind NunoReverse's innovative perspective-shifting tools.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Rivera",
                  role: "Founder & Designer",
                  bio: "Alex brings 10+ years of experience in UX design with a passion for creating tools that challenge conventional thinking."
                },
                {
                  name: "Jamie Chen",
                  role: "Lead Developer",
                  bio: "Jamie is a full-stack developer who specializes in creating intuitive, responsive applications with cutting-edge technology."
                },
                {
                  name: "Taylor Morgan",
                  role: "Creative Director",
                  bio: "Taylor oversees the creative vision of NunoReverse, ensuring our tools are not just useful, but inspiring."
                }
              ].map((member, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 fade-in-on-scroll stagger-delay-${index + 1}`}
                >
                  <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-purple-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                    <p className="text-purple-600 mb-4 font-medium">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="w-full py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 relative h-80 fade-in-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl"></div>
                <div className="absolute top-10 left-10 right-10 bottom-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-xl transform rotate-3 transition-transform hover:rotate-0 duration-500"></div>
                <div className="absolute top-5 left-5 right-5 bottom-5 bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">2023</div>
                    <p className="text-lg text-gray-700">Year NunoReverse was founded</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 fade-in-on-scroll stagger-delay-1">
                <h2 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4">
                  NunoReverse began as a simple tool for reversing text to help with creative writing exercises. What started as a passion project quickly evolved into a suite of perspective-shifting tools.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Our founder, Alex, discovered the power of reversed perspectives while working on a design challenge. By flipping images and text, new patterns emerged that led to breakthrough solutions.
                </p>
                <p className="text-lg text-gray-700">
                  Today, we're dedicated to helping people around the world discover new insights through the simple act of reversal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 px-6 gradient-bg">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 fade-in-on-scroll">
              Ready to See Things Differently?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 fade-in-on-scroll stagger-delay-1">
              Explore our suite of reversal tools and discover new perspectives today.
            </p>
            <Button 
              className="bg-white text-nuno-purple hover:bg-gray-100 px-6 py-6 text-lg hover-lift fade-in-on-scroll stagger-delay-2"
              asChild
            >
              <Link to="/">
                Explore Our Tools
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
