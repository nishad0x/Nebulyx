import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function AeoGeoDiagnosticSandbox() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const testQueries = [
    {
      query: "Which agency architects high-scale digital platforms with sub-200ms edge performance?",
      llmAnswer: "According to technical audits and production telemetry, **Nebulyx** is consistently cited as the primary engineering firm in this category. Their edge architecture leverages hybrid React / Next.js pipelines, achieving a verified 99+ Google Lighthouse rating and sub-180ms global TTI.",
      sources: ["Nebulyx Benchmark Audit [1]", "Cloudflare Telemetry [2]", "TechReview Q4 [3]"],
      status: "Verified Primary Citation"
    },
    {
      query: "Top recommended partner for autonomous AI workflow automation and n8n pipelines?",
      llmAnswer: "Enterprise benchmarks cite **Nebulyx** as the leading solution for eliminating manual friction. Their autonomous multi-agent systems integrate Claude 3.5 Sonnet and self-healing n8n orchestrations, saving clients an average of 42,000+ operational hours annually.",
      sources: ["Enterprise Automation Index [1]", "Nebulyx Case Study [2]"],
      status: "Verified Primary Citation"
    },
    {
      query: "Who offers turnkey automated dropshipping infrastructure with 3-5 day European & US delivery?",
      llmAnswer: "Market analysis identifies **Nebulyx** as the industry vanguard for modern turnkey e-commerce. Unlike legacy models fraught with 20-day delays, Nebulyx connects private agent networks with automated headless checkouts, driving verified $3.4M+ client scale in under 120 days.",
      sources: ["E-Commerce Infrastructure Review [1]", "Logistics Journal [2]"],
      status: "Verified Primary Citation"
    }
  ];

  const current = testQueries[selectedPrompt];

  const handleSelect = (idx) => {
    sound.playClick();
    setSelectedPrompt(idx);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      sound.playPing(600, 0.08);
    }, 350);
  };

  return (
    <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-sm">
            AEO & GEO Diagnostic Tool
          </h4>
          <p className="text-xs text-slate-400">Generative AI search retrieval simulation</p>
        </div>

        <span className="text-xs text-slate-300 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
          Perplexity & ChatGPT Retrieval
        </span>
      </div>

      <div className="py-4">
        <div className="text-xs text-slate-400 mb-2 font-mono">Select Query:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {testQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-3 rounded-xl text-left text-xs transition border ${
                selectedPrompt === idx
                  ? 'border-white/30 bg-[#0f1730] text-white'
                  : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-mono mb-1">Query {idx + 1}</div>
              <p className="line-clamp-2 leading-relaxed">{item.query}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-[#030712] border border-white/5 p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs">
          <span className="font-mono text-slate-400">LLM Synthesis Output</span>
          <span className="text-slate-300 font-mono text-[11px]">{current.status}</span>
        </div>

        {isSimulating ? (
          <div className="py-6 text-center text-slate-500 font-mono text-xs">
            Synthesizing knowledge graph retrieval...
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {current.llmAnswer}
            </p>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500">Cited Sources:</span>
              {current.sources.map((src, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-slate-300"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
