import React from 'react';
import { CONTACT } from '../../data/contact';
import { Shell } from './JournalPages';
import { delay, Check, BgShape } from './labs';

export const AI_CHECK_PATH = '/ai-visibility-check/';

export const AI_CHECK_FAQS = [
  { q: 'Is the AI visibility check really free?', a: 'Yes. There is no cost and no obligation. If the report shows problems you want fixed, you can book a call, but you do not have to.' },
  { q: 'What do you need from me?', a: 'Your business name, your website and an email address for the report. Telling us what you sell and who your competitors are makes the check more useful.' },
  { q: 'Which AI assistants do you check?', a: 'ChatGPT, Perplexity, Gemini and Claude. We ask each one the questions your buyers are likely to ask and record what they say about you.' },
  { q: 'How long does it take?', a: 'You get your report by email within two working days.' },
];

const CHECKS = [
  ['Are you mentioned?', 'Whether ChatGPT, Perplexity, Gemini and Claude bring you up when buyers ask for a recommendation in your category.'],
  ['How are you described?', 'What each assistant says you do, your pricing and your strengths, and anything wrong or out of date.'],
  ['Who is recommended instead?', 'Which competitors appear in your place, and what they have that you do not.'],
  ['Which sources are cited?', 'The pages and sites the assistants rely on, so you know what to fix or publish.'],
  ['What to fix first', 'Three concrete changes, in order, that make you easier for AI assistants to find and describe.'],
];

const STEPS = [
  ['Tell us about your business', 'Name, website and what you sell. It takes a minute.'],
  ['We run the check', 'We ask four AI assistants the questions your buyers ask, and record the answers and sources.'],
  ['You get a one-page report', 'What they say, who they recommend instead and what to fix first, by email within two working days.'],
];

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const line = 'border-[color:var(--sp-line)]';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const h2 = `font-display font-medium ${ink} text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05] tracking-[-0.025em]`;
const field = 'mt-2 w-full h-12 px-4 rounded-xl border border-white/[0.14] bg-[#07090f] text-[16px] text-white placeholder:text-neutral-500 outline-none focus:border-[color:var(--sp-accent)] focus:ring-2 focus:ring-[color:var(--sp-tint)]';
const label = `block text-[14px] font-medium ${ink}`;

const FORM_SCRIPT = `(function(){function init(){var f=document.getElementById('aicheck');if(!f)return;var s=document.getElementById('aicheck-status'),b=f.querySelector('button[type=submit]');
f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f);
var body={name:d.get('name'),email:d.get('email'),service:'AI search visibility check',website:d.get('website'),_form:'Free AI visibility check',
message:['Business: '+(d.get('business')||''),'Website: '+(d.get('site')||''),'Sells: '+(d.get('sells')||''),'Competitors: '+(d.get('competitors')||'')].join('\\n')};
b.disabled=true;b.textContent='Sending…';s.textContent='';
fetch('/api/lead/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};});})
.then(function(res){if(res.ok){f.hidden=true;document.getElementById('aicheck-done').hidden=false;}else{throw new Error(res.j.error||'');}})
.catch(function(err){b.disabled=false;b.textContent='Get my free check';s.textContent=err.message||'Something went wrong. Please email ${CONTACT.email}.';});});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}})();`;

function ReportMock() {
  return (
    <div className="sp-card p-6 sm:p-8" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className={kicker}>Sample report</p>
        <span className="px-3 py-1 rounded-full bg-[var(--sp-tint)] text-[12px] font-medium text-[color:var(--sp-accent-ink)]">Illustrative</span>
      </div>
      <p className={`mt-4 font-display text-[22px] leading-tight ${ink}`}>“Who builds websites for startups in my city?”</p>
      <ul className="mt-5 space-y-3">
        {[['ChatGPT', 'Not mentioned', false], ['Perplexity', 'Mentioned, wrong pricing', false], ['Gemini', 'Not mentioned', false], ['Claude', 'Mentioned, correct', true]].map(([a, r, ok]) => (
          <li key={a} className={`flex items-center justify-between gap-4 py-3 border-t ${line} text-[15px]`}>
            <span className={ink}>{a}</span>
            <span className={`px-3 py-1 rounded-full text-[13px] ${ok ? 'bg-[#e6f6ec] text-[#1d7a45]' : 'bg-[#fdeceb] text-[#b4372f]'}`}>{r}</span>
          </li>
        ))}
      </ul>
      <p className={`mt-5 text-[13px] ${muted}`}>Your report covers 5–10 buyer questions across four assistants.</p>
    </div>
  );
}

