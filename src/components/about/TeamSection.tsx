
const TeamSection = () => {
  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & Designer",
      bio: "Alex brings 10+ years of experience in UX design with a passion for creating tools that challenge conventional thinking."
    },
    {
      name: "Jamie Chen",
      role: "Lead Developer",
      bio: "Jamie is a full-stack developer who specializes in creating intuitive, responsive applications with cutting-edge technology."
    },
    {
      name: "Taylor Morgan",
      role: "Creative Director",
      bio: "Taylor oversees the creative vision of NunoReverse, ensuring our tools are not just useful, but inspiring."
    }
  ];

  return (
    <section className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-on-scroll">
          <h2 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The creative minds behind NunoReverse's innovative perspective-shifting tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 fade-in-on-scroll stagger-delay-${index + 1}`}
            >
              <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-purple-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                <p className="text-purple-600 mb-4 font-medium">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
