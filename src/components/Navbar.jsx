import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowRight, Menu, X, ShieldAlert, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ onOpenConsult, isSoundOn, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'AEO / GEO Shift', href: '#aeo-shift' },
    { label: 'Tech Arsenal', href: '#tech-stack' },
    { label: 'Scope Estimator', href: '#estimator' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => sound.playPing(600, 0.08)}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-sm tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                  NX
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-display flex items-center gap-1">
                NEBULYX
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                Digital Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => sound.playClick()}
                className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition rounded-full hover:bg-slate-800/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Audio Toggle + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={onToggleSound}
              title={isSoundOn ? 'Mute sound effects' : 'Enable futuristic sound FX'}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1 text-xs"
            >
              {isSoundOn ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-mono text-cyan-400">FX ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] font-mono text-slate-500">MUTE</span>
                </>
              )}
            </button>

            {/* Launch CTA */}
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20"
            >
              <span>Launch Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400"
            >
              {isSoundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm text-slate-200 hover:text-cyan-400 font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                sound.playPing();
                setMobileMenuOpen(false);
                onOpenConsult();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs text-center"
            >
              Launch Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

