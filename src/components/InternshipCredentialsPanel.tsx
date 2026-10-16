import React, { useState } from 'react';
import {
  Award,
  FileCode,
  ScrollText,
  IdCard,
  Maximize2,
  X,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { INTERNSHIP_TRACKS, INTERNSHIP_FORM_URL } from '../data/internshipData';
import {
  OfficialInternshipCompletionCertificate,
  OfficialCapstoneCompletionCertificate,
  SignatureSarahChen,
  SignatureDavidOkafor,
} from './OfficialCertificates';

type ViewMode = 'both-certificates' | 'lor' | 'joining';

interface CredentialsPanelProps {
  onApplyClick?: () => void;
}

export const InternshipCredentialsPanel: React.FC<CredentialsPanelProps> = ({ onApplyClick }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('both-certificates');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all-specimen');
  const [modalCertificate, setModalCertificate] = useState<'completion' | 'capstone' | 'lor' | 'joining' | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedTrack = INTERNSHIP_TRACKS.find((t) => t.id === selectedTrackId);
  const trackRole = selectedTrack ? selectedTrack.title : 'Backend AI Intern';
  const capstoneRole = selectedTrack ? selectedTrack.title : 'Backend Intern';

  // Recipient name explicitly updated to "Allen Julles"
  const recipientName = 'Allen Julles';

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://www.dotrepo.in/verify/AZFY286SE');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderLor = (isZoomed = false) => (
    <div
      className={`relative w-full bg-white text-neutral-900 rounded-xl sm:rounded-2xl shadow-md border border-neutral-200 overflow-hidden font-sans ${
        isZoomed ? 'p-6 sm:p-10 md:p-14' : 'p-4 sm:p-6 md:p-8 max-w-3xl mx-auto'
      }`}
    >
      {/* Official Corporate Letterhead */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-neutral-900">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-950 inline-block shrink-0" />
            <span className="font-extrabold text-xl text-neutral-950 tracking-tight leading-none">
              repo
            </span>
          </div>
          <div className="h-5 w-px bg-neutral-300" />
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-neutral-950 tracking-tight">
              DOTREPO CORP.
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono">
              Office of Technical Research & Executive Leadership
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right font-mono text-[10px] text-neutral-600">
          <p className="font-semibold text-neutral-900">REF: DR/HR-ENG/LOR/2026/AZFY286SE</p>
          <p>Issued date: 10/07/26 · Portal: www.dotrepo.in</p>
        </div>
      </div>

      {/* Salutation / Target Header */}
      <div className="my-4 text-xs text-neutral-700 leading-relaxed">
        <p className="font-semibold text-neutral-950 uppercase tracking-wider text-[11px]">
          TO WHOM IT MAY CONCERN
        </p>
        <p className="text-neutral-500 text-[11px] mt-0.5">
          RE: Official Letter of Recommendation for {recipientName}
        </p>
      </div>

      {/* Letter Body */}
      <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
        <p>
          It is our pleasure to formally recommend{' '}
          <strong className="text-neutral-950 font-semibold">{recipientName}</strong>, who has
          successfully completed the technical internship program at{' '}
          <strong className="text-neutral-950 font-semibold">DotRepo Corp.</strong> as a{' '}
          <strong className="text-neutral-950 font-semibold">{trackRole}</strong>.
        </p>

        <p>
          Throughout the internship, {recipientName} exhibited outstanding technical execution,
          architectural discipline, and proactive collaboration on milestone-driven deliverables.
          Their capstone work adhered to real-world code standards and demonstrated practical problem-solving.
        </p>

        <p className="p-3 rounded-lg bg-orange-50/70 border-l-3 border-orange-500 text-neutral-900 text-[11px]">
          <em>Eligibility Note:</em> Recommendation letters at DotRepo are merit-evaluated and
          awarded to interns based on verified milestone execution, benchmark peer reviews, and technical professionalism.
        </p>
      </div>

      {/* Signatures */}
      <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-end justify-between gap-4">
        <div>
          <SignatureSarahChen className="w-24 h-7 text-neutral-950 mb-1" />
          <p className="font-bold text-xs text-neutral-950">Dr. Sarah Chen</p>
          <p className="text-[10px] text-neutral-500">Chief Executive Officer, DotRepo Corp.</p>
        </div>
        <div className="text-right font-mono text-[10px] text-neutral-500">
          <p className="font-semibold text-neutral-800">Verification Hash:</p>
          <p className="text-[9px] text-neutral-400">0x7F2A...88CE</p>
        </div>
      </div>
    </div>
  );

  const renderJoiningLetterAndId = (isZoomed = false) => (
    <div
      className={`grid grid-cols-1 ${
        isZoomed ? 'lg:grid-cols-12' : 'md:grid-cols-12'
      } gap-4 max-w-4xl mx-auto`}
    >
      {/* Joining Letter Part */}
      <div
        className={`${
          isZoomed ? 'lg:col-span-7' : 'md:col-span-7'
        } bg-white rounded-xl sm:rounded-2xl shadow-md border border-neutral-200 p-4 sm:p-6 text-xs text-neutral-700`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <span className="font-bold text-sm text-neutral-950 tracking-tight">.repo</span>
            <span className="text-[10px] font-mono text-neutral-500 ml-1">DOTREPO</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-semibold">
            OFFICIAL APPOINTMENT
          </span>
        </div>

        <p className="text-[10px] font-mono text-neutral-500 mb-2">DOC: DR-ONBOARD-2026-AZFY</p>
        <h4 className="font-bold text-sm text-neutral-950 mb-1">Internship Appointment Letter</h4>
        <p className="text-xs text-neutral-500 mb-3">Issued to: <strong className="text-neutral-900">{recipientName}</strong></p>

        <p className="mb-2 leading-relaxed text-[11px]">
          We are pleased to confirm your appointment as a <strong>{trackRole}</strong> at DotRepo.
          Your designated Intern Identification Number is registered in our portal.
        </p>

        <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 font-mono text-[10px] space-y-1 mb-3">
          <div className="flex justify-between">
            <span className="text-neutral-500">Candidate ID:</span>
            <span className="font-bold text-neutral-900">DR-INT-2026-7782</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Security Clearance:</span>
            <span className="font-bold text-emerald-700">Tier-1 Contributor</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Tenure:</span>
            <span className="text-neutral-700">10 Weeks / Milestone-Paced</span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500">
          <span>People & Culture Operations</span>
          <span className="font-mono text-neutral-400">VERIFIED</span>
        </div>
      </div>

      {/* Intern ID Pass Badge Part */}
      <div
        className={`${
          isZoomed ? 'lg:col-span-5' : 'md:col-span-5'
        } bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg border border-neutral-800 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="font-bold text-xs tracking-tight">.repo</span>
              <span className="text-[9px] font-mono text-neutral-400">INTERN PASS</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3 my-3">
            <div className="w-12 h-12 rounded-xl bg-orange-600/30 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-sm shrink-0">
              AJ
            </div>
            <div className="min-w-0">
              <h5 className="font-bold text-sm text-white truncate">{recipientName}</h5>
              <p className="text-[10px] text-orange-400 font-mono truncate">{trackRole}</p>
              <p className="text-[9px] text-neutral-400 font-mono mt-0.5">ID: DR-INT-2026-7782</p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-800/80 font-mono text-[9px] text-neutral-400 space-y-1">
          <div className="flex justify-between">
            <span>ISSUED: 10/05/26</span>
            <span className="text-orange-400">DOTREPO CORP</span>
          </div>
          <div className="text-center pt-1 text-[8px] text-neutral-500">
            DIGITAL CREDENTIAL SPECIMEN
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8 pt-8 border-t border-neutral-200">
      {/* Header and Controls Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-orange-100 text-orange-800 border border-orange-200">
              <ShieldCheck className="w-3 h-3 text-orange-600" />
              OFFICIAL SPECIMEN
            </span>
            <span className="text-xs font-mono text-neutral-500">
              Issued to: <strong className="text-neutral-900 font-bold">{recipientName}</strong>
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-950 mt-1">
            Verified Internship Credentials & Certificates
          </h3>
        </div>

        {/* Dynamic Track Preview Dropdown */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <label
            htmlFor="track-specimen-select"
            className="text-xs font-mono font-semibold text-neutral-600 shrink-0"
          >
            Track:
          </label>
          <select
            id="track-specimen-select"
            value={selectedTrackId}
            onChange={(e) => setSelectedTrackId(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs cursor-pointer"
          >
            <option value="all-specimen">Official Specimen (As Issued)</option>
            {INTERNSHIP_TRACKS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation View Switcher (Desktop Tabs + Mobile Pills) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-neutral-200">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-medium">
          <button
            onClick={() => setViewMode('both-certificates')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'both-certificates'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-orange-400" />
            <span>Both Certificates</span>
          </button>

          <button
            onClick={() => setViewMode('lor')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'lor'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5 text-orange-400" />
            <span>Recommendation Letter</span>
          </button>

          <button
            onClick={() => setViewMode('joining')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'joining'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60'
            }`}
          >
            <IdCard className="w-3.5 h-3.5 text-orange-400" />
            <span>Joining & ID Pass</span>
          </button>
        </div>

        {/* Global verification action */}
        <button
          onClick={handleCopyLink}
          className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 text-xs font-mono flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer ml-auto"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copied ID URL!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
              <span>Verify ID: AZFY286SE</span>
            </>
          )}
        </button>
      </div>

      {/* Main Viewport Container */}
      <div className="relative">
        {viewMode === 'both-certificates' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            {/* LEFT HALF: Internship Completion Certificate */}
            <div className="flex flex-col bg-neutral-50/80 rounded-2xl p-3.5 sm:p-4 border border-neutral-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-600" />
                  <span className="text-xs font-bold font-mono text-neutral-900 uppercase">
                    Internship Completion Certificate
                  </span>
                </div>
                <button
                  onClick={() => setModalCertificate('completion')}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 text-[11px] font-mono flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
                  title="Enlarge Certificate"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge</span>
                </button>
              </div>

              {/* Compact Scaled Official Certificate (Left Half) */}
              <div className="flex-1 flex flex-col justify-center">
                <OfficialInternshipCompletionCertificate
                  recipientName={recipientName}
                  trackRole={trackRole}
                  compact={true}
                  isZoomed={false}
                />
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>01 · Corporate Completion Specimen</span>
                <span className="font-semibold text-neutral-800">{recipientName}</span>
              </div>
            </div>

            {/* Capstone Project Certificate */}
            <div className="flex flex-col bg-blue-50/40 rounded-2xl p-3.5 sm:p-4 border border-blue-200/70 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-200/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  <span className="text-xs font-bold font-mono text-neutral-900 uppercase">
                    Capstone Project Certificate
                  </span>
                </div>
                <button
                  onClick={() => setModalCertificate('capstone')}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 text-neutral-700 border border-neutral-200 text-[11px] font-mono flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
                  title="Enlarge Certificate"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge</span>
                </button>
              </div>

              {/* Compact Scaled Official Certificate (Right Half) */}
              <div className="flex-1 flex flex-col justify-center">
                <OfficialCapstoneCompletionCertificate
                  recipientName={recipientName}
                  trackRole={capstoneRole}
                  compact={true}
                  isZoomed={false}
                />
              </div>

              <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span>02 · Capstone Project Specimen</span>
                <span className="font-semibold text-neutral-900">{recipientName}</span>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'lor' && (
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            {renderLor(false)}
          </div>
        )}

        {viewMode === 'joining' && (
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            {renderJoiningLetterAndId(false)}
          </div>
        )}
      </div>

      {/* Full-Screen Zoom Modal */}
      {modalCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-neutral-950 rounded-2xl p-4 sm:p-6 my-auto max-h-[92vh] overflow-y-auto border border-neutral-800">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800 sticky top-0 bg-neutral-950 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <h4 className="text-sm font-mono font-bold text-white uppercase">
                  {modalCertificate === 'completion'
                    ? 'Official Certificate of Internship Completion'
                    : modalCertificate === 'capstone'
                    ? 'Official Certificate of Capstone Project Completion'
                    : modalCertificate === 'lor'
                    ? 'Official Letter of Recommendation'
                    : 'Official Appointment & Intern ID Pass'}
                </h4>
              </div>
              <button
                onClick={() => setModalCertificate(null)}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Render Inside Modal */}
            <div className="py-2">
              {modalCertificate === 'completion' && (
                <OfficialInternshipCompletionCertificate
                  recipientName={recipientName}
                  trackRole={trackRole}
                  compact={false}
                  isZoomed={true}
                />
              )}
              {modalCertificate === 'capstone' && (
                <OfficialCapstoneCompletionCertificate
                  recipientName={recipientName}
                  trackRole={capstoneRole}
                  compact={false}
                  isZoomed={true}
                />
              )}
              {modalCertificate === 'lor' && renderLor(true)}
              {modalCertificate === 'joining' && renderJoiningLetterAndId(true)}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs font-mono text-neutral-400">
                Issued to {recipientName} · DOTREPO Verification ID: AZFY286SE
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalCertificate(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setModalCertificate(null);
                    if (onApplyClick) onApplyClick();
                    else window.location.href = 'https://zohosecurepay.in/checkout/n8gqahjg-ynyaxz2dcba44/DotRepo-Internship';
                  }}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Apply for Track</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
