import React, { useState } from 'react';
import Split from './site/Split';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { sound } from '../utils/audio';
import { FAQS } from '../data/faqs';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);


  const toggle = (i) => {
    sound.playClick();
    setOpenIdx(openIdx === i ? -1 : i);
  };

  return (
    <section id="faq" data-kf="faq" className="relative">
      <div data-depth className="min-h-[100svh] flex items-center py-28 sm:py-32 px-5 sm:px-8">
      <div className="w-full mx-auto max-w-3xl">
        <Split lines={['Questions founders ask us.']} className="font-display font-medium text-white text-[clamp(2.2rem,4.2vw,4rem)] leading-[1] tracking-[-0.02em] text-balance" />
        <p data-reveal className="mt-5 text-[17px] leading-relaxed text-[#b6bccb]">
          Cost, process and ownership, answered plainly.
        </p>

        <div className="mt-14 border-t border-white/[0.14]">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q} className="stagger-item border-b border-white/[0.14] bg-[#05060a]/70 backdrop-blur-[2px]" style={{ '--i': i + 2 }}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="focus-ring w-full py-6 text-left flex items-center justify-between gap-6 cursor-pointer"
                  >
                    <span className="text-[17px] sm:text-[19px] text-white tracking-[-0.01em]">{item.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#8fa2ff]' : 'text-[#9aa1b2]'}`}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="pb-7 pr-10 text-[16px] leading-relaxed text-[#b6bccb]">
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
