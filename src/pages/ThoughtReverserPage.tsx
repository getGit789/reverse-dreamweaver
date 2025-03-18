
import Navbar from '@/components/Navbar';
import ThoughtReverser from '@/components/ThoughtReverser';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const ThoughtReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Thought Reverser Tool</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Challenge your thinking by seeing concepts from opposite perspectives.
            </p>
          </div>
          <ThoughtReverser />
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default ThoughtReverserPage;
