
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Ready to Get Started?</h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
          Experience the power of reversed perspectives with our innovative tools.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="gradient" className="shadow-lg" asChild>
            <Link to="/text-reverser">Try Text Reverser</Link>
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-700 hover:bg-purple-50" asChild>
            <Link to="/image-reverser">Try Image Reverser</Link>
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-700 hover:bg-purple-50" asChild>
            <Link to="/thought-reverser">Try Thought Reverser</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
