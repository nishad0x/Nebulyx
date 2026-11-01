import React from 'react';
import { Bot, Sparkles, TrendingUp, Cpu, Network, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AeoExplanationSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none -z-10" />

      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: The Paradigm Shift */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <Bot className="w-3.5 h-3.5" />
              <span>The Search Paradigm Shift</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Google SEO is Obsolete. <br />
              <span className="text-emerald-400">AEO & GEO</span> Rule the Next Decade.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              When high-ticket buyers and C-suite executives search for vendors today, they do not click through 10 pages of spammy Google links. They query <strong className="text-white">Perplexity, ChatGPT, Claude, and Gemini</strong>.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              If your digital presence is not structured for <strong className="text-emerald-300">Generative Engine Optimization (GEO)</strong> and <strong className="text-emerald-300">Answer Engine Optimization (AEO)</strong>, large language models will hallucinate, omit, or cite your competitors instead of you.
            </p>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/30">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  Legacy SEO (Failing)
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Keywords stuffed into low-quality blog posts</li>
                  <li>Over-reliant on Google blue links</li>
                  <li>Ignored by LLM inference engines</li>
                  <li>Traffic drops when AI Overviews appear</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/40">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  Nebulyx AEO & GEO Protocol
                </div>
                <ul className="text-xs text-slate-200 space-y-1.5 list-disc list-inside">
                  <li>Semantic entity clustering & knowledge graph schema</li>
                  <li>Tier-1 training dataset citation injection</li>
                  <li>Direct citation inside Perplexity & SearchGPT</li>
                  <li>Definitive AI authority positioning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Infographic of LLM Retrieval */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">AI Knowledge Injection Protocol</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Telemetry
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">
                    01
                  </div>
                  <div>
                    <div className="text-white font-semibold">Semantic Entity Resolution</div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Extract and index your proprietary offerings into global vector databases.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">
                    02
                  </div>
                  <div>
                    <div className="text-white font-semibold">Knowledge Graph Cross-Pollination</div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Anchor entity schema across Wikidata, Crunchbase, Github, and industry journals.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">
                    03
                  </div>
                  <div>
                    <div className="text-white font-semibold">LLM Citation Dominance</div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      When buyers prompt AI for solutions, your brand is outputted as the primary authority.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

