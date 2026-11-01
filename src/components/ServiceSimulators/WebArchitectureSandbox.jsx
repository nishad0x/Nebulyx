import React, { useState } from 'react';
import { Gauge, Zap, Smartphone, Monitor, Server, Code2, Play } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function WebArchitectureSandbox() {
  const [device, setDevice] = useState('desktop');
  const [auditing, setAuditing] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  const runAudit = () => {
    sound.playPing(440, 0.1);
    setAuditing(true);
    setTimeout(() => {
      setAuditing(false);
      sound.playSuccess();
    }, 1000);
  };

  return (
    <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-sm">
            Performance Audit
          </h4>
          <p className="text-xs text-slate-400">Sub-second execution benchmark</p>
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
            className="px-3.5 py-1.5 bg-white text-slate-950 font-semibold text-xs rounded-lg transition hover:bg-slate-100 disabled:opacity-50"
          >
            {auditing ? 'Auditing...' : 'Run Live Audit'}
          </button>
        </div>
      </div>

      {/* Mode Sub-nav */}
      <div className="flex items-center gap-5 pt-4 pb-2 border-b border-white/5 text-xs">
        <button
          onClick={() => { sound.playClick(); setActiveTab('metrics'); }}
          className={`pb-2 border-b-2 font-medium transition ${activeTab === 'metrics' ? 'border-white text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Lighthouse Scores
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('edge'); }}
          className={`pb-2 border-b-2 font-medium transition ${activeTab === 'edge' ? 'border-white text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Edge Latencies
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('code'); }}
          className={`pb-2 border-b-2 font-medium transition ${activeTab === 'code' ? 'border-white text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Configuration
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-5">
        {activeTab === 'metrics' && (
          <div className="space-y-5">
            {/* 4 Core Lighthouse Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Performance', score: '99' },
                { label: 'Accessibility', score: '100' },
                { label: 'Best Practices', score: '100' },
                { label: 'SEO Authority', score: '100' }
              ].map((gauge, i) => (
                <div key={i} className="bg-[#030712] border border-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold font-display text-white">
                    {auditing ? '...' : gauge.score}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{gauge.label}</div>
                </div>
              ))}
            </div>

            {/* Core Web Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5">
                <div className="text-[11px] text-slate-400">First Contentful Paint</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">0.18s</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5">
                <div className="text-[11px] text-slate-400">Largest Contentful Paint</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">0.34s</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5">
                <div className="text-[11px] text-slate-400">Cumulative Layout Shift</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">0.000</div>
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
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#030712] border border-white/5 text-xs">
                <span className="text-slate-300">{node.region}</span>
                <span className="font-mono text-white font-semibold">{node.latency}</span>
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
