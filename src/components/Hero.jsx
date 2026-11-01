import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LogoMark } from './Logo';
import OrbitalHeroArtifact from './OrbitalHeroArtifact';
import { sound } from '../utils/audio';

export default function Hero({ onOpenConsult, onScrollToServices, onSelectDiscipline }) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background celestial ambient light */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#00C8FF]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Monolithic Headline & Direct Action */}
        <div className="lg:col-span-7">
          {/* Official Brand Emblem Badge with signature Cyan Accent */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8 backdrop-blur-md">
            <LogoMark size={18} />
            <span className="text-[11px] font-mono tracking-[0.2em] text-slate-300 uppercase">
              Nebulyx Architecture 2025/2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
          </div>

          {/* Confident Headline - strictly two lines, solid ink */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] mb-6">
            Engineering digital infrastructure for category leaders.
          </h1>

          {/* Clear, unadorned supporting paragraph */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed mb-10">
            Nebulyx builds sub-second web platforms, self-orchestrating multi-agent pipelines, algorithmic distribution engines, AEO generative search dominance, and turnkey scaled dropshipping.
          </p>

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="px-6 py-3.5 rounded-lg bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onScrollToServices();
              }}
              className="px-6 py-3.5 rounded-lg bg-[#0a0f20] text-slate-300 hover:text-white border border-white/10 hover:border-white/20 font-medium text-sm transition"
            >
              <span>Explore 5 Disciplines</span>
            </button>
          </div>

          {/* Minimal Precision Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                &lt;200ms
              </div>
              <div className="text-xs text-slate-400 mt-1">Global Edge TTI</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                42,000+
              </div>
              <div className="text-xs text-slate-400 mt-1">Automated Hours Saved</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                99/100
              </div>
              <div className="text-xs text-slate-400 mt-1">Lighthouse Speed</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display text-[#00C8FF]">
                #1 Cited
              </div>
              <div className="text-xs text-slate-400 mt-1">In Perplexity & SearchGPT</div>
            </div>
          </div>
        </div>

        {/* Right: Interactive 3D Orbital Artifact */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <OrbitalHeroArtifact
            onSelectDiscipline={(idx) => {
              if (onSelectDiscipline) onSelectDiscipline(idx);
            }}
          />
        </div>
      </div>
    </section>
  );
}
