import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorldCanvas from './world/WorldCanvas';
import { useWorldScroll } from './world/useWorldScroll';
import { worldState } from './world/store';
import SiteNav from './components/site/SiteNav';
import ChapterTag from './components/site/ChapterTag';
import { Welcome, About, Services, Process, Work, Studio, Contact } from './components/site/Sections';
import FaqSection from './components/FaqSection';
import ConsultationDrawer from './components/ConsultationDrawer';

function useReveal() {
  useEffect(() => {
    if (worldState.reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', { yPercent: 115, duration: 1.5, ease: 'expo.out', stagger: 0.12, delay: 0.25 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.06, overwrite: true }
          ),
      });
    });
    return () => ctx.revert();
  }, []);
}

export default function App() {
  const chapter = useWorldScroll();
  const [consult, setConsult] = useState(null);
  useReveal();

  useEffect(() => {
    if (consult === null) worldState.lenis?.start();
    else worldState.lenis?.stop();
  }, [consult]);

  const book = (service = '') => setConsult(service);

  return (
    <div className="relative text-white antialiased">
      <WorldCanvas />
      <SiteNav chapter={chapter} onBook={() => book()} />
      <ChapterTag chapter={chapter} />

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
    </div>
  );
}
