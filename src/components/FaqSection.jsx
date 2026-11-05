import React, { useState } from 'react';
import Split from './site/Split';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { sound } from '../utils/audio';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How much does a sprint cost?",
      a: "It depends on what you need built, so we don't publish fixed prices. After the scoping call you get a written scope and a price for it. There's no commitment until you approve both."
    },
    {
      q: "What happens on the scoping call?",
      a: "We ask about your business, what you want to build and your deadline, and look at anything you already have. Then we follow up with a written scope: what we'll build, what you get, how long it takes and what it costs."
    },
    {
      q: "What do I need to provide?",
      a: "Mostly your time for a few short check-ins, plus access to any accounts we'll work in (domain, hosting, tools you already use) and any content or brand material you have. If you're starting from scratch, that's fine too."
    },
    {
      q: "Who owns what you build?",
      a: "You do. The code, accounts and content are set up in your name, so you can keep using them, change them or take them to another team."
    },
    {
      q: "What if the sprint takes longer than planned?",
      a: "We show you progress every week, so problems surface early. If something changes, we tell you straight away and agree a plan with you before going further."
    },
    {
      q: "What's the difference between AI search (AEO/GEO) and SEO?",
      a: "SEO aims to rank your pages on Google. AI search visibility makes sure assistants like ChatGPT, Perplexity, Claude and Gemini can find clear information about you, so they describe your business accurately when someone asks for a recommendation. Most businesses benefit from both."
    }
  ];

  const toggle = (i) => {
    sound.playClick();
    setOpenIdx(openIdx === i ? -1 : i);
  };

  return (
    <section id="faq" data-kf="faq" className="relative">
      <div data-depth className="min-h-[100svh] flex items-center py-28 sm:py-32 px-5 sm:px-8">
      <div className="w-full mx-auto max-w-3xl">
        <Split lines={['Questions founders ask us.']} className="font-display text-white text-[clamp(2.2rem,4.2vw,4rem)] leading-[1] tracking-[-0.04em] text-balance" />
        <p data-reveal className="mt-5 text-[17px] leading-relaxed text-[#b6bccb]">
          Cost, process and ownership, answered plainly.
        </p>

        <div className="mt-14 border-t border-white/[0.14]">
          {faqs.map((item, i) => {
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
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-7 pr-10 text-[16px] leading-relaxed text-[#b6bccb]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
