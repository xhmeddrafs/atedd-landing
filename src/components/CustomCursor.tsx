import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select');
      isHovering.current = !!isClickable;
    };

    const animate = () => {
      outlinePos.current.x += (pos.current.x - outlinePos.current.x) * 0.15;
      outlinePos.current.y += (pos.current.y - outlinePos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }

      if (outlineRef.current) {
        const scale = isHovering.current ? 1.5 : 1;
        const borderColor = isHovering.current ? '#FF5C2C' : '#C9A227';
        outlineRef.current.style.transform = `translate(${outlinePos.current.x - 20}px, ${outlinePos.current.y - 20}px) scale(${scale})`;
        outlineRef.current.style.borderColor = borderColor;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          width: 8,
          height: 8,
          background: '#C9A227',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full hidden md:block"
        style={{
          width: 40,
          height: 40,
          border: '2px solid #C9A227',
          mixBlendMode: 'difference',
          transition: 'border-color 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;
