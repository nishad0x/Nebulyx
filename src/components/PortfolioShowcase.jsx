import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { ExternalLink, TrendingUp, X, CheckCircle, ArrowRight, Sparkles, Building2, Quote } from 'lucide-react';
import { sound } from '../utils/audio';

export default function PortfolioShowcase() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filterOptions = [
    'All',
    'Website building',
    'Platform automation and automated workflows',
    'Social media enhancement and management',
    'AEO & GEO Marketing',
    'Business models dropshipping'
  ];

  const filteredProjects = selectedFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(p => p.category === selectedFilter);

  const openProjectModal = (proj) => {
    sound.playPing(520, 0.1);
    setActiveModalProject(proj);
  };

  const closeModal = () => {
    sound.playClick();
    setActiveModalProject(null);
  };

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Production Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
            Previous <span className="text-gradient-cyan">Triumphs</span> & Case Studies.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Real enterprise data from founders, operators, and growth leaders who trusted Nebulyx to build their unfair technological advantage.
          </p>
        </div>

        {/* Global Track Record Snapshot */}
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <div className="text-2xl font-mono font-extrabold text-white text-gradient-cyan">$65M+</div>
            <div className="text-[11px] text-slate-400">Client Revenue Enabled</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-2xl font-mono font-extrabold text-emerald-400">100%</div>
            <div className="text-[11px] text-slate-400">On-Time Sprint SLA</div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterOptions.map((f, i) => (
          <button
            key={i}
            onClick={() => {
              sound.playClick();
              setSelectedFilter(f);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
              selectedFilter === f
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f === 'All' ? 'All Deployments' : f.split(' ')[0] + ' ' + (f.split(' ')[1] || '')}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => openProjectModal(proj)}
            className="group cursor-pointer rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Image banner with overlay */}
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-900">
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-cyan-300">
                    {proj.categoryTag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {proj.badge}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition mb-1 font-display">
                {proj.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {proj.tagline}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 mb-3">
                {proj.metrics.slice(0, 2).map((m, mIdx) => (
                  <div key={mIdx} className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                    <div className="text-[10px] text-slate-400">{m.label}</div>
                    <div className="text-sm font-mono font-bold text-white">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-cyan-400 pt-1">
                <span>Inspect Technical Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detailed Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {activeModalProject.categoryTag}
                </span>
                <span className="text-xs text-slate-400">{activeModalProject.client}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
                {activeModalProject.title}
              </h3>
              <p className="text-sm text-cyan-300 font-medium">
                {activeModalProject.tagline}
              </p>
            </div>

            {/* Metrics Quartet */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {activeModalProject.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-0.5">{m.label}</div>
                  <div className="text-lg font-mono font-bold text-white text-gradient-cyan">{m.value}</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{m.change}</div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-semibold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  The Challenge
                </div>
                <p className="text-slate-300 leading-relaxed">{activeModalProject.overview}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-semibold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  The Nebulyx Engineering Solution
                </div>
                <p className="text-slate-300 leading-relaxed">{activeModalProject.solution}</p>
              </div>
            </div>

            {/* Quantified Outcomes */}
            <div className="mb-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Verifiable Outcomes:</div>
              <div className="space-y-2">
                {activeModalProject.results.map((res, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 mb-6">
              <Quote className="w-6 h-6 text-indigo-400/50 mb-2" />
              <p className="text-xs sm:text-sm text-slate-200 italic mb-3 leading-relaxed">
                "{activeModalProject.testimonial.quote}"
              </p>
              <div className="text-xs">
                <span className="font-bold text-white">{activeModalProject.testimonial.author}</span>
                <span className="text-slate-400"> — {activeModalProject.testimonial.role}, {activeModalProject.testimonial.company}</span>
              </div>
            </div>

            {/* Tech Stack Used */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Engineered with:</span>
              {activeModalProject.techStack.map((tech, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

