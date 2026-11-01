import React, { useState } from 'react';
import { Truck, PackageCheck, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function DropshipRevenueMatrixSandbox() {
  const [dailyOrders, setDailyOrders] = useState(150);
  const [shippingMode, setShippingMode] = useState('express'); // 'express' | 'standard'

  const modes = {
    express: { speed: '3–5 Days', carrier: 'Private US/EU Direct Line', onTime: '99.4%', status: 'Recommended' },
    standard: { speed: '18–25 Days', carrier: 'Legacy Drop Postal', onTime: '78.2%', status: 'High Friction' }
  };

  const current = modes[shippingMode];
  const monthlyOrders = dailyOrders * 30;

  return (
    <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-sm">
            Automated Supply Chain Simulator
          </h4>
          <p className="text-xs text-slate-400">Logistics velocity and hands-off fulfillment model</p>
        </div>

        <span className="text-xs text-slate-300 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1.5">
          <PackageCheck className="w-3.5 h-3.5 text-[#00C8FF]" />
          Direct Factory Express Line
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Daily Order Volume:</span>
              <span className="font-mono text-white font-bold text-sm">{dailyOrders} / day</span>
            </div>
            <input
              type="range"
              min="20"
              max="800"
              step="10"
              value={dailyOrders}
              onChange={(e) => {
                sound.playClick();
                setDailyOrders(parseInt(e.target.value));
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>20/day</span>
              <span>400/day</span>
              <span>800/day</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-300 font-medium mb-1.5">Fulfillment Logistics Pipeline:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { sound.playClick(); setShippingMode('express'); }}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  shippingMode === 'express'
                    ? 'border-white/30 bg-[#0f162d] text-white font-medium'
                    : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] text-[#00C8FF] font-mono">Nebulyx Private</div>
                <div className="font-semibold text-white">3–5 Day Express</div>
              </button>
              <button
                type="button"
                onClick={() => { sound.playClick(); setShippingMode('standard'); }}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  shippingMode === 'standard'
                    ? 'border-white/30 bg-[#0f162d] text-white font-medium'
                    : 'border-white/5 bg-[#030712] text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] text-slate-500 font-mono">Traditional</div>
                <div>20–25 Day Postal</div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
            <div className="text-[11px] text-slate-400">Monthly Dispatched</div>
            <div className="text-2xl font-bold font-display text-white mt-2">
              {monthlyOrders.toLocaleString()} Orders
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">
              Zero Physical Warehouse Holding
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
            <div className="text-[11px] text-slate-400">Delivery Velocity</div>
            <div className="text-2xl font-bold font-display text-white mt-2">
              {current.speed}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              {current.carrier}
            </div>
          </div>

          <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#030712] border border-white/5 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full automated tracking sync, inventory auto-reorder, and return protection.</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-2">{current.onTime} SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
