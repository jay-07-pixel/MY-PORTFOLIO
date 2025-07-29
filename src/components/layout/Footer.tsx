import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaInstagram, FaChevronUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-bg pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Back to top button */}
        <div className="flex justify-center -mt-16 mb-10">
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1"
          >
            <FaChevronUp size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-glow-effect pb-8 mb-8">
          {/* Logo and about */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">My Portfolio</h3>
            <p className="text-light-text/70 mb-4">
              Turning ideas into projects — here's a glimpse of what I've built, what I analyze, and what drives me.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-light-text/70 hover:text-primary transition-colors cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social links */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glow-effect text-light-text rounded-full flex items-center justify-center hover:bg-primary hover:text-dark-bg transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/jay-jobanputra-1b442931b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glow-effect text-light-text rounded-full flex items-center justify-center hover:bg-primary hover:text-dark-bg transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/jay_jobanputra07/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glow-effect text-light-text rounded-full flex items-center justify-center hover:bg-primary hover:text-dark-bg transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-light-text/50 text-sm">
            © {currentYear} Jay Jobanputra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 