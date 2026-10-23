import React, { useState, useEffect, useRef } from 'react';
import {
  Copy,
  Check,
  Terminal,
  Shield,
  Zap,
  Database,
  Activity,
  Play,
  Maximize2,
  Minimize2,
  Cpu,
  Wifi,
  Radio,
  Lock,
} from 'lucide-react';

type CodeTab = 'matchmaking' | 'auth' | 'cloud-saves';

interface SnippetInfo {
  id: CodeTab;
  tabLabel: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  targetRuntime: string;
  code: string;
}

const SNIPPETS: SnippetInfo[] = [
  {
    id: 'matchmaking',
    tabLabel: '// 01. MATCHMAKER',
    title: 'Matchmaking',
    icon: <Zap className="w-3.5 h-3.5" />,
    subtitle: 'Low-latency skill & region-based queueing',
    targetRuntime: 'Node / WebGL / C++ / Unreal Engine 5.5',
    code: `// find a ranked match in ap-south (preview)
const spawn = new Spawn({ game: "your-game" });

const match = await spawn.match.find({
  mode: "ranked",
  region: "ap-south",
  maxPlayers: 10,
  tickRate: 64,
  ticketTTL: 45 // seconds
});

// match found: connect to dedicated server instance
await match.connect({ encryption: "tls-udp" });`,
  },
  {
    id: 'auth',
    tabLabel: '// 02. AUTH_GATE',
    title: 'Auth',
    icon: <Shield className="w-3.5 h-3.5" />,
    subtitle: 'Cross-platform credentials & anti-smurf verification',
    targetRuntime: 'Steam / Epic / PlayFab / OAuth2 PKCE',
    code: `// seamless cross-platform player authentication (preview)
const spawn = new Spawn({ game: "your-game" });

const session = await spawn.auth.verify({
  provider: "steam", // supports epic, playfab, apple, custom
  authToken: clientToken,
  hwidCheck: true
});

console.log("Verified player session:", session.playerId, session.elo);`,
  },
  {
    id: 'cloud-saves',
    tabLabel: '// 03. CLOUD_SAVES',
    title: 'Cloud saves',
    icon: <Database className="w-3.5 h-3.5" />,
    subtitle: 'Atomic state persistence with conflict resolution',
    targetRuntime: 'Atomic RocksDB / Distributed Key-Value Store',
    code: `// atomic cloud save sync with server validation (preview)
const spawn = new Spawn({ game: "your-game" });

await spawn.saves.sync({
  playerId: "usr_99182",
  checkpoint: "sector_07_boss_defeated",
  inventory: ["plasma_rifle", "shield_v2", "credits_4200"],
  integrityHash: clientHash
});`,
  },
];

interface LogEntry {
  id: string;
  time: string;
  tag: string;
  msg: string;
  color: string;
}

