import React, { useState } from 'react';
import { CODE_SAMPLES } from '../constants';
import { Check, Copy, Terminal, ExternalLink, BookOpen, Activity, GitCommit, FileCode } from 'lucide-react';

type TabKey = 'cli' | 'node' | 'python' | 'rest';

const TABS: { id: TabKey; label: string; icon: string }[] = [
  { id: 'cli', label: 'DotRepo CLI', icon: '$' },
  { id: 'node', label: 'Node.js / TS', icon: 'TS' },
  { id: 'python', label: 'Python SDK', icon: 'PY' },
  { id: 'rest', label: 'REST API', icon: 'cURL' },
];

export const CloudDevTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('cli');
  const [copied, setCopied] = useState(false);

  const sample = CODE_SAMPLES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(sample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="bg-[#0A0A0A] text-white py-20 lg:py-28 border-b border-[#1A1A1A]">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#22C55E] font-mono font-semibold mb-2">
            DEVELOPER PLATFORM & TOOLING
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Deploy from terminal or typed code.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Every cluster resource, ingress route, and encrypted volume can be declared through our CLI, typed SDKs, or native Terraform provider.
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Code Window */}
          <div className="lg:col-span-8 bg-[#000000] border border-[#1A1A1A] rounded-[2px] overflow-hidden">
            {/* Window Top Rail */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#1A1A1A] bg-[#050505] px-4 py-2.5">
              {/* Tab Buttons */}
              <div className="flex items-center gap-1">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-[2px] flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'bg-[#1A1A1A] text-[#22C55E] font-semibold border-b-2 border-[#22C55E]'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] text-neutral-500">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right side: Filename & Copy Button */}
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                  {sample.filename}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#262626] text-neutral-300 hover:text-white rounded-[2px] border border-[#333333] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span className="text-[#22C55E]">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Content Block with Monospace Syntax Styling */}
            <div className="p-6 font-mono text-xs overflow-x-auto leading-relaxed bg-[#000000] text-neutral-300 min-h-[320px]">
              <pre className="whitespace-pre">
                <code>
                  {sample.code.split('\n').map((line, i) => {
                    // Simple syntax coloring based on pattern
                    let lineClass = 'text-neutral-300';
                    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
                      lineClass = 'text-neutral-500 italic';
                    } else if (line.includes('import') || line.includes('from') || line.includes('const') || line.includes('await')) {
                      lineClass = 'text-[#22C55E]';
                    } else if (line.includes('dotrepo ') || line.includes('curl ')) {
                      lineClass = 'text-emerald-400 font-semibold';
                    } else if (line.includes('{') || line.includes('}') || line.includes('(') || line.includes(')')) {
                      lineClass = 'text-neutral-200';
                    }
                    return (
                      <div key={i} className="table-row">
                        <span className="table-cell pr-4 text-neutral-600 select-none text-right w-8 text-[11px]">
                          {i + 1}
                        </span>
                        <span className={`table-cell ${lineClass}`}>{line}</span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>
          </div>

          {/* Right 4 Cols: Developer Resource Links */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#000000] border border-[#1A1A1A] p-6 rounded-[2px]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-semibold block mb-4">
                DEVELOPER ECOSYSTEM
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Complete documentation, SDK references, sample Terraform templates, and real-time uptime monitors for all global zones.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="#next-steps"
                  className="flex items-center justify-between p-3 bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#333333] rounded-[2px] text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-neutral-400 group-hover:text-[#22C55E]" />
                    <span>Documentation & Quickstart</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>

                <a
                  href="#next-steps"
                  className="flex items-center justify-between p-3 bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#333333] rounded-[2px] text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-neutral-400 group-hover:text-[#22C55E]" />
                    <span>REST & GraphQL API Spec</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>

                <a
                  href="#next-steps"
                  className="flex items-center justify-between p-3 bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#333333] rounded-[2px] text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-[#22C55E]" />
                    <span>Global Status Page (99.99%)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>

                <a
                  href="#next-steps"
                  className="flex items-center justify-between p-3 bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#333333] rounded-[2px] text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <GitCommit className="w-4 h-4 text-neutral-400 group-hover:text-[#22C55E]" />
                    <span>Changelog & Release Notes</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div className="border border-[#1A1A1A] bg-[#000000] p-4 rounded-[2px] flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">TERRAFORM PROVIDER</span>
              <span className="text-[#22C55E]">registry.terraform.io/dotrepo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
