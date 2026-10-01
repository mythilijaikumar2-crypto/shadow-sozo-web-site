import React, { useState, useEffect, useRef } from 'react';

interface Pillar {
  id: string;
  number: string;
  title: string;
  items: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 'design',
    number: '01',
    title: 'DESIGN',
    items: [
      'Visual identities',
      'UI / UX systems',
      'Digital experiences',
      'Brand storytelling',
    ],
  },
  {
    id: 'develop',
    number: '02',
    title: 'DEVELOP',
    items: [
      'Web platforms',
      'Applications',
      'Interactive technology',
      'Digital systems',
    ],
  },
  {
    id: 'grow',
    number: '03',
    title: 'GROW',
    items: [
      'Digital marketing',
      'SEO',
      'Performance marketing',
      'Digital growth',
    ],
  },
];

export const NextSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Single section-level scroll progress calculation (0.00 to 1.00)
      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      if (progress < 0.33) {
        setActiveIndex(0);
      } else if (progress < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="what-we-create"
      ref={sectionRef}
      className="relative z-30 w-full min-h-[140vh] bg-black text-white py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-between items-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-24 sm:gap-36">
        
        {/* 3. SECTION INTRO */}
        <header className="flex flex-col items-start gap-4">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-medium uppercase">
            02
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.2em] text-white uppercase leading-none">
            WHAT WE CREATE
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/70 uppercase max-w-xl mt-2 leading-relaxed">
            WE BUILD DIGITAL EXPERIENCES THAT MOVE BRANDS FORWARD.
          </p>
        </header>

        {/* 4. THREE CORE PILLARS & 6. GOLD THREAD */}
        <div className="relative w-full flex flex-col gap-24 sm:gap-36">
          
          {/* Subtle 1px Editorial Gold Thread */}
          <div
            className={`absolute left-[0.65rem] sm:left-[0.9rem] top-6 bottom-6 w-[1px] transition-colors duration-500 pointer-events-none z-0 ${
              activeIndex >= 0 ? 'bg-gold/40' : 'bg-gold/20'
            }`}
          />

          {PILLARS.map((pillar, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={pillar.id}
                className={`relative z-10 flex flex-col gap-6 transition-opacity transition-transform duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 scale-[0.99]'
                }`}
              >
                {/* Pillar Header (Number + Title) */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                  <span
                    className={`font-mono text-lg sm:text-2xl tracking-[0.2em] transition-colors duration-500 pl-8 ${
                      isActive ? 'text-gold font-semibold' : 'text-silver/40 font-normal'
                    }`}
                  >
                    {pillar.number}
                  </span>
                  
                  <h3
                    className={`font-display font-black tracking-[0.15em] uppercase transition-colors duration-500 leading-none ${
                      isActive ? 'text-white' : 'text-silver/40'
                    }`}
                    style={{
                      fontSize: 'clamp(3rem, 9vw, 9rem)',
                    }}
                  >
                    {pillar.title}
                  </h3>
                </div>

                {/* Thin Gold Divider */}
                <div
                  className={`w-full h-[1px] transition-colors duration-500 ${
                    isActive ? 'bg-gold/80' : 'bg-white/10'
                  }`}
                />

                {/* Inline Editorial Capabilities List */}
                <div className="pl-8 sm:pl-16 pt-2">
                  <p
                    className={`font-mono text-xs sm:text-sm tracking-[0.2em] uppercase leading-relaxed transition-colors duration-500 ${
                      isActive ? 'text-silver/90' : 'text-silver/40'
                    }`}
                  >
                    {pillar.items.map((item, i) => (
                      <React.Fragment key={i}>
                        <span>{item}</span>
                        {i < pillar.items.length - 1 && (
                          <span className="mx-3 text-gold/50">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 10. SECTION FINALE */}
        <footer className="w-full flex flex-col sm:flex-row sm:items-end justify-between pt-24 sm:pt-36 border-t border-white/10 gap-8">
          <div className="flex flex-col gap-1 font-display text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.25em] text-white/90 uppercase">
            <span>DESIGN.</span>
            <span>DEVELOP.</span>
            <span>GROW.</span>
          </div>

          <a
            href="#contact"
            className="group font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase flex items-center gap-3 hover:tracking-[0.45em] transition-all duration-300 sm:pb-2"
          >
            <span>FLY TO HIGH</span>
            <span className="text-gold group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </a>
        </footer>

      </div>
    </section>
  );
};


