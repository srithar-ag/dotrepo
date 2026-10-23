import React from 'react';
import { ArrowRight, Cpu, Zap, ShieldCheck } from 'lucide-react';

export const CloudOverview: React.FC = () => {
  return (
    <section id="overview" className="bg-[#FFFFFF] text-neutral-900 py-24 sm:py-32 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (8 cols): Small Caps Label, Big Headline, 2 Paragraph Description */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#16A34A] font-bold mb-3 block">
              ENTERPRISE CLOUD ARCHITECTURE
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
              Infrastructure designed to scale with you.
            </h2>

            <div className="mt-8 space-y-6 text-neutral-700 text-lg sm:text-[19px] leading-relaxed font-normal">
              <p>
                DotRepo Corp. Cloud delivers unified compute, distributed multi-region databases, high-durability object storage, and Anycast API gateways engineered to sustain mission-critical enterprise workloads. Built on a private optical backbone connecting tier-4 data centers across Mumbai, Bangalore, Hyderabad, and global strategic hubs, our platform eliminates the latency bottlenecks and unpredictable egress costs inherent to legacy hyperscalers.
              </p>
              <p>
                Whether provisioning microVM serverless containers with sub-millisecond cold starts or deploying bare-metal clusters with 128 physical vCPUs and 1TB of ECC RAM, every workload is isolated by default at the hardware level. With built-in Raft-consensus transactional databases and 180+ global Points of Presence, engineering teams can build, test, and run distributed applications with complete sovereignty and predictable sub-5 millisecond p99 performance.
              </p>
            </div>

            {/* Core Architectural Pillars */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-neutral-200 w-full text-left">
              <div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  NETWORK BACKBONE
                </span>
                <span className="text-xl font-bold text-neutral-950 mt-1 block">
                  Private Dark Fiber
                </span>
                <span className="text-xs text-neutral-600 mt-0.5 block">
                  Zero public internet hops between Indian core facilities
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  HARDWARE ISOLATION
                </span>
                <span className="text-xl font-bold text-neutral-950 mt-1 block">
                  Type-1 MicroVM
                </span>
                <span className="text-xs text-neutral-600 mt-0.5 block">
                  Zero noisy-neighbor CPU and memory contention
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  DATA RESIDENCY
                </span>
                <span className="text-xl font-bold text-neutral-950 mt-1 block">
                  100% Sovereign
                </span>
                <span className="text-xs text-neutral-600 mt-0.5 block">
                  Guaranteed local storage under DPDP Act mandates
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Bordered Highlight Card (like NVIDIA Cloud Accelerator card) */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-[#F4F4F4] border border-neutral-300 rounded-[2px] shadow-xs text-left">
              {/* Highlight Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#16A34A] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-[1px] bg-[#16A34A]" />
                  PROGRAM HIGHLIGHT
                </span>
                <span className="text-[11px] font-mono text-neutral-500">TIER-4 READY</span>
              </div>

              <h3 className="text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                DotRepo Enterprise Cloud Accelerator
              </h3>

              <p className="mt-4 text-sm text-neutral-700 leading-relaxed">
                Eligible scale-ups and enterprise workloads receive dedicated hardware migration credits, hands-on architectural co-design with our Bangalore systems engineers, and guaranteed reserved bare-metal quota with customized multi-year pricing tiers.
              </p>

              {/* Hardware Spec Badges */}
              <div className="mt-6 space-y-2.5">
                <div className="p-3 bg-white border border-neutral-200 rounded-[2px] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-600">Compute Allocation</span>
                  <span className="text-neutral-950 font-bold">Up to ₹50L Infrastructure Credits</span>
                </div>
                <div className="p-3 bg-white border border-neutral-200 rounded-[2px] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-600">Network Egress</span>
                  <span className="text-[#16A34A] font-bold">Zero Transfer Fees Intra-Zone</span>
                </div>
                <div className="p-3 bg-white border border-neutral-200 rounded-[2px] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-600">Enterprise SLA</span>
                  <span className="text-neutral-950 font-bold">99.99% Guaranteed Availability</span>
                </div>
              </div>

              {/* CTA Link */}
              <div className="mt-8 pt-6 border-t border-neutral-300 flex items-center justify-between">
                <a
                  href="#configure"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-[#16A34A] transition-colors group"
                >
                  <span>Learn more about accelerator terms</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
