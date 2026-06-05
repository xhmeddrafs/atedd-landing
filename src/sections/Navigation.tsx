import React, { useState, useEffect } from 'react';
import ATEDDLogo from '../components/ATEDDLogo';

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Vision', href: '#vision' },
    { label: 'Institutional', href: '#b2b' },
    { label: 'Classified', href: '#unveil' },
    { label: 'Contact', href: '#waitlist' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-atedd ${
          scrolled 
            ? 'border-b border-white/[0.06]' 
            : 'border-b border-transparent'
        }`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(11,11,13,0.7)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
          {/* Logo + Wordmark */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center space-x-3 group">
            <div className="animate-pulse-glow">
              <ATEDDLogo size={36} color="#C9A227" />
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-display text-lg font-bold text-atedd-text-primary tracking-tight">
                ATEDD <span className="text-atedd-gold">AI</span>
              </span>
              {/* Coming Soon badge */}
              <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-full border border-atedd-gold/20" style={{ background: 'rgba(201,162,39,0.1)' }}>
                <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-atedd-gold font-bold">Coming Soon</span>
                <div className="h-1.5 w-1.5 rounded-full bg-atedd-gold animate-pulse" />
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="font-mono text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full text-atedd-text-muted hover:text-atedd-text-primary hover:bg-white/[0.04] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={(e) => { e.preventDefault(); scrollTo('#waitlist'); }}
              className="ml-4 font-mono text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full bg-atedd-gold text-black font-bold hover:bg-atedd-gold-soft transition-all duration-300"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-5 h-[1.5px] bg-atedd-text-primary" />
            <span className="w-5 h-[1.5px] bg-atedd-text-primary" />
            <span className="w-3 h-[1.5px] bg-atedd-text-primary" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-atedd lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
        
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] transition-transform duration-500 ease-atedd ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'rgba(11,11,13,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 text-atedd-text-muted hover:text-atedd-text-primary transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="mt-12 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="font-mono text-sm tracking-[0.15em] uppercase py-3 px-4 rounded-xl text-atedd-text-muted hover:text-atedd-text-primary hover:bg-white/[0.04] transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={(e) => { e.preventDefault(); scrollTo('#waitlist'); }}
                className="mt-4 font-mono text-sm tracking-[0.15em] uppercase px-5 py-3.5 rounded-full bg-atedd-gold text-black font-bold text-center hover:bg-atedd-gold-soft transition-all duration-300"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
