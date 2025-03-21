
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 fixed top-0 z-[100] bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center relative z-[101]">
          <h1 className="text-2xl font-bold text-gradient">NunoReverse</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative z-[101]">
          <Link to="/" className="text-gray-700 hover:text-nuno-purple font-medium transition-colors duration-200">
            Home
          </Link>
          <Link to="/text-reverser" className="text-gray-700 hover:text-nuno-purple font-medium transition-colors duration-200">
            Text Reverser
          </Link>
          <Link to="/image-reverser" className="text-gray-700 hover:text-nuno-purple font-medium transition-colors duration-200">
            Image Reverser
          </Link>
          <Link to="/thought-reverser" className="text-gray-700 hover:text-nuno-purple font-medium transition-colors duration-200">
            Thought Reverser
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-nuno-purple font-medium transition-colors duration-200">
            About
          </Link>
          <Button className="enhanced-gradient text-white hover:opacity-90 shadow-md" asChild>
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
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-[90] pt-20 px-6 animate-fade-in overflow-auto">
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-lg text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/text-reverser" 
              className="text-lg text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Text Reverser
            </Link>
            <Link 
              to="/image-reverser" 
              className="text-lg text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Image Reverser
            </Link>
            <Link 
              to="/thought-reverser" 
              className="text-lg text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Thought Reverser
            </Link>
            <Link 
              to="/about" 
              className="text-lg text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
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
