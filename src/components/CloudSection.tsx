import React, { useState } from 'react';
import {
  Cpu,
  Database,
  HardDrive,
  Globe,
  ShieldCheck,
  Activity,
  Terminal,
  Sparkles,
  ArrowRight,
  Server,
} from 'lucide-react';
import { CLOUD_FEATURES } from '../data/mockData';
import { PageId } from '../types';

interface CloudSectionProps {
  onNavigate: (page: PageId) => void;
}

const ICON_MAP = {
  Cpu,
  Database,
  HardDrive,
  Globe,
  ShieldCheck,
  Activity,
  Terminal,
  Sparkles,
};

const REGIONS = [
  { id: 'us-east', name: 'US East (N. Virginia)', latency: '3.8ms', status: 'Healthy', nodes: 48 },
  { id: 'eu-west', name: 'EU Central (Frankfurt)', latency: '4.2ms', status: 'Healthy', nodes: 36 },
  { id: 'ap-northeast', name: 'AP Northeast (Tokyo)', latency: '5.1ms', status: 'Healthy', nodes: 32 },
  { id: 'sa-east', name: 'SA East (São Paulo)', latency: '7.4ms', status: 'Healthy', nodes: 20 },
];

export const CloudSection: React.FC<CloudSectionProps> = ({ onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Global Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            Infrastructure designed to scale with you.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            DotRepo Corp. Cloud provides the infrastructure, databases, APIs, storage, computing, and developer services required to build and operate modern applications.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLOUD_FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.iconName as keyof typeof ICON_MAP] || Server;
            return (
              <div
                key={feature.id}
                className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/90 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-200/70 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span className="font-semibold text-blue-700 truncate">{feature.spec}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Global Edge Telemetry Box */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-neutral-900">
                Global Edge Network Telemetry
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs text-neutral-500 font-medium">180+ Points of Presence</span>
            </div>
            <p className="text-xs text-neutral-600">
              Active-active multi-region synchronization with sub-second disaster failover guarantees.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r)}
                className={`w-full sm:w-auto px-3 sm:px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  selectedRegion.id === r.id
                    ? 'bg-white border-blue-500 text-neutral-950 shadow-sm ring-1 ring-blue-400'
                    : 'bg-white/80 border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="text-[11px] font-semibold truncate">{r.name.split('(')[0]}</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                    {r.latency}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA to Cloud page */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('cloud')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
          >
            <span>Explore DotRepo Corp. Cloud Infrastructure</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
