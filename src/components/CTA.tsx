
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="w-full py-20 px-6 gradient-bg">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to See Things Differently?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Start reversing your perspective today and discover new insights.
        </p>
        <Button 
          className="bg-white text-nuno-purple hover:bg-gray-100 px-6 py-6 text-lg"
          asChild
        >
          <Link to="/text-reverser">
            Get Started Now <ArrowRight size={18} className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
