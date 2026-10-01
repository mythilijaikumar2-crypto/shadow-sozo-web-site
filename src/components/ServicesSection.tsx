import React, { useState, useEffect, useRef } from 'react';

interface ServiceBlock {
  id: string;
  number: string;
  title: string;
  hook: string;
  items: string[];
  description: string;
}

const SERVICES: ServiceBlock[] = [
  {
    id: 'digital-marketing',
    number: '01',
    title: 'DIGITAL MARKETING',
    hook: 'MAKE YOUR BRAND VISIBLE.',
    items: [
      'SEO',
      'SOCIAL MEDIA MARKETING',
      'PERFORMANCE MARKETING',
      'CONTENT MARKETING',
      'SEARCH VISIBILITY',
      'DIGITAL GROWTH',
    ],
    description:
      'We build digital marketing systems that improve visibility, reach the right audience and create sustainable growth.',
  },
  {
    id: 'software-development',
    number: '02',
    title: 'SOFTWARE DEVELOPMENT',
    hook: 'TURN IDEAS INTO TECHNOLOGY.',
    items: [
      'WEBSITE DEVELOPMENT',
      'WEB APPLICATIONS',
      'MOBILE APPLICATIONS',
      'CUSTOM SOFTWARE',
      'BUSINESS SYSTEMS',
      'DIGITAL PLATFORMS',
    ],
    description:
      'From websites to custom digital systems, we build technology around real business needs.',
  },
  {
    id: 'branding-design',
    number: '03',
    title: 'BRANDING & DESIGN',
    hook: 'GIVE YOUR IDEA AN IDENTITY.',
    items: [
      'BRAND IDENTITY',
      'LOGO SYSTEMS',
      'UI / UX DESIGN',
      'VISUAL SYSTEMS',
      'CREATIVE DIRECTION',
      'DIGITAL DESIGN',
    ],
    description:
      'We create visual systems that give brands a clear identity across digital experiences.',
  },
  {
    id: 'digital-experience',
    number: '04',
    title: 'DIGITAL EXPERIENCE',
    hook: 'MAKE PEOPLE FEEL THE DIFFERENCE.',
    items: [
      'INTERACTIVE WEBSITES',
      'MOTION & INTERACTION',
      'DIGITAL EXPERIENCES',
      'CAMPAIGN EXPERIENCES',
      'CONVERSION-FOCUSED EXPERIENCES',
    ],
    description:
      'We combine design, technology and interaction to create digital experiences that are memorable and purposeful.',
  },
];

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      if (progress < 0.25) {
        setActiveIndex(0);
      } else if (progress < 0.50) {
        setActiveIndex(1);
      } else if (progress < 0.75) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
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
      id="services"
      ref={sectionRef}
      className="relative z-30 w-full min-h-[160vh] bg-black text-white py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-between items-center overflow-hidden border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-32 sm:gap-44">
        
        {/* 2. PAGE OPENING */}
        <header className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-medium uppercase">
              03
            </span>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] text-white uppercase leading-none">
              SERVICES
            </h1>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <h2
              className="font-display font-black tracking-[0.12em] text-white uppercase leading-none"
              style={{
                fontSize: 'clamp(3rem, 9.5vw, 9.5rem)',
              }}
            >
              WE BUILD
              <br />
              WHAT MOVES
              <br />
              <span className="text-gold font-black">BRANDS FORWARD.</span>
            </h2>

            <div className="flex flex-col gap-2 mt-4">
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
                DIGITAL MARKETING <span className="font-bold">×</span> SOFTWARE DEVELOPMENT
              </p>
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/70 uppercase max-w-xl leading-relaxed">
                We combine strategy, creativity and technology to create digital experiences, systems and growth engines.
              </p>
            </div>
          </div>
        </header>

        {/* 3. SERVICES INTRODUCTION */}
        <div className="flex flex-col items-start gap-6 border-l border-gold/40 pl-6 sm:pl-10 py-2">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            WHAT WE DO
          </span>
          <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.18em] text-white uppercase leading-tight max-w-4xl">
            FROM FIRST IDEA TO DIGITAL EXPERIENCE.
          </h3>
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/70 max-w-2xl leading-relaxed mt-2">
            We design brands, build technology and create digital experiences designed to move businesses forward.
          </p>
        </div>

        {/* 4. MAIN SERVICE SYSTEM */}
        <div className="relative w-full flex flex-col gap-28 sm:gap-36">
          
          {/* Subtle Vertical Gold Thread Line */}
          <div className="absolute left-[0.65rem] sm:left-[0.9rem] top-6 bottom-6 w-[1px] bg-gold/25 pointer-events-none z-0" />

          {SERVICES.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={service.id}
                className={`relative z-10 flex flex-col gap-6 transition-opacity transition-transform duration-500 ease-out ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.99]'
                }`}
              >
                {/* Service Number + Title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                  <span
                    className={`font-mono text-lg sm:text-2xl tracking-[0.2em] transition-colors duration-500 pl-8 ${
                      isActive ? 'text-gold font-semibold' : 'text-silver/40 font-normal'
                    }`}
                  >
                    {service.number}
                  </span>

                  <div className="flex flex-col gap-2">
                    <h3
                      className={`font-display font-black tracking-[0.15em] uppercase transition-colors duration-500 leading-none ${
                        isActive ? 'text-white' : 'text-silver/40'
                      }`}
                      style={{
                        fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase transition-colors duration-500 ${
                        isActive ? 'text-gold font-medium' : 'text-silver/40'
                      }`}
                    >
                      {service.hook}
                    </p>
                  </div>
                </div>

                {/* Thin Divider */}
                <div
                  className={`w-full h-[1px] transition-colors duration-500 ${
                    isActive ? 'bg-gold/80' : 'bg-white/10'
                  }`}
                />

                {/* Service Details Inline Capabilities */}
                <div className="pl-8 sm:pl-16 flex flex-col gap-4">
                  <p
                    className={`font-mono text-xs sm:text-sm tracking-[0.2em] uppercase leading-relaxed transition-colors duration-500 ${
                      isActive ? 'text-silver/90' : 'text-silver/40'
                    }`}
                  >
                    {service.items.map((item, i) => (
                      <React.Fragment key={i}>
                        <span>{item}</span>
                        {i < service.items.length - 1 && (
                          <span className="mx-3 text-gold/50">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>

                  <p
                    className={`font-mono text-xs sm:text-sm tracking-[0.2em] max-w-2xl leading-relaxed transition-colors duration-500 ${
                      isActive ? 'text-silver/70' : 'text-silver/40'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 10. SERVICE TRANSITION */}
        <div className="flex flex-col items-start gap-8 border-t border-white/10 pt-20 w-full">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            ONE IDEA. MANY POSSIBILITIES.
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 font-display text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.25em] text-white uppercase">
            <span>STRATEGY.</span>
            <span>DESIGN.</span>
            <span>DEVELOPMENT.</span>
            <span>GROWTH.</span>
          </div>
        </div>

        {/* 11. DESIGN. DEVELOP. GROW. */}
        <div className="flex flex-col items-center text-center gap-8 py-12 border-t border-white/10 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.2em] text-white uppercase">
            <span>DESIGN.</span>
            <span>DEVELOP.</span>
            <span>GROW.</span>
          </div>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/70 uppercase max-w-xl leading-relaxed mt-4">
            ALL WORKING TOWARD THE SAME DIRECTION.
          </p>

          <span className="font-mono text-sm sm:text-lg tracking-[0.35em] text-gold uppercase font-bold">
            FLY TO HIGH.
          </span>
        </div>

        {/* 12. FINAL CTA */}
        <div className="flex flex-col items-start gap-8 border-t border-white/10 pt-20 w-full">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            READY TO MOVE FORWARD?
          </span>

          <h3 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black tracking-[0.15em] text-white uppercase leading-tight max-w-4xl">
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span className="text-gold">THAT MOVES.</span>
          </h3>

          <a
            href="#contact"
            className="group font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase flex items-center gap-3 hover:tracking-[0.45em] transition-all duration-300 pt-4"
          >
            <span>LET'S TALK</span>
            <span className="text-gold group-hover:translate-x-1.5 transition-transform duration-300">
              ↗
            </span>
          </a>
        </div>

        {/* 13. FINAL LOGO MOMENT */}
        <div className="w-full flex flex-col items-center text-center pt-20 pb-8 border-t border-white/10 gap-6">
          <div className="relative mb-2">
            <img
              src="/assets/logo.svg"
              alt="SHADOW SOZO Official Logo"
              width="320"
              height="160"
              className="h-16 w-auto sm:h-24 md:h-32 object-contain"
            />
          </div>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 uppercase">
            DIGITAL MARKETING <span className="text-gold font-bold">×</span> SOFTWARE DEVELOPMENT
          </p>

          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase font-semibold">
            FLY TO HIGH
          </span>
        </div>

      </div>
    </section>
  );
};
