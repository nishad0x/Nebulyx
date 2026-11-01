import React from 'react';

export default function ClientBar() {
  const clients = [
    { name: "CHRONOPULSE", type: "FinTech & Liquidity", loc: "Zurich" },
    { name: "OMNISYNC", type: "Autonomous Freight", loc: "Chicago" },
    { name: "APEXHEALTH", type: "Preventative Diagnostics", loc: "Boston" },
    { name: "VELOX BEVERAGES", type: "D2C Brand Engine", loc: "Miami" },
    { name: "AURELIA LIVING", type: "Automated E-Commerce", loc: "London" },
    { name: "SYNTHETIX LABS", type: "Bio-Engineering AI", loc: "San Francisco" },
  ];

  return (
    <div className="py-12 border-y border-white/5 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 shrink-0">
            Deployed Infrastructure For
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center">
            {clients.map((c, i) => (
              <div key={i} className="flex flex-col group">
                <span className="text-xs sm:text-sm font-bold tracking-[0.14em] text-slate-300 group-hover:text-white transition font-display">
                  {c.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {c.loc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

