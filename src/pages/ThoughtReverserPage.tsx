import Navbar from '@/components/Navbar';
import ThoughtReverser from '@/components/ThoughtReverser';
import { Sparkles } from 'lucide-react';

const ThoughtReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <div className="p-[1px] bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-2xl sm:rounded-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg">
              <div className="p-4 sm:p-8 md:p-10">
                <ThoughtReverser />
              </div>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-10 space-y-4">
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Turn your thoughts around and gain new perspectives on your ideas.
            </p>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center shadow-sm">
                <Sparkles className="w-6 h-6 text-pink-600/70" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThoughtReverserPage;
