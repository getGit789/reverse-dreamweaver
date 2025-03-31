import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Type, Image, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'Text Reverser',
    description: 'Transform text with various reversal techniques',
    icon: Type,
    path: '/text-reverser',
    color: 'bg-blue-500'
  },
  {
    title: 'Image Reverser',
    description: 'Flip and transform images with ease',
    icon: Image,
    path: '/image-reverser',
    color: 'bg-purple-500'
  },
  {
    title: 'Thought Reverser',
    description: 'Gain new perspectives on your thoughts',
    icon: Brain,
    path: '/thought-reverser',
    color: 'bg-green-500'
  }
];

const ToolSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Tool
          </h1>
          <p className="text-lg text-gray-600">
            Select a tool to start transforming your content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={tool.path} className="block h-full">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {tool.title}
                    </CardTitle>
                    <CardDescription>
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-purple-600 font-medium">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolSelection; 