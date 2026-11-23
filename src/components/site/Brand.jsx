import React from 'react';

export function NebulyxMark({ size = 28, title, className = '' }) {
  return (
    <img
      src="/nebulyx-logo-transparent.png"
      alt={title || "Nebulyx"}
      width={size}
      height={Math.round(size * (599 / 429))}
      className={`nbx-mark inline-block object-contain shrink-0 transition-transform duration-300 ease-out hover:scale-105 ${className}`}
      style={{ width: size, height: 'auto', maxHeight: Math.round(size * 1.35) }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    />
  );
}

export function NebulyxLogo({ size = 28, className = '' }) {
  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <NebulyxMark size={size} />
      <span className="font-display font-semibold tracking-[0.1em] text-[15px] sm:text-[16px] text-white">NEBULYX</span>
    </span>
  );
}
