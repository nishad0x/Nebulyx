import React, { useState } from 'react';
import { sound } from '../utils/audio';

export default function TechnologyStackMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');

  const techItems = [
    { name: "Next.js 15", category: "frontend", role: "Hybrid SSR / Static Edge Rendering", latency: "<20ms" },
    { name: "React 19", category: "frontend", role: "Concurrent Mode & Server Actions", latency: "Instant" },
    { name: "TypeScript", category: "frontend", role: "Strict Type-Safety & Zero Runtime Crashes", latency: "Build-Time" },
    { name: "WebGL / Canvas", category: "frontend", role: "GPU-Accelerated Micro-Interactions", latency: "60 FPS" },
    { name: "Claude 3.5 Sonnet", category: "ai", role: "Autonomous Logic & Complex Reasoning Agents", latency: "~280ms" },
    { name: "OpenAI GPT-4o", category: "ai", role: "High-Speed Structured Intent Classification", latency: "~180ms" },
    { name: "n8n Enterprise", category: "automation", role: "Self-Hosted Multi-Agent Event Orchestration", latency: "Event-Driven" },
    { name: "Python FastAPI", category: "backend", role: "High-Throughput Microservice API Gateway", latency: "6ms" },
    { name: "PostgreSQL & Vector", category: "backend", role: "Realtime Database & High-Dimensional Embeddings", latency: "14ms" },
    { name: "Cloudflare Edge", category: "infra", role: "Distributed Global Anycast Network & WAF", latency: "Global <15ms" },
    { name: "Shopify Plus & GraphQL", category: "ecommerce", role: "Headless E-Commerce & Checkout API", latency: "Sub-Second" },
    { name: "JSON-LD Entity Graph", category: "aeo", role: "LLM Retrieval Augmented Schema Anchor", latency: "Semantic" }
  ];

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'ai', label: 'AI & Agents' },
    { id: 'automation', label: 'Workflows' },
    { id: 'backend', label: 'Backend' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'aeo', label: 'AEO' }
  ];

  const filtered = activeCategory === 'all'
    ? techItems
    : techItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-3">
            Production technology stack.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Assembled on modern engineering primitives. Zero legacy dependencies or unmaintainable bloat.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-[#090e1f] border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#090e1f] border border-white/5 hover:border-white/10 transition"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {item.latency}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {item.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
