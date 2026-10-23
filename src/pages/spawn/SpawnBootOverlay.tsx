import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wifi, Zap, Cpu, Radio, Check, ChevronRight } from 'lucide-react';

interface BootStep {
  text: string;
  tag: string;
  color: string;
  detail?: string;
}

const BOOT_LOGS: BootStep[] = [
  { tag: 'BIOS', text: 'SPAWN_CORE v4.2 KERNEL POST: OK', color: '#00f3ff', detail: '32 CORES ARMED' },
  { tag: 'MEM', text: 'ALLOCATING HEAP: 0x0000 -> 0xFFFF', color: '#3ff2c4', detail: '16384 MB LOCKED' },
  { tag: 'NET', text: 'OPENING UDP/WEBSOCKET RELAYS', color: '#e4ff4a', detail: 'PORT 27015 BIND' },
  { tag: 'GEO', text: 'CONNECTING REGIONAL MESH: AP-SOUTH', color: '#00f3ff', detail: 'RTT 18.2ms' },
  { tag: 'SEC', text: 'ENGAGING CHACHA20-POLY1305 CIPHER', color: '#ff0055', detail: 'TLS 1.3 SECURE' },
  { tag: 'TICK', text: 'CALIBRATING 64.00 HZ TICK CLOCK', color: '#3ff2c4', detail: '15.6ms DELTA' },
  { tag: 'GPU', text: 'COMPILING SHADER PIPELINE', color: '#e4ff4a', detail: 'UNREAL 5.5 / WEBGL 2' },
  { tag: 'SYS', text: 'ALL SUBSYSTEMS NOMINAL · READY', color: '#00f3ff', detail: 'ARENA ENGAGED' },
];

interface SpawnBootOverlayProps {
  onComplete?: () => void;
}

export const SpawnBootOverlay: React.FC<SpawnBootOverlayProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [hexAddress, setHexAddress] = useState('0x0000');

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    // Step sequence timer
    const stepDuration = 220;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          const next = prev + 1;
          const nextProgress = Math.round(((next + 1) / BOOT_LOGS.length) * 100);
          setProgress(nextProgress);
          setHexAddress(`0x${(next * 0x1024 + 0x04a2).toString(16).toUpperCase()}`);
          return next;
        } else {
          clearInterval(interval);
          setProgress(100);
          setHexAddress('0x7FFF');
          // Start fade out after all logs complete
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsDone(true);
              if (onComplete) onComplete();
            }, 600);
          }, 350);
          return prev;
        }
      });
    }, stepDuration);

    // Keyboard listener to skip boot sequence
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prefersReducedMotion, onComplete]);

  const skipBoot = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 200);
  };

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#03050d] text-white p-4 sm:p-8 font-mono select-none overflow-hidden transition-all duration-700 ease-out ${
        isFading
          ? 'opacity-0 scale-105 pointer-events-none filter blur-sm'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Cyber CRT Scanline Overlay */}
      <div className="cyber-scanline absolute inset-0 z-0 pointer-events-none opacity-40" />

      {/* Cyber Grid Lines Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f3ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f3ff0d_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Radial Neon Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f3ff]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Cyber Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#00f3ff]/30 pb-4">
        {/* Terminal Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff0055] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e4ff4a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f3ff]" />
          </div>
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-700">
            <Radio className="w-4 h-4 text-[#00f3ff] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00f3ff]">
              SPAWN_KERNEL_BOOT // v4.2
            </span>
          </div>
        </div>

        {/* Status Indicators & Skip Button */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-400">
            <span className="text-[#3ff2c4]">SYS_CLOCK: 64.00Hz</span>
            <span className="text-neutral-600">|</span>
            <span className="text-[#e4ff4a]">MEM: {hexAddress}</span>
          </div>

          <button
            onClick={skipBoot}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c142b] hover:bg-[#1a2b5c] text-neutral-300 hover:text-[#00f3ff] border border-[#28406a] hover:border-[#00f3ff]/60 text-xs font-mono transition-all cursor-pointer"
            title="Press ESC or Space to skip"
          >
            <span>SKIP BOOT</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Cyberpunk Terminal Window */}
      <div className="relative z-10 max-w-3xl w-full mx-auto my-auto p-6 sm:p-8 rounded-3xl bg-[#040817]/90 border border-[#00f3ff]/40 shadow-[0_0_80px_rgba(0,243,255,0.18)] cyber-corner-bracket backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1b2b4d] text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00f3ff]" />
            <span className="text-white font-bold tracking-wide">
              TERMINAL ROOT // INIT_SEQUENCE
            </span>
          </div>
          <span className="text-[10px] text-[#3ff2c4] font-mono">
            {progress < 100 ? 'INITIALIZING...' : 'BOOT COMPLETE'}
          </span>
        </div>

        {/* Streaming Boot Logs */}
        <div className="space-y-2 mb-6 min-h-[190px] font-mono text-xs sm:text-sm">
          {BOOT_LOGS.slice(0, currentStep + 1).map((log, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 animate-in fade-in slide-in-from-left-2 duration-150"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span
                  className="px-1.5 py-0.2 rounded font-bold text-[10px] shrink-0"
                  style={{
                    color: log.color,
                    backgroundColor: `${log.color}15`,
                    border: `1px solid ${log.color}40`,
                  }}
                >
                  {log.tag}
                </span>
                <span className="text-neutral-200 truncate">{log.text}</span>
              </div>
              {log.detail && (
                <span className="text-[10px] text-neutral-500 font-mono shrink-0 hidden sm:inline">
                  [{log.detail}]
                </span>
              )}
            </div>
          ))}

          {/* Active Blinking Cursor */}
          {currentStep < BOOT_LOGS.length - 1 && (
            <div className="flex items-center gap-2 text-xs text-[#00f3ff] pt-1">
              <span className="text-neutral-500">{'>'}</span>
              <span className="w-2 h-4 bg-[#00f3ff] animate-pulse inline-block" />
            </div>
          )}
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2 pt-2 border-t border-[#1b2b4d]">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">INITIALIZING GAME ENGINE STACK</span>
              <span className="text-[#00f3ff] font-bold">{progress}%</span>
            </div>
            <span className="text-[#e4ff4a] text-[11px] font-mono">{hexAddress}</span>
          </div>

          <div className="w-full h-2 rounded-full bg-neutral-900 border border-[#203055] overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2b3cff] via-[#00f3ff] to-[#e4ff4a] transition-all duration-200 ease-out shadow-[0_0_15px_rgba(0,243,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Ribbon */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#00f3ff]/30 text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="text-[#00f3ff] font-bold">DOTREPO SPAWN</span>
          <span className="text-neutral-600">·</span>
          <span>ENTERPRISE GAMING PRACTICE</span>
          <span className="text-neutral-600 hidden sm:inline">·</span>
          <span className="text-[#3ff2c4] hidden sm:inline">64-TICK MULTIPLAYER INFRASTRUCTURE</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-neutral-500">
          <span>PRESS ESC TO SKIP</span>
        </div>
      </div>
    </div>
  );
};
