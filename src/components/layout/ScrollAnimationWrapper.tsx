import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'bounce';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

const animations = {
  fadeIn: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  },
  slideUp: {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 }
  },
  slideIn: (direction: 'left' | 'right') => ({
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 }
  }),
  scale: {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.85 }
  },
  bounce: {
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.5,
        duration: 0.8,
        delay: custom * 0.1
      }
    }),
    hidden: { opacity: 0, y: 30 }
  }
};

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'fadeIn',
  direction = 'up',
  duration = 0.5,
  delay = 0,
  threshold = 0.2,
  className = ''
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold, once: false });
  const [wasInView, setWasInView] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      setWasInView(true);
    } else if (wasInView) {
      // This will animate when scrolling back up/away from the element
      controls.start('hidden');
    }
  }, [controls, inView, wasInView]);

  // Determine which animation to use
  const getAnimationVariant = () => {
    if (animation === 'slideIn') {
      return animations.slideIn(direction as 'left' | 'right');
    }
    return animations[animation];
  };

  const variants = getAnimationVariant();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration, delay }}
      className={className}
      custom={delay} // Used for staggered animations
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper; 