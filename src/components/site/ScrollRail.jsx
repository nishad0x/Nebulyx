import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { CHAPTER_LABELS } from './chapters';
import { scrollToId } from '../../world/useWorldScroll';

export default function ScrollRail({ chapter }) {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.0005 });
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const read = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setMarks(CHAPTER_LABELS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? Math.min(1, el.offsetTop / max) : 0;
      }));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  return (
    <nav aria-label="Chapters" className="world-chrome hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-30 h-[46vh] w-6 world-ink">
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-current opacity-15" />
      <motion.div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#3a5bff] origin-top" style={{ scaleY: fill }} />
      {CHAPTER_LABELS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          onClick={() => scrollToId(c.id)}
          aria-label={c.label}
          aria-current={i === chapter ? 'true' : undefined}
          className="group focus-ring absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 grid place-items-center"
          style={{ top: `${(marks[i] ?? 0) * 100}%` }}
        >
          <span className={`block transition-all duration-300 ${i === chapter ? 'w-2 h-3 -skew-y-[30deg] bg-[#3a5bff]' : 'w-1 h-2 -skew-y-[30deg] bg-current opacity-50 group-hover:opacity-100'}`} />
          <span className={`absolute right-7 whitespace-nowrap font-mono text-[10px] tracking-[0.16em] uppercase transition-opacity duration-300 ${i === chapter ? 'opacity-80' : 'opacity-0 group-hover:opacity-80'}`}>
            {c.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
