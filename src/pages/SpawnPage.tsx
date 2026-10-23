import React, { useEffect, useRef, useState } from 'react';
import './spawn/spawn.css';
import { CodeExpandingPanel } from './spawn/CodeExpandingPanel';
import { WhatWeBuildSection } from './spawn/WhatWeBuildSection';
import { LoadoutSelector } from './spawn/LoadoutSelector';
import { FloatingHexagons } from './spawn/FloatingHexagons';
import { SpawnBootOverlay } from './spawn/SpawnBootOverlay';
import { ArrowRight, ArrowUpRight, Gamepad2, ChevronRight } from 'lucide-react';
import { PageId } from '../types';

interface SpawnPageProps {
  onNavigate: (page: PageId | 'spawn', subId?: string) => void;
  onOpenContactModal?: (topic?: string) => void;
}

export const SpawnPage: React.FC<SpawnPageProps> = ({ onNavigate, onOpenContactModal }) => {
  const statementRef = useRef<HTMLDivElement>(null);
  const [statementVisible, setStatementVisible] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(true);

  // Scroll to anchor helper
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Statement word-by-word scroll reveal trigger
  useEffect(() => {
    if (!statementRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStatementVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(statementRef.current);
    return () => observer.disconnect();
  }, []);

  const statementWords = ['Ship', 'the', 'game.', 'Run', 'the', 'world', 'behind', 'it.'];

  // Handle contact routing or modal
  const handleContactClick = (topic?: string) => {
    if (onOpenContactModal) {
      onOpenContactModal(topic || 'DotRepo Spawn Gaming Architecture');
    } else {
      onNavigate('contact', topic);
    }
  };

  return (
    <div className="spawn-root">
      {/* High-Performance Neon Terminal Boot Loading Screen Overlay */}
      {showBootSequence && (
        <SpawnBootOverlay onComplete={() => setShowBootSequence(false)} />
      )}

      {/* Top Floating Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-black/75 backdrop-blur-md border-b border-[#232838]/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
            title="Return to DotRepo Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2b3cff] via-[#1ea0ff] to-[#3ff2c4] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-[#e4ff4a]" />
              </div>
            </div>
            <div>
              <span className="spawn-disp text-xl sm:text-2xl text-white tracking-wider flex items-center gap-1.5">
                DotRepo <span className="spawn-grad">Spawn</span>
              </span>
            </div>
          </button>
        </div>

        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono">
          <button
            onClick={() => scrollToAnchor('studios')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer hidden md:inline-block"
          >
            For Studios
          </button>
          <button
            onClick={() => scrollToAnchor('devs')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer hidden md:inline-block"
          >
            For Developers
          </button>
          <button
            onClick={() => scrollToAnchor('loadout')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer hidden sm:inline-block"
          >
            Loadout
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#28406a] text-neutral-300 hover:text-white transition-all text-xs cursor-pointer"
          >
            <span>Back to DotRepo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </header>

      {/* 1. HERO SECTION (Full-Screen Centered Gaming Stack) */}
      <section className="relative min-h-screen min-h-[100dvh] pt-24 sm:pt-28 pb-16 sm:pb-20 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Pixel Grid Tunnel Background - Edge to Edge on all aspect ratios */}
        <div className="spawn-tunnel" aria-hidden="true">
          {Array.from({ length: 30 * 16 }).map((_, i) => (
            <i
              key={i}
              style={{
                animationDelay: `-${((i * 137) % 400) / 100}s`,
              }}
            />
          ))}
        </div>

        {/* Center Scaled Hero Content */}
        <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 z-10 flex flex-col items-center justify-center text-center my-auto">
          {/* Neon Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1ea0ff]/10 border border-[#1ea0ff]/30 text-[#1ea0ff] text-xs sm:text-sm font-mono mb-6 backdrop-blur-md shadow-[0_0_24px_rgba(30,160,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#3ff2c4] animate-ping" />
            <span>Next-Gen Gaming Practice · dotrepo.in/spawn</span>
          </div>

          {/* Very Large Headline */}
          <h1 className="spawn-disp text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[112px] 2xl:text-[128px] tracking-tight text-white leading-[0.92] text-center max-w-5xl mx-auto uppercase">
            <span className="spawn-ln block">
              <span>Build the</span>
            </span>
            <span className="spawn-ln block mt-1 sm:mt-2">
              <span className="spawn-grad">game stack</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 sm:mt-8 text-neutral-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-center font-normal">
            We build games and the backend that keeps them alive: multiplayer, matchmaking, live-ops and AI.
          </p>

          {/* Two Audience Paths */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full">
            <button
              onClick={() => scrollToAnchor('studios')}
              className="spawn-btn text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 cursor-pointer font-bold shadow-[0_0_20px_rgba(228,255,74,0.3)]"
            >
              <span>I'm a studio</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={() => scrollToAnchor('devs')}
              className="spawn-btn spawn-btn-outline text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 cursor-pointer font-bold"
            >
              <span>I'm a developer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Gaming Architecture Highlights */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 text-xs sm:text-sm font-mono text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e4ff4a] shadow-[0_0_8px_#e4ff4a]" />
              <span>Unity & Unreal Studios</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1ea0ff] shadow-[0_0_8px_#1ea0ff]" />
              <span>64-Tick UDP Servers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3ff2c4] shadow-[0_0_8px_#3ff2c4]" />
              <span>Sub-20ms Global Routing</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
              <span>Zero-Loss Anti-Cheat</span>
            </div>
          </div>
        </div>

        {/* Ambient Typographic Watermark "GAMING" Centered at Bottom */}
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none overflow-hidden opacity-10 sm:opacity-15 z-0"
          aria-hidden="true"
        >
          <span className="spawn-disp text-[16vw] leading-none text-transparent bg-clip-text bg-gradient-to-t from-white to-transparent tracking-widest whitespace-nowrap">
            GAMING
          </span>
        </div>
      </section>

      {/* Marquee Strip Under Hero */}
      <div className="spawn-mq" aria-hidden="true">
        <div className="spawn-mq-inner">
          <span>Multiplayer</span>
          <span>·</span>
          <span className="highlight">Matchmaking</span>
          <span>·</span>
          <span>Leaderboards</span>
          <span>·</span>
          <span className="highlight">Live-ops</span>
          <span>·</span>
          <span>Game AI</span>
          <span>·</span>
          <span className="highlight">Telemetry</span>
          <span>·</span>
          <span>Esports</span>
          <span>·</span>
          <span className="highlight">Cloud Servers</span>
          <span>·</span>
          <span>Dedicated Game Nodes</span>
          <span>·</span>
          <span className="highlight">Anti-Cheat</span>
          <span>·</span>
          <span>Multiplayer</span>
          <span>·</span>
          <span className="highlight">Matchmaking</span>
          <span>·</span>
          <span>Leaderboards</span>
          <span>·</span>
          <span className="highlight">Live-ops</span>
          <span>·</span>
          <span>Game AI</span>
          <span>·</span>
          <span className="highlight">Telemetry</span>
          <span>·</span>
          <span>Esports</span>
        </div>
      </div>

      {/* 2. STATEMENT SECTION (Cyberpunk Scalable Holographic Arena) */}
      <section
        ref={statementRef}
        className="w-full py-28 sm:py-40 relative overflow-hidden border-y border-[#1a2542] bg-[#02030a] cyber-grid-bg"
      >
        {/* Cyberpunk Scanline & Ambient Neon Glow Orbs */}
        <div className="cyber-scanline absolute inset-0 z-0 pointer-events-none opacity-30" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#00f3ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#ff0055]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Cyberpunk Telemetry Tape */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
            <span className="text-[#00f3ff] font-bold">DIRECTIVE // 0x4F_SHIP</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-300">CORE_ARCHITECTURE: HYPER_MESH</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-neutral-400">
            <span className="text-[#e4ff4a]">TX: 4.82 GB/s</span>
            <span className="text-neutral-600">/</span>
            <span className="text-[#3ff2c4]">RX: 6.19 GB/s</span>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-bold">64 TICKS LOCKSTEP</span>
          </div>
        </div>

        {/* Center Main Scalable Content Frame */}
        <div className="relative z-10 w-full max-w-[96vw] mx-auto px-2 sm:px-4 text-center">
          {/* Cyberpunk Frame Corner Brackets */}
          <div className="relative p-8 sm:p-14 rounded-3xl bg-[#040714]/85 border border-[#00f3ff]/30 shadow-[0_0_60px_rgba(0,243,255,0.12)] cyber-corner-bracket backdrop-blur-md">
            {/* Top Sub-Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff4a] animate-pulse" />
              <span>PRODUCTION_GRADE MULTIPLAYER MANIFESTO</span>
            </div>

            {/* Main Cyberpunk Headline */}
            <h2
              className="spawn-disp text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight cyber-glitch-text mb-6"
              aria-label="Ship the game. Run the world behind it."
            >
              <span className="spawn-grad">
                {statementWords.map((word, i) => (
                  <span
                    key={i}
                    className={`spawn-word-wrap ${statementVisible ? 'is-visible' : ''}`}
                  >
                    <span
                      className="spawn-word-inner"
                      style={{ transitionDelay: `${i * 0.08}s` }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
              From full game development in modern engines to the high-frequency distributed backend powering global competitive concurrency.
            </p>

            {/* Cyberpunk Audio-Style Frequency Equalizer Visualizer */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 h-10 select-none py-1">
              {[40, 75, 55, 95, 60, 85, 100, 70, 90, 50, 80, 65, 90, 45, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-[#2b3cff] via-[#00f3ff] to-[#e4ff4a] transition-all duration-300"
                  style={{
                    height: `${statementVisible ? h : 20}%`,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>

            {/* Cyberpunk Badges Ticker Grid */}
            <div className="mt-8 pt-6 border-t border-[#1a2542] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">TICK RATE</span>
                <span className="text-[#3ff2c4] font-bold">64 Hz LOCKSTEP</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">EDGE MESH</span>
                <span className="text-[#00f3ff] font-bold">SUB-20MS ASIA</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">ENGINES</span>
                <span className="text-[#e4ff4a] font-bold">UNREAL / UNITY / GODOT</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">SECURITY</span>
                <span className="text-[#ff0055] font-bold">ANTI-CHEAT ZERO LOSS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CODE PANEL (Developer Entry Point, Anchor #devs) */}
      <CodeExpandingPanel />

      {/* 4. WHAT WE BUILD (Service Cards, Anchor #studios) */}
      <WhatWeBuildSection />

      {/* 5. PICK YOUR LOADOUT (Enquiry Selector, Anchor #loadout) */}
      <LoadoutSelector
        onNavigateContact={(loadout) => handleContactClick(`Spawn Loadout: ${loadout}`)}
      />

      {/* 6. FINAL CTA WITH FLOATING NEON HEXAGONS */}
      <section className="relative min-h-[90vh] py-32 flex items-center justify-center text-center overflow-hidden border-t border-[#232838]">
        {/* Three Floating Neon Hexagons Drifting at Different Speeds */}
        <FloatingHexagons />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3ff2c4] bg-[#3ff2c4]/10 border border-[#3ff2c4]/25 px-3 py-1 rounded-full">
              Ready to Ship
            </span>
          </div>

          <h2 className="spawn-disp text-5xl sm:text-7xl lg:text-8xl mb-8">
            <span className="spawn-grad">Let's build the next game together</span>
          </h2>

          <p className="text-neutral-300 text-base sm:text-lg max-w-xl mx-auto mb-10">
            Tell us about your game, your target platforms, or your multiplayer concurrency goals. We respond with technical blueprints in 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleContactClick('DotRepo Spawn — New Game Project')}
              className="spawn-btn"
            >
              <span>Contact us</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="spawn-btn spawn-btn-outline"
            >
              <span>Explore DotRepo Cloud & AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Spawn Dedicated Footer */}
      <footer className="px-4 sm:px-8 py-8 border-t border-[#232838] bg-[#020308] text-neutral-400 text-xs font-mono flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#3ff2c4]" />
          <span>© 2026 DotRepo Corp.</span>
          <span className="text-neutral-600">·</span>
          <span>Spawn is DotRepo’s gaming practice.</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            DotRepo Home
          </button>
          <span className="text-neutral-600">·</span>
          <a
            href="mailto:communications@dotrepo.in?subject=DotRepo%20Spawn%20Gaming%20Inquiry"
            className="hover:text-[#3ff2c4] text-[#1ea0ff] transition-colors"
          >
            communications@dotrepo.in
          </a>
        </div>
      </footer>
    </div>
  );
};
