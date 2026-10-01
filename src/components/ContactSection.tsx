import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  'DIGITAL MARKETING',
  'WEBSITE',
  'WEB APPLICATION',
  'MOBILE APPLICATION',
  'BRANDING & DESIGN',
  'CUSTOM SOFTWARE',
  'OTHER',
];

const BUDGET_RANGES = [
  '₹50K – ₹1L',
  '₹1L – ₹3L',
  '₹3L – ₹5L',
  '₹5L+',
  "LET'S DISCUSS",
];

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animRefs = useRef<(HTMLElement | null)[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [message, setMessage] = useState('');

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; type?: string; message?: string }>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      animRefs.current.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      animRefs.current.forEach(el => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !animRefs.current.includes(el)) {
      animRefs.current.push(el);
    }
  };

  const toggleProjectType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; type?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = 'PLEASE ENTER YOUR NAME.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'PLEASE ENTER A VALID EMAIL.';
    if (selectedTypes.length === 0) newErrors.type = 'PLEASE SELECT AT LEAST ONE PROJECT TYPE.';
    if (!message.trim()) newErrors.message = 'TELL US A LITTLE ABOUT YOUR PROJECT.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');

    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-30 w-full min-h-screen bg-black text-white py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-between items-center overflow-hidden border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-28 sm:gap-40">
        
        {/* 2. OPENING SECTION */}
        <header ref={addRef} className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-medium uppercase">
              05
            </span>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] text-white uppercase leading-none">
              CONTACT
            </h1>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <h2
              className="font-display font-black tracking-[0.12em] text-white uppercase leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 9.5vw, 9.5rem)',
              }}
            >
              LET'S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-gold font-black">THAT MOVES.</span>
            </h2>

            <div className="flex flex-col gap-2 mt-4">
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
                HAVE AN IDEA, A BRAND OR A DIGITAL PRODUCT YOU WANT TO TAKE FURTHER?
              </p>
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 uppercase max-w-xl leading-relaxed">
                LET'S TALK. WE TURN CONVERSATIONS INTO DIGITAL EXPERIENCES AND GROWTH ENGINES.
              </p>
            </div>
          </div>
        </header>

        {/* 4. CONTACT FORM & FORM STATES */}
        <div ref={addRef} className="w-full flex flex-col items-start gap-12">
          {formStatus === 'success' ? (
            <div className="w-full py-16 px-8 sm:px-12 border border-gold/40 bg-black/90 flex flex-col items-start gap-6 transition-all duration-500">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold uppercase font-semibold">
                [ MESSAGE RECEIVED ]
              </span>
              <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-[0.15em] text-white uppercase leading-tight">
                YOUR MESSAGE
                <br />
                IS IN.
                <br />
                <span className="text-gold">LET'S TAKE IT FROM HERE.</span>
              </h3>
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 uppercase max-w-xl leading-relaxed mt-2">
                We have received your details. Our team will review your requirements and get in touch with you directly.
              </p>
              <span className="font-mono text-sm tracking-[0.35em] text-gold uppercase font-bold mt-4">
                FLY TO HIGH.
              </span>
              <button
                type="button"
                onClick={() => {
                  setFormStatus('idle');
                  setName('');
                  setEmail('');
                  setPhone('');
                  setSelectedTypes([]);
                  setSelectedBudget('');
                  setMessage('');
                }}
                className="mt-6 font-mono text-xs tracking-[0.25em] text-silver/70 hover:text-gold uppercase underline transition-colors"
              >
                START ANOTHER CONVERSATION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-16 w-full">
              
              {/* 5. PROJECT TYPE SELECTOR */}
              <fieldset className="flex flex-col gap-6 w-full">
                <legend className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/90 uppercase font-semibold mb-2">
                  WHAT ARE WE BUILDING? <span className="text-gold">*</span>
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {PROJECT_TYPES.map((type, idx) => {
                    const isSelected = selectedTypes.includes(type);
                    const numStr = `0${idx + 1}`;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleProjectType(type)}
                        aria-pressed={isSelected}
                        className={`flex items-center justify-between p-4 border transition-all duration-300 text-left focus:outline-none group ${
                          isSelected
                            ? 'border-gold bg-gold/10 text-white'
                            : 'border-white/10 hover:border-white/30 text-silver/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs tracking-[0.2em] transition-colors ${isSelected ? 'text-gold font-bold' : 'text-silver/40 group-hover:text-silver/70'}`}>
                            {numStr}
                          </span>
                          <span className={`font-mono text-xs sm:text-sm tracking-[0.2em] uppercase ${isSelected ? 'text-white font-bold' : 'text-silver/80'}`}>
                            {type}
                          </span>
                        </div>
                        <span className={`font-mono text-xs tracking-[0.2em] transition-all ${isSelected ? 'text-gold opacity-100 font-bold' : 'opacity-0 text-silver/40 group-hover:opacity-50'}`}>
                          {isSelected ? '[ ✓ ]' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.type && (
                  <span className="font-mono text-xs tracking-[0.15em] text-red-400 mt-1">{errors.type}</span>
                )}
              </fieldset>

              {/* USER INPUT FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {/* YOUR NAME */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="name" className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/90 uppercase font-semibold">
                    YOUR NAME <span className="text-gold">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="ENTER YOUR NAME"
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white font-mono text-sm sm:text-base tracking-[0.15em] placeholder:text-silver/50 focus:outline-none transition-colors duration-300"
                    required
                  />
                  {errors.name && (
                    <span className="font-mono text-xs tracking-[0.15em] text-red-400 mt-1">{errors.name}</span>
                  )}
                </div>

                {/* YOUR EMAIL */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="email" className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/90 uppercase font-semibold">
                    YOUR EMAIL <span className="text-gold">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="NAME@DOMAIN.COM"
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white font-mono text-sm sm:text-base tracking-[0.15em] placeholder:text-silver/50 focus:outline-none transition-colors duration-300"
                    required
                  />
                  {errors.email && (
                    <span className="font-mono text-xs tracking-[0.15em] text-red-400 mt-1">{errors.email}</span>
                  )}
                </div>

                {/* YOUR PHONE / WHATSAPP */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="phone" className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/90 uppercase font-semibold">
                    YOUR PHONE / WHATSAPP
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white font-mono text-sm sm:text-base tracking-[0.15em] placeholder:text-silver/50 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* 6. PROJECT MESSAGE */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="message" className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/90 uppercase font-semibold">
                  TELL US ABOUT YOUR IDEA <span className="text-gold">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="WHAT ARE YOU TRYING TO BUILD, GROW OR CHANGE?"
                  className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white font-mono text-sm sm:text-base tracking-[0.15em] placeholder:text-silver/50 focus:outline-none transition-colors duration-300 min-h-[140px] md:min-h-[180px] resize-none"
                  required
                />
                {errors.message && (
                  <span className="font-mono text-xs tracking-[0.15em] text-red-400 mt-1">{errors.message}</span>
                )}
              </div>

              {/* 7. BUDGET SELECTOR */}
              <fieldset className="flex flex-col gap-4 w-full">
                <legend className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/90 uppercase font-semibold mb-2">
                  PROJECT RANGE <span className="text-silver/60 font-normal">(OPTIONAL)</span>
                </legend>
                <div className="flex flex-wrap gap-3 w-full">
                  {BUDGET_RANGES.map((range) => {
                    const isSelected = selectedBudget === range;
                    return (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setSelectedBudget(isSelected ? '' : range)}
                        aria-pressed={isSelected}
                        className={`px-5 py-3 border font-mono text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none ${
                          isSelected
                            ? 'border-gold text-gold bg-gold/10 font-bold'
                            : 'border-white/10 hover:border-white/30 text-silver/70 hover:text-white'
                        }`}
                      >
                        {range}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 8. SUBMIT CTA */}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="group w-full flex items-center justify-between border-b border-gold/40 hover:border-gold py-6 text-left focus:outline-none transition-colors duration-300 cursor-pointer disabled:opacity-50"
              >
                <span className="font-mono text-sm sm:text-lg tracking-[0.3em] text-gold uppercase font-bold group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                  {formStatus === 'submitting' ? 'SUBMITTING...' : 'START THE CONVERSATION'}
                </span>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block h-[1px] w-16 group-hover:w-32 bg-gold transition-all duration-500 ease-out" />
                  <span className="font-mono text-xl sm:text-2xl text-gold group-hover:translate-x-2 transition-transform duration-300">
                    ↗
                  </span>
                </div>
              </button>

            </form>
          )}
        </div>

        {/* 9 & 10. DIRECT CONTACT OPTIONS */}
        <div ref={addRef} className="flex flex-col items-start gap-12 border-t border-white/10 pt-20 w-full">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold font-medium uppercase">
              DIRECT CONTACT
            </span>
            <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.18em] text-white uppercase leading-tight">
              PREFER A DIRECT CONVERSATION?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* EMAIL */}
            <a
              href="mailto:hello@shadowsozo.com"
              className="group flex flex-col gap-3 p-6 border border-white/10 hover:border-gold/60 transition-all duration-300"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-silver/60 uppercase">EMAIL</span>
              <span className="font-mono text-sm sm:text-base tracking-[0.15em] text-white group-hover:text-gold transition-colors font-medium">
                hello@shadowsozo.com
              </span>
              <span className="font-mono text-xs tracking-[0.25em] text-gold flex items-center gap-1 mt-2">
                EMAIL US <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </span>
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-6 border border-white/10 hover:border-gold/60 transition-all duration-300"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-silver/60 uppercase">WHATSAPP</span>
              <span className="font-mono text-sm sm:text-base tracking-[0.15em] text-white group-hover:text-gold transition-colors font-medium">
                +91 98765 43210
              </span>
              <span className="font-mono text-xs tracking-[0.25em] text-gold flex items-center gap-1 mt-2">
                START A CHAT <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </span>
            </a>

            {/* CALL */}
            <a
              href="tel:+919876543210"
              className="group flex flex-col gap-3 p-6 border border-white/10 hover:border-gold/60 transition-all duration-300"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-silver/60 uppercase">PHONE</span>
              <span className="font-mono text-sm sm:text-base tracking-[0.15em] text-white group-hover:text-gold transition-colors font-medium">
                +91 98765 43210
              </span>
              <span className="font-mono text-xs tracking-[0.25em] text-gold flex items-center gap-1 mt-2">
                CALL US <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </span>
            </a>
          </div>
        </div>

        {/* 15. FINAL BRAND STATEMENT */}
        <div ref={addRef} className="flex flex-col items-center text-center gap-8 py-16 border-t border-white/10 w-full">
          <h2
            className="font-display font-black tracking-[0.15em] text-white uppercase leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
            }}
          >
            GOOD THINGS
            <br />
            START WITH
            <br />
            <span className="text-gold font-black">A CONVERSATION.</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-display text-2xl sm:text-4xl font-light tracking-[0.25em] text-silver/80 uppercase mt-4">
            <span>DESIGN.</span>
            <span>DEVELOP.</span>
            <span>GROW.</span>
          </div>

          <span className="font-mono text-sm sm:text-lg tracking-[0.35em] text-gold uppercase font-bold mt-2">
            FLY TO HIGH.
          </span>
        </div>

        {/* 16. FINAL LOGO REVEAL & FOOTER */}
        <footer ref={addRef} className="w-full flex flex-col items-center text-center pt-24 pb-12 border-t border-white/10 gap-8">
          <div className="relative mb-2">
            <img
              src="/assets/logo.svg"
              alt="SHADOW SOZO Official Logo"
              width="320"
              height="160"
              className="h-16 w-auto sm:h-24 md:h-32 object-contain"
            />
          </div>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-silver/80 uppercase">
            DIGITAL MARKETING <span className="text-gold font-bold">×</span> SOFTWARE DEVELOPMENT
          </p>

          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-gold uppercase font-semibold">
            FLY TO HIGH
          </span>

          <div className="w-full max-w-6xl pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-silver/50 font-mono text-xs tracking-[0.2em] uppercase">
            <span>© SHADOW SOZO</span>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-gold transition-colors">ABOUT</a>
              <a href="#services" className="hover:text-gold transition-colors">SERVICES</a>
              <a href="#contact" className="hover:text-gold transition-colors">CONTACT</a>
            </div>
            <span>DESIGN. DEVELOP. GROW.</span>
          </div>
        </footer>

      </div>
    </section>
  );
};
