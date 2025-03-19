
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Examples from '@/components/Examples';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Ensure smooth scrolling
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom cursor for desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
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
