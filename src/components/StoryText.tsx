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



  // Scene 2: 10% -> 25% (Everything starts in the shadow) — CRISP HOLD: 12% -> 23%
  const scene2 = getSceneState(0.10, 0.12, 0.23, 0.25);

  // Scene 3: 25% -> 42% (Turn vision into experience) — CRISP HOLD: 27% -> 40%
  const scene3 = getSceneState(0.25, 0.27, 0.40, 0.42);

  // Scene 4 Overall Base Container State (42% -> 62%) — CRISP HOLD: 44% -> 60%
  const scene4Base = getSceneState(0.42, 0.44, 0.60, 0.62);

  // Scene 4 Mathematical Item Emphasis (Capped transition blur at 2px)
  const getScene4ItemState = (activeStart: number, activeEnd: number) => {
    if (progress < 0.42 || progress > 0.62) {
      return {
        style: {
          opacity: 0.35,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'scale(0.98)',
        } as React.CSSProperties,
        isGold: false,
      };
    }

    let emphasis = 0;
    const mid = (activeStart + activeEnd) / 2;
    const halfWidth = (activeEnd - activeStart) / 2;
    const distFromMid = Math.abs(progress - mid);

    if (progress >= activeStart && progress <= activeEnd) {
      emphasis = 1 - Math.min(1, distFromMid / halfWidth);
    } else if (progress < activeStart && activeStart === 0.42) {
      emphasis = Math.max(0, (progress - 0.42) / 0.03);
    }

    const opacity = 0.35 + emphasis * 0.65;
    const scale = 0.98 + emphasis * 0.02;
    const blur = (1 - emphasis) * 2;
    const isGold = emphasis > 0.3;

    return {
      style: {
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
        borderColor: isGold ? 'rgba(212, 175, 55, 0.7)' : 'rgba(255, 255, 255, 0.12)',
      } as React.CSSProperties,
      isGold,
    };
  };

  const scene4Item1 = getScene4ItemState(0.42, 0.49);
  const scene4Item2 = getScene4ItemState(0.49, 0.55);
  const scene4Item3 = getScene4ItemState(0.55, 0.60);

  // Scene 5: 62% -> 78% (Don't stay where you started) — CRISP HOLD: 64% -> 76%
  const scene5 = getSceneState(0.62, 0.64, 0.76, 0.78);

  // Scene 6A (RISE): 78% -> 84.5% — CRISP HOLD: 79% -> 84%
  const scene6A = getSceneState(0.78, 0.79, 0.84, 0.845);

  // INTENTIONAL CINEMATIC BREATHING PAUSE: 84.5% -> 86.0% (Pure video frame; zero text overlay)

  // Scene 6B (GO HIGHER): 86% -> 92% — CRISP HOLD: 87% -> 91%
  const scene6B = getSceneState(0.86, 0.87, 0.91, 0.92);

  // Scene 7: 92% -> 100% (Single Coherent Final Reveal Composition) — CRISP HOLD: 95% -> 100%
  const scene7Finale = getSceneState(0.92, 0.95, 1.0, 1.0);

  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[60vh] select-none">

      {/* ====================================================
          SCENE 01: 0% -> 10% (Cinematic Split Hero Opening)
         ==================================================== */}
      {progress <= 0.10 && (() => {
        const expandP = Math.min(1, progress / 0.10);
        const scene1Opacity = Math.max(0, 1 - expandP);
        const scrollHintOpacity = Math.max(0, 1 - progress / 0.025);

        return (
          <div
            style={{
              opacity: scene1Opacity,
              transform: `translateX(${-expandP * 50}px)`,
              filter: `blur(${expandP * 2}px)`,
              pointerEvents: scene1Opacity > 0.1 ? 'auto' : 'none',
              display: scene1Opacity > 0.01 ? 'flex' : 'none',
            }}
            className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-auto p-6 sm:p-10 md:p-14 text-left md:w-[40%] select-none"
          >
            <div className="flex flex-col items-start gap-4 sm:gap-6 max-w-xl">
              {/* Official Supplied Logo Asset */}
              <div className="relative">
                <img
                  src="/assets/logo.svg"
                  alt="SHADOW SOZO Official Logo"
                  width="320"
                  height="160"
                  className="h-12 w-auto sm:h-16 md:h-20 object-contain"
                />
              </div>

              {/* Editorial Category Positioning Line (Natural multi-line wrapping) */}
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 uppercase font-medium leading-relaxed">
                DIGITAL MARKETING <span className="text-gold font-bold">×</span>
                <br />
                SOFTWARE DEVELOPMENT
              </p>

              {/* Main Brand Hook Tagline */}
              <p className="font-syne text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.35em] text-gold uppercase mt-1">
                FLY TO HIGH
              </p>

              {/* Interaction Scroll Hint */}
              {scrollHintOpacity > 0.01 && (
                <div
                  className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.3em] text-silver/60 uppercase mt-4 transition-opacity duration-300"
                  style={{ opacity: scrollHintOpacity }}
                >
                  <span>SCROLL TO ENTER</span>
                  <span className="text-gold animate-bounce">↓</span>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ====================================================
          SCENE 02: 10% -> 25% (Everything Starts in the Shadow)
         ==================================================== */}
      <div
        style={scene2.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
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
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-tight text-white uppercase drop-shadow-cinematic">
          TURN VISION
          <br />
          <span className="text-gold-gradient drop-shadow-gold">INTO EXPERIENCE.</span>
        </h2>
      </div>

      {/* ====================================================
          SCENE 04: 42% -> 62% (Hybrid Editorial Studio Pillars)
         ==================================================== */}
      <div
        style={scene4Base.style}
        className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-3xl min-h-[320px]"
      >
        <div className="flex flex-col gap-5 sm:gap-7 w-full text-left">
          <div style={scene4Item1.style} className="border-l-2 pl-5 sm:pl-7">
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.12em] uppercase leading-none mt-1">
              DESIGN.
            </h3>
            <p className="text-xs sm:text-sm text-silver/80 font-sans tracking-widest mt-1.5">
              Architecting Visual Identities
            </p>
          </div>

          <div style={scene4Item2.style} className="border-l-2 pl-5 sm:pl-7">
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.12em] uppercase leading-none mt-1">
              DEVELOP.
            </h3>
            <p className="text-xs sm:text-sm text-silver/80 font-sans tracking-widest mt-1.5">
              Engineering High-Tech Systems
            </p>
          </div>

          <div style={scene4Item3.style} className="border-l-2 pl-5 sm:pl-7">
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.12em] uppercase leading-none mt-1">
              GROW.
            </h3>
            <p className="text-xs sm:text-sm text-silver/80 font-sans tracking-widest mt-1.5">
              Scaling Digital Experiences
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          SCENE 05: 62% -> 78% (Don't Stay Where You Started)
         ==================================================== */}
      <div
        style={scene5.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-tight text-white uppercase drop-shadow-cinematic">
          DON'T STAY
          <br />
          <span className="text-silver-gradient">WHERE YOU STARTED.</span>
        </h2>
      </div>

      {/* ====================================================
          SCENE 06A: 78% -> 84.5% (RISE)
         ==================================================== */}
      <div style={scene6A.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-5xl sm:text-8xl md:text-9xl font-black tracking-[0.25em] text-white uppercase drop-shadow-cinematic">
          RISE.
        </h2>
      </div>

      {/* ✦ INTENTIONAL CINEMATIC BREATHING PAUSE (0.845 -> 0.860) ✦ */}

      {/* ====================================================
          SCENE 06B: 86.0% -> 92% (GO HIGHER)
         ==================================================== */}
      <div style={scene6B.style} className="flex flex-col items-center justify-center transition-all duration-300">
        <h2 className="font-syne text-4xl sm:text-7xl md:text-9xl font-black tracking-[0.25em] text-gold-gradient uppercase drop-shadow-gold">
          GO HIGHER.
        </h2>
      </div>

      {/* ====================================================
          SCENE 07: 92% -> 100% (Single Coherent Final Reveal Composition)
         ==================================================== */}
      <div
        style={scene7Finale.style}
        className="flex flex-col items-center justify-center gap-4 sm:gap-6 transition-all duration-500 select-none"
      >
        {/* Official Logo Asset */}
        <div className="relative mb-1">
          <img
            src="/assets/logo.svg"
            alt="SHADOW SOZO Official Logo"
            width="320"
            height="160"
            className="h-16 w-auto sm:h-24 md:h-32 object-contain"
          />
        </div>

        {/* Refined Tracked Editorial Subtitle */}
        <h2 className="font-syne text-xl sm:text-3xl md:text-4xl font-semibold tracking-[0.35em] text-gold uppercase">
          FLY TO HIGH
        </h2>

        {/* Minimal Editorial Text CTA */}
        <div className="mt-4 sm:mt-6">
          <a
            href="#what-we-create"
            className="group inline-flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/90 group-hover:text-gold transition-colors duration-300 uppercase font-medium">
              START A PROJECT ↗
            </span>
            <div className="w-full h-[1px] bg-gold/50 group-hover:bg-gold transition-colors duration-300" />
          </a>
        </div>
      </div>

    </div>
  );
};
