import React from 'react';
import { Check } from 'lucide-react';

export default function TrustAndGuarantee() {
  const comparison = [
    {
      feature: "Sprint Delivery Time",
      nebulyx: "10–21 Days Contractual",
      traditional: "3–6 Months Waterfall",
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
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>ENTERPRISE GUARANTEE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Contractual accountability.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          We eliminate agency bureaucracy and technical debt. Every milestone and performance target is contractually backed by our senior architect SLA.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
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
            className="p-6 rounded-[24px] bg-[#070b16] border border-white/[0.08] shadow-sm hover:border-white/[0.16] transition-all duration-200"
          >
            <h4 className="text-sm font-semibold text-white mb-2 tracking-tight">{item.title}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="rounded-[28px] bg-[#070b16] border border-white/[0.10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-black/60 text-neutral-400 font-mono text-[11px]">
                <th className="p-4 sm:p-5">Capability</th>
                <th className="p-4 sm:p-5 text-white font-semibold">Nebulyx Pro</th>
                <th className="p-4 sm:p-5">Traditional Agencies</th>
                <th className="p-4 sm:p-5">Freelancers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 sm:p-5 font-medium text-white">{row.feature}</td>
                  <td className="p-4 sm:p-5 font-semibold text-white flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />
                    <span>{row.nebulyx}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-neutral-400">{row.traditional}</td>
                  <td className="p-4 sm:p-5 text-neutral-500">{row.freelancers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
