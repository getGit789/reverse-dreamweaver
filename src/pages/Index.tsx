
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Examples from '@/components/Examples';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // State to track if custom cursor should be shown
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ensure smooth scrolling and setup cursor
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
        <Hero />
        <Features />
        <Examples />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
