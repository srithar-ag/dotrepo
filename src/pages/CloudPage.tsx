import React from 'react';
import { CLOUD_FEATURES } from '../data/mockData';
import { PageId } from '../types';
import {
  Cpu,
  Database,
  HardDrive,
  Globe,
  ShieldCheck,
  Activity,
  Terminal,
  Sparkles,
  Server,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface CloudPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
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

export const CloudPage: React.FC<CloudPageProps> = ({ onNavigate, onOpenContactModal }) => {
  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              DotRepo Corp. Cloud Engine
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">Tier-4 Enterprise Data Centers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Infrastructure designed to scale with you.
          </h1>
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
                className="p-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
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
                <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-mono font-semibold text-blue-700 truncate">
                  {feature.spec}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bare Metal & Compute Tiers Matrix */}
        <div className="mt-16 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Instance Hardware Specifications
              </span>
              <h3 className="text-xl font-bold text-neutral-950 mt-1">
                Bare Metal Compute & GPU Accelerator Matrix
              </h3>
            </div>

            <button
              onClick={() => onOpenContactModal('Cloud Infrastructure Quota')}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Request Hardware Quota
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-neutral-50 text-neutral-700 font-bold border-b border-neutral-200">
                <tr>
                  <th className="p-3">Series Type</th>
                  <th className="p-3">Processor Architecture</th>
                  <th className="p-3">vCPU / Threads</th>
                  <th className="p-3">Memory (ECC)</th>
                  <th className="p-3">Network Throughput</th>
                  <th className="p-3">Target Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                <tr>
                  <td className="p-3 font-mono font-bold text-neutral-950">c3-metal-standard</td>
                  <td className="p-3">AMD EPYC™ 9004 Genoa</td>
                  <td className="p-3 font-mono">128 vCPUs</td>
                  <td className="p-3 font-mono">512 GB DDR5</td>
                  <td className="p-3 font-mono text-emerald-700 font-semibold">100 Gbps</td>
                  <td className="p-3 text-neutral-600">Enterprise CRM & ERP Core</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-neutral-950">m3-highmem-db</td>
                  <td className="p-3">Intel® Xeon® Platinum 8480+</td>
                  <td className="p-3 font-mono">64 vCPUs</td>
                  <td className="p-3 font-mono">1,024 GB DDR5</td>
                  <td className="p-3 font-mono text-emerald-700 font-semibold">100 Gbps</td>
                  <td className="p-3 text-neutral-600">In-Memory Database & Vector Cache</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-neutral-950">g2-h100-accelerated</td>
                  <td className="p-3">8x NVIDIA H100 80GB SXM5</td>
                  <td className="p-3 font-mono">192 vCPUs</td>
                  <td className="p-3 font-mono">2,048 GB DDR5</td>
                  <td className="p-3 font-mono text-emerald-700 font-semibold">3.2 Tbps NVLink</td>
                  <td className="p-3 text-neutral-600">Autonomous Agent Fine-Tuning & RAG</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Sub-Second Provisioning</span>
                <span className="text-[11px] text-neutral-500">Automated microVM deployment</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Global Fiber Interconnect</span>
                <span className="text-[11px] text-neutral-500">Private terabit transit fabric</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-neutral-900 block">ISO 27001 Data Centers</span>
                <span className="text-[11px] text-neutral-500">Biometric & hardware TPM verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
