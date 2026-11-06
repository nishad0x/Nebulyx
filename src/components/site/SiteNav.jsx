import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NebulyxLogo } from './Brand';
import { scrollToId } from '../../world/useWorldScroll';
import { CHAPTER_LABELS } from './chapters';

const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'How it works' },
  { id: 'work', label: 'Work' },
  { id: 'faq', label: 'FAQ' },
];

export default function SiteNav({ chapter, onBook }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };
  const active = CHAPTER_LABELS[chapter]?.id;

  return (
    <header className={`world-chrome chrome-drop fixed top-0 inset-x-0 z-40 world-ink ${scrolled || open ? 'nav-band' : ''}`}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#welcome" onClick={(e) => { e.preventDefault(); go('welcome'); }} aria-label="Nebulyx, back to top" className="focus-ring rounded-md">
          <NebulyxLogo />
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); go(l.id); }}
              aria-current={active === l.id ? 'true' : undefined}
              className={`focus-ring rounded-sm text-[13px] font-medium transition-opacity ${active === l.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onBook} className="btn-primary h-11 md:h-10 px-4 text-[13px]">
            Book a scoping call
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden focus-ring w-11 h-11 grid place-items-center rounded-lg"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="md:hidden px-5 pb-6 pt-2 bg-[#05060a]/95 backdrop-blur text-white">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); go(l.id); }}
              className="focus-ring block py-3 text-lg border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
