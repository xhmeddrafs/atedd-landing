import React from 'react';

interface ATEDDLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

const ATEDDLogo: React.FC<ATEDDLogoProps> = ({ 
  className = '', 
  size = 64, 
  color = 'currentColor' 
}) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      <path 
        d="M60 18 L96 100 L80 100 L60 52 L40 100 L24 100 Z" 
        fill="none" 
        stroke={color} 
        strokeWidth="4.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M60 40 L74 72 M60 40 L46 72" 
        fill="none" 
        stroke={color} 
        strokeWidth="4.5" 
        strokeLinecap="round"
      />
      <line 
        x1="40" 
        y1="40" 
        x2="80" 
        y2="40" 
        stroke={color} 
        strokeWidth="4.5" 
        strokeLinecap="round"
      />
      <path 
        d="M52 30 L60 22 L68 30" 
        fill="none" 
        stroke={color} 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M36 100 Q60 122 96 86" 
        fill="none" 
        stroke={color} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
        opacity="0.55"
      />
      <circle 
        cx="36" 
        cy="100" 
        r="4" 
        fill={color} 
        opacity="0.55"
      />
      <circle 
        cx="96" 
        cy="86" 
        r="4" 
        fill={color} 
        opacity="0.55"
      />
    </svg>
  );
};

export default ATEDDLogo;
