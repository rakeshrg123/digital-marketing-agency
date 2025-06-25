import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 inline-block">
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg animate-bounce">
              Our Story
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            We Are Digital
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pioneers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Transforming businesses through innovative digital strategies since 2015. Our journey began with a simple vision: to help brands thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 md:p-20 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Our Humble Beginnings
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Founded in a small co-working space with just three passionate marketers, we've grown into a full-service digital agency with over 50 experts worldwide.
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  What started as a focus on SEO has expanded into a comprehensive suite of digital marketing services, but our core philosophy remains the same: deliver exceptional results through creativity and data-driven strategies.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                    2015
                  </div>
                  <span className="text-gray-400">Year Founded</span>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Our team working together" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Our first office" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Core Beliefs
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-10 border border-blue-500/30 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-102">
              <div className="text-6xl mb-6 text-blue-400">🌟</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To empower businesses of all sizes with cutting-edge digital marketing solutions that drive measurable growth, foster meaningful connections, and create lasting competitive advantages in an ever-evolving digital landscape.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-10 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-102">
              <div className="text-6xl mb-6 text-purple-400">🔭</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To become the most trusted digital transformation partner globally, recognized for our innovative approach, exceptional results, and unwavering commitment to our clients' success in the digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Meet The Team
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The brilliant minds behind your digital success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white/10 overflow-hidden group-hover:border-purple-500/50 transition-all duration-300">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {member.name}
                  </h3>
                  <p className="text-center text-blue-400 mb-4">{member.position}</p>
                  <p className="text-center text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-4 mt-6">
                    {member.socialLinks.map((social, i) => (
                      <a 
                        key={i}
                        href={social.url}
                        className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-16 md:p-24 text-center border border-white/10 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Our team is excited to learn about your project and explore how we can help you achieve extraordinary results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  to="/contact"
                  className="group relative px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10">Get In Touch</span>
                </Link>
                <Link 
                  to="/services"
                  className="group relative px-10 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10">Explore Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Team data
const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "CEO & Founder",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Digital marketing visionary with 15+ years experience growing brands online. Passionate about data-driven creativity.",
    socialLinks: [
      { name: "Twitter", url: "#", icon: <FaTwitter className="w-4 h-4 text-white" /> },
      { name: "LinkedIn", url: "#", icon: <FaLinkedinIn className="w-4 h-4 text-white" /> }
    ]
  },
  {
    name: "Michael Chen",
    position: "Creative Director",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Award-winning designer specializing in brand storytelling through visual experiences.",
    socialLinks: [
      { name: "Instagram", url: "#", icon: <FaInstagram className="w-4 h-4 text-white" /> },
      { name: "Dribbble", url: "#", icon: <FaDribbble className="w-4 h-4 text-white" /> }
    ]
  },
  {
    name: "Emma Rodriguez",
    position: "SEO Director",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Technical SEO expert with a knack for making complex strategies understandable and actionable.",
    socialLinks: [
      { name: "Twitter", url: "#", icon: <FaTwitter className="w-4 h-4 text-white" /> },
      { name: "GitHub", url: "#", icon: <FaGithub className="w-4 h-4 text-white" /> }
    ]
  },
  {
    name: "David Kim",
    position: "PPC Specialist",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Paid media expert who consistently delivers exceptional ROAS through precision targeting.",
    socialLinks: [
      { name: "LinkedIn", url: "#", icon: <FaLinkedinIn className="w-4 h-4 text-white" /> },
      { name: "Twitter", url: "#", icon: <FaTwitter className="w-4 h-4 text-white" /> }
    ]
  }
];

// Import icons at the top of your file
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaDribbble,
  FaGithub
} from 'react-icons/fa';

export default About;