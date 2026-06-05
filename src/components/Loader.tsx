import React, { useEffect, useState, useRef } from 'react';
import ATEDDLogo from './ATEDDLogo';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    const duration = 2200; // 2.2 seconds
    
    const animate = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setHidden(true);
          setTimeout(onComplete, 600);
        }, 100);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-[600ms] ease-out ${
        hidden ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
      style={{ background: '#0B0B0D' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="animate-pulse-glow">
          <ATEDDLogo size={64} color="#C9A227" />
        </div>
        
        {/* Progress bar */}
        <div 
          className="w-[200px] h-[2px] rounded-full overflow-hidden"
          style={{ background: '#1F1F24' }}
        >
          <div 
            className="h-full rounded-full transition-none"
            style={{ 
              width: `${progress}%`,
              background: progress < 50 
                ? '#C9A227' 
                : `linear-gradient(to right, #C9A227, #FF5C2C)`,
            }}
          />
        </div>
        
        {/* Label */}
        <span 
          className="font-mono text-[0.7rem] tracking-[0.25em] uppercase"
          style={{ color: '#5F5A51' }}
        >
          Initializing
        </span>
      </div>
    </div>
  );
};

export default Loader;
