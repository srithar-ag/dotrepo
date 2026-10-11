import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Code2,
  Terminal,
  MessageSquare,
  Sparkles,
  Bot,
  Layers,
  Cpu,
  CheckCircle2,
  Star,
  Clock,
  Award,
  ChevronRight,
  Play,
  RotateCcw,
} from 'lucide-react';

interface ClaudeHeroProps {
  onEnroll: () => void;
  onExploreProjects: () => void;
  onOpenSyllabus: () => void;
}

export const ClaudeHero: React.FC<ClaudeHeroProps> = ({
  onEnroll,
  onExploreProjects,
  onOpenSyllabus,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<string>('agent');

  // Agent execution loop simulation
  const simulationSteps = [
    {
      node: 'agent',
      label: 'Agent Planning',
      log: 'Reasoning: User requested full-stack multi-agent architecture with prompt caching...',
    },
    {
      node: 'code',
      label: 'Code Generation',
      log: 'Claude synthesizing Python MCP server + client bindings with type-safe schemas...',
    },
    {
      node: 'chat',
      label: 'Dialogue & Review',
      log: 'Mentor feedback agent validating test coverage & error handling at 99.4%...',
    },
    {
      node: 'ai',
      label: 'Model Inference',
      log: 'Claude 3.7 Sonnet streaming completion via Anthropic API (200k context window)...',
    },
  ];

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % simulationSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const currentStepInfo = simulationSteps[activeStep];

  return (
    <section className="relative overflow-hidden bg-[#090b14] text-white pt-10 pb-20 md:pt-16 md:pb-28 border-b border-neutral-800">
      {/* Background warm ambient amber/copper glow behind right side diagram */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[650px] lg:w-[850px] h-[550px] lg:h-[700px] bg-gradient-to-l from-amber-700/20 via-orange-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-amber-500/10 blur-[90px] pointer-events-none" />

      {/* Subtle tech coordinate grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Claude Branding & CTAs */}
          <div className="lg:col-span-6 z-10">
            {/* Claude Brand Attribution (Terracotta starburst mark + 'Claude') */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181216] border border-[#d97757]/30 shadow-sm">
                {/* Iconic Anthropic Claude 6-pointed sunburst star */}
                <svg
                  className="w-5 h-5 text-[#d97757] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C12.5523 2 13 2.44772 13 3V7.05L16.5711 3.47893C16.9616 3.08841 17.5948 3.08841 17.9853 3.47893C18.3758 3.86946 18.3758 4.50262 17.9853 4.89315L14.4142 8.46424L18.4642 8.46424C19.0165 8.46424 19.4642 8.91195 19.4642 9.46424C19.4642 10.0165 19.0165 10.4642 18.4642 10.4642L14.4142 10.4642L17.9853 14.0353C18.3758 14.4258 18.3758 15.059 17.9853 15.4495C17.5948 15.84 16.9616 15.84 16.5711 15.4495L13 11.8784V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11.8784L7.42893 15.4495C7.03841 15.84 6.40524 15.84 6.01472 15.4495C5.62419 15.059 5.62419 14.4258 6.01472 14.0353L9.58579 10.4642L5.53576 10.4642C4.98348 10.4642 4.53576 10.0165 4.53576 9.46424C4.53576 8.91195 4.98348 8.46424 5.53576 8.46424L9.58579 8.46424L6.01472 4.89315C5.62419 4.50262 5.62419 3.86946 6.01472 3.47893C6.40524 3.08841 7.03841 3.08841 7.42893 3.47893L11 7.05V3C11 2.44772 11.4477 2 12 2Z" />
                </svg>
                <span className="font-serif font-bold text-base tracking-tight text-white">
                  Claude
                </span>
                <span className="text-[10px] text-amber-300/80 font-mono pl-1 border-l border-neutral-700">
                  Anthropic Certified
                </span>
              </div>
            </div>

            {/* Giant Title: AI Engineering with Claude */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.03] text-balance">
              AI Engineering <br className="hidden sm:inline" />
              <span className="text-white">with Claude</span>
            </h1>

            {/* Subtitle from Screenshot */}
            <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl text-balance">
              Ship 13 real projects with Claude, get feedback from experienced mentors.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Enroll Now Button (Vibrant Blue with Rocket icon) */}
              <button
                onClick={onEnroll}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] active:bg-[#0047b3] text-white font-bold text-base transition-all shadow-xl hover:shadow-blue-500/30 cursor-pointer"
              >
                <Rocket className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span>Enroll Now</span>
              </button>

              {/* Secondary Syllabus Button */}
              <button
                onClick={onOpenSyllabus}
                className="px-6 py-3.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 hover:border-neutral-500 font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Full Syllabus</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Trust Badges & Highlights */}
            <div className="mt-10 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9/5</span>
                <span className="text-neutral-500">(3,400+ reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>3 Months · 10 hrs/wk</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-300 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Accenture Verified Certificate</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI AGENT Flow Diagram (Recreating the Screenshot's Visual) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* The Diagram Card Container */}
              <div className="relative rounded-3xl bg-[#0f111d]/90 border border-neutral-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Amber/warm copper circuit background decorative art */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <svg className="w-full h-full" viewBox="0 0 600 500" fill="none">
                    {/* Circuit lines */}
                    <path
                      d="M200 160 L320 160 L320 100 L440 100"
                      stroke="#d97757"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M260 220 L260 340 L160 340"
                      stroke="#ea580c"
                      strokeWidth="2"
                    />
                    <path
                      d="M360 220 L360 340 L460 340"
                      stroke="#d97757"
                      strokeWidth="2"
                    />
                    <path
                      d="M310 220 L310 380"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Header status bar inside the diagram */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[11px] text-neutral-300 font-semibold">
                      CLAUDE AGENT RUNTIME: ACTIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSimulating(!isSimulating)}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {isSimulating ? (
                        <>
                          <RotateCcw className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                          <span>Simulating</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>
                    <span className="font-mono text-[10px] text-neutral-500">v3.7 Sonnet</span>
                  </div>
                </div>

                {/* Central Interactive Circuit Nodes Area */}
                <div className="relative py-8 flex flex-col items-center justify-center min-h-[320px]">
                  {/* Top-Right Node: </> Code Interpreter */}
                  <div
                    onClick={() => setSelectedNode('code')}
                    className={`absolute top-0 right-4 sm:right-8 p-3.5 rounded-2xl border transition-all cursor-pointer z-20 ${
                      selectedNode === 'code' || currentStepInfo.node === 'code'
                        ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20 scale-105'
                        : 'bg-[#151828] border-neutral-700 text-neutral-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                        {'</>'}
                      </div>
                      <div className="text-left hidden sm:block">
                        <div className="text-[11px] font-mono font-bold text-neutral-200">
                          Code Execution
                        </div>
                        <div className="text-[9px] text-neutral-400">AST Debug & Tool Use</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Hero Center Node: 🤖 AI AGENT (Exactly as in screenshot!) */}
                  <div
                    onClick={() => setSelectedNode('agent')}
                    className={`relative z-20 px-6 py-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedNode === 'agent' || currentStepInfo.node === 'agent'
                        ? 'bg-[#1b1720] border-[#d97757] shadow-2xl shadow-[#d97757]/30 ring-2 ring-[#d97757]/40 scale-105'
                        : 'bg-[#141624] border-neutral-700 text-neutral-200 hover:border-[#d97757]/50'
                    }`}
                  >
                    {/* Decorative socket connectors on edges */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d97757] border-2 border-[#090b14]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ea580c] border-2 border-[#090b14]" />
                    <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#090b14]" />
                    <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#090b14]" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d97757]/30 to-amber-500/20 border border-[#d97757]/40 flex items-center justify-center text-[#d97757]">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400 block">
                          Autonomous
                        </span>
                        <span className="text-lg font-black tracking-tight text-white block">
                          AI AGENT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lower Node Left: AI Emblem */}
                  <div
                    onClick={() => setSelectedNode('ai')}
                    className={`absolute bottom-2 left-4 sm:left-10 p-3 rounded-2xl border transition-all cursor-pointer z-20 ${
                      selectedNode === 'ai' || currentStepInfo.node === 'ai'
                        ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                        : 'bg-[#151828] border-neutral-700 text-neutral-400 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs">
                        AI
                      </div>
                      <span className="text-[11px] font-mono font-medium hidden sm:inline">
                        Neural Core
                      </span>
                    </div>
                  </div>

                  {/* Lower Node Center: ☰ System Instructions */}
                  <div
                    onClick={() => setSelectedNode('rules')}
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 p-3 rounded-2xl border transition-all cursor-pointer z-20 ${
                      selectedNode === 'rules'
                        ? 'bg-amber-950/80 border-amber-400 text-amber-300'
                        : 'bg-[#151828] border-neutral-700 text-neutral-400 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span className="text-[11px] font-mono font-medium hidden sm:inline">
                        System Prompts
                      </span>
                    </div>
                  </div>

                  {/* Lower Node Right: 💬 Dialogue Flow */}
                  <div
                    onClick={() => setSelectedNode('chat')}
                    className={`absolute bottom-2 right-4 sm:right-10 p-3 rounded-2xl border transition-all cursor-pointer z-20 ${
                      selectedNode === 'chat' || currentStepInfo.node === 'chat'
                        ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                        : 'bg-[#151828] border-neutral-700 text-neutral-400 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span className="text-[11px] font-mono font-medium hidden sm:inline">
                        Reasoning Logs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Terminal Output at the Bottom of Diagram */}
                <div className="mt-4 pt-4 border-t border-neutral-800 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                    <span className="text-amber-400 font-bold">
                      [{currentStepInfo.label}]
                    </span>
                    <span className="text-neutral-500">Anthropic API Stream</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#07080f] border border-neutral-800 text-neutral-300 text-[11px] leading-relaxed break-words font-mono min-h-[48px] flex items-center">
                    <span className="text-emerald-400 mr-2">$</span>
                    <span>{currentStepInfo.log}</span>
                  </div>
                </div>
              </div>

              {/* Floating Floating Project Count Pill */}
              <div className="mt-4 flex items-center justify-between px-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Agent Sandboxes included in tuition</span>
                </span>
                <button
                  onClick={onExploreProjects}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <span>Explore all 13 Projects</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
