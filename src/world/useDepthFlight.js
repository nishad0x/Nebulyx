import { useEffect } from 'react';
import { gsap } from 'gsap';
import { worldState } from './store';
import { LOW_POWER } from './quality';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const SLANT = Math.tan((30 * Math.PI) / 180);
const IDLE_CHECK = 30;
const PINNED_MIN = 0.75;

function look(d) {
  if (d >= 0) {
    const e = d * d * (3 - 2 * d);
    return { s: 1 - 0.32 * e, o: clamp(1 - d * 1.35, 0, 1), b: 9 * e, k: 12 * e };
  }
  const e = -d;
  return { s: 1 + 0.25 * e + 1.1 * e * e, o: clamp(1 - e * 1.7, 0, 1), b: 12 * e, k: -16 * e };
}

export function useDepthFlight() {
  useEffect(() => {
    if (worldState.reduced) return undefined;
    const items = [...document.querySelectorAll('[data-depth]')].map((el) => ({ el, ty: 0, s: 1, key: '' }));
    items.forEach(({ el }) => {
      el.style.transformOrigin = '50% 50%';
    });

    const band = document.querySelector('[data-slant-wipe]');
    let lastY = -1;
    let idle = 0;
    const tick = () => {
      const y = window.scrollY;
      idle = y === lastY ? idle + 1 : 0;
      lastY = y;
      if (idle > 0 && idle % IDLE_CHECK !== 0) return;
      const screen = window.innerHeight;
      let wipe = -1;
      for (const it of items) {
        const { el } = it;
        it.h = el.offsetHeight;
        it.top = el.getBoundingClientRect().top;
      }
      for (const it of items) {
        const { el, h } = it;
        const vh = h < screen && h > screen * PINNED_MIN ? h : screen;
        const top = it.top - it.ty - (h * (1 - it.s)) / 2;
        const bottom = top + h;
        let d = 0;
        let ty = 0;
        if (top >= vh || bottom <= 0) d = top >= vh ? 1 : -1;
        else if (top > 0) { d = top / vh; ty = -top; }
        else if (bottom < vh) { d = -(vh - bottom) / vh; ty = vh - bottom; }
        if (d > 0 && d < 1 && el.dataset.wipe === 'true') wipe = 1 - d;
        const { s, o, b, k } = look(d);
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
          el.style.willChange = '';
          continue;
        }
        el.style.visibility = '';
        el.style.willChange = d === 0 ? '' : 'transform, opacity';
        el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) skewY(${k.toFixed(2)}deg) scale(${s.toFixed(4)})`;
        el.style.opacity = o.toFixed(3);
        el.style.filter = !LOW_POWER && b > 0.2 ? `blur(${b.toFixed(1)}px)` : '';
        el.style.pointerEvents = Math.abs(d) > 0.35 ? 'none' : '';
        el.style.setProperty('--d', Math.max(0, d).toFixed(3));
        el.setAttribute('data-arriving', d > 0.002 ? 'true' : 'false');
      }
      if (band) {
        const on = wipe >= 0;
        band.dataset.active = on ? 'true' : 'false';
        if (on) {
          const reach = screen * 0.5 + band.offsetHeight * 0.5 + (SLANT * window.innerWidth) / 2;
          band.style.transform = `translate3d(0, ${((1 - 2 * wipe) * reach).toFixed(1)}px, 0) skewY(-30deg)`;
        }
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
