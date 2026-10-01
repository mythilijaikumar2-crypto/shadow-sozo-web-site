import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  progress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ progress = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle subtle header background on scroll when closed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlay is open without resetting scroll position
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsRendered(true);
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setIsRendered(false), 500);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Support ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { number: '01', title: 'ABOUT', href: '#what-we-create' },
    { number: '02', title: 'SERVICES', href: '#what-we-create' },
    { number: '03', title: 'CONTACT', href: '#what-we-create' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isClimaxPhase = progress > 0.92;

  return (
    <>
      {/* ====================================================
          SINGLE UNIFIED TOP HEADER BAR (Z-50)
         ==================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isClimaxPhase && !isOpen ? 'opacity-30 hover:opacity-100' : 'opacity-100'
        } ${
          isScrolled && !isOpen
            ? 'bg-black/80 py-4 border-b border-white/5'
            : isOpen
            ? 'bg-transparent py-5 sm:py-6 md:py-8'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* SINGLE OFFICIAL LOGO */}
            <a
              href="#"
              onClick={(e) => {
                if (isOpen) {
                  e.preventDefault();
                  setIsOpen(false);
                }
              }}
              className="flex items-center group focus:outline-none"
              aria-label="SHADOW SOZO Home"
            >
              <img
                src="/assets/logo.svg"
                alt="SHADOW SOZO Logo"
                width="160"
                height="80"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
              />
            </a>

            {/* SINGLE TOP RIGHT CONTROLS */}
            <div className="flex items-center gap-5 sm:gap-8">
              <a
                href="#what-we-create"
                onClick={(e) => handleLinkClick(e, '#what-we-create')}
                className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 hover:text-gold transition-colors duration-300 flex items-center gap-1.5 focus:outline-none"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold/80" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-gold/60 text-white hover:text-gold flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold/50"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ====================================================
          FULLSCREEN OVERLAY (Z-40)
         ==================================================== */}
      {isRendered && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className={`fixed inset-0 z-40 bg-black/95 transition-opacity duration-500 flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-10 md:px-14 select-none overflow-hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* MAIN CONTENT AREA */}
          <div className="w-full max-w-7xl mx-auto my-auto py-4 sm:py-8 flex items-center justify-between relative z-10">
            
            {/* EDITORIAL NAVIGATION LINKS */}
            <nav className="flex flex-col gap-5 sm:gap-7 md:gap-9 items-start z-10">
              {navItems.map((item, idx) => (
                <a
                  key={item.number}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="group flex items-baseline gap-4 sm:gap-6 text-white transition-all duration-500 transform hover:translate-x-3 sm:hover:translate-x-4 focus:outline-none"
                  style={{
                    transitionDelay: isOpen ? `${60 + idx * 60}ms` : '0ms',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                  }}
                >
                  <span className="font-mono text-xs sm:text-base tracking-[0.2em] text-silver/60 group-hover:text-gold transition-colors duration-300">
                    {item.number}
                  </span>
                  <span className="font-mono text-xs sm:text-base tracking-[0.2em] text-gold transition-colors duration-300">
                    /
                  </span>
                  <span className="font-display font-normal text-white/80 group-hover:text-white transition-all duration-300 text-[clamp(40px,11vw,64px)] sm:text-[clamp(48px,5.5vw,90px)] leading-none tracking-[0.1em] uppercase">
                    {item.title}
                  </span>
                </a>
              ))}
            </nav>

            {/* ATMOSPHERIC BACKGROUND ABSTRACT GEOMETRIC LINE ART (DESKTOP) */}
            <div
              className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] xl:w-[420px] xl:h-[420px] pointer-events-none select-none transition-opacity duration-700 z-0 ${
                isOpen ? 'opacity-12' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_100s_linear_infinite]">
                <circle cx="200" cy="200" r="185" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="6 12" />
                <circle cx="200" cy="200" r="145" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="200" cy="200" r="95" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
                <polygon points="200,20 355,290 45,290" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                <polygon points="200,380 45,110 355,110" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                <rect x="110" y="110" width="180" height="180" fill="none" stroke="#D4AF37" strokeWidth="0.5" transform="rotate(45 200 200)" />
              </svg>
            </div>

          </div>

          {/* BOTTOM EDITORIAL FOOTER */}
          <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
            <div className="flex items-center gap-6 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-silver/60 uppercase">
              <a href="#" className="hover:text-gold transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-gold transition-colors">LINKEDIN</a>
              <a href="#" className="hover:text-gold transition-colors">YOUTUBE</a>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-silver/40 uppercase">
              <span>© SHADOW SOZO</span>
              <span className="text-gold/70">FLY TO HIGH</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};


