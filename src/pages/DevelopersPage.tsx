import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Code,
  Terminal,
  Key,
  Webhook,
  Database,
  Sparkles,
  Share2,
  Copy,
  Check,
  Play,
  ArrowRight,
  ExternalLink,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { CODE_SNIPPETS } from '../data/mockData';

interface DevelopersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const DevelopersPage: React.FC<DevelopersPageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const [activeLang, setActiveLang] = useState<'nodejs' | 'python' | 'go' | 'curl'>('nodejs');
  const [copied, setCopied] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeMockApi = () => {
    setIsLoading(true);
    setTimeout(() => {
      setApiResponse(
        JSON.stringify(
          {
            status: 200,
            id: 'deal_98f12a',
            name: 'Global Cloud Modernization',
            amount: 450000.0,
            currency: 'USD',
            stage: 'qualified_lead',
            ai_predicted_probability: 0.94,
            audit: {
              timestamp: new Date().toISOString(),
              trace_id: 'tr_88290ab',
              region: 'us-east-1',
            },
          },
          null,
          2
        )
      );
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Developer Ecosystem
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">OpenAPI 3.1 & Distributed SDKs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Build anything. Connect everything.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Give developers the tools and infrastructure needed to build modern applications. Everything you need to programmatically control business apps, spin up multi-region databases, and orchestrate autonomous AI agents.
          </p>
        </div>

        {/* 8 Developer Pillars Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'APIs', desc: 'REST & GraphQL with sub-15ms edge latency', icon: Code },
            { title: 'SDKs', desc: 'Type-safe libraries for TS, Python, Go, Java, C#', icon: Terminal },
            { title: 'Webhooks', desc: 'Guaranteed at-least-once delivery with HMAC', icon: Webhook },
            { title: 'Authentication', desc: 'OIDC, SAML, SCIM & session token vaults', icon: Key },
            { title: 'Cloud Functions', desc: 'Serverless event triggers with instant boot', icon: Layers },
            { title: 'Databases', desc: 'Distributed SQL & vector queries via ORM', icon: Database },
            { title: 'AI APIs', desc: 'Unified cognitive reasoning & tool endpoints', icon: Sparkles },
            { title: 'Integrations', desc: 'Pre-built connectors for 500+ enterprise systems', icon: Share2 },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-5 rounded-xl bg-white border border-neutral-200/90 hover:border-blue-300 hover:shadow-xs transition-all shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold text-neutral-900">{p.title}</h4>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive SDK Playground & Live API Gateway Runner */}
        <div className="mt-14 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Interactive API Gateway Sandbox
              </span>
              <h3 className="text-xl font-bold text-neutral-950 mt-1">
                Execute Live Signed Requests
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                POST /v1/crm/deals
              </span>
            </div>
          </div>

          {/* Code Switcher and Runner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code snippet (7 cols) */}
            <div className="lg:col-span-7 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden font-mono text-neutral-300">
              <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {(['nodejs', 'python', 'go', 'curl'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-2.5 py-1 text-[11px] rounded transition-colors cursor-pointer ${
                        activeLang === lang
                          ? 'bg-neutral-800 text-white font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {lang === 'nodejs'
                        ? 'TypeScript'
                        : lang === 'python'
                        ? 'Python'
                        : lang === 'go'
                        ? 'Go'
                        : 'cURL'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2 py-0.5 text-xs text-neutral-300 hover:text-white rounded bg-neutral-800 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 text-xs overflow-x-auto leading-relaxed">
                <pre>
                  <code>{CODE_SNIPPETS[activeLang]}</code>
                </pre>
              </div>
            </div>

            {/* Right: Sandbox Execution Terminal (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-neutral-900/95 border border-neutral-800 text-xs font-mono">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-neutral-400 text-[11px]">
                  <span>MOCK CLIENT RUNNER</span>
                  <span className="text-emerald-400">EDGE GATEWAY</span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-neutral-400 text-[11px]">
                    Click below to dispatch an authenticated signed request to the sandbox edge router:
                  </div>

                  {apiResponse ? (
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 overflow-x-auto text-[11px] text-emerald-400 leading-snug">
                      <pre>{apiResponse}</pre>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-neutral-500 text-[11px] border border-dashed border-neutral-800 rounded-lg">
                      Response output will appear here.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={executeMockApi}
                  disabled={isLoading}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isLoading ? 'Executing Request...' : 'Send Live Request'}</span>
                </button>

                <span className="text-[10px] text-neutral-400">Environment: Sandbox</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
