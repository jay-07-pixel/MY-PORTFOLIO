import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TechBackgroundProps {
  density?: number;
}

// Generate random binary code strings
const generateBinaryString = (length: number) => {
  return Array.from({ length }, () => Math.round(Math.random())).join('');
};

// Generate code-like elements
const codeSnippets = [
  'const x = () => { };',
  'import React from "react";',
  'function app() { }',
  '<div className="container">',
  'export default App;',
  'npm install react',
  'git commit -m "fix: update"',
  '@tailwind base;',
  '.map(item => item.id)',
  'useState<boolean>(false)',
  'npm run build',
  'git push origin main',
  'docker-compose up -d',
  '<Component {...props} />',
  'const [data, setData] = useState([])',
  'useEffect(() => { }, [])',
  '404 Not Found',
  '<Route path="/" element={<Home />} />',
];

const TechBackground: React.FC<TechBackgroundProps> = ({ density = 30 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Matrix rain effect - optimized
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Matrix characters - reduced character set for performance
    const chars = "01";
    const columns = Math.floor(canvas.width / 30); // Increased spacing for better performance
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }
    
    const matrixRain = () => {
      // More transparent background for smoother fade
      ctx.fillStyle = 'rgba(15, 15, 15, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text style
      ctx.fillStyle = '#00FFE715'; // More transparent text
      ctx.font = '12px monospace'; // Smaller font
      ctx.textAlign = 'center';
      
      // Loop through drops - simplified rendering
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        const x = i * 30;
        const y = drops[i];
        
        if (y > 0 && Math.random() > 0.95) { // Reduced frequency of visible characters
          ctx.fillText(char, x, y);
        }
        
        // Move drop down
        drops[i] += Math.random() * 1.2 + 0.5;
        
        // Reset drop if it goes below screen or randomly
        if (drops[i] > canvas.height || Math.random() > 0.99) {
          drops[i] = Math.random() * -100;
        }
      }
    };
    
    const interval = setInterval(matrixRain, 50);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Generate an array of elements with random positions - reduced number for performance
  const actualDensity = Math.min(density, 20); // Cap the maximum density
  const elements = Array.from({ length: actualDensity }, (_, i) => {
    const isCode = Math.random() > 0.7;
    const isBinary = Math.random() > 0.5;
    const isShape = !isCode && !isBinary;
    
    return {
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100, // % position
      size: Math.random() * 1.5 + 0.5, // Size factor - slightly smaller
      opacity: Math.random() * 0.25 + 0.05, // Opacity between 0.05 and 0.3
      rotateZ: Math.random() * 360, // Rotation in degrees
      animationDuration: Math.random() * 60 + 30, // Slower animations - between 30-90s
      delay: Math.random() * -30, // Negative delay for staggered start
      isCode,
      isBinary,
      isShape,
      content: isCode 
        ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        : (isBinary ? generateBinaryString(Math.floor(Math.random() * 10) + 5) : ''), // Shorter binary strings
      shape: isShape ? Math.floor(Math.random() * 3) : -1, // 0: circle, 1: square, 2: triangle
    };
  });

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0" style={{ position: 'fixed', willChange: 'transform' }}>
      {/* Matrix rain canvas - added will-change-transform */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full opacity-10"
        style={{ willChange: 'transform' }}
      />
      
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute font-mono text-primary/20 whitespace-nowrap will-change-transform"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}rem`,
            opacity: element.opacity,
            transform: `rotateZ(${element.rotateZ}deg)`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: ["0%", "10%", "0%"], // Reduced movement range
            x: [`${element.x}%`, `${element.x + (Math.random() * 5 - 2.5)}%`, `${element.x}%`], // Reduced movement range
            opacity: [element.opacity, element.opacity * 1.3, element.opacity],
          }}
          transition={{
            duration: element.animationDuration,
            ease: "linear",
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          {element.isCode && (
            <span className="text-primary/30">{element.content}</span>
          )}
          
          {element.isBinary && (
            <span className="text-primary/20">{element.content}</span>
          )}
          
          {element.isShape && (
            <>
              {element.shape === 0 && (
                <div className={`w-${Math.floor(element.size * 4)}
                   h-${Math.floor(element.size * 4)} rounded-full border border-primary/20`} />
              )}
              {element.shape === 1 && (
                <div className={`w-${Math.floor(element.size * 4)} 
                  h-${Math.floor(element.size * 4)} border border-primary/20`} />
              )}
              {element.shape === 2 && (
                <div className="border-solid border-t-primary/20 border-t-4 
                  border-x-transparent border-x-4 border-b-0 w-0 h-0" 
                  style={{
                    borderWidth: `${Math.floor(element.size * 8)}px ${Math.floor(element.size * 4)}px 0 ${Math.floor(element.size * 4)}px`,
                  }}
                />
              )}
            </>
          )}
        </motion.div>
      ))}
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Tech circuit board lines - simplified */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: 'absolute' }}
      >
        <g stroke="#00FFE7" strokeWidth="0.5">
          {Array.from({ length: 5 }, (_, i) => {
            const y = (i + 1) * 20;
            const randomHeight = Math.floor(Math.random() * 20 + 5);
            const randomWidth = Math.floor(Math.random() * 100 + 50);
            const randomOffset = Math.floor(Math.random() * 30 - 15);
            return (
              <path
                key={`h-${i}`}
                d={`M0,${y} v${randomHeight} h${randomWidth} v${randomOffset}`}
                fill="none"
              />
            );
          })}
          
          {Array.from({ length: 5 }, (_, i) => {
            const x = (i + 1) * 20;
            const randomWidth = Math.floor(Math.random() * 30 - 15);
            const randomHeight = Math.floor(Math.random() * 100 + 50);
            const randomOffset = Math.floor(Math.random() * 30 - 15);
            return (
              <path
                key={`v-${i}`}
                d={`M${x},0 h${randomWidth} v${randomHeight} h${randomOffset}`}
                fill="none"
              />
            );
          })}
        </g>
        
        {/* Add circuit nodes - reduced count */}
        <g>
          {Array.from({ length: 8 }, (_, i) => {
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            const size = Math.floor(Math.random() * 2 + 1);
            
            return (
              <circle
                key={`node-${i}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r={size}
                fill="#00FFE7"
                fillOpacity="0.2"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default TechBackground; 