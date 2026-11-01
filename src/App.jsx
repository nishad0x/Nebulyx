import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientBar from './components/ClientBar';
import NebulaCanvas from './components/NebulaCanvas';
import ServicesShowcase from './components/ServicesShowcase';
import OperatingProtocol from './components/OperatingProtocol';
import AeoExplanationSection from './components/AeoExplanationSection';
import PortfolioShowcase from './components/PortfolioShowcase';
import TechnologyStackMatrix from './components/TechnologyStackMatrix';
import ProjectScopeConfigurator from './components/ProjectScopeConfigurator';
import TrustAndGuarantee from './components/TrustAndGuarantee';
import ConsultationDrawer from './components/ConsultationDrawer';
import Footer from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [consultPreselectedService, setConsultPreselectedService] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(false);

  const handleOpenConsult = (serviceName = '') => {
    sound.playPing();
    setConsultPreselectedService(serviceName);
    setIsConsultOpen(true);
  };

  const handleCloseConsult = () => {
    setIsConsultOpen(false);
    setConsultPreselectedService('');
  };

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setIsSoundOn(newState);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProposalSubmit = (proposalData) => {
    console.log('Project Scope captured:', proposalData);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#030712] text-slate-100 antialiased selection:bg-white/20 selection:text-white">
      {/* Subtle Living Canvas */}
      <NebulaCanvas />

      {/* Main Layout */}
      <div className="relative z-10">
        <Navbar
          onOpenConsult={() => handleOpenConsult()}
          isSoundOn={isSoundOn}
          onToggleSound={handleToggleSound}
        />

        <Hero
          onOpenConsult={() => handleOpenConsult()}
          onScrollToServices={handleScrollToServices}
        />

        {/* Client Infrastructure Reference Bar */}
        <ClientBar />

        {/* Core Disciplines with Live Simulators */}
        <ServicesShowcase
          onSelectServiceForConsult={(serviceName) => handleOpenConsult(serviceName)}
        />

        {/* 21-Day Execution Protocol */}
        <div id="protocol">
          <OperatingProtocol />
        </div>

        {/* AEO / GEO Paradigm Shift */}
        <div id="aeo-shift">
          <AeoExplanationSection />
        </div>

        {/* Selected Case Studies */}
        <PortfolioShowcase />

        {/* Technology Stack Matrix */}
        <div id="tech-stack">
          <TechnologyStackMatrix />
        </div>

        {/* Interactive Scope & Capability Configurator (Zero Pricing) */}
        <ProjectScopeConfigurator
          onProposalSubmit={handleProposalSubmit}
        />

        {/* Contractual SLA Accountability */}
        <TrustAndGuarantee />

        {/* Closing Callout */}
        <section className="py-24 px-5 sm:px-8 max-w-4xl mx-auto text-center border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight mb-4">
            Build your unfair technological advantage.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8 font-normal leading-relaxed">
            Skip traditional agency delays. Partner with senior systems architects and deploy in under 21 days.
          </p>
          <button
            onClick={() => handleOpenConsult()}
            className="px-7 py-3.5 rounded-lg bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition shadow-sm inline-flex items-center gap-2"
          >
            <span>Initiate Engineering Sprint</span>
          </button>
        </section>

        <Footer onOpenConsult={() => handleOpenConsult()} />
      </div>

      <ConsultationDrawer
        isOpen={isConsultOpen}
        onClose={handleCloseConsult}
        preselectedService={consultPreselectedService}
      />
    </div>
  );
}
