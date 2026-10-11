import React, { useState } from 'react';
import {
  Landmark,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Laptop,
  Briefcase,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '../data/mockData';
import { PageId } from '../types';

interface SolutionsSectionProps {
  onNavigate: (page: PageId, industryId?: string) => void;
}

const ICON_MAP = {
  Landmark,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Laptop,
  Briefcase,
  Rocket,
};

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onNavigate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('finance');

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Tailored Industry Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            Engineered for the complexities of your industry.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Whether navigating strict financial auditability or scaling petabyte-scale healthcare genomics, DotRepo Corp. provides purpose-built workflows and regulatory configurations for your sector.
          </p>
        </div>

        {/* 8 Industry Solution Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRY_SOLUTIONS.map((item) => {
            const Icon = ICON_MAP[item.iconName as keyof typeof ICON_MAP] || Laptop;
            const isSelected = selectedIndustry === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedIndustry(item.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-neutral-50/70 border-neutral-200/90 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {item.impactMetric.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/70 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 truncate">
                    {item.productsUsed[0]}
                  </span>
                  <span className="text-blue-600 font-semibold">View →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Depth Feature Spotlight for Selected Industry */}
        {(() => {
          const current = INDUSTRY_SOLUTIONS.find((s) => s.id === selectedIndustry) || INDUSTRY_SOLUTIONS[0];
          const CurrentIcon = ICON_MAP[current.iconName as keyof typeof ICON_MAP] || Laptop;

          return (
            <div className="mt-8 p-6 md:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <CurrentIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-neutral-900">
                    {current.name} Reference Architecture
                  </span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {current.impactMetric}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-neutral-950">
                  {current.headline}
                </h4>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  {current.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 font-bold" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('solutions', current.id)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <span>Explore {current.name} Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
