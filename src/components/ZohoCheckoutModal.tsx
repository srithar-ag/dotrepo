import React, { useEffect } from 'react';
import { X, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface InternshipOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle?: string;
  onPaymentSuccess?: (trackTitle?: string) => void;
}

export const ZohoCheckoutModal: React.FC<InternshipOnboardingModalProps> = ({
  isOpen,
  onClose,
  trackTitle,
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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

  // Ensure Elfsight platform script is initialized when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Check if script already exists in document
    const scriptSrc = 'https://elfsightcdn.com/platform.js';
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-trigger Elfsight mutation observer or initialize
      try {
        if ((window as any).eapps?.initialize) {
          (window as any).eapps.initialize();
        } else if ((window as any).Elfsight?.initialize) {
          (window as any).Elfsight.initialize();
        }
      } catch {
        // silent
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[840px] max-h-[92vh] bg-[#0c101d] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
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
              {trackTitle ? (
                <p className="text-xs text-neutral-400 truncate max-w-[280px] sm:max-w-[440px]">
                  Track Selection: <span className="text-emerald-400 font-medium">{trackTitle}</span>
                </p>
              ) : (
                <p className="text-xs text-neutral-400">
                  Engineering Cohort 2026 Batch · Official Enrollment
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Elfsight Form Builder Container */}
        <div className="flex-1 w-full bg-white relative overflow-y-auto p-4 sm:p-6 min-h-[520px]">
          {/* Elfsight Form Builder | Untitled Form Builder */}
          <div
            className="elfsight-app-fe0369c4-724c-4f1f-ae8c-648a7df6d995 w-full min-h-[480px]"
            data-elfsight-app-lazy
          />
        </div>

        {/* Bottom Trust Badge Footer */}
        <div className="px-4 py-2.5 border-t border-neutral-800 bg-[#090d18] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official DotRepo Engineering Portal · Verification Secured</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <a
              href="mailto:communications@dotrepo.in"
              className="hover:text-emerald-400 transition-colors underline font-mono"
            >
              communications@dotrepo.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
