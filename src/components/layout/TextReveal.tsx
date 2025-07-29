import React, { useRef, createElement } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  tag = 'p',
  delay = 0,
  duration = 0.5,
  className = '',
  staggerChildren = 0.03
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });

  // Split text into words
  const words = text.split(' ');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay * i,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration
      },
    },
  };

  return (
    <div ref={ref}>
      <motion.div
        style={{ overflow: 'hidden' }}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {createElement(
          tag,
          { className },
          words.map((word, idx) => (
            <motion.span
              key={idx}
              className="inline-block mr-1"
              variants={child}
            >
              {word}{' '}
            </motion.span>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default TextReveal; 