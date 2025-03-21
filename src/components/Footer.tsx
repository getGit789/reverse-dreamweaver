
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">NunoReverse</h1>
          </Link>
          <p className="mt-4 text-gray-600 max-w-md">
            Discover new perspectives by reversing your text, images, and thoughts. 
            NunoReverse helps you see the world from a different angle.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Tools</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/text-reverser" className="text-gray-600 hover:text-nuno-purple">
                Text Reverser
              </Link>
            </li>
            <li>
              <Link to="/image-reverser" className="text-gray-600 hover:text-nuno-purple">
                Image Reverser
              </Link>
            </li>
            <li>
              <Link to="/thought-reverser" className="text-gray-600 hover:text-nuno-purple">
                Thought Reverser
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-nuno-purple">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/text-reverser" className="text-gray-600 hover:text-nuno-purple">
                Get Started
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-nuno-purple">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500">
          © {currentYear} NunoReverse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
