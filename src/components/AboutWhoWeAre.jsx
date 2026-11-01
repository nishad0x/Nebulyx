import React from 'react';
import { LogoMark } from './Logo';
import { Globe, Cpu, Bot, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AboutWhoWeAre({ onOpenConsult }) {
  const capabilities = [
    {
      icon: Globe,
      title: "Web Architecture",
      desc: "Sub-second edge platforms engineered on Next.js 15 and WebGL canvas."
    },
    {
      icon: Bot,
      title: "Autonomous Workflows",
      desc: "Multi-agent AI pipelines (Claude 3.5 & n8n) eliminating operational friction."
    },
    {
      icon: TrendingUp,
      title: "Algorithmic Growth",
      desc: "Viral short-form content flywheels engineered for platform algorithms."
    },
    {
      icon: Cpu,
      title: "AEO & GEO Search",
      desc: "Direct authoritative citation positioning inside Perplexity and ChatGPT."
    }
  ];

  return (
    <section id="about" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative & Quick Capability Tiles */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
              <span>ABOUT NEBULYX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
              Discover who we are and what we engineer.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Nebulyx is a next-generation digital engineering and autonomous growth ecosystem. We replace slow, traditional agency retainers with dedicated 21-day production sprints.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Where legacy IT consultancies rely on bloated WordPress templates and billable maintenance hours, our team architects high-performance headless platforms, self-healing agent pipelines, and generative AI search authority that turn visitors into committed enterprise clients.
          </p>

          {/* 4 Quick Capability Cards (Inspired by Orbosis grid, but ultra-refined) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#090e1f] border border-white/5 hover:border-white/15 transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-200 mb-3 group-hover:text-[#00C8FF] transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{c.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
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
              className="px-5 py-3 rounded-lg bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
            >
              <span>Schedule Architecture Intake</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: High-Tech Cyber Telemetry Visual (Replacing generic AI stock image) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md rounded-2xl bg-[#090e1f] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden group">
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C8FF]/10 blur-3xl rounded-full pointer-events-none" />

            {/* Emblem Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <LogoMark size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">Nebulyx Kernel</div>
                  <div className="text-[10px] font-mono text-slate-400">Autonomous Operations</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Active Edge
              </span>
            </div>

            {/* Live Telemetry Display */}
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Global Topology</div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Edge CDN PoPs</span>
                  <span className="text-[#00C8FF] font-semibold">280+ Active</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Autonomous Agent Core</div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Claude 3.5 & n8n</span>
                  <span className="text-emerald-400 font-semibold">Self-Healing</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Search Authority Anchor</div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Perplexity & ChatGPT</span>
                  <span className="text-white font-semibold">#1 Citation Rate</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Contractual Sprint SLA</div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Sprint Turnaround</span>
                  <span className="text-white font-semibold">10–21 Days</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Zero Vendor Lock-In</span>
              <span className="text-white font-mono">100% IP Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

