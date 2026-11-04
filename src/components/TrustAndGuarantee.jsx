import React from 'react';
import { Check } from 'lucide-react';

export default function TrustAndGuarantee() {
  const comparison = [
    {
      feature: "Timeline",
      nebulyx: "Fixed-length sprint, set end date",
      traditional: "Months, often open-ended",
      freelancers: "Varies by person"
    },
    {
      feature: "Who you work with",
      nebulyx: "The senior engineers doing the build",
      traditional: "Account managers and juniors",
      freelancers: "One person, one skill set"
    },
    {
      feature: "AI automation & AI search",
      nebulyx: "Part of the same team",
      traditional: "Usually a separate vendor",
      freelancers: "Rarely offered"
    },
    {
      feature: "Ownership",
      nebulyx: "Code, accounts and content in your name",
      traditional: "Often tied to their platform",
      freelancers: "Depends on the agreement"
    },
    {
      feature: "After launch",
      nebulyx: "Handover notes and a walkthrough",
      traditional: "A support retainer",
      freelancers: "Depends on availability"
    }
  ];

  return (
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>WHAT YOU CAN COUNT ON</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Clear terms, no surprises.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Before we start, you get a written scope, timeline and price. Here is what every sprint includes.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {[
          {
            title: "A written scope",
            desc: "You approve exactly what we will build and when, before any work begins."
          },
          {
            title: "Built to be fast",
            desc: "We test speed and accessibility on real phones and desktops before launch."
          },
          {
            title: "No lock-in",
            desc: "The code, accounts and documentation are set up in your name."
          },
          {
            title: "Weekly progress",
            desc: "You see working progress every week and can change direction early."
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
                <th className="p-4 sm:p-5">What matters</th>
                <th className="p-4 sm:p-5 text-white font-semibold">Nebulyx</th>
                <th className="p-4 sm:p-5">Typical agency</th>
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
