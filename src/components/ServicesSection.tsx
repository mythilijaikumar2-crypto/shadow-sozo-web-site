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
function ss(el: HTMLElement | null, css: Partial<CSSStyleDeclaration>) {
  if (el) Object.assign(el.style, css);
}
function splitLetters(text: string): string[] {
  return text.split('');
}

/* ─── PROGRESS ZONES ────────────────────────────────────────── */
// 0.00–0.07  intro (03 + SERVICES)
// 0.07–0.16  opening headline (WE BUILD WHAT MOVES BRANDS FORWARD.)
// 0.16–0.22  WHAT WE DO
// 0.22–0.40  SERVICE 01
// 0.40–0.56  SERVICE 02
// 0.56–0.72  SERVICE 03
// 0.72–0.86  SERVICE 04
// 0.86–0.92  ONE IDEA / STRATEGY...
// 0.92–0.96  DESIGN. DEVELOP. GROW.
// 0.96–1.00  CTA + LOGO

const SVC_ZONES = [
  { enter: 0.22, reveal: 0.24, hold: 0.36, exit: 0.40 },
  { enter: 0.40, reveal: 0.42, hold: 0.52, exit: 0.56 },
  { enter: 0.56, reveal: 0.58, hold: 0.68, exit: 0.72 },
  { enter: 0.72, reveal: 0.74, hold: 0.83, exit: 0.86 },
];

/* ─── SERVICE OPACITY ────────────────────────────────────────── */
function serviceOpacity(p: number, idx: number): number {
  const z = SVC_ZONES[idx];
  if (p < z.enter - 0.04) return 0.45;
  if (p < z.enter) return 0.45 + pb(p, z.enter - 0.04, z.enter) * 0.55;
  if (p <= z.hold) return 1.0;
  if (p < z.exit) return 1.0 - pb(p, z.hold, z.exit) * 0.6;
  return 0.40;
}

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
      section.querySelectorAll('[data-animate]').forEach(el => {
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
      ss(svcRefs.current[i], { opacity: '0.40' });
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

          /* ─ 4. SERVICES ─ */
          const opacities = SERVICES.map((_, i) => serviceOpacity(p, i));
          const maxOp = Math.max(...opacities);
          const activeIdx = opacities.findIndex(o => o === maxOp);

          SERVICES.forEach((_s, i) => {
            const z     = SVC_ZONES[i];
            const op    = opacities[i];
            const isAct = i === activeIdx;

            ss(svcRefs.current[i], { opacity: String(op) });
            ss(svcNumRefs.current[i], { color: isAct ? '#D4AF37' : '#94A3B8' });
            ss(svcDivRefs.current[i], {
              backgroundColor: isAct ? 'rgba(212,175,55,0.80)' : 'rgba(255,255,255,0.10)',
            });

            /* Title letters reveal on enter */
            svcTitleRefs.current[i].forEach((el, li) => {
              const total = svcTitleRefs.current[i].length;
              const lp = pb(p, z.reveal + (li / total) * 0.04, z.reveal + (li / total) * 0.04 + 0.025);
              ss(el, {
                opacity: String(Math.max(lp, p > z.exit ? 0.6 : lp)),
                transform: `translateY(${20 * (1 - lp)}px)`,
                filter: `blur(${2 * (1 - lp)}px)`,
              });
            });

            /* Hook words */
            svcHookRefs.current[i].forEach((el, wi) => {
              const wp = pb(p, z.reveal + 0.045 + wi * 0.009, z.reveal + 0.045 + wi * 0.009 + 0.02);
              ss(el, { opacity: String(Math.max(wp, p > z.exit ? 0.55 : wp)), transform: `translateY(${20 * (1 - wp)}px)` });
            });

            /* Service items — staggered */
            svcItemRefs.current[i].forEach((el, ii) => {
              const ip = pb(p, z.reveal + 0.065 + ii * 0.01, z.reveal + 0.065 + ii * 0.01 + 0.018);
              ss(el, { opacity: String(Math.max(ip, p > z.exit ? 0.45 : ip)), transform: `translateY(${14 * (1 - ip)}px)` });
            });

            /* Description */
            const dp = pb(p, z.reveal + 0.115, z.reveal + 0.135);
            ss(svcDescRefs.current[i], { opacity: String(Math.max(dp, p > z.exit ? 0.40 : dp)), transform: `translateY(${8 * (1 - dp)}px)` });
          });

          /* Indicator dots */
          dotRefs.current.forEach((el, i) => {
            ss(el, { color: i === activeIdx ? '#D4AF37' : '#475569' });
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
      data-animate
      className={[
        'relative z-30 w-full bg-black text-white border-t border-white/10 overflow-hidden',
        /* Tall scroll container: enough time for ENTER / REVEAL / HOLD / EXIT per service */
        'min-h-[680vh] sm:min-h-[580vh] lg:min-h-[520vh]',
      ].join(' ')}
    >
      {/* ── STICKY STAGE ────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        {/* Vertical indicator — desktop only */}
        <aside className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-4 z-20">
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

      {/* ── SCROLLABLE CONTENT ──────────────────────────────── */}
      {/* All content is position:sticky via a second sticky layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />

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
              data-animate
              className="relative flex flex-col gap-5 sm:gap-6 pl-9 sm:pl-14 will-change-[opacity]"
            >
              {/* Number + Title */}
              <div className="flex flex-row items-start gap-3 sm:gap-6">
                <span
                  ref={el => { svcNumRefs.current[si] = el; }}
                  className="font-mono text-sm sm:text-xl tracking-[0.2em] font-semibold flex-shrink-0 pt-1 sm:pt-2"
                  style={{ color: '#94A3B8' }}
                >
                  {svc.number}
                </span>

                <h3
                  className="font-display font-black tracking-[0.12em] sm:tracking-[0.15em] uppercase leading-none flex flex-col"
                  style={{ fontSize: 'clamp(2.4rem, 7.5vw, 8rem)' }}
                  aria-label={svc.title}
                >
                  {svc.titleLines.map((line, li) => (
                    <span key={li} className="flex flex-wrap gap-x-[0.03em] overflow-visible">
                      {splitLetters(line).map((char, ci) => {
                        // global letter index across all lines
                        const prevLen = svc.titleLines.slice(0, li).join('').length;
                        const gIdx = prevLen + ci;
                        return (
                          <span
                            key={ci}
                            ref={el => { svcTitleRefs.current[si][gIdx] = el; }}
                            data-animate
                            className="inline-block will-change-transform"
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
                    data-animate
                    className="font-mono text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-medium inline-block will-change-transform"
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
                    data-animate
                    className="font-mono text-xs sm:text-sm tracking-[0.2em] text-silver/85 uppercase will-change-transform"
                  >
                    <span className="text-gold/50 mr-3" aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Description */}
              <p
                ref={el => { svcDescRefs.current[si] = el; }}
                data-animate
                className="font-mono text-xs sm:text-sm tracking-[0.18em] text-silver/65 max-w-xl leading-relaxed mt-2 will-change-transform"
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
