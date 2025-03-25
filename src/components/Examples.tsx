import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Examples = () => {
  return (
    <section className="w-full py-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 -z-10" 
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(33, 150, 243, 0.2) 0%, transparent 50%)'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in-on-scroll">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 backdrop-blur-sm mb-4">
            <h2 className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">SEE IT IN ACTION</h2>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Examples of Our Tools</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our reversal tools can transform your text, images, and thoughts.
          </p>
        </div>
        
        <div className="rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden fade-in-on-scroll stagger-delay-1">
          <Tabs defaultValue="text" className="w-full">
            <div className="px-2 sm:px-6 pt-4 border-b">
              <TabsList className="h-14 w-full grid grid-cols-3 gap-1">
                <TabsTrigger 
                  value="text" 
                  className="text-sm sm:text-base rounded-lg data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 px-2 sm:px-4"
                >
                  Text
                  <span className="hidden sm:inline"> Examples</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="image" 
                  className="text-sm sm:text-base rounded-lg data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 sm:px-4"
                >
                  Image
                  <span className="hidden sm:inline"> Examples</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="thought" 
                  className="text-sm sm:text-base rounded-lg data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700 px-2 sm:px-4"
                >
                  Thought
                  <span className="hidden sm:inline"> Examples</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="text" className="pt-6 pb-8 px-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Reverse Text in Various Ways</h3>
                  <p className="text-gray-600 mb-6">
                    Our Text Reverser tool allows you to flip text in multiple ways:
                  </p>
                  
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-purple-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Character Reversal</p>
                        <p className="text-gray-600">Turn "Hello World" into "dlroW olleH"</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-purple-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Word Reversal</p>
                        <p className="text-gray-600">Turn "Hello World" into "World Hello"</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-purple-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Case Inversion</p>
                        <p className="text-gray-600">Turn "Hello World" into "hELLO wORLD"</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Button variant="gradient" className="mt-2" asChild>
                    <Link to="/text-reverser" className="inline-flex items-center">
                      <span>Try Text Reverser Now</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 shadow-inner">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-2">Original Text:</div>
                      <div className="bg-gray-50 rounded p-3 font-medium">
                        The quick brown fox jumps over the lazy dog.
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Reversed Text:</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Character Reversal</span>
                      </div>
                      <div className="bg-purple-50 rounded p-3 font-medium text-purple-800">
                        .god yzal eht revo spmuj xof nworb kciuq ehT
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 text-center">
                      <p className="text-sm text-gray-500 italic">
                        ✨ See your text from a whole new perspective!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="pt-6 pb-8 px-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Transform Images with Reversal</h3>
                  <p className="text-gray-600 mb-6">
                    Our Image Reverser tool provides multiple ways to transform your images:
                  </p>
                  
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Horizontal Flip</p>
                        <p className="text-gray-600">Mirror your image from left to right</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Vertical Flip</p>
                        <p className="text-gray-600">Mirror your image from top to bottom</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">180° Rotation</p>
                        <p className="text-gray-600">Fully invert your image perspective</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Button variant="gradient" className="mt-2" asChild>
                    <Link to="/image-reverser" className="inline-flex items-center">
                      <span>Try Image Reverser Now</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl p-8 shadow-inner flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1 text-center">Original</div>
                        <div className="bg-gray-50 rounded p-1 aspect-square flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-400 rounded"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="font-mono text-lg font-bold text-white">A</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1 text-center">Horizontal Flip</div>
                        <div className="bg-gray-50 rounded p-1 aspect-square flex items-center justify-center">
                          <div className="relative w-full h-full transform scale-x-[-1]">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-400 rounded"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="font-mono text-lg font-bold text-white">A</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1 text-center">Vertical Flip</div>
                        <div className="bg-gray-50 rounded p-1 aspect-square flex items-center justify-center">
                          <div className="relative w-full h-full transform scale-y-[-1]">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-400 rounded"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="font-mono text-lg font-bold text-white">A</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1 text-center">180° Rotation</div>
                        <div className="bg-gray-50 rounded p-1 aspect-square flex items-center justify-center">
                          <div className="relative w-full h-full transform scale-x-[-1] scale-y-[-1]">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-400 rounded"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="font-mono text-lg font-bold text-white">A</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="thought" className="pt-6 pb-8 px-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Challenge Your Thinking</h3>
                  <p className="text-gray-600 mb-6">
                    The Thought Reverser tool helps you see your ideas from different perspectives:
                  </p>
                  
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <div className="rounded-full bg-pink-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-pink-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Perspective Shifting</p>
                        <p className="text-gray-600">See problems from different viewpoints</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-pink-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-pink-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Challenging Assumptions</p>
                        <p className="text-gray-600">Question what you believe to be true</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-pink-100 p-1 mr-3 mt-1">
                        <div className="rounded-full bg-pink-500 w-2 h-2"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Inverse Thinking</p>
                        <p className="text-gray-600">Consider the opposite of your initial thoughts</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Button variant="gradient" className="mt-2" asChild>
                    <Link to="/thought-reverser" className="inline-flex items-center">
                      <span>Try Thought Reverser Now</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 shadow-inner">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Original Perspective:</span>
                        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Challenge</span>
                      </div>
                      <div className="bg-gray-50 rounded p-3 font-medium">
                        "I can't solve this problem because it's too complex."
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Reversed Perspective:</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Solution</span>
                      </div>
                      <div className="bg-purple-50 rounded p-3 font-medium text-purple-800">
                        "The complexity of this problem gives me an opportunity to learn new approaches and find creative solutions."
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 mt-6 pt-4 text-center">
                      <p className="text-sm text-gray-500 italic">
                        ✨ The way you frame a problem affects how you solve it!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Examples;
