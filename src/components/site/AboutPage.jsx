import React from 'react';
import { NebulyxLogo } from './Brand';
import { SERVICES_DATA } from '../../data/services';
import { SERVICE_PAGES, PROCESS_STEPS } from '../../data/servicePages';
import { CONTACT } from '../../data/contact';
import ServiceVisual from './ServiceVisual';
import { servicePath } from './ServicePage';
import { IO_SCRIPT, delay, BgShape, Check, Statement, StepIcon } from './labs';

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const line = 'border-[color:var(--sp-line)]';
const link = 'text-[color:var(--sp-accent-ink)] underline decoration-[color:var(--sp-line-strong)] underline-offset-4 hover:decoration-current';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const h2 = `font-display font-medium ${ink} text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.025em]`;
const navLink = 'focus-ring transition-opacity hover:opacity-100';
const footLink = 'focus-ring transition-colors hover:text-[color:var(--sp-ink)]';

export const ABOUT_PATH = '/about/';

const PRINCIPLES = [
  ['One team, one plan', 'Design, engineering, AI and growth sit in the same team, so nothing gets lost between agencies and you deal with one point of contact.'],
  ['A written price before work starts', 'Every project begins with a short call and a written scope, timeline and price. Nothing starts until you approve it.'],
  ['Progress you can see every week', 'We work in short cycles and show you working results every week, so you can steer early instead of waiting for a big reveal.'],
  ['You own everything', 'Code, domains, accounts and content are set up in your name. You can keep working with us, take it in-house or move to another team.'],
  ['Built to be found', 'Sites are fast, readable by search engines and AI assistants from the first page view, and measured in Search Console.'],
  ['Honest about what AI can do', 'We use AI where it saves real time, keep a person in charge of anything unusual, and never promise rankings, sales or recommendations.'],
];

const FOUNDERS = [
  {
    name: CONTACT.founder,
    alias: CONTACT.founderAlias,
    initials: 'SK',
    role: 'Founder',
    primary: true,
    bio: 'Owns the look, the build and the reach. Sonu designs the brand, engineers the site and the AI automations behind it, and makes sure search engines and AI assistants find everything he ships.',
    leads: ['Design & brand', 'Engineering & AI', 'Growth & AI search'],
    link: { href: '/journal/', label: 'Read the Journal →' },
    signature: true,
  },
  {
    name: CONTACT.coFounder,
    initials: 'HH',
    role: 'Co-founder',
    bio: 'Owns growth and delivery. Hari turns launches into audiences with content, ads and marketing, and runs every project from the first call to the handover, so nothing slips.',
    leads: ['Growth & marketing', 'Client success & ops'],
    link: { href: '/?book=', label: 'Book a scoping call →' },
  },
];

const SIGNATURE_PATHS = [
  'M12 104C60 104 100 101 128 99',
  'M198 32C192 18 166 16 158 30C150 44 168 54 180 62C194 72 198 92 182 104C168 114 140 112 128 99',
  'M224 16C223 52 218 94 208 142',
  'M262 28C248 44 236 56 224 65C238 68 248 82 254 100',
  'M262 100L266 80M266 87C270 80 276 79 281 83',
  'M298 82C289 80 284 92 289 98C295 103 304 95 302 87C301 82 297 80 294 82',
  'M330 85C324 79 313 83 313 92C313 100 323 102 330 96',
  'M344 58L337 100M356 80L341 91L357 100C372 99 392 96 414 94',
];

