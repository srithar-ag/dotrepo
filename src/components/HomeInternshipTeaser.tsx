import React from 'react';
import { PageId } from '../types';
import { INTERNSHIP_FORM_URL } from '../data/internshipData';
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Code2,
  GraduationCap,
  Award,
  Send,
} from 'lucide-react';

interface HomeInternshipTeaserProps {
  onNavigate: (page: PageId) => void;
}

export const HomeInternshipTeaser: React.FC<HomeInternshipTeaserProps> = ({ onNavigate }) => {
  const tracksList = [
    { title: 'Frontend Intern', code: '/FE' },
    { title: 'Data Analyst Intern', code: '/DATA' },
    { title: 'Backend (Optimised) Intern', code: '/BE' },
    { title: 'AI Fluency Intern', code: '/FLUENCY' },
    { title: 'Prompt Engineering Intern', code: '/PROMPT' },
    { title: 'Machine Learning Intern', code: '/ML' },
    { title: 'SEO Intern', code: '/SEO' },
    { title: 'Cybersecurity Intern', code: '/SECURITY' },
  ];

  return (
    <section className="py-16 bg-[#090c18] border-y border-neutral-800 text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-600/10 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl border border-neutral-800 bg-[#0e1224]/90 p-5 sm:p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left: Headline & Program Details */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold uppercase tracking-wider">DotRepo Corp. Internship Program</span>
                <span className="hidden sm:inline text-neutral-400">· Bangalore, India & Remote</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Join DotRepo Corp. as an Intern. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  From application to verifiable credential.
                </span>
              </h2>

              <p className="mt-3 text-neutral-300 text-sm leading-relaxed">
                Move through the program at your own pace. Work on real production architectures, submit capstones with 1-on-1 industry code reviews, and earn an official credential with Letter of Recommendation (LOR) eligibility.
              </p>

              {/* Price Tags */}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                <div className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 border border-emerald-500/40 text-neutral-200">
                  <span className="text-emerald-400 font-bold">For Internships:</span> ₹199
                </div>
                <div className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 border border-blue-500/40 text-neutral-200">
                  <span className="text-blue-400 font-bold">For Projects:</span> ₹399 / project
                </div>
                <div className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300">
                  <span>Self-paced · 4 to 8 Weeks</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={INTERNSHIP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply Now · Onboard as Intern</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <button
                  onClick={() => onNavigate('internship')}
                  className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore All 8 Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: 8 Tracks Interactive Matrix */}
            <div className="lg:w-[420px] shrink-0">
              <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>OPEN TRACKS (2026 COHORT)</span>
                <span className="text-emerald-400 text-[11px]">8 Active</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {tracksList.map((t) => (
                  <button
                    key={t.code}
                    onClick={() => onNavigate('internship')}
                    className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/40 text-left transition-colors cursor-pointer group flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      {t.code}
                    </span>
                    <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors truncate mt-1">
                      {t.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
