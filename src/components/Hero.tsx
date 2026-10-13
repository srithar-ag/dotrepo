import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Server,
  Sparkles,
  Layers,
  Database,
  ChevronRight,
} from 'lucide-react';
import { PageId } from '../types';
import { HeroLiveAgents } from './HeroLiveAgents';

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenContactModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle interactive canvas topology for bright theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Nodes representing services in the DotRepo Corp. network
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label?: string;
      color: string;
    }[] = [
      { x: width * 0.15, y: height * 0.35, vx: 0.18, vy: 0.1, radius: 3.5, label: 'CRM Core', color: '#2563eb' },
      { x: width * 0.28, y: height * 0.65, vx: -0.15, vy: 0.18, radius: 4, label: 'SQL Cluster', color: '#0284c7' },
      { x: width * 0.45, y: height * 0.25, vx: 0.1, vy: -0.12, radius: 4.5, label: 'AI Inference', color: '#7c3aed' },
      { x: width * 0.6, y: height * 0.55, vx: -0.18, vy: -0.1, radius: 3.5, label: 'Edge Gateway', color: '#0284c7' },
      { x: width * 0.75, y: height * 0.3, vx: 0.15, vy: 0.12, radius: 4, label: 'Ledger Engine', color: '#2563eb' },
      { x: width * 0.85, y: height * 0.7, vx: -0.1, vy: -0.15, radius: 4, label: 'Vector Store', color: '#9333ea' },
      { x: width * 0.35, y: height * 0.45, vx: 0.1, vy: 0.1, radius: 3, color: '#94a3b8' },
      { x: width * 0.52, y: height * 0.75, vx: -0.12, vy: 0.1, radius: 3, color: '#94a3b8' },
      { x: width * 0.68, y: height * 0.2, vx: 0.12, vy: -0.1, radius: 3, color: '#94a3b8' },
      { x: width * 0.82, y: height * 0.42, vx: -0.1, vy: 0.12, radius: 3, color: '#94a3b8' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connecting lines between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node label
        if (node.label && width > 768) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(71, 85, 105, 0.7)';
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-200/90 bg-white">
      {/* Background canvas topology */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Subtle radial background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-blue-100/50 via-neutral-50/50 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Eyebrow, Main Headline, Subheadline, Buttons */}
          <div className="lg:col-span-7">
            {/* Editorial Eyebrow Tagline */}
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
                Enterprise Cloud, SaaS & AI
              </span>
              <span className="hidden sm:inline text-neutral-300">·</span>
              <span className="text-[11px] sm:text-xs font-medium text-neutral-600">
                Headquartered in Bangalore, India · Global Scale
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 max-w-3xl text-balance leading-[1.08]">
              Build. Operate. Scale.
            </h1>

            {/* Hero Subheadline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed text-balance font-normal">
              DotRepo Corp. provides carrier-grade cloud infrastructure, intelligent SaaS business suites, distributed data platforms, and autonomous AI systems that power modern enterprise workloads.
            </p>

            {/* Action Buttons (Clean responsive alignment) */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-all shadow-md cursor-pointer group"
              >
                <span>Explore SaaS Suite</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('internship')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-all cursor-pointer shadow-xs"
              >
                <span>Join as Intern (13 Tracks)</span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => onOpenContactModal('sales')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                <span>Schedule Briefing</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Autonomous Agents / Dev Swarm */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <HeroLiveAgents />
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs text-neutral-600">
          <div className="flex items-center gap-3 p-2 sm:p-0 rounded-lg bg-neutral-50/50 sm:bg-transparent">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 block">SOC 2 Type II & ISO 27001</span>
              <span className="text-[11px] text-neutral-500">Continuous enterprise compliance</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:p-0 rounded-lg bg-neutral-50/50 sm:bg-transparent">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 block">99.999% SLA Uptime</span>
              <span className="text-[11px] text-neutral-500">Multi-region active-active clusters</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:p-0 rounded-lg bg-neutral-50/50 sm:bg-transparent">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 block">Zero Data AI Training</span>
              <span className="text-[11px] text-neutral-500">Strict customer tenant privacy</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:p-0 rounded-lg bg-neutral-50/50 sm:bg-transparent">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 block">Sub-5ms Query Latency</span>
              <span className="text-[11px] text-neutral-500">High-throughput ACID engine</span>
            </div>
          </div>
        </div>

        {/* Visual Architectural Bento Snapshot */}
        <div className="mt-12 sm:mt-14 p-1 rounded-2xl bg-gradient-to-b from-neutral-200/80 via-neutral-100 to-neutral-200/50 border border-neutral-200 shadow-xl">
          <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                  Ecosystem Topology
                </span>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                  Unified Cloud, Data, Application, and AI Fabric
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  All 16 Services Operational
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cloud Card */}
              <div
                onClick={() => onNavigate('cloud')}
                className="p-5 rounded-xl bg-neutral-50 hover:bg-blue-50/40 border border-neutral-200/90 hover:border-blue-300 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Server className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 group-hover:text-blue-600 font-medium transition-colors">
                    99.999% SLA
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  DotRepo Corp. Cloud
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Elastic container runtime, VPC peering & edge proxy networks.
                </p>
              </div>

              {/* Software Card */}
              <div
                onClick={() => onNavigate('products')}
                className="p-5 rounded-xl bg-neutral-50 hover:bg-emerald-50/40 border border-neutral-200/90 hover:border-emerald-300 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 group-hover:text-emerald-600 font-medium transition-colors">
                    5 Apps
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                  Business Software
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Unified CRM, Finance, Operations, Support, and People suite.
                </p>
              </div>

              {/* Data Card */}
              <div
                onClick={() => onNavigate('products')}
                className="p-5 rounded-xl bg-neutral-50 hover:bg-amber-50/40 border border-neutral-200/90 hover:border-amber-300 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 group-hover:text-amber-600 font-medium transition-colors">
                    Distributed
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                  Data Platform
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Relational ACID storage, vector index engine & streaming mesh.
                </p>
              </div>

              {/* AI Card */}
              <div
                onClick={() => onNavigate('ai')}
                className="p-5 rounded-xl bg-neutral-50 hover:bg-purple-50/40 border border-neutral-200/90 hover:border-purple-300 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 group-hover:text-purple-600 font-medium transition-colors">
                    Autonomous
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-purple-600 transition-colors">
                  Autonomous AI
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Multi-agent teams, enterprise RAG & document reasoning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
