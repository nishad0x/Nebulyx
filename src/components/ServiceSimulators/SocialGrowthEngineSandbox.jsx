import React, { useState } from 'react';
import { Share2, Sparkles, TrendingUp, Users, Eye, DollarSign, Video } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function SocialGrowthEngineSandbox() {
  const [videoCount, setVideoCount] = useState(30);
  const [platform, setPlatform] = useState('tiktok'); // 'tiktok' | 'linkedin' | 'youtube' | 'instagram'
  const [tier, setTier] = useState('tech'); // 'tech' | 'ecommerce' | 'b2b'

  const platformMultipliers = {
    tiktok: { viewsPerVideo: 45000, cpmValue: 12, leadRate: 0.0018, name: 'TikTok Viral Engine' },
    linkedin: { viewsPerVideo: 12000, cpmValue: 35, leadRate: 0.0065, name: 'LinkedIn C-Suite Authority' },
    youtube: { viewsPerVideo: 38000, cpmValue: 18, leadRate: 0.0025, name: 'YouTube Shorts Algorithmic' },
    instagram: { viewsPerVideo: 28000, cpmValue: 15, leadRate: 0.0032, name: 'Instagram Visual Funnel' }
  };

  const currentMult = platformMultipliers[platform];
  const projectedViews = Math.round(videoCount * currentMult.viewsPerVideo);
  const adEquivalentValue = Math.round((projectedViews / 1000) * currentMult.cpmValue);
  const projectedLeads = Math.round(projectedViews * currentMult.leadRate);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num;
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden p-5 md:p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              Algorithmic Growth Telemetry
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                ORGANIC DOMINANCE
              </span>
            </h4>
            <p className="text-xs text-slate-400">Calculate organic reach & ad-spend displacement</p>
          </div>
        </div>

        {/* Platform Selector */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
          {['tiktok', 'linkedin', 'youtube', 'instagram'].map((p) => (
            <button
              key={p}
              onClick={() => { sound.playClick(); setPlatform(p); }}
              className={`px-2.5 py-1 text-xs rounded capitalize transition ${
                platform === p
                  ? 'bg-purple-600/30 text-purple-300 font-semibold border border-purple-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-purple-400" />
                Monthly Produced Assets:
              </span>
              <span className="font-mono text-purple-300 font-bold text-sm">{videoCount} Assets</span>
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
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>10 / mo</span>
              <span>50 / mo</span>
              <span>90 / mo</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="text-white font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Nebulyx Viral Hook Engine
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every asset is scripted via predictive retention curves, edited with cinematic motion pacing, and deployed at optimal algorithmic windows.
            </p>
          </div>
        </div>

        {/* Dynamic Telemetry Results */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-b from-purple-950/30 to-slate-950 border border-purple-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-400 text-xs">
              <span>Projected Impressions</span>
              <Eye className="w-4 h-4" />
            </div>
            <div className="my-3">
              <div className="text-2xl font-bold font-mono text-white text-gradient-purple">
                {formatNumber(projectedViews)}+
              </div>
              <div className="text-[11px] text-slate-400">Monthly Organic Views</div>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Algorithmic Flywheel
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 text-xs">
              <span>Paid Ad Equivalent</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="my-3">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                ${formatNumber(adEquivalentValue)}
              </div>
              <div className="text-[11px] text-slate-400">Paid Ad Spend Saved</div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              $0 Media Buying Cost
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-cyan-400 text-xs">
              <span>Direct Inbound Leads</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="my-3">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                {formatNumber(projectedLeads)}+
              </div>
              <div className="text-[11px] text-slate-400">Qualified Warm Leads</div>
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              Via Bio & Automated DM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

