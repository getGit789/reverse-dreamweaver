import Navbar from '@/components/Navbar';
import TextReverser from '@/components/TextReverser';

const TextReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20 px-4 sm:px-6 flex items-start justify-center">
        <div className="w-full max-w-3xl mx-auto">
          <div className="p-[1px] bg-gradient-to-r from-pink-200 via-blue-200 to-pink-200 rounded-2xl sm:rounded-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg">
              <div className="p-4 sm:p-8 md:p-10">
                <TextReverser />
              </div>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-10">
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Flip your text backward, reverse words, or scramble sentences for a new perspective.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextReverserPage;
