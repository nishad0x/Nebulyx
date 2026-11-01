import React from 'react';
import { LogoMark } from './Logo';
import { Globe, Cpu, Bot, TrendingUp, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AboutWhoWeAre({ onOpenConsult }) {
  const capabilities = [
    {
      icon: Globe,
      title: "Web Architecture Pro",
      desc: "Sub-200ms edge platforms engineered on Next.js 15, React 19, and GPU-accelerated canvas."
    },
    {
      icon: Bot,
      title: "Autonomous Agent Core",
      desc: "Self-healing multi-agent pipelines (Claude 3.5 & n8n) eliminating operational friction."
    },
    {
      icon: TrendingUp,
      title: "Algorithmic Signal Studio",
      desc: "High-retention short-form media flywheels engineered for platform distribution algorithms."
    },
    {
      icon: Cpu,
      title: "AEO Generative Search",
      desc: "Definitive authoritative citation positioning inside Perplexity, ChatGPT Search, and Claude."
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
              <span>PHILOSOPHY & CAPABILITY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4 leading-tight">
              Designed for leaders who refuse compromise.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Nebulyx is a next-generation digital engineering ecosystem. We replace slow, traditional agency retainers with dedicated 21-day production sprints backed by senior systems architects.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Where legacy IT consultancies rely on bloated WordPress templates and billable maintenance hours, our team architects high-performance headless platforms, self-healing agent pipelines, and generative AI search authority that convert high-intent visitors into committed enterprise clients.
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
              <span>Schedule Architecture Intake</span>
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
                  <div className="text-sm font-bold text-white font-display">Nebulyx Kernel</div>
                  <div className="text-[10px] font-mono text-neutral-400">Autonomous Operations</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Edge
              </span>
            </div>

            {/* Live Telemetry Display */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Global Topology</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Edge CDN PoPs</span>
                  <span className="text-[#00C8FF] font-semibold">280+ Active</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Autonomous Agent Core</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Claude 3.5 & n8n</span>
                  <span className="text-emerald-400 font-semibold">Self-Healing</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Search Authority Anchor</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Perplexity & ChatGPT</span>
                  <span className="text-white font-semibold">#1 Citation Rate</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Contractual Sprint SLA</div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span>Sprint Turnaround</span>
                  <span className="text-white font-semibold">10–21 Days</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-400">
              <span>Zero Vendor Lock-In</span>
              <span className="text-white font-mono font-medium">100% Day-1 IP Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
