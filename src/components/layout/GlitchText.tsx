import React, { useState, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextElement = 'p' | 'span' | 'div' | 'strong' | 'em' | HeadingLevel;

interface GlitchTextProps {
  text: string;
  className?: string;
  tag?: TextElement;
  intensity?: 'low' | 'medium' | 'high';
  glitchOnHover?: boolean;
}

const GlitchText = ({
  text,
  className = '',
  tag = 'h2',
  intensity = 'medium',
  glitchOnHover = false,
}: GlitchTextProps): ReactElement => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  // Configure glitch settings based on intensity
  const getGlitchConfig = () => {
    switch (intensity) {
      case 'low':
        return {
          probability: 0.03,
          maxGlitchChars: 2,
          duration: 50,
          interval: 3000,
        };
      case 'high':
        return {
          probability: 0.1,
          maxGlitchChars: 5,
          duration: 150,
          interval: 1500,
        };
      case 'medium':
      default:
        return {
          probability: 0.05,
          maxGlitchChars: 3,
          duration: 100,
          interval: 2000,
        };
    }
  };

  const config = getGlitchConfig();

  // Generate a random glitched character
  const getGlitchChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|;:,.<>?/';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  // Create a glitched version of the text
  const createGlitchedText = React.useCallback(() => {
    const textArray = text.split('');
    // Number of characters to glitch (random, up to maxGlitchChars)
    const numGlitchChars = Math.floor(Math.random() * config.maxGlitchChars) + 1;
    
    // Pick random positions to glitch
    const positions = new Set<number>();
    while (positions.size < numGlitchChars) {
      positions.add(Math.floor(Math.random() * text.length));
    }

    // Apply glitch to those positions
    positions.forEach(pos => {
      if (textArray[pos] !== ' ') { // Don't glitch spaces
        textArray[pos] = getGlitchChar();
      }
    });

    return textArray.join('');
  }, [text, config.maxGlitchChars, getGlitchChar]);

  // Create periodic glitch effect
  useEffect(() => {
    if (glitchOnHover && !isGlitching) return;

    let glitchInterval: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;

    const startGlitching = () => {
      glitchInterval = setInterval(() => {
        // Only glitch with a certain probability
        if (Math.random() < config.probability) {
          const glitchedText = createGlitchedText();
          setDisplayText(glitchedText);
          
          // Reset back to original text after a short duration
          resetTimeout = setTimeout(() => {
            setDisplayText(text);
          }, config.duration);
        }
      }, config.interval / 10); // Divide for more frequent checks
    };

    startGlitching();

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(resetTimeout);
    };
  }, [text, config.probability, config.duration, config.interval, isGlitching, glitchOnHover, createGlitchedText]);

  // Handle hover state for optional hover-only glitch effect
  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (glitchOnHover) {
      setIsGlitching(false);
      setDisplayText(text); // Reset text when leaving
    }
  };

  // Create content for any tag type
  const content = (
    <>
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>
      
      {/* Optional decorative glitch layers */}
      <motion.span 
        className="absolute left-0 top-0 text-primary/30 select-none pointer-events-none" 
        style={{ 
          textShadow: '0.05em 0 0 rgba(255,0,0,.75), -0.025em -.05em 0 rgba(0,255,0,.75), .025em .05em 0 rgba(0,0,255,.75)',
          zIndex: 0,
          opacity: isGlitching ? 0.8 : 0
        }}
        animate={isGlitching || !glitchOnHover ? { x: [0, -3, 3, -2, 0] } : { x: 0 }}
        transition={{
          duration: 0.5,
          repeat: Infinity, 
          repeatType: 'loop',
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
      >
        {displayText}
      </motion.span>
    </>
  );

  // Shared props for all tag types
  const props = {
    className: `glitch-text relative inline-block ${className}`,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  // Render the appropriate tag
  switch (tag) {
    case 'h1': return <h1 {...props}>{content}</h1>;
    case 'h2': return <h2 {...props}>{content}</h2>;
    case 'h3': return <h3 {...props}>{content}</h3>;
    case 'h4': return <h4 {...props}>{content}</h4>;
    case 'h5': return <h5 {...props}>{content}</h5>;
    case 'h6': return <h6 {...props}>{content}</h6>;
    case 'p': return <p {...props}>{content}</p>;
    case 'span': return <span {...props}>{content}</span>;
    case 'div': return <div {...props}>{content}</div>;
    case 'strong': return <strong {...props}>{content}</strong>;
    case 'em': return <em {...props}>{content}</em>;
    default: return <h2 {...props}>{content}</h2>;
  }
};

export default GlitchText; 