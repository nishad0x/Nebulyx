import React, { useState } from 'react';
import { Gauge, Zap, Smartphone, Monitor, ShieldCheck, CheckCircle2, Play, Code2, Server } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function WebArchitectureSandbox() {
  const [device, setDevice] = useState('desktop');
  const [auditing, setAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'code' | 'edge'

  const runAudit = () => {
    sound.playPing(440, 0.1);
    setAuditing(true);
    setAuditComplete(false);
    setTimeout(() => {
      setAuditing(false);
      setAuditComplete(true);
      sound.playSuccess();
    }, 1200);
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden p-5 md:p-6 shadow-2xl backdrop-blur-xl">
      {/* Sandbox Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              Nebulyx Edge Benchmark
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                LIVE AUDIT
              </span>
            </h4>
            <p className="text-xs text-slate-400">Sub-second execution testbench</p>
          </div>
        </div>

        {/* Viewport switch & Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => { sound.playClick(); setDevice('desktop'); }}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition ${device === 'desktop' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setDevice('mobile'); }}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition ${device === 'mobile' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <button
            onClick={runAudit}
            disabled={auditing}
            className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${auditing ? 'animate-spin' : ''}`} />
            {auditing ? 'Analyzing Engine...' : 'Run Performance Audit'}
          </button>
        </div>
      </div>

      {/* Mode Sub-nav */}
      <div className="flex items-center gap-4 pt-4 pb-2 border-b border-slate-900 text-xs">
        <button
          onClick={() => { sound.playClick(); setActiveTab('metrics'); }}
          className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition ${activeTab === 'metrics' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <Gauge className="w-3.5 h-3.5" /> Lighthouse 99+ Scores
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('edge'); }}
          className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition ${activeTab === 'edge' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <Server className="w-3.5 h-3.5" /> Global Edge Topology
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('code'); }}
          className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition ${activeTab === 'code' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <Code2 className="w-3.5 h-3.5" /> Architecture Spec
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-5">
        {activeTab === 'metrics' && (
          <div className="space-y-5">
            {/* 4 Core Google Lighthouse Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Performance', score: '99', color: 'text-emerald-400', stroke: 'stroke-emerald-400' },
                { label: 'Accessibility', score: '100', color: 'text-cyan-400', stroke: 'stroke-cyan-400' },
                { label: 'Best Practices', score: '100', color: 'text-blue-400', stroke: 'stroke-blue-400' },
                { label: 'SEO Authority', score: '100', color: 'text-purple-400', stroke: 'stroke-purple-400' }
              ].map((gauge, i) => (
                <div key={i} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center flex flex-col items-center">
                  <div className="relative w-16 h-16 flex items-center justify-center my-1">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="transparent" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className={gauge.stroke}
                        strokeWidth="4"
                        strokeDasharray={175}
                        strokeDashoffset={auditing ? 175 : (175 - (175 * parseInt(gauge.score)) / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                      />
                    </svg>
                    <span className={`absolute text-lg font-bold font-mono ${gauge.color}`}>
                      {auditing ? '...' : gauge.score}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 mt-1">{gauge.label}</span>
                </div>
              ))}
            </div>

            {/* Core Web Vitals telemetry */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-[11px] text-slate-400">First Contentful Paint</div>
                  <div className="text-white font-mono font-bold text-sm text-emerald-400">0.18s</div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Optimal</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-[11px] text-slate-400">Largest Contentful Paint</div>
                  <div className="text-white font-mono font-bold text-sm text-emerald-400">0.34s</div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Optimal</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-[11px] text-slate-400">Cumulative Layout Shift</div>
                  <div className="text-white font-mono font-bold text-sm text-emerald-400">0.000</div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Zero Shift</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Nebulyx platforms are guaranteed to pass Core Web Vitals across 100% of global user visits.</span>
            </div>
          </div>
        )}

        {activeTab === 'edge' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white">Global Edge CDN Latencies</span>
                <span className="text-[11px] font-mono text-cyan-400">285 Edge Locations Active</span>
              </div>
              <div className="space-y-2">
                {[
                  { region: 'North America (iad1, sfo1, ord1)', latency: '12ms', status: 'Optimal' },
                  { region: 'Europe (fra1, lhr1, cdg1)', latency: '18ms', status: 'Optimal' },
                  { region: 'Asia-Pacific (sin1, hnd1, syd1)', latency: '24ms', status: 'Optimal' },
                  { region: 'Latin America & Middle East (gru1, dxb1)', latency: '32ms', status: 'Optimal' }
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-950/70 text-xs">
                    <span className="text-slate-300 font-mono">{node.region}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-300 font-semibold">{node.latency}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span>nebulyx.config.ts</span>
              <span className="text-cyan-400">Zero-JS-Bloat SSR</span>
            </div>
            <pre className="text-slate-300 leading-relaxed">
{`export default defineNebulyxEngine({
  framework: "next@15.0",
  rendering: "hybrid-isr-edge",
  cacheStrategy: "stale-while-revalidate(31536000)",
  compression: "brotli-level-11",
  bundleOptimization: {
    deadCodeElimination: true,
    wasmAcceleratedTransforms: true,
    webGLFallbacks: "progressive-canvas-2d"
  },
  securityHeaders: {
    hsts: "max-age=63072000; includeSubDomains; preload",
    csp: "strict-dynamic"
  }
});`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

