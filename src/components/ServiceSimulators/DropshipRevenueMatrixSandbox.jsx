import React, { useState } from 'react';
import { ShoppingBag, TrendingUp, Truck, ShieldAlert, DollarSign, PackageCheck, Repeat } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function DropshipRevenueMatrixSandbox() {
  const [aov, setAov] = useState(85); // Average Order Value in $
  const [dailyOrders, setDailyOrders] = useState(120); // Orders per day
  const [marginPct, setMarginPct] = useState(62); // Net profit margin %

  // Calculations
  const monthlyOrders = dailyOrders * 30;
  const monthlyGmv = monthlyOrders * aov;
  const monthlyNetProfit = Math.round(monthlyGmv * (marginPct / 100));
  const annualRunRate = monthlyGmv * 12;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden p-5 md:p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              Scaled E-Commerce Revenue Model
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                TURNKEY ARBITRAGE
              </span>
            </h4>
            <p className="text-xs text-slate-400">Simulate autonomous dropshipping unit economics</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg">
          <PackageCheck className="w-3.5 h-3.5" />
          3-5 Day Express Private Delivery
        </div>
      </div>

      {/* Grid Inputs & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Sliders */}
        <div className="lg:col-span-5 space-y-5">
          {/* AOV */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Average Order Value (AOV):</span>
              <span className="font-mono text-amber-300 font-bold text-sm">${aov}</span>
            </div>
            <input
              type="range"
              min="35"
              max="250"
              step="5"
              value={aov}
              onChange={(e) => {
                sound.playClick();
                setAov(parseInt(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>$35</span>
              <span>$140</span>
              <span>$250</span>
            </div>
          </div>

          {/* Daily Orders */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Daily Orders Dispatched:</span>
              <span className="font-mono text-amber-300 font-bold text-sm">{dailyOrders} / day</span>
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
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>20 / day</span>
              <span>400 / day</span>
              <span>800 / day</span>
            </div>
          </div>

          {/* Net Margin */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Net Profit Margin:</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">{marginPct}%</span>
            </div>
            <input
              type="range"
              min="35"
              max="75"
              step="1"
              value={marginPct}
              onChange={(e) => {
                sound.playClick();
                setMarginPct(parseInt(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Telemetry Display */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-950 border border-amber-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 text-xs">
              <span>Monthly Scaled GMV</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold font-mono text-white text-gradient-gold">
                {formatCurrency(monthlyGmv)}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {monthlyOrders.toLocaleString()} Orders / Mo
              </div>
            </div>
            <div className="text-[11px] text-amber-300 font-mono">
              Annual Run Rate: {formatCurrency(annualRunRate)}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-950/20 to-slate-950 border border-emerald-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 text-xs">
              <span>Projected Net Profit</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {formatCurrency(monthlyNetProfit)}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Direct to Bank Account
              </div>
            </div>
            <div className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
              <Repeat className="w-3 h-3" /> Fully Hands-Off Logistics
            </div>
          </div>

          {/* Logistics Guarantee Badge */}
          <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-300">
                Zero inventory holding risk. Tier-1 private agent fulfillment dispatched automatically.
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-2">99.4% On-Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

