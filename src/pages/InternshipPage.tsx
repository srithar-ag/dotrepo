import React, { useState } from 'react';
import {
  INTERNSHIP_TRACKS,
  INTERNSHIP_STEPS,
  INTERNSHIP_FAQS,
} from '../data/internshipData';
import { InternshipTrack, PageId } from '../types';
import { InternshipCredentialsPanel } from '../components/InternshipCredentialsPanel';
import { InternshipOnboardingModal } from '../components/InternshipOnboardingModal';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  Code2,
  FileCheck,
  Clock,
  Briefcase,
  ChevronDown,
  Building2,
  MapPin,
  Laptop,
  GraduationCap,
  HelpCircle,
  X,
  Send,
  FileCode,
  ScrollText,
  IdCard,
} from 'lucide-react';

interface InternshipPageProps {
  onNavigate: (page: PageId) => void;
  onOpenRegistration?: (trackId?: string) => void;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({ onNavigate, onOpenRegistration }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTrack, setSelectedTrack] = useState<InternshipTrack | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [internalRegTrackId, setInternalRegTrackId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All 13 Tracks' },
    { id: 'Engineering', label: 'Engineering' },
    { id: 'Data & Analytics', label: 'Data & Analytics' },
    { id: 'AI & Machine Learning', label: 'AI & ML' },
    { id: 'Growth & Marketing', label: 'SEO & Growth' },
    { id: 'Security & Infrastructure', label: 'Cybersecurity' },
    { id: 'Strategy & Grants', label: 'Grants & Fundraising' },
    { id: 'Knowledge & Archival', label: 'Curation & Archival' },
  ];

  const filteredTracks =
    selectedCategory === 'all'
      ? INTERNSHIP_TRACKS
      : INTERNSHIP_TRACKS.filter(
          (t) =>
            t.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            (selectedCategory === 'AI & Machine Learning' &&
              (t.category.includes('AI') || t.title.includes('AI') || t.title.includes('Machine Learning'))) ||
            (selectedCategory === 'Strategy & Grants' &&
              (t.category.includes('Strategy') || t.title.includes('Grant') || t.title.includes('Fundraising'))) ||
            (selectedCategory === 'Knowledge & Archival' &&
              (t.category.includes('Archival') || t.title.includes('Curation') || t.title.includes('Archive')))
        );

  const handleOpenForm = (trackId?: string) => {
    if (onOpenRegistration) {
      onOpenRegistration(trackId);
    } else {
      setInternalRegTrackId(trackId || 'DotRepo 2026 Cohort');
    }
  };

