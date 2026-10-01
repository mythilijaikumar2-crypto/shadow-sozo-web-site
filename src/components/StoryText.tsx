import React, { useEffect, useState } from 'react';
import { calcNormalizedState } from '../types';

interface StoryTextProps {
  progress: number; // Normalized master progress 0.0 -> 1.0
}

export const StoryText: React.FC<StoryTextProps> = ({ progress }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Scene 1 Split Hero -> Fullscreen Film Expansion Progress (0.00 -> 0.10)
  const expandP = Math.min(1, progress / 0.10);
  const scene1Opacity = Math.max(0, 1 - expandP);
  const scene1Style: React.CSSProperties = {
    opacity: scene1Opacity,
    transform: isMobile
      ? `translateY(${expandP * 50}px)`
      : `translateX(${-expandP * 60}px)`,
    filter: `blur(${expandP * 8}px)`,
    pointerEvents: scene1Opacity > 0.1 ? 'auto' : 'none',
    display: scene1Opacity > 0.01 ? 'flex' : 'none',
  };

  // Scene 2: 10% -> 25% (Everything starts in the shadow)
  const scene2 = getSceneState(0.10, 0.13, 0.22, 0.25);

  // Scene 3: 25% -> 42% (Turn vision into experience)
  const scene3 = getSceneState(0.25, 0.28, 0.38, 0.42);

  // Scene 4 Overall Base Container State (42% -> 62%)
  const scene4Base = getSceneState(0.42, 0.45, 0.59, 0.62);

  // Scene 4 Mathematical Item Emphasis (NO CSS duration delay)
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
    const scale = 0.98 + emphasis * 0.04;
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

  // Scene 5: 62% -> 78% (Don't stay where you started)
  const scene5 = getSceneState(0.62, 0.65, 0.74, 0.78);

  // Scene 6: 78% -> 92% (RISE -> GO HIGHER)
  const scene6A = getSceneState(0.78, 0.80, 0.83, 0.85);
  const scene6B = getSceneState(0.85, 0.87, 0.90, 0.92);

  // Scene 7: 92% -> 100% (FLY -> TO -> HIGH -> Final Logo Hold)
  const scene7Fly = getSceneState(0.92, 0.935, 0.94, 0.95);
  const scene7To = getSceneState(0.945, 0.955, 0.96, 0.968);
  const scene7High = getSceneState(0.965, 0.975, 0.98, 0.985);
  const scene7Finale = getSceneState(0.98, 0.99, 1.0, 1.0);

  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[60vh] select-none">
      
      {/* ====================================================
          SCENE 01: 0% -> 10% (Split Hero -> Fullscreen Film)
         ==================================================== */}
      {scene1Opacity > 0.01 && (
        <div
          style={scene1Style}
          className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-auto p-4 sm:p-8 md:p-12 text-left md:w-[38%]"
        >
          <div className="flex flex-col items-start gap-3 sm:gap-5 max-w-xl">
            {/* Monospaced Index & Micro Credibility Badge */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-bold">
                01
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-gold uppercase px-3 py-1 rounded-full border border-gold/30 bg-black/70 backdrop-blur-md">
                ✦ CREATIVE TECHNOLOGY STUDIO
              </span>
            </div>

            {/* Official Logo Asset */}
            <div className="relative my-1">
              <img
                src="/assets/logo.svg"
                alt="SHADOW SOZO Logo"
                className="h-12 w-auto sm:h-16 md:h-20 object-contain drop-shadow-cinematic"
              />
            </div>

            {/* Title & Brand Hook */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.18em] text-white uppercase leading-none drop-shadow-cinematic">
              SHADOW SOZO
            </h1>

            <p className="font-syne text-base sm:text-xl md:text-2xl font-extrabold tracking-[0.3em] text-gold-gradient uppercase drop-shadow-gold mt-1">
              FLY TO HIGH
            </p>
          </div>
        </div>
      )}

      {/* ====================================================
          SCENE 02: 10% -> 25% (Everything Starts in the Shadow)
         ==================================================== */}
      <div
        style={scene2.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase px-3 py-1 rounded-full border border-gold/30 bg-black/50 backdrop-blur-md">
          01 // ORIGIN
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
          02 // VISION
        </span>
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
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-silver/60 uppercase">
          SHADOW SOZO // WHAT WE BUILD
        </span>

        <div className="flex flex-col gap-5 sm:gap-7 w-full text-left">
          <div style={scene4Item1.style} className="border-l-2 pl-5 sm:pl-7">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold">01</span>
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.12em] uppercase leading-none mt-1">
              DESIGN.
            </h3>
            <p className="text-xs sm:text-sm text-silver/80 font-sans tracking-widest mt-1.5">
              Architecting Visual Identities
            </p>
          </div>

          <div style={scene4Item2.style} className="border-l-2 pl-5 sm:pl-7">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold">02</span>
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.12em] uppercase leading-none mt-1">
              DEVELOP.
            </h3>
            <p className="text-xs sm:text-sm text-silver/80 font-sans tracking-widest mt-1.5">
              Engineering High-Tech Systems
            </p>
          </div>

          <div style={scene4Item3.style} className="border-l-2 pl-5 sm:pl-7">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold">03</span>
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
          SCENE 05: 62% -> 78% (Don't stay where you started)
         ==================================================== */}
      <div
        style={scene5.style}
        className="flex flex-col items-center justify-center gap-3 sm:gap-5 transition-all duration-300"
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase px-3 py-1 rounded-full border border-gold/30 bg-black/50 backdrop-blur-md">
          04 // EVOLUTION
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
        <div className="relative mb-2">
          <img
            src="/assets/logo.svg"
            alt="SHADOW SOZO Official Logo"
            className="h-20 w-auto sm:h-28 md:h-36 object-contain drop-shadow-gold"
          />
        </div>

        <p className="font-mono text-xs sm:text-sm tracking-[0.4em] text-silver/80 uppercase">
          SHADOW SOZO
        </p>

        <h2 className="font-syne text-4xl sm:text-7xl md:text-9xl font-black tracking-[0.25em] text-gold-gradient uppercase drop-shadow-gold">
          FLY TO HIGH
        </h2>

        <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-gold uppercase px-4 py-1 rounded-full border border-gold/30 bg-black/60">
          ✦ CREATIVE TECHNOLOGY STUDIO
        </span>

        <div className="mt-4 sm:mt-6">
          <a
            href="#what-we-create"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs sm:text-sm tracking-[0.25em] font-bold shadow-gold-glow"
          >
            START A PROJECT ↗
          </a>
        </div>
      </div>

    </div>
  );
};
