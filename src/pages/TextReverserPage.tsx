import Navbar from '@/components/Navbar';
import TextReverser from '@/components/TextReverser';

const TextReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Text Reverser Tool</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Flip your text backward, reverse words, or scramble sentences for a new perspective.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <TextReverser />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextReverserPage;
