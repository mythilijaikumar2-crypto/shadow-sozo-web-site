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
  const [masterProgress, setMasterProgress] = useState<number>(0);

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

    // High performance RAF frame handler for silky smooth video seeking
    const updateVideoFrame = () => {
      if (video && video.duration) {
        const diff = Math.abs(video.currentTime - targetTime);
        if (diff > 0.015) {
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
      animationFrameId = requestAnimationFrame(updateVideoFrame);
    };

    animationFrameId = requestAnimationFrame(updateVideoFrame);

    // Single Master GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrub factor
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
  }, [onProgressUpdate]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[750vh] bg-black text-white"
      aria-label="Shadow Sozo Scroll Story"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-black">
        
        {/* Background Video controlled strictly by master scroll progress */}
        <video
          ref={videoRef}
          src="/assets/shadow web final_gwr_video_mvp.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 select-none"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Cinematic Vignette & Atmospheric Black/Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

        {/* Top Navbar Spacer */}
        <div className="h-20 sm:h-24 w-full z-20" />

        {/* Master Story Text Component (receives master progress 0 -> 1) */}
        <StoryText progress={masterProgress} />

        {/* Bottom Spacer & Minimal Progress bar indicator */}
        <div className="z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-6 flex items-center justify-between">
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full max-w-xs mx-auto">
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
