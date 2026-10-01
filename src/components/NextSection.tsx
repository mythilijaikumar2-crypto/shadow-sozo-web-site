import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: 'design',
    number: '01',
    title: 'DESIGN',
    items: ['Visual identities', 'UI / UX systems', 'Digital experiences', 'Brand storytelling'],
  },
  {
    id: 'develop',
    number: '02',
    title: 'DEVELOP',
    items: ['Web platforms', 'Applications', 'Interactive technology', 'Digital systems'],
  },
  {
    id: 'grow',
    number: '03',
    title: 'GROW',
    items: ['Digital marketing', 'SEO', 'Performance marketing', 'Digital growth'],
  },
] as const;

const HEADING_WORDS = ['WHAT', 'WE', 'CREATE'];
const SUB_WORDS = ['WE', 'BUILD', 'DIGITAL', 'EXPERIENCES', 'THAT', 'MOVE', 'BRANDS', 'FORWARD.'];
const FINAL_WORDS = ['DESIGN.', 'DEVELOP.', 'GROW.'];
const TYPING_TEXT = 'CREATIVE TECHNOLOGY / DIGITAL EXPERIENCES';

/* ─── HELPERS ─────────────────────────────────────────────── */
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}
function progressBand(p: number, start: number, end: number) {
  return clamp01((p - start) / (end - start));
}

/* Smooth direct-style setter – avoids creating GSAP tweens per frame */
function setStyle(el: HTMLElement | null, cssText: Partial<CSSStyleDeclaration>) {
  if (!el) return;
  Object.assign(el.style, cssText);
}

/* ─── OPACITY CURVES FOR EACH PILLAR ─────────────────────── */
function designOpacity(p: number): number {
  if (p < 0.08) return lerp(0.45, 1.0, p / 0.08);
  if (p <= 0.44) return 1.0;
  if (p <= 0.58) return lerp(1.0, 0.60, (p - 0.44) / 0.14);
  return 0.60;
}
function developOpacity(p: number): number {
  if (p < 0.30) return 0.55;
  if (p <= 0.50) return lerp(0.55, 1.0, (p - 0.30) / 0.20);
  if (p <= 0.74) return 1.0;
  if (p <= 0.84) return lerp(1.0, 0.60, (p - 0.74) / 0.10);
  return 0.60;
}
function growOpacity(p: number): number {
  if (p < 0.62) return 0.55;
  if (p <= 0.82) return lerp(0.55, 1.0, (p - 0.62) / 0.20);
  return 1.0;
}
const OPACITY_FNS = [designOpacity, developOpacity, growOpacity] as const;

