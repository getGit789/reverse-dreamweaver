import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "The text reverser is so fun to use! I love how it helps me come up with creative captions for my social media posts. Sometimes reversing text gives me totally unexpected ideas! 😊",
    author: "Isabella Rodriguez",
    role: "Social Media Manager",
    avatar: "/images/testimonials/isabella.jpg",
    stars: 5
  },
  {
    id: 2,
    text: "As a graphic designer, the image mirror tool is a game-changer for my creative process. It helps me spot asymmetry in my designs and creates interesting perspectives I wouldn't have thought of.",
    author: "Amara Thompson",
    role: "Graphic Designer",
    avatar: "/images/testimonials/amara.jpg",
    stars: 5
  },
  {
    id: 3,
    text: "Pretty handy tool for brainstorming sessions. The thought reverser helps me look at problems from different angles. Not revolutionary, but definitely useful for creative blocks.",
    author: "Michael Bennett",
    role: "Content Strategist",
    avatar: "/images/testimonials/michael.jpg",
    stars: 4.5
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i + 1 <= rating) {
          // Full star
          return <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />;
        } else if (i + 0.5 === rating) {
          // Half star
          return (
            <div key={i} className="relative">
              <Star className="h-5 w-5 text-yellow-400" />
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        } else {
          // Empty star
          return <Star key={i} className="h-5 w-5 text-yellow-400" />;
        }
      })}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in-on-scroll">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from creative professionals using NunoReverse.
          </p>
        </div>

        <div className="relative fade-in-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card 
                key={testimonial.id} 
                className={`shadow-md hover-lift scale-in-on-scroll stagger-delay-${idx + 1}`}
              >
                <CardContent className="p-6">
                  <StarRating rating={testimonial.stars} />
                  <p className="text-gray-700 my-6 min-h-[80px]">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-purple-100">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