function SignatureMark() {
  return (
    <svg viewBox="0 0 430 150" role="img" aria-label="Signature: SKROCK" className="sig-draw shrink-0 w-[120px] sm:w-[150px] h-auto -mb-2" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(24 0) skewX(-12)">
        {SIGNATURE_PATHS.map((d, i) => <path key={d} d={d} pathLength="1" style={{ '--sd': `${(0.5 + i * 0.16).toFixed(2)}s` }} />)}
      </g>
      <circle cx="426" cy="94" r="3" fill="currentColor" stroke="none" className="sig-dot" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="service-page min-h-[100svh] antialiased" data-tone="dark">
      <script dangerouslySetInnerHTML={{ __html: IO_SCRIPT }} />
      <header data-header data-surface="dark" className="sp-header">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="/" aria-label="Nebulyx home" className="focus-ring"><NebulyxLogo /></a>
          <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-[14px]">
            <a href="/#services" className={navLink}>Services</a>
            <a href="/#process" className={navLink}>How it works</a>
            <a href="/journal/" className={navLink}>Journal</a>
            <a href={ABOUT_PATH} aria-current="page" className={navLink}>About</a>
          </nav>
          <a href="/?book=" className="sp-btn sp-btn-light h-10 px-5 text-[14px]">Book a call</a>
        </div>
      </header>

      <div className="sp-hero-band sp-hero-band--full">
        <div data-hero className="sp-hero-sentinel" aria-hidden="true" />
        <BgShape color="rgba(0,200,255,0.10)" style={{ '--s': '480px', left: '8%', top: '60px' }} d="0.2s" />
        <BgShape color="rgba(58,91,255,0.08)" style={{ '--s': '440px', right: '-40px', top: '40px' }} d="0.35s" />
        <section className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-16 sm:pt-24 pb-28 text-center">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
            <ol className="flex flex-wrap justify-center gap-2">
              <li><a href="/" className="focus-ring hover:text-white">Home</a> /</li>
              <li aria-current="page" className="text-white/80">About</li>
            </ol>
          </nav>
          <h1 className="mt-6 mx-auto max-w-4xl font-display font-medium text-white text-[clamp(2.5rem,6.4vw,5.2rem)] leading-[1] tracking-[-0.03em]">A studio that builds whole launches</h1>
          <p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-white/75">
            Nebulyx is a studio based in {CONTACT.location}, working with founders worldwide. We design, build and grow launches, with design, engineering, AI and growth under one roof.
          </p>
        </section>
      </div>

      <main className="relative">
        <section className="px-5 sm:px-8 pt-8 pb-20 sm:pb-28">
          <p className={`${kicker} text-center`}>Why we exist</p>
          <div className="mt-6"><Statement text="Five vendors means five handovers. One team means one plan." /></div>
          <p className="mt-10 mx-auto max-w-2xl text-center text-[17px] leading-relaxed" data-io>
            Most founders hire a designer, a developer, an automation freelancer, a social agency and an SEO consultant, then spend their week keeping them in sync. We put those skills in one senior team that plans the launch together and ships it in a fixed-length sprint.
          </p>
        </section>

        <section className="relative py-16 sm:py-24 px-5 sm:px-8">
          <BgShape color="rgba(0, 200, 255, 0.08)" style={{ '--s': '520px', left: '-120px', top: '-20px' }} />
          <div className="relative mx-auto max-w-[1200px]">
            <h2 className={`${h2} text-center`} data-io>How we work</h2>
            <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRINCIPLES.map(([title, text], i) => (
                <li key={title} className="sp-card p-7" data-io style={delay(i, 0.08)}>
                  <p className={`flex gap-3 font-display text-[20px] leading-snug ${ink}`}><Check />{title}</p>
                  <p className="mt-3 text-[15px] leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <h2 className={`${h2} text-center`} data-io>From first call to handover</h2>
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
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-end justify-between gap-6" data-io>
              <h2 className={h2}>What we do</h2>
              <p className={`hidden sm:block text-[14px] ${muted}`}>Swipe or scroll →</p>
            </div>
            <ul className="sp-rail-scroll mt-10">
              {SERVICES_DATA.map((s, i) => (
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

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1000px]">
            <p className={`${kicker} text-center`} data-io>Two founders. One team.</p>
            <h2 className={`${h2} mt-4 text-center`} data-io style={delay(1)}>Founders</h2>
            <ul className="mt-12 grid md:grid-cols-2 gap-5">
              {FOUNDERS.map((f, i) => (
                <li key={f.name} className={`founder-card sp-card overflow-hidden flex flex-col ${f.primary ? 'is-primary' : ''}`} data-io style={delay(i, 0.12)}>
                  <div className="founder-band relative h-32">
                    <span aria-hidden="true" className="founder-aurora-clip"><span className="founder-aurora" /></span>
                    <span className="absolute right-6 top-5 font-mono text-[11px] tracking-[0.18em] uppercase text-white/70">{f.role}</span>
                    <span aria-hidden="true" className="founder-badge-wrap absolute left-7 sm:left-9 -bottom-10">
                      <span className="founder-badge">
                        <span className="founder-initials">{f.initials}</span>
                      </span>
                    </span>
                  </div>
                  <div className="px-7 sm:px-9 pt-14 pb-8 flex flex-col flex-1">
                    <p className={`font-display text-[26px] leading-tight ${ink}`}>{f.name}</p>
                    {f.alias && <p className={`mt-1 font-mono text-[12px] tracking-[0.16em] uppercase ${muted}`}>aka {f.alias}</p>}
                    <p className="mt-4 text-[15px] leading-relaxed">{f.bio}</p>
                    <p className={`mt-6 ${kicker}`}>Leads</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {f.leads.map((l) => (
                        <li key={l} className={`founder-tag px-3.5 py-1.5 rounded-full text-[13px] ${ink}`}>{l}</li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-7 flex items-end justify-between gap-4">
                      {f.link ? <a href={f.link.href} className={`whitespace-nowrap text-[14px] ${link}`}>{f.link.label}</a> : <span />}
                      {f.signature && <SignatureMark />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className={`mx-auto max-w-3xl grid sm:grid-cols-2 gap-8 border-t ${line} pt-10`} data-io>
            <div>
              <p className={kicker}>Where we are</p>
              <p className={`mt-3 text-[17px] ${ink}`}>{CONTACT.location}</p>
              <p className="mt-1 text-[15px] leading-relaxed">We work remotely with founders in any time zone, with calls scheduled at a time that suits you.</p>
            </div>
            <div>
              <p className={kicker}>Get in touch</p>
              <p className="mt-3 text-[17px]"><a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></p>
              <p className="mt-1 text-[15px]"><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram {CONTACT.instagramHandle}</a></p>
            </div>
          </div>
        </section>

        <section className="relative py-24 sm:py-32 px-5 sm:px-8">
          <BgShape color="rgba(58, 91, 255, 0.08)" style={{ '--s': '480px', right: '-80px', top: '-20px' }} />
          <div className="relative mx-auto max-w-3xl text-center" data-io>
            <h2 className={h2}>Tell us what you want to build</h2>
            <p className="mt-5 mx-auto max-w-xl text-[17px] leading-relaxed">You get a written scope, timeline and price after a short call. No commitment until you approve them.</p>
            <div className="mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
              <a href="/?book=" className="sp-btn h-12 px-6 text-[15px]">Book a scoping call</a>
              <span className={`text-[15px] ${muted}`}>or email <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></span>
            </div>
          </div>
        </section>
      </main>

      <footer className={`mx-auto max-w-[1200px] px-5 sm:px-8 py-10 border-t ${line} flex flex-wrap gap-x-8 gap-y-2 text-[13px] ${muted}`}>
        <span>© 2026 Nebulyx · {CONTACT.location}</span>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={footLink}>Instagram</a>
        <a href="/ai-visibility-check/" className={footLink}>Free AI check</a>
        <a href="/journal/" className={footLink}>Journal</a>
        <a href="/privacy.html" className={footLink}>Privacy</a>
        <a href="/terms.html" className={footLink}>Terms</a>
      </footer>
    </div>
  );
}
