import React, { useState, useEffect } from 'react';
import {
  Bot,
  Cpu,
  Activity,
  Sparkles,
  Radio,
  Zap,
  ShieldCheck,
  CheckCircle2,
  GitCommit,
  Terminal,
  Play,
  Pause,
  ArrowUpRight,
  Workflow,
} from 'lucide-react';

interface AgentItem {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE' | 'PROCESSING' | 'SYNCED' | 'DISPATCHED';
  task: string;
  metric: string;
  iconBg: string;
  borderColor: string;
  tagColor: string;
}

const AGENTS: AgentItem[] = [
  {
    id: 'agent-1',
    name: 'Arch-Copilot',
    role: 'Autonomous Code Review',
    status: 'PROCESSING',
    task: 'Evaluating AST parsing & microservice concurrency for Sprint PR #38',
    metric: '99.4% precision',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500/30 shadow-emerald-500/10',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'agent-2',
    name: 'Sentinel-CI',
    role: 'Security & Container Audit',
    status: 'ACTIVE',
    task: 'Running live Docker container SBOM scan & zero-vulnerability audit',
    metric: '0 CVEs detected',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    borderColor: 'border-cyan-500/30 shadow-cyan-500/10',
    tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 'agent-3',
    name: 'Mentor-Pulse',
    role: 'Intern Real-time Guidance',
    status: 'DISPATCHED',
    task: 'Pairing new intern with Redis caching exercise & test suite roadmap',
    metric: 'Weekly Sprint #1',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    borderColor: 'border-blue-500/30 shadow-blue-500/10',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  },
  {
    id: 'agent-4',
    name: 'Vector-DataFlow',
    role: 'Embeddings & Pipeline Agent',
    status: 'SYNCED',
    task: 'Streaming 48,000 vector chunks across RAG knowledge base',
    metric: '18ms latency',
    iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    borderColor: 'border-purple-500/30 shadow-purple-500/10',
    tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  },
];

const LOG_MESSAGES = [
  '[mesh] Agent Arch-Copilot dispatched to review PR #1042',
  '[sentinel] AST security audit passed with zero warnings',
  '[mentor-pulse] Real-time session initialized for Bangalore cohort',
  '[vector-data] Ingesting vector embeddings: 100% indexed',
  '[system] Autonomous orchestration heartbeat synced: 14ms ping',
  '[mesh] Intern task automated verification: 5/5 assertions passed',
  '[sentinel] Cloud architecture configuration audited successfully',
];

export const HeroLiveAgents: React.FC = () => {
  const [activeAgentIndex, setActiveAgentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [liveLogs, setLiveLogs] = useState<string[]>([
    LOG_MESSAGES[0],
    LOG_MESSAGES[1],
    LOG_MESSAGES[2],
  ]);
  const [taskCount, setTaskCount] = useState<number>(1842);
  const [cycleProgress, setCycleProgress] = useState<number>(40);

  // Cycle through active agents every 3.5s
  useEffect(() => {
    if (!isPlaying) return;

    const agentInterval = setInterval(() => {
      setActiveAgentIndex((prev) => (prev + 1) % AGENTS.length);
      setTaskCount((prev) => prev + Math.floor(Math.random() * 3) + 1);

      // Append fresh random log
      setLiveLogs((prev) => {
        const nextLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        return [...prev.slice(-3), nextLog];
      });
    }, 3500);

    return () => clearInterval(agentInterval);
  }, [isPlaying]);

  // Smooth progress bar animation
  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setCycleProgress((prev) => (prev >= 100 ? 0 : prev + 2.5));
    }, 90);

    return () => clearInterval(progressInterval);
  }, [isPlaying]);

  const currentAgent = AGENTS[activeAgentIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none text-left">
      {/* Glow Ambient behind console */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-purple-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

      {/* Main Terminal Window */}
      <div className="relative rounded-2xl bg-neutral-950/90 border border-neutral-800 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-neutral-400 pl-2 border-l border-neutral-700/80 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>dotrepo-agent-swarm.mesh</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE</span>
            </span>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause telemetry stream' : 'Resume stream'}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="px-4 py-2.5 bg-neutral-900/40 border-b border-neutral-800/60 grid grid-cols-3 gap-2 text-center font-mono">
          <div className="border-r border-neutral-800/80 pr-2">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Agents Active</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <Cpu className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>4 / 4 Swarm</span>
            </div>
          </div>
          <div className="border-r border-neutral-800/80 pr-2">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Live Tasks</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
              {taskCount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Telemetry</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 flex items-center justify-center gap-1 mt-0.5">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>100% OK</span>
            </div>
          </div>
        </div>

        {/* Live Active Agent Spotlight */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center ${currentAgent.iconBg}`}
                >
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {currentAgent.name}
                  </h4>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold border ${currentAgent.tagColor}`}
                  >
                    {currentAgent.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">{currentAgent.role}</p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
              <Zap className="w-3 h-3 text-amber-400" />
              {currentAgent.metric}
            </span>
          </div>

          {/* Current Task Description */}
          <div className="mt-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Radio className="w-3 h-3 animate-pulse" />
                ACTIVE WORKFLOW
              </span>
              <span>AUTO-CYCLE</span>
            </div>
            <p className="text-xs text-neutral-200 font-medium leading-relaxed">
              {currentAgent.task}
            </p>

            {/* Micro Progress Bar */}
            <div className="mt-2.5 w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${cycleProgress}%` }}
              />
            </div>
          </div>

          {/* Agent Selector / Navigation Pills */}
          <div className="mt-3.5 grid grid-cols-4 gap-1.5">
            {AGENTS.map((agent, idx) => {
              const isActive = idx === activeAgentIndex;
              return (
                <button
                  key={agent.id}
                  onClick={() => {
                    setActiveAgentIndex(idx);
                    setCycleProgress(0);
                  }}
                  className={`px-2 py-2 rounded-lg text-left transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-neutral-800/90 border-emerald-500/50 shadow-sm'
                      : 'bg-neutral-900/40 border-neutral-800/70 hover:bg-neutral-800/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold truncate block ${
                        isActive ? 'text-emerald-300' : 'text-neutral-400'
                      }`}
                    >
                      {agent.name.split('-')[0]}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'
                      }`}
                    />
                  </div>
                  <span className="text-[9px] text-neutral-400 truncate block mt-0.5">
                    {agent.role.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Log Stream Terminal */}
          <div className="mt-4 pt-3 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
              <span className="flex items-center gap-1">
                <GitCommit className="w-3 h-3 text-cyan-400" />
                <span>Live Intern Stream Output</span>
              </span>
              <span className="text-emerald-400">Stream connected</span>
            </div>

            <div className="space-y-1 font-mono text-[11px] leading-tight overflow-hidden">
              {liveLogs.map((log, i) => (
                <div
                  key={`${i}-${log.slice(0, 10)}`}
                  className="flex items-start gap-1.5 text-neutral-300 transition-all duration-300 animate-fadeIn"
                >
                  <span className="text-emerald-500 font-bold select-none">&gt;</span>
                  <span className="truncate">{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info Strip */}
        <div className="px-4 py-2.5 bg-neutral-900/70 border-t border-neutral-800/70 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-neutral-300">Bangalore Mesh · Verified Pipeline</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Sync
          </span>
        </div>
      </div>
    </div>
  );
};