export default function AiCheckPage() {
  return (
    <Shell
      current="aicheck"
      crumbs={[['Home', '/'], ['Free AI visibility check', null]]}
      title="What does ChatGPT say about your business?"
      lead={(
        <>
          <p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-white/75">Buyers now ask AI assistants for recommendations. Get a free check of what ChatGPT, Perplexity, Gemini and Claude say about you, and what to fix first.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#check" className="sp-btn sp-btn-light h-12 px-6 text-[15px]">Get my free check</a>
          </div>
          <p className="mt-4 text-[14px] text-white/55">Free · No obligation · Report by email in two working days</p>
        </>
      )}
    >
      <script dangerouslySetInnerHTML={{ __html: FORM_SCRIPT }} />

      <section id="check" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20">
        <BgShape kind="stars" color="rgba(0,200,255,0.08)" style={{ '--s': '180px', left: 'max(-40px, -3vw)', top: '40px' }} drift={{ '--dx': '10s', '--dy': '16s', '--dr': '19s', '--ar': '10deg' }} />
        <BgShape kind="planet" color="rgba(143,162,255,0.06)" style={{ '--s': '240px', right: 'max(-80px, -5vw)', bottom: '-40px' }} d="0.2s" drift={{ '--dx': '12s', '--dy': '18s', '--dr': '22s', '--ar': '8deg' }} />
        <div className="relative mx-auto max-w-[1100px] grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <div className="sp-card p-7 sm:p-10" data-io>
            <h2 className={h2}>Get your free check</h2>
            <p className="mt-3 text-[16px] leading-relaxed">Tell us about your business. We'll email your report within two working days.</p>
            <form id="aicheck" method="post" action="/api/lead/" className="mt-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className={label}>Your name<input name="name" required autoComplete="name" className={field} /></label>
                <label className={label}>Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <label className={label}>Business name<input name="business" required className={field} /></label>
                <label className={label}>Website<input name="site" type="url" placeholder="https://" className={field} /></label>
              </div>
              <label className={label}>What do you sell, and to whom?<input name="sells" placeholder="e.g. skincare for men in India" className={field} /></label>
              <label className={label}>Main competitors <span className={`font-normal ${muted}`}>(optional)</span><input name="competitors" className={field} /></label>
              <div aria-hidden="true" className="absolute -left-[9999px]"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="sp-btn h-12 px-7 text-[15px]">Get my free check</button>
                <span className={`text-[13px] ${muted}`}>We only use your details to send the report. <a href="/privacy.html" className="underline underline-offset-4">Privacy</a></span>
              </div>
              <p id="aicheck-status" role="status" className="text-[14px] text-[#b4372f]" />
            </form>
            <div id="aicheck-done" hidden className="mt-8">
              <p className={`flex gap-3 font-display text-[24px] ${ink}`}><Check />Request received</p>
              <p className="mt-3 text-[16px] leading-relaxed">Your AI visibility report will reach your inbox within two working days. Questions in the meantime? Email <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">{CONTACT.email}</a>.</p>
            </div>
          </div>
          <div data-io style={delay(1, 0.12)}><ReportMock /></div>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px]">
          <h2 className={`${h2} text-center`} data-io>What the report covers</h2>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHECKS.map(([t, d], i) => (
              <li key={t} className="sp-card p-7" data-io style={delay(i, 0.08)}>
                <p className={`flex gap-3 font-display text-[20px] leading-snug ${ink}`}><Check />{t}</p>
                <p className="mt-3 text-[15px] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px]">
          <h2 className={`${h2} text-center`} data-io>How it works</h2>
          <ol className="mt-12 grid md:grid-cols-3 gap-5">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="sp-card p-7" data-io style={delay(i, 0.12)}>
                <span className="grid place-items-center w-10 h-10 rounded-full bg-[var(--sp-accent)] text-white font-mono text-[14px]">{i + 1}</span>
                <p className={`mt-5 font-display text-[21px] leading-snug ${ink}`}>{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${h2} text-center`} data-io>Questions</h2>
          <div className={`mt-10 border-t ${line}`} data-io>
            {AI_CHECK_FAQS.map(({ q, a }) => (
              <details key={q} className={`faq-item border-b ${line}`}>
                <summary className={`focus-ring py-6 cursor-pointer text-[18px] ${ink}`}>{q}</summary>
                <p className="pb-6 text-[16px] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center"><a href="#check" className="sp-btn h-12 px-7 text-[15px]">Get my free check</a></p>
        </div>
      </section>
    </Shell>
  );
}
