import React from 'react';
import { GLOBAL_SCALE_STATS } from '../data/mockData';

export const GlobalScale: React.FC = () => {
  // World map coordinates for technology nodes
  const mapNodes = [
    { city: 'San Francisco', x: 180, y: 140, ping: '2ms', status: 'Primary Hub' },
    { city: 'New York', x: 280, y: 135, ping: '3ms', status: 'Primary Hub' },
    { city: 'London', x: 480, y: 110, ping: '4ms', status: 'Regional Gateway' },
    { city: 'Frankfurt', x: 520, y: 125, ping: '3ms', status: 'Data Center' },
    { city: 'Tokyo', x: 840, y: 145, ping: '4ms', status: 'Regional Gateway' },
    { city: 'Singapore', x: 760, y: 220, ping: '5ms', status: 'Primary Hub' },
    { city: 'Sydney', x: 870, y: 290, ping: '7ms', status: 'Data Center' },
    { city: 'São Paulo', x: 340, y: 270, ping: '6ms', status: 'Data Center' },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-neutral-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Global Scale & Reliability
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-600">Multi-Continental Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            Built for businesses everywhere.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            DotRepo Corp. operates a globally distributed topology engineered for sub-millisecond data residency, local compliance routing, and uninterrupted disaster resilience across 50+ countries.
          </p>
        </div>

        {/* Global Stats Grid (Editable placeholder data) */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {GLOBAL_SCALE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-300 transition-colors shadow-xs"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 font-mono tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-neutral-900 mt-2">
                {stat.label}
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                {stat.detail}
              </p>
              <span className="mt-3 inline-block text-[10px] text-neutral-400 font-mono">
                [Configurable metric]
              </span>
            </div>
          ))}
        </div>

        {/* World Map with Connected Technology Nodes */}
        <div className="mt-14 rounded-2xl bg-white border border-neutral-200 p-6 md:p-10 relative overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Backbone Telemetry
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                Active-Active Global Mesh Network
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-600">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Mesh Latency &lt; 8ms
              </span>
              <span className="text-neutral-300 hidden sm:inline">·</span>
              <span className="hidden sm:inline">BGP Anycast Routing</span>
            </div>
          </div>

          {/* SVG Map Graphic (Clean mobile overflow scroll) */}
          <div className="relative w-full overflow-x-auto min-h-[260px] flex items-center justify-center bg-neutral-50/50 rounded-xl p-2 sm:p-4">
            <svg
              viewBox="0 0 1000 400"
              className="w-full min-w-[550px] sm:min-w-0 h-auto text-neutral-400 shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Continental landmass outlines */}
              {/* North America */}
              <path
                d="M120 80 Q160 60 220 80 T280 120 T240 180 T160 160 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* South America */}
              <path
                d="M280 200 Q320 220 340 260 T310 340 T260 270 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Europe */}
              <path
                d="M460 70 Q510 60 550 90 T540 140 T470 130 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Africa */}
              <path
                d="M470 150 Q520 160 540 220 T490 280 T450 200 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Asia */}
              <path
                d="M570 70 Q700 50 820 90 T860 170 T720 180 T600 130 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Australia */}
              <path
                d="M820 260 Q880 250 890 290 T840 330 T790 300 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Connecting routes */}
              <path
                d="M180 140 Q230 110 280 135"
                stroke="rgba(37,99,235,0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M280 135 Q380 90 480 110"
                stroke="rgba(37,99,235,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M480 110 Q500 115 520 125"
                stroke="rgba(37,99,235,0.6)"
                strokeWidth="1.5"
              />
              <path
                d="M520 125 Q680 90 840 145"
                stroke="rgba(37,99,235,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M840 145 Q800 180 760 220"
                stroke="rgba(37,99,235,0.6)"
                strokeWidth="1.5"
              />
              <path
                d="M760 220 Q815 255 870 290"
                stroke="rgba(37,99,235,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M280 135 Q310 200 340 270"
                stroke="rgba(37,99,235,0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Map Technology Nodes */}
              {mapNodes.map((node) => (
                <g key={node.city} className="cursor-pointer group">
                  {/* Outer pulsating ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="rgba(37,99,235,0.2)"
                    className="animate-ping"
                  />
                  {/* Inner node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4.5"
                    fill="#2563eb"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  {/* Node label */}
                  <text
                    x={node.x}
                    y={node.y - 12}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="11"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="700"
                  >
                    {node.city}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 18}
                    textAnchor="middle"
                    fill="#059669"
                    fontSize="9"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="600"
                  >
                    {node.ping}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Regional Compliance & SLA Guarantee Footnote */}
          <div className="mt-6 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Multi-Region Active Replication</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Sovereignty Over Data Placement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>RPO &lt; 1 Second Disaster Recovery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
