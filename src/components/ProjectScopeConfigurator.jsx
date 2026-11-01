import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Send, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProjectScopeConfigurator({ onProposalSubmit }) {
  const [selectedServices, setSelectedServices] = useState(['web', 'automation']);
  const [timeline, setTimeline] = useState('accelerated');
  const [objective, setObjective] = useState('conversion');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const servicesList = [
    { id: 'web', name: 'High-Performance Web Platform', duration: '14-Day Sprint', tag: 'Next.js 15 & Interactive Canvas' },
    { id: 'automation', name: 'Autonomous Workflows & Multi-Agent Pipelines', duration: '10-Day Sprint', tag: 'n8n & Claude 3.5' },
    { id: 'social', name: 'Algorithmic Social Media Engine', duration: 'Ongoing Flywheel', tag: '30 High-Retention Assets / Mo' },
    { id: 'aeo', name: 'AEO & GEO Generative Search Optimization', duration: '14-Day Sprint', tag: 'Perplexity & ChatGPT Citation #1' },
    { id: 'dropship', name: 'Turnkey Dropshipping & Scaled Commerce', duration: '14-Day Setup', tag: 'Private US/EU 3-5d Agents' },
  ];

  const engagementModels = [
    { id: 'rapid', label: 'Rapid Sprint', duration: '10–14 Days', desc: 'Accelerated MVP or critical infrastructure build.' },
    { id: 'accelerated', label: 'Standard Sprint', duration: '2–3 Weeks', desc: 'End-to-end multi-discipline production deployment.' },
    { id: 'ecosystem', label: 'Full Ecosystem', duration: '30 Days', desc: 'Comprehensive full-stack overhaul and scaling.' }
  ];

  const objectives = [
    { id: 'conversion', label: 'Maximize Conversion & Authority' },
    { id: 'automation', label: 'Eliminate Operational Bottlenecks' },
    { id: 'search', label: 'Dominate AI & Generative Search' },
    { id: 'commerce', label: 'Launch Autonomous Revenue Stream' }
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sound.playSuccess();
    setSubmitted(true);
    if (onProposalSubmit) {
      onProposalSubmit({ name, email, selectedServices, timeline, objective });
    }
  };

  return (
    <section id="estimator" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>CUSTOM ARCHITECTURE BUILD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Configure your architectural scope.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Select your required disciplines and objectives. Receive a tailored engineering blueprint and sprint plan without commercial friction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Capability Selectors */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#070b16] border border-white/[0.10] rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
              1. Select Required Capabilities:
            </h3>

            <div className="space-y-3">
              {servicesList.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'border-white/[0.25] bg-white/[0.06] shadow-sm'
                        : 'border-white/[0.06] bg-black/40 hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition ${
                          isSelected ? 'bg-white text-black font-bold' : 'border border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{srv.name}</div>
                        <div className="text-xs text-neutral-400 font-mono">{srv.tag}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-neutral-400 font-mono">{srv.duration}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Engagement Velocity */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
                2. Select Sprint Velocity:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {engagementModels.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTimeline(item.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      timeline === item.id
                        ? 'border-white/[0.25] bg-white/[0.06] text-white shadow-sm'
                        : 'border-white/[0.06] bg-black/40 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-[#00C8FF] mb-1">{item.duration}</div>
                    <div className="text-xs font-semibold text-white mb-1">{item.label}</div>
                    <div className="text-[11px] text-neutral-400 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Objective */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
                3. Primary Growth Objective:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {objectives.map((obj) => (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setObjective(obj.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all duration-200 cursor-pointer ${
                      objective === obj.id
                        ? 'border-white/[0.25] bg-white/[0.06] text-white font-medium shadow-sm'
                        : 'border-white/[0.06] bg-black/40 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {obj.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Scope Summary & Request */}
        <div className="lg:col-span-5">
          <div className="bg-[#070b16] border border-white/[0.10] rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Scope Summary
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                100% IP Transfer SLA
              </span>
            </div>

            <div className="mb-6">
              <div className="text-xs text-neutral-400 mb-1">Configured Sprint:</div>
              <div className="text-3xl font-bold font-display text-white">
                {selectedServices.length} Selected Disciplines
              </div>
              <div className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Includes dedicated senior architects, complete Git code repositories, cloud deployment, and 30-day post-launch optimization.
              </div>
            </div>

            <div className="space-y-2 mb-6 p-4 rounded-2xl bg-black/50 border border-white/[0.06] text-xs font-mono">
              <div className="text-neutral-400 mb-1">Architectural Inclusions:</div>
              {selectedServices.map(sid => {
                const s = servicesList.find(item => item.id === sid);
                return (
                  <div key={sid} className="flex justify-between text-neutral-200">
                    <span>• {s?.name}</span>
                    <span className="text-neutral-400">{s?.duration}</span>
                  </div>
                );
              })}
            </div>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/20 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <h4 className="text-sm font-semibold text-white">Blueprint Dispatched</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Our architecture team has received your scope. A technical breakdown and sprint timeline will be emailed to <span className="text-white font-mono">{email}</span> within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name or Organization"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-black/60 border border-white/[0.10] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                />
                <input
                  type="email"
                  required
                  placeholder="Corporate Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-black/60 border border-white/[0.10] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Custom Sprint Architecture</span>
                </button>
              </form>
            )}

            <div className="mt-4 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Strict Mutual NDA Protected. Zero Commercial Obligation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
