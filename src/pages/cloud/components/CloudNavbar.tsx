import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Globe,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { DotRepoLogo } from '../../../components/DotRepoLogo';
import { MEGA_MENU_DATA } from '../constants';
import { PageId } from '../../../types';

interface CloudNavbarProps {
  onNavigate: (page: PageId, subId?: string) => void;
  onOpenSearch?: () => void;
  onOpenContactSales: () => void;
}

type MegaMenuKey = 'solutions' | 'products' | 'software' | 'architectures' | 'technologies' | null;

export const CloudNavbar: React.FC<CloudNavbarProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenContactSales,
}) => {
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [selectedRegion, setSelectedRegion] = useState<'IN' | 'SG' | 'EU' | 'US'>('IN');
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on outside click or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsRegionOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setIsRegionOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems: { key: MegaMenuKey; label: string }[] = [
    { key: 'solutions', label: 'Solutions' },
    { key: 'products', label: 'Products' },
    { key: 'software', label: 'Software' },
    { key: 'architectures', label: 'Architectures' },
    { key: 'technologies', label: 'Technologies' },
  ];

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40 w-full bg-[#000000] border-b border-[#1A1A1A] text-white"
      aria-label="Cloud Main Navigation"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Logo + NVIDIA-style Product Label Divider */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
              aria-label="DotRepo Enterprise Home"
            >
              <DotRepoLogo size="md" showWordmark={true} inverted={true} />
            </button>

            {/* NVIDIA-Style Product Divider & Small Label */}
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-[#262626] py-1 select-none">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Cloud
              </span>
              <span className="text-neutral-600 text-xs">|</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-semibold">
                Data Center
              </span>
            </div>

            {/* Desktop Mega-Menu Nav Items */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-2">
              {menuItems.map((item) => {
                const isOpen = activeMenu === item.key;
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.key)}
                  >
                    <button
                      onClick={() => setActiveMenu(isOpen ? null : item.key)}
                      aria-expanded={isOpen}
                      className={`px-3 py-1.5 text-xs font-medium tracking-wide rounded-[2px] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        isOpen ? 'text-white bg-[#141414]' : 'text-neutral-300 hover:text-white hover:bg-[#0A0A0A]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#22C55E]' : ''
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-300 hover:text-white rounded-[2px] hover:bg-[#141414] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
              aria-label="Search Documentation and Cloud Services"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Region Selector (IN) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-neutral-300 hover:text-white rounded-[2px] border border-[#262626] hover:border-neutral-500 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
                aria-label="Select Infrastructure Region"
              >
                <Globe className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="font-bold">{selectedRegion}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isRegionOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-[#0A0A0A] border border-[#262626] rounded-[2px] shadow-2xl p-1.5 z-50 animate-in fade-in duration-100">
                  <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider border-b border-[#1A1A1A] mb-1">
                    Select Core Hub
                  </div>
                  {[
                    { id: 'IN', label: 'India (Mumbai / BLR)' },
                    { id: 'SG', label: 'Asia (Singapore)' },
                    { id: 'EU', label: 'Europe (Frankfurt)' },
                    { id: 'US', label: 'US (N. Virginia)' },
                  ].map((reg) => (
                    <button
                      key={reg.id}
                      onClick={() => {
                        setSelectedRegion(reg.id as any);
                        setIsRegionOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-xs rounded-[2px] font-mono transition-colors flex items-center justify-between cursor-pointer ${
                        selectedRegion === reg.id
                          ? 'bg-[#141414] text-[#22C55E] font-bold'
                          : 'text-neutral-300 hover:bg-[#1A1A1A] hover:text-white'
                      }`}
                    >
                      <span>{reg.label}</span>
                      {selectedRegion === reg.id && <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" />}
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* Contact Sales Primary CTA Button (Solid Green with Black Text, 2px radius) */}
            <button
              onClick={onOpenContactSales}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-[2px] bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#22C55E] shrink-0"
            >
              <span>Contact Sales</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-[2px] border border-[#262626] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega-Menu Panels */}
      {activeMenu && (
        <div
          onMouseLeave={() => setActiveMenu(null)}
          className="absolute top-full left-0 w-full bg-[#0A0A0A] border-b border-[#262626] shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E]">
                  DOTREPO ENTERPRISE CATALOG // {activeMenu.toUpperCase()}
                </span>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Production-grade cloud infrastructure, bare-metal hardware, and distributed services.
                </p>
              </div>
              <a
                href="#services"
                onClick={() => setActiveMenu(null)}
                className="text-xs text-neutral-300 hover:text-[#22C55E] flex items-center gap-1 transition-colors font-mono"
              >
                <span>View Full Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MEGA_MENU_DATA[activeMenu]?.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[2px] bg-[#121212] border border-[#1F1F1F] hover:border-[#22C55E] transition-all group cursor-pointer"
                  onClick={() => {
                    setActiveMenu(null);
                    const el = document.getElementById('services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="text-xs font-bold text-white group-hover:text-[#22C55E] transition-colors flex items-center justify-between">
                    <span>{item.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#22C55E]" />
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#262626] px-4 py-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
            <span className="text-xs font-mono text-[#22C55E]">CORE INFRASTRUCTURE MENU</span>
            <span className="text-xs font-mono text-neutral-400">REGION: {selectedRegion}</span>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="text-xs font-bold text-neutral-200 uppercase font-mono tracking-wider">
                  {item.label}
                </div>
                <div className="grid grid-cols-1 gap-1.5 pl-2">
                  {MEGA_MENU_DATA[item.key as keyof typeof MEGA_MENU_DATA]?.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const el = document.getElementById('services');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-left py-1 text-xs text-neutral-400 hover:text-white flex items-center justify-between"
                    >
                      <span>{sub.name}</span>
                      <ArrowRight className="w-3 h-3 text-neutral-600" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1F1F1F] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactSales();
              }}
              className="w-full py-2.5 bg-[#22C55E] text-black font-bold text-xs rounded-[2px] uppercase tracking-wider text-center"
            >
              Contact Sales
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
