import React, { useState, useRef, useEffect } from 'react';
import {
  Gamepad2,
  Server,
  Cloud,
  Cpu,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowUpRight,
  Activity,
  Maximize2,
  X,
  Code2,
  Boxes,
  MonitorSmartphone,
  Gauge,
  Workflow,
  Radio,
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  audience: 'For studios' | 'For developers' | 'For both';
  audienceColor: string;
  badgeBg: string;
  oneLiner: string;
  deepDescription: string;
  icon: React.ReactNode;
  bullets: string[];
  tags: string[];
  gridClass: string;
  // Deep dive architectural details
  specs: { label: string; value: string; highlight?: boolean }[];
  deliverables: string[];
  techStack: string[];
  liveMetric: { label: string; value: string; change: string; icon: React.ReactNode };
  // Ambient video or canvas visual theme
  videoTheme: 'game-engine' | 'network-mesh' | 'cloud-servers' | 'neural-ai' | 'esports-arena';
  videoUrl: string;
  fallbackGradient: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: 'game-dev',
    title: 'Game development',
    audience: 'For studios',
    audienceColor: 'text-[#e4ff4a] border-[#e4ff4a]/50',
    badgeBg: 'bg-[#e4ff4a]/15',
    oneLiner: 'Full-cycle production from initial proof-of-concept to global multi-platform release.',
    deepDescription:
      'We partner with gaming studios and publishers as a dedicated development strike team. From physics-based 3D mechanics in Unreal Engine 5 to cross-platform mobile titles in Flutter and WebGL browser simulations, we compress multi-year production cycles into agile sprint cadences.',
    icon: <Gamepad2 className="w-6 h-6 text-[#e4ff4a]" />,
    bullets: [
      'Unity, Unreal and Godot builds',
      'Mobile (Flutter and React Native), WebGL and hyper-casual',
      'Prototyping and MVP in weeks',
    ],
    tags: ['Unity 6', 'Unreal Engine 5.5', 'Godot 4.3', 'WebGL 2.0', 'Flutter', 'React Native', 'Rapid Prototyping'],
    gridClass: 'lg:col-span-7',
    specs: [
      { label: 'Target Frame Rate', value: '60 - 120 FPS Locked', highlight: true },
      { label: 'Delivery Model', value: 'Sprint-based milestone releases' },
      { label: 'Platforms', value: 'PC / Mobile / Console / WebGL' },
      { label: 'Asset Pipeline', value: 'PBR Textures + LOD Optimization' },
    ],
    deliverables: [
      'Fully playable prototype with core mechanics in 2-3 weeks',
      'Production-ready client builds for iOS App Store & Google Play',
      'Optimized WebGL bundle under 15MB for zero-install instant play',
      'Integrated physics, custom shader pipelines, and audio mixing',
    ],
    techStack: ['Unreal Engine 5.5', 'Unity 6.0', 'Godot 4.3', 'C# / C++', 'TypeScript', 'HLSL / GLSL'],
    liveMetric: {
      label: 'BENCHMARK RENDER',
      value: '120.0 FPS',
      change: '0 Frame Drops',
      icon: <Gauge className="w-4 h-4 text-[#e4ff4a]" />,
    },
    videoTheme: 'game-engine',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-and-neon-lights-42998-large.mp4',
    fallbackGradient: 'from-amber-950/40 via-blue-950/30 to-black',
  },
  {
    id: 'backend',
    title: 'Backend for games',
    audience: 'For developers',
    audienceColor: 'text-[#1ea0ff] border-[#1ea0ff]/50',
    badgeBg: 'bg-[#1ea0ff]/15',
    oneLiner: 'Ultra-low latency game state synchronization and resilient player state infrastructure.',
    deepDescription:
      'Server-authoritative backend infrastructure built specifically for multiplayer speed. We eliminate client-side state manipulation with deterministic tick loops, zero-allocation serialization, and geo-distributed match routing.',
    icon: <Server className="w-6 h-6 text-[#1ea0ff]" />,
    bullets: [
      'Auth and player profiles',
      'Matchmaking and lobbies',
      'Real-time multiplayer (WebSockets or UDP)',
      'Leaderboards, cloud saves, and inventory and economy',
      'Anti-cheat and server-side validation',
    ],
    tags: ['Auth & Sessions', 'Elo Matchmaking', 'UDP / WebSockets', 'Cloud Saves', 'Leaderboards', 'Anti-cheat'],
    gridClass: 'lg:col-span-5 lg:mt-6',
    specs: [
      { label: 'Server Tick Rate', value: '64 - 128 Hz Dedicated', highlight: true },
      { label: 'Median Latency', value: '<18 ms Intra-Region' },
      { label: 'Serialization', value: 'Binary Protobuf / FlatBuffers' },
      { label: 'State Authority', value: '100% Server Authoritative' },
    ],
    deliverables: [
      'Cross-platform player credentials with Steam, Epic & Apple sign-in',
      'Skill-based Elo/Glicko2 matchmaking with dynamic ping clustering',
      'High-throughput WebSocket and UDP packet relays with delta compression',
      'Atomic server-validated transaction engine for game economies and inventory',
    ],
    techStack: ['Node.js', 'Go / C++', 'WebSockets', 'UDP / ENet', 'Redis Streams', 'PostgreSQL'],
    liveMetric: {
      label: 'STATE SYNC TICK',
      value: '64.00 Hz',
      change: '15.6ms delta',
      icon: <Activity className="w-4 h-4 text-[#1ea0ff]" />,
    },
    videoTheme: 'network-mesh',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4',
    fallbackGradient: 'from-blue-950/40 via-cyan-950/30 to-black',
  },
  {
    id: 'live-ops',
    title: 'Live-ops and cloud',
    audience: 'For both',
    audienceColor: 'text-[#3ff2c4] border-[#3ff2c4]/50',
    badgeBg: 'bg-[#3ff2c4]/15',
    oneLiner: 'Battle-tested cloud infrastructure that autoscales from launch day spikes to steady state.',
    deepDescription:
      'Keep your game servers alive and healthy 24/7/365. We manage autoscaling dedicated game server clusters on Kubernetes and Agones, coordinate global multi-CDN patch deliveries, and monitor stack telemetry before crashes hit players.',
    icon: <Cloud className="w-6 h-6 text-[#3ff2c4]" />,
    bullets: [
      'Autoscaling game servers',
      'CI/CD for game builds',
      'CDN for assets and patches',
      'Monitoring and crash reporting',
    ],
    tags: ['Agones / K8s', 'Zero-Downtime CI/CD', 'Global Asset CDN', 'Crash Telemetry', 'Auto-Healing'],
    gridClass: 'lg:col-span-5',
    specs: [
      { label: 'Autoscale Speed', value: '0 -> 5,000 pods in <45s', highlight: true },
      { label: 'CDN Edge Nodes', value: '280+ Global PoPs' },
      { label: 'Crash Capture', value: 'Symbolicated stack traces' },
      { label: 'Uptime SLA', value: '99.99% Availability' },
    ],
    deliverables: [
      'Automated containerized CI/CD build matrix producing cross-platform binaries',
      'High-speed global patch distribution CDN with differential chunk caching',
      'Real-time observability dashboards with memory leak & packet loss alerts',
      'Automatic fleet scaling based on concurrent player queue pressure',
    ],
    techStack: ['Kubernetes', 'Agones', 'Docker', 'Cloudflare Workers', 'Prometheus', 'Grafana'],
    liveMetric: {
      label: 'FLEET CONCURRENCY',
      value: '250,000',
      change: '99.99% Uptime',
      icon: <Workflow className="w-4 h-4 text-[#3ff2c4]" />,
    },
    videoTheme: 'cloud-servers',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-sci-fi-tunnel-42999-large.mp4',
    fallbackGradient: 'from-teal-950/40 via-emerald-950/30 to-black',
  },
  {
    id: 'data-ai',
    title: 'Data and AI for games',
    audience: 'For both',
    audienceColor: 'text-[#3ff2c4] border-[#3ff2c4]/50',
    badgeBg: 'bg-[#3ff2c4]/15',
    oneLiner: 'Intelligent player telemetry, adaptive NPC systems, and live retention optimization.',
    deepDescription:
      'Bring modern machine learning into game production. We build streaming telemetry pipelines to ingest player event data in real time, forecast churn probabilities, and implement LLM & neural decision tree systems for believable procedural NPCs.',
    icon: <Cpu className="w-6 h-6 text-[#3ff2c4]" />,
    bullets: [
      'Telemetry pipelines and player analytics',
      'Churn and retention prediction',
      'AI NPCs and procedural content',
      'A/B testing for monetization',
    ],
    tags: ['Streaming Telemetry', 'Retention Machine Learning', 'Procedural NPCs', 'Live A/B Testing'],
    gridClass: 'lg:col-span-7 lg:-mt-6',
    specs: [
      { label: 'Event Ingestion', value: '1.2M events / sec', highlight: true },
      { label: 'NPC Inference', value: '<25ms on-device/edge' },
      { label: 'A/B Experimentation', value: 'Dynamic server-side flag routing' },
      { label: 'Retention Model', value: 'Predictive churn classification' },
    ],
    deliverables: [
      'Event tracking SDK integration capturing player deaths, session time, and economy flow',
      'Predictive churn ML model alerting community managers to at-risk player cohorts',
      'Procedural dialogue and behavior trees for dynamic in-game NPC interactions',
      'Multi-variant pricing and reward A/B testing infrastructure',
    ],
    techStack: ['Python', 'PyTorch / ONNX', 'Apache Kafka', 'DuckDB / ClickHouse', 'Gemini Models'],
    liveMetric: {
      label: 'AI INFERENCE TIME',
      value: '18.4 ms',
      change: '1.2M Evt/sec',
      icon: <Zap className="w-4 h-4 text-[#3ff2c4]" />,
    },
    videoTheme: 'neural-ai',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-42997-large.mp4',
    fallbackGradient: 'from-purple-950/40 via-blue-950/30 to-black',
  },
  {
    id: 'esports',
    title: 'Esports and tournaments',
    audience: 'For both',
    audienceColor: 'text-[#e4ff4a] border-[#e4ff4a]/50',
    badgeBg: 'bg-[#e4ff4a]/15',
    oneLiner: 'High-concurrency tournament software and on-ground broadcast server operations.',
    deepDescription:
      'Turn competitive games into community spectacles. We build custom tournament platforms with automated bracket seeding, real-time live spectator scoring relays, anti-cheat validation for cash cups, and broadcast-ready overlays.',
    icon: <Trophy className="w-6 h-6 text-[#e4ff4a]" />,
    bullets: [
      'Bracket and tournament platforms',
      'Event infrastructure',
    ],
    tags: ['Single & Double Elimination', 'Swiss Rounds', 'Live Broadcast Overlays', 'Campus Tournaments', 'Anti-DDoS'],
    gridClass: 'lg:col-span-12',
    specs: [
      { label: 'Bracket Types', value: 'Single / Double Elim / Swiss / Round-Robin', highlight: true },
      { label: 'Concurrent Players', value: 'Up to 64,000 tournament participants' },
      { label: 'Broadcast Feed', value: 'WebSocket OBS Data Overlay Feed' },
      { label: 'Integrity', value: 'Automated Match VOD & Replay Verification' },
    ],
    deliverables: [
      'Custom white-label tournament portal with team check-in and automated Discord bot integration',
      'Low-latency spectator server relays streaming match telemetry to stream broadcast graphics',
      'Dispute resolution center with match screenshot / demo file upload and audit logs',
      'On-site LAN server appliance configuration for zero-lag physical campus arena finals',
    ],
    techStack: ['WebSocket Relays', 'OBS Web Overlays', 'Redis', 'Node.js', 'PostgreSQL'],
    liveMetric: {
      label: 'BRACKET SEEDING',
      value: 'Instantaneous',
      change: '64K Teams Max',
      icon: <Trophy className="w-4 h-4 text-[#e4ff4a]" />,
    },
    videoTheme: 'esports-arena',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-and-neon-lights-42998-large.mp4',
    fallbackGradient: 'from-amber-950/40 via-purple-950/30 to-black',
  },
];

