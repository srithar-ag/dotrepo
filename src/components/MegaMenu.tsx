import React from 'react';
import {
  Users,
  CreditCard,
  Cpu,
  Headphones,
  UserCheck,
  Server,
  CloudRain,
  BarChart3,
  HardDrive,
  Sparkles,
  Bot,
  Workflow,
  BrainCircuit,
  Code,
  Terminal,
  Share2,
  Landmark,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Laptop,
  Briefcase,
  Rocket,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { PRODUCTS_CATALOG, INDUSTRY_SOLUTIONS } from '../data/mockData';
import { PageId } from '../types';

interface MegaMenuProps {
  activeMenu: 'products' | 'solutions' | 'developers';
  onNavigate: (page: PageId, subId?: string) => void;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  CreditCard,
  Cpu,
  Headphones,
  UserCheck,
  Server,
  CloudRain,
  BarChart3,
  HardDrive,
  Sparkles,
  Bot,
  Workflow,
  BrainCircuit,
  Code,
  Terminal,
  Share2,
  Landmark,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Laptop,
  Briefcase,
  Rocket,
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeMenu, onNavigate, onClose }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 animate-in fade-in slide-in-from-top-2 duration-150">
        {/* PRODUCTS MEGA MENU */}
        {activeMenu === 'products' && (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                  DotRepo Corp. Product Ecosystem
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  16 Cloud-Based Enterprise Applications & Systems
                </h3>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('products');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Product Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Col 1: Business Apps */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3">
                  Business Applications
                </h4>
                <div className="space-y-1">
                  {PRODUCTS_CATALOG.filter((p) => p.category === 'business').map((product) => {
                    const Icon = ICON_MAP[product.iconName] || Users;
                    return (
                      <button
                        key={product.id}
                        onClick={() => {
                          onClose();
                          onNavigate('products', product.id);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-neutral-900 group-hover:text-blue-600 block transition-colors">
                            {product.name}
                          </span>
                          <span className="text-[11px] text-neutral-500 leading-tight line-clamp-1">
                            {product.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Col 2: Data & Cloud */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3">
                  Data & Cloud Infrastructure
                </h4>
                <div className="space-y-1">
                  {PRODUCTS_CATALOG.filter((p) => p.category === 'data-cloud').map((product) => {
                    const Icon = ICON_MAP[product.iconName] || Server;
                    return (
                      <button
                        key={product.id}
                        onClick={() => {
                          onClose();
                          onNavigate('products', product.id);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-neutral-900 group-hover:text-blue-600 block transition-colors">
                            {product.name}
                          </span>
                          <span className="text-[11px] text-neutral-500 leading-tight line-clamp-1">
                            {product.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Col 3: AI & Automation */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3">
                  AI & Automation
                </h4>
                <div className="space-y-1">
                  {PRODUCTS_CATALOG.filter((p) => p.category === 'ai-automation').map((product) => {
                    const Icon = ICON_MAP[product.iconName] || Sparkles;
                    return (
                      <button
                        key={product.id}
                        onClick={() => {
                          onClose();
                          onNavigate('products', product.id);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-neutral-900 group-hover:text-purple-600 block transition-colors">
                            {product.name}
                          </span>
                          <span className="text-[11px] text-neutral-500 leading-tight line-clamp-1">
                            {product.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Col 4: Featured Platform Overview */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-blue-600 block mb-1">
                    Featured Platform
                  </span>
                  <h5 className="text-sm font-bold text-neutral-900">
                    DotRepo Corp. One Suite
                  </h5>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Unify customer CRM, multi-currency financials, operational workflows, and autonomous AI agents in one interconnected ecosystem.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('contact');
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-center text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors block cursor-pointer"
                  >
                    Request Enterprise Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SOLUTIONS MEGA MENU */}
        {activeMenu === 'solutions' && (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                  Tailored Industry Blueprints
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  Engineered for Specific Regulatory & Operational Workloads
                </h3>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('solutions');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore All Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INDUSTRY_SOLUTIONS.map((solution) => {
                const Icon = ICON_MAP[solution.iconName] || Briefcase;
                return (
                  <button
                    key={solution.id}
                    onClick={() => {
                      onClose();
                      onNavigate('solutions', solution.id);
                    }}
                    className="text-left p-3.5 rounded-xl bg-neutral-50/80 hover:bg-blue-50/50 border border-neutral-200/80 hover:border-blue-300 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center shrink-0 group-hover:text-blue-600 group-hover:border-blue-300 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {solution.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                      {solution.headline}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-600 font-semibold">
                      {solution.impactMetric}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DEVELOPERS MEGA MENU */}
        {activeMenu === 'developers' && (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                  Developer Platform & APIs
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  Type-Safe SDKs, Webhooks, and Distributed Architecture
                </h3>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('developers');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Documentation Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => {
                  onClose();
                  onNavigate('developers');
                }}
                className="p-4 rounded-xl bg-neutral-50/80 hover:bg-neutral-100/80 border border-neutral-200/80 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
                  <Terminal className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  API & SDK Quickstart
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Generate API credentials, install official packages for TypeScript, Python, or Go, and issue your first authenticated request in 2 minutes.
                </p>
              </div>

              <div
                onClick={() => {
                  onClose();
                  onNavigate('developers');
                }}
                className="p-4 rounded-xl bg-neutral-50/80 hover:bg-neutral-100/80 border border-neutral-200/80 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
                  <Share2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  Webhooks & Event Streams
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Real-time event subscriptions across billing, deal pipelines, customer support cases, and database transactions with HMAC verification.
                </p>
              </div>

              <div
                onClick={() => {
                  onClose();
                  onNavigate('resources');
                }}
                className="p-4 rounded-xl bg-neutral-50/80 hover:bg-neutral-100/80 border border-neutral-200/80 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-3">
                  <Code className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-purple-600 transition-colors">
                  Architecture Blueprints
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Production-grade reference architectures for multi-region active replication, zero-trust VPC security, and private RAG embeddings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
