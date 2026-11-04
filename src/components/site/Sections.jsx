import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { scrollToId } from '../../world/useWorldScroll';
import { worldState } from '../../world/store';

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
    <section id="welcome" className="relative min-h-[100svh] flex items-end">
      <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 pb-24 sm:pb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <h1 className="min-w-0 font-display font-normal text-white text-[clamp(3rem,6.9vw,8.4rem)] leading-[0.94] tracking-[-0.045em]">
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
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative min-h-[180vh]">
      <div className="sticky top-0 min-h-[100svh] flex items-center justify-center px-5">
        <div className="max-w-4xl text-center">
          <h2 data-reveal className="font-display text-white text-[clamp(2.6rem,6.2vw,6.4rem)] leading-[0.98] tracking-[-0.04em]">
            Designed with care.
            <br />
            Built to be used.
          </h2>
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
    <section id="services" ref={ref} className="relative min-h-[520vh]">
      <div className="sticky top-0 min-h-[100svh] flex items-start lg:items-center pt-24 lg:pt-0">
        <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-white text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[0.98] tracking-[-0.04em]">
              Five services.
              <br />
              One team.
            </h2>
            <ol className="mt-10 space-y-1 hidden lg:block" aria-label="Services">
              {SERVICES_DATA.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? 'true' : undefined}
                    className={`focus-ring w-full text-left py-2 flex items-center gap-3 transition-colors ${i === active ? 'text-white' : 'text-[#8a91a3] hover:text-white'}`}
                  >
                    <span aria-hidden="true" className={`w-1.5 h-1.5 shrink-0 transition-colors ${i === active ? 'bg-[#3a5bff]' : 'bg-white/15'}`} />
                    <span className="text-[19px] tracking-[-0.01em]">{item.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4 lg:col-start-6 self-end lg:self-center" aria-live="polite">
            <div key={s.id} className="service-swap">
              <h3 className="font-display text-white text-[28px] leading-tight tracking-[-0.02em]">{s.tagline}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#b6bccb]">{s.summary}</p>
              <ul className="mt-6 space-y-2.5">
                {s.highlights.slice(0, 4).map((h, hi) => (
                  <li key={h} className={`flex gap-3 text-[15px] text-[#d5d9e3] ${hi > 1 ? 'hidden sm:flex' : ''}`}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3a5bff] shrink-0" aria-hidden="true" />
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
    <section id="process" ref={ref} className="relative min-h-[360vh]">
      <div className="sticky top-0 min-h-[100svh] flex flex-col justify-between pt-28 pb-24 sm:pb-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-white text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[0.98] tracking-[-0.04em]">
            From first call
            <br />
            to handover.
          </h2>
          <p className="mt-6 mx-auto max-w-lg text-[17px] leading-relaxed text-[#b6bccb]">
            One fixed-length sprint, four steps, no surprises at the end.
          </p>
        </div>
        <ol className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <li key={step.key} className={`transition-colors duration-500 ${i === 0 ? 'lg:pl-28' : ''}`}>
              <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.12em] uppercase">
                <span className={`grid place-items-center w-7 h-7 ${i <= active ? 'bg-[#3a5bff] text-white' : 'border border-white/25 text-[#b6bccb]'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={i <= active ? 'text-white' : 'text-[#8a91a3]'}>{step.key}</span>
              </div>
              <p className={`mt-3 text-[17px] ${i <= active ? 'text-white' : 'text-[#8a91a3]'}`}>{step.line}</p>
              <p className={`mt-1.5 text-[14px] leading-relaxed ${i <= active ? 'text-[#b6bccb]' : 'text-[#7f8799]'}`}>{step.text}</p>
            </li>
          ))}
        </ol>
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

function FlowDiagram({ steps, branch }) {
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
}

export function Work() {
  return (
    <section id="work" className="relative work-room py-32 sm:py-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <h2 data-reveal className="font-display text-[#0b0d12] text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[0.98] tracking-[-0.04em]">
            What a sprint
            <br />
            looks like.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#454b5a]">
            Illustrative examples of what one sprint can deliver. Every real project is scoped with the founder first.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6 [perspective:1400px]">
          {SAMPLES.map((s, i) => (
            <article
              key={s.title}
              data-reveal
              className="sample-card bg-white text-[#0b0d12] p-6 sm:p-7"
              style={{ '--tilt': `${(i - 1) * 4}deg` }}
            >
              <div className="flex justify-end">
                <span className="px-2 py-1 bg-[#0b0d12] text-white font-mono text-[11px] tracking-[0.14em] uppercase">Sample</span>
              </div>
              <div className="mt-4 bg-[#f1f3f8] p-4">
                <FlowDiagram steps={s.steps} branch={s.branch} />
              </div>
              <h3 className="mt-6 text-[22px] leading-tight tracking-[-0.02em] font-medium">{s.title}</h3>
              <p className="mt-1 text-[13px] text-[#3a5bff]">{s.tags}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#454b5a]">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
    <section id="studio" className="relative min-h-[150vh]">
      <div className="sticky top-0 min-h-[100svh] flex items-center">
        <div className="w-full mx-auto max-w-[1600px] px-5 sm:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <h2 data-reveal className="font-display text-white text-[clamp(2.6rem,6vw,6rem)] leading-[0.96] tracking-[-0.04em]">
              One team.
              <br />
              Every service.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-[#b6bccb]">
              Every skill a launch needs, in one senior team. Faster decisions, one plan, nothing lost between vendors.
            </p>
            <dl className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
              {CAPABILITIES.map(([t, d]) => (
                <div key={t} data-reveal>
                  <dt className="text-white text-[17px] pt-3 border-t border-white/[0.14]">{t}</dt>
                  <dd className="mt-1 text-[14px] leading-relaxed text-[#9aa1b2]">{d}</dd>
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
    <section id="contact" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 pt-32">
        <h2 data-reveal className="font-display text-white text-[clamp(2.6rem,6vw,6.2rem)] leading-[0.96] tracking-[-0.04em]">
          Your launch,
          <br />
          built by one team.
        </h2>
        <p data-reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-[#b6bccb]">
          Tell us what you want to build and when. We'll reply with a written scope, timeline and price. No commitment until you approve them.
        </p>
        <button type="button" onClick={onBook} className="btn-primary h-12 px-5 text-sm mt-8">
          Book a scoping call <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
        <footer className="mt-20 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#9aa1b2]">
          <span>© {new Date().getFullYear()} Nebulyx</span>
          <span>Websites · AI automations · Social growth · AI search · Online stores</span>
          <span>You own what we build</span>
        </footer>
      </div>
      <div aria-hidden="true" className="wordmark mt-6 font-display font-medium text-white leading-[0.78] tracking-[-0.06em] text-center select-none">
        NEBULYX
      </div>
    </section>
  );
}
