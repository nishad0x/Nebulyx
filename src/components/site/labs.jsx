import React, { useEffect } from 'react';

export const IO_SCRIPT = "(function(){var d=document.documentElement;if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-io');function go(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px'});document.querySelectorAll('[data-io]').forEach(function(el){io.observe(el);});var h=document.querySelector('[data-hero]'),hd=document.querySelector('[data-header]');if(h&&hd){new IntersectionObserver(function(es){hd.dataset.surface=es[0].isIntersecting?'dark':'light';},{rootMargin:'-64px 0px -100% 0px'}).observe(h);}}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',go);}else{go();}})();";

export function useIoReveal(enabled = true) {
  useEffect(() => {
    const root = document.documentElement;
    if (!enabled || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll('[data-io]')];
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('is-in');
    });
    root.classList.add('js-io');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el); });
    let surface = null;
    const hero = document.querySelector('[data-hero]');
    const header = document.querySelector('[data-header]');
    if (hero && header) {
      surface = new IntersectionObserver((entries) => {
        header.dataset.surface = entries[0].isIntersecting ? 'dark' : 'light';
      }, { rootMargin: '-64px 0px -100% 0px' });
      surface.observe(hero);
    }
    return () => {
      io.disconnect();
      surface?.disconnect();
      root.classList.remove('js-io');
    };
  }, [enabled]);
}

export function delay(i, step = 0.08, base = 0) {
  return { '--d': `${(base + i * step).toFixed(2)}s` };
}

export function Drift({ vars, className = '', children }) {
  return (
    <div className={`drift-x ${className}`} style={vars}>
      <div className="drift-y"><div className="drift-r">{children}</div></div>
    </div>
  );
}

const SHAPES = {
  chamfer: 'M0 0H360V290L290 360H0Z',
  slant: 'M60 360 160 0H300L200 360Z',
  circle: 'M180 0A180 180 0 1 1 179.9 0Z',
  spark: 'M180 0C192 120 240 168 360 180C240 192 192 240 180 360C168 240 120 192 0 180C120 168 168 120 180 0Z',
};

export function BgShape({ kind, color, style, drift, d = '0s' }) {
  return (
    <div aria-hidden="true" className="sp-shape" data-io style={{ ...style, '--d': d }}>
      <Drift vars={drift} className="h-full">
        <svg viewBox="0 0 360 360" aria-hidden="true"><path d={SHAPES[kind]} fill={color} /></svg>
      </Drift>
    </div>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 20 20" className="sp-check w-5 h-5 mt-[3px] shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--sp-tint)" />
      <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="var(--sp-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Statement({ text, className = '' }) {
  const words = text.trim().split(/\s+/);
  return (
    <p className={`sp-statement font-display font-medium text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.18] tracking-[-0.02em] text-center max-w-4xl mx-auto ${className}`}>
      {words.map((w, i) => (
        <span key={i} style={{ '--p': i / words.length }}>{w} </span>
      ))}
    </p>
  );
}

export function StepIcon({ step }) {
  const B = 'var(--sp-accent)';
  const S = 'var(--sv-soft)';
  const L = 'var(--sv-line)';
  const icons = {
    Scope: (
      <>
        <rect x="26" y="18" width="36" height="52" rx="6" fill="var(--sp-card)" stroke={L} strokeWidth="1.5" />
        <rect className="vg-line" x="33" y="30" width="22" height="4" rx="2" fill={B} />
        <rect className="vg-line" style={{ animationDelay: '0.25s' }} x="33" y="40" width="18" height="4" rx="2" fill={S} />
        <rect className="vg-line" style={{ animationDelay: '0.5s' }} x="33" y="50" width="14" height="4" rx="2" fill={S} />
      </>
    ),
    Build: (
      <>
        <rect className="vg-block" x="24" y="52" width="40" height="14" rx="4" fill={B} />
        <rect className="vg-block" style={{ animationDelay: '0.3s' }} x="30" y="36" width="28" height="14" rx="4" fill={S} />
        <rect className="vg-block" style={{ animationDelay: '0.6s' }} x="36" y="20" width="16" height="14" rx="4" fill={B} />
      </>
    ),
    Test: (
      <>
        <rect x="30" y="16" width="28" height="56" rx="7" fill="var(--sp-card)" stroke={L} strokeWidth="1.5" />
        <circle className="vg-pulse" cx="44" cy="44" r="12" fill={S} />
        <g className="vg-tick"><path d="M38 44.5l4 4 8-8" fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></g>
      </>
    ),
    Handover: (
      <>
        <rect x="22" y="40" width="44" height="28" rx="6" fill={S} />
        <rect x="22" y="40" width="44" height="8" rx="4" fill={B} />
        <g className="vg-key">
          <circle cx="40" cy="26" r="7" fill="none" stroke={B} strokeWidth="3" />
          <path d="M47 26h14M56 26v5" fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" />
        </g>
      </>
    ),
  };
  return (
    <div className="sp-step-icon" aria-hidden="true">
      <svg viewBox="0 0 88 88">{icons[step.key]}</svg>
    </div>
  );
}
