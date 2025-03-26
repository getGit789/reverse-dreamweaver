import Navbar from '@/components/Navbar';
import ImageReverser from '@/components/ImageReverser';

const ImageReverserPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <div className="p-[1px] bg-gradient-to-r from-pink-200 via-blue-200 to-pink-200 rounded-2xl sm:rounded-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg">
              <div className="p-4 sm:p-8 md:p-10">
                <ImageReverser />
              </div>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-10">
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your images with a single click - flip them horizontally or vertically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageReverserPage;
