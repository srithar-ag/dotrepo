import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, ShieldCheck, Mail, Sparkles, ExternalLink } from 'lucide-react';

export interface ToastData {
  id: string;
  title: string;
  message: string;
  trackTitle?: string;
  referenceId?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onDismiss: () => void;
  onViewInternship?: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onDismiss,
  onViewInternship,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!toast) return;

    const duration = toast.duration || 8000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    setProgress(100);

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onDismiss();
            return 0;
          }
          return Math.max(0, prev - step);
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [toast, isPaused, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] max-w-md w-[calc(100vw-2.5rem)] animate-in slide-in-from-bottom-5 fade-in duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="assertive"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0d121f] border border-emerald-500/40 shadow-2xl shadow-emerald-500/10 text-white p-5 backdrop-blur-md">
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Zoho Checkout Confirmed
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h4 className="font-bold text-sm text-white mt-0.5 flex items-center gap-1.5">
                <span>{toast.title}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h4>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message body */}
        <p className="mt-2.5 text-xs text-neutral-300 leading-relaxed pl-11">
          {toast.message}
        </p>

        {/* Meta badges */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/80 pl-11 flex flex-wrap items-center gap-2 text-[11px]">
          {toast.trackTitle && (
            <span className="inline-flex items-center gap-1 text-emerald-300 font-mono bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-700">
              <span>Track:</span>
              <strong className="text-white">{toast.trackTitle}</strong>
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-neutral-400 bg-neutral-900/60 px-2 py-1 rounded-md border border-neutral-800">
            <Mail className="w-3 h-3 text-emerald-400" />
            <span>Confirmation email queued</span>
          </span>

          <span className="inline-flex items-center gap-1 text-neutral-400 bg-neutral-900/60 px-2 py-1 rounded-md border border-neutral-800">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>2026 Batch Registered</span>
          </span>
        </div>

        {/* Actions row */}
        {onViewInternship && (
          <div className="mt-3.5 pl-11 flex items-center gap-3">
            <button
              onClick={() => {
                onViewInternship();
                onDismiss();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <span>Explore Internship Roadmap & Syllabus</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Progress Bar (countdown) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800/80">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
