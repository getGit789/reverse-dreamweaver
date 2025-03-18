
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
    <header className="w-full py-4 px-6 md:px-12 fixed top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-gradient">NunoReverse</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-nuno-purple font-medium">
            Home
          </Link>
          <Link to="/text-reverser" className="text-gray-700 hover:text-nuno-purple font-medium">
            Text Reverser
          </Link>
          <Link to="/image-reverser" className="text-gray-700 hover:text-nuno-purple font-medium">
            Image Reverser
          </Link>
          <Link to="/thought-reverser" className="text-gray-700 hover:text-nuno-purple font-medium">
            Thought Reverser
          </Link>
          <Button className="gradient-bg text-white hover:opacity-90">
            Try Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/text-reverser" 
              className="text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Text Reverser
            </Link>
            <Link 
              to="/image-reverser" 
              className="text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Image Reverser
            </Link>
            <Link 
              to="/thought-reverser" 
              className="text-gray-700 hover:text-nuno-purple font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Thought Reverser
            </Link>
            <Button className="gradient-bg text-white hover:opacity-90 w-full">
              Try Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
