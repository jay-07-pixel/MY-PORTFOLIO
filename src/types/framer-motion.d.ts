declare module 'framer-motion' {
  import * as React from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    [key: string]: any;
  }
  
  export type MotionComponent<P = {}> = React.FC<P & MotionProps>;
  
  export const motion: {
    div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>;
    a: MotionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    button: MotionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    // Add other HTML elements as needed
    [key: string]: MotionComponent<any>;
  };
  
  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    exitBeforeEnter?: boolean;
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
} 