import React from 'react';
import { NebulyxLogo } from './Brand';
import { SERVICES_DATA } from '../../data/services';
import { SERVICE_PAGES, PROCESS_STEPS } from '../../data/servicePages';
import { CONTACT } from '../../data/contact';
import ServiceVisual from './ServiceVisual';
import { IO_SCRIPT, delay, Drift, BgShape, Check, Statement, StepIcon } from './labs';

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const line = 'border-[color:var(--sp-line)]';
const link = 'text-[color:var(--sp-accent-ink)] underline decoration-[color:var(--sp-line-strong)] underline-offset-4 hover:decoration-current';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const h2 = `font-display font-medium ${ink} text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.025em]`;
const navLink = 'focus-ring transition-opacity hover:opacity-100';
const footLink = 'focus-ring transition-colors hover:text-[color:var(--sp-ink)]';

const CHIPS = [
  { pos: 'sp-chip-a', d: '0.5s', drift: { '--dx': '7.6s', '--dy': '18.3s', '--dr': '14.1s', '--ax': '9px', '--ay': '16px', '--ar': '2.5deg' } },
  { pos: 'sp-chip-b', d: '0.62s', drift: { '--dx': '8.9s', '--dy': '15.2s', '--dr': '11.1s', '--ax': '12px', '--ay': '12px', '--ar': '3deg' } },
  { pos: 'sp-chip-c', d: '0.74s', drift: { '--dx': '9.5s', '--dy': '17.4s', '--dr': '13.8s', '--ax': '8px', '--ay': '18px', '--ar': '2deg' } },
  { pos: 'sp-chip-d', d: '0.86s', drift: { '--dx': '10.5s', '--dy': '19.2s', '--dr': '15.2s', '--ax': '11px', '--ay': '14px', '--ar': '3.5deg' } },
];

export function servicePath(slug) {
  return `/services/${slug}/`;
}

function bookHref(service) {
  return `/?book=${encodeURIComponent(service.title)}`;
}

