import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoryText } from './StoryText';
import { HeroMicroUI } from './HeroMicroUI';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStoryProps {
  onProgressUpdate?: (progress: number) => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({ onProgressUpdate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [masterProgress, setMasterProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    video.pause();
    video.currentTime = 0;

    let targetTime = 0;
    let animationFrameId: number | null = null;

    const handleLoadedMetadata = () => {
      ScrollTrigger.refresh();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // High performance RAF video frame handler optimized for mobile GPU decoders
    const updateVideoFrame = () => {
      if (video && video.duration) {
        if (!video.seeking) {
          const diff = Math.abs(video.currentTime - targetTime);
          const minDiff = isMobile ? 0.05 : 0.015;

          if (diff > minDiff) {
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
      }
      animationFrameId = requestAnimationFrame(updateVideoFrame);
    };

    animationFrameId = requestAnimationFrame(updateVideoFrame);

    // Master GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.3 : 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setMasterProgress(p);
          if (onProgressUpdate) {
            onProgressUpdate(p);
          }

          if (video && video.duration) {
            targetTime = p * video.duration;
          }
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
  const expandP = Math.min(1, masterProgress / 0.10);

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
            src="/assets/shadow web final_gwr_video_mvp.mp4"
            className="w-full h-full object-cover object-center pointer-events-none select-none gpu-accelerated"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Video Overlay: Very subtle during split (0.25), darkens slightly as it expands to fullscreen */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 pointer-events-none"
            style={{ opacity: 0.25 + 0.55 * expandP }}
          />
        </div>

        {/* Hero Micro UI (Viewfinder HUD, Scene Counter, Ambient Gold Light) */}
        <HeroMicroUI progress={masterProgress} />

        {/* Top Spacer */}
        <div className="h-16 sm:h-24 w-full z-20" />

        {/* Story Text Overlay (passes normalized progress) */}
        <StoryText progress={masterProgress} />

        {/* Bottom Progress Bar */}
        <div className="z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-between pointer-events-none">
          <div className="w-full h-[1.5px] bg-white/10 relative overflow-hidden rounded-full max-w-xs mx-auto">
            <div
              className="absolute top-0 left-0 h-full bg-gold transition-all duration-75"
              style={{ width: `${masterProgress * 100}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
