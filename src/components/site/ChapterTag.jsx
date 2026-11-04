import React from 'react';
import { CHAPTER_LABELS } from './chapters';

export default function ChapterTag({ chapter }) {
  const item = CHAPTER_LABELS[chapter] ?? CHAPTER_LABELS[0];
  const last = chapter === CHAPTER_LABELS.length - 1;
  return (
    <div
      className={`fixed left-4 sm:left-8 bottom-4 sm:bottom-5 z-30 flex items-stretch world-ink transition-opacity duration-500 ${last ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden="true"
    >
      <span className="grid place-items-center w-9 sm:w-10 bg-[#3a5bff] text-white font-mono text-[12px] overflow-hidden">
        <span key={chapter} className="tag-roll">{String(chapter).padStart(2, '0')}</span>
      </span>
      <span className="hidden sm:block px-3 py-1.5 border border-current/20 font-mono uppercase leading-tight">
        <span className="block text-[10px] opacity-60 tracking-[0.16em]">Chapter</span>
        <span key={item.id} className="tag-roll block text-[12px] tracking-[0.12em]">{item.label}</span>
      </span>
    </div>
  );
}
