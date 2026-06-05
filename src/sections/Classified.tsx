import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lockedCards = [
  {
    stamp: 'CLASSIFIED',
    title: 'The Neural Nexus',
    lines: [1, 0.75],
  },
  {
    stamp: 'LAUNCH DAY',
    title: 'Oracle Engine',
    lines: [1, 0.6],
  },
  {
    stamp: 'ENCRYPTED',
    title: 'Cognitive Mesh',
    lines: [0.8, 0.9],
  },
  {
    stamp: 'PROJECT ORACLE',
    title: 'Quantum Ledger',
    lines: [1, 0.5],
  },
];

const Classified: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.classified-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top bottom-=60',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="unveil" 
      ref={sectionRef}
      className="relative z-10 py-24 md:py-40 px-6 md:px-12 overflow-hidden scanlines"
      style={{ background: '#0B0B0D' }}
    >
      <div className="relative z-[2] max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow">Classified</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mt-4 mb-4">
            Coming on <span className="italic gradient-text">Launch Day.</span>
          </h2>
          <p className="text-atedd-text-muted text-sm max-w-xl mx-auto">
            These features are real. You're not cleared to see them yet.
          </p>
        </div>

        {/* Locked cards grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lockedCards.map((card) => (
            <div
              key={card.stamp}
              className="classified-card card-lift p-8 rounded-2xl border border-white/[0.06] overflow-hidden relative group"
              style={{ background: '#111114' }}
            >
              {/* Stamp overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <span 
                  className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.4em] text-atedd-gold border-2 border-atedd-gold px-3 py-1.5"
                  style={{ transform: 'rotate(-15deg)' }}
                >
                  {card.stamp}
                </span>
              </div>

              {/* Blurred content */}
              <div className="feature-locked relative z-10">
                <div className="w-10 h-10 bg-gray-800 rounded-lg mb-4" />
                <h5 className="text-sm font-bold text-atedd-text-primary mb-3 font-body">{card.title}</h5>
                <div className="space-y-2">
                  {card.lines.map((w, i) => (
                    <div 
                      key={i} 
                      className="h-2 bg-gray-800 rounded" 
                      style={{ width: `${w * 100}%` }} 
                    />
                  ))}
                </div>
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" 
                style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.03)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classified;
