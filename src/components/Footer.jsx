import React from 'react';
import { ArrowUpRight, Shield, Globe, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Footer({ onOpenConsult }) {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-400">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                NX
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-wider font-display">
              NEBULYX
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
            Architecting next-generation digital ecosystems for ambitious category leaders. High-velocity websites, autonomous workflow pipelines, algorithmic social growth, AEO/GEO generative optimization, and turnkey scaled dropshipping.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All Global Systems Operational • 99.99% Edge SLA</span>
          </div>
        </div>

        {/* Services Links */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Disciplines
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#services" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                1. Website Building
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                2. Autonomous Workflows
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                3. Social Media Enhancement
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                4. AEO & GEO Marketing
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                5. Scaled Dropshipping Models
              </a>
            </li>
          </ul>
        </div>

        {/* Proof & Frameworks */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Evidence
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#portfolio" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                Verified Case Studies
              </a>
            </li>
            <li>
              <a href="#aeo-shift" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                The AEO / GEO Paradigm
              </a>
            </li>
            <li>
              <a href="#tech-stack" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                Production Tech Arsenal
              </a>
            </li>
            <li>
              <a href="#estimator" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition">
                Scope & Cost Calculator
              </a>
            </li>
          </ul>
        </div>

        {/* Global Operations Nodes */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Global Hubs
          </div>
          <div className="space-y-1.5 text-slate-400 font-mono text-[11px]">
            <div>• San Francisco (SFO Edge)</div>
            <div>• London (LHR Node)</div>
            <div>• Zurich (ZRH Core)</div>
            <div>• Singapore (SIN Hub)</div>
            <div>• Tokyo (NRT Edge)</div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
            >
              <span>Schedule Architecture Intake</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} NEBULYX PLATFORM INC. ALL INTELLECTUAL PROPERTY TRANSFERRED TO CLIENTS UNDER STRICT CONTRACTUAL SLA.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> SOC2 Standard Compliant
          </span>
          <span>Zero-Knowledge Encryption</span>
        </div>
      </div>
    </footer>
  );
}

