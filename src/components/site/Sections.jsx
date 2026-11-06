import React, { useEffect, useRef, useState } from 'react';
import Split from './Split';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { scrollToId } from '../../world/useWorldScroll';
import { worldState } from '../../world/store';
import { LOW_POWER } from '../../world/quality';

function useStickyProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      const v = (window.scrollY - el.offsetTop) / Math.max(1, range);
      setP(Math.min(1, Math.max(0, v)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    read();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

export function Welcome({ onBook }) {
  return (
    <section id="welcome" data-kf="welcome" className="relative">
      <div data-depth className="relative min-h-[100svh] flex items-end">
      <div aria-hidden="true" className="absolute left-1/2 bottom-5 -translate-x-1/2">
        <div data-reveal className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8a91a3]">
          <span>Scroll</span>
          <span className="scroll-cue" />
        </div>
      </div>
      <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 pb-24 sm:pb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <h1 className="min-w-0 font-display font-medium text-white text-[clamp(3rem,6.9vw,8.4rem)] leading-[0.94] tracking-[-0.02em]">
          <span className="line-mask"><span data-line>Your whole launch,</span></span>
          <span className="line-mask"><span data-line>one team.</span></span>
        </h1>
        <div data-reveal className="lg:max-w-sm shrink-0">
          <p className="text-[17px] leading-relaxed text-[#b6bccb]">
            Website, AI automations, social growth, AI search and your online store, designed and built by senior engineers in a fixed-length sprint. You own all of it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={onBook} className="btn-primary h-12 px-5 text-sm">
              Book a scoping call <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollToId('services')} className="btn-ghost h-12 px-5 text-sm">
              See what we build <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" data-kf="about" className="relative min-h-[200vh]">
      <span data-kf="about-wide" aria-hidden="true" className="absolute left-0 h-px w-px pointer-events-none" style={{ top: '55%' }} />
      <div data-depth className="sticky top-0 min-h-[100svh] flex items-center justify-center px-5">
        <div className="max-w-4xl text-center">
          <Split lines={['Designed with care.', 'Built to be used.']} className="font-display font-medium text-white text-[clamp(2.6rem,6.2vw,6.4rem)] leading-[0.98] tracking-[-0.02em]" />
          <p data-reveal className="mt-8 mx-auto max-w-xl text-[17px] leading-relaxed text-[#b6bccb]">
            Nebulyx designs, builds and grows launches for founders. Design, engineering, AI and growth sit in one team, so nothing gets lost between agencies.
          </p>
          <p data-reveal className="mt-14 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-snug tracking-[-0.02em] text-white">
            Five vendors means five handovers.
            <span className="block text-[#7f8799]">One team means one plan.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Services({ onBookService }) {
  const ref = useRef(null);
  const p = useStickyProgress(ref);
  const active = Math.min(SERVICES_DATA.length - 1, Math.floor(p * 0.999 * SERVICES_DATA.length / 0.88));
  const s = SERVICES_DATA[Math.min(active, SERVICES_DATA.length - 1)];
  useEffect(() => {
    worldState.serviceActive = active;
  }, [active]);

  const jump = (i) => {
    const el = ref.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + range * 0.88 * ((i + 0.5) / SERVICES_DATA.length);
    if (worldState.lenis) worldState.lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo(0, y);
  };

  return (
    <section id="services" data-kf="services" ref={ref} className="relative min-h-[440vh]">
      <span data-kf="services-turn" aria-hidden="true" className="absolute left-0 h-px w-px pointer-events-none" style={{ top: '70%' }} />
      <div data-depth data-wipe="true" className="sticky top-0 min-h-[100svh] flex items-start lg:items-center pt-24 lg:pt-0 overflow-hidden">
        <span
          key={`n${active}`}
          aria-hidden="true"
          className="service-num pointer-events-none select-none absolute right-[2vw] bottom-[2vh] font-display font-medium leading-[0.8] tracking-[-0.07em] text-[44vw] lg:text-[26vw] text-white/[0.05]"
        >
          {String(active + 1).padStart(2, '0')}
        </span>
        <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Split lines={['Five services.', 'One team.']} className="font-display font-medium text-white text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[0.98] tracking-[-0.02em]" />
            <ol className="mt-10 space-y-1 hidden lg:block" aria-label="Services">
              {SERVICES_DATA.map((item, i) => (
                <li key={item.id} className="stagger-item" style={{ '--i': i + 1 }}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? 'true' : undefined}
                    className={`focus-ring w-full text-left py-2 flex items-center gap-3 transition-colors ${i === active ? 'text-white' : 'text-[#8a91a3] hover:text-white'}`}
                  >
                    <span aria-hidden="true" className={`w-1.5 h-2.5 -skew-y-[30deg] shrink-0 transition-colors ${i === active ? 'bg-[#3a5bff]' : 'bg-white/15'}`} />
                    <span className="text-[19px] tracking-[-0.01em]">{item.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4 lg:col-start-6 self-end lg:self-center" aria-live="polite">
            <div key={s.id} className="service-swap">
              <h3 className="font-display font-medium text-white text-[28px] leading-tight tracking-[-0.02em]">{s.tagline}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#b6bccb]">{s.summary}</p>
              <ul className="mt-6 space-y-2.5">
                {s.highlights.slice(0, 4).map((h, hi) => (
                  <li key={h} className={`service-line flex gap-3 text-[15px] text-[#d5d9e3] ${hi > 1 ? 'hidden sm:flex' : ''}`} style={{ animationDelay: `${(0.14 + hi * 0.07).toFixed(2)}s` }}>
                    <span className="mt-1.5 w-1.5 h-2.5 -skew-y-[30deg] bg-[#3a5bff] shrink-0" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => onBookService(s.title)} className="btn-ghost h-11 px-4 text-sm mt-8">
                Book a call about {s.shortTitle.toLowerCase()} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { key: 'Scope', line: 'Agreed in writing.', text: 'A short call, then a written scope, timeline and price you approve before anything starts.' },
  { key: 'Build', line: 'Progress every week.', text: 'We build in short cycles and show you working software every week.' },
  { key: 'Test', line: 'On real devices.', text: 'Tested on the phones and browsers your customers use, then launched with you.' },
  { key: 'Handover', line: 'Yours to keep.', text: 'Code, accounts and content in your name, with notes on how to run and change it.' },
];

export function Process() {
  const ref = useRef(null);
  const p = useStickyProgress(ref);
  const active = Math.min(STEPS.length - 1, Math.floor((p / 0.85) * STEPS.length));

  return (
    <section id="process" data-kf="process" ref={ref} className="relative min-h-[290vh]">
      <span data-kf="process-turn" aria-hidden="true" className="absolute left-0 h-px w-px pointer-events-none" style={{ top: '62%' }} />
      <div data-depth className="sticky top-0 min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-28 pb-16 sm:pb-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Split lines={['From first call', 'to handover.']} className="font-display font-medium text-white text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[0.98] tracking-[-0.02em]" />
          <p className="mt-6 mx-auto max-w-lg text-[17px] leading-relaxed text-[#b6bccb]">
            One fixed-length sprint, four steps, no surprises at the end.
          </p>
        </div>
        <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8">
        <div aria-hidden="true" className="relative h-[2px] mb-8 bg-white/15 hidden lg:block lg:ml-28">
          <span className="absolute inset-y-0 left-0 bg-[#3a5bff] shadow-[0_0_14px_#3a5bff]" style={{ width: `${Math.min(100, (p / 0.85) * 100).toFixed(2)}%` }} />
          <span className="absolute top-1/2 w-2 h-3 -mt-1.5 -ml-1 -skew-y-[30deg] bg-white shadow-[0_0_16px_#8fa2ff]" style={{ left: `${Math.min(100, (p / 0.85) * 100).toFixed(2)}%` }} />
        </div>
        <ol className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <li key={step.key} className={`stagger-item transition-colors duration-500 ${i === 0 ? 'lg:pl-28' : ''}`} style={{ '--i': i + 1 }}>
              <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.12em] uppercase">
                <span className={`grid place-items-center w-7 h-7 transition-transform duration-500 ${i === active ? 'scale-125 shadow-[0_0_18px_#3a5bff]' : ''} ${i <= active ? 'bg-[#3a5bff] text-white' : 'border border-white/25 text-[#b6bccb]'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={i <= active ? 'text-white' : 'text-[#8a91a3]'}>{step.key}</span>
              </div>
              <p className={`mt-2 sm:mt-3 text-[15px] sm:text-[17px] ${i <= active ? 'text-white' : 'text-[#8a91a3]'}`}>{step.line}</p>
              <p className={`hidden sm:block mt-1.5 text-[14px] leading-relaxed ${i <= active ? 'text-[#b6bccb]' : 'text-[#7f8799]'}`}>{step.text}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}

const SAMPLES = [
  {
    title: 'A launch site with a waitlist',
    tags: 'Websites · Automations',
    text: 'Design, build and launch, with an email waitlist that tags every sign-up and sends a welcome sequence.',
    steps: ['Sign-up', 'Tagged', 'Welcome email'],
  },
  {
    title: 'A support inbox on autopilot',
    tags: 'AI automations',
    text: 'An AI agent answers routine questions from your docs and hands anything unusual to a person.',
    steps: ['Question', 'AI agent', 'Answered'],
    branch: 'To a person',
  },
  {
    title: 'A store ready for its first ad',
    tags: 'Online stores · Social growth',
    text: 'Storefront, suppliers and order handling set up, plus a starter set of short videos to advertise it.',
    steps: ['Ad', 'Storefront', 'Supplier ships'],
  },
];

const FlowDiagram = React.memo(function FlowDiagram({ steps, branch }) {
  const w = 104;
  const gap = 24;
  return (
    <svg viewBox="0 0 360 150" className="w-full h-auto" role="img" aria-label={`${steps.join(' then ')}${branch ? `, or ${branch.toLowerCase()}` : ''}`}>
      {steps.map((label, i) => {
        const x = 4 + i * (w + gap);
        return (
          <g key={label}>
            <rect x={x} y="46" width={w} height="40" fill={i === steps.length - 1 ? '#3a5bff' : '#ffffff'} stroke="#3a5bff" strokeWidth="1.5" />
            <text x={x + w / 2} y="71" textAnchor="middle" fontSize="13" fill={i === steps.length - 1 ? '#ffffff' : '#11131a'} fontFamily="General Sans, sans-serif">{label}</text>
            {i < steps.length - 1 && (
              <path d={`M${x + w + 3} 66 h${gap - 8} m-5 -4 l5 4 l-5 4`} fill="none" stroke="#3a5bff" strokeWidth="1.5" />
            )}
          </g>
        );
      })}
      {branch && (
        <g>
          <path d="M184 86 v24 h80" fill="none" stroke="#3a5bff" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="236" y="104" width="120" height="34" fill="#ffffff" stroke="#11131a" strokeWidth="1.25" />
          <text x="296" y="126" textAnchor="middle" fontSize="13" fill="#11131a" fontFamily="General Sans, sans-serif">{branch}</text>
        </g>
      )}
    </svg>
  );
});

function useNarrow() {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return narrow;
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;
const PANEL_START = 0.1;
const PANEL_STEP = 0.27;
const PANEL_SPAN = 0.42;

function panelFlight(i, p, vw, narrow) {
  const s = (p - PANEL_START - i * PANEL_STEP) / PANEL_SPAN;
  if (s <= 0 || s >= 1) return { s, style: { visibility: 'hidden' } };
  const a = easeOut(clamp01(s / 0.34));
  const q = easeIn(clamp01((s - 0.72) / 0.28));
  const side = i % 2 === 0 ? 1 : -1;
  const reach = narrow ? 0.45 : 0.3;
  const x = side * vw * (reach * (1 - a) + (narrow ? 0.9 : 0.8) * q);
  const y = 70 * (1 - a) - 30 * q;
  const z = -2600 * (1 - a) + 650 * q;
  const ry = -side * (46 * (1 - a) + 30 * q);
  const rx = 8 * (1 - a);
  const opacity = Math.min(1, clamp01(s / 0.34) * 2.5) * (1 - clamp01((q - 0.12) / 0.55));
  return {
    s,
    style: {
      opacity,
      zIndex: Math.round(3000 + z),
      transform: `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`,
    },
  };
}

function useViewportWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1440 : window.innerWidth));
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}

export function Work() {
  const ref = useRef(null);
  const p = useStickyProgress(ref);
  const narrow = useNarrow();
  const vw = useViewportWidth();
  const reduced = worldState.reduced;
  const h = reduced ? 0 : easeIn(clamp01(p / PANEL_START));
  const flights = SAMPLES.map((_, i) => panelFlight(i, p, vw, narrow));
  let active = 0;
  flights.forEach((f, i) => { if (f.s > 0.2 && f.s < 1) active = i; });

  return (
    <section id="work" data-kf="work" ref={ref} className={`relative work-room ${reduced ? '' : 'min-h-[400vh]'}`}>
      <span data-kf="work-fly" aria-hidden="true" className="absolute left-0 h-px w-px pointer-events-none" style={{ top: '52%' }} />
      <div data-depth data-wipe="true" className={`${reduced ? 'py-28' : 'sticky top-0 h-[100svh] overflow-hidden'} flex flex-col justify-center`}>
        <div
          className="w-full mx-auto max-w-[1600px] px-5 sm:px-8"
          style={reduced ? undefined : {
            opacity: 1 - h,
            transform: `scale(${(1 + h * 1.6).toFixed(3)})`,
            filter: !LOW_POWER && h > 0.01 ? `blur(${(h * 12).toFixed(1)}px)` : undefined,
            transformOrigin: '30% 50%',
          }}
        >
          <Split lines={['What a sprint', 'looks like.']} className="font-display font-medium text-[#0b0d12] text-[clamp(2.6rem,7vw,7.4rem)] leading-[0.95] tracking-[-0.02em]" />
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#454b5a]">
            Illustrative examples of what one sprint can deliver. Every real project is scoped with the founder first.
          </p>
          {!reduced && <p className="mt-10 font-mono text-[11px] tracking-[0.16em] uppercase text-[#7f8799]">Scroll to fly through three samples</p>}
        </div>

        {reduced ? (
          <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 mt-12 grid gap-6">
            {SAMPLES.map((s, i) => <SamplePanel key={s.title} sample={s} index={i} reveal={1} drift={0} />)}
          </div>
        ) : (
          <div className="absolute inset-0 [perspective:1100px] [transform-style:preserve-3d]">
            {SAMPLES.map((s, i) => {
              const f = flights[i];
              const reveal = easeOut(clamp01((f.s - 0.24) / 0.2));
              return (
                <div key={s.title} className="absolute left-1/2 top-1/2 w-[min(88vw,1040px)] will-change-transform" style={f.style}>
                  <SamplePanel sample={s} index={i} reveal={reveal} drift={f.s - 0.55} />
                </div>
              );
            })}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[min(88vw,520px)] bottom-20 sm:bottom-8 flex items-center justify-center gap-4 font-mono text-[11px] tracking-[0.16em] uppercase text-[#454b5a]"
              style={{ opacity: clamp01((p - PANEL_START) * 12) * (1 - clamp01((p - 0.9) * 10)) }}
            >
              <span className="tabular-nums">{String(active + 1).padStart(2, '0')} / {String(SAMPLES.length).padStart(2, '0')}</span>
              <span className="relative flex-1 max-w-[240px] h-px bg-[#0b0d12]/15">
                <span className="absolute inset-y-0 left-0 bg-[#3a5bff]" style={{ width: `${(clamp01((p - PANEL_START) / (1 - PANEL_START - 0.06)) * 100).toFixed(1)}%` }} />
              </span>
              <span className="hidden sm:inline">{SAMPLES[active].tags}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SamplePanel({ sample, index, reveal, drift }) {
  const n = String(index + 1).padStart(2, '0');
  return (
    <article className="sample-card relative overflow-hidden bg-white text-[#0b0d12] p-6 sm:p-10 grid md:grid-cols-[1.05fr_1fr] gap-6 md:gap-10 items-center">
      <span
        aria-hidden="true"
        className="absolute -right-4 -bottom-10 font-display font-medium leading-none tracking-[-0.06em] text-[clamp(8rem,22vw,20rem)] text-[#0b0d12]/[0.05] select-none"
        style={{ transform: `translateX(${(drift * 220).toFixed(1)}px)` }}
      >
        {n}
      </span>
      <div className="relative">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#7f8799]">
          <span>{n} / 03</span>
          <span className="px-2 py-1 bg-[#0b0d12] text-white">Sample</span>
        </div>
        <h3
          className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.035em]"
          style={{ clipPath: `inset(0 ${((1 - reveal) * 100).toFixed(1)}% 0 0)` }}
        >
          {sample.title}
        </h3>
        <p className="mt-3 text-[13px] text-[#3a5bff]" style={{ opacity: reveal }}>{sample.tags}</p>
        <p
          className="mt-3 max-w-md text-[15px] sm:text-[16px] leading-relaxed text-[#454b5a]"
          style={{ opacity: reveal, transform: `translateY(${((1 - reveal) * 16).toFixed(1)}px)` }}
        >
          {sample.text}
        </p>
      </div>
      <div className="relative bg-[#f1f3f8] p-4 sm:p-6" style={{ transform: `translateX(${(drift * -70).toFixed(1)}px)` }}>
        <FlowDiagram steps={sample.steps} branch={sample.branch} />
      </div>
    </article>
  );
}

const CAPABILITIES = [
  ['Design and build', 'Sites and apps designed and built by the same people.'],
  ['AI automations', 'Agents and workflows that take routine work off your team.'],
  ['Social content', 'Short-form video and posts, planned and scheduled.'],
  ['AI search visibility', 'So assistants like ChatGPT describe you accurately.'],
  ['Online stores', 'Storefront, suppliers and orders, set up end to end.'],
  ['After launch', 'Handover notes, a walkthrough, and help when you need it.'],
];

export function Studio() {
  return (
    <section id="studio" data-kf="studio" className="relative min-h-[190vh]">
      <span data-kf="studio-orbit" aria-hidden="true" className="absolute left-0 h-px w-px pointer-events-none" style={{ top: '50%' }} />
      <div data-depth data-wipe="true" className="sticky top-0 min-h-[100svh] flex items-center pt-20 pb-16 lg:py-0">
        <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Split lines={['One team.', 'Every service.']} className="font-display font-medium text-white text-[clamp(2.6rem,6vw,6rem)] leading-[0.96] tracking-[-0.02em]" />
            <p data-reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-[#b6bccb]">
              Every skill a launch needs, in one senior team. Faster decisions, one plan, nothing lost between vendors.
            </p>
            <dl className="mt-6 sm:mt-10 grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-3 sm:gap-y-6 max-w-2xl">
              {CAPABILITIES.map(([t, d], ci) => (
                <div key={t} className="stagger-item" style={{ '--i': ci + 2 }}>
                  <dt className="text-white text-[15px] sm:text-[17px] pt-2 sm:pt-3 border-t border-white/[0.14]">{t}</dt>
                  <dd className="hidden sm:block mt-1 text-[14px] leading-relaxed text-[#9aa1b2]">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ onBook }) {
  return (
    <section id="contact" data-kf="contact" className="relative">
      <div data-depth className="min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 pt-32">
        <Split lines={['Your launch,', 'built by one team.']} className="font-display font-medium text-white text-[clamp(2.6rem,6vw,6.2rem)] leading-[0.96] tracking-[-0.02em]" />
        <p data-reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-[#b6bccb]">
          Tell us what you want to build and when. We'll reply with a written scope, timeline and price. No commitment until you approve them.
        </p>
        <button type="button" onClick={onBook} className="stagger-item btn-primary h-12 px-5 text-sm mt-8" style={{ '--i': 3 }}>
          Book a scoping call <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
        <footer className="mt-20 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#9aa1b2]">
          <span>© {new Date().getFullYear()} Nebulyx</span>
          <span>Websites · AI automations · Social growth · AI search · Online stores</span>
          <span>You own what we build</span>
        </footer>
      </div>
      <div aria-hidden="true" className="wordmark mt-6 font-display font-semibold text-white leading-[0.78] tracking-[-0.03em] text-center select-none">
        {'NEBULYX'.split('').map((ch, i) => (
          <span key={i} className="wm-char" style={{ '--i': i }}>{ch}</span>
        ))}
      </div>
      </div>
    </section>
  );
}
