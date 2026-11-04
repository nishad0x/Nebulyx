import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/services';
import WebArchitectureSandbox from './ServiceSimulators/WebArchitectureSandbox';
import WorkflowOrchestratorSandbox from './ServiceSimulators/WorkflowOrchestratorSandbox';
import SocialGrowthEngineSandbox from './ServiceSimulators/SocialGrowthEngineSandbox';
import AeoGeoDiagnosticSandbox from './ServiceSimulators/AeoGeoDiagnosticSandbox';
import DropshipRevenueMatrixSandbox from './ServiceSimulators/DropshipRevenueMatrixSandbox';
import { ChevronRight, Check, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ServicesShowcase({ onSelectServiceForConsult, activeDisciplineIndex = null }) {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  useEffect(() => {
    if (activeDisciplineIndex !== null && activeDisciplineIndex !== undefined) {
      setSelectedServiceIndex(activeDisciplineIndex);
    }
  }, [activeDisciplineIndex]);

  const activeService = SERVICES_DATA[selectedServiceIndex] || SERVICES_DATA[0];

  const handleTabClick = (idx) => {
    sound.playClick();
    setSelectedServiceIndex(idx);
  };

  return (
    <section id="services" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Apple-style Keynote Section Title */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>WHAT WE BUILD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Five services. One team.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Start with the one you need most, or combine them in a single sprint. Try each one in the live demo on the right.
        </p>
      </div>

      {/* Apple Segmented Glass Pill Switcher */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#070b16] border border-white/[0.08] backdrop-blur-xl mb-12 overflow-x-auto no-scrollbar shadow-inner">
        {SERVICES_DATA.map((srv, idx) => {
          const isActive = selectedServiceIndex === idx;
          return (
            <button
              key={srv.id}
              onClick={() => handleTabClick(idx)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-md scale-[1.01]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {srv.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Selected Discipline Details + Live Diagnostic Instrument */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Architectural Specs */}
        <div className="lg:col-span-5 space-y-7">
          <div>
            <div className="text-[11px] font-mono text-[#00C8FF] uppercase tracking-wider mb-1">
              Service {activeService.number} · {activeService.badge}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight mb-3">
              {activeService.title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {activeService.summary}
            </p>
          </div>

          {/* Metric Highlight - Apple Titanium Box */}
          <div className="p-5 rounded-2xl bg-[#070b16] border border-white/[0.08] relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C8FF]/40 to-transparent" />
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              {activeService.metric}
            </div>
            <div className="text-xs text-neutral-400 mt-1 font-medium">
              {activeService.metricLabel}
            </div>
          </div>

          {/* Key Capabilities List */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase font-mono">
              What it covers
            </div>
            <div className="space-y-2.5">
              {activeService.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] mt-2 shrink-0"></span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="p-5 rounded-2xl bg-[#070b16] border border-white/[0.08] space-y-3 shadow-sm">
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase font-mono">
              What you get
            </div>
            <div className="space-y-2">
              {activeService.deliverables.map((deliv, dIdx) => (
                <div key={dIdx} className="text-xs text-neutral-300 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <button
              onClick={() => {
                sound.playPing();
                if (onSelectServiceForConsult) onSelectServiceForConsult(activeService.title);
              }}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Book a scoping call</span>
              <ChevronRight className="w-4 h-4 text-black/70" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Interactive Sandbox with macOS Window Chrome */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] bg-[#070b16] border border-white/[0.10] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Window Header Chrome */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50"></span>
                <span className="ml-2 text-[11px] font-mono text-neutral-400">
                  sandbox://{activeService.id}.live
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00C8FF] bg-[#00C8FF]/10 px-2.5 py-0.5 rounded-full border border-[#00C8FF]/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Live Interactive Diagnostic
              </span>
            </div>

            {selectedServiceIndex === 0 && <WebArchitectureSandbox />}
            {selectedServiceIndex === 1 && <WorkflowOrchestratorSandbox />}
            {selectedServiceIndex === 2 && <SocialGrowthEngineSandbox />}
            {selectedServiceIndex === 3 && <AeoGeoDiagnosticSandbox />}
            {selectedServiceIndex === 4 && <DropshipRevenueMatrixSandbox />}
          </div>
        </div>
      </div>
    </section>
  );
}
