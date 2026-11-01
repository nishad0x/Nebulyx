import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import WebArchitectureSandbox from './ServiceSimulators/WebArchitectureSandbox';
import WorkflowOrchestratorSandbox from './ServiceSimulators/WorkflowOrchestratorSandbox';
import SocialGrowthEngineSandbox from './ServiceSimulators/SocialGrowthEngineSandbox';
import AeoGeoDiagnosticSandbox from './ServiceSimulators/AeoGeoDiagnosticSandbox';
import DropshipRevenueMatrixSandbox from './ServiceSimulators/DropshipRevenueMatrixSandbox';
import { ArrowUpRight, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ServicesShowcase({ onSelectServiceForConsult }) {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const activeService = SERVICES_DATA[selectedServiceIndex];

  const handleTabClick = (idx) => {
    sound.playClick();
    setSelectedServiceIndex(idx);
  };

  return (
    <section id="services" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
      {/* Section Title - 2 lines max, solid ink */}
      <div className="max-w-3xl mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
          Five engineering disciplines. One unified standard.
        </h2>
        <p className="text-base text-slate-400 font-normal leading-relaxed">
          We engineer integrated production systems designed to eliminate operational friction and secure market authority.
        </p>
      </div>

      {/* Minimal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-white/10 no-scrollbar">
        {SERVICES_DATA.map((srv, idx) => {
          const isActive = selectedServiceIndex === idx;
          return (
            <button
              key={srv.id}
              onClick={() => handleTabClick(idx)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {srv.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Selected Discipline Details + Live Instrument */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Architectural Specs */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight mb-3">
              {activeService.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeService.summary}
            </p>
          </div>

          {/* Metric Highlight - clean tone step */}
          <div className="p-5 rounded-xl bg-[#090e1f] border border-white/5">
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              {activeService.metric}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {activeService.metricLabel}
            </div>
          </div>

          {/* Capabilities List */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-mono">
              Key Capabilities
            </div>
            <div className="space-y-2.5">
              {activeService.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="p-5 rounded-xl bg-[#090e1f] border border-white/5 space-y-3">
            <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-mono">
              Deliverables
            </div>
            <div className="space-y-2">
              {activeService.deliverables.map((deliv, dIdx) => (
                <div key={dIdx} className="text-xs text-slate-300 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <button
              onClick={() => {
                sound.playPing();
                if (onSelectServiceForConsult) onSelectServiceForConsult(activeService.title);
              }}
              className="px-5 py-3 rounded-lg bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
            >
              <span>Scope {activeService.shortTitle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Interactive Sandbox */}
        <div className="lg:col-span-7">
          <div className="mb-3 text-xs text-slate-400 flex items-center justify-between">
            <span className="font-mono text-slate-300">Live Demonstration Sandbox</span>
            <span className="text-[11px] text-slate-500">Interactive Simulation</span>
          </div>

          {selectedServiceIndex === 0 && <WebArchitectureSandbox />}
          {selectedServiceIndex === 1 && <WorkflowOrchestratorSandbox />}
          {selectedServiceIndex === 2 && <SocialGrowthEngineSandbox />}
          {selectedServiceIndex === 3 && <AeoGeoDiagnosticSandbox />}
          {selectedServiceIndex === 4 && <DropshipRevenueMatrixSandbox />}
        </div>
      </div>
    </section>
  );
}
