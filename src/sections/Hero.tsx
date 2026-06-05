import React, { useEffect, useRef, useState, useCallback } from 'react';
import TerrainCanvas from '../components/TerrainCanvas';

const SCRAMBLE_WORDS = ['Smarter.', 'Faster.', 'Deeper.', 'Together.'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const Hero: React.FC = () => {
  const [displayWord, setDisplayWord] = useState(SCRAMBLE_WORDS[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Text scramble effect
  const runScramble = useCallback((targetWord: string) => {
    setIsScrambling(true);
    let frame = 0;
    const maxFrames = 40;
    const swapProb = 0.28;

    if (scrambleRef.current) clearInterval(scrambleRef.current);

    scrambleRef.current = setInterval(() => {
      frame++;
      const progress = frame / maxFrames;
      
      let result = '';
      for (let i = 0; i < targetWord.length; i++) {
        if (i / targetWord.length < progress) {
          result += targetWord[i];
        } else if (Math.random() < swapProb) {
          result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        } else {
          result += targetWord[i];
        }
      }
      
      setDisplayWord(result);

      if (frame >= maxFrames) {
        setDisplayWord(targetWord);
        setIsScrambling(false);
        if (scrambleRef.current) clearInterval(scrambleRef.current);
      }
    }, 50);
  }, []);

  // Cycle through words
  useEffect(() => {
    let currentIndex = 0;
    cycleRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % SCRAMBLE_WORDS.length;
      runScramble(SCRAMBLE_WORDS[currentIndex]);
    }, 3000);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    };
  }, [runScramble]);

  const scrollToVision = () => {
    const el = document.querySelector('#vision');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6 overflow-hidden">
      {/* Three.js terrain background */}
      <TerrainCanvas />

      {/* Radial gradient overlay for readability */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, #050505 85%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto pt-20">
        {/* Eyebrow */}
        <div className="walk-in delay-100 mb-8">
          <span className="eyebrow">The Future of Learning is Here</span>
        </div>

        {/* H1 */}
        <div className="walk-in-up delay-200">
          <h1 
            className="font-display font-bold tracking-tight leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
          >
            <span className="block text-atedd-text-primary">Unlock Your</span>
            <span className="block gradient-text">True Potential.</span>
          </h1>
        </div>

        {/* Sub-headline with scramble */}
        <div className="walk-in-up delay-400">
          <p className="text-atedd-text-muted text-lg md:text-xl leading-relaxed font-light mb-4 max-w-2xl">
            The AI-first digital ecosystem built specifically for the{' '}
            <span className="text-atedd-text-primary font-medium">modern Indian student.</span>
            <br className="hidden md:block" />
            Stop Studying Hard.{' '}
            <span className="text-atedd-gold italic font-medium">Start Studying </span>
            <span className={`text-atedd-gold font-bold ${isScrambling ? 'opacity-90' : ''}`}>
              {displayWord}
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div className="walk-in-up delay-500 flex flex-col sm:flex-row items-center gap-4 mt-8 mb-12">
          <a
            href="#vision"
            onClick={(e) => { e.preventDefault(); scrollToVision(); }}
            className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-atedd-gold text-black font-semibold text-sm hover:bg-atedd-gold-soft transition-all duration-300 hover:scale-105"
          >
            <span>Explore the Vision</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#waitlist"
            onClick={(e) => { e.preventDefault(); document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center px-8 py-3.5 rounded-full border border-white/20 text-atedd-text-primary font-medium text-sm hover:border-atedd-gold/50 hover:text-atedd-gold transition-all duration-300"
          >
            Join Waitlist
          </a>
        </div>

        {/* Stat strip */}
        <div className="walk-in-up delay-700 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
          {[
            { label: 'AI', sub: 'Powered' },
            { label: 'Affordable', sub: 'Pricing' },
            { label: 'RAG', sub: 'Grounded' },
            { label: '2026', sub: 'Launch' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-lift p-5 rounded-2xl border border-white/[0.06] flex flex-col items-center justify-center text-center"
              style={{ background: '#111114' }}
            >
              <div className="font-display text-xl md:text-2xl text-atedd-gold font-bold leading-tight">{stat.label}</div>
              <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-atedd-text-dim mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-in delay-900 absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={scrollToVision}
          className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-atedd-gold transition-colors group animate-bounce"
          aria-label="Scroll down"
        >
          <svg className="w-5 h-5 text-atedd-text-muted group-hover:text-atedd-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
