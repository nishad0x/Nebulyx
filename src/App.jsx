import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NebulaCanvas from './components/NebulaCanvas';
import ServicesShowcase from './components/ServicesShowcase';
import AeoExplanationSection from './components/AeoExplanationSection';
import PortfolioShowcase from './components/PortfolioShowcase';
import TechnologyStackMatrix from './components/TechnologyStackMatrix';
import ProjectCostEstimator from './components/ProjectCostEstimator';
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
    console.log('Proposal captured:', proposalData);
    // In production, syncs with backend webhook/API
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-cyan-200">
      {/* Living Interactive Canvas */}
      <NebulaCanvas />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar
          onOpenConsult={() => handleOpenConsult()}
          isSoundOn={isSoundOn}
          onToggleSound={handleToggleSound}
        />

        {/* Hero Section */}
        <Hero
          onOpenConsult={() => handleOpenConsult()}
          onScrollToServices={handleScrollToServices}
        />

        {/* Core Services Section with 5 Interactive Simulators */}
        <ServicesShowcase
          onSelectServiceForConsult={(serviceName) => handleOpenConsult(serviceName)}
        />

        {/* AEO & GEO Marketing Paradigm Shift Section */}
        <div id="aeo-shift">
          <AeoExplanationSection />
        </div>

        {/* Case Studies / Previous Successful Projects Showcase */}
        <PortfolioShowcase />

        {/* Modern Tech Arsenal Matrix */}
        <div id="tech-stack">
          <TechnologyStackMatrix />
        </div>

        {/* Interactive Scope & Cost Estimator */}
        <ProjectCostEstimator
          onProposalSubmit={handleProposalSubmit}
        />

        {/* Zero-Risk SLA & Verification Elimination Matrix */}
        <TrustAndGuarantee />

        {/* Final Conversion Callout Banner */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
          <div className="bg-gradient-to-r from-indigo-900/30 via-slate-900/90 to-cyan-900/30 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-4">
              Ready to Outpace Your Entire Industry?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans leading-relaxed">
              Skip traditional agency delays. Lock in your sprint with Nebulyx and launch an unfair technological moat in under 21 days.
            </p>
            <button
              onClick={() => handleOpenConsult()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>Initialize Engineering Sprint</span>
            </button>
            <div className="mt-4 text-xs font-mono text-slate-400">
              Direct Senior Architect Access • 100% Code Transfer SLA
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer onOpenConsult={() => handleOpenConsult()} />
      </div>

      {/* Consultation Booking & Intake Drawer */}
      <ConsultationDrawer
        isOpen={isConsultOpen}
        onClose={handleCloseConsult}
        preselectedService={consultPreselectedService}
      />
    </div>
  );
}

