import React from 'react';
import { calcNormalizedState } from '../types';

interface StoryTextProps {
  progress: number; // Normalized master progress 0.0 -> 1.0
}

export const StoryText: React.FC<StoryTextProps> = ({ progress }) => {
  // Helper to compute element style and active status cleanly
  const getSceneState = (enterStart: number, enterEnd: number, exitStart: number, exitEnd: number) => {
    const s = calcNormalizedState(progress, enterStart, enterEnd, exitStart, exitEnd);
    return {
      style: {
        opacity: s.opacity,
        transform: `scale(${s.scale}) translateY(${s.translateY}px)`,
        filter: `blur(${s.blur}px)`,
        pointerEvents: s.pointerEvents,
        display: s.active ? 'flex' : 'none',
      } as React.CSSProperties,
      active: s.active,
    };
  };

  // Scene 1: 0% -> 10%
  const scene1 = getSceneState(0.0, 0.02, 0.07, 0.10);

  // Scene 2: 10% -> 25%
  const scene2 = getSceneState(0.10, 0.13, 0.22, 0.25);

  // Scene 3: 25% -> 42%
  const scene3 = getSceneState(0.25, 0.28, 0.38, 0.42);

  // Scene 4: 42% -> 62% (Staggered DESIGN, DEVELOP, GROW)
  const scene4Word1 = getSceneState(0.42, 0.45, 0.59, 0.62);
  const scene4Word2 = getSceneState(0.47, 0.50, 0.59, 0.62);
  const scene4Word3 = getSceneState(0.52, 0.55, 0.59, 0.62);

  // Scene 5: 62% -> 78%
  const scene5 = getSceneState(0.62, 0.65, 0.74, 0.78);

  // Scene 6: 78% -> 92% (RISE -> GO HIGHER)
  const scene6A = getSceneState(0.78, 0.80, 0.83, 0.85);
  const scene6B = getSceneState(0.85, 0.87, 0.90, 0.92);

  // Scene 7: 92% -> 100% (FLY -> TO -> HIGH -> Final Logo Hold)
  const scene7Fly = getSceneState(0.92, 0.935, 0.94, 0.95);
  const scene7To = getSceneState(0.945, 0.955, 0.96, 0.968);
  const scene7High = getSceneState(0.965, 0.975, 0.98, 0.985);
  const scene7Finale = getSceneState(0.98, 0.99, 1.0, 1.0); // Holds at 1.0

  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[60vh] select-none">
      
      {/* ====================================================
          SCENE 01: 0% -> 10% (Shadow Sozo Opening)
         ==================================================== */}
      <div
        style={scene1.style}
        className="flex flex-col items-center justify-center gap-4 sm:gap-6 transition-all duration-300"
      >
        <div className="relative mb-2">
          <img
            src="/assets/logo.svg"
            alt="SHADOW SOZO Logo"
            className="h-16 w-auto sm:h-24 md:h-28 object-contain drop-shadow-cinematic"
          />
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase drop-shadow-cinematic">
          SHADOW SOZO
        </h1>

        <p className="font-syne text-lg sm:text-2xl md:text-4xl font-extrabold tracking-[0.35em] text-gold-gradient uppercase drop-shadow-gold">
          FLY TO HIGH
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2 animate-scroll-pulse">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-silver/70 uppercase">
            SCROLL TO ENTER
          </span>
          <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* ====================================================
          SCENE 02: 10% -> 25% (Everything Starts in the Shadow)
         ==================================================== */}
      <div
        style={scene2.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase px-3 py-1 rounded-full border border-gold/30 bg-black/50 backdrop-blur-md">
          SCENE 01 // ORIGIN
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-tight text-white uppercase drop-shadow-cinematic">
          EVERYTHING
          <br />
          <span className="text-silver-gradient">STARTS IN THE SHADOW.</span>
        </h2>
      </div>

      {/* ====================================================
          SCENE 03: 25% -> 42% (Turn Vision into Experience)
         ==================================================== */}
      <div
        style={scene3.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase px-3 py-1 rounded-full border border-gold/30 bg-black/50 backdrop-blur-md">
          SCENE 02 // VISION
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-tight text-white uppercase drop-shadow-cinematic">
          TURN VISION
          <br />
          <span className="text-gold-gradient drop-shadow-gold">INTO EXPERIENCE.</span>
        </h2>
      </div>

      {/* ====================================================
          SCENE 04: 42% -> 62% (Staggered: DESIGN. DEVELOP. GROW.)
         ==================================================== */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 w-full min-h-[220px] sm:min-h-[280px]">
        {(scene4Word1.active || scene4Word2.active || scene4Word3.active) && (
          <div className="flex flex-col items-center justify-center gap-5 sm:gap-8 w-full">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase px-3.5 py-1.5 rounded-full border border-gold/30 bg-black/50 backdrop-blur-md">
              SCENE 03 // CRAFT
            </span>

            {/* Perfect Typographic Flex Layout */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] uppercase leading-none drop-shadow-cinematic">
              
              {/* DESIGN */}
              <div
                style={scene4Word1.style}
                className="transition-all duration-300 inline-flex items-center justify-center"
              >
                <span className="text-white hover:text-gold transition-colors">
                  DESIGN.
                </span>
              </div>

              {/* DEVELOP */}
              <div
                style={scene4Word2.style}
                className="transition-all duration-300 inline-flex items-center justify-center"
              >
                <span className="text-silver-gradient">
                  DEVELOP.
                </span>
              </div>

              {/* GROW */}
              <div
                style={scene4Word3.style}
                className="transition-all duration-300 inline-flex items-center justify-center"
              >
                <span className="text-gold-gradient drop-shadow-gold">
                  GROW.
                </span>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ====================================================
          SCENE 05: 62% -> 78% (Don't stay where you started)
         ==================================================== */}
      <div
        style={scene5.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase px-3 py-1 rounded-full border border-gold/30 bg-black/50 backdrop-blur-md">
          SCENE 04 // EVOLUTION
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-tight text-white uppercase drop-shadow-cinematic">
          DON'T STAY
          <br />
          <span className="text-silver-gradient">WHERE YOU STARTED.</span>
        </h2>
      </div>

      {/* ====================================================
          SCENE 06: 78% -> 92% (RISE -> GO HIGHER)
         ==================================================== */}
      <div style={scene6A.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-5xl sm:text-8xl md:text-9xl font-black tracking-[0.25em] text-white uppercase drop-shadow-cinematic">
          RISE.
        </h2>
      </div>

      <div style={scene6B.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-4xl sm:text-7xl md:text-9xl font-black tracking-[0.25em] text-gold-gradient uppercase drop-shadow-gold">
          GO HIGHER.
        </h2>
      </div>

      {/* ====================================================
          SCENE 07: 92% -> 100% (FLY -> TO -> HIGH Climax)
         ==================================================== */}
      <div style={scene7Fly.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-6xl sm:text-9xl font-black tracking-[0.3em] text-white uppercase">
          FLY
        </h2>
      </div>

      <div style={scene7To.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-6xl sm:text-9xl font-black tracking-[0.3em] text-silver-gradient uppercase">
          TO
        </h2>
      </div>

      <div style={scene7High.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-7xl sm:text-[11rem] font-black tracking-[0.3em] text-gold-gradient uppercase drop-shadow-gold">
          HIGH
        </h2>
      </div>

      {/* FINAL FINALE HOLD STATE (Exact Logo + FLY TO HIGH) */}
      <div
        style={scene7Finale.style}
        className="flex flex-col items-center justify-center gap-4 sm:gap-6 transition-all duration-500"
      >
        <div className="relative mb-3">
          <img
            src="/assets/logo.svg"
            alt="SHADOW SOZO Logo"
            className="h-20 w-auto sm:h-28 md:h-36 object-contain drop-shadow-gold"
          />
        </div>

        <p className="font-mono text-xs sm:text-sm tracking-[0.4em] text-silver/80 uppercase">
          SHADOW SOZO
        </p>

        <h2 className="font-syne text-4xl sm:text-7xl md:text-9xl font-black tracking-[0.25em] text-gold-gradient uppercase drop-shadow-gold">
          FLY TO HIGH
        </h2>

        <div className="mt-4 sm:mt-6">
          <a
            href="#what-we-create"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs sm:text-sm tracking-[0.25em] font-bold shadow-gold-glow"
          >
            EXPLORE STUDIO ↘
          </a>
        </div>
      </div>

    </div>
  );
};
