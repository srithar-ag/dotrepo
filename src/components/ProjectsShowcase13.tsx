import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Database,
  Search,
  Sparkles,
  Bot,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  FileCode,
  Gauge,
  Workflow,
  Lock,
} from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  category: 'Agents' | 'Tools & MCP' | 'RAG & Memory' | 'Production & Evals';
  difficulty: 'Intermediate' | 'Advanced';
  summary: string;
  mentorRubric: string;
  technologies: string[];
  codeSnippet: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    title: 'Multi-Agent Research Swarm with Claude 3.7',
    category: 'Agents',
    difficulty: 'Intermediate',
    summary:
      'Build a multi-agent system where a Lead Coordinator delegates sub-tasks to Specialist Agents (Web Scraper, Synthesizer, Fact Checker) to produce comprehensive financial and scientific dossiers.',
    mentorRubric:
      'Reviewed for deterministic state machine handoffs, agent loop termination guarantees, and recursive token budget management.',
    technologies: ['Anthropic Python SDK', 'Claude 3.7 Sonnet', 'AsyncIO', 'JSON Schema'],
    codeSnippet: `from anthropic import Anthropic

client = Anthropic()
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=4096,
    system="You are a Lead Research Coordinator managing sub-agents...",
    messages=[{"role": "user", "content": "Analyze semiconductor market trends"}],
    tools=research_tools_schema
)`,
  },
  {
    id: 2,
    title: 'Autonomous Code Debugger & AST Tree Synthesizer',
    category: 'Tools & MCP',
    difficulty: 'Intermediate',
    summary:
      'Create an autonomous engineering copilot that parses Abstract Syntax Trees (AST), runs failing test suites in a Docker sandbox, generates diff patches, and iteratively debugs until 100% pass.',
    mentorRubric:
      'Reviewed for sandbox isolation safety, diff formatting correctness, and minimum-delta patch strategy.',
    technologies: ['AST Parsing', 'Docker API', 'Pytest', 'Claude Tool Use'],
    codeSnippet: `async def repair_cycle(codebase_path, test_target):
    diagnostics = await run_pytest(test_target)
    patch = await claude.generate_ast_patch(diagnostics)
    applied = apply_git_patch(patch)
    return await verify_green_build(applied)`,
  },
  {
    id: 3,
    title: 'Enterprise RAG with Claude Prompt Caching',
    category: 'RAG & Memory',
    difficulty: 'Intermediate',
    summary:
      'Construct a high-performance Retrieval-Augmented Generation pipeline combining hybrid dense/sparse vector search with Anthropic Prompt Caching for 90% latency and cost reduction.',
    mentorRubric:
      'Reviewed for cache breakpoint alignment, precision@k retrieval benchmarks, and hallucination attribution metrics.',
    technologies: ['Qdrant / pgvector', 'Prompt Caching', 'BM25', 'BGE-Reranker'],
    codeSnippet: `messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": enterprise_knowledge_corpus,
                "cache_control": {"type": "ephemeral"} # 90% cost savings
            },
            {"type": "text", "text": "What are our Q3 multi-region failover protocols?"}
        ]
    }
]`,
  },
  {
    id: 4,
    title: 'Model Context Protocol (MCP) Server & Client Suite',
    category: 'Tools & MCP',
    difficulty: 'Advanced',
    summary:
      'Implement a production MCP server connecting Claude to live enterprise backends (PostgreSQL, GitHub, Slack) using standardized JSON-RPC 2.0 streaming transports.',
    mentorRubric:
      'Reviewed for strict type safety, permission scoping per tool, and rate-limiting resilience.',
    technologies: ['Model Context Protocol', 'FastMCP', 'TypeScript', 'JSON-RPC'],
    codeSnippet: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({ name: "dotrepo-enterprise-mcp", version: "1.0.0" });
server.tool("query_cluster_health", { clusterId: z.string() }, async ({ clusterId }) => {
  return { content: [{ type: "text", text: await fetchTelemetry(clusterId) }] };
});`,
  },
  {
    id: 5,
    title: 'Self-Correcting SQL & Data Warehouse Agent',
    category: 'Agents',
    difficulty: 'Intermediate',
    summary:
      'Deploy a natural language to SQL agent that analyzes warehouse schemas, writes complex analytic queries, auto-fixes dialect execution errors, and generates visual charting summaries.',
    mentorRubric:
      'Reviewed for read-only safety guardrails, SQL injection mitigation, and optimal join index utilization.',
    technologies: ['Snowflake / BigQuery', 'SQLGlot', 'Claude Tool Calling', 'Vega-Lite'],
    codeSnippet: `SELECT 
    DATE_TRUNC('month', created_at) AS cohort_month,
    COUNT(DISTINCT user_id) AS active_subscribers,
    SUM(arr_amount) AS total_arr
FROM analytics.enterprise_billing
GROUP BY 1 ORDER BY 1 DESC;`,
  },
  {
    id: 6,
    title: 'Multimodal Vision & Financial Chart Extraction Agent',
    category: 'Agents',
    difficulty: 'Intermediate',
    summary:
      'Process thousands of pages of quarterly 10-K filings, corporate pitch decks, and visual schematics to extract tabular financial data and identify hidden structural risks.',
    mentorRubric:
      'Reviewed for numerical precision verification against raw tables and visual ground-truth alignment.',
    technologies: ['Claude Vision', 'PDF Plumber', 'Pydantic Schemas', 'NumPy'],
    codeSnippet: `image_media = base64.b64encode(pdf_page_image).decode('utf-8')
message = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_media}},
            {"type": "text", "text": "Extract balance sheet items into typed JSON schema."}
        ]
    }]
)`,
  },
  {
    id: 7,
    title: '200,000-Token Long Context Legal Document Synthesizer',
    category: 'RAG & Memory',
    difficulty: 'Advanced',
    summary:
      'Harness Claude’s industry-leading 200k context window to ingest entire regulatory frameworks, patent suites, and M&A contracts to highlight cross-document compliance gaps.',
    mentorRubric:
      'Reviewed for needle-in-a-haystack recall fidelity and structured citation linking.',
    technologies: ['Long-Context Architecture', 'Chunkless Ingestion', 'Citation Mapping'],
    codeSnippet: `// Ingest 180,000 token multi-agreement merger corpus in a single pass
