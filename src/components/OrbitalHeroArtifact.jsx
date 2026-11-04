import React, { useState } from 'react';
import { LogoMark } from './Logo';
import { sound } from '../utils/audio';

export default function OrbitalHeroArtifact({ onSelectDiscipline }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const disciplines = [
    { label: "Websites", index: 0, angle: -65, tag: "Fast, owned sites" },
    { label: "AI Automations", index: 1, angle: 10, tag: "Less busywork" },
    { label: "Social Growth", index: 2, angle: 75, tag: "Grow your audience" },
    { label: "AI Search", index: 3, angle: 145, tag: "Get found in AI answers" },
    { label: "Online Stores", index: 4, angle: 220, tag: "Launch and sell" },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center p-6 select-none"
    >
      {/* Apple-grade ambient atmospheric radial lighting */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00C8FF]/15 via-transparent to-white/[0.04] blur-3xl pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 32}px, ${mousePos.y * 32}px) scale(1.08)`,
        }}
      />

      {/* Outer Orbit Guide Track (SVG) with precision technical dash lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1.2"
          strokeDasharray="3 6"
          fill="none"
        />
        {/* Secondary Tilted Celestial Ellipse */}
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="92"
          stroke="rgba(0, 200, 255, 0.16)"
          strokeWidth="1.2"
          transform="rotate(-24 200 200)"
          fill="none"
        />
      </svg>

      {/* Central Core Emblem Card with Milled Titanium Hardware Bezel */}
      <div
        className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-[28px] bg-[#080b14]/95 border border-white/[0.12] flex flex-col items-center justify-center p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl transition-transform duration-300 ease-out group cursor-default"
        style={{
          transform: `perspective(700px) rotateY(${mousePos.x * 22}deg) rotateX(${-mousePos.y * 22}deg) scale(1.02)`,
        }}
      >
        {/* Specular light sweep reflection */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

        <div className="relative">
          <div className="absolute inset-0 bg-[#00C8FF]/20 blur-xl rounded-full scale-125 group-hover:scale-150 transition duration-500" />
          <LogoMark size={72} className="relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
        </div>
        <span className="text-white font-display font-bold text-sm sm:text-base tracking-tight mt-2.5">
          Nebulyx
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase -mt-0.5">
          Ecosystem Core
        </span>
      </div>

      {/* Orbiting Satellite Discipline Chips */}
      {disciplines.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const radius = 160;
        const x = 200 + radius * Math.cos(rad);
        const y = 200 + radius * Math.sin(rad) * 0.72; // Elliptical 3D tilt

        return (
          <button
            key={i}
            onClick={() => {
              sound.playClick();
              if (onSelectDiscipline) onSelectDiscipline(d.index);
            }}
            className="absolute z-20 px-3.5 py-1.5 rounded-full bg-[#090d1a]/90 hover:bg-[#10172e] border border-white/[0.10] hover:border-[#00C8FF]/50 text-left transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.7)] group backdrop-blur-xl cursor-pointer"
            style={{
              left: `${(x / 400) * 100}%`,
              top: `${(y / 400) * 100}%`,
              transform: `translate(-50%, -50%) translate(${mousePos.x * (14 + i * 4)}px, ${mousePos.y * (14 + i * 4)}px)`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
              <span className="text-xs font-semibold text-white group-hover:text-[#00C8FF] transition whitespace-nowrap">
                {d.label}
              </span>
            </div>
            <div className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-300 truncate">
              {d.tag}
            </div>
          </button>
        );
      })}
    </div>
  );
}
