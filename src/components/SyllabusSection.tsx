import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Download,
  Terminal,
  Bot,
  Cpu,
  Shield,
} from 'lucide-react';

interface SyllabusSectionProps {
  onEnroll: () => void;
  onDownloadSyllabus: () => void;
}

export const SyllabusSection: React.FC<SyllabusSectionProps> = ({
  onEnroll,
  onDownloadSyllabus,
}) => {
  const [expandedModule, setExpandedModule] = useState<number>(1);

  const modules = [
    {
      number: 1,
      title: 'Foundations of Claude 3.7 & Cognitive Architecture',
      duration: 'Weeks 1–3',
      icon: Cpu,
      summary:
        'Master the mechanics of Claude 3.7 Sonnet, system prompt steering, extended thinking mode, and structured output formatting.',
      topics: [
        'Deep dive into Anthropic Messages API, streaming, and tool specifications',
        'Extended Thinking & Chain of Thought controls for multi-step reasoning',
        'Structured outputs with Pydantic, JSON Schema, and typed response guarantees',
        'Deterministic token budgeting and prompt compression tactics',
      ],
      projectMilestone: 'Project 1: Multi-Agent Research Swarm & Synthesizer',
    },
    {
      number: 2,
      title: 'Tool Use, Function Calling & Model Context Protocol (MCP)',
      duration: 'Weeks 4–6',
      icon: Terminal,
      summary:
        'Equip Claude with external tools, connect local developer environments, and author full Model Context Protocol (MCP) servers.',
      topics: [
        'Tool calling protocols, schema validation, and error recovery',
        'Building custom FastMCP servers in Python and TypeScript',
        'Connecting Claude to live PostgreSQL databases and internal SaaS webhooks',
        'Automated code generation, AST parsing, and sandboxed execution',
      ],
      projectMilestone: 'Projects 2, 4 & 5: Autonomous Code Debugger & Enterprise MCP Suite',
    },
    {
      number: 3,
      title: 'Enterprise RAG, Vector Search & Prompt Caching',
      duration: 'Weeks 7–9',
      icon: Layers,
      summary:
        'Architect sub-100ms enterprise knowledge retrieval combining hybrid search, rerankers, and Claude Prompt Caching for 90% cost savings.',
      topics: [
        'Dense vs. sparse embedding strategies (BGE, Cohere, BM25)',
        'Prompt Caching mechanics: cache breakpoints, TTLs, and cache hit optimization',
        'Harnessing Claude’s 200,000-token context window without chunking degradation',
        'Multimodal ingestion of complex PDFs, charts, and financial tables',
      ],
      projectMilestone: 'Projects 3, 6 & 7: Enterprise Cached RAG & 200k Legal Synthesizer',
    },
    {
      number: 4,
      title: 'Autonomous Multi-Agent Orchestration & Computer Use',
      duration: 'Weeks 10–12',
      icon: Bot,
      summary:
        'Design swarms of autonomous agents that collaborate, delegate tasks, recover from execution deadlocks, and control browser interfaces.',
      topics: [
        'Agent design patterns: Router, Orchestrator-Worker, and Evaluator-Optimizer',
        'Claude Computer Use API: Operating browser GUI elements, clicking, typing, and validating state',
        'Persistent memory architectures, session state, and thread management',
        'Human-in-the-loop escalation patterns for high-stakes enterprise decisions',
      ],
      projectMilestone: 'Projects 10 & 11: Autonomous Web Scraping Agent with Computer Use',
    },
    {
      number: 5,
      title: 'Production Ops, Guardrails, Evals & Capstone Deployment',
      duration: 'Weeks 13–14',
      icon: Shield,
      summary:
        'Harden agents against adversarial prompt injections, set up LLM-as-a-judge CI/CD regressions, and deploy scalable containerized services.',
      topics: [
        'Red teaming, jailbreak resistance, and data leak prevention filters',
        'Building golden test datasets and automated LLM-as-a-judge eval suites',
        'WebSocket token streaming with backpressure control & latency monitoring',
        'Packaging agent runtimes with Docker, Kubernetes Helm, and OpenTelemetry',
      ],
      projectMilestone: 'Project 13: Capstone Enterprise Copilot Deployed to Production',
    },
  ];

  return (
    <section id="syllabus" className="py-20 md:py-28 bg-[#090b14] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Curriculum & Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
              Comprehensive 14-Week Syllabus
            </h2>
            <p className="mt-2 text-neutral-300 text-sm sm:text-base max-w-2xl font-normal">
              Structured to take software engineers from foundational LLM API calls to architecting resilient, multi-agent enterprise systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onDownloadSyllabus}
              className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-neutral-400" />
              <span>Download Syllabus PDF</span>
            </button>
            <button
              onClick={onEnroll}
              className="px-5 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Accordion Modules */}
        <div className="mt-10 space-y-4 max-w-4xl mx-auto">
          {modules.map((m) => {
            const isExpanded = expandedModule === m.number;
            const Icon = m.icon;
            return (
              <div
                key={m.number}
                className="rounded-2xl border border-neutral-800 bg-[#0f111e] overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => setExpandedModule(isExpanded ? 0 : m.number)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#131627] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold text-amber-400">
                          Module {m.number}
                        </span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-xs text-neutral-400 font-mono">
                          {m.duration}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {m.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isExpanded ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 bg-[#0c0e18]">
                    <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed font-normal">
                      {m.summary}
                    </p>

                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Key Topics Covered:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                      {m.topics.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3.5 rounded-xl bg-[#16192c] border border-blue-500/30 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-neutral-200">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>
                          <strong>Reviewed Project:</strong> {m.projectMilestone}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold shrink-0">
                        1:1 Mentor Signoff
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