const contractAnalysis = await anthropic.messages.create({
  model: 'claude-3-7-sonnet-20250219',
  max_tokens: 8192,
  system: 'You are a senior partner in M&A law. Cross-reference indemnification clauses.',
  messages: [{ role: 'user', content: fullContractCorpus }]
});`,
  },
  {
    id: 8,
    title: 'Adversarial Prompt Defense & Red Teaming Guardrails',
    category: 'Production & Evals',
    difficulty: 'Advanced',
    summary:
      'Subject your AI agent to automated adversarial attacks (jailbreaks, prompt leaks, indirect injection) and build dual-boundary input/output moderation filters.',
    mentorRubric:
      'Reviewed for 0% system prompt leakage under 500 automated attack vectors and minimal false-positive latency.',
    technologies: ['Llama-Guard / NeMo', 'Adversarial Fuzzing', 'Content Safety APIs'],
    codeSnippet: `def sanitize_untrusted_input(prompt: str) -> bool:
    # Multi-tier semantic classifier + structural delimiter enforcement
    if contains_delimiter_collision(prompt) or passes_leak_heuristic(prompt):
        raise SecurityPolicyViolation("Suspicious prompt topology detected")
    return True`,
  },
  {
    id: 9,
    title: 'LLM-as-a-Judge Continuous Evaluation Framework',
    category: 'Production & Evals',
    difficulty: 'Intermediate',
    summary:
      'Implement an automated evaluation pipeline running alongside CI/CD to detect prompt regression, output drift, and semantic accuracy across synthetic golden datasets.',
    mentorRubric:
      'Reviewed for inter-annotator agreement metrics, calibration against human labels, and statistical significance testing.',
    technologies: ['Ragas', 'DeepEval', 'Pytest-LLM', 'GitHub Actions CI'],
    codeSnippet: `def evaluate_agent_output(golden_input, actual_response, ground_truth):
    score = eval_client.messages.create(
        model="claude-3-7-sonnet-20250219",
        system=JUDGE_RUBRIC_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": f"Task: {golden_input}\nOutput: {actual_response}\nTruth: {ground_truth}"}]
    )
    return parse_eval_score(score)`,
  },
  {
    id: 10,
    title: 'Autonomous Browser & Web Scraping Agent with Computer Use',
    category: 'Agents',
    difficulty: 'Advanced',
    summary:
      'Build an autonomous agent capable of operating browser environments, navigating authenticated SaaS dashboards, and extracting real-time competitive intelligence.',
    mentorRubric:
      'Reviewed for graceful error recovery on unexpected DOM changes, CAPTCHA detection, and state serialization.',
    technologies: ['Playwright', 'Claude Computer Use API', 'DOM Snapshotting'],
    codeSnippet: `// Computer Use action loop
