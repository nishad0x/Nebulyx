import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProjectCostEstimator({ onProposalSubmit }) {
  const [selectedServices, setSelectedServices] = useState(['web', 'automation']);
  const [timeline, setTimeline] = useState('accelerated');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const servicesList = [
    { id: 'web', name: 'High-Performance Web Platform', price: 4500, timeDays: 14, tag: 'Next.js 15 & Canvas' },
    { id: 'automation', name: 'Autonomous Workflows & AI Agents', price: 3800, timeDays: 10, tag: 'n8n & Claude 3.5' },
    { id: 'social', name: 'Social Distribution Engine', price: 2900, timeDays: 7, tag: '30 Viral Assets / Mo' },
    { id: 'aeo', name: 'AEO & GEO Search Optimization', price: 3200, timeDays: 14, tag: 'Perplexity & ChatGPT #1' },
    { id: 'dropship', name: 'Turnkey Dropshipping System', price: 4200, timeDays: 14, tag: 'Private US/EU Agents' },
  ];

  const timelineMultipliers = {
    rapid: { factor: 1.25, label: 'Rush Sprint (Under 10 Days)' },
    accelerated: { factor: 1.0, label: 'Standard Sprint (2-3 Weeks)' },
    enterprise: { factor: 1.4, label: 'Comprehensive Ecosystem Overhaul' }
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
      onProposalSubmit({ name, email, selectedServices, timeline, totalCost });
    }
  };

  return (
    <section id="estimator" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="max-w-3xl mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
          Estimate your scope and timeline.
        </h2>
        <p className="text-base text-slate-400 font-normal leading-relaxed">
          Transparent architectural pricing backed by our zero-tech-debt milestone SLA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-white mb-4">
              1. Select Required Capabilities:
            </h3>

            <div className="space-y-3">
              {servicesList.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'border-white/30 bg-[#0f162d]'
                        : 'border-white/5 bg-[#030712] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs transition ${
                          isSelected ? 'bg-white text-slate-950 font-bold' : 'border border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{srv.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{srv.tag}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-semibold text-white">
                        ${srv.price.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">~{srv.timeDays}d sprint</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold text-white mb-4">
                2. Select Velocity:
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
                        ? 'border-white/30 bg-[#0f162d] text-white'
                        : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Scope Summary
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                100% IP Transfer SLA
              </span>
            </div>

            <div className="mb-6">
              <div className="text-xs text-slate-400 mb-1">Estimated Investment:</div>
              <div className="text-4xl sm:text-5xl font-bold font-display text-white">
                ${totalCost.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Includes complete source code, repository rights, cloud deployment, and 30-day post-launch optimization.
              </div>
            </div>

            <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#030712] border border-white/5 text-xs font-mono">
              <div className="text-slate-400 mb-1">Included Pillars ({selectedServices.length}):</div>
              {selectedServices.map(sid => {
                const s = servicesList.find(item => item.id === sid);
                return (
                  <div key={sid} className="flex justify-between text-slate-200">
                    <span>{s?.name}</span>
                    <span className="text-white">${s?.price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {submitted ? (
              <div className="p-4 rounded-xl bg-[#030712] border border-white/10 text-center space-y-2">
                <h4 className="text-sm font-semibold text-white">Proposal Dispatched</h4>
                <p className="text-xs text-slate-300">
                  Our architecture team will review your scope and email a technical brief to <span className="text-white font-mono">{email}</span> within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name or Company"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                />
                <input
                  type="email"
                  required
                  placeholder="Corporate Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition shadow-sm"
                >
                  Request Technical Blueprint
                </button>
              </form>
            )}

            <div className="mt-4 text-center text-[11px] text-slate-500">
              Strict NDA Protected. Zero Obligation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
