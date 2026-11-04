import React, { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import { submitForm } from '../utils/submitForm';
import { SERVICES_DATA } from '../data/services';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
const field = 'w-full px-3.5 py-3 bg-[#05060a] border border-white/[0.18] rounded-[2px] text-[16px] text-white placeholder:text-[#7f8799] focus:outline-none focus:border-[#8fa2ff]';
const chip = (on) =>
  `focus-ring px-3 py-2.5 rounded-[2px] text-[14px] border text-center transition-colors cursor-pointer ${
    on ? 'border-[#3a5bff] bg-[#3a5bff] text-white' : 'border-white/[0.18] text-[#b6bccb] hover:text-white hover:border-white/40'
  }`;

// App mounts this only while open, so state resets and preselectedService applies on each open.
export default function ConsultationDrawer({ onClose, preselectedService = '' }) {
  const [selectedDate, setSelectedDate] = useState('Any time');
  const [service, setService] = useState(preselectedService || SERVICES_DATA[0].title);
  const [stage, setStage] = useState('Just starting');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const dates = ['Mornings', 'Afternoons', 'Evenings', 'Any time'];

  useEffect(() => {
    const trigger = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector('input, button')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);

  useEffect(() => {
    if (isSuccess) panelRef.current?.querySelector('button')?.focus();
  }, [isSuccess]);

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
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05060a]/85"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#0b0d14] border border-white/[0.16] p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute top-4 right-4 w-11 h-11 grid place-items-center text-[#b6bccb] hover:text-white"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {isSuccess ? (
          <div className="py-8" role="status">
            <span className="grid place-items-center w-11 h-11 bg-[#3a5bff] text-white" aria-hidden="true">
              <Check className="w-5 h-5" />
            </span>
            <h2 id="consult-title" className="mt-6 font-display text-white text-[30px] leading-tight tracking-[-0.03em]">Request sent</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#b6bccb]">
              Thanks, {formData.name}. We'll email you at <span className="text-white">{formData.email}</span> to set up a time for your call.
            </p>
            <button type="button" onClick={onClose} className="btn-primary h-12 px-5 text-sm mt-8">
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="consult-title" className="pr-10 font-display text-white text-[30px] leading-tight tracking-[-0.03em]">
              Book a scoping call
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#b6bccb]">
              A short call with the engineers who would build it. Tell us a little about your project and we'll email you to set up a time.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-name" className="block text-[13px] text-[#d5d9e3] mb-1.5">Your name</label>
                  <input
                    id="consult-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="consult-email" className="block text-[13px] text-[#d5d9e3] mb-1.5">Email</label>
                  <input
                    id="consult-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={field}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="consult-service" className="block text-[13px] text-[#d5d9e3] mb-1.5">What do you need help with?</label>
                <select id="consult-service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>{s.shortTitle}</option>
                  ))}
                  <option value="Several services">Several of these</option>
                </select>
              </div>

              <div>
                <div id="consult-stage-label" className="block text-[13px] text-[#d5d9e3] mb-1.5">Where is your business now?</div>
                <div role="group" aria-labelledby="consult-stage-label" className="grid grid-cols-3 gap-2">
                  {['Just starting', 'Growing', 'Established'].map((s) => (
                    <button key={s} type="button" aria-pressed={stage === s} onClick={() => setStage(s)} className={chip(stage === s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div id="consult-time-label" className="block text-[13px] text-[#d5d9e3] mb-1.5">Best time for a call</div>
                <div role="group" aria-labelledby="consult-time-label" className="grid grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button key={d} type="button" aria-pressed={selectedDate === d} onClick={() => setSelectedDate(d)} className={chip(selectedDate === d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="consult-message" className="block text-[13px] text-[#d5d9e3] mb-1.5">What do you want to build? (optional)</label>
                <textarea
                  id="consult-message"
                  rows="3"
                  placeholder="A few lines is plenty, e.g. a launch site for our app by March"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={field}
                />
              </div>

              {error && (
                <div role="alert" className="text-[14px] text-[#ff8a8a]">{error}</div>
              )}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center h-12 text-[15px] disabled:opacity-60 disabled:cursor-wait">
                {isSubmitting ? 'Sending…' : 'Send request'}
              </button>

              <p className="text-[13px] text-[#9aa1b2]">
                No commitment. You'll get a written scope and price before anything starts.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
