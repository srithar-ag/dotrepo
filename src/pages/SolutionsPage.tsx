import React, { useState, useEffect } from 'react';
import { INDUSTRY_SOLUTIONS } from '../data/mockData';
import { PageId } from '../types';
import {
  Landmark,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Laptop,
  Briefcase,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface SolutionsPageProps {
  initialIndustryId?: string;
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
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

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  initialIndustryId,
  onNavigate,
  onOpenContactModal,
}) => {
  const [selectedId, setSelectedId] = useState<string>('finance');

  useEffect(() => {
    if (initialIndustryId) {
      setSelectedId(initialIndustryId);
    }
  }, [initialIndustryId]);

  const currentSolution =
    INDUSTRY_SOLUTIONS.find((s) => s.id === selectedId) || INDUSTRY_SOLUTIONS[0];

  const CurrentIcon =
    ICON_MAP[currentSolution.iconName as keyof typeof ICON_MAP] || Landmark;

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Enterprise Solutions
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">8 Regulated & Commercial Sectors</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Engineered for the complexities of your industry.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Whether navigating strict financial auditability or scaling petabyte-scale healthcare genomics, DotRepo Corp. provides purpose-built workflows and regulatory configurations for your sector.
          </p>
        </div>

        {/* 2-Column Solutions Explorer */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block mb-2 px-1">
              Select Sector
            </span>
            {INDUSTRY_SOLUTIONS.map((sol) => {
              const Icon = ICON_MAP[sol.iconName as keyof typeof ICON_MAP] || Laptop;
              const isSelected = sol.id === selectedId;

              return (
                <button
                  key={sol.id}
                  onClick={() => setSelectedId(sol.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer shadow-xs ${
                    isSelected
                      ? 'bg-white border-blue-500 text-neutral-950 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-white/80 border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-600 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{sol.name}</span>
                      <span className="text-[11px] text-neutral-500">{sol.impactMetric}</span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-blue-600 translate-x-0.5' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Blueprint Card (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-950">{currentSolution.name}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-mono">
                    Impact Target: {currentSolution.impactMetric}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenContactModal(`Solution Briefing: ${currentSolution.name}`)}
                className="px-5 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              >
                Schedule Solution Briefing
              </button>
            </div>

            {/* Headline and Narrative */}
            <div>
              <h4 className="text-lg font-bold text-neutral-950 leading-snug">
                {currentSolution.headline}
              </h4>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {currentSolution.description}
              </p>
            </div>

            {/* Core Architectural Benefits */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                Measurable Business & Technical Outcomes
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSolution.benefits.map((b) => (
                  <div
                    key={b}
                    className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-700 leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Used in this Solution */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                Interconnected Technology Stack
              </h5>
              <div className="flex flex-wrap gap-2">
                {currentSolution.productsUsed.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Industry Regulatory Compliance Pre-Configured</span>
              </div>
              <span className="font-mono text-neutral-800 font-semibold">Ready for Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
