import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MotionConfig } from 'motion/react';
import WorldCanvas from './world/WorldCanvas';
import { useWorldScroll } from './world/useWorldScroll';
import { useDepthFlight } from './world/useDepthFlight';
import { worldState } from './world/store';
import './world/quality';
import SiteNav from './components/site/SiteNav';
import ChapterTag from './components/site/ChapterTag';
import Intro from './components/site/Intro';
import ScrollRail from './components/site/ScrollRail';
import { Welcome, About, Services, Process, Work, Studio, Contact } from './components/site/Sections';
import FaqSection from './components/FaqSection';
import ConsultationDrawer from './components/ConsultationDrawer';

function useHeroReveal(ready) {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ready) {
      gsap.set('[data-line]', { yPercent: 115 });
      gsap.set('#welcome [data-reveal]', { y: 24, autoAlpha: 0 });
      return;
    }
    gsap.to('[data-line]', { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: 0.12 });
    gsap.to('#welcome [data-reveal]', { y: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out', delay: 0.35 });
  }, [ready]);
}

export default function App() {
  const chapter = useWorldScroll();
  const [consult, setConsult] = useState(null);
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);
  useHeroReveal(ready);
  useDepthFlight();

  useEffect(() => {
    if (consult === null && ready) worldState.lenis?.start();
    else worldState.lenis?.stop();
  }, [consult, ready]);

  const book = (service = '') => setConsult(service);

  return (
    <MotionConfig reducedMotion="user">
      <div data-entered={ready ? 'true' : 'false'} className="relative text-white antialiased">
        <WorldCanvas />
        <div aria-hidden="true" className="vignette" />
        <div aria-hidden="true" data-slant-wipe data-active="false" className="slant-wipe" />
        <SiteNav chapter={chapter} onBook={() => book()} />
        <ChapterTag chapter={chapter} />
        <ScrollRail chapter={chapter} />

        <main>
          <Welcome onBook={() => book()} />
          <About />
          <Services onBookService={book} />
          <Process />
          <Work />
          <Studio />
          <FaqSection />
          <Contact onBook={() => book()} />
        </main>

        {consult !== null && <ConsultationDrawer onClose={() => setConsult(null)} preselectedService={consult} />}
        <Intro onDone={onIntroDone} />
        <div aria-hidden="true" className="grain" />
      </div>
    </MotionConfig>
  );
}
