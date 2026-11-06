import React from 'react';

export const MARK_VIEWBOX = '0 0 100 100';
export const MARK_LEFT = 'M12 20 36 6V74L12 88Z';
export const MARK_DIAGONAL = 'M36 28 76 80V100L36 48Z';
export const MARK_RIGHT = 'M76 34 96 20V88L76 100Z';

export function NebulyxMark({ size = 28, title }) {
  return (
    <svg
      className="nbx-mark"
      width={size}
      height={size}
      viewBox={MARK_VIEWBOX}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={MARK_LEFT} />
      <path className="nbx-mark-diagonal" d={MARK_DIAGONAL} fillOpacity="0.8" />
      <path d={MARK_RIGHT} />
    </svg>
  );
}

export function NebulyxLogo({ size = 28 }) {
  return (
    <span className="group inline-flex items-center gap-2.5">
      <NebulyxMark size={size} />
      <span className="font-display font-semibold tracking-[0.08em] text-[16px]">NEBULYX</span>
    </span>
  );
}
