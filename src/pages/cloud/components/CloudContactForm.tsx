import React, { useState, useEffect } from 'react';
import { CloudConfiguration } from './CloudConfigurator';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, UserCheck, GraduationCap } from 'lucide-react';

interface CloudContactFormProps {
  prefilledConfig: CloudConfiguration | null;
  onOpenInternship?: () => void;
}

export const CloudContactForm: React.FC<CloudContactFormProps> = ({
  prefilledConfig,
  onOpenInternship,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [workload, setWorkload] = useState(prefilledConfig?.workload || 'Web & SaaS Platform');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if prefilledConfig changes from configurator
  useEffect(() => {
    if (prefilledConfig) {
      setWorkload(prefilledConfig.workload);
      const specText = `[Configurator Quote Request]\nTier: ${prefilledConfig.recommendedTier}\nRegion: ${prefilledConfig.region}\nCompute: ${prefilledConfig.vCPUs} vCPUs\nRAM: ${prefilledConfig.ramGB} GB DDR5\nStorage: ${prefilledConfig.storageGB} GB NVMe\nDatabase: ${prefilledConfig.database}\nKubernetes: ${prefilledConfig.enableKubernetes ? 'Yes' : 'No'}\nGPU Fabric: ${prefilledConfig.enableGpu ? 'Yes' : 'No'}\nRecommended Services: ${prefilledConfig.recommendedServices.join(', ')}`;
      setMessage(specText);
    }
  }, [prefilledConfig]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid work email address.';
    }
    if (!company.trim()) newErrors.company = 'Company / organization name is required.';
    if (!message.trim()) newErrors.message = 'Please provide brief architecture requirements.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate instantaneous enterprise dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="next-steps" className="bg-[#000000] text-white py-20 lg:py-28 border-t border-[#1A1A1A]">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Enterprise Engagement Overview */}
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-widest text-[#22C55E] font-mono font-semibold mb-2">
              SECTION 16 // QUOTE NOW
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to deploy on sovereign infrastructure?
            </h2>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Connect directly with our infrastructure architecture team in Bangalore. We provide tailored hardware sizing, proof-of-concept testing quotas, and migration support.
            </p>

            {/* SLA Guarantees */}
            <div className="mt-10 space-y-4 font-mono text-xs border-y border-[#1A1A1A] py-6">
              <div className="flex items-center gap-3 text-neutral-300">
                <Clock className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Sub-15 minute response time for enterprise quote requests</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <UserCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Assigned dedicated Technical Account Manager in India</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Zero-data-loss migration roadmap & SLA credits</span>
              </div>
            </div>

            {/* Secondary CTA: Engineering Internships */}
            <div className="mt-8 p-6 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[2px]">
              <div className="flex items-center gap-2 mb-2 text-[#22C55E]">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                  EARLY CAREER & STUDENTS
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">
                DotRepo Corp. Engineering Internships (2026 Batch)
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                13 Tracks across Systems, Kernel Virtualization, Distributed SQL, and High-Throughput Networking. 100% remote with real production impact.
              </p>
              <button
                type="button"
                onClick={onOpenInternship}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors text-xs font-semibold rounded-[2px]"
              >
                <span>Apply as Engineering Intern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right 7 Cols: Contact Form */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-10 rounded-[2px]">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E] rounded-[2px] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Quote Request Received</h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{name}</span>. A DotRepo Solutions Architect has been assigned to your request and will reach out to <span className="text-white font-medium">{email}</span> within 15 minutes.
                </p>
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs font-mono text-[#22C55E] hover:underline"
                  >
                    SUBMIT ANOTHER CONFIGURATION
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-[#1A1A1A] pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-semibold">
                    ENTERPRISE ENGAGEMENT FORM
                  </span>
                  <p className="text-xs text-neutral-400 mt-1">
                    Please provide your contact and workload requirements. All inquiries are covered under mutual non-disclosure.
                  </p>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-[#000000] border px-3.5 py-2.5 text-sm text-white rounded-[2px] focus-visible:outline-none focus-visible:border-[#22C55E] ${
                        errors.name ? 'border-red-500' : 'border-[#262626]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rsharma@enterprise.com"
                      className={`w-full bg-[#000000] border px-3.5 py-2.5 text-sm text-white rounded-[2px] focus-visible:outline-none focus-visible:border-[#22C55E] ${
                        errors.email ? 'border-red-500' : 'border-[#262626]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                  </div>
                </div>

                {/* Company & Primary Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme FinTech Corp"
                      className={`w-full bg-[#000000] border px-3.5 py-2.5 text-sm text-white rounded-[2px] focus-visible:outline-none focus-visible:border-[#22C55E] ${
                        errors.company ? 'border-red-500' : 'border-[#262626]'
                      }`}
                    />
                    {errors.company && <p className="text-xs text-red-400 mt-1 font-mono">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">
                      Workload Focus
                    </label>
                    <input
                      type="text"
                      value={workload}
                      onChange={(e) => setWorkload(e.target.value)}
                      placeholder="e.g. Distributed SQL Database / Kubernetes"
                      className="w-full bg-[#000000] border border-[#262626] px-3.5 py-2.5 text-sm text-white rounded-[2px] focus-visible:outline-none focus-visible:border-[#22C55E]"
                    />
                  </div>
                </div>

                {/* Architecture Requirements / Config Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                      Technical Requirements / Node Sizing *
                    </label>
                    {prefilledConfig && (
                      <span className="text-[11px] font-mono text-[#22C55E]">
                        PRE-FILLED FROM SIZING TOOL
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your current infrastructure, target latency SLAs, number of nodes, and data residency constraints..."
                    className={`w-full bg-[#000000] border px-3.5 py-2.5 text-sm text-white font-mono rounded-[2px] focus-visible:outline-none focus-visible:border-[#22C55E] ${
                      errors.message ? 'border-red-500' : 'border-[#262626]'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#22C55E] text-black font-semibold text-sm rounded-[2px] hover:bg-[#16A34A] transition-colors duration-150 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting Specification...' : 'Submit Enterprise Quote Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-neutral-500 mt-3 font-mono">
                    SECURED WITH AES-256 ENCRYPTION · NO MARKETING SPAM · DIRECT ACCESS TO ARCHITECTS
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
