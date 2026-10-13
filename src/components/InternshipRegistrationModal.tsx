import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Lock,
  CreditCard,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
} from 'lucide-react';
import { INTERNSHIP_TRACKS } from '../data/internshipData';

interface InternshipRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const InternshipRegistrationModal: React.FC<InternshipRegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTrackId,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [college, setCollege] = useState('');
  const [degreeBranch, setDegreeBranch] = useState('');
  const [academicYear, setAcademicYear] = useState('3rd Year');
  const [gradYear, setGradYear] = useState('2026');
  const [selectedTrackId, setSelectedTrackId] = useState(
    initialTrackId || INTERNSHIP_TRACKS[0]?.id || 'frontend-intern'
  );
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  // Flow & UI Status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'checkout' | 'verifying' | 'success' | 'failed'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Sync initialTrackId when opened
  useEffect(() => {
    if (initialTrackId) {
      setSelectedTrackId(initialTrackId);
    }
  }, [initialTrackId, isOpen]);

  // Load Razorpay Checkout SDK Script
  useEffect(() => {
    if (!isOpen) return;
    if (document.getElementById('razorpay-checkout-script')) return;

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTrack =
    INTERNSHIP_TRACKS.find((t) => t.id === selectedTrackId) || INTERNSHIP_TRACKS[0];

  // Client-side quick validation before dispatch
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Full name is required (min 2 characters)';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'A valid email address is required';
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 7) {
      errs.phone = 'Mobile number is required';
    }
    if (!college.trim()) {
      errs.college = 'College/University name is required';
    }
    if (!degreeBranch.trim()) {
      errs.degreeBranch = 'Degree and branch are required';
    }
    if (!consentGiven) {
      errs.consentGiven = 'You must agree to the terms and privacy conditions';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyCode = () => {
    if (verifiedData?.registrationCode) {
      navigator.clipboard.writeText(verifiedData.registrationCode);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'checkout' || status === 'verifying') return;

    if (!validateForm()) return;

    setErrorMessage('');
    setStatus('submitting');
    setStatusMessage('Initiating verified registration and creating Razorpay order...');

    try {
      const fullPhone = `${countryCode.trim()} ${phoneNumber.trim()}`;

      // 1. Initiate registration on the backend
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: fullPhone,
          college: college.trim(),
          degreeBranch: degreeBranch.trim(),
          academicYear,
          gradYear: Number(gradYear),
          trackId: selectedTrackId,
          linkedinUrl: linkedinUrl.trim() || undefined,
          githubUrl: githubUrl.trim() || undefined,
          portfolioUrl: portfolioUrl.trim() || undefined,
          consentGiven: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus('failed');
        setErrorMessage(data.message || 'Failed to initiate registration.');
        if (data.errors) setErrors(data.errors);
        return;
      }

      const orderData = data.data;

      // 2. Trigger Razorpay Checkout
      setStatus('checkout');
      setStatusMessage('Opening secure Razorpay payment window...');

      // Check if Razorpay SDK loaded
      if (typeof window.Razorpay === 'undefined') {
        // Fallback wait for script
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      if (typeof window.Razorpay === 'undefined') {
        setStatus('failed');
        setErrorMessage('Razorpay Checkout SDK failed to load. Please check your internet connection and try again.');
        return;
      }

      const razorpayOptions = {
        key: orderData.razorpayKeyId,
        amount: orderData.amount, // 19900 paise
        currency: orderData.currency || 'INR',
        name: 'DotRepo Corp.',
        description: `Internship Registration Fee - ${orderData.track.title}`,
        order_id: orderData.orderId,
        prefill: {
          name: orderData.applicant.name,
          email: orderData.applicant.email,
          contact: orderData.applicant.phone,
        },
        notes: {
          registration_id: orderData.registrationId,
          registration_code: orderData.registrationCode,
          track_id: orderData.track.id,
        },
        theme: {
          color: '#059669', // Emerald
        },
        modal: {
          ondismiss: () => {
            if (status !== 'success') {
              setStatus('failed');
              setErrorMessage(
                'Payment was cancelled or closed before completion. Your registration details have been saved, and you can re-attempt payment below.'
              );
            }
          },
        },
        handler: async (response: any) => {
          // 3. Authoritative Backend Payment Verification
          setStatus('verifying');
          setStatusMessage('Authoritatively verifying payment signature with server...');

          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                registrationId: orderData.registrationId,
                orderId: orderData.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              setStatus('failed');
              setErrorMessage(
                verifyData.message || 'Payment signature verification failed. Please contact admissions support.'
              );
              return;
            }

            // Success Confirmed!
            setVerifiedData({
              ...verifyData.data,
              applicantName: fullName,
              applicantEmail: email,
            });
            setStatus('success');
          } catch (vErr: any) {
            console.error('Payment verification error:', vErr);
            setStatus('failed');
            setErrorMessage('Network error while verifying payment. Please do not re-pay until checking confirmation.');
          }
        },
      };

      const rzpInstance = new window.Razorpay(razorpayOptions);
      rzpInstance.on('payment.failed', (failResp: any) => {
        console.error('Payment failed:', failResp);
        setStatus('failed');
        setErrorMessage(
          failResp.error?.description || 'Payment was declined by your bank or payment method. Please try another card or UPI.'
        );
      });
      rzpInstance.open();
    } catch (err: any) {
      console.error('Registration dispatch error:', err);
      setStatus('failed');
      setErrorMessage(err.message || 'Failed to submit registration. Please try again.');
    }
  };

  const handleResetForm = () => {
    setStatus('idle');
    setErrorMessage('');
    setStatusMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090b14] border border-neutral-800 rounded-3xl shadow-2xl text-white overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                Official Internship Registration
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                DotRepo Corp. · 2026 Batch Cohort · Fixed Fee: ₹199 INR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close registration modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {status === 'success' && verifiedData ? (
            /* Success State */
            <div className="py-6 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  Payment Verified & Registered
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Welcome to DotRepo, {verifiedData.applicantName || 'Intern'}!
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-md mx-auto">
                  Your registration for the <strong>{verifiedData.trackTitle}</strong> has been authoritatively verified.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-left max-w-lg mx-auto space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
                  <span className="text-neutral-400">REGISTRATION ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-400 text-sm">
                      {verifiedData.registrationCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                      title="Copy Registration ID"
                    >
                      {copiedId ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">SELECTED TRACK:</span>
                  <span className="font-semibold text-white font-sans text-right">
                    {verifiedData.trackTitle}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">PAYMENT REFERENCE:</span>
                  <span className="text-neutral-300 font-mono text-[11px]">
                    {verifiedData.paymentId || 'Verified'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">AMOUNT PAID:</span>
                  <span className="font-bold text-emerald-400">₹199 INR</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-400">ONBOARDING STATUS:</span>
                  <span className="font-semibold text-emerald-400">Applied & Confirmed</span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-left max-w-lg mx-auto text-xs text-neutral-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Important Next Steps:</span>
                </div>
                <p>
                  1. <strong>Orientation Welcome Email:</strong> A confirmation receipt and candidate onboarding roadmap have been sent to{' '}
                  <span className="text-blue-400 font-mono">{verifiedData.applicantEmail}</span>.
                </p>
                <p>
                  2. <strong>Track Lead Assignment:</strong> You will receive batch repository invitations and engineering guidelines within 24 hours.
                </p>
                <p>
                  3. <strong>Self-Paced Milestones:</strong> All assignments are flexible and self-paced over 6-8 weeks with dual certification upon capstone delivery.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Close & Return to Portal
              </button>
            </div>
          ) : (
            /* Registration Form & Status Views */
            <div>
              {/* Ongoing status overlays */}
              {(status === 'submitting' || status === 'checkout' || status === 'verifying') && (
                <div className="mb-5 p-4 rounded-xl bg-neutral-900 border border-emerald-500/40 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-emerald-400 animate-spin shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Processing Transaction</h5>
                    <p className="text-[11px] text-neutral-300 font-mono mt-0.5">{statusMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {status === 'failed' && (
                <div className="mb-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-rose-300">Action Required</h5>
                    <p className="text-xs text-rose-200 mt-0.5">{errorMessage}</p>
                    <button
                      onClick={handleResetForm}
                      className="mt-2 text-xs font-bold text-white underline cursor-pointer hover:text-rose-100"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Track Selector Bar */}
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="modal-track-select"
                      className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider"
                    >
                      Internship Track:
                    </label>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      Fixed Fee: ₹199 INR
                    </span>
                  </div>

                  <select
                    id="modal-track-select"
                    value={selectedTrackId}
                    onChange={(e) => setSelectedTrackId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {INTERNSHIP_TRACKS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.category}) · 6-8 Wks
                      </option>
                    ))}
                  </select>

                  <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                    {currentTrack?.tagline}
                  </p>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Allen Julles"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl bg-neutral-950 border ${
                        errors.fullName ? 'border-rose-500' : 'border-neutral-800'
                      } text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="allen@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl bg-neutral-950 border ${
                        errors.email ? 'border-rose-500' : 'border-neutral-800'
                      } text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Phone Number with Country Code */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Mobile Number (WhatsApp Enabled) *</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+49">+49 (DE)</option>
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-xl bg-neutral-950 border ${
                        errors.phone ? 'border-rose-500' : 'border-neutral-800'
                      } text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500`}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.phone}</span>
                  )}
                </div>

                {/* Academic Background */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-neutral-500" />
                      <span>College / University *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. National Institute of Tech"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl bg-neutral-950 border ${
                        errors.college ? 'border-rose-500' : 'border-neutral-800'
                      } text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500`}
                    />
                    {errors.college && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.college}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Degree & Branch *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. B.Tech Computer Science"
                      value={degreeBranch}
                      onChange={(e) => setDegreeBranch(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl bg-neutral-950 border ${
                        errors.degreeBranch ? 'border-rose-500' : 'border-neutral-800'
                      } text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500`}
                    />
                    {errors.degreeBranch && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.degreeBranch}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Current Academic Year
                    </label>
                    <select
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year / Final Year">4th Year / Final Year</option>
                      <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                      <option value="Recent Graduate / Professional">Recent Graduate / Working</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Expected Graduation Year
                    </label>
                    <select
                      value={gradYear}
                      onChange={(e) => setGradYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2024">2024 or earlier</option>
                    </select>
                  </div>
                </div>

                {/* Profiles & Links (Optional but recommended) */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider block">
                    Online Profiles & Portfolios (Optional)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="relative">
                      <Linkedin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="LinkedIn URL"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="relative">
                      <Github className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="GitHub URL"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="relative">
                      <Globe className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="Portfolio / Resume URL"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Mandatory Consent & Compliance Box */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 text-[11px] space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                    />
                    <span className="leading-relaxed">
                      I confirm the accuracy of my details. I understand the fixed registration & assessment processing fee of <strong>₹199 INR</strong> is non-refundable. Registration does not constitute guaranteed employment or credentials; certificates and LOR eligibility require satisfactory submission and review of required track capstone milestones.
                    </span>
                  </label>
                  {errors.consentGiven && (
                    <span className="text-[10px] text-rose-400 block font-semibold">
                      {errors.consentGiven}
                    </span>
                  )}
                </div>

                {/* Order Summary & Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || status === 'checkout' || status === 'verifying'}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    {status === 'submitting' || status === 'checkout' || status === 'verifying' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Registration...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Proceed to Pay ₹199 via Razorpay</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="mt-2.5 flex items-center justify-center gap-3 text-[11px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-neutral-400" />
                      256-Bit SSL Encrypted
                    </span>
                    <span>·</span>
                    <span>Razorpay Verified Gateway</span>
                    <span>·</span>
                    <span>Instant Digital Receipt</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
