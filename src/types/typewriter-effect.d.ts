declare module 'typewriter-effect' {
  import * as React from 'react';
  
  interface TypewriterOptions {
    strings?: string[];
    autoStart?: boolean;
    loop?: boolean;
    delay?: number;
    deleteSpeed?: number;
    pauseFor?: number;
    cursor?: string;
    [key: string]: any;
  }
  
  interface TypewriterProps {
    options?: TypewriterOptions;
    onInit?: (typewriter: any) => void;
  }
  
  const Typewriter: React.FC<TypewriterProps>;
  
  export default Typewriter;
} 