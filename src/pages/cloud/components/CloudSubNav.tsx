import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SUB_NAV_LINKS } from '../constants';

export const CloudSubNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = SUB_NAV_LINKS.length - 1; i >= 0; i--) {
        const link = SUB_NAV_LINKS[i];
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="sticky top-16 sm:top-18 z-30 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#1A1A1A] text-white"
      aria-label="Cloud Sub Navigation"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-12 sm:h-14 overflow-x-auto no-scrollbar gap-4">
          {/* Scroll-Spy Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            {SUB_NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-2.5 sm:px-3 py-3 text-xs font-semibold tracking-wide transition-all relative cursor-pointer whitespace-nowrap focus:outline-none focus:text-[#22C55E] ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Green Scroll-Spy Underline */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#22C55E]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Quote Now Button (Solid Green with Black Text) */}
          <div className="shrink-0 hidden sm:block">
            <button
              onClick={() => scrollToSection('next-steps')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              <span>Quote Now</span>
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
