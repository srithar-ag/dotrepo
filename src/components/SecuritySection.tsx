import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Zap,
  Key,
  Users,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { SECURITY_PILLARS } from '../data/mockData';
import { PageId } from '../types';

interface SecuritySectionProps {
  onNavigate: (page: PageId) => void;
}

const ICON_MAP = [
  ShieldCheck,
  Lock,
  FileCheck,
  Zap,
  Key,
  Users,
];

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Enterprise Trust & Security
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
            Enterprise technology, built with trust at its core.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Every layer of the DotRepo Corp. platform is engineered with zero-trust principles, cryptographic isolation, and continuous third-party compliance verification.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURITY_PILLARS.map((item, idx) => {
            const Icon = ICON_MAP[idx] || ShieldCheck;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/90 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications & Compliance Badges Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-medium text-neutral-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>SOC 2 Type II Audited</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ISO/IEC 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>GDPR & CCPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>HIPAA BAA Available</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('resources')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Request compliance pack & audit report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
