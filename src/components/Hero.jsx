import React from 'react';
import { ArrowUpRight, ChevronRight, Sparkles, Shield, Cpu, Zap, Activity } from 'lucide-react';
import { LogoMark } from './Logo';
import OrbitalHeroArtifact from './OrbitalHeroArtifact';
import { sound } from '../utils/audio';

export default function Hero({ onOpenConsult, onScrollToServices, onSelectDiscipline }) {
  return (
    <section id="overview" className="relative pt-32 pb-20 sm:pt-44 sm:pb-28 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Apple-style deep atmospheric ambient lighting */}
      <div className="absolute top-20 right-1/4 w-[560px] h-[560px] bg-[#00C8FF]/[0.06] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Apple Keynote Display Typography & Actions */}
        <div className="lg:col-span-7">
          {/* Apple-style titanium pill badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <LogoMark size={16} />
            <span className="text-[11px] font-mono tracking-[0.22em] text-neutral-300 uppercase">
              Engineering studio for founders
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
          </div>

          {/* Monolithic Apple Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-[-0.035em] text-white font-display leading-[1.04] mb-6">
            Your launch, built in one sprint.
            <span className="block text-neutral-400 font-semibold mt-1">
              And you own all of it.
            </span>
          </h1>

          {/* Apple-style concise, declarative supporting paragraph */}
          <p className="text-base sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed mb-10 tracking-tight">
            Senior engineers build your website, AI automations, social growth, AI search visibility or online store in a fixed-length sprint. No retainers, no lock-in: the code and accounts are yours.
          </p>

          {/* Action row with Apple pill geometry */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-98 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.18)] flex items-center gap-2 cursor-pointer"
            >
              <span>Book a scoping call</span>
              <ChevronRight className="w-4 h-4 text-black/70" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onScrollToServices();
              }}
              className="px-6 py-3.5 rounded-full bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.18] font-medium text-sm transition-all duration-200 backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              <span>See what we build</span>
              <span className="text-neutral-500 text-xs">↓</span>
            </button>
          </div>

          {/* What every engagement includes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]">
            {[
              { title: 'Fixed timeline', detail: 'A set scope and end date' },
              { title: 'You own it', detail: 'Code, accounts and content' },
              { title: 'Senior engineers', detail: 'You talk to the builders' },
              { title: 'Five services', detail: 'One team, one plan' },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-base sm:text-lg font-bold text-white tracking-tight font-display">
                  {item.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Hardware Sculpture & Gyroscopic Core */}
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
