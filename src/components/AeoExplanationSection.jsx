import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';

export default function AeoExplanationSection() {
  return (
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Thesis */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            The paradigm shift: Why traditional SEO is insufficient.
          </h2>

          <p className="text-base text-slate-300 font-normal leading-relaxed">
            Enterprise buyers and decision-makers increasingly bypass ten pages of search links. They prompt Perplexity, ChatGPT, Claude, and Gemini directly for definitive vendor recommendations.
          </p>

          <p className="text-sm text-slate-400 font-normal leading-relaxed">
            Without Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO), large models omit or misrepresent your company. We structure your digital assets into semantic entity graphs so language models cite your brand as the primary authority.
          </p>
        </div>

        {/* Right: Comparative Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#090e1f] border border-white/5">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Legacy SEO Model
            </div>
            <ul className="text-xs sm:text-sm text-slate-400 space-y-2">
              <li>• Reliant on Google blue link algorithms</li>
              <li>• Focus on keyword density and backlink volume</li>
              <li>• Disregarded by conversational LLM retrieval</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f162d] border border-white/10">
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-2">
              Nebulyx AEO & GEO Protocol
            </div>
            <ul className="text-xs sm:text-sm text-slate-200 space-y-2">
              <li>• Semantic knowledge graphs and JSON-LD entity structures</li>
              <li>• Structured data indexed into primary LLM training corpuses</li>
              <li>• Direct authoritative citation when prospective clients query AI</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