export default function ServicePage({ id, tone = 'dark' }) {
  const service = SERVICES_DATA.find((s) => s.id === id);
  const page = SERVICE_PAGES[id];
  const others = SERVICES_DATA.filter((s) => s.id !== id);

  return (
    <div className="service-page min-h-[100svh] antialiased" data-tone={tone}>
      <script dangerouslySetInnerHTML={{ __html: IO_SCRIPT }} />
      <header data-header data-surface="dark" className="sp-header">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="/" aria-label="Nebulyx home" className="focus-ring">
            <NebulyxLogo />
          </a>
          <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-[14px]">
            <a href="/#services" className={navLink}>Services</a>
            <a href="/#process" className={navLink}>How it works</a>
            <a href="/#faq" className={navLink}>FAQ</a>
            <a href="/journal/" className={navLink}>Journal</a>
            <a href="/about/" className={navLink}>About</a>
          </nav>
          <a href={bookHref(service)} className="sp-btn sp-btn-light h-10 px-5 text-[14px]">Book a call</a>
        </div>
      </header>

      <div className="sp-hero-band">
        <div data-hero className="sp-hero-sentinel" aria-hidden="true" />
        <BgShape kind="stars" color="rgba(0,200,255,0.08)" style={{ '--s': '220px', left: '8%', top: '120px' }} d="0.2s" drift={{ '--dx': '11s', '--dy': '17s', '--dr': '23s', '--ar': '12deg' }} />
        <BgShape kind="cloud" color="rgba(143,162,255,0.06)" style={{ '--s': '300px', right: '-60px', top: '60px' }} d="0.35s" drift={{ '--dx': '13s', '--dy': '19s', '--dr': '21s', '--ar': '6deg' }} />
        <section className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-16 sm:pt-24 text-center">
          <ul aria-hidden="true" className="sp-chips">
            {service.deliverables.slice(0, 4).map((d, i) => (
              <li key={d} className={`sp-chip-pos ${CHIPS[i].pos}`} data-io style={{ '--d': CHIPS[i].d }}>
                <Drift vars={CHIPS[i].drift}><span className="sp-chip">{d}</span></Drift>
              </li>
            ))}
          </ul>
          <nav aria-label="Breadcrumb" className="relative text-[13px] text-white/50">
            <ol className="flex flex-wrap justify-center gap-2">
              <li><a href="/" className="focus-ring hover:text-white">Home</a> /</li>
              <li><a href="/#services" className="focus-ring hover:text-white">Services</a> /</li>
              <li aria-current="page" className="text-white/80">{service.shortTitle}</li>
            </ol>
          </nav>
          <h1 className="relative mt-6 mx-auto max-w-4xl font-display font-medium text-white text-[clamp(2.5rem,6.4vw,5.2rem)] leading-[1] tracking-[-0.03em]">{page.h1}</h1>
          <p className="relative mt-6 mx-auto max-w-xl text-[19px] leading-relaxed text-white/75">{service.tagline}.</p>
          <div className="relative mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
            <a href={bookHref(service)} className="sp-btn sp-btn-light h-12 px-6 text-[15px]">Book a scoping call</a>
            <a href={`mailto:${CONTACT.email}`} className="focus-ring text-[15px] text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white">{CONTACT.email}</a>
          </div>
          <div className="sp-stage relative mt-16 sm:mt-20 mx-auto max-w-[560px]">
            <div className="sp-pop" style={{ '--d': '0.25s' }}>
              <Drift vars={{ '--dx': '12s', '--dy': '16s', '--dr': '20s', '--ax': '4px', '--ay': '8px', '--ar': '0.8deg' }}>
                <ServiceVisual id={id} />
              </Drift>
            </div>
          </div>
        </section>
      </div>

      <main className="relative">
        <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 sm:px-8">
          <p className={`${kicker} text-center`}>Why it matters</p>
          <div className="mt-6"><Statement text={page.intro.map(({ strong, text }) => `${strong}${text}`).join(' ')} /></div>
        </section>

        <section className="relative py-16 sm:py-24 px-5 sm:px-8">
          <BgShape kind="slab" color="rgba(0, 200, 255, 0.35)" style={{ '--s': '520px', left: 'max(-200px, -16vw)', top: '-40px' }} drift={{ '--dx': '14s', '--dy': '21s', '--dr': '25s', '--ax': '14px', '--ay': '20px', '--ar': '4deg' }} />
          <BgShape kind="planet" color="rgba(58, 91, 255, 0.35)" style={{ '--s': '260px', right: 'max(-90px, -6vw)', bottom: '-60px' }} d="0.2s" drift={{ '--dx': '9s', '--dy': '15s', '--dr': '18s', '--ax': '10px', '--ay': '14px' }} />
          <div className="relative mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-5">
            <div className="sp-card p-7 sm:p-10" data-io style={delay(0)}>
              <h2 className={h2}>What you get</h2>
              <ul className="mt-8 space-y-4">
                {service.deliverables.map((d, i) => (
                  <li key={d} className="flex gap-3 text-[16px] leading-relaxed" style={{ '--cd': `${i * 0.12}s` }}><Check />{d}</li>
                ))}
              </ul>
            </div>
            <div className="sp-card p-7 sm:p-10" data-io style={delay(1, 0.12)}>
              <h2 className={h2}>How it is built</h2>
              <p className="mt-8 text-[16px] leading-relaxed">{service.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.highlights.map((h) => (
                  <li key={h} className={`px-3.5 py-2 rounded-full bg-[var(--sp-tint)] text-[14px] ${ink}`}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <p className={kicker} data-io>Who it is for</p>
            <ul className="sp-who mt-8 grid md:grid-cols-2 gap-x-12">
              {page.forWho.map((w, i) => (
                <li key={w} data-io style={delay(i, 0.08, 0.1)} className={`flex gap-4 py-6 border-t ${line} font-display text-[clamp(1.15rem,1.8vw,1.45rem)] leading-snug ${ink}`}>
                  <span aria-hidden="true" className="mt-[9px] w-2 h-2 rounded-full bg-[var(--sp-accent)] shrink-0" />{w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {id === 'aeo-geo-marketing' && (
          <section className="px-5 sm:px-8 pt-4">
            <a href="/ai-visibility-check/" className="sp-card focus-ring mx-auto max-w-[1200px] flex flex-wrap items-center justify-between gap-6 p-7 sm:p-9" data-io>
              <span>
                <span className={kicker}>Free</span>
                <span className={`mt-2 block font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight ${ink}`}>See what ChatGPT says about your business</span>
                <span className="mt-2 block text-[16px]">A free AI visibility check across four assistants, with what to fix first.</span>
              </span>
              <span className="sp-btn h-12 px-6 text-[15px]">Get my free check</span>
            </a>
          </section>
        )}

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-5">
            <div className="sp-card p-7 sm:p-10" data-io>
              <h2 className={h2}>What we need from you</h2>
              <ul className="mt-8 space-y-4">
                {page.needs.map((n, i) => (
                  <li key={n} className="flex gap-3 text-[16px] leading-relaxed" style={{ '--cd': `${i * 0.12}s` }}><Check />{n}</li>
                ))}
              </ul>
            </div>
            <div className="sp-card p-7 sm:p-10" data-io style={delay(1, 0.12)}>
              <h2 className={h2}>What affects the price</h2>
              <ul className="mt-8 space-y-4">
                {page.priceFactors.map((f, i) => (
                  <li key={f} className="flex gap-3 text-[16px] leading-relaxed" style={{ '--cd': `${i * 0.12}s` }}><Check />{f}</li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed">You get a fixed, written price after the scoping call. Nothing starts until you approve it.</p>
            </div>
          </div>
          <div className="mx-auto max-w-[1200px] mt-10 flex flex-wrap items-center gap-2" data-io>
            <span className={`${kicker} mr-2`}>Tools we often use</span>
            {page.tools.map((t) => (
              <span key={t} className={`px-3.5 py-2 rounded-full border ${line} bg-[var(--sp-card)] text-[14px] ${ink}`}>{t}</span>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <h2 className={`${h2} text-center`} data-io>How it works</h2>
            <div className="sp-steps mt-14" data-io>
              <div className="sp-rail" aria-hidden="true" />
              <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PROCESS_STEPS.map((step, i) => (
                  <li key={step.key} data-io style={delay(i, 0.18, 0.15)}>
                    <StepIcon step={step} />
                    <p className={`mt-6 flex items-baseline gap-2 font-display text-[22px] ${ink}`}>
                      <span className={`font-mono text-[13px] ${muted}`}>0{i + 1}</span>{step.key}
                    </p>
                    <p className={`mt-1 text-[16px] ${ink}`}>{step.line}</p>
                    <p className="mt-2 text-[15px] leading-relaxed">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className={`${h2} text-center`} data-io>Questions</h2>
            <div className={`mt-10 border-t ${line}`} data-io style={delay(1)}>
              {page.faqs.map(({ q, a }) => (
                <details key={q} className={`faq-item border-b ${line}`}>
                  <summary className={`focus-ring py-6 cursor-pointer text-[18px] ${ink}`}>{q}</summary>
                  <p className="pb-6 text-[16px] leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-end justify-between gap-6" data-io>
              <h2 className={h2}>Explore other services</h2>
              <p className={`hidden sm:block text-[14px] ${muted}`}>Swipe or scroll →</p>
            </div>
            <ul className="sp-rail-scroll mt-10">
              {others.map((s, i) => (
                <li key={s.id} data-io style={delay(i, 0.1)}>
                  <a href={servicePath(SERVICE_PAGES[s.id].slug)} className="sp-card focus-ring flex flex-col h-full p-4">
                    <div className="sp-mini"><ServiceVisual id={s.id} /></div>
                    <span className={`mt-5 px-2 font-mono text-[12px] ${muted}`}>{s.number}</span>
                    <span className={`mt-1 px-2 block font-display text-[20px] leading-tight ${ink}`}>{s.title}</span>
                    <span className="mt-1.5 px-2 pb-2 block text-[14px] leading-snug">{s.tagline}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative py-24 sm:py-32 px-5 sm:px-8">
          <BgShape kind="orbit" color="rgba(0, 200, 255, 0.35)" style={{ '--s': '420px', right: 'max(-160px, -12vw)', top: '-20px' }} drift={{ '--dx': '12s', '--dy': '18s', '--dr': '22s', '--ax': '12px', '--ay': '16px' }} />
          <BgShape kind="comet" color="rgba(58, 91, 255, 0.35)" style={{ '--s': '240px', left: 'max(-60px, -4vw)', bottom: '0' }} d="0.2s" drift={{ '--dx': '10s', '--dy': '16s', '--dr': '19s', '--ar': '5deg' }} />
          <div className="relative mx-auto max-w-3xl text-center" data-io>
            <h2 className={h2}>Tell us what you want to build</h2>
            <p className="mt-5 mx-auto max-w-xl text-[17px] leading-relaxed">You get a written scope, timeline and price after a short call. No commitment until you approve them.</p>
            <div className="mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
              <a href={bookHref(service)} className="sp-btn h-12 px-6 text-[15px]">Book a scoping call</a>
              <span className={`text-[15px] ${muted}`}>or email <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></span>
            </div>
          </div>
        </section>
      </main>

      <footer className={`mx-auto max-w-[1200px] px-5 sm:px-8 py-10 border-t ${line} flex flex-wrap gap-x-8 gap-y-2 text-[13px] ${muted}`}>
        <span>© 2026 Nebulyx · {CONTACT.location}</span>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={footLink}>Instagram {CONTACT.instagramHandle}</a>
        <a href={`mailto:${CONTACT.email}`} className={footLink}>{CONTACT.email}</a>
        <a href="/ai-visibility-check/" className={footLink}>Free AI check</a>
        <a href="/journal/" className={footLink}>Journal</a>
        <a href="/about/" className={footLink}>About</a>
        <a href="/privacy.html" className={footLink}>Privacy</a>
        <a href="/terms.html" className={footLink}>Terms</a>
      </footer>
    </div>
  );
}
