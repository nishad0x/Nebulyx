import React from 'react';

/**
 * Official Nebulyx Vector Emblem
 * Letter 'n' with Celestial Orbital Ring and Cyan Accent Tip
 */
export function LogoMark({ className = "w-7 h-7", size = 28 }) {
  return (
    <img
      src="/nebulyx-logo-transparent.png"
      alt="Nebulyx Logo"
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: 'auto', maxHeight: Math.round(size * 1.35) }}
    />
  );
}

export default function Logo({
  variant = "full", // "mark" | "full" | "monument" | "badge"
  size = "md",
  className = "",
  useImage = false,
}) {
  const sizeConfig = {
    sm: { iconSize: 24, textClass: "text-base tracking-tight", gap: "gap-2.5" },
    md: { iconSize: 32, textClass: "text-lg tracking-tight font-bold", gap: "gap-3" },
    lg: { iconSize: 44, textClass: "text-2xl tracking-tight font-bold", gap: "gap-3.5" },
    xl: { iconSize: 64, textClass: "text-4xl tracking-tight font-bold", gap: "gap-4" },
  };

  const current = sizeConfig[size] || sizeConfig.md;

  if (variant === "mark") {
    if (useImage) {
      return (
        <img
          src="/nebulyx-logo.jpg"
          alt="Nebulyx Logo"
          className={`rounded-xl object-contain ${className}`}
          style={{ width: current.iconSize, height: current.iconSize }}
        />
      );
    }
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoMark size={current.iconSize} />
      </div>
    );
  }

  if (variant === "monument") {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <div className="relative mb-5 group">
          <div className="absolute inset-0 bg-[#00C8FF]/15 blur-2xl rounded-full scale-125 transition group-hover:scale-150" />
          {useImage ? (
            <img
              src="/nebulyx-logo.jpg"
              alt="Nebulyx"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover relative z-10 border border-white/10 shadow-2xl"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#090e1f] border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
              <LogoMark size={56} />
            </div>
          )}
        </div>
        <span className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Nebulyx
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${current.gap} select-none ${className}`}>
      {useImage ? (
        <img
          src="/nebulyx-logo.jpg"
          alt="Nebulyx"
          className="rounded-lg object-cover shrink-0 border border-white/10"
          style={{ width: current.iconSize, height: current.iconSize }}
        />
      ) : (
        <div className="shrink-0 flex items-center justify-center">
          <LogoMark size={current.iconSize} />
        </div>
      )}
      <span className={`text-white font-display font-bold ${current.textClass}`}>
        Nebulyx
      </span>
    </div>
  );
}
