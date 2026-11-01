import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { sound } from '../utils/audio';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does Nebulyx guarantee sub-200ms page speeds globally?",
      a: "We engineer websites using hybrid React 19 / Next.js edge architecture deployed across over 280 edge locations worldwide. By combining static asset pre-rendering, Brotli compression, and zero-JS-bloat SSR, your visitors experience instantaneous page loads regardless of device or geographical location."
    },
    {
      q: "How does AEO & GEO differ from traditional SEO?",
      a: "Traditional SEO focuses on Google keyword ranking and backlink volumes for blue search links. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) structure your brand's digital presence into semantic knowledge graphs and schema protocols. This ensures large language models—like Perplexity, ChatGPT, Claude, and Gemini—cite your company as the definitive source when decision-makers ask conversational questions."
    },
    {
      q: "How do your autonomous multi-agent workflows handle errors?",
      a: "Our orchestration architecture (built on n8n Enterprise, Python FastAPI, and Claude 3.5 Sonnet) incorporates self-healing retry mechanisms and automated anomaly detection. If an API payload or document format deviates, the agent autonomously validates and remediates the data, alerting your team only if a genuine anomaly occurs."
    },
    {
      q: "How does your dropshipping model achieve 3-5 day express delivery?",
      a: "We bypass slow postal couriers by connecting your store directly to verified private agent logistics networks in the US, Europe, and key regional hubs. Inventory is pre-stocked with factory partners, and orders trigger automated real-time dispatch with tracking codes synced within seconds of purchase."
    },
    {
      q: "Who owns the code, pipelines, and digital assets?",
      a: "You do. 100% on Day 1. Unlike traditional IT agencies that retain code or lock you into proprietary platforms, Nebulyx transfers all Git repositories, infrastructure credentials, vector memory stores, and operational runbooks directly to your organization under a strict mutual contract."
    },
    {
      q: "What is the typical sprint timeline and how do we begin?",
      a: "Our core production sprints run between 10 to 21 days. We start with an Architectural Audit to map bottlenecks and technical scope, followed by immediate sprint execution. To initiate, request an architectural scope above or schedule a direct scoping session."
    }
  ];

  const toggle = (i) => {
    sound.playClick();
    setOpenIdx(openIdx === i ? -1 : i);
  };

  return (
    <section id="faq" className="py-24 px-5 sm:px-8 max-w-4xl mx-auto border-t border-white/[0.08]">
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>QUESTIONS & ANSWERS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Frequently asked questions.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Clear answers on our architecture, sprint protocols, and contractual guarantees.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`rounded-[22px] transition-all duration-300 border ${
                isOpen
                  ? 'bg-[#070b16] border-white/[0.14] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-black/40 border-white/[0.06] hover:border-white/[0.10]'
              } overflow-hidden`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-semibold text-white font-display tracking-tight">
                  {item.q}
                </span>
                <span className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0 text-neutral-400">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#00C8FF]' : ''
                    }`}
                  />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.06]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
