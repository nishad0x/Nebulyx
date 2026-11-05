import { useEffect } from 'react';
import { gsap } from 'gsap';
import { worldState } from './store';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function look(d) {
  if (d >= 0) {
    const e = d * d * (3 - 2 * d);
    return { s: 1 - 0.32 * e, o: clamp(1 - d * 1.35, 0, 1), b: 9 * e };
  }
  const e = -d;
  return { s: 1 + 0.25 * e + 1.1 * e * e, o: clamp(1 - e * 1.7, 0, 1), b: 12 * e };
}

export function useDepthFlight() {
  useEffect(() => {
    if (worldState.reduced) return undefined;
    const items = [...document.querySelectorAll('[data-depth]')].map((el) => ({ el, ty: 0, s: 1, key: '' }));
    items.forEach(({ el }) => {
      el.style.transformOrigin = '50% 50%';
      el.style.willChange = 'transform, opacity, filter';
    });

    const tick = () => {
      const vh = window.innerHeight;
      for (const it of items) {
        const { el } = it;
        const h = el.offsetHeight;
        const r = el.getBoundingClientRect();
        const top = r.top - it.ty - (h * (1 - it.s)) / 2;
        const bottom = top + h;
        let d = 0;
        let ty = 0;
        if (top >= vh || bottom <= 0) d = top >= vh ? 1 : -1;
        else if (top > 0) { d = top / vh; ty = -top; }
        else if (bottom < vh) { d = -(vh - bottom) / vh; ty = vh - bottom; }
        const { s, o, b } = look(d);
        const hidden = o <= 0.001;
        const key = hidden ? 'h' : `${ty.toFixed(1)}|${s.toFixed(4)}|${o.toFixed(3)}|${b.toFixed(1)}`;
        if (key === it.key) continue;
        it.key = key;
        it.ty = hidden ? 0 : ty;
        it.s = hidden ? 1 : s;
        if (hidden) {
          el.style.visibility = 'hidden';
          el.style.transform = '';
          el.style.opacity = '0';
          el.style.filter = '';
          continue;
        }
        el.style.visibility = '';
        el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
        el.style.opacity = o.toFixed(3);
        el.style.filter = b > 0.2 ? `blur(${b.toFixed(1)}px)` : '';
        el.style.pointerEvents = Math.abs(d) > 0.35 ? 'none' : '';
        el.style.setProperty('--d', Math.max(0, d).toFixed(3));
        el.toggleAttribute('data-arriving', d > 0.002);
      }
    };

    gsap.ticker.add(tick);
    tick();
    if (import.meta.env.DEV) window.__depth = tick;
    return () => {
      gsap.ticker.remove(tick);
      items.forEach(({ el }) => {
        ['transform', 'opacity', 'filter', 'visibility', 'pointerEvents', 'willChange', 'transformOrigin'].forEach((p) => { el.style[p] = ''; });
        el.style.removeProperty('--d');
      });
    };
  }, []);
}