while (!taskComplete) {
  const screenshot = await page.screenshot();
  const nextAction = await claude.planNextAction({ screenshot, goal });
  await executeBrowserAction(page, nextAction);
}`,
  },
  {
    id: 11,
    title: 'Real-Time Audio & WebSocket Streaming Copilot',
    category: 'Production & Evals',
    difficulty: 'Intermediate',
    summary:
      'Build a voice-enabled real-time interview coach streaming tokens via WebSockets with server-sent chunked audio rendering under 300ms total glass-to-glass latency.',
    mentorRubric:
      'Reviewed for token backpressure handling, interruption handling, and audio chunk synchronization.',
    technologies: ['WebSockets', 'SSE', 'Whisper / ElevenLabs', 'FastAPI'],
    codeSnippet: `async for chunk in client.messages.create_stream(
    model="claude-3-7-sonnet-20250219",
    messages=[{"role": "user", "content": audio_transcript}]
):
    if chunk.type == "content_block_delta":
        await websocket.send_text(chunk.delta.text)`,
  },
  {
    id: 12,
    title: 'Microservice API Synthesizer with OpenAPI Contracts',
    category: 'Tools & MCP',
    difficulty: 'Intermediate',
    summary:
      'Automatically generate high-performance REST and gRPC microservices with end-to-end OpenAPI v3.1 validation, mock servers, and automated Postman suites.',
    mentorRubric:
      'Reviewed for HTTP status code hygiene, idempotency key guarantees, and schema completeness.',
    technologies: ['OpenAPI 3.1', 'FastAPI', 'gRPC', 'Swagger'],
    codeSnippet: `@app.post("/v1/telemetry/events", response_model=TelemetryResponse)
async def ingest_event(payload: TelemetryEvent):
    # Synthesized and verified by Claude API generator
    return await event_pipeline.dispatch(payload)`,
  },
  {
    id: 13,
    title: 'Capstone: Production Enterprise Copilot with Docker & Kubernetes',
    category: 'Production & Evals',
    difficulty: 'Advanced',
    summary:
      'The comprehensive graduation capstone: Build, containerize, and deploy a production-ready enterprise AI copilot with prompt caching, vector memory, MCP integrations, observability metrics, and automated mentor sign-off.',
    mentorRubric:
      'Comprehensive final code review by an industry senior AI mentor covering security, performance SLAs, test coverage, and documentation.',
    technologies: ['Docker', 'Kubernetes Helm', 'OpenTelemetry', 'Full Stack React & Python'],
    codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: claude-enterprise-agent-pod
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: agent-runtime
        image: dotrepo/claude-runtime:3.7`,
  },
];

interface ProjectsShowcase13Props {
  onEnrollNow: () => void;
}

export const ProjectsShowcase13: React.FC<ProjectsShowcase13Props> = ({ onEnrollNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem>(PROJECTS_DATA[0]);

  const categories = [
    { id: 'all', label: 'All 13 Projects' },
    { id: 'Agents', label: 'Autonomous Agents (4)' },
    { id: 'Tools & MCP', label: 'Tools & MCP (3)' },
    { id: 'RAG & Memory', label: 'RAG & Vector Memory (2)' },
    { id: 'Production & Evals', label: 'Production Ops & Evals (4)' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects-13" className="py-20 md:py-28 bg-[#0b0d17] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hands-on Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Ship 13 Real Projects with Claude.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            No toy tutorials or multiple-choice trivia. Every project is a production-ready application reviewed line-by-line by veteran AI engineers before you advance.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/25'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 2-Column Interactive Explorer */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-5 space-y-3 max-h-[680px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredProjects.map((proj) => {
              const isSelected = activeProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-neutral-800/90 border-amber-500/80 shadow-lg ring-1 ring-amber-500/40'
                      : 'bg-[#101322] border-neutral-800 hover:border-neutral-700 hover:bg-[#14172a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-700">
                      Project #{proj.id}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-semibold text-amber-400">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {proj.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-neutral-800/60">
                    <span className="text-neutral-500 font-medium">
                      Level: <strong className="text-neutral-300 font-semibold">{proj.difficulty}</strong>
                    </span>
                    <span className="text-blue-400 font-semibold flex items-center gap-1 group">
                      <span>View Rubric</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Inspector Card for Active Project */}
          <div className="lg:col-span-7 bg-[#111424] border border-neutral-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-800">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  Project #{activeProject.id} of 13
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeProject.title}
                </h3>
              </div>

              <button
                onClick={onEnrollNow}
                className="px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
              >
                Enroll to Build This
              </button>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold mb-2">
                Project Architecture Overview
              </h4>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {activeProject.summary}
              </p>
            </div>

            {/* What Your Mentor Reviews (Crucial Udacity differentiator) */}
            <div className="mt-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Mentor Code Review Criteria
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {activeProject.mentorRubric}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="mt-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold mb-2.5">
                Skills & Technologies Implemented
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-200 border border-neutral-700 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Production Code Snippet Preview */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-blue-400" />
                  <span>Production Code Sample</span>
                </span>
                <span className="text-[10px] text-neutral-500">Claude 3.7 API</span>
              </div>
              <div className="rounded-xl bg-[#080910] border border-neutral-800 p-4 font-mono text-xs text-neutral-300 overflow-x-auto">
                <pre className="text-emerald-300 leading-relaxed text-[11px] sm:text-xs">
                  {activeProject.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
