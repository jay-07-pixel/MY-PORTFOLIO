declare module 'react-icons' {
  import * as React from 'react';
  
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    title?: string;
  }
  
  export type IconType = React.ComponentType<IconBaseProps>;
}

declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  
  export const FaSun: IconType;
  export const FaMoon: IconType;
  export const FaBars: IconType;
  export const FaTimes: IconType;
  export const FaGithub: IconType;
  export const FaExternalLinkAlt: IconType;
  export const FaTimesCircle: IconType;
  export const FaEnvelope: IconType;
  export const FaPhoneAlt: IconType;
  export const FaMapMarkerAlt: IconType;
  export const FaLinkedin: IconType;
  export const FaTwitter: IconType;
  export const FaInstagram: IconType;
  export const FaChevronUp: IconType;
}

declare module 'react-scroll' {
  export const Link: any;
  export const Element: any;
  export const Events: any;
  export const scrollSpy: any;
  export const scroller: any;
}

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
    variants?: any;
    custom?: any;
    [key: string]: any;
  }
  
  export type MotionComponent<P = {}> = React.FC<P & MotionProps>;
  
  export const motion: {
    div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>;
    a: MotionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    button: MotionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    [key: string]: MotionComponent<any>;
  };
  
  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    exitBeforeEnter?: boolean;
    initial?: boolean;
    onExitComplete?: () => void;
  }>;

  // Animation Controls
  export interface AnimationControls {
    start: (definition: string | any) => Promise<any>;
    stop: () => void;
    set: (definition: any) => void;
  }
  
  export function useAnimation(): AnimationControls;
  
  // Visibility detection
  export interface InViewOptions {
    root?: React.RefObject<Element | null>;
    margin?: string;
    amount?: number | "some" | "all";
    once?: boolean;
    threshold?: number | number[];
  }
  
  export function useInView(
    ref: React.RefObject<Element | null>,
    options?: InViewOptions
  ): boolean;

  // Scroll hooks
  export interface UseScrollOptions {
    container?: React.RefObject<Element>;
    target?: React.RefObject<Element | HTMLDivElement | null>;
    offset?: [string, string] | number[];
  }
  
  export interface ScrollInfo {
    scrollX: number;
    scrollY: number;
    scrollXProgress: number;
    scrollYProgress: number;
  }
  
  export function useScroll(options?: UseScrollOptions): ScrollInfo;

  // More advanced hooks
  export function useTransform<T, U>(
    value: any,
    inputRange: number[],
    outputRange: U[],
    options?: { clamp?: boolean }
  ): any;
  
  export function useSpring(
    value: number | any,
    options?: { stiffness?: number; damping?: number; mass?: number }
  ): any;
}

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

declare module 'emailjs-com' {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }
  
  export interface EmailJSSendParams {
    service_id: string;
    template_id: string;
    user_id: string;
    template_params?: Record<string, any>;
  }
  
  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, any>,
    userID: string
  ): Promise<EmailJSResponseStatus>;
  
  export function init(userID: string): void;
} 