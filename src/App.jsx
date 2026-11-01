import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientBar from './components/ClientBar';
import NebulaCanvas from './components/NebulaCanvas';
import AboutWhoWeAre from './components/AboutWhoWeAre';
import ImpactMetrics from './components/ImpactMetrics';
import ServicesShowcase from './components/ServicesShowcase';
import AgencyComparisonSection from './components/AgencyComparisonSection';
import OperatingProtocol from './components/OperatingProtocol';
import AeoExplanationSection from './components/AeoExplanationSection';
import PortfolioShowcase from './components/PortfolioShowcase';
import TechnologyStackMatrix from './components/TechnologyStackMatrix';
import FaqSection from './components/FaqSection';
import ProjectScopeConfigurator from './components/ProjectScopeConfigurator';
import TrustAndGuarantee from './components/TrustAndGuarantee';
import ConsultationDrawer from './components/ConsultationDrawer';
import Footer from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [consultPreselectedService, setConsultPreselectedService] = useState('');
  const [activeDisciplineIndex, setActiveDisciplineIndex] = useState(null);
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

  const handleSelectDiscipline = (index) => {
    setActiveDisciplineIndex(index);
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProposalSubmit = (proposalData) => {
    console.log('Project Scope captured:', proposalData);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#030712] text-slate-100 antialiased selection:bg-white/20 selection:text-white">
      {/* Subtle Living Canvas with Interactive Gravity */}
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
          onSelectDiscipline={handleSelectDiscipline}
        />

        {/* Client Infrastructure Reference Bar */}
        <ClientBar />

        {/* Section 1: Discover Who We Are & Capabilities Grid */}
        <div id="about">
          <AboutWhoWeAre onOpenConsult={() => handleOpenConsult()} />
        </div>

        {/* Section 2: Production Impact & Telemetry Rings */}
        <div id="impact">
          <ImpactMetrics />
        </div>

        {/* Section 3: Core Disciplines with Live Interactive Simulators */}
        <ServicesShowcase
          onSelectServiceForConsult={(serviceName) => handleOpenConsult(serviceName)}
          activeDisciplineIndex={activeDisciplineIndex}
        />

        {/* Section 4: The Paradigm Shift vs. Traditional Agencies */}
        <div id="comparison">
          <AgencyComparisonSection />
        </div>

        {/* Section 5: 21-Day Execution Protocol */}
        <div id="protocol">
          <OperatingProtocol />
        </div>

        {/* Section 6: AEO / GEO Paradigm Shift */}
        <div id="aeo-shift">
          <AeoExplanationSection />
        </div>

        {/* Section 7: Selected Case Studies */}
        <PortfolioShowcase />

        {/* Section 8: Technology Stack Matrix */}
        <div id="tech-stack">
          <TechnologyStackMatrix />
        </div>

        {/* Section 9: Frequently Asked Questions */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* Section 10: Interactive Scope & Capability Configurator (Zero Pricing) */}
        <ProjectScopeConfigurator
          onProposalSubmit={handleProposalSubmit}
        />

        {/* Section 11: Contractual SLA Accountability */}
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
