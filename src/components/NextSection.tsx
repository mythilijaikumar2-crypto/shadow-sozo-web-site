import React from 'react';
import { ArrowUpRight, Code, Palette, Zap } from 'lucide-react';

export const NextSection: React.FC = () => {
  return (
    <section
      id="what-we-create"
      className="relative z-30 w-full min-h-screen bg-black text-white py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 flex flex-col items-center justify-center"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs tracking-[0.4em] text-gold uppercase px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5">
            OUR PURPOSE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] text-white uppercase">
            WHAT WE <span className="text-gold-gradient">CREATE</span>
          </h2>
          <p className="max-w-2xl text-silver/80 text-sm sm:text-base tracking-widest font-sans leading-relaxed mt-2">
            We engineer high-impact digital experiences for forward-thinking brands across the globe.
          </p>
        </div>

        {/* Studio Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full mt-6">
          
          <div className="flex flex-col items-start text-left p-8 rounded-2xl border border-white/10 bg-dark-surface hover:border-gold/40 transition-all duration-500 group">
            <div className="p-3.5 rounded-xl bg-gold/10 text-gold mb-6 group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-widest text-white uppercase mb-2">
              CINEMATIC DESIGN
            </h3>
            <p className="text-xs text-silver/70 tracking-wider leading-relaxed">
              Bespoke visual identity, futuristic UI/UX systems, and immersive scroll-driven brand storytelling.
            </p>
          </div>

          <div className="flex flex-col items-start text-left p-8 rounded-2xl border border-white/10 bg-dark-surface hover:border-gold/40 transition-all duration-500 group">
            <div className="p-3.5 rounded-xl bg-gold/10 text-gold mb-6 group-hover:scale-110 transition-transform">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-widest text-white uppercase mb-2">
              ADVANCED TECH
            </h3>
            <p className="text-xs text-silver/70 tracking-wider leading-relaxed">
              High-performance WebGL, GSAP animation architecture, and scalable front-end technology.
            </p>
          </div>

          <div className="flex flex-col items-start text-left p-8 rounded-2xl border border-white/10 bg-dark-surface hover:border-gold/40 transition-all duration-500 group">
            <div className="p-3.5 rounded-xl bg-gold/10 text-gold mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-widest text-white uppercase mb-2">
              DIGITAL SCALING
            </h3>
            <p className="text-xs text-silver/70 tracking-wider leading-relaxed">
              Transforming innovative visions into high-converting, award-winning international digital platforms.
            </p>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="mt-10 p-8 sm:p-12 rounded-3xl border border-gold/30 bg-gradient-to-r from-gold/10 via-transparent to-silver/10 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-widest uppercase">
              READY TO FLY TO HIGH?
            </h4>
            <p className="text-xs text-silver/80 tracking-wider mt-1">
              Let's shape the future of your brand together.
            </p>
          </div>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-gold text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-300 flex items-center gap-2 shadow-gold-glow shrink-0"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
