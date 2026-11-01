import React from 'react';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

export default function AeoExplanationSection() {
  return (
    <section id="aeo-shift" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Thesis */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
            <span>THE POST-SEARCH SHIFT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display leading-tight">
            Why traditional Google SEO is no longer enough.
          </h2>

          <p className="text-base text-neutral-300 font-normal leading-relaxed">
            Enterprise buyers and high-net-worth founders no longer browse pages of blue links. They ask Perplexity, ChatGPT, Claude, and Gemini directly for definitive vendor recommendations.
          </p>

          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Without Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO), large models hallucinate, misrepresent, or completely omit your company. We structure your digital assets into high-dimensional semantic entity graphs so language models cite your brand as the primary authority.
          </p>
        </div>

        {/* Right: Comparative Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-[24px] bg-black/50 border border-white/[0.06] shadow-sm">
            <div className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
              Legacy SEO Model
            </div>
            <ul className="text-xs sm:text-sm text-neutral-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                <span>Reliant on outdated Google blue link ten-blue-links indexing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                <span>Keyword stuffing and low-quality backlink volume tactics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                <span>Completely ignored by conversational LLM retrieval augmented systems</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-[24px] bg-[#070b16] border border-white/[0.12] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C8FF]/50 to-transparent" />
            <div className="text-xs font-mono font-semibold text-[#00C8FF] uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Nebulyx AEO & GEO Knowledge Protocol</span>
              <span className="text-[10px] bg-[#00C8FF]/10 px-2 py-0.5 rounded-full text-[#00C8FF]">Active Retrieval</span>
            </div>
            <ul className="text-xs sm:text-sm text-neutral-200 space-y-2.5 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
                <span>High-density semantic entity graphs and Schema.org JSON-LD</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
                <span>Structured data indexed directly into primary LLM training corpuses</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
                <span>Ranked as the #1 definitive cited source when clients query AI</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
