import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

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
        <Link to="/" className="flex items-center relative z-[101] min-w-0 md:min-w-[200px]">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <h1 className={`hidden md:block text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-gradient bg-gradient-to-r from-purple-600 to-indigo-600'
            }`}>
              NunoReverse
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 relative z-[101]">
          {[
            { path: '/', label: 'Home' },
            { path: '/thought-reverser', label: 'Thought Reverser' },
            { path: '/image-reverser', label: 'Image Reverser' },
            { path: '/text-reverser', label: 'Text Reverser' }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`font-medium transition-colors duration-200 relative px-4 ${
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
        </nav>

        {/* Spacer div to balance the logo */}
        <div className="hidden md:block min-w-[200px]"></div>

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
              { path: '/thought-reverser', label: 'Thought Reverser' },
              { path: '/image-reverser', label: 'Image Reverser' },
              { path: '/text-reverser', label: 'Text Reverser' }
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
            <div className="pt-4 border-t border-gray-200">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-3">
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                        userButtonTrigger: "cursor-pointer"
                      }
                    }}
                  />
                  <span className="text-gray-700 font-medium">My Account</span>
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
