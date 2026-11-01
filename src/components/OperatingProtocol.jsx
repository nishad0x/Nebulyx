import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OperatingProtocol() {
  const phases = [
    {
      step: "Phase 1",
      duration: "Days 1–3",
      title: "System Audit & Friction Mapping",
      summary: "We inspect your digital infrastructure, operational bottlenecks, legacy code, and AI search visibility gaps.",
      deliverables: ["Technical Debt & Latency Report", "Workflow Automation Matrix", "Target AEO/GEO Knowledge Schema"]
    },
    {
      step: "Phase 2",
      duration: "Days 4–14",
      title: "Autonomous Engineering Sprint",
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
      title: "Full IP Transfer & Scale Handover",
      summary: "Complete ownership transfer on Day 1. You receive Git repositories, zero-trust secrets, and telemetry dashboards.",
      deliverables: ["100% Proprietary Code Rights", "Operational Runbooks", "30-Day Post-Launch Optimization"]
    }
  ];

  return (
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="max-w-3xl mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
          The 21-day execution protocol.
        </h2>
        <p className="text-base text-slate-400 font-normal leading-relaxed">
          How we replace six months of traditional agency meetings with a single, contractually guaranteed production sprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[#090e1f] border border-white/5 hover:border-white/15 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-400">
                <span className="text-white font-semibold">{phase.step}</span>
                <span>{phase.duration}</span>
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                {phase.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {phase.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                Sprint Deliverables:
              </div>
              {phase.deliverables.map((item, idx) => (
                <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0"></span>
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

