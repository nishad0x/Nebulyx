import React from 'react';

export default function ImpactMetrics() {
  const metrics = [
    {
      value: "99.8%",
      label: "Autonomous SLA",
      detail: "Zero manual clerical bottlenecks across enterprise workflow pipelines.",
      strokeColor: "stroke-[#00C8FF]",
      percentage: 99.8
    },
    {
      value: "<200ms",
      label: "Global Edge TTI",
      detail: "Sub-second render time across 280+ worldwide CDN edge locations.",
      strokeColor: "stroke-white",
      percentage: 96
    },
    {
      value: "100%",
      label: "Day-1 IP Rights",
      detail: "Complete source code, Git repositories, and cloud credentials transfer.",
      strokeColor: "stroke-[#00C8FF]",
      percentage: 100
    },
    {
      value: "#1 Cited",
      label: "Generative Search",
      detail: "Primary authoritative source in Perplexity and ChatGPT Search queries.",
      strokeColor: "stroke-white",
      percentage: 94
    }
  ];

  return (
    <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>PRODUCTION IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-3">
          Explore our production benchmarks.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl">
          Verifiable metrics across engineering velocity, autonomous systems, and market authority.
        </p>
      </div>

      {/* 4 Orbital Metric Rings (Inspired by Orbosis circles, but ultra-refined & modern) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[#090e1f] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col items-center text-center group"
          >
            {/* SVG Circular Telemetry Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center my-3">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className={m.strokeColor}
                  strokeWidth="4"
                  strokeDasharray={301.6}
                  strokeDashoffset={301.6 - (301.6 * m.percentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight group-hover:scale-105 transition">
                  {m.value}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white font-display mt-2 mb-1">
              {m.label}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
              {m.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

