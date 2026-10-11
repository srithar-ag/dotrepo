import React, { useState } from 'react';
import { DotRepoLogo } from './DotRepoLogo';
import { PageId } from '../types';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Shield,
  Code2,
  Terminal,
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

interface UdacityNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subId?: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenEnroll: (course?: string) => void;
}

export const UdacityNavbar: React.FC<UdacityNavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  onOpenEnroll,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDropdownEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const discoverCategories = [
    {
      title: 'Artificial Intelligence & Agents',
      icon: Cpu,
      color: 'text-amber-400',
      badge: 'Trending',
      items: [
        'AI Engineering with Claude',
        'Generative AI & Agentic Systems',
        'Deep Learning Nanodegree',
        'Computer Vision & Multimodal',
        'Natural Language Processing',
      ],
    },
    {
      title: 'Cloud & Infrastructure',
      icon: Cloud,
      color: 'text-blue-400',
      items: [
        'Cloud DevOps Engineer',
        'Hybrid Cloud Solutions Architect',
        'Kubernetes & Microservices',
        'Site Reliability Engineering (SRE)',
      ],
    },
    {
      title: 'Data & Analytics',
      icon: Database,
      color: 'text-emerald-400',
      items: [
        'Data Engineering Nanodegree',
        'Vector Search & RAG Architecture',
        'Enterprise Business Analytics',
        'Data Streaming with Kafka',
      ],
    },
    {
      title: 'Cybersecurity & Governance',
      icon: Shield,
      color: 'text-purple-400',
      items: [
        'AI Safety & Red Teaming',
        'Enterprise Security Architect',
        'Zero Trust Network Defense',
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0b12] text-white border-b border-neutral-800 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo Area */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
              aria-label="DotRepo Corp. Corporate Platform Home"
            >
              <DotRepoLogo size="md" showWordmark={true} inverted={true} />
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center space-x-1"
              onMouseLeave={handleDropdownLeave}
            >
              {/* 1. Discover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('discover')}
              >
                <button
                  className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeDropdown === 'discover'
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <span>Discover</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                      activeDropdown === 'discover' ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Discover Mega Dropdown */}
                {activeDropdown === 'discover' && (
                  <div className="absolute top-full left-0 w-[680px] bg-[#11131f] border border-neutral-700/80 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {discoverCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${cat.color}`} />
                            <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                              {cat.title}
                            </span>
                            {cat.badge && (
                              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <ul className="space-y-1.5 pl-6 border-l border-neutral-800">
                            {cat.items.map((item, i) => (
                              <li key={i}>
                                <button
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    if (item.includes('Claude')) {
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else {
                                      onOpenEnroll(item);
                                    }
                                  }}
                                  className="text-xs text-neutral-400 hover:text-white hover:translate-x-1 transition-all text-left block py-0.5 cursor-pointer"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}

                    <div className="col-span-2 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        Explore over 80+ accredited tech Nanodegrees & industry certificates
                      </span>
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          const el = document.getElementById('course-catalog');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Full Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Catalog */}
              <button
                onClick={() => {
                  const el = document.getElementById('course-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 text-sm font-semibold rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
              >
                Catalog
              </button>

              {/* 3. Individuals */}
              <button
                onClick={() => {
                  const el = document.getElementById('adaptive-experience');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 text-sm font-semibold rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
              >
                Individuals
              </button>

              {/* 4. Business Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('business')}
              >
                <button
                  className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeDropdown === 'business'
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <span>Business</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                      activeDropdown === 'business' ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'business' && (
                  <div className="absolute top-full left-0 w-80 bg-[#11131f] border border-neutral-700/80 rounded-xl shadow-2xl p-4 mt-1 z-50 animate-in fade-in duration-150">
                    <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-lg mb-3">
                      <p className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        <span>Udacity for Enterprise</span>
                      </p>
                      <p className="text-[11px] text-neutral-300 mt-1">
                        Upskill teams in AI, Cloud, and Engineering with bespoke curriculums & mentor dashboards.
                      </p>
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            onNavigate('solutions');
                          }}
                          className="w-full text-left px-3 py-2 rounded-md text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                        >
                          <span>Enterprise Workforce Transformation</span>
                          <ArrowRight className="w-3 h-3 text-neutral-500" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            onNavigate('products');
                          }}
                          className="w-full text-left px-3 py-2 rounded-md text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                        >
                          <span>Accenture AI Talent Benchmarking</span>
                          <ArrowRight className="w-3 h-3 text-neutral-500" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 5. Government */}
              <button
                onClick={() => onNavigate('solutions', 'government')}
                className="px-3 py-2 text-sm font-semibold rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
              >
                Government
              </button>

              {/* 6. AI Master's (Highlighted in gold/amber as in screenshot) */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('masters')}
              >
                <button
                  className="px-3 py-2 text-sm font-bold rounded-md text-amber-300 hover:text-amber-200 hover:bg-amber-400/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Master's</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'masters' ? 'rotate-180 text-amber-200' : 'text-amber-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'masters' && (
                  <div className="absolute top-full left-0 w-84 bg-[#11131f] border border-amber-500/30 rounded-xl shadow-2xl p-4 mt-1 z-50 animate-in fade-in duration-150">
                    <div className="p-3 bg-amber-950/30 border border-amber-600/30 rounded-lg mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                        Accredited University Degrees
                      </span>
                      <h4 className="text-xs font-bold text-white">
                        Online Master of Science in AI & Computing
                      </h4>
                      <p className="text-[11px] text-neutral-300 mt-1">
                        In partnership with top tier global research universities. Earn fully accredited graduate degrees at your own pace.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenEnroll('Online Master of Science in AI');
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors text-center cursor-pointer"
                    >
                      Explore Master's Pathways
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
              aria-label="Search courses and topics"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Log In Button (Transparent with subtle border) */}
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-md transition-all cursor-pointer"
            >
              Log In
            </button>

            {/* Join for Free Button (Vibrant Royal Blue pill button) */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] active:bg-[#0047b3] rounded-md transition-all shadow-md hover:shadow-blue-500/25 cursor-pointer"
            >
              Join for Free
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-[#0f111d] px-4 pt-4 pb-6 space-y-4">
          <div className="space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('course-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Catalog & Programs
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('projects-13');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-neutral-800"
            >
              13 Claude Projects
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('solutions');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Enterprise Solutions
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll('AI Master’s Degree');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-amber-300 hover:bg-amber-400/10 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Master's Degrees</span>
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll('AI Engineering with Claude');
              }}
              className="w-full py-2.5 rounded-lg bg-[#0066FF] text-white font-bold text-sm text-center"
            >
              Enroll Now with Claude
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
