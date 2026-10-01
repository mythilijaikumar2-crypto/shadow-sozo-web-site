import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  progress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ progress = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', href: '#what-we-create' },
    { label: 'SERVICES', href: '#what-we-create' },
    { label: 'ABOUT', href: '#what-we-create' },
    { label: 'CONTACT', href: '#what-we-create' },
  ];

  // During final climax (progress > 0.92), reduce navbar prominence so visual is dominant
  const isClimaxPhase = progress > 0.92;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isClimaxPhase ? 'opacity-30 hover:opacity-100' : 'opacity-100'
        } ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand Name */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none rounded-lg p-1"
              aria-label="SHADOW SOZO Home"
            >
              <img
                src="/assets/logo.svg"
                alt="SHADOW SOZO Logo"
                className="h-7 w-auto sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display tracking-[0.25em] text-xs sm:text-sm font-bold text-white group-hover:text-gold transition-colors duration-300">
                SHADOW SOZO
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-xs tracking-[0.2em] text-silver/80 hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden md:flex items-center">
              <a
                href="#what-we-create"
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-[0.18em] font-medium border border-gold/40 bg-black/40 text-white hover:border-gold hover:bg-gold hover:text-black transition-all duration-500 overflow-hidden shadow-sm hover:shadow-gold-glow"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-silver hover:text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gold" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden transition-all duration-500 flex flex-col justify-between p-6 pt-28 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6 items-start">
          <p className="text-[10px] tracking-[0.3em] text-gold uppercase font-mono">
            Navigation
          </p>
          <nav className="flex flex-col gap-5 w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-2xl tracking-[0.2em] text-white hover:text-gold transition-colors py-2 border-b border-white/5 w-full flex justify-between items-center"
              >
                <span>{link.label}</span>
                <span className="text-xs text-gold/60 font-mono">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="w-full pt-6 border-t border-white/10 flex flex-col gap-4">
          <a
            href="#what-we-create"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 rounded-full bg-gold text-black font-medium text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-center tracking-[0.2em] text-silver/40">
            SHADOW SOZO — FLY TO HIGH
          </p>
        </div>
      </div>
    </>
  );
};
