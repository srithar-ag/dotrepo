import React, { useState } from 'react';
import {
  X,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Star,
  Tag,
  Clock,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  courseTitle = 'AI Engineering with Claude',
}) => {
  const [billingPlan, setBillingPlan] = useState<'upfront' | 'monthly'>('upfront');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponCode, setCouponCode] = useState('AIENGINEER40');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experienceLevel: '1-3 years',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const originalPrice = billingPlan === 'upfront' ? 1290 : 490;
  const discountRate = couponApplied ? 0.4 : 0;
  const finalPrice = Math.round(originalPrice * (1 - discountRate));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              Enrollment Confirmed!
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Welcome to <strong>{courseTitle}</strong>! A confirmation receipt and your sandbox workspace access credentials have been sent to{' '}
              <span className="text-blue-700 font-mono font-medium">{formData.email || 'your email'}</span>.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Next Steps:</span>
              </div>
              <p>• Your dedicated AI mentor will be assigned in your student dashboard within 2 hours.</p>
              <p>• Access your private Claude 3.7 API keys and pre-configured Docker sandboxes.</p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-md"
            >
              Go to Student Workspace
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Official Nanodegree Program
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Enroll in {courseTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Anthropic certified curriculum · 13 real projects · 1-on-1 human mentor feedback
            </p>

            {/* Plan Selector */}
            <div className="mt-6 grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingPlan('upfront')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  billingPlan === 'upfront'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>All-Inclusive 3-Month Access</div>
                <div className="text-[11px] text-emerald-700 font-medium">Save extra $180 upfront</div>
              </button>

              <button
                type="button"
                onClick={() => setBillingPlan('monthly')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  billingPlan === 'monthly'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>Pay-as-you-learn Monthly</div>
                <div className="text-[11px] text-slate-500 font-normal">Cancel anytime</div>
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-medium">Total Program Tuition:</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold text-slate-900">${finalPrice}</span>
                  {couponApplied && (
                    <span className="text-xs text-slate-400 line-through">
                      ${originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    {billingPlan === 'monthly' ? '/month' : 'one-time'}
                  </span>
                </div>
              </div>

              {couponApplied && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700 text-xs font-mono font-bold">
                  <Tag className="w-3 h-3 text-amber-600" />
                  <span>40% OFF APPLIED</span>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Engineering Background
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, experienceLevel: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs cursor-pointer"
                >
                  <option value="beginner">Beginner (0-1 yrs programming)</option>
                  <option value="1-3 years">Intermediate (1-3 yrs software development)</option>
                  <option value="senior">Senior Engineer / Tech Lead (4+ yrs)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Complete Enrollment (${finalPrice})</span>
                </button>
              </div>

              <p className="text-xs text-center text-slate-500 leading-normal">
                Includes 7-day 100% money-back guarantee. No questions asked.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
