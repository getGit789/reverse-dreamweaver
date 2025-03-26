import { useState, useEffect, useRef } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openUserProfile } = useClerk();
  const userButtonRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleAccountClick = () => {
    // Close the menu first
    setIsMenuOpen(false);
    // Use a short timeout to ensure the menu is closed before opening the profile
    setTimeout(() => {
      openUserProfile();
    }, 100);
  };

  return (
    <>
      <header className={`w-full py-4 px-6 md:px-12 fixed top-0 z-[100] transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center relative z-[101] min-w-0 md:min-w-[200px]">
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                N
              </div>
              {/* Desktop: NunoReverse text + Beta */}
              <div className="hidden md:flex items-center">
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-gradient bg-gradient-to-r from-purple-600 to-indigo-600'
                }`}>
                  NunoReverse
                  <span className="inline-flex items-center justify-center ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
                    BETA
                  </span>
                </h1>
              </div>
            </div>
          </Link>

          {/* Mobile: Centered Beta Label */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
              BETA
            </span>
          </div>

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
            className="md:hidden text-gray-700 relative z-[101] p-2 hover:bg-gray-100 rounded-full" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl z-[99] max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4 p-6">
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
                  onClick={toggleMenu}
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
                  <div className="flex items-center">
                    <div className="relative">
                      <UserButton 
                        afterSignOutUrl="/" 
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-10 h-10",
                            userButtonTrigger: "cursor-pointer"
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={handleAccountClick}
                      className="flex items-center space-x-3 flex-1 hover:bg-gray-50 p-2 rounded-md transition-colors w-full text-left ml-3"
                    >
                      <span className="text-gray-700 font-medium">My Account</span>
                    </button>
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
