import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface InternshipOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle?: string;
}

export const InternshipOnboardingModal: React.FC<InternshipOnboardingModalProps> = ({
  isOpen,
  onClose,
  trackTitle,
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Ensure Elfsight script is present and initialized
      const existingScript = document.querySelector(
        'script[src="https://elfsightcdn.com/platform.js"]'
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);
      } else if (typeof (window as any).elfsight !== 'undefined') {
        try {
          (window as any).elfsight?.initialize?.();
        } catch {
          // ignore
        }
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[840px] h-[92vh] max-h-[1050px] bg-[#0c101d] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-800 bg-[#090d18] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">DotRepo Corp. Internship</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Onboarding Form
                </span>
              </div>
              {trackTitle && (
                <p className="text-xs text-neutral-400 truncate max-w-[280px] sm:max-w-[420px]">
                  Selected Track: {trackTitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Elfsight Internship Onboarding Form */}
        <div className="flex-1 w-full bg-white relative overflow-y-auto p-2 sm:p-6 text-neutral-900">
          <div
            className="elfsight-app-fe0369c4-724c-4f1f-ae8c-648a7df6d995 w-full min-h-[550px]"
            data-elfsight-app-lazy
          />
        </div>

        {/* Bottom Trust Badge Footer */}
        <div className="px-4 py-2.5 border-t border-neutral-800 bg-[#090d18] flex items-center justify-between text-[11px] text-neutral-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official DotRepo Engineering Candidate Onboarding · 2026 Batch</span>
          </div>
          <span className="font-mono text-neutral-500 hidden sm:inline">13 Specialized Tracks</span>
        </div>
      </div>
    </div>
  );
};
