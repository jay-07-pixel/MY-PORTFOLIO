import React from 'react';
import { motion } from 'framer-motion';

interface CodeSnippetProps {
  code: string;
  language?: string;
  fileName?: string;
  theme?: 'cyberpunk' | 'matrix' | 'terminal';
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = 'javascript',
  fileName = 'example.js',
  theme = 'cyberpunk'
}) => {
  // Theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'matrix':
        return {
          bg: 'bg-black',
          text: 'text-green-500',
          accent: 'text-green-300',
          comment: 'text-green-700',
          keyword: 'text-green-400',
          border: 'border-green-500',
          line: 'text-green-900',
          glow: 'shadow-[0_0_5px_rgba(0,255,0,0.5)]'
        };
      case 'terminal':
        return {
          bg: 'bg-gray-900',
          text: 'text-gray-300',
          accent: 'text-white',
          comment: 'text-gray-500',
          keyword: 'text-gray-100',
          border: 'border-gray-700',
          line: 'text-gray-600',
          glow: ''
        };
      case 'cyberpunk':
      default:
        return {
          bg: 'bg-dark-bg',
          text: 'text-light-text',
          accent: 'text-primary',
          comment: 'text-purple-400',
          keyword: 'text-pink-400',
          border: 'border-primary/30',
          line: 'text-gray-600',
          glow: 'shadow-[0_0_8px_rgba(0,255,231,0.3)]'
        };
    }
  };

  const styles = getThemeStyles();
  
  // Process code to apply syntax highlighting
  const processCode = () => {
    // Very simple syntax highlighting - just for visual effect
    // In a real app, you'd use a proper syntax highlighting library
    
    // Split the code into lines
    const lines = code.split('\n');
    
    // Process lines with basic highlighting
    return lines.map((line, i) => {
      // Replace comments
      let processedLine = line
        .replace(/(\/\/.*$|\/\*.*\*\/)/g, `<span class="${styles.comment}">$1</span>`);
      
      // Replace keywords (simplified for demonstration)
      const keywords = [
        'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 
        'while', 'import', 'export', 'from', 'class', 'extends', 'new',
        'try', 'catch', 'finally', 'throw', 'async', 'await'
      ];
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        processedLine = processedLine.replace(regex, `<span class="${styles.keyword}">$&</span>`);
      });
      
      // Replace strings
      processedLine = processedLine
        .replace(/(['"`])(.*?)\1/g, `<span class="${styles.accent}">$&</span>`);
      
      return (
        <div key={i} className="flex">
          <span className={`${styles.line} opacity-60 pr-4 select-none text-right w-8`}>
            {i + 1}
          </span>
          <span 
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        </div>
      );
    });
  };

  // Animation for the file name tab
  const tabAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2 } }
  };

  // Animation for the code container
  const codeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
  };

  // Line animations
  const lineAnimation = {
    initial: { opacity: 0, x: -10 },
    animate: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.1 + (i * 0.03),
        duration: 0.3
      }
    })
  };

  return (
    <div className="relative font-mono my-4">
      {/* File name tab */}
      <motion.div 
        className={`inline-block ${styles.bg} ${styles.border} border-b-0 rounded-t-md px-4 py-1 relative z-10 ${styles.accent}`}
        {...tabAnimation}
      >
        <div className="flex items-center">
          <span className={`mr-2 text-xs ${styles.text}`}>
            {language}
          </span>
          <span>{fileName}</span>
        </div>
      </motion.div>
      
      {/* Code container */}
      <motion.div 
        className={`${styles.bg} ${styles.border} rounded-md rounded-tl-none p-4 ${styles.text} text-sm overflow-x-auto ${styles.glow}`}
        {...codeAnimation}
      >
        {/* Blinking cursor at the end */}
        <div className="relative">
          {processCode().map((line, i) => (
            <motion.div 
              key={i} 
              custom={i} 
              variants={lineAnimation}
              initial="initial"
              animate="animate"
              className="whitespace-pre overflow-visible"
            >
              {line}
            </motion.div>
          ))}
          
          <motion.div 
            className={`${styles.accent} absolute bottom-0 h-4 w-2`}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CodeSnippet; 