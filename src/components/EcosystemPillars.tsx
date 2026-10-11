import React, { useState } from 'react';
import { Cloud, Layers, Database, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ECOSYSTEM_PILLARS } from '../data/mockData';
import { PageId } from '../types';

interface EcosystemPillarsProps {
  onNavigate: (page: PageId) => void;
}

const ICON_MAP = {
  Cloud,
  Layers,
  Database,
  Sparkles,
};

export const EcosystemPillars: React.FC<EcosystemPillarsProps> = ({ onNavigate }) => {
  const [activePillar, setActivePillar] = useState(0);

  const targetPages: PageId[] = ['cloud', 'products', 'products', 'ai'];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-neutral-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Unified Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            One technology ecosystem. Endless possibilities.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Instead of stitching together dozens of disconnected vendor silos, DotRepo Corp. delivers an integrated platform where cloud infrastructure, enterprise software, data storage, and intelligent AI communicate over a unified schema.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_PILLARS.map((pillar, idx) => {
            const Icon = ICON_MAP[pillar.icon as keyof typeof ICON_MAP] || Layers;
            const isSelected = activePillar === idx;

            return (
              <div
                key={pillar.title}
                onMouseEnter={() => setActivePillar(idx)}
                onClick={() => onNavigate(targetPages[idx])}
                className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20'
                    : 'bg-white border-neutral-200/90 hover:border-neutral-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-700 mt-1">
                    {pillar.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Feature list */}
                  <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 font-bold" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
