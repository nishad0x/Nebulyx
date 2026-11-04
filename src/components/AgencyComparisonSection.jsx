import React from 'react';
import { Check, X } from 'lucide-react';
import { LogoMark } from './Logo';

export default function AgencyComparisonSection() {
  const points = [
    {
      dimension: "Timeline",
      traditional: "Months of back-and-forth, with the end date moving as the scope grows",
      nebulyx: "A fixed-length sprint with an agreed scope and a set end date"
    },
    {
      dimension: "Who builds it",
      traditional: "Account managers in the middle, with the work passed to junior staff",
      nebulyx: "You talk directly to the senior engineers doing the work"
    },
    {
      dimension: "Repetitive work",
      traditional: "Your team keeps copying data between tools by hand",
      nebulyx: "AI automations handle the routine tasks and flag what needs a person"
    },
    {
      dimension: "Getting found",
      traditional: "Keyword tactics built only for Google",
      nebulyx: "Content structured for Google and for AI assistants like ChatGPT and Perplexity"
    },
    {
      dimension: "Online stores",
      traditional: "Slow suppliers and manual order handling",
      nebulyx: "Suppliers chosen for reliable delivery, with orders handled automatically"
    },
    {
      dimension: "Ownership",
      traditional: "Retainers, unclear licensing and platforms you can't leave",
      nebulyx: "The code, accounts and content are yours to keep or take elsewhere"
    }
  ];

  return (
    <section id="comparison" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Apple Keynote Comparison Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
            <span>WHY NEBULYX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-3">
            A sprint instead of a retainer.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            How working with Nebulyx compares with a typical agency.
          </p>
        </div>

        <div className="lg:col-span-4 flex items-center lg:justify-end">
          <div className="p-5 rounded-[22px] bg-[#070b16] border border-white/[0.10] text-right w-full sm:w-auto shadow-sm">
            <div className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
              1 sprint
            </div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">
              Fixed scope, set end date
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Traditional Agencies Box */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-[28px] bg-black/60 border border-white/[0.06] space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Typical agency
            </span>
          </div>

          <div className="space-y-6">
            {points.map((p, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[11px] font-mono text-neutral-500 uppercase">{p.dimension}</div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed">
                  <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                  <span>{p.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nebulyx Platform Box - Apple Titanium Elevated & Distinct */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-[28px] bg-[#070b16] border border-white/[0.12] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent" />

          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2.5">
              <LogoMark size={20} />
              <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Nebulyx
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#00C8FF] bg-[#00C8FF]/10 px-2.5 py-1 rounded-full border border-[#00C8FF]/20">
              Sprint model
            </span>
          </div>

          <div className="space-y-6">
            {points.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#00C8FF] uppercase tracking-wider">{p.dimension}</div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                  <Check className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                  <span>{p.nebulyx}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
