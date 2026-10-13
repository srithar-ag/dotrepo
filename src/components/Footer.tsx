import React from 'react';
import { DotRepoLogo } from './DotRepoLogo';
import { PageId } from '../types';
import { ShieldCheck, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, subId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200/90 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Top Footer Brand & Mission */}
        <div className="pb-12 border-b border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <DotRepoLogo size="md" showWordmark={true} />
            <p className="text-neutral-600 text-xs sm:text-sm max-w-md leading-relaxed mt-2">
              Technology that powers modern businesses. We develop cloud-based business applications, enterprise software, database systems, cloud infrastructure, AI solutions, and developer technologies.
            </p>
            <p className="text-[11px] font-mono font-medium text-neutral-500">
              Cloud · Software · Data · AI · Built for the future.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-wrap gap-4 lg:justify-end items-center text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-900 font-semibold">All Cloud Systems Operational</span>
              <span className="text-neutral-300">·</span>
              <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                99.999%
              </span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-neutral-900 font-semibold">ISO 27001 & SOC 2 Certified</span>
            </div>
          </div>
        </div>

        {/* 5 Enterprise Columns */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Products */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'CRM', id: 'crm' },
                { name: 'Finance', id: 'finance' },
                { name: 'Operations', id: 'operations' },
                { name: 'Support', id: 'support' },
                { name: 'Analytics', id: 'analytics' },
                { name: 'AI Platform', id: 'ai' },
                { name: 'Cloud Infrastructure', id: 'cloud' },
                { name: 'Database', id: 'database' },
              ].map((p) => (
                <li key={p.name}>
                  <button
                    onClick={() => onNavigate('products', p.id)}
                    className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Business Enterprise', id: 'finance' },
                { name: 'Enterprise Modernization', id: 'technology' },
                { name: 'Startups & Scaleups', id: 'startups' },
                { name: 'Financial Services', id: 'finance' },
                { name: 'Healthcare & Life Sciences', id: 'healthcare' },
                { name: 'Retail & Commerce', id: 'retail' },
                { name: 'Advanced Manufacturing', id: 'manufacturing' },
              ].map((s) => (
                <li key={s.name}>
                  <button
                    onClick={() => onNavigate('solutions', s.id)}
                    className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-4">
              Developers
            </h4>
            <ul className="space-y-2.5">
              {[
                'API Reference',
                'SDKs & Libraries',
                'Architecture Guides',
                'Developer Platform',
                'Webhooks & Events',
                'Status & Uptime',
              ].map((d) => (
                <li key={d}>
                  <button
                    onClick={() => onNavigate('developers')}
                    className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    {d}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                >
                  About DotRepo Corp.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('internship')}
                  className="hover:text-emerald-700 text-emerald-800 transition-colors cursor-pointer text-left font-semibold flex items-center gap-1.5"
                >
                  <span>Internships</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold">
                    13 Tracks
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('careers')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium flex items-center gap-1.5"
                >
                  <span>Careers</span>
                  <span className="text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-semibold">
                    Hiring
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                >
                  Contact & Sales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                >
                  News & Press
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                >
                  Offices Across India (Bangalore HQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Trust */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Security Assurance',
                'Compliance Frameworks',
                'Data Processing Agreement (DPA)',
                'Subprocessors List',
              ].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => onNavigate('resources')}
                    className="hover:text-neutral-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer - Dark Theme */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="rounded-2xl bg-neutral-950 text-neutral-300 p-6 sm:p-7 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-[12px]">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="text-white font-semibold text-xs sm:text-sm tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span>© 2026 DotRepo Corp. Enterprise Platform.</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                  Headquartered in India
                </span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Operating pan-India technology campuses: Bangalore (HQ), Hyderabad, Pune, Chennai, and Mumbai.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 text-neutral-400 text-xs shrink-0">
              <a
                href="mailto:DOTREPOCORP@GMAIL.COM"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-emerald-500/60 text-white hover:text-emerald-300 transition-colors font-mono font-medium shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>DOTREPOCORP@GMAIL.COM</span>
              </a>
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <span>All India Cloud Nodes</span>
                <span className="text-neutral-600">·</span>
                <span className="text-emerald-400 font-semibold">Security by Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
