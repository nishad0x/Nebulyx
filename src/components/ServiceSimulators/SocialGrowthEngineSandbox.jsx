import React, { useState } from 'react';
import { sound } from '../../utils/audio';

export default function SocialGrowthEngineSandbox() {
  const [videoCount, setVideoCount] = useState(30);
  const [platform, setPlatform] = useState('tiktok');

  const platformMultipliers = {
    tiktok: { viewsPerVideo: 45000, viralScore: '94%', leadRate: 0.0018, name: 'TikTok' },
    linkedin: { viewsPerVideo: 12000, viralScore: '88%', leadRate: 0.0065, name: 'LinkedIn' },
    youtube: { viewsPerVideo: 38000, viralScore: '91%', leadRate: 0.0025, name: 'YouTube Shorts' },
    instagram: { viewsPerVideo: 28000, viralScore: '86%', leadRate: 0.0032, name: 'Instagram' }
  };

  const currentMult = platformMultipliers[platform];
  const projectedViews = Math.round(videoCount * currentMult.viewsPerVideo);
  const projectedLeads = Math.round(projectedViews * currentMult.leadRate);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num;
  };

  return (
    <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-sm">
            Distribution Telemetry
          </h4>
          <p className="text-xs text-slate-400">Calculate organic reach and inbound lead volume</p>
        </div>

        <div className="flex items-center bg-[#030712] border border-white/5 rounded-lg p-1">
          {['tiktok', 'linkedin', 'youtube', 'instagram'].map((p) => (
            <button
              key={p}
              onClick={() => { sound.playClick(); setPlatform(p); }}
              className={`px-3 py-1 text-xs rounded capitalize transition ${
                platform === p
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-300 font-medium">Monthly Produced Assets:</span>
              <span className="font-mono text-white font-bold text-sm">{videoCount} Assets</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={videoCount}
              onChange={(e) => {
                sound.playClick();
                setVideoCount(parseInt(e.target.value));
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>10</span>
              <span>50</span>
              <span>90</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#030712] border border-white/5 text-xs text-slate-400 leading-relaxed">
            Assets are scripted with verified retention curves, edited with high-velocity pacing, and deployed at peak algorithmic windows.
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
            <div className="text-[11px] text-slate-400">Projected Views</div>
            <div className="text-2xl font-bold font-display text-white mt-2">
              {formatNumber(projectedViews)}+
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Monthly Organic</div>
          </div>

          <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
            <div className="text-[11px] text-slate-400">Retention Score</div>
            <div className="text-2xl font-bold font-display text-[#00C8FF] mt-2">
              {currentMult.viralScore}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Algorithm Index</div>
          </div>

          <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
            <div className="text-[11px] text-slate-400">Inbound Leads</div>
            <div className="text-2xl font-bold font-display text-white mt-2">
              {formatNumber(projectedLeads)}+
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Direct Conversions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
