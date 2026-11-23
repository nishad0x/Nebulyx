import React from 'react';
import { NebulyxLogo } from './Brand';
import { SERVICES_DATA } from '../../data/services';
import { SERVICE_PAGES } from '../../data/servicePages';
import { CONTACT } from '../../data/contact';
import { ARTICLES, AUTHOR, JOURNAL_PATH, articlePath, minutesFor } from '../../data/journal';
import ServiceVisual from './ServiceVisual';
import { servicePath } from './ServicePage';
import { IO_SCRIPT, delay, BgShape, Check } from './labs';

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const line = 'border-[color:var(--sp-line)]';
const link = 'text-[color:var(--sp-accent-ink)] underline decoration-[color:var(--sp-line-strong)] underline-offset-4 hover:decoration-current';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const navLink = 'focus-ring transition-opacity hover:opacity-100';
const footLink = 'focus-ring transition-colors hover:text-[color:var(--sp-ink)]';

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d} ${months[m - 1]} ${y}`;
}

export function Shell({ current, crumbs, title, lead, children }) {
  return (
    <div className="service-page min-h-[100svh] antialiased">
      <script dangerouslySetInnerHTML={{ __html: IO_SCRIPT }} />
      <header data-header data-surface="dark" className="sp-header">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="/" aria-label="Nebulyx home" className="focus-ring"><NebulyxLogo /></a>
          <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-[14px]">
            <a href="/#services" className={navLink}>Services</a>
            <a href={JOURNAL_PATH} aria-current={current === 'journal' ? 'page' : undefined} className={navLink}>Journal</a>
            <a href="/about/" className={navLink}>About</a>
          </nav>
          <a href="/?book=" className="sp-btn sp-btn-light h-10 px-5 text-[14px]">Book a call</a>
        </div>
      </header>

      <div className="sp-hero-band sp-hero-band--full">
        <div data-hero className="sp-hero-sentinel" aria-hidden="true" />
        <BgShape kind="stars" color="rgba(143,162,255,0.14)" style={{ '--s': '200px', left: '6%', top: '110px' }} d="0.2s" drift={{ '--dx': '11s', '--dy': '17s', '--dr': '23s', '--ar': '12deg' }} />
        <BgShape kind="comet" color="rgba(58,91,255,0.12)" style={{ '--s': '280px', right: '-80px', top: '50px' }} d="0.35s" drift={{ '--dx': '13s', '--dy': '19s', '--dr': '21s', '--ar': '6deg' }} />
        <section className="relative mx-auto max-w-[900px] px-5 sm:px-8 pt-14 sm:pt-20 pb-20 sm:pb-24 text-center">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
            <ol className="flex flex-wrap justify-center gap-2">
              {crumbs.map(([label, href], i) => (
                <li key={label} aria-current={i === crumbs.length - 1 ? 'page' : undefined} className={i === crumbs.length - 1 ? 'text-white/80' : ''}>
                  {href ? <><a href={href} className="focus-ring hover:text-white">{label}</a> /</> : label}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-6 font-display font-medium text-white text-[clamp(2.2rem,5.2vw,4.2rem)] leading-[1.04] tracking-[-0.03em]">{title}</h1>
          {lead}
        </section>
      </div>

      <main className="relative">{children}</main>

      <footer className={`mx-auto max-w-[1200px] px-5 sm:px-8 py-10 border-t ${line} flex flex-wrap gap-x-8 gap-y-2 text-[13px] ${muted}`}>
        <span>© 2026 Nebulyx · {CONTACT.location}</span>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={footLink}>Instagram</a>
        <a href="/ai-visibility-check/" className={footLink}>Free AI check</a>
        <a href={JOURNAL_PATH} className={footLink}>Journal</a>
        <a href="/about/" className={footLink}>About</a>
        <a href="/privacy.html" className={footLink}>Privacy</a>
        <a href="/terms.html" className={footLink}>Terms</a>
      </footer>
    </div>
  );
}

function Byline({ article, light = false }) {
  const tone = light ? 'text-white/70' : muted;
  return (
    <p className={`text-[14px] ${tone}`}>
      By <span className={light ? 'text-white' : ink}>{AUTHOR.name}</span> · <time dateTime={article.date}>{formatDate(article.date)}</time> · {minutesFor(article)} min read
    </p>
  );
}

export function JournalIndex() {
  return (
    <Shell
      current="journal"
      crumbs={[['Home', '/'], ['Journal', null]]}
      title="Journal"
      lead={<p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-white/75">Plain answers to the questions founders ask about websites, AI automation, AI search and online stores. Written by {AUTHOR.name}.</p>}
    >
      <section className="px-5 sm:px-8 py-16 sm:py-24">
        <ul className="mx-auto max-w-[1100px] grid md:grid-cols-2 gap-5">
          {ARTICLES.map((a, i) => (
            <li key={a.slug} data-io style={delay(i, 0.08)}>
              <a href={articlePath(a.slug)} className="sp-card focus-ring flex flex-col h-full p-7 sm:p-9">
                <span className={kicker}>{a.kicker}</span>
                <span className={`mt-4 block font-display text-[clamp(1.4rem,2.4vw,1.8rem)] leading-tight tracking-[-0.015em] ${ink}`}>{a.title}</span>
                <span className="mt-3 block text-[15px] leading-relaxed">{a.description}</span>
                <span className="mt-auto pt-7"><Byline article={a} /></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

export function ArticlePage({ slug }) {
  const article = ARTICLES.find((a) => a.slug === slug);
  const service = SERVICES_DATA.find((s) => s.id === article.service);
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <Shell
      current="journal"
      crumbs={[['Home', '/'], ['Journal', JOURNAL_PATH], [article.kicker, null]]}
      title={article.title}
      lead={<div className="mt-6"><Byline article={article} light /></div>}
    >
      <article className="px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
        <div className="mx-auto max-w-[720px]">
          <p className={`text-[20px] leading-relaxed ${ink}`} data-io>{article.intro}</p>
          {article.sections.map((sec) => (
            <section key={sec.h} className="mt-12" data-io>
              <h2 className={`font-display font-medium text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.015em] ${ink}`}>{sec.h}</h2>
              {sec.p && sec.p.map((para) => (
                <p key={para.slice(0, 40)} className="mt-4 text-[17px] leading-[1.75]">{para}</p>
              ))}
              {sec.list && (
                <ul className="mt-5 space-y-3.5">
                  {sec.list.map((item) => (
                    <li key={item.slice(0, 40)} className="flex gap-3 text-[17px] leading-[1.7]"><Check />{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {article.service === 'aeo-geo-marketing' && (
            <a href="/ai-visibility-check/" className="mt-12 sp-card focus-ring flex flex-wrap items-center justify-between gap-5 p-6" data-io>
              <span className={`font-display text-[20px] leading-snug ${ink}`}>Want to know what AI assistants say about you?</span>
              <span className="sp-btn h-11 px-5 text-[14px]">Get a free check</span>
            </a>
          )}

          <aside className={`mt-16 pt-8 border-t ${line} flex flex-col sm:flex-row gap-4 sm:gap-6 items-start`} data-io aria-label="About the author">
            <img src="/signature.svg" alt="Signature: SKROCK" width="220" height="80" loading="lazy" className="shrink-0 w-[220px] h-auto -mt-4 -ml-2" />
            <div>
              <p className={`text-[16px] ${ink}`}>{AUTHOR.name} <span className={muted}>· {AUTHOR.role}</span></p>
              <p className="mt-1.5 text-[15px] leading-relaxed">{AUTHOR.bio}</p>
            </div>
          </aside>
        </div>
      </article>

      <section className="px-5 sm:px-8 py-14">
        <div className="mx-auto max-w-[1100px] grid lg:grid-cols-[1.1fr_0.9fr] gap-5 items-stretch">
          <a href={servicePath(SERVICE_PAGES[service.id].slug)} className="sp-card focus-ring grid sm:grid-cols-[180px_1fr] gap-6 p-5 items-center" data-io>
            <div className="sp-mini"><ServiceVisual id={service.id} /></div>
            <div>
              <p className={kicker}>Related service</p>
              <p className={`mt-2 font-display text-[22px] leading-tight ${ink}`}>{service.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed">{service.tagline}.</p>
              <p className="mt-4 text-[14px] font-medium text-[color:var(--sp-accent-ink)]">See how we do it →</p>
            </div>
          </a>
          <div className="sp-card p-7 flex flex-col justify-center" data-io style={delay(1)}>
            <p className={`font-display text-[22px] leading-tight ${ink}`}>Want this done for your launch?</p>
            <p className="mt-2 text-[15px] leading-relaxed">You get a written scope, timeline and price after a short call. No commitment until you approve them.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={`/?book=${encodeURIComponent(service.title)}`} className="sp-btn h-11 px-5 text-[14px]">Book a scoping call</a>
              <a href={`mailto:${CONTACT.email}`} className={`text-[14px] ${link}`}>{CONTACT.email}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-20">
        <div className="mx-auto max-w-[1100px]">
          <p className={kicker}>More from the journal</p>
          <ul className="mt-6 grid md:grid-cols-2 gap-5">
            {others.map((a) => (
              <li key={a.slug} data-io>
                <a href={articlePath(a.slug)} className="sp-card focus-ring block h-full p-7">
                  <span className={kicker}>{a.kicker}</span>
                  <span className={`mt-3 block font-display text-[20px] leading-tight ${ink}`}>{a.title}</span>
                  <span className="mt-4 block"><Byline article={a} /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
