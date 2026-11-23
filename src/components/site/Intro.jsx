import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { worldState } from '../../world/store';

const EASE = [0.16, 1, 0.3, 1];

export default function Intro({ onDone }) {
  const [shown, setShown] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!shown) {
      worldState.intro = 1;
      onDone();
      return undefined;
    }

    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    worldState.intro = 0;

    let timer = null;
    let pollTimer = null;
    const started = performance.now();

    const finish = () => {
      worldState.intro = 1;
      onDone();
      setShown(false);
    };

    const checkReady = () => {
      // Transition immediately when 3D world is ready or after 750ms max
      if (worldState.ready || performance.now() - started > 750) {
        timer = window.setTimeout(finish, 200);
      } else {
        pollTimer = window.setTimeout(checkReady, 40);
      }
    };

    // Give a brief, silky 450ms presentation of the authentic mark before checking transition
    const initialTimer = window.setTimeout(checkReady, 450);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(pollTimer);
      window.clearTimeout(initialTimer);
      worldState.intro = 1;
    };
  }, [shown, onDone]);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          key="apple-intro"
          className="fixed inset-0 z-[70] bg-[#05060a] flex flex-col items-center justify-center pointer-events-none select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-hidden="true"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0, 200, 255, 0.14) 0%, rgba(58, 91, 255, 0.06) 45%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <img
              src="/nebulyx-logo-transparent.png"
              alt="Nebulyx"
              width={72}
              height={100}
              className="w-16 sm:w-20 h-auto object-contain drop-shadow-[0_0_24px_rgba(0,200,255,0.35)]"
            />
            <div className="font-display font-semibold tracking-[0.2em] text-[15px] sm:text-[17px] text-white/90 uppercase">
              NEBULYX
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
