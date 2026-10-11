import React, { useState } from 'react';
import { RESOURCES_CATALOG, FAQ_ITEMS } from '../data/mockData';
import { PageId } from '../types';
import {
  Download,
  ChevronDown,
} from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'Whitepaper', label: 'Whitepapers' },
    { id: 'Architecture', label: 'Architecture Guides' },
    { id: 'Case Study', label: 'Case Studies' },
    { id: 'Guide', label: 'Implementation Guides' },
    { id: 'Report', label: 'Industry Reports' },
  ];

  const filteredResources =
    selectedCategory === 'all'
      ? RESOURCES_CATALOG
      : RESOURCES_CATALOG.filter((r) => r.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Knowledge & Research
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">Documentation & Technical Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Enterprise resources, blueprints, and answers.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Explore whitepapers, security compliance reports, high-availability architecture diagrams, and comprehensive answers to common technical inquiries.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {res.category}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {res.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-950 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {res.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono text-[11px]">
                  {res.downloadSize || 'PDF Document'}
                </span>
                <button
                  onClick={() => onOpenContactModal(`Resource Download: ${res.title}`)}
                  className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Frequently Asked Questions Section (Enterprise Accordion) */}
        <div className="mt-20 pt-12 border-t border-neutral-200">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-950 mt-1">
              Common Technical & Commercial Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Everything enterprise architecture teams ask regarding security, data migration, multi-tenant tenancy, and SLAs.
            </p>
          </div>

          <div className="mt-8 space-y-3 max-w-4xl">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-neutral-200 bg-white transition-colors overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-neutral-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
