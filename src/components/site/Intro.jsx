import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { worldState } from '../../world/store';
import { LOW_POWER } from '../../world/quality';
import { MARK_DIAGONAL, MARK_LEFT, MARK_RIGHT, MARK_VIEWBOX } from './Brand';

const WORD = 'NEBULYX';
const EASE = [0.76, 0, 0.24, 1];
const PUNCH = [0.7, 0, 0.3, 1];
const WAIT_FOR_WORLD = 6000;
const WORLD_POLL = 60;
const FOCUS_X = 56;
const FOCUS_Y = 54;
const ZOOM = 90;
const MARK_UNITS = 100;

export default function Intro({ onDone }) {
  const [shown, setShown] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const count = useMotionValue(0);
  const label = useTransform(() => String(Math.round(count.get())).padStart(3, '0'));
  const bar = useTransform(count, [0, 100], [0, 1]);
  const mark = useRef(null);
  const hole = useRef(null);
  const ghost = useRef(null);
  const veil = useRef(null);
  const flash = useRef(null);
  const shock = useRef(null);
  const solid = useRef(null);
  const chrome = useRef(null);

  useEffect(() => {
    if (!shown) {
      worldState.intro = 1;
      onDone();
      return undefined;
    }
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    worldState.intro = 0;
    const running = [];
    const timers = [];
    const startedAt = performance.now();
    const counting = animate(count, 92, { duration: 1.5, ease: [0.5, 0, 0.3, 1] });
    running.push(counting);
    const burst = () => {
      const box = mark.current.getBoundingClientRect();
      const base = box.width / MARK_UNITS;
      const px = box.left + FOCUS_X * base;
      const py = box.top + FOCUS_Y * base;
      const place = (t) => {
        const s = base * Math.exp(Math.log(ZOOM) * t);
        const matrix = `translate(${px} ${py}) scale(${s}) translate(${-FOCUS_X} ${-FOCUS_Y})`;
        hole.current?.setAttribute('transform', matrix);
        ghost.current?.setAttribute('transform', matrix);
      };
      running.push(animate(chrome.current, { opacity: 0 }, { duration: 0.6 }));
      if (LOW_POWER) {
        veil.current.removeAttribute('mask');
        running.push(animate(solid.current, { scale: 16, opacity: 0 }, { duration: 1.3, ease: PUNCH }));
        running.push(animate(veil.current.ownerSVGElement, { opacity: 0 }, { duration: 0.9, delay: 0.3, ease: 'easeInOut' }));
      } else {
        place(0);
        hole.current.setAttribute('opacity', '1');
        ghost.current.setAttribute('opacity', '1');
        solid.current.style.visibility = 'hidden';
      }
      if (!LOW_POWER) running.push(animate(1, 0, { duration: 0.9, ease: 'easeInOut', onUpdate: (v) => ghost.current?.setAttribute('opacity', v) }));
      if (!LOW_POWER) running.push(animate(0, 1, { duration: 2.4, ease: PUNCH, onUpdate: place }));
      if (!LOW_POWER) running.push(animate(1, 0, { duration: 0.8, delay: 0.45, ease: 'easeInOut', onUpdate: (v) => veil.current?.setAttribute('opacity', v) }));
      running.push(animate(worldState, { intro: 1 }, { duration: 2.9, ease: [0.5, 0, 0.12, 1], delay: 0.1 }));
      running.push(animate(flash.current, { opacity: [0, 0.6, 0] }, { duration: 1, delay: 1.1, times: [0, 0.3, 1], ease: 'easeOut' }));
      running.push(animate(shock.current, { opacity: [0, 0.9, 0], scale: [0.5, 6] }, { duration: 1, delay: 1.95, ease: [0.16, 1, 0.3, 1] }));
      timers.push(window.setTimeout(onDone, 2100));
      timers.push(window.setTimeout(() => setShown(false), 3000));
    };
    const finish = () => {
      const last = animate(count, 100, { duration: 0.3, ease: 'easeOut' });
      running.push(last);
      last.then(burst);
    };
    const waitForWorld = () => {
      if (worldState.ready || performance.now() - startedAt > WAIT_FOR_WORLD) finish();
      else timers.push(window.setTimeout(waitForWorld, WORLD_POLL));
    };
    counting.then(waitForWorld);
    return () => {
      running.forEach((a) => a.stop());
      timers.forEach((t) => window.clearTimeout(t));
      worldState.intro = 1;
    };
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[70] text-white pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <mask id="nbx-portal" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <rect width="100%" height="100%" fill="#ffffff" />
                <g ref={hole} fill="#000000" opacity="0">
                  <path d={MARK_LEFT} />
                  <path d={MARK_DIAGONAL} />
                  <path d={MARK_RIGHT} />
                </g>
              </mask>
            </defs>
            <rect ref={veil} width="100%" height="100%" fill="#05060a" mask="url(#nbx-portal)" />
            <g ref={ghost} fill="#ffffff" opacity="0">
              <path d={MARK_LEFT} />
              <path d={MARK_DIAGONAL} fillOpacity="0.8" />
              <path d={MARK_RIGHT} />
            </g>
          </svg>

          <div className="absolute inset-0 grid place-items-center">
            <div ref={solid}>
              <svg ref={mark} viewBox={MARK_VIEWBOX} fill="#ffffff" className="block w-[min(52vw,38vh)] h-[min(52vw,38vh)]">
                <motion.path d={MARK_LEFT} style={{ originY: 1 }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, ease: EASE, delay: 0.05 }} />
                <motion.path d={MARK_RIGHT} style={{ originY: 0 }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} />
                <motion.path d={MARK_DIAGONAL} fillOpacity="0.8" style={{ originX: 0, originY: 0 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.7, ease: EASE, delay: 0.5 }} />
              </svg>
            </div>
          </div>

          <div className="absolute inset-0 grid place-items-center">
            <svg ref={shock} viewBox={MARK_VIEWBOX} fill="none" stroke="#c4cfff" strokeWidth="0.8" className="block w-[40vmin] h-[40vmin] opacity-0">
              <path d={MARK_LEFT} />
              <path d={MARK_DIAGONAL} />
              <path d={MARK_RIGHT} />
            </svg>
          </div>

          <div ref={flash} className="intro-flash absolute inset-0 bg-[#8fa2ff] opacity-0 pointer-events-none" />

          <div ref={chrome} className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between font-mono text-[11px] tracking-[0.16em] uppercase text-[#8a91a3]">
              <span>Entering the Nebulyx world</span>
              <span className="hidden sm:inline">Design · Build · Grow</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex overflow-hidden font-display font-semibold leading-none tracking-[0.08em] text-[clamp(1.25rem,2.4vw,2.25rem)]">
                {WORD.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.6 + i * 0.04 }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
              <motion.span className="font-mono text-[13px] sm:text-[15px] tabular-nums text-[#b6bccb]">{label}</motion.span>
            </div>
            <motion.div className="absolute left-0 bottom-0 h-[2px] w-full bg-[#3a5bff] origin-left" style={{ scaleX: bar }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
