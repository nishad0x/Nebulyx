import React from 'react';
import { ArrowUpRight, ChevronRight, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { sound } from '../utils/audio';

export default function Footer({ onOpenConsult }) {
  return (
    <footer className="bg-black border-t border-white/[0.08] pt-16 pb-12 px-5 sm:px-8 max-w-7xl mx-auto text-xs text-neutral-400">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
        <div className="lg:col-span-2 space-y-4">
          <Logo variant="full" size="md" showTagline={false} />
          <p className="text-neutral-400 leading-relaxed text-xs max-w-sm pt-2">
            Digital engineering for category leaders. High-velocity websites, autonomous agent pipelines, algorithmic distribution engines, AEO generative search authority, and scaled dropshipping infrastructure.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Global Edge Operational • 99.99% Availability</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Disciplines
          </div>
          <ul className="space-y-2 text-neutral-400">
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Web Architecture Pro</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Autonomous Agent Core</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Viral Signal Studio</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">AEO & GEO Search</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Turnkey Scaled Commerce</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Protocol & Evidence
          </div>
          <ul className="space-y-2 text-neutral-400">
            <li><a href="#protocol" onClick={() => sound.playClick()} className="hover:text-white transition">21-Day Execution Protocol</a></li>
            <li><a href="#portfolio" onClick={() => sound.playClick()} className="hover:text-white transition">Verified Case Studies</a></li>
            <li><a href="#specs" onClick={() => sound.playClick()} className="hover:text-white transition">Technical Specifications</a></li>
            <li><a href="#comparison" onClick={() => sound.playClick()} className="hover:text-white transition">Model Comparison</a></li>
            <li><a href="#faq" onClick={() => sound.playClick()} className="hover:text-white transition">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Architecture Nodes
          </div>
          <div className="space-y-1.5 text-neutral-400 font-mono text-[11px]">
            <div>San Francisco · 37.7749° N</div>
            <div>London · 51.5074° N</div>
            <div>Zurich · 47.3769° N</div>
            <div>Singapore · 1.3521° N</div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="text-xs font-semibold text-white hover:text-neutral-300 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Schedule Scoping Session</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
        <div>
          © {new Date().getFullYear()} NEBULYX ARCHITECTURE INC. 100% INTELLECTUAL PROPERTY TRANSFERRED ON DAY 1.
        </div>
        <div className="flex items-center gap-4">
          <span>SOC-2 Standards Ready</span>
          <span>Zero-Knowledge Architecture</span>
        </div>
      </div>
    </footer>
  );
}