export const CodeExpandingPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CodeTab>('matchmaking');
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isEmulating, setIsEmulating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Live packet telemetry stream
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '12:14:01.082', tag: 'BOOT', msg: 'SPAWN_KERNEL v4.2 INIT [64-TICK]', color: '#3ff2c4' },
    { id: '2', time: '12:14:01.120', tag: 'NET', msg: 'UDP_SOCKET_OPEN -> port: 27015 (ap-south)', color: '#00f3ff' },
    { id: '3', time: '12:14:01.184', tag: 'PEER', msg: 'HOST_CONNECTED :: latency=18ms jitter=1.2ms', color: '#e4ff4a' },
    { id: '4', time: '12:14:01.240', tag: 'CIPHER', msg: 'CHACHA20_POLY1305 ENCRYPTION LOCKED', color: '#ff0055' },
    { id: '5', time: '12:14:01.312', tag: 'SYNC', msg: 'LOCKSTEP_HEARTBEAT 64.0Hz steady', color: '#3ff2c4' },
  ]);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll expanding interpolation
  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    let animFrame: number;
    let cur = 0;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;
      if (totalScrollable <= 0) return;

      const tgt = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      cur += (tgt - cur) * 0.14;
      setProgress(cur);
    };

    const loop = () => {
      onScroll();
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [prefersReducedMotion]);

  // Simulated live event logger
  useEffect(() => {
    if (prefersReducedMotion) return;

    const events = [
      { tag: 'ACK', msg: 'PACKET_INSPECT: match_id=mp_982b verified', color: '#00f3ff' },
      { tag: 'TICK', msg: 'DELTA_COMPRESSION: 120 bytes -> 34 bytes', color: '#3ff2c4' },
      { tag: 'NODE', msg: 'EDGE_RELAY: routing via mumbai_node_03', color: '#e4ff4a' },
      { tag: 'PING', msg: 'RTT_REFRESH: min=16ms avg=18.4ms', color: '#00f3ff' },
      { tag: 'BUFFER', msg: 'JITTER_BUFFER: 0 frames dropped (100% SLA)', color: '#3ff2c4' },
      { tag: 'SECURITY', msg: 'SERVER_AUTHORITY_CHECK: position verified', color: '#ff0055' },
    ];

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const randomEvt = events[Math.floor(Math.random() * events.length)];

      setLogs((prev) => [
        {
          id: Math.random().toString(),
          time: timeStr,
          tag: randomEvt.tag,
          msg: randomEvt.msg,
          color: randomEvt.color,
        },
        ...prev.slice(0, 18),
      ]);
    }, 2400);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmulate = () => {
    setIsEmulating(true);
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    setLogs((prev) => [
      {
        id: Math.random().toString(),
        time: timeStr,
        tag: 'EXEC',
        msg: `EXECUTE >> spawn.${activeTab}.run() [OK: 200]`,
        color: '#e4ff4a',
      },
      ...prev,
    ]);
    setTimeout(() => setIsEmulating(false), 1200);
  };

  return (
    <section
      ref={containerRef}
      id="devs"
      className="spawn-scale-container"
      style={{ '--p': isMaximized ? 1 : progress } as React.CSSProperties}
    >
      <div className="spawn-stick">
        {/* Cyberpunk Top Header Badge */}
        <div className="flex items-center gap-3 mb-3 z-10 select-none">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#050a1a] border border-[#00f3ff]/40 shadow-[0_0_20px_rgba(0,243,255,0.25)] text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-[#00f3ff] animate-pulse" />
            <span className="text-[#00f3ff] font-bold">DEV_KERNEL_V4</span>
            <span className="text-neutral-500">|</span>
            <span className="text-[#e4ff4a]">ARCHITECTURE EMULATOR</span>
            <span className="text-neutral-500">|</span>
            <span className="text-[#3ff2c4]">FULL_VIEWPORT_SCALING</span>
          </div>
        </div>

        {/* Fully Scalable, Space-Occupying Cyberpunk Cockpit Card */}
        <div className={`spawn-panel-box cyber-corner-bracket ${isMaximized ? '!w-[98vw] !h-[94vh]' : ''}`}>
          {/* Cyberpunk CRT Scanline Layer */}
          <div className="cyber-scanline absolute inset-0 z-20 pointer-events-none opacity-40" />

          {/* Top Mission Control Header */}
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-2.5 bg-[#050714] border-b border-[#00f3ff]/30 z-30 shrink-0 gap-3">
            {/* Left: Cyber Node Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff0055] animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e4ff4a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f3ff]" />
              </div>

              <div className="hidden md:flex items-center gap-2 pl-3 border-l border-neutral-800 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-[#00f3ff]" />
                <span className="text-white font-bold tracking-wider">
                  SPAWN_CORE.ts
                </span>
                <span className="text-[10px] text-[#3ff2c4] bg-[#3ff2c4]/10 px-2 py-0.5 rounded border border-[#3ff2c4]/20">
                  64Hz LOCKSTEP
                </span>
              </div>
            </div>

            {/* Center: Cyber Tab Switcher */}
            <div className="flex items-center gap-1.5 bg-[#03050c] p-1 rounded-xl border border-[#203055]">
              {SNIPPETS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#00f3ff] text-black shadow-[0_0_18px_rgba(0,243,255,0.7)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Actions (Emulate, Copy, Fullscreen) */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={handleEmulate}
                disabled={isEmulating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e4ff4a] hover:bg-[#d6f03d] text-black font-extrabold shadow-[0_0_15px_rgba(228,255,74,0.4)] transition-all cursor-pointer active:scale-95"
                title="Run test emulation"
              >
                <Play className={`w-3.5 h-3.5 ${isEmulating ? 'animate-spin' : ''}`} />
                <span>{isEmulating ? 'EMULATING...' : 'TEST RUN'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c142b] hover:bg-[#131f42] text-neutral-200 border border-[#28406a] hover:border-[#00f3ff]/60 transition-all cursor-pointer"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#3ff2c4]" />
                    <span className="text-[#3ff2c4] font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#00f3ff]" />
                    <span className="hidden sm:inline">COPY</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="hidden lg:flex items-center justify-center p-2 rounded-lg bg-[#0c142b] hover:bg-[#131f42] text-neutral-300 border border-[#28406a] hover:border-[#00f3ff]/60 transition-all cursor-pointer"
                title={isMaximized ? 'Restore View' : 'Maximize to 98vw'}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Multi-Pane Cockpit Body */}
          <div className="flex-1 flex overflow-hidden z-10 bg-[#02040b]">
            {/* Left Column: Edge Mesh Nodes & System Gauges (Desktop) */}
            <div className="w-72 hidden xl:flex flex-col border-r border-[#1a2542] bg-[#030612]/95 p-4 text-xs font-mono select-none overflow-y-auto shrink-0">
              <div className="flex items-center justify-between text-[11px] text-[#00f3ff] font-bold mb-3 pb-2 border-b border-[#1b2b48]">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>REGIONAL EDGE NODES</span>
                </div>
                <span className="text-neutral-500">RTT</span>
              </div>

              {/* Edge Node List */}
              <div className="space-y-2.5 mb-5">
                {[
                  { region: 'AP-SOUTH (Mumbai)', ping: '18 ms', health: 100, active: true },
                  { region: 'AP-NE (Tokyo)', ping: '38 ms', health: 99, active: false },
                  { region: 'EU-CENTRAL (Frankfurt)', ping: '72 ms', health: 100, active: false },
                  { region: 'US-EAST (Virginia)', ping: '98 ms', health: 98, active: false },
                ].map((node, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      node.active
                        ? 'bg-[#00f3ff]/10 border-[#00f3ff]/50 shadow-[0_0_12px_rgba(0,243,255,0.15)]'
                        : 'bg-[#060a1c] border-[#18233e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold ${node.active ? 'text-[#00f3ff]' : 'text-neutral-300'}`}>
                        {node.region}
                      </span>
                      <span className="text-[#e4ff4a] font-bold">{node.ping}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span>LOAD: {node.health}%</span>
                      <span className="text-[#3ff2c4] font-semibold">ONLINE</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hardware / Cluster Gauges */}
              <div className="mt-auto pt-3 border-t border-[#1b2b48] space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-[#3ff2c4]" />
                      <span>CLUSTER CPU</span>
                    </span>
                    <span className="text-[#3ff2c4] font-bold">14.8%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00f3ff] to-[#3ff2c4] w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-[#e4ff4a]" />
                      <span>THROUGHPUT</span>
                    </span>
                    <span className="text-[#e4ff4a] font-bold">4.82 GB/s</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#e4ff4a] to-[#ff0055] w-[64%]" />
                  </div>
                </div>

                <div className="text-[10px] text-neutral-500 pt-1 flex items-center justify-between">
                  <span>TLS 1.3 / AES-GCM</span>
                  <Lock className="w-3 h-3 text-[#3ff2c4]" />
                </div>
              </div>
            </div>

            {/* Center Column: Cyberpunk Syntax Code Viewer */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#02050f]/90">
              {/* Code Bar Info */}
              <div className="px-5 py-2.5 bg-[#040816] border-b border-[#14203a] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#00f3ff] font-semibold">{activeSnippet.subtitle}</span>
                <span className="text-[11px] text-neutral-400">
                  Target: <strong className="text-[#e4ff4a]">{activeSnippet.targetRuntime}</strong>
                </span>
              </div>

              {/* Code Lines Content */}
              <div className="flex-1 p-5 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed text-[#bfe9ff] selection:bg-[#00f3ff] selection:text-black">
                <pre className="whitespace-pre-wrap font-mono">
                  <code>
                    {activeSnippet.code.split('\n').map((line, idx) => (
                      <div key={idx} className="table-row group hover:bg-[#0a1532]/50 transition-colors">
                        <span className="table-cell pr-5 select-none text-neutral-600 text-xs text-right font-mono font-bold group-hover:text-[#00f3ff]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="table-cell">
                          {line.startsWith('//') ? (
                            <span className="text-[#6e7fa8] italic font-normal">{line}</span>
                          ) : (
                            line
                              .split(/(\b(?:const|new|await|import|from|async|return)\b|"(?:[^"\\]|\\.)*"|\b\d+\b)/g)
                              .map((token, tIdx) => {
                                if (/^(const|new|await|import|from|async|return)$/.test(token)) {
                                  return (
                                    <span
                                      key={tIdx}
                                      className="text-[#00f3ff] font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]"
                                    >
                                      {token}
                                    </span>
                                  );
                                }
                                if (/^"[^"]*"$/.test(token)) {
                                  return (
                                    <span
                                      key={tIdx}
                                      className="text-[#e4ff4a] font-medium drop-shadow-[0_0_6px_rgba(228,255,74,0.4)]"
                                    >
                                      {token}
                                    </span>
                                  );
                                }
                                if (/^\d+$/.test(token)) {
                                  return (
                                    <span key={tIdx} className="text-[#ff0055] font-bold">
                                      {token}
                                    </span>
                                  );
                                }
                                return <span key={tIdx}>{token}</span>;
                              })
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Bottom Notice in Code Pane */}
              <div className="px-5 py-2 bg-[#040816] border-t border-[#14203a] text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span className="text-neutral-500">
                  * Live interactive preview. Illustrative implementation pattern; no published SDK implied.
                </span>
                <span className="text-[#3ff2c4] font-bold hidden sm:inline">ZERO_BOILERPLATE</span>
              </div>
            </div>

            {/* Right Column: Cyber Telemetry Stream Log (Tablet & Desktop) */}
            <div className="w-80 hidden lg:flex flex-col border-l border-[#1a2542] bg-[#030612]/95 p-4 text-xs font-mono select-none overflow-hidden shrink-0">
              <div className="flex items-center justify-between text-[11px] text-[#e4ff4a] font-bold mb-3 pb-2 border-b border-[#1b2b48]">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#e4ff4a] animate-pulse" />
                  <span>PACKET STREAM // 64Hz</span>
                </div>
                <button
                  onClick={() => setLogs([])}
                  className="text-[10px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  CLEAR
                </button>
              </div>

              {/* Log Entries */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[11px]">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2 rounded bg-[#060a1c] border border-neutral-800/80 hover:border-[#00f3ff]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                      <span className="text-neutral-500">{log.time}</span>
                      <span
                        className="px-1.5 py-0.2 rounded font-bold text-[9px] uppercase"
                        style={{ color: log.color, backgroundColor: `${log.color}15` }}
                      >
                        {log.tag}
                      </span>
                    </div>
                    <div className="text-neutral-200 break-all leading-tight">
                      {log.msg}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Concurrency Counter */}
              <div className="mt-auto pt-3 border-t border-[#1b2b48]">
                <div className="p-2.5 rounded-lg bg-[#00f3ff]/10 border border-[#00f3ff]/30 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-neutral-400 block text-[9px]">PEER CONCURRENCY</span>
                    <span className="text-white font-extrabold text-sm">142,890 / 250K</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#00f3ff] animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Cyberpunk Diagnostics Bar */}
          <div className="px-4 sm:px-6 py-2 bg-[#02040a] border-t border-[#00f3ff]/30 text-[11px] font-mono text-neutral-400 flex flex-wrap items-center justify-between gap-3 shrink-0 z-30">
            <div className="flex items-center gap-3">
              <span className="text-[#00f3ff] font-bold">STATUS: NOMINAL</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-300">TICK_RATE: 64.00 HZ</span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-[#3ff2c4] hidden sm:inline">ZERO BUFFER BLOAT</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-500 text-[10px]">
              <span>CLUSTER: HYPER_MESH_V4</span>
              <span>·</span>
              <span className="text-[#e4ff4a]">SCROLL DRIVEN EXPANSION</span>
            </div>
          </div>
        </div>

        {/* Scroll Instruction Caption */}
        <p className="text-center text-xs font-mono text-neutral-400 mt-4 max-w-xl transition-opacity duration-300">
          <span className="text-[#00f3ff]">▲ Scroll to expand terminal</span> · Backend building blocks for developers, so you spend your time on gameplay.
        </p>
      </div>
    </section>
  );
};
