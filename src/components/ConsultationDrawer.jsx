import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ConsultationDrawer({ isOpen, onClose, preselectedService = '' }) {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM EST');
  const [service, setService] = useState(preselectedService || 'Website building');
  const [stage, setStage] = useState('Rapid Launch / MVP');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#090e1f] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-white font-display">Sprint Scoping Locked</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              We have held your architectural intake slot for <strong className="text-white">{selectedDate}</strong>. A Google Meet calendar invite has been sent to <span className="text-white font-mono">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="px-5 py-2.5 rounded-lg bg-white text-slate-950 text-xs font-semibold hover:bg-slate-100 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white font-display">
                Schedule a Scoping Call
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct consultation with our senior systems architects.
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
                    className="w-full px-3.5 py-2 rounded-lg bg-[#030712] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
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
                    className="w-full px-3.5 py-2 rounded-lg bg-[#030712] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Primary Discipline</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#030712] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                >
                  <option value="Website building">1. Website Building (Next.js & Edge)</option>
                  <option value="Platform automation and automated workflows">2. Platform Automation & Workflows</option>
                  <option value="Social media enhancement and management">3. Social Media Distribution</option>
                  <option value="AEO & GEO Marketing">4. AEO & GEO Generative Search</option>
                  <option value="Business models dropshipping">5. Turnkey Scaled Dropshipping</option>
                  <option value="Comprehensive Enterprise Transformation">Full Full-Stack Ecosystem</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Engagement Stage</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Rapid Launch / MVP', 'Growth Scaling', 'Enterprise System'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { sound.playClick(); setStage(s); }}
                      className={`p-2 rounded-lg text-xs border text-center transition ${
                        stage === s
                          ? 'border-white/30 bg-[#0f162d] text-white font-semibold'
                          : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Available Meeting Timeslot</label>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => { sound.playClick(); setSelectedDate(d); }}
                      className={`p-2 rounded-lg text-xs border text-left transition truncate ${
                        selectedDate === d
                          ? 'border-white/30 bg-[#0f162d] text-white font-semibold'
                          : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Brief Description (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Outline key requirements or objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#030712] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition shadow-sm"
              >
                Confirm Technical Intake
              </button>

              <div className="text-center text-[11px] text-slate-500">
                Direct discussion with engineering leaders. Zero sales friction.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
