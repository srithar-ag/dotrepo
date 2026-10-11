import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Layers,
  Key,
  Webhook,
  Database,
  Sparkles,
  Share2,
} from 'lucide-react';
import { CODE_SNIPPETS } from '../data/mockData';
import { PageId } from '../types';

interface DeveloperSectionProps {
  onNavigate: (page: PageId) => void;
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({ onNavigate }) => {
  const [activeLang, setActiveLang] = useState<'nodejs' | 'python' | 'go' | 'curl'>('nodejs');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const devPillars = [
    { title: 'APIs', desc: 'REST & GraphQL with sub-15ms edge latency', icon: Code },
    { title: 'SDKs', desc: 'Type-safe libraries for TS, Python, Go, Java, C#', icon: Terminal },
    { title: 'Webhooks', desc: 'Guaranteed at-least-once delivery with HMAC', icon: Webhook },
    { title: 'Authentication', desc: 'OIDC, SAML, SCIM & session token vaults', icon: Key },
    { title: 'Cloud Functions', desc: 'Serverless event triggers with instant boot', icon: Layers },
    { title: 'Databases', desc: 'Distributed SQL & vector queries via ORM', icon: Database },
    { title: 'AI APIs', desc: 'Unified cognitive reasoning & tool endpoints', icon: Sparkles },
    { title: 'Integrations', desc: 'Pre-built connectors for 500+ enterprise systems', icon: Share2 },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-neutral-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Developer Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            Build anything. Connect everything.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Give developers the tools and infrastructure needed to build modern applications. Everything you need to programmatically control business apps, spin up multi-region databases, and orchestrate autonomous AI agents.
          </p>
        </div>

        {/* 8 Developer Capabilities Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {devPillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-4 rounded-xl bg-white border border-neutral-200/90 hover:border-blue-300 hover:shadow-sm transition-all shadow-xs"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold text-neutral-900">{p.title}</h4>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Realistic Code Editor Visualization */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden font-mono text-neutral-300">
          {/* Editor Header Bar (Mobile responsive) */}
          <div className="px-3 sm:px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="ml-2 text-[11px] sm:text-xs text-neutral-400 font-mono truncate">
                quickstart.{activeLang === 'nodejs' ? 'ts' : activeLang === 'python' ? 'py' : activeLang === 'go' ? 'go' : 'sh'}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 overflow-x-auto max-w-full pb-0.5 sm:pb-0">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 shrink-0">
                {(['nodejs', 'python', 'go', 'curl'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] rounded transition-colors cursor-pointer whitespace-nowrap ${
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

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] sm:text-[11px] text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[10px] sm:text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 bg-neutral-950 overflow-x-auto text-xs sm:text-sm text-neutral-200 leading-relaxed font-mono">
            <pre className="text-left font-mono">
              <code>{CODE_SNIPPETS[activeLang]}</code>
            </pre>
          </div>

          {/* Terminal Console Footer Simulation */}
          <div className="px-6 py-3 bg-neutral-900/80 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Compiled without warnings</span>
              <span className="text-neutral-600">·</span>
              <span>SDK Version 2026.4.1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">API Gateway:</span>
              <span className="text-neutral-300 font-semibold">https://api.dotrepo.com/v1</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-neutral-600">
            Explore complete API schemas, OpenAPI 3.1 specs, and sandbox testing environments.
          </div>
          <button
            onClick={() => onNavigate('developers')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <span>Explore Developer Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
