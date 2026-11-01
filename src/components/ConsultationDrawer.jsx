import React, { useState } from 'react';
import { X, Calendar, Clock, Check, Send, Sparkles, Shield, User, Mail, MessageSquare } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ConsultationDrawer({ isOpen, onClose, preselectedService = '' }) {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM EST');
  const [service, setService] = useState(preselectedService || 'Website building');
  const [budget, setBudget] = useState('$10k - $25k');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const dates = [
    'Tomorrow, 2:00 PM EST',
    'Tomorrow, 4:30 PM EST',
    'Wednesday, 11:00 AM EST',
    'Thursday, 3:00 PM EST'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-pulse">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Sprint Consultation Locked</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We have booked your engineering scoping session for <strong className="text-cyan-300">{selectedDate}</strong>. A calendar invite and Google Meet link have been sent to <span className="font-mono text-emerald-300">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold hover:bg-slate-800 transition"
              >
                Close & Return to Platform
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Direct Engineering Intake
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Initialize Your Project with Nebulyx
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Speak directly with senior system architects — zero sales reps, zero fluff.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Primary Discipline</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Website building">1. Website Building (Next.js / 3D Edge)</option>
                  <option value="Platform automation and automated workflows">2. Platform Automation & Autonomous Workflows</option>
                  <option value="Social media enhancement and management">3. Social Media Enhancement & Viral Flywheel</option>
                  <option value="AEO & GEO Marketing">4. AEO & GEO Marketing (Perplexity & ChatGPT #1)</option>
                  <option value="Business models dropshipping">5. Turnkey Scaled Dropshipping & E-Commerce</option>
                  <option value="Comprehensive Enterprise Transformation">Full Full-Stack Ecosystem</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Budget Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {['$5k - $10k', '$10k - $25k', '$25k+ Enterprise'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => { sound.playClick(); setBudget(b); }}
                      className={`p-2 rounded-lg text-xs font-mono border transition ${
                        budget === b
                          ? 'border-cyan-500 bg-cyan-950/30 text-cyan-300 font-bold'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Select Available Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => { sound.playClick(); setSelectedDate(d); }}
                      className={`p-2 rounded-lg text-xs font-mono border text-left transition flex items-center gap-1.5 ${
                        selectedDate === d
                          ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-semibold'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Calendar className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{d}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Brief / Objectives (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Outline your immediate goals or challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition"
              >
                <Send className="w-4 h-4" />
                <span>Confirm 30-Min Architectural Strategy Call</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero sales harassment. Direct discussion with engineers.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

