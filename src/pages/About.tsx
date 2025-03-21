
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Wand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import AboutHero from '@/components/about/AboutHero';
import MissionSection from '@/components/about/MissionSection';
import TeamSection from '@/components/about/TeamSection';
import HistorySection from '@/components/about/HistorySection';
import ContactSection from '@/components/about/ContactSection';

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
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto pt-24 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home className="h-3.5 w-3.5" /></Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <AboutHero />
        <MissionSection />
        <TeamSection />
        <HistorySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
