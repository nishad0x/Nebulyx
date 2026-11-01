import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import Logo, { LogoMark } from './Logo';
import { sound } from '../utils/audio';

export default function Navbar({ onOpenConsult, isSoundOn, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['overview', 'about', 'services', 'comparison', 'specs', 'protocol', 'portfolio', 'faq'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview', id: 'overview' },
    { label: 'Philosophy', href: '#about', id: 'about' },
    { label: 'Disciplines', href: '#services', id: 'services' },
    { label: 'Comparison', href: '#comparison', id: 'comparison' },
    { label: 'Tech Specs', href: '#specs', id: 'specs' },
    { label: 'Protocol', href: '#protocol', id: 'protocol' },
    { label: 'Case Studies', href: '#portfolio', id: 'portfolio' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Primary Apple-Grade Global Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-black/40 backdrop-blur-md border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left: Official Nebulyx Logo & Wordmark */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                sound.playPing(600, 0.08);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <Logo variant="full" size="md" showTagline={false} />
            </a>

            {/* Center: Apple-style Minimal Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-[12px] font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Audio Haptic Toggle & Apple Pill CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Apple-style Audio Haptics Toggle */}
              <button
                onClick={onToggleSound}
                title={isSoundOn ? 'Mute sound effects' : 'Enable audio feedback'}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
              >
                {isSoundOn ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#00C8FF]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>

              {/* Apple Curved Pill Button */}
              <button
                onClick={() => {
                  sound.playPing();
                  onOpenConsult();
                }}
                className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 active:scale-95 transition-all duration-200 shadow-[0_2px_10px_rgba(255,255,255,0.15)] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Initiate Sprint</span>
                <ChevronRight className="w-3.5 h-3.5 text-black/70" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onToggleSound}
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400"
              >
                {isSoundOn ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#00C8FF]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.08] px-5 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-neutral-300 hover:text-white py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sound.playPing();
                  onOpenConsult();
                }}
                className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Initiate Engineering Sprint</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Apple-Style Sticky Product Sub-Navigation Island (Appears on Scroll) */}
      <div
        className={`fixed top-14 sm:top-16 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        } bg-[#060810]/85 backdrop-blur-xl border-b border-white/[0.06]`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-white tracking-tight font-display">
              Nebulyx Pro
            </span>
            <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">
              Architecture 2025/2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-medium">
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => handleNavClick('#overview')} className="hover:text-white transition">Overview</button>
              <button onClick={() => handleNavClick('#services')} className="hover:text-white transition">Disciplines</button>
              <button onClick={() => handleNavClick('#specs')} className="hover:text-white transition">Tech Specs</button>
              <button onClick={() => handleNavClick('#protocol')} className="hover:text-white transition">21-Day SLA</button>
            </div>

            <button
              onClick={() => {
                sound.playPing();
                onOpenConsult();
              }}
              className="px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-black border border-white/10 text-[11px] font-semibold transition-all duration-200"
            >
              Start Sprint
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
