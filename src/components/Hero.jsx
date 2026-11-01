import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Zap, Bot, Cpu, CheckCircle2, Play } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Hero({ onOpenConsult, onScrollToServices }) {
  const [activeCodeLine, setActiveCodeLine] = useState(0);

  const terminalLines = [
    { text: "system.init(cluster: 'global-edge', mode: 'autonomous')", color: "text-slate-400" },
    { text: "nebulyx.verify_benchmarks({ tti: '<180ms', lighthouse: 99 })", color: "text-cyan-400" },
    { text: "aeo_geo_engine.inject_schema(target: ['perplexity', 'chatgpt'])", color: "text-emerald-400" },
    { text: "workflows.orchestrate(agents: ['claude-3.5', 'n8n'], ops: 'hands-free')", color: "text-purple-400" },
    { text: ">> STATUS: ALL 5 ENTERPRISE PILLARS ACTIVE & SCALED.", color: "text-amber-400 font-bold" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCodeLine((prev) => (prev + 1) % terminalLines.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background blur elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-500/15 via-cyan-500/10 to-purple-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="text-center max-w-4xl mx-auto">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-900/90 border border-indigo-500/30 text-indigo-300 mb-8 backdrop-blur-xl shadow-lg shadow-indigo-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-slate-300">NEBULYX PLATFORM</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300">Accepting 2 Selected Q1 Partnerships</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-[1.08]">
          Architecting <span className="text-gradient-cyan">Digital Empires</span> That Command Category Leadership.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
          We engineer high-performance web platforms, autonomous AI workflows, viral social engines, AEO/GEO generative search dominance, and turnkey scaled dropshipping models.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              sound.playPing();
              onOpenConsult();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/30 hover:scale-[1.02]"
          >
            <span>Initiate Your Transformation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onScrollToServices();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition hover:border-slate-700"
          >
            <span>Explore 5 Core Disciplines</span>
          </button>
        </div>

        {/* Interactive Futuristic Terminal Component */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-slate-950/90 border border-slate-800/90 p-4 sm:p-5 text-left font-mono text-xs shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle glowing scanline */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-slate-400 ml-2">nebulyx-kernel-v3.0.sh</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Edge Active (0.04s)</span>
            </div>
          </div>

          <div className="space-y-1.5 text-slate-300">
            {terminalLines.map((line, idx) => (
              <div
                key={idx}
                className={`transition-all duration-300 ${
                  idx <= activeCodeLine ? 'opacity-100' : 'opacity-30'
                } ${line.color}`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-10 border-t border-slate-800/60 max-w-4xl mx-auto">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white text-gradient-cyan">
              99/100
            </div>
            <div className="text-xs text-slate-400 mt-1">Lighthouse Speed SLA</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white text-gradient-purple">
              42k+ Hrs
            </div>
            <div className="text-xs text-slate-400 mt-1">Automated Operations Saved</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white text-gradient-gold">
              $65M+
            </div>
            <div className="text-xs text-slate-400 mt-1">Client Revenue Generated</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              #1 Cited
            </div>
            <div className="text-xs text-slate-400 mt-1">In Perplexity & ChatGPT Search</div>
          </div>
        </div>
      </div>
    </section>
  );
}

