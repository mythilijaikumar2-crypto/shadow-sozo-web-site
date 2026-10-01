import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoryText } from './StoryText';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStoryProps {
  onProgressUpdate?: (progress: number) => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({ onProgressUpdate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgressRef = useRef<number>(0);
  const visualProgressRef = useRef<number>(0);
  const [visualProgress, setVisualProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lastStateProgressRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    video.pause();
    video.currentTime = 0;

    let animationFrameId: number | null = null;

    const handleLoadedMetadata = () => {
      ScrollTrigger.refresh();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Single high-performance RAF loop: interpolates visualProgress & updates video currentTime with exact settling
    const updateLoop = () => {
      const targetP = targetProgressRef.current;
      const currentP = visualProgressRef.current;
      const diff = targetP - currentP;

      const isSettled = Math.abs(diff) < 0.00005;
      if (isSettled) {
        visualProgressRef.current = targetP;
      } else {
        visualProgressRef.current += diff * (isMobile ? 0.14 : 0.12);
      }

      const currentVisual = visualProgressRef.current;

      // Throttle React state & parent callback updates to prevent unnecessary re-renders
      if (Math.abs(currentVisual - lastStateProgressRef.current) > 0.0003 || isSettled) {
        lastStateProgressRef.current = currentVisual;
        setVisualProgress(currentVisual);
        if (onProgressUpdate) {
          onProgressUpdate(currentVisual);
        }
      }

      // Threshold-filtered video currentTime update with guaranteed final target arrival
      if (video && video.duration) {
        const targetTime = currentVisual * video.duration;
        const timeDiff = Math.abs(video.currentTime - targetTime);
        const minTimeThreshold = isMobile ? 0.04 : 0.015;

        if ((isSettled || timeDiff > minTimeThreshold) && timeDiff > 0.001 && !video.seeking) {
          if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
            try {
              (video as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTime);
            } catch {
              video.currentTime = targetTime;
            }
          } else {
            video.currentTime = targetTime;
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    // Master GSAP ScrollTrigger timeline updating targetProgressRef
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.2 : 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });
    }, section);

    return () => {
      ctx.revert();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onProgressUpdate, isMobile]);

  // Master Progress Expansion Calculation (0.00 -> 0.10)
  const expandP = Math.min(1, visualProgress / 0.10);

  // Dynamic Video Wrapper Style for Split Hero -> Fullscreen Film Expansion
  const videoWrapperStyle: React.CSSProperties = isMobile
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: `calc(48% + 52% * ${expandP})`,
        borderRadius: `0 0 ${16 * (1 - expandP)}px ${16 * (1 - expandP)}px`,
      }
    : {
        top: 0,
        left: `calc(40% * (1 - ${expandP}))`,
        width: `calc(60% + 40% * ${expandP})`,
        height: '100%',
        borderLeft: expandP < 0.99 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[650vh] sm:h-[750vh] bg-black text-white"
      aria-label="Shadow Sozo Scroll Story"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-black gpu-accelerated">
        
        {/* Dynamic Video Wrapper Container (Expands from Split 60% -> Fullscreen 100%) */}
        <div
          style={videoWrapperStyle}
          className="absolute z-0 overflow-hidden pointer-events-none select-none gpu-accelerated"
        >
          <video
            ref={videoRef}
            poster="/assets/shadow-sozo-hero-poster.webp"
            className="w-full h-full object-cover object-center pointer-events-none select-none gpu-accelerated"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/assets/shadow-sozo-story-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/assets/shadow-sozo-story.webm" type="video/webm" />
            <source src="/assets/shadow-sozo-story.mp4" type="video/mp4" />
          </video>

          {/* Video Overlay: Very subtle during split (0.25), darkens slightly as it expands to fullscreen */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 pointer-events-none"
            style={{ opacity: 0.25 + 0.55 * expandP }}
          />
        </div>

        {/* Top Spacer */}
        <div className="h-16 sm:h-24 w-full z-20" />

        {/* Story Text Overlay (passes smoothed visual progress) */}
        <StoryText progress={visualProgress} />

        {/* Bottom Progress Bar */}
        <div className="z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-between pointer-events-none">
          <div className="w-full h-[1.5px] bg-white/10 relative overflow-hidden rounded-full max-w-xs mx-auto">
            <div
              className="absolute top-0 left-0 h-full bg-gold transition-all duration-75"
              style={{ width: `${visualProgress * 100}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
