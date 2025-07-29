import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 origin-left"
      style={{ 
        transform: `scaleX(${scaleX})`,
        transformOrigin: 'left'
      }}
    />
  );
};

export default ScrollProgress; 