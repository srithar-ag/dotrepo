import React from 'react';
import { SECURITY_CAPABILITIES, COMPLIANCE_BADGES } from '../constants';
import { Lock, ShieldCheck, FileCheck, ShieldAlert, Network, KeyRound, CheckCircle2 } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  encryption: Lock,
  iam: KeyRound,
  audit: FileCheck,
  ddos: ShieldAlert,
  isolation: Network,
  attestation: ShieldCheck,
};

export const CloudSecurity: React.FC = () => {
  return (
    <section id="security" className="bg-[#FFFFFF] text-neutral-900 py-20 lg:py-28 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#16A34A] font-mono font-semibold mb-2">
            ENTERPRISE GOVERNANCE & SOVEREIGNTY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Security anchored in hardware.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Every customer workload runs inside cryptographic micro-enclaves. Hardware attestation, automated key rotation, and sovereign data residency are non-negotiable standards.
          </p>
        </div>

        {/* 6 Capability Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SECURITY_CAPABILITIES.map((cap) => {
            const Icon = ICON_MAP[cap.id] || ShieldCheck;
            return (
              <div
                key={cap.id}
                className="p-6 bg-[#F4F4F4] border border-neutral-200 rounded-[2px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 bg-white border border-neutral-200 flex items-center justify-center rounded-[2px] text-neutral-800">
                      <Icon className="w-4 h-4 text-neutral-800" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                      {cap.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-950 mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clearly Marked Compliance & Attestation Placeholder Row */}
        <div className="border border-neutral-200 bg-[#FAFAFA] p-6 sm:p-8 rounded-[2px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#16A34A] font-semibold">
                AUDIT READINESS & REGULATORY FRAMEWORKS
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                Architecture aligned to sovereign standards and independent third-party audit requirements.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-500 uppercase">
              STATUS: AUDIT-READY MATRICES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {COMPLIANCE_BADGES.map((badge) => (
              <div
                key={badge.id}
                className="p-4 bg-white border border-neutral-200 rounded-[2px] flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-neutral-900 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span className="font-mono font-bold text-xs">{badge.name}</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono leading-tight">
                  {badge.status}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-400 mt-4 font-mono text-center sm:text-left">
            * All data centers certified Tier-4 with redundant power, physical biometric ingress, and continuous CCTV surveillance.
          </p>
        </div>
      </div>
    </section>
  );
};
