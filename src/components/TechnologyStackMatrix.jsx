import React, { useState } from 'react';
import { Cpu, Server, Sparkles, Layers, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';

export default function TechnologyStackMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');

  const techItems = [
    { name: "Next.js 15", category: "frontend", role: "Hybrid SSR / Static Edge Rendering", latency: "<20ms" },
    { name: "React 19", category: "frontend", role: "Concurrent Mode & Server Actions", latency: "Instant" },
    { name: "TypeScript", category: "frontend", role: "Strict Type-Safety & Zero Runtime Crashes", latency: "Build-Time" },
    { name: "WebGL / Three.js", category: "frontend", role: "GPU-Accelerated 3D Micro-Canvas", latency: "60 FPS" },
    { name: "Claude 3.5 Sonnet", category: "ai", role: "Autonomous Logic & Complex Reasoning Agents", latency: "~280ms" },
    { name: "OpenAI GPT-4o", category: "ai", role: "High-Speed Structured Intent Classification", latency: "~180ms" },
    { name: "n8n Enterprise", category: "automation", role: "Self-Hosted Multi-Agent Event Orchestration", latency: "Event-Driven" },
    { name: "Python FastAPI", category: "backend", role: "High-Throughput Microservice API Gateway", latency: "6ms" },
    { name: "Supabase / PostgreSQL", category: "backend", role: "Vector DB + Row-Level Security Realtime", latency: "14ms" },
    { name: "Cloudflare Edge", category: "infra", role: "Distributed Global Anycast DNS & WAF", latency: "Global <15ms" },
    { name: "Shopify Plus & GraphQL", category: "ecommerce", role: "Headless E-Commerce & Checkout API", latency: "Sub-Second" },
    { name: "TikTok Shop API", category: "ecommerce", role: "Direct Algorithmic Social Commerce Sync", latency: "Real-Time" },
    { name: "JSON-LD Knowledge Graph", category: "aeo", role: "LLM Retrieval Augmented Schema Anchor", latency: "Semantic" },
    { name: "Redis Caching", category: "backend", role: "Ultra-Low Latency In-Memory State Store", latency: "<1ms" }
  ];

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & 3D' },
    { id: 'ai', label: 'AI & LLM Agents' },
    { id: 'automation', label: 'Automations' },
    { id: 'backend', label: 'Backend & Edge' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'aeo', label: 'AEO / Schema' }
  ];

  const filtered = activeCategory === 'all'
    ? techItems
    : techItems.filter(item => item.category === activeCategory);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Modern Engineering Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            The <span className="text-gradient-purple">Hyper-Modern</span> Tech Arsenal.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Zero legacy bloat. Zero outdated WordPress themes. Every solution is assembled on the most advanced modern developer primitives.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                activeCategory === cat.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-white group-hover:text-cyan-300 transition">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                {item.latency}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {item.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

