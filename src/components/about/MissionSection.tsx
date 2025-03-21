
import { Wand } from 'lucide-react';

const MissionSection = () => {
  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="fade-in-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At NunoReverse, we believe that seeing things from a different perspective can lead to breakthrough insights and creative solutions.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our mission is to provide simple yet powerful tools that help you flip your perspective – whether it's text, images, or even your thoughts.
            </p>
            <p className="text-lg text-gray-700">
              By reversing what's familiar, we help you discover new patterns, meanings, and possibilities hidden in plain sight.
            </p>
          </div>
          
          <div className="relative perspective-1000 w-full h-80 fade-in-on-scroll stagger-delay-1">
            <div className="absolute inset-0 animate-float">
              <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-1">
                <div className="bg-white h-full w-full rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                      <Wand size={48} className="text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Reverse - Reflect - Reimagine</h3>
                    <p className="text-gray-600">Our simple philosophy for seeing the world anew</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
