import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Send, ChevronRight } from 'lucide-react';
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
    { id: 'web', name: 'Website', duration: 'Sprint', tag: 'Design, build and launch' },
    { id: 'automation', name: 'AI automations', duration: 'Sprint', tag: 'Take repetitive work off your team' },
    { id: 'social', name: 'Social media growth', duration: 'Ongoing', tag: 'Content planned and posted every week' },
    { id: 'aeo', name: 'AI search visibility', duration: 'Sprint', tag: 'Get found by ChatGPT, Perplexity and others' },
    { id: 'dropship', name: 'Online store', duration: 'Sprint', tag: 'Suppliers, storefront and orders set up' },
  ];

  const engagementModels = [
    { id: 'rapid', label: 'Small', duration: 'Quickest', desc: 'One focused piece of work, launched fast.' },
    { id: 'accelerated', label: 'Standard', duration: 'Most common', desc: 'A complete build across one or two services.' },
    { id: 'ecosystem', label: 'Larger', duration: 'Longest', desc: 'Several services built together.' }
  ];

  const objectives = [
    { id: 'conversion', label: 'Win more customers from my website' },
    { id: 'automation', label: 'Save my team time' },
    { id: 'search', label: 'Show up in AI search' },
    { id: 'commerce', label: 'Start selling online' }
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
    <section id="estimator" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>PLAN YOUR PROJECT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          Not ready for a call? Sketch your project.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Pick what you need and we'll email you a suggested scope, timeline and price. No commitment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Capability Selectors */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#070b16] border border-white/[0.10] rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
              1. What do you need?
            </h3>

            <div className="space-y-3">
              {servicesList.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleService(srv.id);
                      }
                    }}
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
                2. How big is the project?
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
                3. What matters most right now?
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
                Your project
              </span>
            </div>

            <div className="mb-6">
              <div className="text-xs text-neutral-400 mb-1">You selected:</div>
              <div className="text-3xl font-bold font-display text-white">
                {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'}
              </div>
              <div className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Every sprint includes senior engineers, weekly progress updates, launch, and the code and accounts set up in your name.
              </div>
            </div>

            <div className="space-y-2 mb-6 p-4 rounded-2xl bg-black/50 border border-white/[0.06] text-xs font-mono">
              <div className="text-neutral-400 mb-1">Selected:</div>
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
                <h4 className="text-sm font-semibold text-white">Thanks, we've got your details</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  We'll email a suggested scope, timeline and price to <span className="text-white">{email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="scope-name" className="block text-xs font-medium text-neutral-300 mb-1 px-1">Your name or company</label>
                <input
                  id="scope-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Alex from Acme"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-black/60 border border-white/[0.10] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                />
                <label htmlFor="scope-email" className="block text-xs font-medium text-neutral-300 mb-1 px-1">Email</label>
                <input
                  id="scope-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-black/60 border border-white/[0.10] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                />
                {error && (
                  <div role="alert" className="text-xs text-red-400 text-center">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending…' : 'Send my project details'}</span>
                </button>
              </form>
            )}

            <div className="mt-4 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>No commitment. We only use your details to reply.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
