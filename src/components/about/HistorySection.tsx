
const HistorySection = () => {
  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 relative h-80 fade-in-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl"></div>
            <div className="absolute top-10 left-10 right-10 bottom-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-xl transform rotate-3 transition-transform hover:rotate-0 duration-500"></div>
            <div className="absolute top-5 left-5 right-5 bottom-5 bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">2023</div>
                <p className="text-lg text-gray-700">Year NunoReverse was founded</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 fade-in-on-scroll stagger-delay-1">
            <h2 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              NunoReverse began as a simple tool for reversing text to help with creative writing exercises. What started as a passion project quickly evolved into a suite of perspective-shifting tools.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our founder, Alex, discovered the power of reversed perspectives while working on a design challenge. By flipping images and text, new patterns emerged that led to breakthrough solutions.
            </p>
            <p className="text-lg text-gray-700">
              Today, we're dedicated to helping people around the world discover new insights through the simple act of reversal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
