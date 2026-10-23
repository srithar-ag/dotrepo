import React from 'react';
import { PageId } from '../../../types';
import { ShieldCheck, MapPin, Globe, Github, Linkedin, Twitter } from 'lucide-react';

interface CloudFooterProps {
  onNavigate?: (page: PageId) => void;
  onOpenInternship?: () => void;
}

export const CloudFooter: React.FC<CloudFooterProps> = ({ onNavigate, onOpenInternship }) => {
  return (
    <footer className="bg-[#050505] text-neutral-400 border-t border-[#1A1A1A] pt-16 pb-12">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1A1A1A]">
          {/* Col 1: Products */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Accelerated Compute
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Distributed SQL Database
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  NVMe Object & Block Storage
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Anycast API Gateways
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  AI & GPU Interconnects
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">
                  Hardware Root of Trust
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Architectures
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Fintech & High-Integrity
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Ultra-Low Latency Gaming
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  High-Growth SaaS Platforms
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  AI Foundation Model Labs
                </a>
              </li>
              <li>
                <a href="#regions" className="hover:text-white transition-colors">
                  India DPDP Sovereign Cloud
                </a>
              </li>
              <li>
                <a href="#configure" className="hover:text-white transition-colors">
                  Custom Cluster Sizing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Developers */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Developers
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a href="#developers" className="hover:text-white transition-colors">
                  DotRepo CLI (v2.4)
                </a>
              </li>
              <li>
                <a href="#developers" className="hover:text-white transition-colors">
                  TypeScript & Python SDKs
                </a>
              </li>
              <li>
                <a href="#developers" className="hover:text-white transition-colors">
                  Terraform & OpenTofu
                </a>
              </li>
              <li>
                <a href="#developers" className="hover:text-white transition-colors">
                  System Status (99.99%)
                </a>
              </li>
              <li>
                <a href="#developers" className="hover:text-white transition-colors">
                  Changelog & Benchmarks
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Layer Architecture Spec
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About DotRepo Corp.
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInternship ? onOpenInternship() : onNavigate && onNavigate('internship')}
                  className="hover:text-[#22C55E] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Internships (2026)</span>
                  <span className="text-[9px] font-mono bg-[#1A1A1A] text-[#22C55E] px-1 py-0.5 border border-[#262626]">
                    13 Tracks
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('careers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Careers & Open Roles
                </button>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">
                  Engineering Whitepapers
                </a>
              </li>
              <li>
                <a href="#next-steps" className="hover:text-white transition-colors">
                  Contact Solutions Team
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Headquarters */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Headquarters
            </h4>
            <div className="text-xs space-y-3 font-sans">
              <div className="flex items-start gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span>
                  DotRepo Corp. India HQ<br />
                  Indiranagar 100ft Road,<br />
                  Bangalore, Karnataka 560038, India
                </span>
              </div>
              <div className="pt-2 border-t border-[#1A1A1A] text-[11px] font-mono text-neutral-500">
                <span>CIN: U72900KA2024PTC189201</span>
                <span className="block mt-1">Tier-4 Sovereign Zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Compliance, Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-neutral-500">
            <span className="font-bold text-white tracking-wider">DOTREPO CORP.</span>
            <span>·</span>
            <span>© 2026 DotRepo Corp. All rights reserved.</span>
          </div>

          {/* Compliance statement */}
          <div className="flex items-center gap-2 text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>DPDP ACT 2023 COMPLIANT · HARDWARE-ENCRYPTED DATA RESIDENCY</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-neutral-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
