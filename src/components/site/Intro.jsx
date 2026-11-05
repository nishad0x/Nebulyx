import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { worldState } from '../../world/store';

const WORD = 'NEBULYX';
const EASE = [0.76, 0, 0.24, 1];
const PUNCH = [0.7, 0, 0.18, 1];

export default function Intro({ onDone }) {
  const [shown, setShown] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const count = useMotionValue(0);
  const label = useTransform(() => String(Math.round(count.get())).padStart(3, '0'));
  const bar = useTransform(count, [0, 100], [0, 1]);
  const letters = useRef([]);
  const veil = useRef(null);
  const chrome = useRef(null);

  useEffect(() => {
    if (!shown) {
      worldState.intro = 1;
      onDone();
      return undefined;
    }
    worldState.intro = 0;
    const running = [];
    const timers = [];
    const counting = animate(count, 100, { duration: 2, ease: [0.65, 0, 0.35, 1] });
    running.push(counting);
    counting.then(() => {
      const w = window.innerWidth;
      const mid = (WORD.length - 1) / 2;
      letters.current.forEach((el, i) => {
        if (!el) return;
        el.parentElement.style.overflow = 'visible';
        const side = i - mid;
        running.push(animate(el, {
          x: side * w * 0.2,
          y: (i % 2 ? -1 : 1) * w * 0.03,
          scale: 4.2,
          rotate: side * 6,
          opacity: 0,
          filter: 'blur(14px)',
        }, { duration: 1.25, ease: PUNCH, delay: Math.abs(side) * 0.03 }));
      });
      if (chrome.current) running.push(animate(chrome.current, { opacity: 0 }, { duration: 0.35 }));
      if (veil.current) running.push(animate(veil.current, { opacity: 0 }, { duration: 1.1, ease: PUNCH, delay: 0.15 }));
      running.push(animate(worldState, { intro: 1 }, { duration: 2.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }));
      timers.push(window.setTimeout(onDone, 700));
      timers.push(window.setTimeout(() => setShown(false), 1350));
    });
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
          <div ref={veil} className="absolute inset-0 bg-[#05060a] pointer-events-auto" />
          <div ref={chrome} className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between">
            <div className="flex justify-between font-mono text-[11px] tracking-[0.16em] uppercase text-[#8a91a3]">
              <span>Entering the Nebulyx world</span>
              <span>Design · Build · Grow</span>
            </div>
            <div className="flex justify-end">
              <motion.span className="font-mono text-[13px] sm:text-[15px] tabular-nums text-[#b6bccb]">{label}</motion.span>
            </div>
            <motion.div className="absolute left-0 bottom-0 h-[2px] w-full bg-[#3a5bff] origin-left" style={{ scaleX: bar }} />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex font-display font-medium leading-[0.8] tracking-[-0.06em] text-[clamp(4rem,17vw,18rem)]">
              {WORD.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
                  <motion.span
                    ref={(el) => { letters.current[i] = el; }}
                    className="inline-block will-change-transform"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.06 }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
