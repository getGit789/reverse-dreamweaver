
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`w-full py-4 px-6 md:px-12 fixed top-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center relative z-[101]">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-gradient bg-gradient-to-r from-purple-600 to-indigo-600'
            }`}>
              NunoReverse
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative z-[101]">
          {[
            { path: '/', label: 'Home' },
            { path: '/text-reverser', label: 'Text Reverser' },
            { path: '/image-reverser', label: 'Image Reverser' },
            { path: '/thought-reverser', label: 'Thought Reverser' }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`font-medium transition-colors duration-200 relative ${
                isActive(item.path) 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full"></span>
              )}
            </Link>
          ))}
          
          <Button className="enhanced-gradient shadow-md hover-lift" asChild>
            <Link to="/text-reverser">
              Try Now
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 relative z-[101] p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-lg z-[90] pt-20 px-6 animate-fade-in overflow-auto">
          <nav className="flex flex-col space-y-6">
            {[
              { path: '/', label: 'Home' },
              { path: '/text-reverser', label: 'Text Reverser' },
              { path: '/image-reverser', label: 'Image Reverser' },
              { path: '/thought-reverser', label: 'Thought Reverser' }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`text-lg font-medium ${
                  isActive(item.path) 
                    ? 'text-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <Button className="enhanced-gradient text-white hover:opacity-90 w-full py-6 shadow-md" asChild>
              <Link to="/text-reverser" onClick={() => setIsMenuOpen(false)}>
                Try Now
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
