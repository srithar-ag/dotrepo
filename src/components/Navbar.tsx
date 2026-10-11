import React, { useState } from 'react';
import { DotRepoLogo } from './DotRepoLogo';
import { MegaMenu } from './MegaMenu';
import { PageId } from '../types';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Globe,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subId?: string) => void;
  onOpenSearch: () => void;
  onOpenContactModal: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenContactModal,
}) => {
  const [activeMenu, setActiveMenu] = useState<'products' | 'solutions' | 'developers' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuEnter = (menu: 'products' | 'solutions' | 'developers') => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                setActiveMenu(null);
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="flex items-center cursor-pointer focus:outline-none"
              aria-label="DotRepo Corp. Home"
            >
              <DotRepoLogo size="md" showWordmark={true} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1" onMouseLeave={handleMenuLeave}>
              {/* Products Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('products')}
              >
                <button
                  onClick={() => onNavigate('products')}
                  className={`px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                    currentPage === 'products' || activeMenu === 'products'
                      ? 'text-blue-600 bg-blue-50/80'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === 'products' ? 'rotate-180 text-blue-600' : 'text-neutral-400'
                    }`}
                  />
                </button>
              </div>

              {/* Solutions Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('solutions')}
              >
                <button
                  onClick={() => onNavigate('solutions')}
                  className={`px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                    currentPage === 'solutions' || activeMenu === 'solutions'
                      ? 'text-blue-600 bg-blue-50/80'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === 'solutions' ? 'rotate-180 text-blue-600' : 'text-neutral-400'
                    }`}
                  />
                </button>
              </div>

              {/* AI & Automation Link */}
              <button
                onClick={() => {
                  setActiveMenu(null);
                  onNavigate('ai');
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPage === 'ai'
                    ? 'text-purple-600 bg-purple-50/80'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                AI & Automation
              </button>

              {/* Cloud & Infrastructure Link */}
              <button
                onClick={() => {
                  setActiveMenu(null);
                  onNavigate('cloud');
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPage === 'cloud'
                    ? 'text-blue-600 bg-blue-50/80'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                Cloud & Infrastructure
              </button>

              {/* Developers Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('developers')}
              >
                <button
                  onClick={() => onNavigate('developers')}
                  className={`px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                    currentPage === 'developers' || activeMenu === 'developers'
                      ? 'text-blue-600 bg-blue-50/80'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <span>Developers</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === 'developers' ? 'rotate-180 text-blue-600' : 'text-neutral-400'
                    }`}
                  />
                </button>
              </div>

              {/* Resources Link */}
              <button
                onClick={() => {
                  setActiveMenu(null);
                  onNavigate('resources');
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPage === 'resources'
                    ? 'text-blue-600 bg-blue-50/80'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                Resources
              </button>

              {/* About Link */}
              <button
                onClick={() => {
                  setActiveMenu(null);
                  onNavigate('about');
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPage === 'about'
                    ? 'text-blue-600 bg-blue-50/80'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                About
              </button>

              {/* MegaMenu Container */}
              {activeMenu && (
                <div
                  onMouseEnter={() => {}}
                  onMouseLeave={handleMenuLeave}
                  className="absolute left-0 right-0 top-16 w-full pt-2"
                >
                  <MegaMenu
                    activeMenu={activeMenu}
                    onNavigate={(page, subId) => {
                      setActiveMenu(null);
                      onNavigate(page, subId);
                    }}
                    onClose={() => setActiveMenu(null)}
                  />
                </div>
              )}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-500 hover:text-neutral-800 transition-colors text-xs cursor-pointer"
              title="Search DotRepo Corp. (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px] text-neutral-600">Search</span>
              <kbd className="hidden md:inline font-mono text-[9px] bg-white text-neutral-600 border border-neutral-300 rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </button>

            {/* Careers Link */}
            <button
              onClick={() => onNavigate('careers')}
              className="hidden sm:inline-flex text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors px-2.5 py-1.5"
            >
              Careers
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenContactModal('sales')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <span>Talk to Sales</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="py-2 border-b border-neutral-100 space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('products');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Products Catalog
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('solutions');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Industry Solutions
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('ai');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              AI & Automation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('cloud');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Cloud & Infrastructure
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('developers');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Developers & APIs
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('resources');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Resources & FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              About DotRepo Corp.
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('careers');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Careers
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Contact & Sales
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal('sales');
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Schedule Enterprise Briefing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
