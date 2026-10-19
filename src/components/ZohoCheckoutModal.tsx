import React, { useEffect } from 'react';
import { X, ShieldCheck, ExternalLink } from 'lucide-react';

interface ZohoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle?: string;
  onPaymentSuccess?: (trackTitle?: string) => void;
}

export const ZOHO_CHECKOUT_URL =
  'https://zohosecurepay.in/checkout/n8gqahjg-ynyaxz2dcba44/DotRepo-Internship';

export const ZohoCheckoutModal: React.FC<ZohoCheckoutModalProps> = ({
  isOpen,
  onClose,
  trackTitle,
  onPaymentSuccess,
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

  // Listen for Zoho Checkout postMessage events
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        let payload: any = event.data;
        if (typeof payload === 'string') {
          try {
            payload = JSON.parse(payload);
          } catch {
            // Raw string message
            if (
              payload.includes('payment_success') ||
              payload.includes('payment_successful') ||
              payload.includes('payment.captured')
            ) {
              if (onPaymentSuccess) onPaymentSuccess(trackTitle);
              onClose();
              return;
            }
          }
        }

        if (payload && typeof payload === 'object') {
          const action = payload.action || payload.event || payload.type || payload.status;
          if (
            action === 'payment_success' ||
            action === 'payment_successful' ||
            action === 'payment.captured' ||
            payload.payment_status === 'success' ||
            payload.status === 'success'
          ) {
            if (onPaymentSuccess) onPaymentSuccess(trackTitle);
            onClose();
          }
        }
      } catch (err) {
        // Ignore parsing errors for non-related window messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen, trackTitle, onPaymentSuccess, onClose]);

  if (!isOpen) return null;

  const handleManualConfirm = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess(trackTitle);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[800px] h-[92vh] max-h-[1050px] bg-[#0c101d] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-800 bg-[#090d18] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">DotRepo Corp. Internship</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Zoho Secure Checkout
                </span>
              </div>
              {trackTitle && (
                <p className="text-xs text-neutral-400 truncate max-w-[280px] sm:max-w-[400px]">
                  Track: {trackTitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={ZOHO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
              title="Open checkout in new tab"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Zoho Checkout Iframe */}
        <div className="flex-1 w-full bg-white relative overflow-hidden flex items-center justify-center">
          <iframe
            src={ZOHO_CHECKOUT_URL}
            width="768"
            height="998"
            style={{ border: 'none' }}
            className="w-full h-full max-w-full"
            title="DotRepo Internship Zoho Checkout"
          />
        </div>

        {/* Bottom Trust Badge Footer */}
        <div className="px-4 py-2.5 border-t border-neutral-800 bg-[#090d18] flex items-center justify-between text-[11px] text-neutral-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-bit SSL Encrypted · Official Zoho Checkout Gateway</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleManualConfirm}
              className="text-[11px] text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Payment done? Click to trigger confirmation toast</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
