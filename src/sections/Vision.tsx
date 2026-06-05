import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VISION_LINES = [
  { text: 'Redefining', isMain: true },
  { text: 'Academic', isMain: true },
  { text: 'Clarity', isMain: true },
  { text: '///', isDivider: true },
  { text: 'FOR INDIAN INSTITUTIONS', isSubtitle: true },
];

const featureCards = [
  {
    num: '01',
    title: 'Efficiency',
    desc: 'AI-optimized study plans that adapt to your pace, not the other way around.',
  },
  {
    num: '02',
    title: 'Retention',
    desc: 'Moving beyond memorization toward genuine concept architecture.',
  },
  {
    num: '03',
    title: 'Clarity',
    desc: 'Syllabus-grounded responses that eliminate confusion and build confidence.',
  },
  {
    num: '04',
    title: 'Access',
    desc: 'Institutional-grade AI for every student, at a fraction of the cost.',
  },
];

const Vision: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D text assembly animation
      const lines = textContainerRef.current?.querySelectorAll('.vision-line');
      if (lines) {
        lines.forEach((line, i) => {
          const chars = line.querySelectorAll('.vision-char');
          
          gsap.fromTo(chars, 
            {
              opacity: 0,
              x: i % 2 === 0 ? '-30%' : '30%',
              y: i % 2 === 0 ? '0%' : '20%',
              rotateZ: i % 2 === 0 ? -20 : 20,
              z: i % 2 === 0 ? -1200 : -800,
            },
            {
              opacity: 1,
              x: '0%',
              y: '0%',
              rotateZ: 0,
              z: 0,
              stagger: 0.02,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: line,
                start: 'top bottom',
                end: 'top top+=15%',
                scrub: true,
              },
            }
          );
        });
      }

      // Cards reveal
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top bottom-=100',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const splitChars = (text: string) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="vision-char inline-block"
        style={{ willChange: 'transform, opacity' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      id="vision" 
      ref={sectionRef}
      className="relative z-10 py-24 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: '#0B0B0D' }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: 3D text assembly */}
        <div 
          ref={textContainerRef}
          className="min-h-[50vh] flex flex-col justify-center"
          style={{ perspective: '1000px' }}
        >
          <div className="mb-8">
            <span className="eyebrow">The Mission</span>
          </div>

          <div style={{ transformStyle: 'preserve-3d' }}>
            {VISION_LINES.map((line, i) => (
              <div
                key={i}
                className={`vision-line ${
                  line.isMain 
                    ? 'font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]' 
                    : line.isSubtitle
                    ? 'font-mono text-xs md:text-sm tracking-[0.3em] uppercase mt-6'
                    : 'font-mono text-atedd-gold tracking-[0.5em] my-4'
                }`}
              >
                <span className={line.isMain ? (i < 2 ? 'text-atedd-text-primary' : 'gradient-text') : ''}>
                  {splitChars(line.text)}
                </span>
              </div>
            ))}
          </div>

          {/* Body text */}
          <div className="mt-12 max-w-lg">
            <p className="text-atedd-text-muted text-base md:text-lg leading-relaxed mb-6">
              Indian students today navigate one of the world's most competitive academic landscapes. 
              But the tools available haven't kept pace with the complexity of the curriculum.
            </p>
            <p className="text-atedd-text-muted text-base md:text-lg leading-relaxed">
              <span className="text-atedd-text-primary font-semibold">ATEDD's Goal</span> is to bridge the gap 
              between information and understanding. We are building an intelligent companion that doesn't 
              just store data, but processes it to provide the shortest path to academic mastery.
            </p>
          </div>
        </div>

        {/* Right: 2x2 feature grid */}
        <div ref={cardsRef} className="grid grid-cols-2 gap-4 lg:mt-24">
          {featureCards.map((card, i) => (
            <div
              key={card.num}
              className="feature-card card-lift p-6 rounded-2xl border border-white/[0.06] group hover:border-atedd-gold/30 hover:shadow-glow-glow"
              style={{ 
                background: '#111114',
                marginTop: i % 2 !== 0 ? '2rem' : '0',
                borderLeft: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderLeft = '2px solid #C9A227';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderLeft = '2px solid transparent';
              }}
            >
              <div className="font-display text-3xl text-atedd-gold mb-3">{card.num}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-atedd-text-primary mb-3 font-body">
                {card.title}
              </div>
              <p className="text-[0.7rem] text-atedd-text-dim leading-relaxed uppercase tracking-tight">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
