import React, { useState } from 'react';
import { DotRepoLogo } from './DotRepoLogo';
import { PageId } from '../types';
import { INTERNSHIP_FORM_URL } from '../data/internshipData';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Cloud,
  Layers,
  Cpu,
  Shield,
  Code2,
  Terminal,
  Building2,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  MapPin,
  Send,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface EnterpriseNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subId?: string) => void;
  onOpenSearch: () => void;
  onOpenContact: (topic?: string) => void;
  onOpenRegistration?: (trackId?: string) => void;
}

export const EnterpriseNavbar: React.FC<EnterpriseNavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenContact,
  onOpenRegistration,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const saasApps = [
    { name: 'DotRepo Corp. CRM', desc: 'Predictive customer intelligence & pipeline automation' },
    { name: 'DotRepo Corp. Finance', desc: 'Multi-currency ledger, real-time audit trails & reconciliation' },
    { name: 'DotRepo Corp. Operations', desc: 'Autonomous supply chain execution & supplier telemetry' },
    { name: 'DotRepo Corp. Support', desc: 'Unified omni-channel customer service & ticket routing' },
    { name: 'DotRepo Corp. Analytics', desc: 'Streaming metrics, BI dashboards & custom telemetry' },
    { name: 'DotRepo Corp. People', desc: 'Global workforce management, payroll & compliance' },
  ];

  const handleNavClick = (page: PageId, subId?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(page, subId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Main Enterprise Header */}
      <header className="sticky top-0 z-40 w-full bg-[#090b14]/98 backdrop-blur-md text-white border-b border-neutral-800 transition-colors shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 sm:h-18">
            {/* Logo */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
                aria-label="DotRepo Corp. Enterprise Corporate Platform Home"
              >
                <DotRepoLogo size="md" showWordmark={true} inverted={true} />
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1" aria-label="Desktop Navigation">
                {/* 1. Cloud */}
                <button
                  onClick={() => handleNavClick('cloud')}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentPage === 'cloud'
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span>Cloud</span>
                </button>

                {/* 2. SaaS Enterprise Platform (Dropdown) */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('saas')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick('products')}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      currentPage === 'products' || activeDropdown === 'saas'
                        ? 'text-white bg-neutral-800'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>SaaS Platform</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                        activeDropdown === 'saas' ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {/* SaaS Apps Mega Dropdown */}
                  {activeDropdown === 'saas' && (
                    <div className="absolute top-full left-0 w-[540px] bg-[#0e1224] border border-neutral-700/80 rounded-2xl shadow-2xl p-5 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                            DotRepo Corp. Enterprise Business Suite
                          </span>
                          <p className="text-[11px] text-neutral-400">
                            16 integrated applications built on unified enterprise data
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavClick('products')}
                          className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>All Products</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {saasApps.map((app, i) => (
                          <button
                            key={i}
                            onClick={() => handleNavClick('products')}
                            className="p-2.5 rounded-xl hover:bg-neutral-800/80 transition-colors text-left group cursor-pointer"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {app.name}
                            </div>
                            <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                              {app.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Data & AI */}
                <button
                  onClick={() => handleNavClick('ai')}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentPage === 'ai'
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Data & AI</span>
                </button>

                {/* 4. Solutions */}
                <button
                  onClick={() => handleNavClick('solutions')}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'solutions'
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  Solutions
                </button>

                {/* 5. Developers */}
                <button
                  onClick={() => handleNavClick('developers')}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'developers'
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  Developers
                </button>

                {/* 6. INTERNSHIP (Special highlighted tab!) */}
                <button
                  onClick={() => handleNavClick('internship')}
                  className={`px-3.5 py-1.5 text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 border ${
                    currentPage === 'internship'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm'
                      : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/50 hover:text-emerald-200'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>Internship</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    13 Tracks
                  </span>
                </button>
              </nav>
            </div>

            {/* Right Action Icons & Mobile Menu Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Search Platform"
                title="Search (Cmd+K)"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Direct Form / Internship CTA Button (Desktop) */}
              <button
                onClick={() => {
                  if (onOpenRegistration) onOpenRegistration();
                  else window.location.href = 'https://rzp.io/rzp/dotrepo';
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <span>Apply as Intern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Contact / Enterprise Schedule Button (Desktop) */}
              <button
                onClick={() => onOpenContact('sales')}
                className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Contact
              </button>

              {/* Defined Mobile Menu Button (Clear Pill with Label & Icon) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 border border-neutral-700 hover:border-emerald-500/60 text-neutral-200 hover:text-white transition-all cursor-pointer focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? (
                  <>
                    <X className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-bold">Close</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-bold">Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* DEFINED MOBILE SUB-NAVBAR: Persistent Horizontal Tab Bar (Always Visible on Mobile/Tablet) */}
        <div className="lg:hidden border-t border-neutral-800/90 bg-[#070914] px-2.5 py-1.5 overflow-x-auto no-scrollbar scroll-smooth shadow-inner">
          <div className="flex items-center gap-1.5 w-max">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'home'
                  ? 'bg-neutral-800 text-white font-bold border border-neutral-600 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Home className="w-3 h-3 text-neutral-400" />
              <span>Home</span>
            </button>

            {/* 2. Cloud */}
            <button
              onClick={() => handleNavClick('cloud')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'cloud'
                  ? 'bg-blue-600/25 text-blue-300 font-bold border border-blue-500/50 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Cloud className="w-3 h-3 text-blue-400" />
              <span>Cloud</span>
            </button>

            {/* 3. SaaS Platform */}
            <button
              onClick={() => handleNavClick('products')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'products'
                  ? 'bg-emerald-600/25 text-emerald-300 font-bold border border-emerald-500/50 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Layers className="w-3 h-3 text-emerald-400" />
              <span>SaaS Platform</span>
            </button>

            {/* 4. Data & AI */}
            <button
              onClick={() => handleNavClick('ai')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'ai'
                  ? 'bg-purple-600/25 text-purple-300 font-bold border border-purple-500/50 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Cpu className="w-3 h-3 text-purple-400" />
              <span>Data & AI</span>
            </button>

            {/* 5. INTERNSHIP (Special Highlighted Mobile Tab) */}
            <button
              onClick={() => handleNavClick('internship')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap border ${
                currentPage === 'internship'
                  ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-black shadow-sm'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/80'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Internship</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                currentPage === 'internship'
                  ? 'bg-neutral-950/20 text-neutral-950 font-black'
                  : 'bg-emerald-500/25 text-emerald-300 font-bold'
              }`}>
                13 Tracks
              </span>
            </button>

            {/* 6. Developers */}
            <button
              onClick={() => handleNavClick('developers')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'developers'
                  ? 'bg-neutral-800 text-white font-bold border border-neutral-600 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Terminal className="w-3 h-3 text-neutral-400" />
              <span>Developers</span>
            </button>

            {/* 7. Solutions */}
            <button
              onClick={() => handleNavClick('solutions')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'solutions'
                  ? 'bg-neutral-800 text-white font-bold border border-neutral-600 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Shield className="w-3 h-3 text-neutral-400" />
              <span>Solutions</span>
            </button>

            {/* 8. About Section */}
            <button
              onClick={() => handleNavClick('about')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'about'
                  ? 'bg-neutral-800 text-white font-bold border border-neutral-600 shadow-xs'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/50 border border-neutral-800/60'
              }`}
            >
              <Building2 className="w-3 h-3 text-neutral-400" />
              <span>About</span>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN DEFINED MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#070914]/98 backdrop-blur-2xl flex flex-col overflow-y-auto animate-in fade-in duration-200">
          {/* Drawer Top Navigation Bar */}
          <div className="sticky top-0 z-10 bg-[#090b16] border-b border-neutral-800 px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <DotRepoLogo size="sm" showWordmark={true} inverted={true} />
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Directory
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <X className="w-4 h-4 text-emerald-400" />
              <span>Close</span>
            </button>
          </div>

          <div className="p-4 max-w-md mx-auto w-full space-y-4 pb-24">
            {/* Prominent Feature Card: DotRepo Corp. Internship Program */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/80 to-[#0a121e] border border-emerald-500/40 text-left shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  2026 Batch Active
                </span>
                <span className="text-[10px] font-mono text-neutral-400">100% Remote Cohorts</span>
              </div>
              <h3 className="text-base font-bold text-white">DotRepo Corp. Internships</h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                13 technical and professional tracks with real production capstone projects and verified credentials. Apply now & onboard immediately!
              </p>
              <div className="mt-3.5 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    if (onOpenRegistration) onOpenRegistration();
                    else window.location.href = 'https://rzp.io/rzp/dotrepo';
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold text-center transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Onboard as Intern Now</span>
                </button>
                <button
                  onClick={() => handleNavClick('internship')}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category 1: Core Platform */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 px-2 block mb-2">
                Core Enterprise Platform
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'home'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-neutral-400" />
                    <span>Home (Platform Overview)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => handleNavClick('cloud')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'cloud'
                      ? 'bg-blue-900/40 text-blue-200 border border-blue-500/30'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cloud className="w-4 h-4 text-blue-400" />
                    <span>Cloud & Infrastructure</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => handleNavClick('products')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'products'
                      ? 'bg-emerald-900/40 text-emerald-200 border border-emerald-500/30'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>SaaS Enterprise Platform (16 Apps)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => handleNavClick('ai')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'ai'
                      ? 'bg-purple-900/40 text-purple-200 border border-purple-500/30'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>Data & Autonomous AI</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Category 2: Engineering & Ecosystem */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 px-2 block mb-2">
                Engineering & Solutions
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('developers')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'developers'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Developers & APIs</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => handleNavClick('solutions')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'solutions'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>Industry Blueprints</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Category 3: Company & Bangalore HQ */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 px-2 block mb-2">
                Company & Headquarters
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('about')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === 'about'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>About DotRepo Corp. & Bangalore HQ</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => handleNavClick('careers')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/60 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Careers & Culture</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Mobile Actions Bottom CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenRegistration) onOpenRegistration();
                  else window.location.href = 'https://rzp.io/rzp/dotrepo';
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Apply Now · Onboard as Intern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact('sales');
                  }}
                  className="py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-semibold text-xs text-center transition-colors cursor-pointer"
                >
                  Contact Sales
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-semibold text-xs text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] font-mono text-neutral-400 pt-1">
              DotRepo Corp. · Bangalore, Karnataka, India
            </div>
          </div>
        </div>
      )}
    </>
  );
};
