import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setStatus('loading');
    setMessage('');

    setTimeout(() => {
      setStatus('success');
      setMessage("Welcome to the future, Innovator! Check your inbox soon.");
      setEmail('');
    }, 1500);
  };

  return (
    <section 
      id="waitlist" 
      ref={sectionRef}
      className="relative z-10 py-24 md:py-40 px-6 flex flex-col items-center justify-center min-h-[60vh] text-center"
      style={{ background: '#0B0B0D' }}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.08) 0%, transparent 70%)',
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-lg w-full">
        {/* Eyebrow */}
        <span className="eyebrow">Early Access</span>

        {/* Heading */}
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mt-4 mb-4">
          Don't Get Left <span className="gradient-text">Behind.</span>
        </h2>

        {/* Sub */}
        <p className="text-atedd-text-muted text-sm md:text-base leading-relaxed mb-10">
          Join the first cohort of institutions and students stepping into AI-native education.
        </p>

        {/* Coming soon badge */}
        <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl glass-panel mb-10">
          <span className="font-mono text-sm tracking-[0.3em] uppercase text-atedd-text-primary/90">Coming Soon</span>
          <div className="h-2 w-2 rounded-full bg-atedd-gold animate-ping" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative group mb-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
              placeholder="Enter your college email"
              className="w-full px-8 py-5 pr-36 rounded-full text-atedd-text-primary placeholder:text-atedd-text-dim focus:outline-none focus:border-atedd-gold/50 transition-all text-sm"
              style={{
                background: '#111114',
                border: '1px solid #1F1F24',
                boxShadow: '0 0 20px rgba(201,162,39,0.05)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`absolute right-2 top-2 bottom-2 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                status === 'success'
                  ? 'bg-atedd-gold text-black'
                  : 'bg-atedd-gold text-black hover:bg-atedd-gold-soft'
              }`}
            >
              {status === 'loading' && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {status === 'success' && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span>
                {status === 'idle' && 'Join Waitlist'}
                {status === 'loading' && 'Processing'}
                {status === 'success' && "You're in"}
              </span>
            </button>
          </div>
        </form>

        {/* Status message */}
        {message && (
          <p className="text-green-500 text-sm mb-4">{message}</p>
        )}

        {/* Privacy note */}
        <p className="font-mono text-[0.65rem] text-atedd-text-dim mb-8">
          We don't sell your data. DPDPA 2023 compliant.
        </p>

        {/* Social proof */}
        <div className="flex items-center justify-center space-x-3">
          <div className="flex -space-x-2">
            {['A', 'R', 'S', 'M'].map((initial, i) => {
              const colors = ['#C9A227', '#FF5C2C', '#B266FF', '#CCFF00'];
              return (
                <div
                  key={initial}
                  className="w-8 h-8 rounded-full border-2 border-atedd-bg flex items-center justify-center text-xs font-bold text-black"
                  style={{ background: colors[i] }}
                >
                  {initial}
                </div>
              );
            })}
          </div>
          <span className="font-mono text-xs text-atedd-text-dim">
            142 students already joined
          </span>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
