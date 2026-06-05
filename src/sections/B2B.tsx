import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const b2bCards = [
  {
    title: 'Smart Campus Integration',
    desc: 'Deploying ATEDD as a local digital ecosystem for colleges to streamline internal communications and resource sharing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    title: 'Curriculum Mapping',
    desc: 'Custom AI training based on specific institutional syllabi and question banks for localized precision.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    title: 'Analytical Insights',
    desc: 'Providing institutions with data-driven feedback on student performance gaps to improve teaching delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '2,000+', label: 'Students' },
  { value: '\u20B940L', label: 'ARR at 2 colleges' },
  { value: 'DPDPA', label: 'Compliant' },
  { value: 'AWS', label: 'Mumbai' },
];

const B2B: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.b2b-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top bottom-=80',
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
      id="b2b" 
      ref={sectionRef}
      className="relative z-10 py-24 md:py-40 px-6 md:px-12"
      style={{ background: 'rgba(17,17,20,0.5)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow">For Institutions</span>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight mt-4">
            Empowering <span className="text-atedd-gold">Institutes.</span>
          </h2>
        </div>

        {/* 3-column card grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {b2bCards.map((card) => (
            <div
              key={card.title}
              className="b2b-card card-lift p-8 rounded-2xl border border-white/[0.06] group hover:border-atedd-gold/30 hover:shadow-glow-glow transition-all duration-500"
              style={{ background: '#111114' }}
            >
              <div className="text-atedd-gold mb-5">{card.icon}</div>
              <h4 className="text-xl font-bold text-atedd-text-primary mb-4 font-body">{card.title}</h4>
              <p className="text-atedd-text-muted text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default B2B;
