import React, { useState } from 'react';
import { REGIONS_CONFIG, RegionData } from '../constants';
import { Globe2, Server, Radio, ArrowUpRight } from 'lucide-react';

export const CloudRegionMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS_CONFIG[1]); // Default Bangalore
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [filterType, setFilterType] = useState<'All' | 'Core' | 'Edge'>('All');

  const filteredRegions = REGIONS_CONFIG.filter((r) => {
    if (filterType === 'Core') return r.type === 'Core Data Center';
    if (filterType === 'Edge') return r.type === 'Edge Point of Presence';
    return true;
  });

  const activeNode = hoveredRegion || selectedRegion;

  return (
    <section id="regions" className="bg-[#0A0A0A] text-white py-20 lg:py-28 border-b border-[#1A1A1A]">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#22C55E] font-mono font-semibold mb-2">
              GLOBAL EDGE & CORE TOPOLOGY
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Sovereign core regions. 180+ global PoPs.
            </h2>
            <p className="mt-3 text-base text-neutral-400 max-w-2xl">
              Tier-4 data centers anchored in India's technology hubs, connected by private optical dark-fiber rings and 180+ Anycast edge PoPs worldwide.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 border border-[#1A1A1A] p-1 bg-[#000000] self-start md:self-auto rounded-[2px]">
            {(['All', 'Core', 'Edge'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-colors ${
                  filterType === type
                    ? 'bg-[#22C55E] text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {type === 'All' ? 'ALL REGIONS (12)' : type === 'Core' ? 'CORE HUBS (7)' : 'EDGE PoPs (5)'}
              </button>
            ))}
          </div>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Interactive SVG Map Canvas */}
          <div className="lg:col-span-8 bg-[#000000] border border-[#1A1A1A] rounded-[2px] p-6 sm:p-8 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Map Top Status Bar */}
            <div className="flex items-center justify-between z-10 text-xs font-mono border-b border-[#1A1A1A] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-neutral-300">ANYCAST GLOBAL BGP BACKBONE</span>
              </div>
              <span className="text-neutral-500 hidden sm:inline">PROJECTION: MERCATOR 1:1</span>
            </div>

            {/* SVG Dot Map Representation */}
            <div className="relative w-full aspect-[16/9] flex items-center justify-center my-4">
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.05))' }}
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#141414" strokeWidth="0.8" />
                  </pattern>
                  <radialGradient id="mapGlow" cx="68%" cy="54%" r="40%">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="1000" height="500" fill="#000000" />
                <rect width="1000" height="500" fill="url(#mapGrid)" />
                <rect width="1000" height="500" fill="url(#mapGlow)" />

                {/* Continental Outlines (Abstract Tech Vector World Shapes) */}
                <g fill="none" stroke="#262626" strokeWidth="1" strokeDasharray="3 3">
                  {/* North America */}
                  <path d="M 120 120 L 220 90 L 300 130 L 290 200 L 230 250 L 190 230 L 150 170 Z" />
                  {/* South America */}
                  <path d="M 270 280 L 340 310 L 320 420 L 280 430 L 250 340 Z" />
                  {/* Europe */}
                  <path d="M 470 110 L 530 110 L 560 170 L 490 210 L 450 160 Z" />
                  {/* Africa */}
                  <path d="M 480 230 L 560 230 L 580 340 L 520 420 L 470 330 Z" />
                  {/* Asia / India */}
                  <path d="M 590 120 L 780 120 L 850 200 L 820 280 L 730 350 L 650 330 L 610 240 Z" />
                  {/* Australia */}
                  <path d="M 780 370 L 870 360 L 860 430 L 790 430 Z" />
                </g>

                {/* Inter-DC Fiber Backbones (Connecting core hubs: Mumbai, Bangalore, Frankfurt, Singapore, Virginia) */}
                <g fill="none" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.4">
                  {/* Mumbai <-> Bangalore */}
                  <line x1="672" y1="267" x2="684" y2="284" strokeWidth="1.5" strokeOpacity="0.9" />
                  {/* Bangalore <-> Hyderabad */}
                  <line x1="684" y1="284" x2="686" y2="273" strokeWidth="1.5" strokeOpacity="0.9" />
                  {/* Mumbai <-> Hyderabad */}
                  <line x1="672" y1="267" x2="686" y2="273" strokeWidth="1.5" strokeOpacity="0.9" />
                  {/* Bangalore <-> Singapore */}
                  <path d="M 684 284 Q 720 300 758 306" strokeDasharray="4 2" />
                  {/* Mumbai <-> Dubai */}
                  <path d="M 672 267 Q 638 258 605 247" strokeDasharray="4 2" />
                  {/* Dubai <-> Frankfurt */}
                  <path d="M 605 247 Q 556 210 508 177" strokeDasharray="4 2" />
                  {/* Frankfurt <-> London */}
                  <line x1="508" y1="177" x2="476" y2="171" strokeDasharray="4 2" />
                  {/* London <-> Virginia (Transatlantic cable) */}
                  <path d="M 476 171 Q 370 185 265 204" strokeDasharray="4 2" />
                  {/* Singapore <-> Tokyo */}
                  <path d="M 758 306 Q 811 262 864 219" strokeDasharray="4 2" />
                </g>

                {/* Region Nodes */}
                {filteredRegions.map((region) => {
                  const cx = (region.coordinates.x / 100) * 1000;
                  const cy = (region.coordinates.y / 100) * 500;
                  const isHovered = hoveredRegion?.id === region.id;
                  const isSelected = selectedRegion.id === region.id;
                  const isCore = region.type === 'Core Data Center';

                  return (
                    <g
                      key={region.id}
                      className="cursor-pointer transition-transform duration-150"
                      onMouseEnter={() => setHoveredRegion(region)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => setSelectedRegion(region)}
                    >
                      {/* Outer pulse circle for core */}
                      {isCore && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected || isHovered ? 14 : 9}
                          fill="none"
                          stroke="#22C55E"
                          strokeWidth="1"
                          strokeOpacity={isSelected || isHovered ? 0.8 : 0.3}
                        />
                      )}

                      {/* Main node pin */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isCore ? 5 : 3.5}
                        fill={isCore ? '#22C55E' : '#FFFFFF'}
                        stroke="#000000"
                        strokeWidth="1.5"
                      />

                      {/* Label if hovered or core selected */}
                      {(isHovered || isSelected) && (
                        <g>
                          <rect
                            x={cx + 8}
                            y={cy - 12}
                            width="90"
                            height="20"
                            fill="#0A0A0A"
                            stroke="#22C55E"
                            strokeWidth="1"
                            rx="1"
                          />
                          <text
                            x={cx + 12}
                            y={cy + 2}
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {region.name.split(' ')[0]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Node Floating Tooltip Card */}
            <div className="z-10 bg-[#0A0A0A]/95 border border-[#1A1A1A] p-4 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A1A1A] border border-[#262626] flex items-center justify-center rounded-[2px]">
                  {activeNode.type === 'Core Data Center' ? (
                    <Server className="w-5 h-5 text-[#22C55E]" />
                  ) : (
                    <Radio className="w-5 h-5 text-neutral-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{activeNode.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1A1A1A] text-neutral-300 rounded-[2px] border border-[#262626]">
                      {activeNode.country}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">{activeNode.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block text-[10px]">INTERNAL FIBER RTT</span>
                  <span className="text-[#22C55E] font-bold text-sm">{activeNode.latency}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">NODE AVAILABILITY</span>
                  <span className="text-white font-bold text-sm">{activeNode.status} (99.99%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Region Directory List */}
          <div className="lg:col-span-4 bg-[#000000] border border-[#1A1A1A] rounded-[2px] p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                GLOBAL REGION DIRECTORY
              </span>
              <span className="text-xs font-mono text-[#22C55E]">{filteredRegions.length} ACTIVE</span>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredRegions.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`w-full text-left p-3 rounded-[2px] border transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? 'border-[#22C55E] bg-[#1A1A1A] text-white'
                        : 'border-[#1A1A1A] hover:border-[#333333] bg-[#0A0A0A] text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            region.type === 'Core Data Center' ? 'bg-[#22C55E]' : 'bg-neutral-400'
                          }`}
                        />
                        <span className="font-semibold text-white">{region.name}</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 font-mono block mt-0.5 ml-3.5">
                        {region.type}
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[#22C55E] text-xs font-semibold">{region.latency}</span>
                      <span className="text-[10px] text-neutral-500 block">p99 ping</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#1A1A1A]">
              <a
                href="#next-steps"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#1A1A1A] hover:bg-[#262626] text-white text-xs font-mono rounded-[2px] transition-colors border border-[#333333]"
              >
                <span>REQUEST PRIVATE DIRECT CONNECT PEERING</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
