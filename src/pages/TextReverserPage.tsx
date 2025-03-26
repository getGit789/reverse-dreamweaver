import Navbar from '@/components/Navbar';
import TextReverser from '@/components/TextReverser';
import { Type } from 'lucide-react';

const TextReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <div className="p-[1px] bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 rounded-2xl sm:rounded-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg">
              <div className="p-4 sm:p-8 md:p-10">
                <TextReverser />
              </div>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-10 space-y-4">
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Flip your text backward, reverse words, or scramble sentences for a new perspective.
            </p>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shadow-sm">
                <Type className="w-6 h-6 text-purple-600/70" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextReverserPage;
