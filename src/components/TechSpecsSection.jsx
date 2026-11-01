import React, { useState } from 'react';
import { Cpu, Globe, Bot, ShieldCheck, TrendingUp, Layers, ChevronRight, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export default function TechSpecsSection() {
  const [activeTab, setActiveTab] = useState('compute');

  const specCategories = [
    { id: 'compute', label: 'Compute & Edge', icon: Globe },
    { id: 'ai', label: 'Agentic Core', icon: Bot },
    { id: 'aeo', label: 'AEO & Search', icon: Cpu },
    { id: 'distribution', label: 'Algorithmic Signal', icon: TrendingUp },
    { id: 'commerce', label: 'Commerce & Logistics', icon: Layers },
    { id: 'security', label: 'Security & IP', icon: ShieldCheck },
  ];

  const specsData = {
    compute: [
      { spec: "Frontend Framework", value: "Next.js 15 (Turbopack Engine) & React 19" },
      { spec: "Rendering Architecture", value: "Hybrid Server Actions + Edge Server-Side Rendering (SSR/ISR)" },
      { spec: "Edge Runtime", value: "V8 Isolates on Cloudflare Edge Anycast Network" },
      { spec: "Global Edge PoPs", value: "280+ worldwide CDN distribution points" },
      { spec: "Time-to-Interactive (TTI)", value: "Sub-200ms globally verified" },
      { spec: "Lighthouse Standard", value: "99+ across Performance, Accessibility, and Best Practices" },
      { spec: "Micro-Animation Engine", value: "Hardware-accelerated 60 FPS WebGL / Canvas" },
      { spec: "Styling System", value: "Zero-runtime CSS via Tailwind CSS & CSS Variables" },
    ],
    ai: [
      { spec: "Primary LLM Reasoning Core", value: "Anthropic Claude 3.5 Sonnet (Latest Model Weight)" },
      { spec: "Structured Classification Engine", value: "OpenAI GPT-4o High-Throughput API" },
      { spec: "Workflow Orchestrator", value: "Self-Hosted n8n Enterprise Event Automation" },
      { spec: "Agent Self-Healing SLA", value: "Autonomous error-detection & fallback execution loop" },
      { spec: "Vector Database Embeddings", value: "PostgreSQL pgvector (1536-dim semantic space)" },
      { spec: "Pipeline Latency", value: "Event-driven webhook triggering under 50ms" },
      { spec: "API Gateway", value: "Python FastAPI / Node.js async microservices" },
      { spec: "Autonomous Hours Saved", value: "42,000+ verifiable operational hours annually" },
    ],
    aeo: [
      { spec: "AEO Target Engines", value: "Perplexity Pro, OpenAI SearchGPT, Claude, Google Gemini" },
      { spec: "Semantic Graph Architecture", value: "Schema.org compliant JSON-LD Linked Data Graphs" },
      { spec: "Citation Authority Index", value: "#1 ranked primary source citation in LLM search results" },
      { spec: "Knowledge Base Density", value: "High-dimensional entity clustering & factual verification" },
      { spec: "Hallucination Mitigation", value: "Corpus-level factual anchoring to eliminate LLM errors" },
      { spec: "Indexing Refresh Cycle", value: "Real-time edge sitemap pinging & LLM crawler whitelist" },
      { spec: "Search Paradigm", value: "Post-keyword semantic answer engine optimization" },
    ],
    distribution: [
      { spec: "Video Rendering Pipeline", value: "Multi-threaded GPU cloud video stitching (9:16 / 16:9)" },
      { spec: "Platform Scheduling API", value: "TikTok API, LinkedIn Marketing API, YouTube Shorts, X API" },
      { spec: "Retention Optimization", value: "First 3-second visual hook testing & algorithmic pacing" },
      { spec: "Quarterly Reach Benchmark", value: "18.4M+ organic multi-platform video impressions" },
      { spec: "Audience Sentiment Telemetry", value: "Real-time comment classification & automated DM triage" },
      { spec: "Executive Positioning", value: "High-signal C-suite thought leadership flywheel" },
    ],
    commerce: [
      { spec: "E-Commerce Engine", value: "Shopify Plus Headless Storefront & GraphQL Storefront API" },
      { spec: "Supply Chain Network", value: "Vetted Tier-1 private logistics agents in US & EU" },
      { spec: "Fulfillment Velocity SLA", value: "3 to 5 day direct-to-consumer express delivery" },
      { spec: "Order Fulfillment Automation", value: "Zero-touch automated CSV/webhook sync to supplier ERP" },
      { spec: "Warehouse Requirement", value: "Zero physical warehousing or static inventory liabilities" },
      { spec: "Tracking Telemetry", value: "Live carrier webhook notifications & branded tracking portal" },
      { spec: "Payment Processing", value: "Stripe Elements with Apple Pay, Google Pay, and Klarna" },
    ],
    security: [
      { spec: "Day-1 IP Assignment", value: "100% intellectual property, code, and credentials transfer" },
      { spec: "Source Code Custody", value: "Clean Git repository push to client GitHub/GitLab org" },
      { spec: "Compliance Standard", value: "Engineered according to SOC-2 Type II & GDPR principles" },
      { spec: "Vendor Dependency", value: "Zero proprietary lock-in. Full self-hostable autonomy" },
      { spec: "Contractual SLA", value: "100% on-time milestone delivery backed by senior architect SLA" },
      { spec: "Secrets Management", value: "Encrypted environment vaulting with zero plain-text storage" },
    ]
  };

  const activeSpecs = specsData[activeTab] || specsData.compute;

  return (
    <section id="specs" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Apple-style Tech Specs Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>TECHNICAL SPECIFICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Tech Specs.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Explore the exact architectural specifications, execution benchmarks, and enterprise standards powering the Nebulyx platform.
        </p>
      </div>

      {/* Apple-style Segmented Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-white/[0.08] no-scrollbar">
        {specCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Apple-style Clean Technical Specifications Grid */}
      <div className="rounded-[28px] bg-[#070b16] border border-white/[0.10] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {activeSpecs.map((item, idx) => (
            <div
              key={idx}
              className="py-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group"
            >
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {item.spec}
              </div>
              <div className="text-sm font-medium text-white sm:text-right font-display max-w-sm">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Apple-style Footnote */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C8FF]"></span>
            <span>All architectural parameters verified in production staging environments.</span>
          </div>
          <span className="font-mono text-neutral-400">Zero legacy debt · 100% Day-1 IP</span>
        </div>
      </div>
    </section>
  );
}

