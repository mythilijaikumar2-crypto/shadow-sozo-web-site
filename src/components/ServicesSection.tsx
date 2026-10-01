import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'digital-marketing',
    number: '01',
    title: 'DIGITAL MARKETING',
    titleLines: ['DIGITAL', 'MARKETING'],
    hook: 'MAKE YOUR BRAND VISIBLE.',
    hookWords: ['MAKE', 'YOUR', 'BRAND', 'VISIBLE.'],
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
    number: '02',
    title: 'SOFTWARE DEVELOPMENT',
    titleLines: ['SOFTWARE', 'DEVELOPMENT'],
    hook: 'TURN IDEAS INTO TECHNOLOGY.',
    hookWords: ['TURN', 'IDEAS', 'INTO', 'TECHNOLOGY.'],
    items: [
      'WEBSITE DEVELOPMENT',
      'WEB APPLICATIONS',
      'MOBILE APPLICATIONS',
      'CUSTOM SOFTWARE',
      'BUSINESS SYSTEMS',
      'DIGITAL PLATFORMS',
    ],
    description:
      'From websites to custom digital systems, we build technology around real business needs.',
  },
  {
    id: 'branding-design',
    number: '03',
    title: 'BRANDING & DESIGN',
    titleLines: ['BRANDING', '& DESIGN'],
    hook: 'GIVE YOUR IDEA AN IDENTITY.',
    hookWords: ['GIVE', 'YOUR', 'IDEA', 'AN', 'IDENTITY.'],
    items: [
      'BRAND IDENTITY',
      'LOGO SYSTEMS',
      'UI / UX DESIGN',
      'VISUAL SYSTEMS',
      'CREATIVE DIRECTION',
      'DIGITAL DESIGN',
    ],
    description:
      'We create visual systems that give brands a clear identity across digital experiences.',
  },
  {
    id: 'digital-experience',
    number: '04',
    title: 'DIGITAL EXPERIENCE',
    titleLines: ['DIGITAL', 'EXPERIENCE'],
    hook: 'MAKE PEOPLE FEEL THE DIFFERENCE.',
    hookWords: ['MAKE', 'PEOPLE', 'FEEL', 'THE', 'DIFFERENCE.'],
    items: [
      'INTERACTIVE WEBSITES',
      'MOTION & INTERACTION',
      'DIGITAL EXPERIENCES',
      'CAMPAIGN EXPERIENCES',
      'CONVERSION-FOCUSED EXPERIENCES',
    ],
    description:
      'We combine design, technology and interaction to create digital experiences that are memorable and purposeful.',
  },
] as const;

const STRATEGY_WORDS = ['STRATEGY.', 'DESIGN.', 'DEVELOPMENT.', 'GROWTH.'];
const DDG_WORDS = ['DESIGN.', 'DEVELOP.', 'GROW.'];
const CTA_WORDS = ['LET\'S', 'BUILD', 'SOMETHING', 'THAT\u00A0MOVES.'];

/* ─── HELPERS ───────────────────────────────────────────────── */
function pb(p: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)));
}
function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax === inMin) return outMin;
  const t = Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)));
  return outMin + (outMax - outMin) * t;
}
function ss(el: HTMLElement | null, css: Partial<CSSStyleDeclaration>) {
  if (el) Object.assign(el.style, css);
}
function splitLetters(text: string): string[] {
  return text.split('');
}

/* ─── PROGRESS ZONES FOR SERVICES ───────────────────────────── */
// Global Section Progress:
// 0.00–0.07  intro (03 + SERVICES)
// 0.07–0.16  opening headline (WE BUILD WHAT MOVES BRANDS FORWARD.)
// 0.16–0.22  WHAT WE DO
// 0.22–0.38  SERVICE 01
// 0.38–0.54  SERVICE 02
// 0.54–0.70  SERVICE 03
// 0.70–0.86  SERVICE 04
// 0.86–0.92  ONE IDEA / STRATEGY...
// 0.92–0.96  DESIGN. DEVELOP. GROW.
// 0.96–1.00  CTA + LOGO

const SVC_RANGES = [
  { start: 0.22, end: 0.38 },
  { start: 0.38, end: 0.54 },
  { start: 0.54, end: 0.70 },
  { start: 0.70, end: 0.86 },
];

