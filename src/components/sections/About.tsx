import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../layout/TextReveal';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import ParallaxEffect from '../layout/ParallaxEffect';
import FloatingAnimation from '../layout/FloatingAnimation';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <FloatingAnimation 
        x={30} 
        y={20} 
        rotate={10} 
        duration={15} 
        className="absolute top-10 right-10 opacity-20 hidden lg:block"
      >
        <div className="w-40 h-40 border-2 border-primary rounded-full"></div>
      </FloatingAnimation>
      
      <FloatingAnimation 
        x={20} 
        y={40} 
        rotate={5} 
        duration={18} 
        delay={2} 
        className="absolute bottom-10 left-10 opacity-20 hidden lg:block"
      >
        <div className="w-60 h-60 border-2 border-secondary rounded-full"></div>
      </FloatingAnimation>
      
      <div className="container-section relative z-10">
        <ScrollAnimationWrapper animation="bounce">
          <h2 className="section-title">About Me</h2>
        </ScrollAnimationWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          {/* Image column */}
          <ParallaxEffect direction="left" offset={30}>
            <ScrollAnimationWrapper 
              animation="slideIn" 
              direction="left" 
              threshold={0.3}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur-md opacity-70 -m-2 z-0"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg bg-gray-800 overflow-hidden relative z-10">
                  {/* Replace with your image */}
                  <img 
                    src="/WhatsApp%20Image%202025-07-25%20at%2013.46.54_f36302e2.jpg" 
                    alt="Jay Jobanputra" 
                    className="w-full h-full object-cover object-top" 
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollAnimationWrapper>
          </ParallaxEffect>
          
          {/* Content column */}
          <ParallaxEffect direction="right" offset={30}>
            <ScrollAnimationWrapper 
              animation="slideIn" 
              direction="right" 
              delay={0.2}
              threshold={0.3}
            >
              <TextReveal 
                text={`Hi, I'm Jay Jobanputra`} 
                tag="h3" 
                className="text-2xl md:text-3xl font-bold mb-4 text-light-text" 
                staggerChildren={0.05}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false, threshold: 0.3 }}
              >
                <p className="mb-4 text-light-text/80">
                I am a passionate and driven second-year student pursuing B.Tech in Artificial Intelligence & Data Science, with a solid foundation in programming, leadership, and effective communication. I actively take on responsibilities in student organizations and have led multiple initiatives focused on innovation, entrepreneurship, and team building. My experiences have shaped me into a confident individual who thrives in collaborative environments and enjoys solving complex problems through technology.
                </p>
                
                <p className="mb-6 text-light-text/80">
                My long-term goal is to become a Data Scientist and eventually an Entrepreneur committed to creating meaningful social impact. I aspire to build scalable tech-driven ventures that address real-world challenges, empower communities, and contribute to the nation's economic and digital growth. By combining analytical thinking with empathy and vision, I aim to drive change, motivate others, and build a future where technology serves humanity with purpose.


                </p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false, threshold: 0.3 }}
              >
                <div>
                  <h4 className="font-bold text-primary mb-2">Education</h4>
                  <p className="text-light-text/80">B.Tech in AI & Data Science</p>
                  <p className="text-light-text/70 text-sm">Sanjivani University</p>
                  <p className="text-light-text/70 text-sm">2024 - 2028</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-primary mb-2">Interests</h4>
                  <ul className="list-disc list-inside text-light-text/80">
                    {['Full-Stack Development', 'Multi-Platform Apps','Data Analysis & Visualization', 'Startups & Innovation', 'Leadership & Team Building'].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                        viewport={{ once: false }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </ParallaxEffect>
        </div>
      </div>
    </section>
  );
};

export default About; 