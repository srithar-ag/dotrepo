import React, { useState } from 'react';
import { ArrowRight, Check, Cpu, Database, HardDrive, Globe, ShieldCheck, Activity, Terminal, Sparkles } from 'lucide-react';
import { SERVICES_CATALOG, CloudServiceBlock } from '../constants';

const SERVICE_ICONS = {
  compute: Cpu,
  database: Database,
  storage: HardDrive,
  gateways: Globe,
  security: ShieldCheck,
  observability: Activity,
  devtools: Terminal,
  'ai-infra': Sparkles,
};

export const CloudServices: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>('compute');

  const activeService: CloudServiceBlock =
    SERVICES_CATALOG.find((s) => s.id === activeServiceId) || SERVICES_CATALOG[0];

  const Icon = SERVICE_ICONS[activeService.id as keyof typeof SERVICE_ICONS] || Cpu;

  return (
    <section id="services" className="bg-[#FFFFFF] text-neutral-900 py-24 sm:py-32 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#16A34A] font-bold mb-3 block">
            SERVICE CATALOG // 8 CORE TIERS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
            Enterprise cloud services engineered for mission-critical scale.
          </h2>
          <p className="mt-4 text-base sm:text-[19px] text-neutral-700 font-normal leading-relaxed">
            Select an infrastructure service to view architectural capabilities, resource limits, and deployment primitives.
          </p>
        </div>

        {/* 12-Column Grid: Left Vertical Service List (4 cols) + Right Detail Panel (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical List */}
          <div className="lg:col-span-4 flex flex-col space-y-1.5" role="tablist" aria-label="Services List">
            {SERVICES_CATALOG.map((service, idx) => {
              const isSelected = activeServiceId === service.id;
              const ServiceIcon = SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS] || Cpu;

              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`p-3.5 sm:p-4 rounded-[2px] text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'bg-[#F4F4F4] text-neutral-950 font-bold border-l-4 border-[#16A34A] pl-4 shadow-xs'
                      : 'hover:bg-neutral-50 text-neutral-600 hover:text-neutral-950 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ServiceIcon className={`w-4 h-4 ${isSelected ? 'text-[#16A34A]' : 'text-neutral-400'}`} />
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block text-[10px]">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-semibold">{service.name}</span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-[#16A34A] translate-x-1' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel (8 cols) */}
          <div
            id={`service-panel-${activeService.id}`}
            role="tabpanel"
            className="lg:col-span-8 p-6 sm:p-10 bg-[#FAFAFA] border border-neutral-300 rounded-[2px] text-left shadow-xs flex flex-col justify-between min-h-[500px]"
          >
            <div>
              {/* Category & Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-200 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#16A34A] font-bold">
                  {activeService.category}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 uppercase">
                  STATUS: PRODUCTION GA
                </span>
              </div>

              {/* Service Title */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-2.5 rounded-[2px] bg-neutral-950 text-white">
                  <Icon className="w-6 h-6 text-[#22C55E]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                  {activeService.name} Engine
                </h3>
              </div>

              {/* Summary & Description */}
              <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed mb-4">
                {activeService.summary}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-8">
                {activeService.description}
              </p>

              {/* Monospace Spec Chip */}
              <div className="mb-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                  HARDWARE & PROTOCOL CONSTRAINTS
                </span>
                <div className="inline-block p-3 bg-[#EEEEEE] border border-neutral-300 rounded-[2px] font-mono text-xs font-bold text-neutral-900 tracking-wide">
                  {activeService.specChip}
                </div>
              </div>

              {/* 3 Bullet Capabilities */}
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                  CORE PRODUCTION CAPABILITIES
                </span>
                {activeService.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800">
                    <span className="flex items-center justify-center w-4 h-4 rounded-[1px] bg-[#16A34A]/10 text-[#16A34A] shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span className="font-medium leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-neutral-200 mt-8 flex flex-wrap items-center justify-between gap-4">
              <a
                href="#configure"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Configure {activeService.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#developers"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-[#16A34A] transition-colors"
              >
                <span>Explore Developer APIs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
