import React from 'react';

export const MARK_VIEWBOX = '0 0 100 100';
export const MARK_LEFT = 'M12 20 36 6V74L12 88Z';
export const MARK_DIAGONAL = 'M36 28 76 80V100L36 48Z';
export const MARK_RIGHT = 'M76 34 96 20V88L76 100Z';

export function NebulyxMark({ size = 28, title, className = '' }) {
  return (
    <img
      src="/nebulyx-logo-transparent.png"
      alt={title || "Nebulyx"}
      width={size}
      height={Math.round(size * (599 / 429))}
      className={`nbx-mark inline-block object-contain shrink-0 ${className}`}
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
      <span className="font-display font-semibold tracking-[0.08em] text-[16px]">NEBULYX</span>
    </span>
  );
}
