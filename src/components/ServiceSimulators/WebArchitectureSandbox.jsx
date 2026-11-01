import React, { useState } from 'react';
import { Gauge, Zap, Smartphone, Monitor, Server, Code2, Play } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function WebArchitectureSandbox() {
  const [device, setDevice] = useState('desktop');
  const [auditing, setAuditing] = useState(false);
  const [score, setScore] = useState(99);
  const [activeTab, setActiveTab] = useState('metrics');

  const runAudit = () => {
    sound.playPing(440, 0.1);
    setAuditing(true);
    setScore(20);

    let current = 20;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 10;
      if (current >= 99) {
        current = 99;
        setScore(99);
        setAuditing(false);
        sound.playSuccess();
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 90);
  };

  return (
    <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden group">
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C8FF]/40 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-sm flex items-center gap-2">
            Performance Audit Engine
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
          </h4>
          <p className="text-xs text-slate-400">Sub-second execution and Core Web Vitals benchmark</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#030712] rounded-lg p-1 border border-white/5">
            <button
              onClick={() => { sound.playClick(); setDevice('desktop'); }}
              className={`px-2.5 py-1 rounded text-xs transition ${device === 'desktop' ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Desktop
            </button>
            <button
              onClick={() => { sound.playClick(); setDevice('mobile'); }}
              className={`px-2.5 py-1 rounded text-xs transition ${device === 'mobile' ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Mobile
            </button>
          </div>

          <button
            onClick={runAudit}
            disabled={auditing}
            className="px-3.5 py-1.5 bg-white text-slate-950 font-semibold text-xs rounded-lg transition hover:bg-slate-100 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
          >
            <Play className={`w-3 h-3 fill-current ${auditing ? 'animate-spin' : ''}`} />
            <span>{auditing ? 'Auditing...' : 'Run Live Audit'}</span>
          </button>
        </div>
      </div>

      {/* Mode Sub-nav */}
      <div className="flex items-center gap-5 pt-4 pb-2 border-b border-white/5 text-xs">
        <button
          onClick={() => { sound.playClick(); setActiveTab('metrics'); }}
          className={`pb-2 border-b-2 font-medium transition ${activeTab === 'metrics' ? 'border-[#00C8FF] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Lighthouse Benchmark
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('edge'); }}
          className={`pb-2 border-b-2 font-medium transition ${activeTab === 'edge' ? 'border-[#00C8FF] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Global Edge Latency
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('code'); }}
          className={`pb-2 border-b-2 font-medium transition ${activeTab === 'code' ? 'border-[#00C8FF] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Kernel Configuration
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-5">
        {activeTab === 'metrics' && (
          <div className="space-y-5">
            {/* 4 Core Lighthouse Gauges with Animated SVG Arc */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Performance', currentScore: score, target: 99, color: 'stroke-[#00C8FF]' },
                { label: 'Accessibility', currentScore: auditing ? Math.min(100, score + 1) : 100, target: 100, color: 'stroke-white' },
                { label: 'Best Practices', currentScore: auditing ? Math.min(100, score + 2) : 100, target: 100, color: 'stroke-white' },
                { label: 'SEO Authority', currentScore: auditing ? Math.min(100, score + 1) : 100, target: 100, color: 'stroke-white' }
              ].map((gauge, i) => (
                <div key={i} className="bg-[#030712] border border-white/5 rounded-xl p-3.5 text-center flex flex-col items-center">
                  <div className="relative w-14 h-14 flex items-center justify-center my-1">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" fill="transparent" />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        className={gauge.color}
                        strokeWidth="3.5"
                        strokeDasharray={150}
                        strokeDashoffset={150 - (150 * gauge.currentScore) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
                      />
                    </svg>
                    <span className="absolute text-base font-bold font-display text-white">
                      {gauge.currentScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">{gauge.label}</div>
                </div>
              ))}
            </div>

            {/* Core Web Vitals with Real-time Optimal Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">First Contentful Paint</div>
                  <div className="text-white font-mono font-bold text-sm mt-0.5">0.18s</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Optimal</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Largest Contentful Paint</div>
                  <div className="text-white font-mono font-bold text-sm mt-0.5">0.34s</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Optimal</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Cumulative Layout Shift</div>
                  <div className="text-white font-mono font-bold text-sm mt-0.5">0.000</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Zero Shift</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edge' && (
          <div className="space-y-2">
            {[
              { region: 'North America (iad1, sfo1, ord1)', latency: '12ms' },
              { region: 'Europe (fra1, lhr1, cdg1)', latency: '18ms' },
              { region: 'Asia-Pacific (sin1, hnd1, syd1)', latency: '24ms' },
              { region: 'Latin America & Middle East (gru1, dxb1)', latency: '32ms' }
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#030712] border border-white/5 text-xs hover:border-white/10 transition">
                <span className="text-slate-300 font-mono">{node.region}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white font-semibold">{node.latency}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="rounded-xl bg-[#030712] p-4 border border-white/5 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre className="text-slate-300 leading-relaxed">
{`export default defineNebulyxEngine({
  framework: "next@15.0",
  rendering: "hybrid-isr-edge",
  cacheStrategy: "stale-while-revalidate(31536000)",
  compression: "brotli-level-11",
  bundleOptimization: {
    deadCodeElimination: true,
    wasmAcceleratedTransforms: true
  }
});`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
