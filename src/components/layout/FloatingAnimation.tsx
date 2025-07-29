import React from 'react';
import { motion } from 'framer-motion';

interface FloatingAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  x?: number;
  y?: number;
  rotate?: number;
  className?: string;
}

const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  duration = 3,
  delay = 0,
  x = 10,
  y = 10,
  rotate = 3,
  className = ''
}) => {
  return (
    <motion.div
      animate={{
        x: [0, x, 0, -x, 0],
        y: [0, -y, 0, y, 0],
        rotate: [0, rotate, 0, -rotate, 0]
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingAnimation; 