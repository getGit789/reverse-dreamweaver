
import Navbar from '@/components/Navbar';
import ImageReverser from '@/components/ImageReverser';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const ImageReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Image Reverser Tool</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mirror or flip your images to see them from a new perspective.
            </p>
          </div>
          <ImageReverser />
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default ImageReverserPage;
