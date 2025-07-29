import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import TextReveal from '../layout/TextReveal';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);
  const inView = useInView(skillsRef, {
    threshold: 0.2,
    once: false // This ensures the animation triggers every time
  });

  // Reset progress when section is out of view
  useEffect(() => {
    if (!inView) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [inView]);

  const skills: Skill[] = [
    { name: 'HTML', level: 90, icon: '🌐' },
    { name: 'CSS', level: 85, icon: '🎨' },
    { name: 'JavaScript', level: 80, icon: '📜' },
    { name: 'React', level: 75, icon: '⚛️' },
    { name: 'Tailwind CSS', level: 85, icon: '💨' },
    { name: 'TypeScript', level: 70, icon: '🔷' },
    { name: 'Node.js', level: 65, icon: '🟢' },
    { name: 'Git', level: 75, icon: '🔄' },
  ];

  // Container for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Item animation for each skill card
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="skills" className="py-20 bg-dark-bg/50 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-glow-effect/10 to-dark-bg/0 opacity-50"></div>
      
      <div ref={skillsRef} className="container-section relative z-10">
        <ScrollAnimationWrapper animation="fadeIn">
          <TextReveal 
            text="Skills" 
            tag="h2" 
            className="section-title" 
            staggerChildren={0.08}
          />
        </ScrollAnimationWrapper>
        
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          viewport={{ once: false, amount: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -15px rgba(0,255,231,0.2)" }}
              className="bg-dark-bg p-6 rounded-lg shadow-lg border border-glow-effect"
            >
              <div className="flex items-center mb-3">
                <motion.span 
                  className="text-2xl mr-2"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {skill.icon}
                </motion.span>
                <h3 className="text-xl font-semibold text-light-text">{skill.name}</h3>
                <motion.span 
                  className="ml-auto text-primary font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              
              <div className="skill-bar">
                <motion.div 
                  className="skill-progress"
                  initial={{ width: "0%" }}
                  animate={{ width: isVisible ? `${skill.level}%` : "0%" }}
                  transition={{ 
                    duration: 1.2,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <ScrollAnimationWrapper animation="fadeIn" delay={0.4}>
          <h3 className="text-2xl font-bold mb-6 text-primary mt-16 text-center">Other Technologies & Tools</h3>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                }
              },
              hidden: {}
            }}
          >
            {['VS Code', 'GitHub',  'Vercel', 'Android Studio', 'Gradle'].map((tool, index) => (
              <motion.div
                key={tool}
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 },
                  hidden: { opacity: 0, y: 20, scale: 0.8 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 10px 20px rgba(0,255,231,0.3)",
                  backgroundColor: "rgba(0,255,231,0.2)"
                }}
                className="px-4 py-2 bg-glow-effect rounded-md text-light-text"
              >
                {tool}
              </motion.div>
            ))}
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default Skills; 