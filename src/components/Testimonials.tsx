
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "NunoReverse helped me see my writing from a new angle. The text reverser tool is surprisingly insightful!",
    author: "Alex Morgan",
    role: "Content Creator",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    text: "The image reverser tool is perfect for my design work. It helps me spot asymmetries I wouldn't otherwise notice.",
    author: "Jamie Chen",
    role: "Graphic Designer",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    text: "I use the thought reverser daily to challenge my assumptions. It's been a game-changer for my problem-solving.",
    author: "Sam Taylor",
    role: "Product Manager",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    text: "Simple yet powerful tools that actually make you think differently. Highly recommend for creative professionals.",
    author: "Jordan Reed",
    role: "Photographer",
    avatar: "/placeholder.svg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 3;
  
  const nextSlide = () => {
    setActiveIndex((prev) => 
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonials.length - itemsPerView : prev - 1
    );
  };

  const visibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how NunoReverse is helping people gain new perspectives.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials().map((testimonial) => (
              <Card key={testimonial.id} className="shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <button 
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:block hover:bg-gray-100"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:block hover:bg-gray-100"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-6 space-x-2 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? 'bg-nuno-purple' : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
