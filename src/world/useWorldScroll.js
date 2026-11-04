import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from './formations';
import { worldState } from './store';

gsap.registerPlugin(ScrollTrigger);

function measure() {
  return CHAPTERS.map((id) => {
    const el = document.getElementById(id);
    return el ? el.offsetTop : 0;
  });
}

export function useWorldScroll() {
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    worldState.reduced = reduced;

    let lenis = null;
    let tick = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      worldState.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    let tops = measure();
    let current = -1;
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let k = 0;
      while (k < tops.length - 1 && y >= tops[k + 1]) k++;
      const start = tops[k];
      const end = k < tops.length - 1 ? tops[k + 1] : document.documentElement.scrollHeight;
      const f = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      worldState.w = k + (k < tops.length - 1 ? f : 0);
      if (k !== current) {
        current = k;
        setChapter(k);
      }
    };
    const onResize = () => {
      tops = measure();
      onScroll();
    };
    const onPointer = (e) => {
      worldState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      worldState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      worldState.lenis = null;
    };
  }, []);

  return chapter;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (worldState.lenis) worldState.lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView();
}
