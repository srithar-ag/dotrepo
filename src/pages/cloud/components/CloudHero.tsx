import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { HERO_TABS, CloudTabItem } from '../constants';

interface CloudHeroProps {
  onCtaClick?: () => void;
}

export const CloudHero: React.FC<CloudHeroProps> = ({ onCtaClick }) => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Strictly sequential auto-advance: 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 01 -> 02 ...
  // Every tab stays active for 6000ms while the green progress bar fills smoothly.
  useEffect(() => {
    if (isPaused) return;

    const DURATION = 6000;
    const INTERVAL = 30; // 30ms step for fluid continuous motion
    const step = (INTERVAL / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          // Advance strictly to the next tab in sequential order
          setActiveTabIdx((curIdx) => (curIdx + 1) % HERO_TABS.length);
          return 0;
        }
        return prev + step;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeTab: CloudTabItem = HERO_TABS[activeTabIdx];

  const handleSelectTab = (idx: number) => {
    setActiveTabIdx(idx);
    setProgress(0);
  };

  return (
    <section
      className="relative bg-[#000000] text-white border-b border-[#1A1A1A] overflow-hidden"
      aria-label="Cloud Hero Section"
    >
      {/* Precision Structural Grid Lines (Hairline Enterprise Grid across entire width) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Main Hero Split View - Widescreen Edge-to-Edge Adaptive Layout */}
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-10 sm:pt-14 lg:pt-18 pb-10 sm:pb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[480px] lg:min-h-[540px]">
          {/* Left Column: Left-Aligned Content, Small Caps Label, Huge Headline, Subtext, Green CTA */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
            {/* Small caps label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-[1px] bg-[#22C55E]" aria-hidden="true" />
              <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                {activeTab.category}
              </span>
            </div>

            {/* Very large headline (56-80px desktop, tight line-height 1.05-1.1, 700 weight) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-bold tracking-tight text-white leading-[1.08] max-w-3xl">
              {activeTab.headline}
            </h1>

            {/* 18-20px body, regular weight, grey on dark */}
            <p className="mt-6 text-base sm:text-lg md:text-[20px] text-neutral-300 font-normal leading-relaxed max-w-2xl">
              {activeTab.subtext}
            </p>

            {/* Hardware Spec Monospace Chip */}
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0F0F0F] border border-[#262626] rounded-[2px] font-mono text-xs text-neutral-300">
              <span className="text-neutral-500">{activeTab.specLabel}:</span>
              <span className="text-white font-semibold">{activeTab.specValue}</span>
            </div>

            {/* Primary Action Button: Solid Green with Black Text, 2px radius max */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={activeTab.ctaLink}
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#22C55E]"
              >
                <span>{activeTab.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[2px] border border-neutral-700 hover:border-white text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Inspect Architecture</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Fidelity SVG Diagram corresponding to Active Tab, scaled to fit container completely */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative w-full h-[380px] sm:h-[460px] md:h-[500px] lg:h-[540px]">
            <div className="w-full h-full p-4 sm:p-6 lg:p-8 rounded-[2px] bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Corner brackets */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-neutral-500 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-neutral-500 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-neutral-500 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-neutral-500 pointer-events-none" />

              {/* Status Header */}
              <div className="absolute top-3.5 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-[#1A1A1A] pb-2 z-10">
                <span className="text-[#22C55E] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-ping" />
                  LIVE FABRIC DIAGRAM
                </span>
                <span>SYSTEM ID: {activeTab.id.toUpperCase()}-01</span>
              </div>

              {/* DYNAMIC SVG BASED ON ACTIVE TAB - Edge-to-Edge Proportional Scale */}
              <div className="w-full h-full flex items-center justify-center pt-6">
                {activeTab.id === 'compute' && <ComputeSvgVisual />}
                {activeTab.id === 'database' && <DatabaseSvgVisual />}
                {activeTab.id === 'storage' && <StorageSvgVisual />}
                {activeTab.id === 'gateways' && <GatewaysSvgVisual />}
                {activeTab.id === 'ai-infra' && <AiInfraSvgVisual />}
                {activeTab.id === 'security' && <SecuritySvgVisual />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 6-Item Tab Rail (Progress Bar, 6s Duration, Sequential 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 01 ...) */}
      <div
        className="border-t border-[#1F1F1F] bg-[#050505] w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="tablist"
        aria-label="Cloud Architecture Categories"
      >
        <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-[#1A1A1A]">
            {HERO_TABS.map((tab, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => handleSelectTab(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectTab(idx);
                    }
                  }}
                  className={`text-left p-3.5 sm:p-4.5 lg:p-5 transition-colors relative cursor-pointer focus:outline-none focus:bg-[#111111] flex flex-col justify-between min-h-[88px] ${
                    isActive ? 'bg-[#0E0E0E]' : 'hover:bg-[#0A0A0A]'
                  }`}
                >
                  {/* Top Progress Bar on Active Tab */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A1A1A]">
                    {isActive && (
                      <div
                        className="h-full bg-[#22C55E]"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                          transition: isPaused ? 'none' : 'width 30ms linear',
                        }}
                      />
                    )}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1 font-semibold">
                    0{idx + 1} // {tab.category.split(' ')[0]}
                  </span>
                  <div className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                    {tab.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/** High-Density Server Rack Compute Visual */
const ComputeSvgVisual: React.FC = () => (
  <svg viewBox="0 0 500 380" className="w-full h-full max-w-[540px] max-h-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="25" width="420" height="330" rx="3" stroke="#2B2B2B" strokeWidth="2" fill="#0D0D0D" />
    {/* Server Blades Stack */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i} transform={`translate(55, ${45 + i * 50})`}>
        <rect x="0" y="0" width="390" height="40" rx="2" fill="#141414" stroke="#2B2B2B" strokeWidth="1.2" />
        {/* Drive bays */}
        {[0, 1, 2, 3, 4].map((d) => (
          <rect key={d} x={14 + d * 26} y="8" width="20" height="24" rx="1.5" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
        ))}
        {/* LED Activity Indicators */}
        <circle cx="165" cy="20" r="3.5" fill="#22C55E" />
        <circle cx="180" cy="20" r="3" fill="#22C55E" opacity="0.6" />
        <circle cx="193" cy="20" r="3" fill="#333" />
        {/* CPU Heat Sink Fins */}
        <line x1="220" y1="12" x2="315" y2="12" stroke="#2E2E2E" strokeWidth="2" />
        <line x1="220" y1="20" x2="315" y2="20" stroke="#2E2E2E" strokeWidth="2" />
        <line x1="220" y1="28" x2="315" y2="28" stroke="#2E2E2E" strokeWidth="2" />
        {/* Power & NIC Port */}
        <rect x="345" y="10" width="28" height="20" rx="1.5" fill="#0A0A0A" stroke="#22C55E" strokeWidth="1.5" />
      </g>
    ))}
    {/* Central Bus Backbone */}
    <line x1="250" y1="10" x2="250" y2="25" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="3 3" />
    <line x1="250" y1="355" x2="250" y2="370" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="3 3" />
  </svg>
);

/** Multi-Region Distributed SQL Ring Database Visual */
const DatabaseSvgVisual: React.FC = () => (
  <svg viewBox="0 0 500 380" className="w-full h-full max-w-[540px] max-h-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Consensus Ring */}
    <circle cx="250" cy="190" r="130" stroke="#2B2B2B" strokeWidth="2" strokeDasharray="5 5" />
    <circle cx="250" cy="190" r="70" stroke="#1F1F1F" strokeWidth="1.2" />
    {/* Central Raft Leader Node */}
    <circle cx="250" cy="190" r="32" fill="#141414" stroke="#22C55E" strokeWidth="2.5" />
    <text x="250" y="195" fill="#22C55E" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
      LEADER
    </text>
    {/* 4 Shard Replica Nodes on Ring */}
    {[
      { x: 250, y: 60, name: 'BOM-01 CORE' },
      { x: 380, y: 190, name: 'BLR-01 HQ' },
      { x: 250, y: 320, name: 'HYD-01 CORE' },
      { x: 120, y: 190, name: 'SIN-01 ASIA' },
    ].map((node, i) => (
      <g key={i}>
        <line x1="250" y1="190" x2={node.x} y2={node.y} stroke="#22C55E" strokeWidth="1.5" opacity="0.8" />
        <rect x={node.x - 42} y={node.y - 18} width="84" height="36" rx="2" fill="#111111" stroke="#383838" strokeWidth="1.5" />
        <text x={node.x} y={node.y + 4} fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          {node.name}
        </text>
      </g>
    ))}
    {/* Active Replication Arcs */}
    <path d="M 150 190 A 100 100 0 0 1 250 90" stroke="#22C55E" strokeWidth="2" fill="none" />
    <circle cx="195" cy="120" r="4" fill="#22C55E" />
  </svg>
);

/** Storage Array Cylinder Visual */
const StorageSvgVisual: React.FC = () => (
  <svg viewBox="0 0 500 380" className="w-full h-full max-w-[540px] max-h-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 1, 2].map((col) => (
      <g key={col} transform={`translate(${100 + col * 115}, 45)`}>
        {/* 4 Stacked Storage Platters per Column */}
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0, ${row * 56})`}>
            {/* Cylinder Body */}
            <path d="M 0 16 L 0 38 A 40 14 0 0 0 80 38 L 80 16 Z" fill="#141414" stroke="#2B2B2B" strokeWidth="1.5" />
            {/* Cylinder Top Ellipse */}
            <ellipse cx="40" cy="16" rx="40" ry="12" fill="#1E1E1E" stroke="#383838" strokeWidth="1.2" />
            <circle cx="40" cy="16" r="6" fill="#22C55E" opacity={row === 0 ? 0.95 : 0.4} />
          </g>
        ))}
      </g>
    ))}
    {/* Bottom High-Speed Parity Bus */}
    <rect x="75" y="300" width="350" height="28" rx="2" fill="#0F0F0F" stroke="#22C55E" strokeWidth="1.5" />
    <text x="250" y="318" fill="#22C55E" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
      11 NINES DURABILITY // REED-SOLOMON 8+4 ERASURE CODING
    </text>
  </svg>
);

/** Rotating PoP Network Arc Visual */
const GatewaysSvgVisual: React.FC = () => (
  <svg viewBox="0 0 500 380" className="w-full h-full max-w-[540px] max-h-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Latitude / Longitude Orthographic Grid */}
    <circle cx="250" cy="190" r="140" stroke="#222222" strokeWidth="1.2" />
    <ellipse cx="250" cy="190" rx="140" ry="65" stroke="#2B2B2B" strokeWidth="1.2" />
    <ellipse cx="250" cy="190" rx="140" ry="110" stroke="#1F1F1F" strokeWidth="1.2" />
    <line x1="110" y1="190" x2="390" y2="190" stroke="#2B2B2B" strokeWidth="1.2" />
    <line x1="250" y1="50" x2="250" y2="330" stroke="#2B2B2B" strokeWidth="1.2" />

    {/* PoP Nodes with Pulse Arcs */}
    {[
      { x: 235, y: 185, label: 'MUMBAI' },
      { x: 265, y: 210, label: 'BLR' },
      { x: 310, y: 220, label: 'SINGAPORE' },
      { x: 200, y: 130, label: 'FRANKFURT' },
      { x: 360, y: 150, label: 'TOKYO' },
      { x: 165, y: 160, label: 'VIRGINIA' },
    ].map((pop, i) => (
      <g key={i}>
        <circle cx={pop.x} cy={pop.y} r="5" fill="#22C55E" />
        <circle cx={pop.x} cy={pop.y} r="10" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
      </g>
    ))}
    {/* Connecting Optical Beams */}
    <path d="M 235 185 Q 270 150 310 220" stroke="#22C55E" strokeWidth="1.6" fill="none" />
    <path d="M 235 185 Q 210 130 200 130" stroke="#22C55E" strokeWidth="1.6" fill="none" />
    <path d="M 200 130 Q 180 145 165 160" stroke="#22C55E" strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
    <text x="250" y="355" fill="#CCCCCC" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
      180+ ANYCAST INGRESS POINTS OF PRESENCE // WIRE-SPEED ROUTING
    </text>
  </svg>
);

/** AI Infrastructure Systolic Matrix Visual */
const AiInfraSvgVisual: React.FC = () => (
  <svg viewBox="0 0 500 380" className="w-full h-full max-w-[540px] max-h-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Systolic Tensor Array Grid (8x6) */}
    <g transform="translate(65, 45)">
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 7 }).map((_, c) => (
          <g key={`${r}-${c}`} transform={`translate(${c * 54}, ${r * 48})`}>
            <rect
              x="0"
              y="0"
              width="42"
              height="34"
              rx="2"
              fill={r === 2 && c === 3 ? '#22C55E' : '#141414'}
              stroke={r === 2 && c === 3 ? '#16A34A' : '#2A2A2A'}
              strokeWidth="1.2"
            />
            <circle
              cx="21"
              cy="17"
              r="3.5"
              fill={r === 2 && c === 3 ? '#000000' : '#22C55E'}
              opacity={r === 2 && c === 3 ? 1 : (r + c) % 2 === 0 ? 0.9 : 0.35}
            />
          </g>
        ))
      )}
    </g>
    {/* Low Latency Optical Bus Interconnects */}
    <line x1="55" y1="310" x2="445" y2="310" stroke="#22C55E" strokeWidth="2.5" />
    <text x="250" y="340" fill="#22C55E" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
      3.2 TBPS NVLINK FABRIC // ZERO-JITTER CLUSTERS
    </text>
  </svg>
);

/** Security Lattice Visual */
const SecuritySvgVisual: React.FC = () => (
  <svg viewBox="0 0 500 380" className="w-full h-full max-w-[540px] max-h-[420px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagonal Shield Lattice */}
    <g transform="translate(135, 50)">
      {/* Central Shield */}
      <path
        d="M 115 20 L 195 55 L 195 150 C 195 210 115 245 115 245 C 115 245 35 210 35 150 L 35 55 Z"
        fill="#0D0D0D"
        stroke="#22C55E"
        strokeWidth="2.5"
      />
      {/* Inner Lock Core */}
      <rect x="97" y="130" width="36" height="28" rx="2" fill="#22C55E" />
      <path d="M 103 130 L 103 115 C 103 108 127 108 127 115 L 127 130" stroke="#22C55E" strokeWidth="3" fill="none" />
      <circle cx="115" cy="142" r="3" fill="#000000" />
      {/* Surrounding Concentric Nodes */}
      <circle cx="115" cy="135" r="85" stroke="#2B2B2B" strokeWidth="1.2" strokeDasharray="4 4" />
      <circle cx="115" cy="135" r="115" stroke="#1F1F1F" strokeWidth="1.2" />
    </g>
    <text x="250" y="340" fill="#CCCCCC" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
      HARDWARE ATTESTATION // AES-256-GCM CONFIDENTIAL ENCLAVES
    </text>
  </svg>
);
