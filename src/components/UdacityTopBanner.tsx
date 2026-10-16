import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, ExternalLink } from 'lucide-react';
import { INTERNSHIP_FORM_URL } from '../data/internshipData';

interface UdacityTopBannerProps {
  onExploreInternship?: () => void;
  onOpenRegistration?: () => void;
}

export const UdacityTopBanner: React.FC<UdacityTopBannerProps> = ({
  onExploreInternship,
  onOpenRegistration,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-[#090e18] text-white border-b border-emerald-900/40 text-xs py-2 px-3 sm:px-6 transition-all z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left message with animated beacon */}
        <div className="flex items-center gap-2 text-neutral-200 text-[11px] sm:text-xs truncate">
          <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="font-semibold text-emerald-300 truncate">
            <span className="sm:hidden">DotRepo Internships 2026:</span>
            <span className="hidden sm:inline">DotRepo Corp. Engineering Internships (2026 Batch):</span>
          </span>
          <span className="text-neutral-300 hidden md:inline">
            13 Tracks Available
          </span>
          <span className="hidden lg:inline text-neutral-500">•</span>
          <span className="hidden lg:inline text-neutral-400 font-mono text-[11px]">
            100% Remote & Self-Paced
          </span>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onExploreInternship && (
            <button
              onClick={onExploreInternship}
              className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[11px] font-medium transition-all cursor-pointer"
            >
              Tracks
            </button>
          )}

          <button
            onClick={() => {
              if (onOpenRegistration) onOpenRegistration();
              else window.location.href = 'https://zohosecurepay.in/checkout/n8gqahjg-ynyaxz2dcba44/DotRepo-Internship';
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
