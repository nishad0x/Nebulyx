import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { X, ArrowUpRight } from 'lucide-react';
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
    <section id="portfolio" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-3">
            Selected case studies.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Verifiable production metrics across engineering, autonomous operations, and scaled distribution.
          </p>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-xl bg-[#090e1f] border border-white/5">
          <div>
            <div className="text-2xl font-bold text-white font-display">6+ Deployments</div>
            <div className="text-xs text-slate-400">Production Validated</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white font-display">100%</div>
            <div className="text-xs text-slate-400">Sprint SLA Record</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterOptions.map((f, i) => (
          <button
            key={i}
            onClick={() => {
              sound.playClick();
              setSelectedFilter(f);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedFilter === f
                ? 'bg-white text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-[#090e1f] border border-white/5'
            }`}
          >
            {f === 'All' ? 'All Work' : f.split(' ')[0] + ' ' + (f.split(' ')[1] || '')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => openProjectModal(proj)}
            className="group cursor-pointer rounded-2xl bg-[#090e1f] border border-white/5 hover:border-white/20 p-5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-900">
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e1f] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-[#030712]/90 backdrop-blur text-[11px] font-mono text-white">
                    {proj.categoryTag}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 font-display">
                {proj.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {proj.tagline}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-white">
                {proj.metrics[0].label}: {proj.metrics[0].value}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-white transition">
                <span>View Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#090e1f] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="text-xs font-mono text-slate-400 mb-1">
                {activeModalProject.categoryTag} — {activeModalProject.client}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">
                {activeModalProject.title}
              </h3>
              <p className="text-sm text-slate-300">
                {activeModalProject.tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {activeModalProject.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#030712] border border-white/5">
                  <div className="text-[11px] text-slate-400">{m.label}</div>
                  <div className="text-lg font-bold text-white font-display mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
                <div className="font-semibold text-white mb-1">The Challenge</div>
                <p className="text-slate-300 leading-relaxed">{activeModalProject.overview}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-white/5">
                <div className="font-semibold text-white mb-1">The Architecture</div>
                <p className="text-slate-300 leading-relaxed">{activeModalProject.solution}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#030712] border border-white/5 mb-6">
              <p className="text-xs sm:text-sm text-slate-200 italic mb-2 leading-relaxed">
                "{activeModalProject.testimonial.quote}"
              </p>
              <div className="text-xs text-slate-400 font-medium">
                {activeModalProject.testimonial.author} — {activeModalProject.testimonial.role}, {activeModalProject.testimonial.company}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">Stack:</span>
              {activeModalProject.techStack.map((tech, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded bg-[#030712] text-[11px] font-mono text-slate-300 border border-white/5">
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
