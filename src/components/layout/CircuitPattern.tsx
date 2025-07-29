import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CircuitPatternProps {
  opacity?: number;
  color?: string;
}

const CircuitPattern: React.FC<CircuitPatternProps> = ({
  opacity = 0.15,
  color = '#00FFE7'
}) => {
  // Generate random connection points - memoized to avoid recalculations
  const { nodes, connections } = useMemo(() => {
    // Generate nodes
    const nodeCount = 10; // Reduced from 15
    const generatedNodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      generatedNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5, // Slightly larger sizes
        pulseDelay: Math.random() * 5,
      });
    }
    
    // Generate connections - using fewer connections
    const connectionCount = Math.floor(nodeCount * 1.2); // Reduced from 1.5x
    const generatedConnections = [];
    
    for (let i = 0; i < connectionCount; i++) {
      const startNode = generatedNodes[Math.floor(Math.random() * generatedNodes.length)];
      const possibleEndNodes = generatedNodes.filter(n => n.id !== startNode.id);
      const endNode = possibleEndNodes[Math.floor(Math.random() * possibleEndNodes.length)];
      
      generatedConnections.push({
        id: `c-${i}`,
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        animDelay: Math.random() * 5,
      });
    }
    
    return { nodes: generatedNodes, connections: generatedConnections };
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ opacity }}>
      <svg width="100%" height="100%" style={{ willChange: 'transform' }}>
        {/* Lines/connections */}
        {connections.map((conn) => (
          <g key={conn.id}>
            <line
              x1={`${conn.startX}%`}
              y1={`${conn.startY}%`}
              x2={`${conn.endX}%`}
              y2={`${conn.endY}%`}
              stroke={color}
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            
            {/* Animated pulse along line - optimized with simpler animation */}
            <motion.circle
              cx="0"
              cy="0"
              r="2"
              fill={color}
              animate={{
                cx: [`${conn.startX}%`, `${conn.endX}%`],
                cy: [`${conn.startY}%`, `${conn.endY}%`],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4, // Longer duration for smoother motion
                ease: "linear",
                times: [0, 0.5, 1],
                repeat: Infinity,
                delay: conn.animDelay,
                repeatDelay: Math.random() * 7 + 7, // Longer delay between pulses
              }}
              style={{ willChange: 'transform, opacity' }}
            />
          </g>
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            
            {/* Pulsing effect - optimized with simpler animation */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill={color}
              animate={{
                r: [node.size, node.size * 1.5, node.size], // Reduced scale change
                opacity: [0.1, 0.3, 0.1], // Reduced opacity change
              }}
              transition={{
                duration: 6, // Longer duration for smoother effect
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
                delay: node.pulseDelay,
              }}
              style={{ willChange: 'transform, opacity' }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CircuitPattern; 