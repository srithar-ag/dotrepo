import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SimulatedPlayer {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  ping: number;
  role: string;
}

export const HeroCursorPlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Visitor (Host) Cursor position in percentage [0..100]
  const [visitorPos, setVisitorPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Telemetry state
  const [latency, setLatency] = useState(18);
  const [tick, setTick] = useState(148290);
  const [packetRate, setPacketRate] = useState(64);

  // Simulated other players
  const playersRef = useRef<SimulatedPlayer[]>([
    { id: 'p1', name: 'NovaKid', x: 28, y: 34, vx: 0.18, vy: 0.12, color: '#1ea0ff', ping: 14, role: 'Client' },
    { id: 'p2', name: 'ByteWolf', x: 74, y: 40, vx: -0.14, vy: 0.22, color: '#3ff2c4', ping: 22, role: 'Client' },
    { id: 'p3', name: 'Kiara_X', x: 62, y: 78, vx: -0.20, vy: -0.16, color: '#a855f7', ping: 19, role: 'Client' },
    { id: 'p4', name: 'Zen0', x: 22, y: 72, vx: 0.15, vy: -0.18, color: '#ff9f1c', ping: 26, role: 'Client' },
  ]);

  const [, setRenderTick] = useState(0);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track visibility with IntersectionObserver to save resources
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main simulation loop (60fps)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTickTime = performance.now();
    let tickCount = 148290;

    const loop = (now: number) => {
      if (isVisibleRef.current) {
        // Update tick count (~64 Hz)
        if (now - lastTickTime >= 15.6) {
          tickCount += 1;
          setTick(tickCount);
          lastTickTime = now;
        }

        // Simulate subtle jitter on latency
        if (Math.random() < 0.05) {
          setLatency(Math.floor(16 + Math.random() * 6));
          setPacketRate(63 + (Math.random() > 0.5 ? 1 : 0));
        }

        // Update simulated players physics
        const players = playersRef.current;
        for (let i = 0; i < players.length; i++) {
          const p = players[i];
          p.x += p.vx;
          p.y += p.vy;

          // Bounce gently within boundaries [8..92%]
          if (p.x <= 8) {
            p.x = 8;
            p.vx = Math.abs(p.vx);
          } else if (p.x >= 92) {
            p.x = 92;
            p.vx = -Math.abs(p.vx);
          }

          if (p.y <= 12) {
            p.y = 12;
            p.vy = Math.abs(p.vy);
          } else if (p.y >= 88) {
            p.y = 88;
            p.vy = -Math.abs(p.vy);
          }

          // Subtle steering drift
          if (Math.random() < 0.02) {
            p.vx += (Math.random() - 0.5) * 0.08;
            p.vy += (Math.random() - 0.5) * 0.08;
            // Cap max speed
            const speed = Math.hypot(p.vx, p.vy);
            if (speed > 0.4) {
              p.vx = (p.vx / speed) * 0.35;
              p.vy = (p.vy / speed) * 0.35;
            }
          }
        }

        setRenderTick((t) => (t + 1) % 10000);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [prefersReducedMotion]);

  // Pointer position tracker (mouse or touch)
  const handlePointer = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(8, Math.min(92, ((clientY - rect.top) / rect.height) * 100));
    setVisitorPos({ x, y });
    setHasInteracted(true);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointer(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className="relative w-full h-[380px] sm:h-[420px] lg:h-[460px] rounded-3xl border border-[#232838] bg-[#050814]/90 overflow-hidden shadow-2xl backdrop-blur-md select-none group"
      role="region"
      aria-label="Live multiplayer cursor arena and telemetry HUD"
    >
      {/* Subtle Arena Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1ea0ff 1px, transparent 1px), linear-gradient(to bottom, #1ea0ff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Arena Center Reticle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#1ea0ff]/10 pointer-events-none flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-[#3ff2c4]/15" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#1ea0ff]/30" />
      </div>

      {/* Top HUD Bar */}
      <div className="absolute top-0 inset-x-0 px-4 py-3 border-b border-[#232838]/80 bg-[#080d1e]/85 backdrop-blur-sm flex flex-wrap items-center justify-between gap-2 text-xs font-mono z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3ff2c4] animate-ping" />
            <span className="text-[#3ff2c4] font-bold">LIVE SESSION</span>
          </div>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-300">ap-south-1 (Mumbai)</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-300">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">RTT:</span>
            <span className="text-[#e4ff4a] font-bold">{latency} ms</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-neutral-500">Tick:</span>
            <span className="text-[#3ff2c4]">{packetRate}Hz (#{tick.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#141b33] px-2.5 py-0.5 rounded-full border border-[#28406a]">
            <span className="text-neutral-400">Players:</span>
            <span className="text-white font-bold">5/8</span>
          </div>
        </div>
      </div>

      {/* Simulated Connection Lines (Subtle packet mesh) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {playersRef.current.map((p) => (
          <line
            key={`line-${p.id}`}
            x1={`${visitorPos.x}%`}
            y1={`${visitorPos.y}%`}
            x2={`${p.x}%`}
            y2={`${p.y}%`}
            stroke="rgba(30, 160, 255, 0.12)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Simulated Other Players */}
      {playersRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none transition-transform duration-75 ease-out z-10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Player Dot */}
          <div className="relative flex items-center justify-center">
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 16px ${p.color}`,
              }}
            />
            <div
              className="absolute -inset-1 rounded-full animate-ping opacity-40"
              style={{ backgroundColor: p.color }}
            />
          </div>

          {/* Player Nametag */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded bg-[#0b1022]/90 border border-[#232838] shadow-md backdrop-blur-sm whitespace-nowrap">
            <span className="text-[11px] font-mono font-semibold" style={{ color: p.color }}>
              {p.name}
            </span>
            <span className="text-[9px] font-mono text-neutral-400">
              {p.ping}ms
            </span>
          </div>
        </div>
      ))}

      {/* Visitor (Host) Cursor Node */}
      <div
        className="absolute pointer-events-none transition-transform duration-75 ease-out z-20"
        style={{
          left: `${visitorPos.x}%`,
          top: `${visitorPos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Core Glowing Dot */}
          <div className="w-5 h-5 rounded-full bg-[#e4ff4a] shadow-[0_0_24px_rgba(228,255,74,0.9)] border-2 border-black" />
          <div className="absolute -inset-2 rounded-full border border-[#e4ff4a]/60 animate-ping" />
        </div>

        {/* Visitor Nametag */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#000000]/95 border border-[#e4ff4a]/80 shadow-2xl backdrop-blur-sm whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff4a] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#e4ff4a]">
            You (Host)
          </span>
          <span className="text-[10px] font-mono text-[#3ff2c4]">
            AUTH_VERIFIED
          </span>
        </div>
      </div>

      {/* Bottom Status / Instructions */}
      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#090d1c]/80 px-2.5 py-1 rounded-full border border-[#232838]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1ea0ff]" />
          <span>
            {hasInteracted
              ? 'Multiplayer State Syncing (UDP Client-side Simulation)'
              : 'Hover / Touch to navigate your cursor node in real-time'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500">
          <span>64-tick lockstep state</span>
          <span>·</span>
          <span>0 packet loss</span>
        </div>
      </div>
    </div>
  );
};
