import React, { useState } from 'react';
import { PageId, ContactFormData } from '../types';
import {
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Users,
  Briefcase,
} from 'lucide-react';

interface ContactPageProps {
  initialTopic?: string;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialTopic, onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    country: 'United States',
    topic: 'sales',
    message: initialTopic ? `Inquiry regarding: ${initialTopic}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const topics = [
    { id: 'sales', label: 'Talk to Sales', desc: 'Custom enterprise quotes & architecture reviews', icon: Briefcase },
    { id: 'partner', label: 'Partner with DotRepo Corp.', desc: 'System integrators, VARs & ISV alliances', icon: Users },
    { id: 'developer', label: 'Developer Support', desc: 'API keys, webhook debugging & technical questions', icon: MessageSquare },
    { id: 'general', label: 'General Enquiries', desc: 'Media, analyst relations & executive briefings', icon: HelpCircle },
    { id: 'careers', label: 'Careers', desc: 'Questions regarding open roles & talent recruiting', icon: Building2 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please provide a valid work email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Contact DotRepo Corp.
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight mt-3 text-balance">
            Connect with our global enterprise team.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Whether evaluating migration from legacy ERPs, architecting high-throughput database clusters, or exploring multi-agent automation, we are here to assist.
          </p>
        </div>

        {/* 5 Contact Options Selector Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {topics.map((t) => {
            const Icon = t.icon;
            const isSelected = formData.topic === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFormData({ ...formData, topic: t.id as any })}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm text-neutral-950 ring-1 ring-blue-500/20'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                <div>
                  <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-blue-600' : 'text-neutral-500'}`} />
                  <h4 className="text-xs font-bold leading-tight text-neutral-950">{t.label}</h4>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-snug line-clamp-2">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono font-semibold text-neutral-400">
                  {isSelected ? '✓ Selected' : 'Select'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Form & Office Hubs Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-950">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been routed to our {formData.topic.toUpperCase()} desk. A designated DotRepo Corp. technical specialist will respond within 2 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        role: '',
                        country: 'United States',
                        topic: 'sales',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <span className="text-xs uppercase font-semibold text-neutral-500">
                    Enterprise Request Form
                  </span>
                  <span className="text-xs text-neutral-500 font-mono font-medium">
                    SLA: 2-Hour Response
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jonathan Mercer"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. j.mercer@enterprise.com"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Global Logistics"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Job Role / Title
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Chief Information Officer"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Country / Region
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 focus:outline-none focus:border-blue-600"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="France">France</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Other">Other Global Market</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value as any })}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 focus:outline-none focus:border-blue-600"
                    >
                      <option value="sales">Talk to Sales</option>
                      <option value="partner">Partner with DotRepo Corp.</option>
                      <option value="developer">Developer Support</option>
                      <option value="general">General Enquiries</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    Message / Technical Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current software architecture, user volume, or specific platform capabilities required..."
                    className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Protected by Enterprise Privacy & Non-Disclosure</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{isSubmitting ? 'Routing Request...' : 'Send Enterprise Message'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Channels & Global Hubs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-neutral-950">Direct Enterprise Desks</h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block font-mono text-[11px]">Global Sales Hotline:</span>
                    <span className="text-neutral-950 font-bold">+1 (800) 555-REPO / +1 (415) 890-DOTR</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block font-mono text-[11px]">Enterprise Inquiries:</span>
                    <span className="text-neutral-950 font-bold">enterprise@dotrepo.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block font-mono text-[11px]">Support Availability:</span>
                    <span className="text-neutral-950 font-bold">24/7/365 Tier-1 Dedicated Support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <h3 className="text-base font-bold text-neutral-950">Corporate Locations</h3>
              <div className="space-y-2.5 text-xs text-neutral-700">
                <div className="pb-2 border-b border-neutral-100">
                  <span className="font-bold text-neutral-950 block">San Francisco (Global HQ)</span>
                  <span className="text-neutral-500 text-[11px]">100 Market Street, Suite 2400, San Francisco, CA</span>
                </div>
                <div className="pb-2 border-b border-neutral-100">
                  <span className="font-bold text-neutral-950 block">Frankfurt (EU Sovereignty Hub)</span>
                  <span className="text-neutral-500 text-[11px]">Mainzer Landstraße 46, 60325 Frankfurt am Main</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-950 block">Singapore (APAC Operations)</span>
                  <span className="text-neutral-500 text-[11px]">Marina Bay Financial Centre Tower 2, Singapore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
