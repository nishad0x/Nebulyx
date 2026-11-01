import React from 'react';
import { Check } from 'lucide-react';

export default function TrustAndGuarantee() {
  const comparison = [
    {
      feature: "Sprint Delivery Time",
      nebulyx: "10–21 Days",
      traditional: "3–6 Months",
      freelancers: "Unpredictable"
    },
    {
      feature: "Performance Benchmark",
      nebulyx: "99+ Lighthouse & <200ms TTI",
      traditional: "40–70 average",
      freelancers: "Rarely tested"
    },
    {
      feature: "AI Integration & AEO",
      nebulyx: "Native Multi-Agent & GEO Entity Graphs",
      traditional: "Legacy SEO blog posts",
      freelancers: "No AI search capability"
    },
    {
      feature: "Code & IP Rights",
      nebulyx: "100% Day-1 Complete IP Transfer",
      traditional: "Proprietary CMS lock-ins",
      freelancers: "Ambiguous licensing"
    },
    {
      feature: "Autonomous Workflows",
      nebulyx: "Self-healing n8n / Claude agents",
      traditional: "Manual hours repeated indefinitely",
      freelancers: "Fragile single-point scripts"
    }
  ];

  return (
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="max-w-3xl mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
          Contractual accountability.
        </h2>
        <p className="text-base text-slate-400 font-normal leading-relaxed">
          We eliminate agency bureaucracy and technical debt. Every milestone and performance target is contractually backed by our SLA.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {[
          {
            title: "Sprint SLA Guarantee",
            desc: "If we miss an agreed milestone, we continue working at zero cost until complete satisfaction."
          },
          {
            title: "Sub-200ms Speed Guarantee",
            desc: "Guaranteed 99+ Google Lighthouse score across Performance, Accessibility, and SEO."
          },
          {
            title: "Zero Vendor Lock-In",
            desc: "Complete Git repositories, source code, credentials, and documentation transfer to you on Day 1."
          },
          {
            title: "Production Rigor",
            desc: "Strict TypeScript, automated CI/CD test coverage, and enterprise security compliance."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-[#090e1f] border border-white/5"
          >
            <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl bg-[#090e1f] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-[#030712] text-slate-400 font-mono text-[11px]">
                <th className="p-4 sm:p-5">Capability</th>
                <th className="p-4 sm:p-5 text-white font-semibold">Nebulyx</th>
                <th className="p-4 sm:p-5">Traditional Agencies</th>
                <th className="p-4 sm:p-5">Freelancers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 sm:p-5 font-medium text-white">{row.feature}</td>
                  <td className="p-4 sm:p-5 font-semibold text-white flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-300 shrink-0" />
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
