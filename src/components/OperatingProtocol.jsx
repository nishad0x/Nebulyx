import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OperatingProtocol() {
  const phases = [
    {
      step: "Phase 1",
      duration: "Days 1–3",
      title: "System Audit & Blueprint",
      summary: "We inspect your digital infrastructure, operational bottlenecks, legacy code, and AI search visibility gaps.",
      deliverables: ["Technical Debt & Latency Report", "Workflow Automation Matrix", "Target AEO/GEO Knowledge Schema"]
    },
    {
      step: "Phase 2",
      duration: "Days 4–14",
      title: "Autonomous Sprint Build",
      summary: "Rapid production build across headless Next.js architecture, self-healing agent pipelines, and automated distribution.",
      deliverables: ["Full-Stack Edge Deployment", "Claude 3.5 & n8n Autonomous Nodes", "Private Supplier & Payment Gateways"]
    },
    {
      step: "Phase 3",
      duration: "Days 15–18",
      title: "Hardening & SLA Verification",
      summary: "Stress testing to contractually guarantee 99+ Core Web Vitals, sub-200ms latency, and 100% autonomous execution.",
      deliverables: ["Global CDN Edge Audit", "Failover Telemetry Validation", "Answer Engine Citation Indexing"]
    },
    {
      step: "Phase 4",
      duration: "Days 19–21",
      title: "Full IP Transfer & Handover",
      summary: "Complete ownership transfer on Day 1. You receive Git repositories, zero-trust secrets, and telemetry dashboards.",
      deliverables: ["100% Proprietary Code Rights", "Operational Runbooks", "30-Day Post-Launch Optimization"]
    }
  ];

  return (
    <section id="protocol" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>THE 21-DAY EXECUTION PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          The 21-day execution protocol.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          How we replace six months of traditional agency friction with a single, contractually guaranteed production sprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {phases.map((phase, i) => (
          <div
            key={i}
            className="p-6 sm:p-7 rounded-[26px] bg-[#070b16] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-5 text-neutral-400">
                <span className="text-[#00C8FF] font-semibold">{phase.step}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px]">
                  {phase.duration}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2.5 tracking-tight">
                {phase.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                {phase.summary}
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Sprint Deliverables:
              </div>
              {phase.deliverables.map((item, idx) => (
                <div key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]/80 shrink-0"></span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
