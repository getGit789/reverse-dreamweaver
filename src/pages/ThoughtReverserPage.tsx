import Navbar from '@/components/Navbar';
import ThoughtReverser from '@/components/ThoughtReverser';

const ThoughtReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow pt-20 px-6 flex items-start justify-center">
        <div className="max-w-3xl mx-auto">
          <div className="p-[1px] bg-gradient-to-r from-pink-100 via-pink-300 to-pink-100 rounded-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
              <div className="p-10">
                <ThoughtReverser />
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Transform your thoughts and ideas with our AI-powered perspective shifter.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThoughtReverserPage;
