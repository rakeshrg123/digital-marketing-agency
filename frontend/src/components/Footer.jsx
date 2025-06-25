import { Link } from 'react-router-dom';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-slate-900/80 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="space-y-6">
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                DigitalAgency
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Transforming visions into digital realities through innovative strategies and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-white group-hover:text-pink-500 transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5 text-white group-hover:text-blue-500 transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Blog', 'Contact', 'Admin'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              {['SEO', 'Social Media', 'PPC', 'Email', 'Content', 'Analytics'].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-blue-400 mr-4 mt-1">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <span className="text-gray-400 hover:text-white transition-colors duration-300">
                  hello@digitalagency.com
                </span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-400 mr-4 mt-1">
                  <FaPhone className="w-5 h-5" />
                </div>
                <span className="text-gray-400 hover:text-white transition-colors duration-300">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-400 mr-4 mt-1">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <span className="text-gray-400 hover:text-white transition-colors duration-300">
                  123 Digital Lane<br />
                  Tech City, TC 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Digital Marketing Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;