import React from 'react';
import { LogoMark } from './Logo';
import { ShieldCheck, Zap, Bot, Lock } from 'lucide-react';

export default function AboutMissionSection() {
  const pillars = [
    {
      icon: Zap,
      title: "Sub-Second Edge Engineering",
      desc: "Every web platform is built on modern React 19 / Next.js edge architecture, guaranteed to achieve 99+ Core Web Vitals and sub-200ms global render time."
    },
    {
      icon: Bot,
      title: "Self-Healing Autonomous Systems",
      desc: "We eliminate repetitive human labor through multi-agent orchestration (Claude 3.5 Sonnet, n8n, Python), saving enterprise clients tens of thousands of operational hours."
    },
    {
      icon: ShieldCheck,
      title: "Post-Google AI Search Dominance",
      desc: "Traditional SEO is fading. We anchor your brand's semantic entity graphs into training datasets so Perplexity, ChatGPT, and Claude recommend you as the definitive authority."
    },
    {
      icon: Lock,
      title: "100% Day-1 Intellectual Property",
      desc: "Zero agency lock-in, zero proprietary closed traps. All source code, Git repositories, cloud infrastructure, and private agent pipelines are fully transferred to you."
    }
  ];

  return (
    <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <LogoMark size={14} />
            <span>The Nebulyx Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            The agency model is broken. We built the antidote.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 text-slate-400 text-sm sm:text-base leading-relaxed">
          <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
            Traditional IT consultancies bill by the hour, stretch projects into six-month marathons, and rely on decade-old templates. They profit from your delays.
          </p>
          <p>
            Nebulyx was founded on a contrary principle: ambitious startups and category leaders don't need endless status meetings. They need high-velocity digital architecture, autonomous operational workflows, and authoritative AI search positioning that converts immediately.
          </p>
          <p>
            We operate in focused 21-day production sprints backed by contractual SLAs. When we ship, you receive modern, production-grade infrastructure that gives you an unassailable technological moat.
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#090e1f] border border-white/5 hover:border-white/15 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-200 mb-5 group-hover:text-[#00C8FF] transition">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

