
import { ArrowRight, FileText, Image, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Text Reverser",
      description: "Flip your text backward, reverse words, or scramble sentences for a new perspective.",
      link: "/text-reverser",
      color: "from-nuno-purple to-nuno-blue"
    },
    {
      icon: <Image className="h-10 w-10 text-white" />,
      title: "Image Reverser",
      description: "Mirror your images horizontally or vertically. Create symmetric and reversed versions.",
      link: "/image-reverser",
      color: "from-blue-500 to-green-400"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      title: "Thought Reverser",
      description: "Challenge your thinking by seeing concepts from opposite perspectives.",
      link: "/thought-reverser",
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <section className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Reversal Tools</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our suite of reversal tools designed to help you see things differently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`p-6 bg-gradient-to-r ${feature.color}`}>
                <div className="rounded-full bg-white/20 w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="inline-flex items-center text-nuno-purple hover:underline font-medium"
                >
                  Try it now <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
