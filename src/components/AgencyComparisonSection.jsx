import React from 'react';
import { Check, X } from 'lucide-react';
import { LogoMark } from './Logo';

export default function AgencyComparisonSection() {
  const points = [
    {
      dimension: "Delivery Velocity",
      traditional: "3 to 6 months of waterfall development & endless scope revisions",
      nebulyx: "10 to 21-day dedicated production sprints with contractual milestone SLA"
    },
    {
      dimension: "Core Architecture",
      traditional: "Legacy WordPress, PHP, MERN monoliths with heavy third-party plugin debt",
      nebulyx: "Modern React 19 / Next.js edge-rendered architecture with sub-200ms global TTI"
    },
    {
      dimension: "Operational Workflows",
      traditional: "Manual data entry, repetitive clerical overhead, and human bottlenecks",
      nebulyx: "Self-healing multi-agent pipelines (Claude 3.5 Sonnet, n8n, Python) saving 42,000+ hours"
    },
    {
      dimension: "Search & Discoverability",
      traditional: "Outdated Google keyword density tactics suppressed by AI Overviews",
      nebulyx: "Generative Engine Optimization (GEO) structured for citation in Perplexity & SearchGPT"
    },
    {
      dimension: "Supply Chain & Commerce",
      traditional: "Manual fulfillment or slow 20-30 day postal dropshipping prone to customer chargebacks",
      nebulyx: "Turnkey automated infrastructure with vetted 3-5 day private European/US express agents"
    },
    {
      dimension: "Ownership & Code Rights",
      traditional: "Retainer traps, ambiguous licensing, and proprietary CMS lock-ins",
      nebulyx: "100% complete source code, Git repositories, and cloud credentials transferred on Day 1"
    }
  ];

  return (
    <section id="comparison" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Apple Keynote Comparison Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
            <span>COMPARE MODELS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-3">
            The paradigm shift: Why category leaders choose Nebulyx.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            A direct architectural comparison between traditional legacy IT agencies and our autonomous digital engineering platform.
          </p>
        </div>

        <div className="lg:col-span-4 flex items-center lg:justify-end">
          <div className="p-5 rounded-[22px] bg-[#070b16] border border-white/[0.10] text-right w-full sm:w-auto shadow-sm">
            <div className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
              100%
            </div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">
              On-Time Sprint Completion SLA
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
              Traditional IT Agencies
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
                Nebulyx Autonomous Platform
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#00C8FF] bg-[#00C8FF]/10 px-2.5 py-1 rounded-full border border-[#00C8FF]/20">
              Next-Gen Standard
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
