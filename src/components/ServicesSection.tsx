import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  num: string;
  title: string;
  tagline: string;
  items: string[];
  description: string;
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: 'digital-marketing',
    num: '01',
    title: 'DIGITAL MARKETING',
    tagline: 'MAKE YOUR BRAND VISIBLE.',
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
    num: '02',
    title: 'SOFTWARE DEVELOPMENT',
    tagline: 'ENGINEERED FOR SCALE AND SPEED.',
    items: [
      'CUSTOM WEB APPS',
      'MOBILE APPLICATIONS',
      'ENTERPRISE SOFTWARE',
      'API & INTEGRATIONS',
      'CLOUD ARCHITECTURE',
      'TECHNICAL STRATEGY',
    ],
    description:
      'Engineering high-performance software, scalable web applications, and robust cloud infrastructure tailored to modern business demands.',
  },
  {
    id: 'branding-design',
    num: '03',
    title: 'BRANDING & DESIGN',
    tagline: 'IDENTITY THAT CAPTIVATES AUDIENCES.',
    items: [
      'VISUAL IDENTITY',
      'BRAND STRATEGY',
      'UI/UX DESIGN',
      'DESIGN SYSTEMS',
      'MOTION & ANIMATION',
      '3D & IMMERSIVE',
    ],
    description:
      'Crafting distinct visual identities and intuitive interfaces that establish brand authority and leave lasting impressions.',
  },
  {
    id: 'digital-experience',
    num: '04',
    title: 'DIGITAL EXPERIENCE',
    tagline: 'CRAFTED FOR IMMERSION AND IMPACT.',
    items: [
      'INTERACTIVE WEBSITES',
      '3D WEB EXPERIENCES',
      'CREATIVE DIRECTION',
      'MICRO-INTERACTIONS',
      'PERFORMANCE TUNING',
      'WEBGL & CANVAS',
    ],
    description:
      'Designing memorable web experiences that combine cutting-edge technology with cinematic visuals to drive deep engagement.',
  },
];

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);

  // References for direct DOM updates without React state re-renders
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const titleLetterRefs = useRef<(HTMLElement | null)[][]>(SERVICES_DATA.map(() => []));
  const taglineWordRefs = useRef<(HTMLElement | null)[][]>(SERVICES_DATA.map(() => []));
  const listItemRefs = useRef<(HTMLElement | null)[][]>(SERVICES_DATA.map(() => []));
  const descRefs = useRef<(HTMLElement | null)[]>([]);
  const navNumRefs = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Ensure all content is static and visible
      articleRefs.current.forEach((art) => {
        if (art) {
          art.style.opacity = '1';
          art.style.transform = 'none';
          art.style.position = 'relative';
          art.style.visibility = 'visible';
        }
      });
      return;
    }

    // Continuous scroll progress boundaries with ZERO empty scroll gap at top or bottom
    // Service 01: 0.00 -> 0.25
    // Service 02: 0.25 -> 0.50
    // Service 03: 0.50 -> 0.75
    // Service 04: 0.75 -> 1.00
    const ranges = [
      { start: 0.00, end: 0.25 },
      { start: 0.25, end: 0.50 },
      { start: 0.50, end: 0.75 },
      { start: 0.75, end: 1.00 },
    ];

    const updateStage = (progress: number) => {
      // Update overall progress indicator bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // Loop through each service and compute local progress
      SERVICES_DATA.forEach((_, idx) => {
        const article = articleRefs.current[idx];
        if (!article) return;

        const { start, end } = ranges[idx];
        let localProgress = 0;

        if (progress >= start && progress <= end) {
          localProgress = (progress - start) / (end - start);
        } else if (progress > end) {
          localProgress = 1;
        } else {
          localProgress = 0;
        }

        const isActiveRange = progress >= start - 0.03 && progress <= end + 0.03;
        const isCurrentActive = progress >= start && progress <= end;

        // Update nav indicator number color
        const navNum = navNumRefs.current[idx];
        if (navNum) {
          if (isCurrentActive) {
            navNum.style.color = '#D4AF37'; // Gold
            navNum.style.opacity = '1';
          } else {
            navNum.style.color = '#475569'; // Slate
            navNum.style.opacity = '0.5';
          }
        }

        if (!isActiveRange) {
          // Completely hide offstage services
          article.style.opacity = '0';
          article.style.visibility = 'hidden';
          article.style.pointerEvents = 'none';
          return;
        }

        // Service is active or cross-fading
        article.style.visibility = 'visible';
        article.style.pointerEvents = isCurrentActive ? 'auto' : 'none';

        // -------------------------------------------------------------
        // SUB-PHASE CALCULATIONS FROM MASTER LOCAL PROGRESS (0 -> 1)
        // -------------------------------------------------------------
        // 0.00 -> 0.08 : ENTER
        // 0.08 -> 0.28 : TITLE REVEAL
        // 0.28 -> 0.40 : TAGLINE REVEAL
        // 0.40 -> 0.55 : SERVICE LIST REVEAL
        // 0.55 -> 0.65 : DESCRIPTION REVEAL
        // 0.65 -> 0.92 : READING HOLD (All locked at 100% visibility)
        // 0.92 -> 1.00 : EXIT

        const sp = localProgress;

        // 1. Article Container Opacity & Transform
        let artOpacity = 0;
        let artTranslateY = 0;
        let artScale = 1;

        if (sp < 0.08) {
          const t = sp / 0.08;
          artOpacity = t;
          artTranslateY = 16 * (1 - t);
          artScale = 0.98 + 0.02 * t;
        } else if (sp <= 0.92) {
          artOpacity = 1;
          artTranslateY = 0;
          artScale = 1;
        } else {
          const t = (sp - 0.92) / 0.08;
          artOpacity = 1 - t;
          artTranslateY = -16 * t;
          artScale = 1 - 0.02 * t;
        }

        article.style.opacity = artOpacity.toFixed(3);
        article.style.transform = `translate3d(-50%, calc(-50% + ${artTranslateY.toFixed(2)}px), 0) scale(${artScale.toFixed(4)})`;

        // 2. Title Letters Reveal (Sequential)
        const letters = titleLetterRefs.current[idx];
        const numLetters = letters.length;
        if (numLetters > 0) {
          letters.forEach((letter, j) => {
            if (!letter) return;
            if (sp < 0.08) {
              letter.style.opacity = '0';
              letter.style.transform = 'translate3d(0, 16px, 0)';
              letter.style.filter = 'blur(2px)';
            } else if (sp >= 0.28) {
              letter.style.opacity = '1';
              letter.style.transform = 'translate3d(0, 0px, 0)';
              letter.style.filter = 'blur(0px)';
            } else {
              const t = (sp - 0.08) / 0.20;
              const letterP = Math.max(0, Math.min(1, t * numLetters - j));
              letter.style.opacity = letterP.toFixed(3);
              letter.style.transform = `translate3d(0, ${(16 * (1 - letterP)).toFixed(2)}px, 0)`;
              letter.style.filter = `blur(${(2 * (1 - letterP)).toFixed(2)}px)`;
            }
          });
        }

        // 3. Tagline Words Reveal (Sequential)
        const words = taglineWordRefs.current[idx];
        const numWords = words.length;
        if (numWords > 0) {
          words.forEach((word, k) => {
            if (!word) return;
            if (sp < 0.28) {
              word.style.opacity = '0';
              word.style.transform = 'translate3d(0, 14px, 0)';
            } else if (sp >= 0.40) {
              word.style.opacity = '1';
              word.style.transform = 'translate3d(0, 0px, 0)';
            } else {
              const t = (sp - 0.28) / 0.12;
              const wordP = Math.max(0, Math.min(1, t * numWords - k));
              word.style.opacity = wordP.toFixed(3);
              word.style.transform = `translate3d(0, ${(14 * (1 - wordP)).toFixed(2)}px, 0)`;
            }
          });
        }

        // 4. List Items Reveal (Sequential)
        const listItems = listItemRefs.current[idx];
        const numItems = listItems.length;
        if (numItems > 0) {
          listItems.forEach((item, m) => {
            if (!item) return;
            if (sp < 0.40) {
              item.style.opacity = '0';
              item.style.transform = 'translate3d(0, 12px, 0)';
            } else if (sp >= 0.55) {
              item.style.opacity = '1';
              item.style.transform = 'translate3d(0, 0px, 0)';
            } else {
              const t = (sp - 0.40) / 0.15;
              const itemP = Math.max(0, Math.min(1, t * numItems - m));
              item.style.opacity = itemP.toFixed(3);
              item.style.transform = `translate3d(0, ${(12 * (1 - itemP)).toFixed(2)}px, 0)`;
            }
          });
        }

        // 5. Description Reveal
        const desc = descRefs.current[idx];
        if (desc) {
          if (sp < 0.55) {
            desc.style.opacity = '0';
            desc.style.transform = 'translate3d(0, 8px, 0)';
          } else if (sp >= 0.65) {
            desc.style.opacity = '1';
            desc.style.transform = 'translate3d(0, 0px, 0)';
          } else {
            const descP = (sp - 0.55) / 0.10;
            desc.style.opacity = descP.toFixed(3);
            desc.style.transform = `translate3d(0, ${(8 * (1 - descP)).toFixed(2)}px, 0)`;
          }
        }
      });
    };

    // Single Master ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        updateStage(self.progress);
      },
    });

    // Initialize stage at progress 0
    updateStage(0);

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="services" className="relative w-full bg-black text-white border-t border-white/10">
      {/* Scroll Space Container defining tight, responsive scroll duration */}
      <div ref={containerRef} className="services-scroll-space relative w-full h-[400vh] bg-black">
        {/* Sticky Stage Container pinned in viewport */}
        <div
          ref={stickyStageRef}
          className="services-sticky-stage sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-black px-4 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8 z-10"
        >
          {/* Header Section */}
          <header className="services-intro flex items-center justify-between w-full max-w-6xl mx-auto border-b border-white/10 pb-3 sm:pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm text-gold tracking-widest font-bold">03</span>
              <h2 className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/90 uppercase font-semibold">
                SERVICES
              </h2>
            </div>
            <p className="font-mono text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block">
              WE BUILD WHAT MOVES BRANDS FORWARD.
            </p>
          </header>

          {/* Central Service Stage (All 4 services overlay cleanly centered in frame) */}
          <div className="service-stage relative w-full max-w-5xl mx-auto flex-1 min-h-0 flex items-center justify-center">
            {SERVICES_DATA.map((service, idx) => (
              <article
                key={service.id}
                ref={(el) => {
                  articleRefs.current[idx] = el;
                }}
                data-service-article={service.num}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl flex flex-col justify-center gap-4 sm:gap-5 lg:gap-6 transition-none pointer-events-none opacity-0"
                style={{ visibility: 'hidden' }}
              >
                {/* Service Header: Number & Title */}
                <div className="flex flex-col gap-1.5 sm:gap-2.5">
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span className="font-mono text-gold text-base sm:text-xl lg:text-2xl font-bold tracking-widest select-none">
                      {service.num}
                    </span>
                    <h3 className="font-display font-black tracking-tight text-white uppercase text-2xl sm:text-4xl lg:text-6xl xl:text-7xl leading-none flex flex-wrap">
                      {service.title.split('').map((char, charIdx) => (
                        <span
                          key={charIdx}
                          ref={(el) => {
                            if (!titleLetterRefs.current[idx]) {
                              titleLetterRefs.current[idx] = [];
                            }
                            titleLetterRefs.current[idx][charIdx] = el;
                          }}
                          data-service-title-letter={charIdx}
                          className="inline-block whitespace-pre will-change-transform"
                        >
                          {char}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <p className="font-mono text-gold/90 text-xs sm:text-sm lg:text-base tracking-[0.2em] font-semibold uppercase flex flex-wrap gap-x-2">
                    {service.tagline.split(' ').map((word, wordIdx) => (
                      <span
                        key={wordIdx}
                        ref={(el) => {
                          if (!taglineWordRefs.current[idx]) {
                            taglineWordRefs.current[idx] = [];
                          }
                          taglineWordRefs.current[idx][wordIdx] = el;
                        }}
                        data-service-tagline-word={wordIdx}
                        className="inline-block will-change-transform"
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Subtle Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-gold/40 via-white/20 to-transparent my-0.5 sm:my-1" />

                {/* Grid of Capabilities */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5 w-full">
                  {service.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      ref={(el) => {
                        if (!listItemRefs.current[idx]) {
                          listItemRefs.current[idx] = [];
                        }
                        listItemRefs.current[idx][itemIdx] = el;
                      }}
                      data-service-item={itemIdx}
                      className="font-mono text-[11px] sm:text-xs lg:text-sm tracking-wider text-white/90 bg-white/5 border border-white/10 rounded px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2 will-change-transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Description Paragraph */}
                <p
                  ref={(el) => {
                    descRefs.current[idx] = el;
                  }}
                  data-service-description
                  className="font-sans text-xs sm:text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed will-change-transform"
                >
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          {/* Footer Controls / Service Navigation Indicators */}
          <footer className="w-full max-w-6xl mx-auto pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              {SERVICES_DATA.map((service, idx) => (
                <span
                  key={service.id}
                  ref={(el) => {
                    navNumRefs.current[idx] = el;
                  }}
                  className="font-mono text-xs tracking-widest font-bold transition-colors duration-300 select-none cursor-default"
                  style={{ color: '#475569', opacity: 0.5 }}
                >
                  {service.num}
                </span>
              ))}
            </div>

            {/* Micro Progress Bar */}
            <div className="w-24 sm:w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gold origin-left transition-transform duration-75 will-change-transform"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
