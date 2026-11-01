import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProjectCostEstimator({ onProposalSubmit }) {
  const [selectedServices, setSelectedServices] = useState(['web', 'automation']);
  const [timeline, setTimeline] = useState('accelerated'); // 'rapid' | 'accelerated' | 'enterprise'
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const servicesList = [
    { id: 'web', name: 'High-Performance Website', price: 4500, timeDays: 14, tag: 'Next.js 15 & WebGL' },
    { id: 'automation', name: 'Autonomous Workflows & AI Agents', price: 3800, timeDays: 10, tag: 'n8n & Claude 3.5' },
    { id: 'social', name: 'Social Media Algorithmic Engine', price: 2900, timeDays: 7, tag: '30 Viral Assets / Mo' },
    { id: 'aeo', name: 'AEO & GEO AI Search Domination', price: 3200, timeDays: 14, tag: 'Perplexity & ChatGPT #1' },
    { id: 'dropship', name: 'Turnkey E-Commerce & Dropshipping', price: 4200, timeDays: 14, tag: 'Private US/EU Agents' },
  ];

  const timelineMultipliers = {
    rapid: { factor: 1.25, label: 'Rush Sprint (Under 10 Days)', badge: 'Priority Sprint' },
    accelerated: { factor: 1.0, label: 'Standard Accelerated (2-3 Weeks)', badge: 'Recommended' },
    enterprise: { factor: 1.4, label: 'Comprehensive Enterprise Overhaul', badge: 'Full Ecosystem' }
  };

  const toggleService = (id) => {
    sound.playClick();
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Compute total
  const baseCost = selectedServices.reduce((acc, sid) => {
    const s = servicesList.find(item => item.id === sid);
    return acc + (s ? s.price : 0);
  }, 0);

  const totalCost = Math.round(baseCost * timelineMultipliers[timeline].factor);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sound.playSuccess();
    setSubmitted(true);
    if (onProposalSubmit) {
      onProposalSubmit({
        name,
        email,
        selectedServices,
        timeline,
        totalCost
      });
    }
  };

  return (
    <section id="estimator" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-4">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          <span>Transparent Scope Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display">
          Configure Your <span className="text-gradient-cyan">Transformation</span>.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
          Select your required disciplines and delivery velocity. Receive an instant architectural estimate backed by our zero-tech-debt SLA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center justify-between">
              <span>1. Select Required Capabilities:</span>
              <span className="text-xs font-mono text-cyan-400">Multiple Select</span>
            </h3>

            <div className="space-y-3">
              {servicesList.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-500/60 bg-indigo-950/20 shadow-md shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition ${
                          isSelected ? 'bg-cyan-500 text-slate-950' : 'border border-slate-700 bg-slate-900'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{srv.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{srv.tag}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-cyan-300">
                        ${srv.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">est. ~{srv.timeDays}d sprint</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timeline selector */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-base font-semibold text-white mb-4">
                2. Select Velocity & Sprint Model:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(timelineMultipliers).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTimeline(key);
                    }}
                    className={`p-3 rounded-xl border text-left transition ${
                      timeline === key
                        ? 'border-cyan-500 bg-cyan-950/20 text-white shadow-md shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-cyan-400 mb-1">{item.badge}</div>
                    <div className="text-xs font-semibold text-white mb-1">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Summary Card & Direct Instant Dispatch */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                  Sprint Architectural Scope
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                100% SLA Guarantee
              </span>
            </div>

            {/* Price Snapshot */}
            <div className="mb-6">
              <div className="text-xs text-slate-400 font-mono mb-1">Estimated Investment:</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white text-gradient-cyan">
                  ${totalCost.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-mono">USD</span>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Includes all source code, architecture rights, autonomous deployment, and 30-day post-launch optimization.
              </div>
            </div>

            {/* Scope Summary Breakdown */}
            <div className="space-y-2 mb-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
              <div className="text-slate-400 mb-1">Included Pillars ({selectedServices.length}):</div>
              {selectedServices.map(sid => {
                const s = servicesList.find(item => item.id === sid);
                return (
                  <div key={sid} className="flex justify-between text-slate-200">
                    <span>• {s?.name}</span>
                    <span className="text-cyan-400 font-semibold">${s?.price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Instant Submission Form */}
            {submitted ? (
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h4 className="text-sm font-bold text-white">Proposal Dispatched Successfully</h4>
                <p className="text-xs text-slate-300">
                  Our engineering team has received your scope. Expect a bespoke architecture deck sent to <span className="text-cyan-300 font-mono">{email}</span> within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Organization"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Work Email (e.g. founder@company.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Lock In Scope & Request Architecture Deck</span>
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strict NDA Protected. Zero Obligation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

