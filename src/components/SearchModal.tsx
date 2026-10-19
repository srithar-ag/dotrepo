import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Layers, Briefcase, FileText, GraduationCap } from 'lucide-react';
import { PRODUCTS_CATALOG, INDUSTRY_SOLUTIONS, RESOURCES_CATALOG } from '../data/mockData';
import { INTERNSHIP_TRACKS } from '../data/internshipData';
import { PageId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, subId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredInternships = INTERNSHIP_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.slug.toLowerCase().includes(query.toLowerCase()) ||
      'internship'.includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredProducts = PRODUCTS_CATALOG.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredSolutions = INDUSTRY_SOLUTIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.headline.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredResources = RESOURCES_CATALOG.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search DotRepo Corp. products, solutions, documentation, APIs, or careers..."
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4">
          {/* Internships Section */}
          {filteredInternships.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 block mb-2 px-2 font-bold">
                DotRepo Corp. Internships (13 Tracks)
              </span>
              <div className="space-y-1">
                {filteredInternships.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      onClose();
                      onNavigate('internship');
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-between group cursor-pointer text-left border border-transparent hover:border-emerald-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                            {track.title}
                          </span>
                          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-neutral-100 text-neutral-600">
                            {track.slug}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 truncate max-w-md">
                          {track.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          {filteredProducts.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-2 px-2">
                Products & Applications
              </span>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onNavigate('products', p.id);
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </span>
                        <p className="text-[11px] text-neutral-500 truncate max-w-md">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Solutions Section */}
          {filteredSolutions.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-2 px-2">
                Industry Solutions
              </span>
              <div className="space-y-1">
                {filteredSolutions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onClose();
                      onNavigate('solutions', s.id);
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {s.name}
                        </span>
                        <p className="text-[11px] text-neutral-500 truncate max-w-md">
                          {s.headline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources / Docs Section */}
          {filteredResources.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-2 px-2">
                Documentation & Research
              </span>
              <div className="space-y-1">
                {filteredResources.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onClose();
                      onNavigate('resources');
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {r.title}
                        </span>
                        <p className="text-[11px] text-neutral-500 truncate max-w-md">
                          {r.category} · {r.readTime}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 &&
            filteredSolutions.length === 0 &&
            filteredResources.length === 0 && (
              <div className="py-8 text-center text-neutral-500 text-xs">
                No matching results found for "{query}". Try searching for CRM, AI, Cloud, or Finance.
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Navigate with mouse or Tab</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
