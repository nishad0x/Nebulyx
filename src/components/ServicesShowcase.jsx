import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import WebArchitectureSandbox from './ServiceSimulators/WebArchitectureSandbox';
import WorkflowOrchestratorSandbox from './ServiceSimulators/WorkflowOrchestratorSandbox';
import SocialGrowthEngineSandbox from './ServiceSimulators/SocialGrowthEngineSandbox';
import AeoGeoDiagnosticSandbox from './ServiceSimulators/AeoGeoDiagnosticSandbox';
import DropshipRevenueMatrixSandbox from './ServiceSimulators/DropshipRevenueMatrixSandbox';
import { Check, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ServicesShowcase({ onSelectServiceForConsult }) {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const activeService = SERVICES_DATA[selectedServiceIndex];

  const handleTabClick = (idx) => {
    sound.playClick();
    setSelectedServiceIndex(idx);
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-4">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Core Engineering Disciplines</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 font-display">
          Precision Capabilities for <span className="text-gradient-cyan">Hyper-Scale</span> Dominance.
        </h2>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
          We do not offer generic freelance tasks. Every discipline is an integrated, battle-tested production system engineered to eliminate competition and guarantee immediate ROI.
        </p>
      </div>

      {/* Futuristic Service Navigation Tabs */}
      <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {SERVICES_DATA.map((srv, idx) => {
          const isActive = selectedServiceIndex === idx;
          return (
            <button
              key={srv.id}
              onClick={() => handleTabClick(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                isActive
                  ? 'bg-slate-900 border-indigo-500/60 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={`font-mono text-[11px] ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                {srv.number}
              </span>
              <span>{srv.shortTitle}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-1"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Service Detailed Canvas */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle accent border top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
          style={{ backgroundImage: `linear-gradient(90deg, transparent, ${activeService.accentColor}, transparent)` }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Core Value & Tech Spec */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  {activeService.badge}
                </span>
                <span className="text-xs font-mono text-cyan-400">Pillar {activeService.number}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 font-display">
                {activeService.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeService.summary}
              </p>
            </div>

            {/* Key Metric Spotlight */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-3xl font-extrabold font-mono text-white text-gradient-cyan">
                  {activeService.metric}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  {activeService.metricLabel}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Verified Audit
                </span>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Architectural Capabilities
              </div>
              <div className="space-y-2">
                {activeService.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Production Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeService.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Consult Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playPing();
                  if (onSelectServiceForConsult) onSelectServiceForConsult(activeService.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
              >
                <span>Deploy {activeService.shortTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Sandbox for this Service */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono flex items-center gap-1.5 text-cyan-400">
                <Cpu className="w-3.5 h-3.5" /> Interactive Sandbox Mode
              </span>
              <span className="text-[11px]">Real-Time Behavioral Model</span>
            </div>

            {/* Dynamic Sandbox Injector */}
            {selectedServiceIndex === 0 && <WebArchitectureSandbox />}
            {selectedServiceIndex === 1 && <WorkflowOrchestratorSandbox />}
            {selectedServiceIndex === 2 && <SocialGrowthEngineSandbox />}
            {selectedServiceIndex === 3 && <AeoGeoDiagnosticSandbox />}
            {selectedServiceIndex === 4 && <DropshipRevenueMatrixSandbox />}

            {/* Deliverables Accordion / Card */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-xs font-mono font-semibold uppercase text-slate-300 mb-3 flex items-center justify-between">
                <span>Contractual Client Deliverables</span>
                <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> SLA Backed
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.deliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span className="line-clamp-1">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

