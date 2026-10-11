import React from 'react';
import { Hero } from '../components/Hero';
import { HomeInternshipTeaser } from '../components/HomeInternshipTeaser';
import { EcosystemPillars } from '../components/EcosystemPillars';
import { ProductGrid } from '../components/ProductGrid';
import { AISection } from '../components/AISection';
import { CloudSection } from '../components/CloudSection';
import { DeveloperSection } from '../components/DeveloperSection';
import { SolutionsSection } from '../components/SolutionsSection';
import { GlobalScale } from '../components/GlobalScale';
import { SecuritySection } from '../components/SecuritySection';
import { PageId } from '../types';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  MapPin,
  GraduationCap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, subId?: string) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  return (
    <div className="flex flex-col bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Primary Enterprise Hero: Cloud, SaaS, Data & AI Platform (Bangalore HQ) */}
      <Hero
        onNavigate={onNavigate}
        onOpenContactModal={onOpenContactModal}
      />

      {/* 2. Quarter-Section Feature: DotRepo Corp. Engineering & AI Internship Portal */}
      <HomeInternshipTeaser onNavigate={onNavigate} />

      {/* 3. Four Ecosystem Pillars (Cloud, Software, Data, AI) */}
      <EcosystemPillars onNavigate={onNavigate} />

      {/* 4. Product Suite: Core Business Suite (DotRepo Corp. CRM, Finance, Operations, Support, Analytics, People) + 10 Platform Products */}
      <ProductGrid onNavigate={onNavigate} />

      {/* 5. Carrier-Grade Cloud & Infrastructure: Compute Engine, H100 GPU Matrix, 99.999% SLA */}
      <CloudSection onNavigate={onNavigate} />

      {/* 6. AI & Automation Enterprise Reasoning Engine */}
      <AISection onNavigate={onNavigate} />

      {/* 7. Developer Platform: Interactive Code Sandbox with TypeScript, Python, Go, cURL & Edge Gateway */}
      <DeveloperSection onNavigate={onNavigate} />

      {/* 8. Tailored Industry Solutions (8 Regulated Sectors) */}
      <SolutionsSection onNavigate={onNavigate} />

      {/* 9. Global Scale: Multi-Continental SVG Mesh Map with Live Latency Telemetry */}
      <GlobalScale />

      {/* 10. Security, Trust & Compliance Verification (SOC 2, ISO 27001, HIPAA, GDPR) */}
      <SecuritySection onNavigate={onNavigate} />

      {/* 11. Enterprise Briefing & Conversion CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 border-t border-neutral-200/90">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Headquartered in Bangalore, India · Powering Global Enterprises</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 max-w-3xl mx-auto text-balance">
            Build and run your enterprise future on DotRepo Corp.
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Join thousands of organizations running mission-critical workloads on DotRepo Corp. Cloud, Business SaaS Applications, and Autonomous AI systems.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => onOpenContactModal('sales')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-md text-center"
            >
              Schedule Enterprise Briefing
            </button>
            <button
              onClick={() => onNavigate('internship')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs text-center"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Explore Internships (8 Tracks)</span>
            </button>
            <button
              onClick={() => onNavigate('developers')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs text-center"
            >
              <span>Developer Docs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-8 text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bangalore Innovation Hub & Global Nodes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dedicated Enterprise Account Team</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Contractual 99.999% SLA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
