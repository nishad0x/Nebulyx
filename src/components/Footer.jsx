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
            An engineering and growth studio for founders. Websites, AI automations, social growth, AI search visibility and online stores, built in fixed-length sprints.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Services
          </div>
          <ul className="space-y-2 text-neutral-400">
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Websites</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">AI automations</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Social growth</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">AI search visibility</a></li>
            <li><a href="#services" onClick={() => sound.playClick()} className="hover:text-white transition">Online stores</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Learn more
          </div>
          <ul className="space-y-2 text-neutral-400">
            <li><a href="#protocol" onClick={() => sound.playClick()} className="hover:text-white transition">How a sprint works</a></li>
            <li><a href="#portfolio" onClick={() => sound.playClick()} className="hover:text-white transition">Example projects</a></li>
            <li><a href="#specs" onClick={() => sound.playClick()} className="hover:text-white transition">Tech we use</a></li>
            <li><a href="#comparison" onClick={() => sound.playClick()} className="hover:text-white transition">Why Nebulyx</a></li>
            <li><a href="#faq" onClick={() => sound.playClick()} className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Get started
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Tell us what you want to build. We'll reply with a written scope, timeline and price.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="text-xs font-semibold text-white hover:text-neutral-300 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Book a scoping call</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
        <div>
          © {new Date().getFullYear()} Nebulyx
        </div>
        <div className="flex items-center gap-4">
          <span>You own what we build</span>
        </div>
      </div>
    </footer>
  );
}
