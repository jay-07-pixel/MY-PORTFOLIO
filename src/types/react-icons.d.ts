declare module 'react-icons' {
  import * as React from 'react';
  export type IconType = React.ComponentType<React.SVGAttributes<SVGElement>>;
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