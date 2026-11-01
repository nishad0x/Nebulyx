import React from 'react';
import { ShieldCheck, Zap, Lock, Award, CheckCircle2, XCircle, Clock, FileCode, Check } from 'lucide-react';

export default function TrustAndGuarantee() {
  const comparison = [
    {
      feature: "Average Delivery Velocity",
      nebulyx: "10 - 21 Days (Sprint)",
      traditional: "3 - 6 Months",
      freelancers: "Unpredictable (Weeks to Months)"
    },
    {
      feature: "Performance Benchmark",
      nebulyx: "99+ Lighthouse & <200ms TTI",
      traditional: "Often 40-70 bloated scores",
      freelancers: "Rarely tested or optimized"
    },
    {
      feature: "AI Integration & AEO",
      nebulyx: "Native Multi-Agent & GEO Knowledge Graph",
      traditional: "Basic legacy SEO blog posts",
      freelancers: "No AI search architecture"
    },
    {
      feature: "Code & IP Ownership",
      nebulyx: "100% Full IP Transfer on Day 1",
      traditional: "Retainer lock-ins & proprietary CMS",
      freelancers: "Ambiguous licensing"
    },
    {
      feature: "Autonomous Workflows",
      nebulyx: "Self-healing n8n / Claude agents",
      traditional: "Manual human tasks billed hourly",
      freelancers: "Fragile single-point scripts"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero-Risk SLA Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display">
          Engineered So You <span className="text-emerald-400">Never Need</span> to Verify Twice.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We strip away agency bureaucracy, sluggish communication, and tech debt. Every line of code, automated agent, and campaign is contractually guaranteed.
        </p>
      </div>

      {/* 4 Pillars of Guarantee */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {[
          {
            icon: Clock,
            title: "Sprint SLA Guarantee",
            desc: "If we miss our agreed sprint delivery milestone, we credit 100% of sprint management fees.",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
          },
          {
            icon: Zap,
            title: "Sub-200ms Performance",
            desc: "Guaranteed 99+ Google Lighthouse rating and sub-second global edge response time.",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10"
          },
          {
            icon: Lock,
            title: "Zero Vendor Lock-In",
            desc: "Full source code, Git repositories, API credentials, and vector pipelines transferred to you.",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
          },
          {
            icon: Award,
            title: "Enterprise Grade Code",
            desc: "Strict TypeScript, automated CI/CD unit testing, zero-trust secrets management, and SOC2 readiness.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
          }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl bg-slate-950/80 border border-slate-800/80 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
            Category Comparison Matrix
          </span>
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            Nebulyx vs Industry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/40 text-slate-400 font-mono text-[11px]">
                <th className="p-4 sm:p-5">Capability / Metric</th>
                <th className="p-4 sm:p-5 text-cyan-400 bg-cyan-950/20 font-bold">Nebulyx Autonomous Platform</th>
                <th className="p-4 sm:p-5">Traditional Agencies</th>
                <th className="p-4 sm:p-5">Freelance Marketplaces</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/20 transition">
                  <td className="p-4 sm:p-5 font-medium text-white">{row.feature}</td>
                  <td className="p-4 sm:p-5 font-semibold text-cyan-300 bg-cyan-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{row.nebulyx}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">{row.traditional}</td>
                  <td className="p-4 sm:p-5 text-slate-500">{row.freelancers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