type AudienceFilter = 'all' | 'studios' | 'developers' | 'both';

export const WhatWeBuildSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<AudienceFilter>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Mouse spotlight position tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    setHoveredCard(cardId);
  };

  const filteredServices = SERVICES.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'studios') return s.audience === 'For studios' || s.audience === 'For both';
    if (activeFilter === 'developers') return s.audience === 'For developers' || s.audience === 'For both';
    if (activeFilter === 'both') return s.audience === 'For both';
    return true;
  });

  return (
    <section id="studios" className="py-24 sm:py-36 relative overflow-hidden bg-black select-none">
      {/* Background Cyberpunk Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-[#2b3cff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-[#3ff2c4]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Audience Filter Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#1b2540]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1ea0ff] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#1ea0ff] font-bold">
                DotRepo Spawn · Engineering & Production Capabilities
              </span>
            </div>
            <h2 className="spawn-disp text-4xl sm:text-6xl lg:text-7xl">
              <span className="spawn-grad">What We Build</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Explore our full-stack gaming practice. Whether you need a game development partner to ship your next commercial release or scalable multiplayer backend systems, every service is engineered for zero-compromise performance.
            </p>
          </div>

          {/* Interactive Audience Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#070b1c] border border-[#23315a] shrink-0 self-start lg:self-end">
            {[
              { id: 'all', label: 'All Services (5)' },
              { id: 'studios', label: 'For Studios' },
              { id: 'developers', label: 'For Developers' },
              { id: 'both', label: 'Cross-Discipline' },
            ].map((f) => {
              const isSelected = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as AudienceFilter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1ea0ff] text-black shadow-[0_0_20px_rgba(30,160,255,0.6)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Staggered Grid with High-Tech Spotlight Effect & Blurred Video Backgrounds */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {filteredServices.map((s) => (
            <article
              key={s.id}
              onMouseMove={(e) => handleMouseMove(e, s.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative rounded-[28px] border border-[#1b2540] hover:border-[#1ea0ff]/80 transition-all duration-300 overflow-hidden flex flex-col p-6 sm:p-8 bg-[#050713]/90 shadow-2xl backdrop-blur-md group ${s.gridClass}`}
              style={{
                backgroundImage: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(30, 160, 255, 0.12), transparent 80%)`,
              }}
            >
              {/* Blurred Ambient Gaming Video Background (Subtle Motion Layer) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 group-hover:opacity-40 transition-opacity duration-700">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter blur-[3px] scale-105"
                  poster={`https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80`}
                >
                  <source src={s.videoUrl} type="video/mp4" />
                </video>
                <div className={`absolute inset-0 bg-gradient-to-t ${s.fallbackGradient} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Top Meta Bar: Icon, Title & Audience Tag */}
              <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-black/70 border border-[#23315a] group-hover:border-[#1ea0ff]/60 group-hover:shadow-[0_0_20px_rgba(30,160,255,0.3)] transition-all">
                    {s.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                      SERVICE CLUSTER // {s.id.toUpperCase()}
                    </span>
                    <h3 className="spawn-disp text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#3ff2c4] transition-colors">
                      {s.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-mono px-3 py-1 rounded-full border shrink-0 font-bold backdrop-blur-sm ${s.badgeBg} ${s.audienceColor}`}
                >
                  {s.audience}
                </span>
              </div>

              {/* Clean One-Liner */}
              <p className="relative z-10 text-sm text-neutral-300 mb-6 font-normal leading-relaxed">
                {s.oneLiner}
              </p>

              {/* Explicit Required Services (Clean List with Checkmarks) */}
              <div className="relative z-10 space-y-2.5 mb-6 bg-black/50 p-4 rounded-2xl border border-[#1b2540]">
                {s.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#3ff2c4] shrink-0 mt-0.5" />
                    <span className="font-medium">{b}</span>
                  </div>
                ))}
              </div>

              {/* Live Metric Ticker inside Card */}
              <div className="relative z-10 mb-6 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#090d20]/80 border border-[#202e52] text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-400">
                  {s.liveMetric.icon}
                  <span className="text-[11px]">{s.liveMetric.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{s.liveMetric.value}</span>
                  <span className="text-[10px] text-[#3ff2c4] bg-[#3ff2c4]/10 px-1.5 py-0.5 rounded">
                    {s.liveMetric.change}
                  </span>
                </div>
              </div>

              {/* Interactive Inspect Architecture CTA + Pill Tags */}
              <div className="relative z-10 mt-auto pt-4 border-t border-[#1b2540] flex flex-wrap items-center justify-between gap-3">
                <ul className="flex flex-wrap gap-1.5">
                  {s.tags.slice(0, 4).map((t, tIdx) => (
                    <li
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#0c1228]/80 border border-[#23315a] text-neutral-300"
                    >
                      {t}
                    </li>
                  ))}
                  {s.tags.length > 4 && (
                    <li className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                      +{s.tags.length - 4} more
                    </li>
                  )}
                </ul>

                <button
                  onClick={() => setActiveModalService(s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141d3d] hover:bg-[#1ea0ff] text-[#1ea0ff] hover:text-black font-mono font-bold text-xs transition-all cursor-pointer group/btn"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Architecture Modal Deep Dive */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#070b1a] border border-[#1ea0ff]/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(30,160,255,0.25)] text-left select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[#1b2540]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-black border border-[#1ea0ff]/40">
                  {activeModalService.icon}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1ea0ff] font-bold">
                    SPECIFICATION BREAKDOWN // {activeModalService.audience}
                  </span>
                  <h3 className="spawn-disp text-3xl sm:text-4xl text-white">
                    {activeModalService.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveModalService(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Close specifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Deep Description */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              {activeModalService.deepDescription}
            </p>

            {/* Architectural Specifications Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-[#3ff2c4] font-bold mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                <span>BENCHMARK SPECIFICATIONS</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {activeModalService.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-[#030612] border border-[#1d2b4f] flex flex-col justify-between"
                  >
                    <span className="text-neutral-500 text-[10px] uppercase">{spec.label}</span>
                    <span
                      className={`font-bold mt-1 text-sm ${
                        spec.highlight ? 'text-[#e4ff4a]' : 'text-neutral-200'
                      }`}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-[#1ea0ff] font-bold mb-3 flex items-center gap-2">
                <Boxes className="w-3.5 h-3.5" />
                <span>ENGINEERING DELIVERABLES</span>
              </h4>
              <div className="space-y-2">
                {activeModalService.deliverables.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl bg-[#090d22]/80 border border-[#1b2540] flex items-start gap-2.5 text-xs text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#3ff2c4] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Tags */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase text-neutral-400 font-bold mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#e4ff4a]" />
                <span>PRIMARY ENGINE & CLOUD STACK</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalService.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full bg-[#0a122e] border border-[#233560] text-xs font-mono text-[#3ff2c4] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-[#1b2540] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400">
                Ready to review project scope? Blueprints returned in 24 hours.
              </span>
              <a
                href="#loadout"
                onClick={() => setActiveModalService(null)}
                className="spawn-btn text-xs py-2.5 px-5"
              >
                <span>Add to Loadout</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
