import React, { useState } from 'react';
import { ArrowRight, Layers, ChevronDown, Check, Activity, ShieldCheck, Database, HardDrive, Cpu, Globe } from 'lucide-react';
import { ARCHITECTURE_LAYERS, ArchitectureLayer } from '../constants';

const LAYER_ICONS = {
  edge: Globe,
  compute: Cpu,
  database: Database,
  storage: HardDrive,
  observability: Activity,
  security: ShieldCheck,
};

export const CloudLayerDiagram: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('edge');
  const [expandedMobileLayer, setExpandedMobileLayer] = useState<string | null>('edge');

  const activeLayer =
    ARCHITECTURE_LAYERS.find((l) => l.id === activeLayerId) || ARCHITECTURE_LAYERS[0];

  return (
    <section id="how-it-works" className="bg-[#0A0A0A] text-white py-24 sm:py-32 border-b border-[#1A1A1A]">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold block mb-3">
            HOW IT WORKS // UNIFIED STACK
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.08]">
            Full-stack infrastructure built from the silicon up.
          </h2>
          <p className="mt-4 text-base sm:text-[19px] text-neutral-300 font-normal leading-relaxed">
            Every layer of DotRepo Cloud is architected to operate cohesively without intermediary translation layers. Hover or focus any tier below to inspect interconnect specifications.
          </p>
        </div>

        {/* DESKTOP VIEW: Interactive Stacked Layers (Left) + Detail Panel (Right) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Stacked Horizontal Layers (7 cols) */}
          <div className="col-span-6 flex flex-col space-y-3" role="tablist" aria-label="Architecture Layers">
            {ARCHITECTURE_LAYERS.map((layer, idx) => {
              const isSelected = activeLayerId === layer.id;
              const Icon = LAYER_ICONS[layer.id as keyof typeof LAYER_ICONS] || Layers;

              return (
                <div
                  key={layer.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isSelected}
                  aria-controls={`layer-panel-${layer.id}`}
                  onMouseEnter={() => setActiveLayerId(layer.id)}
                  onFocus={() => setActiveLayerId(layer.id)}
                  onClick={() => setActiveLayerId(layer.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLayerId(layer.id);
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-[2px] border transition-all cursor-pointer relative text-left select-none focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                    isSelected
                      ? 'bg-[#141414] border-[#22C55E] shadow-lg'
                      : 'bg-[#0F0F0F] border-[#242424] hover:border-neutral-500 hover:bg-[#121212]'
                  }`}
                >
                  {/* Left Green Accent Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#22C55E]" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-[2px] ${isSelected ? 'bg-[#22C55E] text-black' : 'bg-[#1A1A1A] text-neutral-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                          0{idx + 1} · {layer.code}
                        </span>
                        <h3 className={`text-base font-bold transition-colors ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                          {layer.name}
                        </h3>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[#22C55E] translate-x-1' : 'text-neutral-600'
                      }`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 pl-11 line-clamp-1">
                    {layer.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Detail Panel (6 cols, Sharp Hairline Card) */}
          <div className="col-span-6 bg-[#0F0F0F] border border-[#242424] rounded-[2px] p-8 text-left shadow-2xl relative min-h-[480px] flex flex-col justify-between">
            {/* Top Specification Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1F1F1F] mb-6">
                <span className="text-[11px] font-mono text-[#22C55E] uppercase tracking-wider font-bold">
                  {activeLayer.code}
                </span>
                <span className="text-[11px] font-mono text-neutral-500">SPECIFICATION DISCLOSURE</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeLayer.name} Architecture
              </h3>

              <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-normal">
                {activeLayer.description}
              </p>

              {/* Hardware / Protocol Metrics */}
              <div className="mt-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-3">
                  LAYER BENCHMARKS
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {activeLayer.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 bg-[#151515] border border-[#262626] rounded-[2px]">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block truncate">
                        {m.label}
                      </span>
                      <span className="text-base font-bold text-white font-mono mt-1 block truncate">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrated Components Chips */}
              <div className="mt-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-3">
                  CORE FABRIC SUBSYSTEMS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.components.map((comp, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-[#171717] border border-[#2B2B2B] rounded-[2px]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-6 border-t border-[#1F1F1F] mt-8 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                Interconnect: Dual 100GbE Optical Fabric
              </span>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 text-xs text-[#22C55E] hover:text-[#16A34A] font-bold uppercase tracking-wider font-mono transition-colors"
              >
                <span>View Service Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Interactive Accordion */}
        <div className="lg:hidden space-y-3">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isExpanded = expandedMobileLayer === layer.id;
            const Icon = LAYER_ICONS[layer.id as keyof typeof LAYER_ICONS] || Layers;

            return (
              <div
                key={layer.id}
                className="border border-[#242424] rounded-[2px] bg-[#0F0F0F] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedMobileLayer(isExpanded ? null : layer.id)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-[2px] bg-[#1A1A1A] text-[#22C55E]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        LAYER 0{idx + 1}
                      </span>
                      <div className="text-sm font-bold text-white">{layer.name}</div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      isExpanded ? 'rotate-180 text-[#22C55E]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#1A1A1A] space-y-4 text-left">
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {layer.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {layer.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2 bg-[#141414] border border-[#222] rounded-[2px]">
                          <span className="text-[9px] font-mono text-neutral-500 block truncate">{m.label}</span>
                          <span className="text-xs font-bold text-white font-mono mt-0.5 block truncate">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {layer.components.map((comp, cIdx) => (
                        <span key={cIdx} className="px-2 py-0.5 text-[10px] font-mono text-neutral-300 bg-[#1A1A1A] border border-[#2B2B2B] rounded-[2px]">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
