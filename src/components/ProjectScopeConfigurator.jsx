import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { sound } from '../utils/audio';
import { submitForm } from '../utils/submitForm';

export default function ProjectScopeConfigurator() {
  const [selectedServices, setSelectedServices] = useState(['web', 'automation']);
  const [timeline, setTimeline] = useState('accelerated');
  const [objective, setObjective] = useState('conversion');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    try {
      await submitForm('Project scope request', {
        name,
        email,
        services: selectedServices.map(id => servicesList.find(s => s.id === id)?.name).join(', '),
        timeline: engagementModels.find(m => m.id === timeline)?.label,
        objective: objectives.find(o => o.id === objective)?.label,
      });
      sound.playSuccess();
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="max-w-3xl mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
          Configure your architectural scope.
        </h2>
        <p className="text-base text-slate-400 font-normal leading-relaxed">
          Select your required disciplines and objectives. Receive a tailored engineering blueprint and sprint plan without commercial friction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Capability Selectors */}
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
                      <div className="text-[11px] text-slate-400 font-mono">{srv.duration}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Engagement Velocity */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold text-white mb-4">
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
                    className={`p-3.5 rounded-xl border text-left transition ${
                      timeline === item.id
                        ? 'border-white/30 bg-[#0f162d] text-white'
                        : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-[#00C8FF] mb-1">{item.duration}</div>
                    <div className="text-xs font-semibold text-white mb-1">{item.label}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Objective */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold text-white mb-4">
                3. Primary Growth Objective:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {objectives.map((obj) => (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setObjective(obj.id);
                    }}
                    className={`p-3 rounded-lg border text-left text-xs transition ${
                      objective === obj.id
                        ? 'border-white/30 bg-[#0f162d] text-white font-medium'
                        : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
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
          <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Scope Summary
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                100% IP Transfer SLA
              </span>
            </div>

            <div className="mb-6">
              <div className="text-xs text-slate-400 mb-1">Configured Sprint:</div>
              <div className="text-3xl font-bold font-display text-white">
                {selectedServices.length} Selected Disciplines
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Includes dedicated senior architects, complete Git code repositories, cloud deployment, and 30-day post-launch optimization.
              </div>
            </div>

            <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#030712] border border-white/5 text-xs font-mono">
              <div className="text-slate-400 mb-1">Architectural Inclusions:</div>
              {selectedServices.map(sid => {
                const s = servicesList.find(item => item.id === sid);
                return (
                  <div key={sid} className="flex justify-between text-slate-200">
                    <span>• {s?.name}</span>
                    <span className="text-slate-400">{s?.duration}</span>
                  </div>
                );
              })}
            </div>

            {submitted ? (
              <div className="p-5 rounded-xl bg-[#030712] border border-emerald-500/20 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <h4 className="text-sm font-semibold text-white">Blueprint Dispatched</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our architecture team has received your scope. We'll follow up with a technical breakdown and sprint timeline at <span className="text-white font-mono">{email}</span>.
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                />
                <input
                  type="email"
                  required
                  placeholder="Corporate Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                />
                {error && (
                  <div role="alert" className="text-xs text-red-400 text-center">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending…' : 'Request Custom Sprint Architecture'}</span>
                </button>
              </form>
            )}

            <div className="mt-4 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Strict Mutual NDA Protected. Zero Obligation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

