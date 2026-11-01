import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { X, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
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
    <section id="portfolio" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
            <span>PRODUCTION DEPLOYMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display mb-3">
            Selected case studies.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Verifiable production metrics across engineering velocity, autonomous workflows, and scaled distribution.
          </p>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-[22px] bg-[#070b16] border border-white/[0.10] shadow-sm">
          <div>
            <div className="text-2xl font-bold text-white font-display">6+ Deployments</div>
            <div className="text-xs text-neutral-400 font-medium">Production Validated</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white font-display text-[#00C8FF]">100%</div>
            <div className="text-xs text-neutral-400 font-medium">Sprint SLA Record</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs with Apple Segmented Pill Style */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterOptions.map((f, i) => (
          <button
            key={i}
            onClick={() => {
              sound.playClick();
              setSelectedFilter(f);
            }}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedFilter === f
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white bg-[#070b16] border border-white/[0.08]'
            }`}
          >
            {f === 'All' ? 'All Deployments' : f.split(' ')[0] + ' ' + (f.split(' ')[1] || '')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => openProjectModal(proj)}
            className="group cursor-pointer rounded-[26px] bg-[#070b16] border border-white/[0.08] hover:border-white/[0.20] p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          >
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-5 bg-neutral-900">
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                    {proj.categoryTag}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1.5 font-display tracking-tight">
                {proj.title}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-5">
                {proj.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-white">
                {proj.metrics[0].label}: <span className="text-[#00C8FF]">{proj.metrics[0].value}</span>
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1 group-hover:text-white transition">
                <span>View Architecture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Drawer */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-[#070b16] border border-white/[0.12] rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="text-xs font-mono text-neutral-400 mb-1">
                {activeModalProject.categoryTag} — {activeModalProject.client}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2 tracking-tight">
                {activeModalProject.title}
              </h3>
              <p className="text-sm text-neutral-300">
                {activeModalProject.tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {activeModalProject.metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-black/50 border border-white/[0.08]">
                  <div className="text-[11px] text-neutral-400">{m.label}</div>
                  <div className="text-lg font-bold text-white font-display mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08]">
                <div className="font-semibold text-white mb-1.5">The Challenge</div>
                <p className="text-neutral-300 leading-relaxed">{activeModalProject.overview}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08]">
                <div className="font-semibold text-white mb-1.5">The Architecture</div>
                <p className="text-neutral-300 leading-relaxed">{activeModalProject.solution}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] mb-6">
              <p className="text-xs sm:text-sm text-neutral-200 italic mb-2 leading-relaxed">
                "{activeModalProject.testimonial.quote}"
              </p>
              <div className="text-xs text-neutral-400 font-medium">
                {activeModalProject.testimonial.author} — {activeModalProject.testimonial.role}, {activeModalProject.testimonial.company}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500 font-mono">Stack:</span>
              {activeModalProject.techStack.map((tech, tIdx) => (
                <span key={tIdx} className="px-3 py-1 rounded-full bg-black/60 text-[11px] font-mono text-neutral-300 border border-white/[0.08]">
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
