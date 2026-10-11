import React, { useState } from 'react';
import { AI_CAPABILITIES } from '../data/mockData';
import { PageId } from '../types';
import {
  Sparkles,
  Bot,
  Wand2,
  TrendingUp,
  Zap,
  Terminal,
  FileText,
  Search,
  CheckCircle2,
  ShieldCheck,
  Play,
  ArrowRight,
  Server,
  Lock,
} from 'lucide-react';

interface AIPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

const ICON_MAP = {
  MessageSquareText: Bot,
  Bot: Bot,
  Wand2: Wand2,
  TrendingUp: TrendingUp,
  Zap: Zap,
  Terminal: Terminal,
  FileText: FileText,
  Search: Search,
};

export const AIPage: React.FC<AIPageProps> = ({ onNavigate, onOpenContactModal }) => {
  const [selectedPipeline, setSelectedPipeline] = useState<'agents' | 'rag' | 'predictive'>('agents');

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
              DotRepo Corp. AI Fabric
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">Zero Customer Data Training</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Intelligence built into your business.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            DotRepo Corp. AI brings generative AI, intelligent automation, AI agents, predictive analytics, and natural-language interfaces directly into business workflows.
          </p>
        </div>

        {/* 8 AI Capabilities Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_CAPABILITIES.map((cap) => {
            const Icon = ICON_MAP[cap.iconName as keyof typeof ICON_MAP] || Sparkles;
            return (
              <div
                key={cap.id}
                className="p-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-mono text-purple-700 font-semibold truncate">
                  {cap.technicalDetail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Architecture Section */}
        <div className="mt-16 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Architectural Guarantees
              </span>
              <h3 className="text-xl font-bold text-neutral-950 mt-1">
                Zero-Trust Multi-Agent Reasoning Stack
              </h3>
            </div>

            <button
              onClick={() => onOpenContactModal('DotRepo Corp. AI Enterprise Architecture')}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Consult an AI Architect
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
              <Lock className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Strict Data Segregation</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Customer prompts and embedded documents are never cached or used to retrain foundation weights. Full isolation via tenant encryption keys.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
              <Server className="w-5 h-5 text-blue-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Dedicated GPU Clusters</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Run models on private VPC clusters powered by high-throughput H100/A100 accelerators with low-latency direct memory pipelines.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
              <ShieldCheck className="w-5 h-5 text-purple-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Deterministic Tool Calling</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Autonomous agents operate within strict sandboxes with parameterized schema validation to eliminate hallucinations in business records.
              </p>
            </div>
          </div>

          {/* Model Family Table */}
          <div className="pt-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
              DotRepo Corp. Enterprise Model Family
            </h4>
            <div className="overflow-x-auto border border-neutral-200 rounded-xl">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-neutral-50 text-neutral-700 font-bold border-b border-neutral-200">
                  <tr>
                    <th className="p-3">Model Alias</th>
                    <th className="p-3">Optimal Workload</th>
                    <th className="p-3">Context Window</th>
                    <th className="p-3">Median Latency</th>
                    <th className="p-3">Security Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  <tr>
                    <td className="p-3 font-mono font-bold text-neutral-950">DotRepo Corp.-Reason-Pro</td>
                    <td className="p-3">Multi-step agent planning & complex workflow routing</td>
                    <td className="p-3 font-mono">1,000,000 tokens</td>
                    <td className="p-3 font-mono text-emerald-700 font-semibold">18ms TTFT</td>
                    <td className="p-3 text-neutral-500">Air-gapped VPC</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-neutral-950">DotRepo Corp.-Fast-Flash</td>
                    <td className="p-3">High-throughput document indexing & chat support</td>
                    <td className="p-3 font-mono">500,000 tokens</td>
                    <td className="p-3 font-mono text-emerald-700 font-semibold">6ms TTFT</td>
                    <td className="p-3 text-neutral-500">Tenant-Encrypted</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-neutral-950">DotRepo Corp.-Embed-Large</td>
                    <td className="p-3">Enterprise semantic search & hybrid vector retrieval</td>
                    <td className="p-3 font-mono">3,072 dimensions</td>
                    <td className="p-3 font-mono text-emerald-700 font-semibold">2ms Search</td>
                    <td className="p-3 text-neutral-500">Strict ACL Gated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
