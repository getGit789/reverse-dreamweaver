
import Navbar from '@/components/Navbar';
import TextReverser from '@/components/TextReverser';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const TextReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Text Reverser Tool</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flip your text backward, reverse words, or scramble sentences for a new perspective.
            </p>
          </div>
          <TextReverser />
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default TextReverserPage;
