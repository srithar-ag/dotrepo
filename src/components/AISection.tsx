import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Wand2,
  TrendingUp,
  Zap,
  Terminal,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { AI_CAPABILITIES } from '../data/mockData';
import { PageId } from '../types';

interface AISectionProps {
  onNavigate: (page: PageId) => void;
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

export const AISection: React.FC<AISectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'agent' | 'rag' | 'predictive'>('agent');
  const [simStep, setSimStep] = useState<number>(3);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    const interval = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsSimulating(false);
          return 3;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-neutral-50/50 relative overflow-hidden">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
              Autonomous Systems
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-600">Zero Customer Data Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            Intelligence built into your business.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            DotRepo Corp. AI brings generative AI, intelligent automation, AI agents, predictive analytics, and natural-language interfaces directly into business workflows.
          </p>
        </div>

        {/* 8 AI Capabilities Grid */}
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
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span className="truncate">{cap.technicalDetail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive AI Architecture & Connected Node Visualization */}
        <div className="mt-16 rounded-2xl bg-white border border-neutral-200 shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Interactive Architecture Simulation
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                Deterministic Agent Orchestration & Private RAG
              </h3>
            </div>

            <div className="overflow-x-auto max-w-full pb-1 md:pb-0">
              <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl border border-neutral-200 w-max sm:w-auto">
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'agent'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Multi-Agent Workflow
                </button>
                <button
                  onClick={() => setActiveTab('rag')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'rag'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Enterprise RAG Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('predictive')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'predictive'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Predictive Churn Engine
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-neutral-50/70">
            {/* Visual Node Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStep >= 0
                    ? 'bg-white border-purple-400 text-neutral-900 shadow-sm ring-1 ring-purple-300'
                    : 'bg-white/60 border-neutral-200 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-purple-700">01. INGEST & ACL</span>
                  {simStep >= 0 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-xs font-bold">Encrypted Input</h4>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Tenant permissions verified against corporate IAM policies.
                </p>
                <div className="mt-3 text-[10px] font-mono text-neutral-700 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
                  ACL: OrgId::SEC_992 Verified
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStep >= 1
                    ? 'bg-white border-purple-400 text-neutral-900 shadow-sm ring-1 ring-purple-300'
                    : 'bg-white/60 border-neutral-200 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-purple-700">02. REASONING</span>
                  {simStep >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-xs font-bold">Agent Task Planner</h4>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Decomposes high-level intent into parameterized sub-actions.
                </p>
                <div className="mt-3 text-[10px] font-mono text-neutral-700 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
                  Plan: 3 Sub-actions queued
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStep >= 2
                    ? 'bg-white border-purple-400 text-neutral-900 shadow-sm ring-1 ring-purple-300'
                    : 'bg-white/60 border-neutral-200 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-purple-700">03. TOOL EXECUTION</span>
                  {simStep >= 2 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-xs font-bold">Sandboxed Tools</h4>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Invokes database, ledger APIs, and CRM webhooks securely.
                </p>
                <div className="mt-3 text-[10px] font-mono text-neutral-700 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
                  Tool: database.query (2ms)
                </div>
              </div>

              {/* Step 4 */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStep >= 3
                    ? 'bg-white border-emerald-500 text-neutral-900 shadow-sm ring-1 ring-emerald-400'
                    : 'bg-white/60 border-neutral-200 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-700">04. RESOLUTION</span>
                  {simStep >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-xs font-bold">Verifiable Result</h4>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Deterministic outcome logged with complete audit lineage.
                </p>
                <div className="mt-3 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  Status: Success (Audit Logged)
                </div>
              </div>
            </div>

            {/* Simulation controls */}
            <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isSimulating ? 'Executing Workflow...' : 'Simulate Live Agent Run'}</span>
                </button>
                <button
                  onClick={() => setSimStep(3)}
                  className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors"
                  title="Reset simulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Tenant Isolation Enforced</span>
                </div>
                <span className="text-neutral-300">·</span>
                <span className="font-mono">Latency: 42ms end-to-end</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to AI page */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('ai')}
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-800 transition-colors cursor-pointer group"
          >
            <span>Explore DotRepo Corp. AI Architecture & Models</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
