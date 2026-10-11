import React, { useState } from 'react';
import { CAREER_POSITIONS } from '../data/mockData';
import { CareerPosition, PageId } from '../types';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  Shield,
  Coffee,
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onOpenContactModal }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeJobModal, setActiveJobModal] = useState<CareerPosition | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const departments = [
    'All',
    'Engineering',
    'AI & Machine Learning',
    'Cloud',
    'Product',
    'Design',
    'Sales',
    'Operations',
    'Research',
  ];

  const filteredJobs =
    selectedDept === 'All'
      ? CAREER_POSITIONS
      : CAREER_POSITIONS.filter((j) => j.department === selectedDept);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      // Redirect to external career tracking portal
      window.location.href = 'https://jobs.lever.co/dotrepo-corp';
    }, 2800);
  };

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Careers at DotRepo Corp.
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">Global Remote & Hybrid Hubs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Build the future with DotRepo Corp.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We are solving the hardest challenges in distributed storage, zero-trust cloud hypervisors, deterministic AI reasoning, and unified business software. Join an engineering-led culture with high agency.
          </p>
        </div>

        {/* Culture & Benefits Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
            <Globe className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="text-sm font-bold text-neutral-950">Global-First Culture</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Work from our hubs in SF, Frankfurt, London, Singapore, or remotely worldwide with full home office stipends.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
            <Sparkles className="w-5 h-5 text-purple-600 mb-3" />
            <h3 className="text-sm font-bold text-neutral-950">Frontier Technology</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Build on bleeding-edge H100 GPU clusters, custom LSM-trees, and state-of-the-art multi-agent execution engines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
            <Shield className="w-5 h-5 text-emerald-600 mb-3" />
            <h3 className="text-sm font-bold text-neutral-950">Top-Tier Equity & Care</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Competitive compensation, transparent equity packages, comprehensive global health coverage, and flexible PTO.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
            <Coffee className="w-5 h-5 text-amber-600 mb-3" />
            <h3 className="text-sm font-bold text-neutral-950">Deep Work & Autonomy</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Async-first communication, zero bureaucratic red tape, and dedicated hack weeks every quarter.
            </p>
          </div>
        </div>

        {/* Department Filters Bar */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Open Positions
              </span>
              <h2 className="text-2xl font-bold text-neutral-950 mt-1">
                Explore Careers Across 8 Core Teams
              </h2>
            </div>
            <span className="text-xs text-neutral-600 font-mono font-medium">
              {filteredJobs.length} Roles Available
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Jobs Listing */}
          <div className="mt-8 space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setActiveJobModal(job)}
                className="p-5 rounded-xl bg-white border border-neutral-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-neutral-950 hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono font-semibold">
                      {job.department}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {job.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {job.type}
                    </span>
                    <span>·</span>
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 shrink-0">
                  <span>View Details & Apply</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Detail & Application Modal */}
        {activeJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {activeJobModal.department}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-950 mt-2">
                    {activeJobModal.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500 font-medium">
                    <span>{activeJobModal.location}</span>
                    <span>·</span>
                    <span>{activeJobModal.type}</span>
                    <span>·</span>
                    <span>{activeJobModal.experience}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveJobModal(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Role Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {activeJobModal.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {activeJobModal.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Requirements
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {activeJobModal.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Application Form */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <h4 className="text-sm font-bold text-neutral-950 mb-3">
                  Apply for this role
                </h4>

                {applySuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 animate-pulse" />
                    <div>
                      <span className="font-bold block">Application Submitted Successfully!</span>
                      <span>Redirecting to external application dashboard (<strong className="font-mono">jobs.lever.co/dotrepo-corp</strong>)...</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Elena Vance"
                          className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="elena@company.com"
                          className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-neutral-700 block mb-1">LinkedIn or GitHub Profile / Portfolio</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/... or https://github.com/..."
                        className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveJobModal(null)}
                        className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
