import React from 'react';

interface Principle {
  number: string;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'THINK DIFFERENT',
    description: 'Ideas before execution.',
  },
  {
    number: '02',
    title: 'BUILD WITH PURPOSE',
    description: 'Technology that serves the experience.',
  },
  {
    number: '03',
    title: 'MOVE FORWARD',
    description: 'Digital experiences built to evolve.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-30 w-full min-h-screen bg-black text-white py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-between items-center overflow-hidden border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-32 sm:gap-44">
        
        {/* 2. ABOUT PAGE OPENING */}
        <header className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-medium uppercase">
              04
            </span>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] text-white uppercase leading-none">
              ABOUT SHADOW SOZO
            </h1>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <h2
              className="font-display font-black tracking-[0.12em] text-white uppercase leading-none"
              style={{
                fontSize: 'clamp(3rem, 9.5vw, 9.5rem)',
              }}
            >
              EVERYTHING
              <br />
              STARTS IN
              <br />
              <span className="text-gold font-black">THE SHADOW.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/70 uppercase max-w-xl mt-6 leading-relaxed">
              WE TURN IDEAS INTO DIGITAL EXPERIENCES, BRANDS AND TECHNOLOGY THAT MOVE FORWARD.
            </p>
          </div>
        </header>

        {/* 3. WHO WE ARE */}
        <div className="flex flex-col items-start gap-6 border-l border-gold/40 pl-6 sm:pl-10 py-2">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            WHO WE ARE
          </span>
          <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.18em] text-white uppercase leading-tight max-w-4xl">
            SHADOW SOZO IS A DIGITAL MARKETING{' '}
            <span className="text-gold font-bold">×</span> SOFTWARE DEVELOPMENT STUDIO.
          </h3>
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/70 max-w-2xl leading-relaxed mt-2">
            We combine creative thinking, technology and digital growth to build digital experiences that move brands forward.
          </p>
        </div>

        {/* 5. OUR PHILOSOPHY */}
        <div className="flex flex-col items-start gap-6 w-full">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            OUR PHILOSOPHY
          </span>
          <h3
            className="font-display font-black tracking-[0.15em] text-white uppercase leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)',
            }}
          >
            DON'T FOLLOW THE NOISE.
            <br />
            CREATE YOUR OWN{' '}
            <span className="text-gold">SIGNAL.</span>
          </h3>
          <div className="w-full h-[1px] bg-gold/40 mt-8" />
        </div>

        {/* 6. OUR APPROACH */}
        <div className="flex flex-col items-start gap-12 w-full">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            OUR APPROACH
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 w-full">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="flex flex-col gap-4 border-t border-white/10 pt-6"
              >
                <span className="font-mono text-lg sm:text-xl tracking-[0.2em] text-gold font-medium">
                  {principle.number}
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold tracking-[0.15em] text-white uppercase">
                  {principle.title}
                </h4>
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/70 uppercase leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. BRAND PHILOSOPHY — FLY TO HIGH */}
        <div className="flex flex-col items-center text-center gap-8 py-12 w-full">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium">
            BRAND PHILOSOPHY
          </span>
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 uppercase max-w-xl leading-relaxed">
            NOT A DESTINATION. A DIRECTION. A MINDSET TO KEEP MOVING BEYOND WHERE YOU STARTED.
          </p>

          <h2
            className="font-syne font-black tracking-[0.25em] text-gold uppercase leading-none py-6 select-none"
            style={{
              fontSize: 'clamp(4rem, 14vw, 12rem)',
            }}
          >
            FLY
            <br />
            TO
            <br />
            HIGH
          </h2>
        </div>

        {/* 8. FINAL MANIFESTO */}
        <div className="flex flex-col items-start gap-8 border-t border-white/10 pt-20 w-full">
          <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.2em] text-white/90 uppercase leading-relaxed max-w-4xl">
            WE BELIEVE GREAT DIGITAL WORK SHOULD NOT JUST LOOK GOOD.
            <br />
            <span className="font-bold text-white">
              IT SHOULD MOVE PEOPLE. MOVE BRANDS. MOVE FORWARD.
            </span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 font-display text-xl sm:text-3xl font-light tracking-[0.25em] text-silver/80 uppercase pt-6">
            <span>DESIGN.</span>
            <span>DEVELOP.</span>
            <span>GROW.</span>
          </div>

          <span className="font-mono text-sm sm:text-lg tracking-[0.35em] text-gold uppercase font-semibold">
            FLY TO HIGH.
          </span>
        </div>

        {/* 9. FINAL LOGO REVEAL & FOOTER CONTAINER */}
        <footer
          id="contact"
          className="w-full flex flex-col items-center text-center pt-24 pb-12 border-t border-white/10 gap-8"
        >
          {/* Official Logo Asset */}
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

          <a
            href="#"
            className="group font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase flex items-center gap-3 hover:tracking-[0.45em] transition-all duration-300"
          >
            <span>FLY TO HIGH</span>
            <span className="text-gold group-hover:-translate-y-1 transition-transform duration-300">
              ↑
            </span>
          </a>

          <div className="w-full max-w-6xl pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-silver/50 font-mono text-xs tracking-[0.2em] uppercase">
            <span>© SHADOW SOZO</span>
            <span>DESIGN. DEVELOP. GROW.</span>
          </div>
        </footer>

      </div>
    </section>
  );
};
