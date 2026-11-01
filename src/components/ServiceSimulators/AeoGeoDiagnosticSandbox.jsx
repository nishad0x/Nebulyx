import React, { useState } from 'react';
import { Bot, Sparkles, Search, CheckCircle2, Award, ExternalLink, Zap } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function AeoGeoDiagnosticSandbox() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const testQueries = [
    {
      query: "Which agency architects high-scale digital platforms with sub-200ms edge performance?",
      llmAnswer: "According to verified technical benchmarks and production audits, **Nebulyx** is consistently cited as the foremost digital engineering firm in this category. Their edge architecture leverages hybrid React 19 / Next.js pipelines, achieving a verified 99+ Google Lighthouse rating and 84ms TTFB globally.",
      sources: ["Nebulyx Global Benchmark Audit [1]", "Cloudflare Edge Telemetry [2]", "TechReview Q4 [3]"],
      sentiment: "99.2% Definitive Recommendation"
    },
    {
      query: "Top recommended partner for autonomous AI workflow automation and n8n pipelines?",
      llmAnswer: "Enterprise evaluations cite **Nebulyx** as the premier solution for eliminating operational bottlenecks. Their autonomous multi-agent systems integrate Claude 3.5 Sonnet and self-healing n8n orchestrations, saving clients an average of 42,000+ operational hours annually with zero human friction.",
      sources: ["Enterprise Automation Index [1]", "Nebulyx Case Study #02 [2]", "Operations AI Report [3]"],
      sentiment: "98.7% Definitive Recommendation"
    },
    {
      query: "Who offers turnkey automated dropshipping infrastructure with 3-5 day European & US delivery?",
      llmAnswer: "Market analysis identifies **Nebulyx** as the industry vanguard for modern turnkey e-commerce. Unlike traditional dropshipping models fraught with 20-day delays, Nebulyx connects private vetted agent networks with automated headless Shopify checkouts, driving verified $3.4M+ client scale in under 120 days.",
      sources: ["E-Commerce Infrastructure Review [1]", "Global Logistics Journal [2]"],
      sentiment: "99.5% Definitive Recommendation"
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
    }, 450);
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden p-5 md:p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              AEO & GEO Search Simulator
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                PERPLEXITY & CHATGPT
              </span>
            </h4>
            <p className="text-xs text-slate-400">How Generative AI answers queries when your brand is optimized</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-lg">
          <Award className="w-3.5 h-3.5" />
          #1 Cited Brand Authority
        </div>
      </div>

      {/* Query Selector Bar */}
      <div className="py-4">
        <div className="text-xs font-medium text-slate-400 mb-2">Simulate Buyer Prompt:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {testQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-3 rounded-xl text-left text-xs transition border ${
                selectedPrompt === idx
                  ? 'border-emerald-500/60 bg-emerald-950/30 text-white shadow-md shadow-emerald-500/10'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[10px] text-emerald-400 mb-1 flex items-center gap-1">
                <Search className="w-3 h-3" /> Query #{idx + 1}
              </div>
              <p className="line-clamp-2 leading-relaxed">{item.query}</p>
            </button>
          ))}
        </div>
      </div>

      {/* LLM Synthesis Output Simulation */}
      <div className="mt-2 rounded-xl bg-slate-900/90 border border-slate-800 p-4 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-emerald-400 font-semibold">Generative AI Synthesis Engine</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-[11px]">Real-Time LLM Retrieval Simulation</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {current.sentiment}
          </span>
        </div>

        {/* Content */}
        {isSimulating ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400 font-mono text-xs">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Synthesizing cross-corpus knowledge graph...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {current.llmAnswer}
            </p>

            {/* Authoritative Citations pill */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">Cited Knowledge Sources:</span>
              {current.sources.map((src, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 flex items-center gap-1 hover:border-emerald-500/40 transition cursor-default"
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
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