/* ─── COMPONENT ─────────────────────────────────────────────── */
export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /* Intro refs */
  const tagNumRef  = useRef<HTMLSpanElement>(null);
  const tagLetRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hwRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  /* WHAT WE DO */
  const wwdRef      = useRef<HTMLSpanElement>(null);
  const wwdSubRef   = useRef<HTMLParagraphElement>(null);
  const wwdDescRef  = useRef<HTMLParagraphElement>(null);

  /* Services — indexed [svcIdx] */
  const svcRefs      = useRef<(HTMLElement | null)[]>([]);
  const svcNumRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const svcTitleRefs = useRef<((HTMLSpanElement | null)[])[]>(SERVICES.map(() => []));
  const svcHookRefs  = useRef<((HTMLSpanElement | null)[])[]>(SERVICES.map(() => []));
  const svcItemRefs  = useRef<((HTMLLIElement | null)[])[]>(SERVICES.map(() => []));
  const svcDescRefs  = useRef<(HTMLParagraphElement | null)[]>([]);
  const svcDivRefs   = useRef<(HTMLDivElement | null)[]>([]);

  /* Indicator */
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* Closing */
  const oneIdeaRef    = useRef<HTMLSpanElement>(null);
  const stratRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const ddgRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const allWorkRef    = useRef<HTMLParagraphElement>(null);
  const flyHighRef    = useRef<HTMLSpanElement>(null);
  const readyRef      = useRef<HTMLSpanElement>(null);
  const ctaRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const talkRef       = useRef<HTMLAnchorElement>(null);
  const logoRef       = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile       = window.innerWidth < 768;

    /* ── REDUCED MOTION: show all immediately ─────────────── */
    if (prefersReduced) {
      section.querySelectorAll('[data-animate], [data-service-article]').forEach(el => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.filter = 'none';
      });
      return;
    }

    /* ── INITIAL STATES ────────────────────────────────────── */
    const hide = (el: HTMLElement | null) =>
      ss(el, { opacity: '0', transform: 'translateY(20px)' });

    hide(tagNumRef.current);
    tagLetRefs.current.forEach(el =>
      ss(el, { opacity: '0', transform: 'translateY(16px)', filter: 'blur(2px)' })
    );
    hwRefs.current.forEach(el => hide(el));
    ss(sublineRef.current, { opacity: '0', transform: 'translateY(12px)' });
    ss(wwdRef.current, { opacity: '0', transform: 'translateY(16px)' });
    ss(wwdSubRef.current, { opacity: '0', transform: 'translateY(12px)' });
    ss(wwdDescRef.current, { opacity: '0', transform: 'translateY(10px)' });

    SERVICES.forEach((_s, i) => {
      ss(svcRefs.current[i], { opacity: '0.35', transform: 'translateY(20px) scale(0.98)' });
      ss(svcNumRefs.current[i], { color: '#94A3B8' });
      svcTitleRefs.current[i].forEach(el =>
        ss(el, { opacity: '0', transform: 'translateY(20px)', filter: 'blur(2px)' })
      );
      svcHookRefs.current[i].forEach(el => hide(el));
      svcItemRefs.current[i].forEach(el => hide(el));
      ss(svcDescRefs.current[i], { opacity: '0', transform: 'translateY(8px)' });
      ss(svcDivRefs.current[i], { backgroundColor: 'rgba(255,255,255,0.10)' });
    });

    stratRefs.current.forEach(el => hide(el));
    ddgRefs.current.forEach(el => hide(el));
    ss(oneIdeaRef.current, { opacity: '0', transform: 'translateY(12px)' });
    ss(allWorkRef.current, { opacity: '0', transform: 'translateY(10px)' });
    ss(flyHighRef.current, { opacity: '0', transform: 'translateY(10px)' });
    ss(readyRef.current, { opacity: '0', transform: 'translateY(12px)' });
    ctaRefs.current.forEach(el => hide(el));
    ss(talkRef.current, { opacity: '0', transform: 'translateY(10px)' });
    ss(logoRef.current, { opacity: '0', transform: 'translateY(16px)' });

    /* ── GSAP CONTEXT ──────────────────────────────────────── */
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.4,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          /* ─ 1. INTRO (0.00–0.07) ─ */
          const tagNumP = pb(p, 0, 0.04);
          ss(tagNumRef.current, {
            opacity: String(tagNumP),
            transform: `translateY(${20 * (1 - tagNumP)}px)`,
          });
          tagLetRefs.current.forEach((el, i) => {
            const lp = pb(p, 0.03 + i * 0.004, 0.03 + i * 0.004 + 0.025);
            ss(el, {
              opacity: String(lp),
              transform: `translateY(${16 * (1 - lp)}px)`,
              filter: `blur(${2 * (1 - lp)}px)`,
            });
          });

          /* ─ 2. HEADLINE (0.07–0.16) ─ */
          hwRefs.current.forEach((el, i) => {
            const wp = pb(p, 0.07 + i * 0.013, 0.07 + i * 0.013 + 0.05);
            ss(el, { opacity: String(wp), transform: `translateY(${20 * (1 - wp)}px)` });
          });
          const subP = pb(p, 0.14, 0.18);
          ss(sublineRef.current, {
            opacity: String(subP),
            transform: `translateY(${12 * (1 - subP)}px)`,
          });

          /* ─ 3. WHAT WE DO (0.16–0.22) ─ */
          const wwdP   = pb(p, 0.16, 0.19);
          const wwdSub = pb(p, 0.18, 0.21);
          const wwdDsc = pb(p, 0.20, 0.23);
          ss(wwdRef.current, { opacity: String(wwdP), transform: `translateY(${16 * (1 - wwdP)}px)` });
          ss(wwdSubRef.current, { opacity: String(wwdSub), transform: `translateY(${12 * (1 - wwdSub)}px)` });
          ss(wwdDescRef.current, { opacity: String(wwdDsc), transform: `translateY(${10 * (1 - wwdDsc)}px)` });

          /* ─ 4. SERVICES ANIMATION SEQUENCING ─ */
          let currentActiveIdx = 0;

          SERVICES.forEach((_s, i) => {
            const z = SVC_RANGES[i];
            const sp = mapRange(p, z.start, z.end, 0, 1);

            // Phase ranges for sp (0.00 -> 1.00):
            // 0.00 -> 0.08: ENTER
            // 0.08 -> 0.25: TITLE REVEAL
            // 0.25 -> 0.36: TAGLINE REVEAL
            // 0.36 -> 0.52: SERVICE LIST REVEAL
            // 0.52 -> 0.62: DESCRIPTION REVEAL
            // 0.62 -> 0.88: READING HOLD (100% visible, static)
            // 0.88 -> 1.00: EXIT / TRANSITION

            let artOp = 0.35;
            let artY = 20;
            let artScale = 0.98;

            if (p >= z.start - 0.04 && p < z.start) {
              const ep = mapRange(p, z.start - 0.04, z.start, 0, 1);
              artOp = 0.35 + ep * 0.10;
              artY = 20 * (1 - ep);
              artScale = 0.98 + ep * 0.01;
            } else if (sp >= 0 && sp < 0.08) {
              const ep = mapRange(sp, 0, 0.08, 0, 1);
              artOp = 0.45 + ep * 0.55;
              artY = 0;
              artScale = 0.99 + ep * 0.01;
            } else if (sp >= 0.08 && sp <= 0.88) {
              artOp = 1.0;
              artY = 0;
              artScale = 1.0;
              currentActiveIdx = i;
            } else if (sp > 0.88) {
              const exitP = mapRange(sp, 0.88, 1.00, 0, 1);
              artOp = 1.0 - exitP * 0.65; // 1.0 -> 0.35
              artY = -20 * exitP;
              artScale = 1.0 - exitP * 0.02;
            } else if (p >= z.end) {
              artOp = 0.35;
              artY = -20;
              artScale = 0.98;
            }

            ss(svcRefs.current[i], {
              opacity: String(artOp),
              transform: `translateY(${artY}px) scale(${artScale})`,
            });

            const isAct = sp >= 0.08 && sp <= 0.88;
            ss(svcNumRefs.current[i], { color: isAct ? '#D4AF37' : '#94A3B8' });
            ss(svcDivRefs.current[i], {
              backgroundColor: isAct ? 'rgba(212,175,55,0.80)' : 'rgba(255,255,255,0.10)',
            });

            /* TITLE LETTERS REVEAL (0.08 -> 0.25) */
            const titleP = mapRange(sp, 0.08, 0.25, 0, 1);
            const letters = svcTitleRefs.current[i];
            const totalL = letters.length;
            letters.forEach((el, li) => {
              let lp = 0;
              if (sp >= 0.25) {
                lp = 1.0; // Locked at 1.0 during HOLD & EXIT
              } else if (sp < 0.08) {
                lp = 0.0;
              } else {
                const staggerStart = (li / Math.max(1, totalL)) * 0.6;
                lp = mapRange(titleP, staggerStart, staggerStart + 0.4, 0, 1);
              }
              ss(el, {
                opacity: String(lp),
                transform: `translateY(${20 * (1 - lp)}px)`,
                filter: `blur(${2 * (1 - lp)}px)`,
              });
            });

            /* TAGLINE WORDS REVEAL (0.25 -> 0.36) */
            const taglineP = mapRange(sp, 0.25, 0.36, 0, 1);
            const words = svcHookRefs.current[i];
            const totalW = words.length;
            words.forEach((el, wi) => {
              let wp = 0;
              if (sp >= 0.36) {
                wp = 1.0; // Locked at 1.0 during HOLD & EXIT
              } else if (sp < 0.25) {
                wp = 0.0;
              } else {
                const staggerStart = (wi / Math.max(1, totalW)) * 0.6;
                wp = mapRange(taglineP, staggerStart, staggerStart + 0.4, 0, 1);
              }
              ss(el, {
                opacity: String(wp),
                transform: `translateY(${20 * (1 - wp)}px)`,
              });
            });

            /* SERVICE LIST ITEMS REVEAL (0.36 -> 0.52) */
            const listP = mapRange(sp, 0.36, 0.52, 0, 1);
            const items = svcItemRefs.current[i];
            const totalI = items.length;
            items.forEach((el, ii) => {
              let ip = 0;
              if (sp >= 0.52) {
                ip = 1.0; // Locked at 1.0 during HOLD & EXIT
              } else if (sp < 0.36) {
                ip = 0.0;
              } else {
                const staggerStart = (ii / Math.max(1, totalI)) * 0.6;
                ip = mapRange(listP, staggerStart, staggerStart + 0.4, 0, 1);
              }
              ss(el, {
                opacity: String(ip),
                transform: `translateY(${14 * (1 - ip)}px)`,
              });
            });

            /* DESCRIPTION REVEAL (0.52 -> 0.62) */
            const descP = mapRange(sp, 0.52, 0.62, 0, 1);
            let dp = 0;
            if (sp >= 0.62) {
              dp = 1.0; // Locked at 1.0 during HOLD & EXIT
            } else if (sp < 0.52) {
              dp = 0.0;
            } else {
              dp = descP;
            }
            ss(svcDescRefs.current[i], {
              opacity: String(dp),
              transform: `translateY(${8 * (1 - dp)}px)`,
            });
          });

          /* Indicator dots */
          dotRefs.current.forEach((el, i) => {
            ss(el, { color: i === currentActiveIdx ? '#D4AF37' : '#475569' });
          });

          /* ─ 5. ONE IDEA / STRATEGY (0.86–0.92) ─ */
          const oiP = pb(p, 0.86, 0.89);
          ss(oneIdeaRef.current, { opacity: String(oiP), transform: `translateY(${12 * (1 - oiP)}px)` });
          stratRefs.current.forEach((el, i) => {
            const sp = pb(p, 0.88 + i * 0.01, 0.88 + i * 0.01 + 0.018);
            ss(el, { opacity: String(sp), transform: `translateY(${16 * (1 - sp)}px)` });
          });

          /* ─ 6. DDG (0.92–0.96) ─ */
          ddgRefs.current.forEach((el, i) => {
            const dp = pb(p, 0.92 + i * 0.012, 0.92 + i * 0.012 + 0.02);
            ss(el, { opacity: String(dp), transform: `translateY(${14 * (1 - dp)}px) scale(${0.98 + dp * 0.02})` });
          });
          const awP = pb(p, 0.94, 0.96);
          ss(allWorkRef.current, { opacity: String(awP), transform: `translateY(${10 * (1 - awP)}px)` });
          const fhP = pb(p, 0.95, 0.97);
          ss(flyHighRef.current, { opacity: String(fhP), transform: `translateY(${10 * (1 - fhP)}px)` });

          /* ─ 7. CTA (0.96–1.00) ─ */
          const rdP = pb(p, 0.96, 0.975);
          ss(readyRef.current, { opacity: String(rdP), transform: `translateY(${12 * (1 - rdP)}px)` });
          ctaRefs.current.forEach((el, i) => {
            const cp = pb(p, 0.965 + i * 0.01, 0.965 + i * 0.01 + 0.02);
            ss(el, { opacity: String(cp), transform: `translateY(${20 * (1 - cp)}px)` });
          });
          const tkP = pb(p, 0.985, 1.0);
          ss(talkRef.current, { opacity: String(tkP), transform: `translateY(${10 * (1 - tkP)}px)` });
          const lgP = pb(p, 0.99, 1.0);
          ss(logoRef.current, { opacity: String(lgP), transform: `translateY(${16 * (1 - lgP)}px)` });
        },
      });
    }, section);

    /* ── DESKTOP MAGNETIC ─────────────────────────────────── */
    const cleanups: (() => void)[] = [];
    if (!isMobile) {
      const talkEl = talkRef.current;
      if (talkEl) {
        const xTo = gsap.quickTo(talkEl, 'x', { duration: 0.4, ease: 'power2.out' });
        const yTo = gsap.quickTo(talkEl, 'y', { duration: 0.4, ease: 'power2.out' });
        const onMove = (e: MouseEvent) => {
          const r = talkEl.getBoundingClientRect();
          xTo(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.15)));
          yTo(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * 0.15)));
        };
        const onLeave = () => gsap.to(talkEl, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
        talkEl.addEventListener('mousemove', onMove);
        talkEl.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          talkEl.removeEventListener('mousemove', onMove);
          talkEl.removeEventListener('mouseleave', onLeave);
        });
      }
    }

    return () => {
      ctx.revert();
      cleanups.forEach(fn => fn());
    };
  }, []);

  /* ── RENDER ─────────────────────────────────────────────── */
  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-30 w-full bg-black text-white border-t border-white/10 overflow-hidden min-h-[680vh] sm:min-h-[580vh] lg:min-h-[520vh]"
    >
      {/* ── INDICATOR: zero-height sticky — no blank space in flow ── */}
      <div
        className="sticky top-0 w-full pointer-events-none hidden sm:block"
        style={{ height: 0, overflow: 'visible', zIndex: 20 }}
      >
        <aside
          className="absolute right-6 sm:right-10 flex flex-col gap-4"
          style={{ top: '50vh', transform: 'translateY(-50%)' }}
        >
          {SERVICES.map((s, i) => (
            <span
              key={s.id}
              ref={el => { dotRefs.current[i] = el; }}
              className="font-mono text-[10px] tracking-[0.2em] flex items-center gap-2 transition-colors duration-300"
              style={{ color: '#475569' }}
              aria-hidden="true"
            >
              {s.number}
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </span>
          ))}
        </aside>
      </div>

      {/* Content wrapper — real content stacked in normal flow */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-12 lg:px-24 flex flex-col gap-0 pointer-events-auto">

        {/* ── ZONE 1: INTRO ─────────────────────────────────── */}
        <div className="flex flex-col gap-4 pt-24 sm:pt-32">
          <span
            ref={tagNumRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.35em] text-gold font-medium uppercase"
          >
            03
          </span>

          <h1
            className="font-display font-light tracking-[0.25em] text-white uppercase leading-none flex flex-wrap gap-x-[0.05em]"
            style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
            aria-label="Services"
          >
            {'SERVICES'.split('').map((char, i) => (
              <span
                key={i}
                ref={el => { tagLetRefs.current[i] = el; }}
                data-animate
                className="inline-block will-change-transform"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* ── ZONE 2: OPENING HEADLINE ────────────────────────── */}
        <div className="flex flex-col gap-5 pt-32 sm:pt-40">
          <h2
            className="font-display font-black tracking-[0.12em] uppercase leading-[0.9] flex flex-col"
            style={{ fontSize: 'clamp(3rem, 9.5vw, 9.5rem)' }}
            aria-label="We build what moves brands forward."
          >
            {(['WE BUILD', 'WHAT MOVES', 'BRANDS FORWARD.'] as const).map((line, li) => (
              <span key={li} className="flex flex-wrap gap-x-[0.25em]">
                {line.split(' ').map((word, wi) => {
                  const idx = li === 0 ? wi : li === 1 ? 2 + wi : 4 + wi;
                  return (
                    <span
                      key={wi}
                      ref={el => { hwRefs.current[idx] = el; }}
                      data-animate
                      className={`inline-block will-change-transform ${word === 'FORWARD.' ? 'text-gold' : ''}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>

          <p
            ref={sublineRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold mt-4"
          >
            DIGITAL MARKETING <span className="font-bold">×</span> SOFTWARE DEVELOPMENT
          </p>
        </div>

        {/* ── ZONE 3: WHAT WE DO ──────────────────────────────── */}
        <div className="flex flex-col gap-4 pt-40 sm:pt-52 pl-0 sm:pl-6 border-l-0 sm:border-l sm:border-gold/30">
          <span
            ref={wwdRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium"
          >
            WHAT WE DO
          </span>
          <p
            ref={wwdSubRef}
            data-animate
            className="font-display font-light tracking-[0.18em] text-white uppercase leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 4rem)' }}
          >
            FROM FIRST IDEA<br className="hidden sm:block" /> TO DIGITAL EXPERIENCE.
          </p>
          <p
            ref={wwdDescRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/70 max-w-xl leading-relaxed mt-2"
          >
            We design brands, build technology and create digital experiences designed to move businesses forward.
          </p>
        </div>

        {/* ── ZONE 4–7: SERVICES ──────────────────────────────── */}
        <div className="relative flex flex-col gap-40 sm:gap-52 lg:gap-64 pt-40 sm:pt-52">

          {/* Gold thread */}
          <div
            className="absolute left-[1rem] sm:left-[1.25rem] top-0 bottom-0 w-[1px] bg-gold/25 pointer-events-none"
            aria-hidden="true"
          />

          {SERVICES.map((svc, si) => (
            <article
              key={svc.id}
              ref={el => { svcRefs.current[si] = el; }}
              data-service-article={svc.id}
              className="relative flex flex-col gap-5 sm:gap-6 pl-9 sm:pl-14 will-change-[opacity,transform]"
            >
              {/* Number + Title */}
              <div className="flex flex-row items-start gap-3 sm:gap-6">
                <span
                  ref={el => { svcNumRefs.current[si] = el; }}
                  data-service-number={svc.number}
                  className="font-mono text-sm sm:text-xl tracking-[0.2em] font-semibold flex-shrink-0 pt-1 sm:pt-2"
                  style={{ color: '#94A3B8' }}
                >
                  {svc.number}
                </span>

                <h3
                  className="font-display font-black tracking-[0.12em] sm:tracking-[0.15em] uppercase leading-none flex flex-col max-w-full"
                  style={{ fontSize: 'clamp(2.4rem, 7.5vw, 8rem)' }}
                  aria-label={svc.title}
                >
                  {svc.titleLines.map((line, li) => (
                    <span key={li} className="flex flex-wrap gap-x-[0.03em] overflow-visible">
                      {splitLetters(line).map((char, ci) => {
                        const prevLen = svc.titleLines.slice(0, li).join('').length;
                        const gIdx = prevLen + ci;
                        return (
                          <span
                            key={ci}
                            ref={el => { svcTitleRefs.current[si][gIdx] = el; }}
                            data-service-title-letter={`${si}-${gIdx}`}
                            className="inline-block will-change-[opacity,transform,filter]"
                            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </h3>
              </div>

              {/* Hook tagline */}
              <p
                className="flex flex-wrap gap-x-[0.4em] gap-y-1"
                aria-label={svc.hook}
              >
                {svc.hookWords.map((word, wi) => (
                  <span
                    key={wi}
                    ref={el => { svcHookRefs.current[si][wi] = el; }}
                    data-service-tagline-word={`${si}-${wi}`}
                    className="font-mono text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-medium inline-block will-change-[opacity,transform]"
                  >
                    {word}
                  </span>
                ))}
              </p>

              {/* Divider */}
              <div
                ref={el => { svcDivRefs.current[si] = el; }}
                className="w-full h-[1px]"
                aria-hidden="true"
              />

              {/* Items */}
              <ul className="flex flex-col gap-2 sm:gap-2.5">
                {svc.items.map((item, ii) => (
                  <li
                    key={ii}
                    ref={el => { svcItemRefs.current[si][ii] = el; }}
                    data-service-item={`${si}-${ii}`}
                    className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/85 uppercase will-change-[opacity,transform]"
                  >
                    <span className="text-gold/50 mr-3" aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Description */}
              <p
                ref={el => { svcDescRefs.current[si] = el; }}
                data-service-description={svc.id}
                className="font-mono text-xs sm:text-sm tracking-[0.18em] text-silver/65 max-w-xl leading-relaxed mt-2 will-change-[opacity,transform]"
              >
                {svc.description}
              </p>
            </article>
          ))}
        </div>

        {/* ── ZONE 5: ONE IDEA ────────────────────────────────── */}
        <div className="flex flex-col gap-6 pt-40 sm:pt-56 border-t border-white/10 mt-40 sm:mt-52">
          <span
            ref={oneIdeaRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium"
          >
            ONE IDEA. MANY POSSIBILITIES.
          </span>

          <div
            className="flex flex-col gap-1 sm:gap-2"
            aria-label="Strategy. Design. Development. Growth."
          >
            {STRATEGY_WORDS.map((word, i) => (
              <span
                key={word}
                ref={el => { stratRefs.current[i] = el; }}
                data-animate
                className="font-display font-light tracking-[0.25em] text-white uppercase inline-block will-change-transform"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 5rem)' }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* ── ZONE 6: DESIGN. DEVELOP. GROW. ──────────────────── */}
        <div className="flex flex-col gap-6 pt-32 sm:pt-40 items-start border-t border-white/10 mt-32 sm:mt-40">
          <div className="flex flex-col gap-0.5 sm:gap-1" aria-label="Design. Develop. Grow.">
            {DDG_WORDS.map((word, i) => (
              <span
                key={word}
                ref={el => { ddgRefs.current[i] = el; }}
                data-animate
                className="font-display font-black tracking-[0.2em] text-white uppercase inline-block will-change-transform"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 7rem)' }}
              >
                {word}
              </span>
            ))}
          </div>

          <p
            ref={allWorkRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/60 uppercase"
          >
            ALL WORKING TOWARD THE SAME DIRECTION.
          </p>

          <span
            ref={flyHighRef}
            data-animate
            className="font-mono text-sm sm:text-lg tracking-[0.35em] text-gold uppercase font-semibold mt-2"
          >
            FLY TO HIGH.
          </span>
        </div>

        {/* ── ZONE 7: CTA ─────────────────────────────────────── */}
        <div className="flex flex-col gap-8 pt-32 sm:pt-40 pb-32 sm:pb-40 border-t border-white/10 mt-32 sm:mt-40">
          <span
            ref={readyRef}
            data-animate
            className="font-mono text-xs sm:text-sm tracking-[0.3em] text-silver/60 uppercase font-medium"
          >
            READY TO MOVE FORWARD?
          </span>

          <h2
            className="font-display font-black tracking-[0.15em] text-white uppercase leading-none flex flex-col"
            style={{ fontSize: 'clamp(2.4rem, 8vw, 8rem)' }}
            aria-label="Let's build something that moves."
          >
            {CTA_WORDS.map((word, i) => (
              <span
                key={i}
                ref={el => { ctaRefs.current[i] = el; }}
                data-animate
                className={`inline-block will-change-transform ${word.includes('MOVES') ? 'text-gold' : ''}`}
              >
                {word}
              </span>
            ))}
          </h2>

          <a
            href="#contact"
            ref={talkRef}
            data-animate
            className="group font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase flex items-center gap-3 pt-2 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm w-fit"
          >
            <span className="relative inline-block">
              LET'S TALK
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ease-out"
                style={{ width: 0 }}
                aria-hidden="true"
              />
            </span>
            <span className="text-gold group-hover:translate-x-2 transition-transform duration-300 ease-out">
              ↗
            </span>
          </a>
        </div>

        {/* ── LOGO ────────────────────────────────────────────── */}
        <div
          ref={el => { (logoRef as React.MutableRefObject<HTMLElement | null>).current = el; }}
          data-animate
          className="w-full flex flex-col items-center text-center pb-24 sm:pb-32 border-t border-white/10 pt-16 gap-5 will-change-transform"
        >
          <img
            src="/assets/logo.svg"
            alt="SHADOW SOZO Official Logo"
            width="320"
            height="160"
            className="h-14 w-auto sm:h-20 md:h-28 object-contain"
            loading="lazy"
          />
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/70 uppercase">
            DIGITAL MARKETING <span className="text-gold font-bold">×</span> SOFTWARE DEVELOPMENT
          </p>
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase font-semibold">
            FLY TO HIGH
          </span>
        </div>

      </div>
    </section>
  );
};

