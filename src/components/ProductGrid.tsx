import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { PageId } from '../types';

interface ProductGridProps {
  onNavigate: (page: PageId, productId?: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'business' | 'data-cloud' | 'ai-automation' | 'developer'>('business');

  const coreRequestedIds = ['crm', 'finance', 'operations', 'support', 'analytics', 'people'];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS_CATALOG
      : activeCategory === 'business'
      ? PRODUCTS_CATALOG.filter((p) => coreRequestedIds.includes(p.id))
      : PRODUCTS_CATALOG.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 md:py-28 border-b border-neutral-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Product Suite
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-4 text-balance">
              Software built for every part of your business.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              A comprehensive suite of deeply interconnected business applications engineered to eliminate operational friction, automate recurring tasks, and power enterprise growth.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>View all 16 ecosystem products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Tabs (Clean horizontal scroll on mobile) */}
        <div className="mt-10 overflow-x-auto max-w-full pb-2">
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-100/80 border border-neutral-200 rounded-xl w-max">
            {[
              { id: 'business', label: 'Business Applications' },
              { id: 'data-cloud', label: 'Data & Cloud' },
              { id: 'ai-automation', label: 'AI & Automation' },
              { id: 'developer', label: 'Developer Platform' },
              { id: 'all', label: 'All Products (16)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-white text-neutral-950 shadow-sm border border-neutral-200'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(id) => onNavigate('products', id)}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                Looking for a unified enterprise suite bundle?
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                DotRepo Corp. One combines CRM, Finance, Operations, Analytics, and AI in a single enterprise license.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-sm"
          >
            Request Enterprise Quote
          </button>
        </div>
      </div>
    </section>
  );
};