/* ─── COMPONENT ───────────────────────────────────────────── */
export const NextSection: React.FC = () => {
  /* Section */
  const sectionRef = useRef<HTMLElement>(null);

  /* Header */
  const taglineRef    = useRef<HTMLSpanElement>(null);
  const hwRefs        = useRef<(HTMLSpanElement | null)[]>([]);
  const swRefs        = useRef<(HTMLSpanElement | null)[]>([]);
  const typingRef     = useRef<HTMLSpanElement>(null);
  const cursorRef     = useRef<HTMLSpanElement>(null);

  /* Thread + indicator */
  const threadRef    = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  /* Service pillars – indexed [pillarIndex] */
  const pillarRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const pillarNumRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const pillarTitleRefs  = useRef<(HTMLHeadingElement | null)[]>([]);
  const pillarDivRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const pillarDetailRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Final */
  const finalRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const flyRef    = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile       = () => window.innerWidth < 768;

    /* ── REDUCED MOTION: show everything immediately ──────── */
    if (prefersReduced) {
      [taglineRef.current, ...hwRefs.current, ...swRefs.current, ...finalRefs.current].forEach(
        el => { if (el) { el.style.opacity = '1'; el.style.transform = 'none'; } }
      );
      if (typingRef.current) typingRef.current.textContent = TYPING_TEXT;
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (threadRef.current) threadRef.current.style.transform = 'scaleY(1)';
      pillarRefs.current.forEach(el => { if (el) el.style.opacity = '1'; });
      if (flyRef.current) flyRef.current.style.opacity = '1';
      return;
    }

    /* ── INITIAL STATES ───────────────────────────────────── */
    setStyle(taglineRef.current, { opacity: '0', transform: 'translateY(20px)' });
    hwRefs.current.forEach(el => setStyle(el, { opacity: '0', transform: 'translateY(18px)' }));
    swRefs.current.forEach(el => setStyle(el, { opacity: '0', transform: 'translateY(18px)' }));
    if (threadRef.current) {
      threadRef.current.style.transformOrigin = 'top center';
      threadRef.current.style.transform = 'scaleY(0)';
    }
    pillarRefs.current.forEach((el, i) => setStyle(el, { opacity: i === 0 ? '0.65' : '0.55' }));
    finalRefs.current.forEach(el => setStyle(el, { opacity: '0', transform: 'translateY(16px) scale(0.98)' }));
    setStyle(flyRef.current, { opacity: '0', transform: 'scale(0.96)' });

    /* ── TYPING EFFECT (once) ─────────────────────────────── */
    let typingInterval: ReturnType<typeof setInterval> | null = null;
    let typingObserver: IntersectionObserver | null = null;
    let charIdx = 0;

    if (typingRef.current) {
      typingRef.current.textContent = '';
      typingObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && charIdx === 0) {
            typingInterval = setInterval(() => {
              if (!typingRef.current) return;
              charIdx++;
              typingRef.current.textContent = TYPING_TEXT.slice(0, charIdx);
              if (charIdx >= TYPING_TEXT.length) {
                clearInterval(typingInterval!);
                typingInterval = null;
                setTimeout(() => {
                  if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.4 });
                }, 700);
              }
            }, 32);
            typingObserver?.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      typingObserver.observe(section);
    }

    /* ── MAIN GSAP CONTEXT ────────────────────────────────── */
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          /* 1 · TAGLINE (02) */
          const tagP = progressBand(p, 0, 0.05);
          setStyle(taglineRef.current, {
            opacity: String(tagP),
            transform: `translateY(${20 * (1 - tagP)}px)`,
          });

          /* 2 · HEADING WORDS — WHAT WE CREATE */
          hwRefs.current.forEach((el, i) => {
            const wp = progressBand(p, 0.04 + i * 0.012, 0.04 + i * 0.012 + 0.06);
            setStyle(el, {
              opacity: String(wp),
              transform: `translateY(${18 * (1 - wp)}px)`,
            });
          });

          /* 3 · SUBTEXT WORDS */
          swRefs.current.forEach((el, i) => {
            const wp = progressBand(p, 0.14 + i * 0.011, 0.14 + i * 0.011 + 0.05);
            setStyle(el, {
              opacity: String(wp),
              transform: `translateY(${18 * (1 - wp)}px)`,
            });
          });

          /* 4 · GOLD THREAD scaleY */
          const threadP = progressBand(p, 0.10, 0.82);
          setStyle(threadRef.current, {
            transform: `scaleY(${threadP})`,
          });

          /* 5 · INDICATOR DOT position along thread */
          const opacities = OPACITY_FNS.map(fn => fn(p));
          const maxOp = Math.max(...opacities);
          const activeIdx = opacities.findIndex(o => o === maxOp);
          // Map activeIdx to a Y percentage within the thread container
          const indicatorTarget = activeIdx / (PILLARS.length - 1); // 0, 0.5, 1
          setStyle(indicatorRef.current, {
            top: `calc(${indicatorTarget * 100}% - 2.5px)`,
          });

          /* 6 · SERVICE PILLARS — continuous activation */
          PILLARS.forEach((_pillar, i) => {
            const op = opacities[i];
            const isActive = i === activeIdx;

            setStyle(pillarRefs.current[i], { opacity: String(op) });

            // Number
            setStyle(pillarNumRefs.current[i], {
              color: isActive ? '#D4AF37' : '#94A3B8',
            });

            // Title
            setStyle(pillarTitleRefs.current[i], {
              color: isActive ? '#ffffff' : '#94A3B8',
            });

            // Divider
            setStyle(pillarDivRefs.current[i], {
              backgroundColor: isActive
                ? 'rgba(212,175,55,0.80)'
                : 'rgba(255,255,255,0.10)',
            });

            // Detail text
            setStyle(pillarDetailRefs.current[i], {
              opacity: String(isActive ? 0.90 : Math.max(0.55, op * 0.85)),
            });
          });

          /* 7 · FINAL WORDS — DESIGN. DEVELOP. GROW. */
          finalRefs.current.forEach((el, i) => {
            const fp = progressBand(p, 0.84 + i * 0.045, 0.84 + i * 0.045 + 0.05);
            setStyle(el, {
              opacity: String(fp),
              transform: `translateY(${16 * (1 - fp)}px) scale(${0.98 + fp * 0.02})`,
            });
          });

          /* 8 · FLY TO HIGH link */
          const flyP = progressBand(p, 0.95, 1.0);
          setStyle(flyRef.current, {
            opacity: String(flyP),
            transform: `scale(${0.96 + flyP * 0.04})`,
          });
        },
      });
    }, section);

    /* ── DESKTOP HOVER / MAGNETIC ─────────────────────────── */
    const cleanups: (() => void)[] = [];

    if (!isMobile()) {
      /* Service title: subtle x shift */
      pillarTitleRefs.current.forEach(el => {
        if (!el) return;
        const onEnter = () => gsap.to(el, { x: 4, duration: 0.3, ease: 'power2.out' });
        const onLeave = () => gsap.to(el, { x: 0, duration: 0.4, ease: 'power2.out' });
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      });

      /* FLY TO HIGH magnetic */
      const flyEl = flyRef.current;
      if (flyEl) {
        const xTo = gsap.quickTo(flyEl, 'x', { duration: 0.45, ease: 'power2.out' });
        const yTo = gsap.quickTo(flyEl, 'y', { duration: 0.45, ease: 'power2.out' });

        const onMove = (e: MouseEvent) => {
          const r = flyEl.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.14;
          xTo(Math.max(-8, Math.min(8, dx)));
          yTo(Math.max(-8, Math.min(8, dy)));
        };
        const onLeave = () => {
          gsap.to(flyEl, { x: 0, y: 0, duration: 0.55, ease: 'power3.out' });
        };

        flyEl.addEventListener('mousemove', onMove);
        flyEl.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          flyEl.removeEventListener('mousemove', onMove);
          flyEl.removeEventListener('mouseleave', onLeave);
        });
      }
    }

    /* ── CLEANUP ──────────────────────────────────────────── */
    return () => {
      ctx.revert();
      cleanups.forEach(fn => fn());
      if (typingInterval) clearInterval(typingInterval);
      if (typingObserver) typingObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="what-we-create"
      ref={sectionRef}
      className="relative z-30 w-full min-h-[190vh] sm:min-h-[210vh] lg:min-h-[240vh] bg-black text-white pt-24 pb-32 sm:pt-32 sm:pb-40 px-6 sm:px-12 lg:px-24 flex flex-col items-center overflow-hidden border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 sm:gap-24 lg:gap-32">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <header className="flex flex-col items-start gap-3 sm:gap-4">
          <span
            ref={taglineRef}
            className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-medium uppercase"
          >
            02
          </span>

          <h2
            className="font-display font-black tracking-[0.15em] text-white uppercase leading-none flex flex-wrap gap-x-[0.25em] gap-y-0"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
            aria-label="What we create"
          >
            {HEADING_WORDS.map((word, i) => (
              <span
                key={word}
                ref={el => { hwRefs.current[i] = el; }}
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            ))}
          </h2>

          <p
            className="flex flex-wrap gap-x-[0.45em] gap-y-1 max-w-xl mt-1"
            aria-label="We build digital experiences that move brands forward."
          >
            {SUB_WORDS.map((word, i) => (
              <span
                key={`sub-${i}`}
                ref={el => { swRefs.current[i] = el; }}
                className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/80 uppercase inline-block will-change-transform"
              >
                {word}
              </span>
            ))}
          </p>

          {/* Typing micro-line */}
          <div className="flex items-center mt-2 h-4" aria-hidden="true">
            <span
              ref={typingRef}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-gold/55 uppercase"
            />
            <span
              ref={cursorRef}
              className="font-mono text-[10px] sm:text-[11px] text-gold/55 ml-[2px] select-none"
              style={{ animation: 'cursorblink 1s step-end infinite' }}
            >
              |
            </span>
          </div>
        </header>

        {/* ── PILLARS ────────────────────────────────────────── */}
        <div className="relative w-full flex flex-col gap-16 sm:gap-24 lg:gap-32">

          {/* Gold thread */}
          <div
            ref={threadRef}
            className="absolute left-[0.65rem] sm:left-[0.9rem] top-4 bottom-4 w-[1px] bg-gold/35 pointer-events-none z-0 will-change-transform"
            aria-hidden="true"
          />

          {/* Active indicator dot */}
          <div
            ref={indicatorRef}
            className="absolute left-[0.32rem] sm:left-[0.57rem] w-[6px] h-[6px] rounded-full bg-gold pointer-events-none z-10 transition-[top] duration-300 will-change-[top]"
            aria-hidden="true"
          />

          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.id}
              ref={el => { pillarRefs.current[index] = el; }}
              className="relative z-10 flex flex-col gap-4 sm:gap-5 will-change-[opacity]"
            >
              {/* Number + Title row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                <span
                  ref={el => { pillarNumRefs.current[index] = el; }}
                  className="font-mono text-lg sm:text-2xl tracking-[0.2em] font-semibold pl-8 select-none"
                >
                  {pillar.number}
                </span>

                <h3
                  ref={el => { pillarTitleRefs.current[index] = el; }}
                  className="font-display font-black tracking-[0.15em] uppercase leading-none will-change-transform"
                  style={{ fontSize: 'clamp(2.8rem, 8.5vw, 8.5rem)' }}
                >
                  {pillar.title}
                </h3>
              </div>

              {/* Gold divider */}
              <div
                ref={el => { pillarDivRefs.current[index] = el; }}
                className="w-full h-[1px]"
                aria-hidden="true"
              />

              {/* Detail items */}
              <div
                ref={el => { pillarDetailRefs.current[index] = el; }}
                className="pl-8 sm:pl-16 pt-1 will-change-[opacity]"
              >
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/85 uppercase leading-relaxed">
                  {pillar.items.map((item, i) => (
                    <React.Fragment key={i}>
                      <span>{item}</span>
                      {i < pillar.items.length - 1 && (
                        <span className="mx-3 text-gold/45" aria-hidden="true">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FINAL REVEAL ───────────────────────────────────── */}
        <footer className="w-full flex flex-col sm:flex-row sm:items-end justify-between pt-12 sm:pt-20 border-t border-white/10 gap-8">
          <div className="flex flex-col gap-0.5 sm:gap-1" aria-label="Design. Develop. Grow.">
            {FINAL_WORDS.map((word, i) => (
              <span
                key={word}
                ref={el => { finalRefs.current[i] = el; }}
                className="font-display font-light tracking-[0.25em] text-white/90 uppercase inline-block will-change-transform"
                style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
              >
                {word}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            ref={flyRef}
            className="group font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase flex items-center gap-3 sm:pb-2 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm"
          >
            <span className="relative inline-block">
              FLY TO HIGH
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ease-out"
                style={{ width: 0 }}
                aria-hidden="true"
              />
            </span>
            <span className="text-gold group-hover:translate-x-2 transition-transform duration-300 ease-out">
              →
            </span>
          </a>
        </footer>

      </div>
    </section>
  );
};
