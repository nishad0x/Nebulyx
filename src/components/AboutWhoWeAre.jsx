import React from 'react';
import { LogoMark } from './Logo';
import { Globe, Cpu, Bot, TrendingUp, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AboutWhoWeAre({ onOpenConsult }) {
  const capabilities = [
    {
      icon: Globe,
      title: "Websites",
      desc: "Fast, launch-ready sites built to turn visitors into customers."
    },
    {
      icon: Bot,
      title: "AI automations",
      desc: "AI agents and workflows that take repetitive work off your team."
    },
    {
      icon: TrendingUp,
      title: "Social growth",
      desc: "Short-form content and a posting system that grow your audience."
    },
    {
      icon: Cpu,
      title: "AI search visibility",
      desc: "Help ChatGPT, Perplexity and Claude find and describe your business accurately."
    }
  ];

  return (
    <section id="about" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative & Quick Capability Tiles */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
              <span>ABOUT NEBULYX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4 leading-tight">
              Built for founders who need it done right, fast.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Nebulyx is an engineering and growth studio. Instead of an open-ended agency retainer, we agree a scope with you, build it in a fixed-length sprint, and hand everything over.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            You work directly with the senior engineers doing the build, so decisions are quick and nothing gets lost in hand-offs. When the sprint ends, the code, accounts and content are yours to keep, change or take elsewhere.
          </p>

          {/* 4 Quick Capability Cards (Apple Bento Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#080c18] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 group shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-neutral-200 mb-3 group-hover:text-[#00C8FF] transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5 tracking-tight">{c.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>

          <div>
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Book a scoping call</span>
              <ChevronRight className="w-4 h-4 text-black/70" />
            </button>
          </div>
        </div>

        {/* Right Column: High-Tech Cyber Telemetry Visual (Apple macOS / VisionOS Style) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md rounded-[28px] bg-[#070b16] border border-white/[0.10] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C8FF]/10 blur-3xl rounded-full pointer-events-none" />

            {/* Emblem Header with Traffic Light Dots */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] flex items-center justify-center border border-white/[0.10]">
                  <LogoMark size={22} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">Every sprint</div>
                  <div className="text-[10px] font-mono text-neutral-400">What you get</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                Included
              </span>
            </div>

            {/* Live Telemetry Display */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Scope</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Agreed with you up front</span>
                  <span className="text-[#00C8FF] font-semibold">Fixed</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Team</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Senior engineers only</span>
                  <span className="text-emerald-400 font-semibold">Direct</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Timeline</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>One fixed-length sprint</span>
                  <span className="text-white font-semibold">Set end date</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Updates</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Progress you can see</span>
                  <span className="text-white font-semibold">Every week</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-400">
              <span>No lock-in</span>
              <span className="text-white font-mono font-medium">You own the code and accounts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
