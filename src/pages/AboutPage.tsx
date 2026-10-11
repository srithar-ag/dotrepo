import React from 'react';
import { PageId } from '../types';
import {
  Globe,
  Shield,
  Sparkles,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  MapPin,
  HeartHandshake,
  Compass,
  Cpu,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenContactModal }) => {
  const leadership = [
    { name: 'Dr. Sarah Chen', role: 'Chief Executive Officer', bio: 'Former VP of Cloud Systems with 20+ years building hyperscale distributed storage and infrastructure.' },
    { name: 'Marcus Vance', role: 'Chief Technology Officer', bio: 'Pioneered deterministic database replication models and autonomous multi-agent reasoning topologies.' },
    { name: 'Elena Rostova', role: 'Chief Product Officer', bio: 'Led global enterprise ERP & CRM portfolio transformations across Europe and North America.' },
    { name: 'David Okafor', role: 'Head of AI Research', bio: 'PhD in Machine Learning; research focused on zero-data retention private fine-tuning and mathematical verification.' },
  ];

  const locations = [
    { city: 'Bangalore (Bengaluru)', role: 'Headquarters & Core Engineering Campus', address: 'Outer Ring Road / Indiranagar Tech Corridor, Bangalore, Karnataka, India' },
    { city: 'Hyderabad', role: 'Enterprise Cloud & AI Systems Hub', address: 'HITEC City, Madhapur, Hyderabad, Telangana, India' },
    { city: 'Pune', role: 'Distributed Systems & Database R&D', address: 'Hinjawadi Rajiv Gandhi Infotech Park, Pune, Maharashtra, India' },
    { city: 'Chennai', role: 'FinTech & High-Frequency Operations Center', address: 'OMR IT Expressway, Taramani, Chennai, Tamil Nadu, India' },
    { city: 'Mumbai', role: 'Enterprise Solutions & Client Experience Center', address: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra, India' },
  ];

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              About DotRepo Corp.
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">Global Technology Enterprise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Technology that powers modern businesses.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            DotRepo Corp. was founded with a singular conviction: enterprise technology should not require compromise between developer ergonomics, carrier-grade uptime, regulatory security, and unified data consistency.
          </p>
        </div>

        {/* Core Values / Architectural Tenets */}
        <div className="mt-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
            Our Core Principles
          </span>
          <h2 className="text-2xl font-bold text-neutral-950 mt-1">
            Built for Global Scale, Privacy & Engineering Rigor
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <Compass className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="text-base font-bold text-neutral-950">Deep Architectural Cohesion</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                We believe software suites should communicate through unified native schemas rather than brittle external API sync pipelines. Every DotRepo Corp. service shares foundational identity, events, and data structures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <Shield className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="text-base font-bold text-neutral-950">Uncompromising Data Sovereignty</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Your data belongs to your organization. DotRepo Corp. guarantees zero customer data usage for artificial intelligence training, complete geographical residency options, and cryptographically verified isolation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <Cpu className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="text-base font-bold text-neutral-950">Developer-First Philosophy</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Behind every enterprise decision maker is an engineering team building custom integrations. We build every application with first-class type-safe SDKs, OpenAPI 3.1 definitions, and real-time event webhooks.
              </p>
            </div>
          </div>
        </div>

        {/* Global Executive Leadership */}
        <div className="mt-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
            Executive Leadership
          </span>
          <h2 className="text-2xl font-bold text-neutral-950 mt-1">
            Engineering & Technology Stewards
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((l) => (
              <div
                key={l.name}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700 font-bold text-base flex items-center justify-center mb-3">
                  {l.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h4 className="text-sm font-bold text-neutral-950">{l.name}</h4>
                <span className="text-xs text-blue-600 font-medium block mt-0.5">{l.role}</span>
                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* India Hubs */}
        <div className="mt-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
            Operations Across India
          </span>
          <h2 className="text-2xl font-bold text-neutral-950 mt-1">
            Corporate Hubs & Engineering Centers (India)
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-neutral-950">{loc.city}</h4>
                </div>
                <span className="text-xs font-semibold text-neutral-700 block">
                  {loc.role}
                </span>
                <p className="text-xs text-neutral-500 mt-1 leading-snug">
                  {loc.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Careers & Contact Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-neutral-950">
              Want to join our global engineering team?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              We are hiring across distributed systems, machine learning research, cloud kernels, and developer relations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('careers')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Explore Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};
