import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OperatingProtocol() {
  const phases = [
    {
      step: "Step 1",
      duration: "Before the sprint",
      title: "Scoping call and plan",
      summary: "We talk through your goals, look at what you have today, and agree exactly what the sprint will deliver.",
      deliverables: ["A written scope and timeline", "A clear list of what you get", "What we need from you"]
    },
    {
      step: "Step 2",
      duration: "Most of the sprint",
      title: "Build",
      summary: "We build in short cycles and show you working progress every week, so there are no surprises at the end.",
      deliverables: ["Weekly demos", "A shared channel for questions", "Changes made as you give feedback"]
    },
    {
      step: "Step 3",
      duration: "Near the end",
      title: "Test and launch",
      summary: "We test on real devices, fix what we find, and put everything live with you.",
      deliverables: ["Testing on phones and desktops", "Launch on your domain and accounts", "Analytics set up"]
    },
    {
      step: "Step 4",
      duration: "Final days",
      title: "Handover",
      summary: "Everything moves into your name: the code, accounts and content, with notes on how to run and change it.",
      deliverables: ["Code and accounts in your name", "Simple how-to notes", "A walkthrough call"]
    }
  ];

  return (
    <section id="protocol" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>HOW IT WORKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-4">
          How a sprint works.
        </h2>
        <p className="text-base text-neutral-400 font-normal leading-relaxed">
          Four steps from first call to handover, with a fixed scope and end date agreed before we start.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {phases.map((phase, i) => (
          <div
            key={i}
            className="p-6 sm:p-7 rounded-[26px] bg-[#070b16] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-5 text-neutral-400">
                <span className="text-[#00C8FF] font-semibold">{phase.step}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px]">
                  {phase.duration}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2.5 tracking-tight">
                {phase.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                {phase.summary}
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                What you get:
              </div>
              {phase.deliverables.map((item, idx) => (
                <div key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]/80 shrink-0"></span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
