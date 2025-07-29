import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-scroll';
import TextReveal from '../layout/TextReveal';
import FloatingAnimation from '../layout/FloatingAnimation';
import ParallaxEffect from '../layout/ParallaxEffect';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Tech-themed background elements */}
      <div className="absolute w-full h-full">
        {/* Code blocks floating in background */}
        <FloatingAnimation x={15} y={20} duration={10} className="absolute top-40 left-20 opacity-10">
          <div className="p-4 border border-primary/30 rounded bg-dark-bg/50 font-mono text-xs md:text-sm">
            <pre className="text-primary">
              {`function init() {
  return {
    name: "dev",
    skills: ["react", "typescript"]
  };
}`}
            </pre>
          </div>
        </FloatingAnimation>
        
        <FloatingAnimation x={20} y={15} duration={12} delay={1} className="absolute top-40 right-20 opacity-10">
          <div className="p-4 border border-primary/30 rounded bg-dark-bg/50 font-mono text-xs md:text-sm">
            <pre className="text-primary">
              {`import React from 'react';
const App = () => {
  return <Component />;
};`}
            </pre>
          </div>
        </FloatingAnimation>
        
        {/* Tech grid patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Tech decorative elements */}
        <FloatingAnimation x={8} y={8} rotate={10} duration={6} className="absolute top-32 left-32 hidden md:block">
          <div className="w-12 h-12 border-2 border-primary/30 rounded-sm grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-primary/30"></div>
            <div className="border-b border-primary/30"></div>
            <div className="border-r border-primary/30"></div>
            <div></div>
          </div>
        </FloatingAnimation>
        
        <FloatingAnimation x={10} y={10} rotate={15} duration={7} delay={0.3} className="absolute bottom-32 right-32 hidden md:block">
          <div className="w-16 h-16 border-2 border-primary/30">
            <div className="w-full h-full relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-primary/40"></div>
              <div className="absolute bottom-2 right-2 w-5 h-1 bg-primary/40"></div>
            </div>
          </div>
        </FloatingAnimation>
        
        {/* Binary code */}
        <div className="absolute bottom-10 left-10 opacity-10 font-mono text-xs whitespace-nowrap overflow-hidden text-primary/30">
          01001100 01101111 01110010 01100101 01101101 00100000 01001001 01110000 01110011 01110101 01101101
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <ParallaxEffect direction="up" offset={50} className="space-y-6">
          <TextReveal 
            text="Welcome to my portfolio" 
            tag="h2" 
            className="text-xl md:text-2xl font-medium text-primary" 
            staggerChildren={0.05}
          />
          
          <div>
            <TextReveal 
              text={`I'm Jay Jobanputra,`} 
              tag="h2" 
              className="text-4xl md:text-6xl lg:text-7xl font-bold" 
              staggerChildren={0.08}
              delay={0.5}
            />
            
            <div className="h-14 md:h-20 flex items-center justify-center mt-2">
              <Typewriter
                options={{
                  strings: [
                    'A B.Tech AI & Data Science student.',
                    'A Frontend Developer.',
                    'A Backend Developer.',
                    'A App Developer.',
                    'A Startup Enthusiast.'
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-light-text/80"
          >
            Creating what you see. Calculating what you don’t.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 pt-6"
          >
            <Link 
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="btn-primary"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.span>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="border-b-2 border-primary text-light-text hover:text-primary transition-colors duration-300"
            >
              Contact Me
            </Link>
          </motion.div>
        </ParallaxEffect>
      </div>

      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-light-text/80 text-sm mb-2">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 1.5 
          }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, 15] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1
            }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 