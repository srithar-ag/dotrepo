import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface CloudAnnouncementBarProps {
  onApplyNow?: () => void;
}

export const CloudAnnouncementBar: React.FC<CloudAnnouncementBarProps> = ({ onApplyNow }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-[#0A0A0A] text-white border-b border-[#1A1A1A] text-xs py-2 px-4 transition-all"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto flex items-center justify-between gap-3 px-2 sm:px-4">
        <div className="flex items-center gap-2.5 truncate">
          <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full shrink-0" aria-hidden="true" />
          <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider hidden sm:inline">
            UPDATE
          </span>
          <span className="text-neutral-200 text-xs truncate">
            DotRepo Corp. Engineering Internships (2026 Batch) · 13 Tracks · 100% Remote
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onApplyNow}
            className="inline-flex items-center gap-1.5 text-xs text-[#22C55E] hover:text-[#16A34A] font-semibold transition-colors cursor-pointer group"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
