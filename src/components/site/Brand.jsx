import React from 'react';

export function NebulyxMark({ size = 28, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="nbx-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d86ff" />
          <stop offset="1" stopColor="#2f4df0" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#nbx-tile)" />
      <rect x="1.5" y="1.5" width="29" height="14" rx="7.5" fill="#ffffff" opacity="0.12" />
      <path d="M10 22.5V9.5l12 13V9.5" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6.5v2M16 23.5v2M6.5 16h2M23.5 16h2" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function NebulyxLogo({ size = 28 }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <NebulyxMark size={size} />
      <span className="font-display font-semibold tracking-[0.14em] text-[15px]">NEBULYX</span>
    </span>
  );
}
