import React, { useEffect, useState } from 'react';
import { getSceneNumberStr } from '../types';

interface HeroMicroUIProps {
  progress: number;
}

export const HeroMicroUI: React.FC<HeroMicroUIProps> = ({ progress }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sceneInfo = getSceneNumberStr(progress);

  // Subtle desktop mouse movement tracking for ambient gold light
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 30; // Max 30px subtle shift
      const y = ((e.clientY / innerHeight) - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // HUD opacity fades away gracefully as user enters main story (0% -> 15%)
  const hudOpacity = Math.max(0, 1 - progress / 0.15);
  // Hero scroll prompt opacity fades out quickly (0% -> 8%)
  const scrollPromptOpacity = Math.max(0, 1 - progress / 0.08);

  return (
    <>
      {/* ----------------------------------------------------
          1. SUBTLE AMBIENT GOLD LIGHT (Behind Logo)
         ---------------------------------------------------- */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          opacity: Math.max(0.2, 0.6 - progress * 0.4),
        }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] filter blur-3xl pointer-events-none" />
      </div>

      {/* ----------------------------------------------------
          2. CINEMATIC VIEWFINDER HUD CORNERS (Fades on Scroll)
         ---------------------------------------------------- */}
      <div
        className="pointer-events-none fixed inset-0 z-30 p-6 sm:p-10 flex flex-col justify-between transition-opacity duration-500 hidden sm:flex"
        style={{ opacity: hudOpacity }}
        aria-hidden="true"
      >
        {/* Top Viewfinder Markers */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-silver/40">
          <div className="flex items-center gap-3">
            <span className="text-gold/60 font-bold">┌</span>
            <span>[ 16:9 // DIGITAL FILM ]</span>
          </div>
          <div className="flex items-center gap-3">
            <span>[ SHADOW SOZO // DIGITAL ]</span>
            <span className="text-gold/60 font-bold">┐</span>
          </div>
        </div>

        {/* Bottom Viewfinder Markers */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-silver/40">
          <div>
            <span className="text-gold/60 font-bold">└</span>
          </div>
          <div>
            <span className="text-gold/60 font-bold">┘</span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          3. SCROLL INDICATOR (Bottom Center - Fades Quickly)
         ---------------------------------------------------- */}
      {scrollPromptOpacity > 0.01 && (
        <div
          className="fixed bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
          style={{ opacity: scrollPromptOpacity }}
        >
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.35em] text-silver/80 uppercase">
            <span>SCROLL TO ENTER</span>
          </div>
          {/* Subtle Thin Gold Ring Indicator */}
          <div className="w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1.5 shadow-gold-glow">
            <div className="w-1 h-2 rounded-full bg-gold animate-scroll-pulse" />
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          4. SCENE INDICATOR (Bottom Right - Synchronized)
         ---------------------------------------------------- */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-10 z-30 pointer-events-none flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.25em] text-silver/60 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span className="text-gold font-bold">{sceneInfo.current}</span>
        <span className="text-silver/40 hidden sm:inline">// {sceneInfo.label}</span>
      </div>
    </>
  );
};
