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
            <span>AI SEARCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display leading-tight">
            Customers now ask AI who to buy from.
          </h2>

          <p className="text-base text-neutral-300 font-normal leading-relaxed">
            More and more buyers skip the list of search results and ask ChatGPT, Perplexity, Claude or Gemini for a recommendation instead.
          </p>

          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            If those assistants can't find clear information about you, they may leave you out or get your details wrong. AI search visibility (often called AEO or GEO) means making your site and content easy for them to read, so they can describe your business accurately.
          </p>
        </div>

        {/* Right: Comparative Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-[24px] bg-black/50 border border-white/[0.06] shadow-sm">
            <div className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
              Search built only for Google
            </div>
            <ul className="text-xs sm:text-sm text-neutral-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                <span>Aimed at a page of links that fewer buyers scroll through</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                <span>Keyword tricks and bulk backlinks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                <span>Often invisible to AI assistants</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-[24px] bg-[#070b16] border border-white/[0.12] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C8FF]/50 to-transparent" />
            <div className="text-xs font-mono font-semibold text-[#00C8FF] uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>How we approach AI search</span>
              <span className="text-[10px] bg-[#00C8FF]/10 px-2 py-0.5 rounded-full text-[#00C8FF]">AEO & GEO</span>
            </div>
            <ul className="text-xs sm:text-sm text-neutral-200 space-y-2.5 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
                <span>Clear structured data about your products and company</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
                <span>Pages that answer the questions your buyers ask</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
                <span>Regular checks on what AI assistants say about you</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
