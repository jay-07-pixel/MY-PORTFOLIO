import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxEffectProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  offset = 100,
  className = '',
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Define all transform variations at the top level
  const upTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`translateY(${offset}px)`, `translateY(-${offset}px)`]
  );
  
  const downTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`translateY(-${offset}px)`, `translateY(${offset}px)`]
  );
  
  const leftTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`translateX(${offset}px)`, `translateX(-${offset}px)`]
  );
  
  const rightTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`translateX(-${offset}px)`, `translateX(${offset}px)`]
  );
  
  // Select the appropriate transform based on direction
  let transform;
  switch (direction) {
    case 'up':
      transform = upTransform;
      break;
    case 'down':
      transform = downTransform;
      break;
    case 'left':
      transform = leftTransform;
      break;
    case 'right':
      transform = rightTransform;
      break;
    default:
      transform = upTransform;
  }

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxEffect; 