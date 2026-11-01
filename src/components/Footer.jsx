import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { sound } from '../utils/audio';

export default function Footer({ onOpenConsult }) {
  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-16 pb-12 px-5 sm:px-8 max-w-7xl mx-auto text-xs text-slate-400">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
        <div className="lg:col-span-2 space-y-4">
          <Logo variant="full" size="md" showTagline={true} />
          <p className="text-slate-400 leading-relaxed text-xs max-w-sm pt-2">
            Digital engineering for ambitious category leaders. High-velocity websites, autonomous workflows, social distribution engines, AEO generative search authority, and scaled dropshipping infrastructure.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            Global Systems Operational • 99.99% Edge Availability
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Disciplines
          </div>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Website Building</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Autonomous Workflows</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Social Distribution</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">AEO & GEO Marketing</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Scaled Dropshipping</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Protocol & Evidence
          </div>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#protocol" onClick={() => sound.playClick()} className="hover:text-white transition">21-Day Protocol</a></li>
            <li><a href="#portfolio" onClick={() => sound.playClick()} className="hover:text-white transition">Case Studies</a></li>
            <li><a href="#aeo-shift" onClick={() => sound.playClick()} className="hover:text-white transition">The AEO Shift</a></li>
            <li><a href="#estimator" onClick={() => sound.playClick()} className="hover:text-white transition">Scope Estimator</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Nodes
          </div>
          <div className="space-y-1.5 text-slate-400 font-mono text-[11px]">
            <div>San Francisco</div>
            <div>London</div>
            <div>Zurich</div>
            <div>Singapore</div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="text-xs font-semibold text-white hover:text-slate-300 transition flex items-center gap-1"
            >
              <span>Schedule Scoping Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} NEBULYX PLATFORM INC. 100% INTELLECTUAL PROPERTY TRANSFERRED ON DAY 1.
        </div>
        <div className="flex items-center gap-4">
          <span>SOC2 Standard Ready</span>
          <span>Zero-Knowledge Architecture</span>
        </div>
      </div>
    </footer>
  );
}