  return (
    <div className="bg-[#090b14] text-white min-h-screen selection:bg-emerald-500 selection:text-neutral-950 font-sans">
      {/* Top Application Notification Banner */}
      <div className="bg-emerald-950/70 border-b border-emerald-500/30 text-emerald-300 py-2.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">2026 Batch Cohort:</span>
            <span>Applications are open across all 13 technical & professional tracks.</span>
            <span className="hidden sm:inline text-neutral-400">· 100% Remote & Self-Paced</span>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline decoration-dotted cursor-pointer"
          >
            <span>JOIN VIA OFFICIAL FORM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-600/15 via-blue-600/10 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-[350px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumbs for Mobile & Desktop clarity */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-neutral-400 mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1 text-neutral-400"
            >
              <span>DotRepo Corp.</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-emerald-400 font-semibold">Internships</span>
          </div>

          {/* Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold tracking-wider uppercase text-[11px] sm:text-xs">DotRepo Corp. Internship Portal</span>
            <span className="text-emerald-600 hidden sm:inline">|</span>
            <span className="text-neutral-300 text-[11px] sm:text-xs">100% Remote & Self-Paced</span>
          </div>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] text-balance">
            From application <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              to verified internship.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-neutral-200 max-w-2xl mx-auto leading-relaxed text-balance font-medium">
            Shape the future of our industry—join the DotRepo team as an intern!
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => handleOpenForm()}
              className="w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Apply Now · Onboard as Intern Now</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('tracks-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Explore 13 Tracks</span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Helper span requested by user: "span - scroll down to explore tracks and benifits" */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('benefits-section') || document.getElementById('tracks-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 text-xs font-mono text-emerald-400/90 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wide underline decoration-dotted underline-offset-4 font-semibold">
                Scroll down to explore tracks and benefits
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Self-Paced & Flexible</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verifiable Credential & LOR</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Real Capstone Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Industry-Standard Capstones</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Roadmap Section */}
      <section className="py-20 bg-[#0d101d] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              How the Internship Works
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base">
              A transparent, self-paced 4-stage progression designed to build proof of competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTERNSHIP_STEPS.map((s) => (
              <div
                key={s.step}
                className="relative p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-black text-emerald-400/80">
                      {s.step}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-0.5 rounded bg-neutral-800">
                      {s.tagline}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 font-normal leading-relaxed">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL RECEIVE AT THE END OF YOUR INTERNSHIP Section */}
      <section id="benefits-section" className="py-20 md:py-28 bg-[#fafafc] border-b border-neutral-200 text-neutral-900 relative overflow-hidden">
        {/* Subtle background ambient accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-mono font-bold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>INTERNSHIP BENEFITS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight leading-tight uppercase font-sans">
              WHAT YOU’LL RECEIVE AT THE END OF YOUR INTERNSHIP
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
              Your work deserves recognition. Complete your internship and receive the credentials and documentation that reflect your journey.
            </p>
          </div>

          {/* 2x2 Grid on Desktop, 1-col on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Benefit 1: Internship Completion Certificate */}
            <div className="group relative p-8 sm:p-9 rounded-2xl bg-white border border-neutral-200/80 hover:border-orange-300 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-orange-100/80 group-hover:scale-105 transition-all duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 bg-neutral-100/80 px-2.5 py-1 rounded">
                    01 · Official Credential
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-orange-950 transition-colors">
                  Internship Completion Certificate
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  A formal certificate recognizing successful completion of the internship program at DOTREPO.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Verifiable digital credential with unique certificate ID</span>
              </div>
            </div>

            {/* Benefit 2: Capstone Project Certificate */}
            <div className="group relative p-8 sm:p-9 rounded-2xl bg-white border border-neutral-200/80 hover:border-orange-300 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-orange-100/80 group-hover:scale-105 transition-all duration-300">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 bg-neutral-100/80 px-2.5 py-1 rounded">
                    02 · Proof of Work
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-orange-950 transition-colors">
                  Capstone Project Certificate
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Recognition for completing and presenting a capstone project that demonstrates practical technical skills and real-world problem-solving.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Validates technical track specifications & code deliverables</span>
              </div>
            </div>

            {/* Benefit 3: Letter of Recommendation */}
            <div className="group relative p-8 sm:p-9 rounded-2xl bg-white border border-neutral-200/80 hover:border-orange-300 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-orange-100/80 group-hover:scale-105 transition-all duration-300">
                    <ScrollText className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded">
                    03 · Merit-Based
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-orange-950 transition-colors">
                  Letter of Recommendation
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  A professional recommendation letter for eligible interns based on their performance, contributions, technical ability, and professionalism.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Awarded on merit upon performance review (not automatic for all)</span>
              </div>
            </div>

            {/* Benefit 4: Joining Letter + Intern ID */}
            <div className="group relative p-8 sm:p-9 rounded-2xl bg-white border border-neutral-200/80 hover:border-orange-300 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-orange-100/80 group-hover:scale-105 transition-all duration-300">
                    <IdCard className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 bg-neutral-100/80 px-2.5 py-1 rounded">
                    04 · Onboarding Pass
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-orange-950 transition-colors">
                  Joining Letter + Intern ID
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Official internship joining documentation and a unique intern identification number issued during onboarding.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Formal corporate confirmation letter + verified candidate ID</span>
              </div>
            </div>
          </div>

          {/* Interactive Verified Credentials & Documents Specimen Panel */}
          <InternshipCredentialsPanel onApplyClick={() => handleOpenForm()} />

          {/* Tasteful Closing Line & Navigation CTA */}
          <div className="mt-14 pt-10 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                Build your skills. Prove your work. Earn your recognition.
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Official credentials issued by DOTREPO Corp. · Virtual & Remote Cohorts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('tracks-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Explore Tracks</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <button
                onClick={() => handleOpenForm()}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-orange-600/20"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Tracks Directory Section */}
      <section id="tracks-section" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-2">
                <span>OFFERING INTERNSHIPS ACROSS 13 TRACKS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Choose Your Internship Track
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-xl">
                Each track includes hands-on industry assignments, milestone benchmarks, and comprehensive capstone projects.
              </p>
            </div>

            {/* Category Filter (Clean mobile horizontal scroll) */}
            <div className="overflow-x-auto max-w-full pb-2 md:pb-0">
              <div className="flex items-center gap-2 w-max sm:w-auto">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === c.id
                        ? 'bg-emerald-500 text-neutral-950 shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Track Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="relative rounded-2xl bg-[#0e1222] border border-neutral-800/90 hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-emerald-950/30"
              >
                <div>
                  {/* Top Bar: Icon & Slug */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      {track.slug}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider bg-neutral-800/80 px-2 py-0.5 rounded">
                      {track.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-300 leading-relaxed min-h-[38px]">
                    {track.tagline}
                  </p>

                  {/* Skills badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {track.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800/70 text-neutral-300 border border-neutral-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {track.skills.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800/40 text-neutral-400">
                        +{track.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Top Fit Projects preview */}
                  <div className="mt-5 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 mb-1">
                      <span className="font-semibold">TOP FIT CAPSTONE:</span>
                      <span className="text-neutral-400">Capstone Included</span>
                    </div>
                    <p className="text-neutral-200 font-medium text-xs truncate">
                      {track.topFitProjects[0].title}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{track.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTrack(track)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleOpenForm(track.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {INTERNSHIP_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-neutral-100 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Track Details Modal Drawer */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1224] border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedTrack(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                {selectedTrack.slug}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {selectedTrack.duration}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">{selectedTrack.title}</h3>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              {selectedTrack.description}
            </p>

            <div className="mt-5">
              <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Skills & Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTrack.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800 text-emerald-300 border border-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">
                Top Fit Capstone Projects (Capstone Included)
              </h4>
              <div className="space-y-3">
                {selectedTrack.topFitProjects.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800"
                  >
                    <div className="font-bold text-white text-sm">{p.title}</div>
                    <div className="text-xs text-neutral-300 mt-1">{p.description}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] text-emerald-400/90 font-mono">
                      Deliverable: {p.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Batch Cohort 2026 · Official Onboarding</span>
                </span>
              </div>
              <button
                onClick={() => handleOpenForm(selectedTrack.id)}
                className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Apply Now · Onboard for {selectedTrack.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <div className="py-12 bg-neutral-950 border-t border-neutral-800 text-center text-xs text-neutral-400">
        <p>
          DotRepo Corp. Internships · Technology Platform & Incubation Labs
        </p>
        <p className="mt-1">
          Questions or verification queries? Reach out to our talent team or{' '}
          <button
            onClick={() => handleOpenForm()}
            className="text-emerald-400 underline cursor-pointer hover:text-emerald-300 font-medium"
          >
            Apply Directly via Official Registration
          </button>
        </p>
      </div>

      {/* Official Internship Onboarding Form Modal (Elfsight) */}
      <InternshipOnboardingModal
        isOpen={internalRegTrackId !== null}
        trackTitle={internalRegTrackId || undefined}
        onClose={() => setInternalRegTrackId(null)}
      />
    </div>
  );
};
