import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import Logo from './Logo';
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
    { label: 'Disciplines', href: '#services' },
    { label: 'Philosophy', href: '#about' },
    { label: 'The Shift', href: '#comparison' },
    { label: 'Protocol', href: '#protocol' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with official emblem */}
          <a
            href="#"
            onClick={() => sound.playPing(600, 0.08)}
            className="flex items-center gap-3 group"
          >
            <Logo variant="full" size="md" showTagline={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => sound.playClick()}
                className="text-xs font-medium text-slate-400 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onToggleSound}
              title={isSoundOn ? 'Mute sound' : 'Enable audio feedback'}
              className="p-2 text-slate-400 hover:text-white transition"
            >
              {isSoundOn ? <Volume2 className="w-4 h-4 text-slate-200" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="px-4 py-2 rounded-lg bg-white text-slate-950 font-semibold text-xs hover:bg-slate-100 transition shadow-sm"
            >
              Start Project
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleSound}
              className="p-2 text-slate-400"
            >
              {isSoundOn ? <Volume2 className="w-4 h-4 text-slate-200" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030712] border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="block text-sm text-slate-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playPing();
                setMobileMenuOpen(false);
                onOpenConsult();
              }}
              className="w-full py-2.5 rounded-lg bg-white text-slate-950 font-semibold text-xs text-center"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
