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
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

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
        // Prevent decoder backlog if mobile browser video decoder is currently seeking
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

    // Master GSAP ScrollTrigger timeline with mobile touch scrub tuning
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.3 : 0.8, // Faster scrub response on mobile touch
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
      className="relative w-full h-[650vh] sm:h-[750vh] bg-black text-white"
      aria-label="Shadow Sozo Scroll Story"
    >
      {/* Sticky Viewport Container with Mobile Hardware Acceleration */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-black gpu-accelerated">
        
        {/* Background Video with Mobile Cover & Hardware Acceleration */}
        <video
          ref={videoRef}
          src="/assets/shadow web final_gwr_video_mvp.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 select-none gpu-accelerated"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Cinematic Vignette & Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/95 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-10" />

        {/* Top Spacer */}
        <div className="h-16 sm:h-24 w-full z-20" />

        {/* Story Text Overlay (passes normalized progress) */}
        <StoryText progress={masterProgress} />

        {/* Bottom Progress Bar */}
        <div className="z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-between">
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
