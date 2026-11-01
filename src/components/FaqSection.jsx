import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does Nebulyx guarantee sub-200ms page speeds globally?",
      a: "We engineer websites using hybrid React 19 / Next.js edge architecture deployed across over 280 edge locations worldwide. By combining static asset pre-rendering, Brotli level-11 compression, and zero-JS-bloat SSR, your visitors experience instantaneous page loads regardless of device or geographical location."
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
    <section className="py-24 px-5 sm:px-8 max-w-4xl mx-auto border-t border-white/5">
      <div className="mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
          Frequently asked questions.
        </h2>
        <p className="text-base text-slate-400 font-normal leading-relaxed">
          Clear answers on our architecture, sprint protocols, and contractual guarantees.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-xl bg-[#090e1f] border border-white/5 overflow-hidden transition"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition"
              >
                <span className="text-sm sm:text-base font-semibold text-white font-display">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#00C8FF]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
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

