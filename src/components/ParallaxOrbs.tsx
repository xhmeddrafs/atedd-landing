import React, { useEffect, useRef } from 'react';

const ParallaxOrbs: React.FC = () => {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!orbsRef.current) return;
      const scrollY = window.scrollY;
      const orbs = orbsRef.current.children;
      
      // Each orb moves at slightly different speeds
      (orbs[0] as HTMLElement).style.transform = `translateY(${scrollY * 0.3}px)`;
      (orbs[1] as HTMLElement).style.transform = `translateY(${scrollY * 0.2}px)`;
      (orbs[2] as HTMLElement).style.transform = `translateY(${scrollY * 0.25}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={orbsRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1 - Gold - top left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: '#C9A227',
          opacity: 0.08,
          filter: 'blur(100px)',
          top: '-10%',
          left: '-10%',
        }}
      />
      {/* Orb 2 - Ember - bottom right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background: '#FF5C2C',
          opacity: 0.06,
          filter: 'blur(100px)',
          bottom: '-10%',
          right: '-10%',
        }}
      />
      {/* Orb 3 - Violet - top right offset */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: '#B266FF',
          opacity: 0.06,
          filter: 'blur(100px)',
          top: '5%',
          right: '15%',
        }}
      />
    </div>
  );
};

export default ParallaxOrbs;
