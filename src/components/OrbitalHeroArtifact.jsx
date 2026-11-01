import React, { useState, useEffect } from 'react';
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
    { label: "Web Architecture", index: 0, angle: -65, tag: "Next.js & Canvas" },
    { label: "Autonomous Workflows", index: 1, angle: 10, tag: "Claude & n8n" },
    { label: "Social Distribution", index: 2, angle: 75, tag: "Viral Flywheel" },
    { label: "AEO & GEO Search", index: 3, angle: 145, tag: "Perplexity #1" },
    { label: "Turnkey Commerce", index: 4, angle: 220, tag: "3-5d Express" },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center p-6 select-none"
    >
      {/* Dynamic ambient backlighting */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00C8FF]/10 via-transparent to-white/5 blur-3xl pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px) scale(1.1)`,
        }}
      />

      {/* Outer Orbit Guide Track (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          fill="none"
        />
        {/* Secondary Tilted Ellipse */}
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="90"
          stroke="rgba(0, 200, 255, 0.12)"
          strokeWidth="1.2"
          transform="rotate(-24 200 200)"
          fill="none"
        />
      </svg>

      {/* Central Core Emblem Card with 3D Tilt */}
      <div
        className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-[#090e1f]/90 border border-white/10 flex flex-col items-center justify-center p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out group"
        style={{
          transform: `perspective(600px) rotateY(${mousePos.x * 24}deg) rotateX(${-mousePos.y * 24}deg) scale(1.02)`,
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#00C8FF]/20 blur-xl rounded-full scale-125 group-hover:scale-150 transition duration-500" />
          <LogoMark size={72} className="relative z-10 drop-shadow-md" />
        </div>
        <span className="text-white font-display font-bold text-sm sm:text-base tracking-tight mt-2">
          Nebulyx
        </span>
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
          Ecosystem
        </span>
      </div>

      {/* Orbiting Satellite Discipline Chips */}
      {disciplines.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const radius = 160;
        const x = 200 + radius * Math.cos(rad);
        const y = 200 + radius * Math.sin(rad) * 0.72; // Elliptical projection

        return (
          <button
            key={i}
            onClick={() => {
              sound.playClick();
              if (onSelectDiscipline) onSelectDiscipline(d.index);
            }}
            className="absolute z-20 px-3 py-1.5 rounded-xl bg-[#090e1f]/90 hover:bg-[#0f1730] border border-white/10 hover:border-[#00C8FF]/50 text-left transition-all duration-300 hover:scale-105 shadow-lg group backdrop-blur-md"
            style={{
              left: `${(x / 400) * 100}%`,
              top: `${(y / 400) * 100}%`,
              transform: `translate(-50%, -50%) translate(${mousePos.x * (15 + i * 4)}px, ${mousePos.y * (15 + i * 4)}px)`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
              <span className="text-xs font-semibold text-white group-hover:text-[#00C8FF] transition whitespace-nowrap">
                {d.label}
              </span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 group-hover:text-slate-300 truncate">
              {d.tag}
            </div>
          </button>
        );
      })}
    </div>
  );
}

