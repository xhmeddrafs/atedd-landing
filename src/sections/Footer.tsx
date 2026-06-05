import React from 'react';
import ATEDDLogo from '../components/ATEDDLogo';

const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-16 px-6 text-center border-t border-white/[0.06] mt-12 overflow-hidden" style={{ background: '#0B0B0D' }}>
      <div className="max-w-7xl mx-auto">
        {/* Three-column layout */}
        <div className="grid md:grid-cols-3 gap-10 mb-12 items-start">
          {/* Left: Logo + wordmark + tagline */}
          <div className="text-left">
            <div className="flex items-center space-x-3 mb-4">
              <ATEDDLogo size={32} color="#C9A227" />
              <span className="font-display text-lg font-bold text-atedd-text-primary">
                ATEDD <span className="text-atedd-gold">AI</span>
              </span>
            </div>
            <p className="text-atedd-text-dim text-sm leading-relaxed">
              Building the AI backbone of Indian higher education.
            </p>
          </div>

          {/* Center: Nav links */}
          <div className="flex flex-col md:items-center space-y-3">
            {[
              { label: 'Mission', href: '#vision' },
              { label: 'Institutes', href: '#b2b' },
              { label: 'Contact', href: 'mailto:contact@atedd.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    scrollTo(link.href);
                  }
                }}
                className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-atedd-text-dim hover:text-atedd-gold transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-atedd-gold/20 mb-8" />

        {/* Watermark logo */}
        <div className="flex justify-center mb-6 opacity-[0.08]">
          <ATEDDLogo size={80} color="#C9A227" />
        </div>

        {/* Copyright */}
        <p className="font-mono text-[0.6rem] text-atedd-text-dim uppercase tracking-[0.2em]">
          &copy; 2025 ATEDD AI. Developed by <span className="text-atedd-gold">Ahmed</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
