import React, { useState } from 'react';
import { X, Check, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { submitForm } from '../utils/submitForm';
import { SERVICES_DATA } from '../data/services';

// App mounts this only while open, so state resets and preselectedService applies on each open.
export default function ConsultationDrawer({ onClose, preselectedService = '' }) {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM EST');
  const [service, setService] = useState(preselectedService || SERVICES_DATA[0].title);
  const [stage, setStage] = useState('Rapid Launch / MVP');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dates = [
    'Tomorrow, 2:00 PM EST',
    'Tomorrow, 4:30 PM EST',
    'Wednesday, 11:00 AM EST',
    'Thursday, 3:00 PM EST'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    try {
      await submitForm('Scoping call request', {
        ...formData,
        service,
        stage,
        preferredTime: selectedDate,
      });
      sound.playSuccess();
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#070b16] border border-white/[0.12] rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Request Received</h3>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Thanks, {formData.name}. We'll confirm your <strong className="text-white">{selectedDate}</strong> slot by email at <span className="text-white font-mono">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white font-display tracking-tight">
                Schedule Architecture Intake
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Direct technical consultation with our senior systems architects.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-black/60 border border-white/[0.10] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-black/60 border border-white/[0.10] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Primary Discipline</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.10] text-xs text-white focus:outline-none focus:border-white/30"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>{Number(s.number)}. {s.shortTitle}</option>
                  ))}
                  <option value="Comprehensive Enterprise Transformation">Full-Stack Ecosystem</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Engagement Stage</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Rapid Launch / MVP', 'Growth Scaling', 'Enterprise System'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { sound.playClick(); setStage(s); }}
                      className={`p-2.5 rounded-xl text-xs border text-center transition cursor-pointer ${
                        stage === s
                          ? 'border-white/[0.30] bg-white/[0.08] text-white font-semibold'
                          : 'border-white/[0.06] bg-black/40 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Available Intake Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => { sound.playClick(); setSelectedDate(d); }}
                      className={`p-2.5 rounded-xl text-xs border text-left transition truncate cursor-pointer ${
                        selectedDate === d
                          ? 'border-white/[0.30] bg-white/[0.08] text-white font-semibold'
                          : 'border-white/[0.06] bg-black/40 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Brief Architecture Goals (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Outline key requirements or target milestones..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/[0.10] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                ></textarea>
              </div>

              {error && (
                <div role="alert" className="text-xs text-red-400 text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                {isSubmitting ? 'Sending…' : 'Confirm Technical Intake Slot'}
              </button>

              <div className="text-center text-[11px] text-neutral-400">
                Direct discussion with senior engineering architects. Zero sales friction.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
