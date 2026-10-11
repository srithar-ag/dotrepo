import React, { useState, useEffect } from 'react';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { ProductItem, PageId } from '../types';
import {
  Search,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  initialProductId?: string;
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialProductId,
  onNavigate,
  onOpenContactModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (initialProductId) {
      const match = PRODUCTS_CATALOG.find((p) => p.id === initialProductId);
      if (match) setActiveModalProduct(match);
    }
  }, [initialProductId]);

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-12 md:py-20 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Complete Portfolio
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-medium text-neutral-500">16 Enterprise Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight">
            Software built for every part of your business.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            From modern CRM and autonomous finance to distributed cloud databases and enterprise AI agents, DotRepo Corp. delivers an integrated platform designed for extreme reliability.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
          {/* Segmented Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Products (16)' },
              { id: 'business', label: 'Business Apps (5)' },
              { id: 'data-cloud', label: 'Data & Cloud (4)' },
              { id: 'ai-automation', label: 'AI & Automation (4)' },
              { id: 'developer', label: 'Developer Platform (3)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or features..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => setActiveModalProduct(product)}
            />
          ))}
        </div>

        {/* Product Detail Modal */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {activeModalProduct.category.toUpperCase().replace('-', ' & ')}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-950 mt-2">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-sm font-semibold text-neutral-700 mt-1">
                    {activeModalProduct.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-4">
                {activeModalProduct.description}
              </p>

              {/* Capabilities */}
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                  Enterprise Capabilities & Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProduct.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Guarantee */}
              <div className="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
                <div className="flex items-center gap-2 font-medium">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>SOC 2 Type II · Zero Data Retention</span>
                </div>
                <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activeModalProduct.metrics}
                </span>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setActiveModalProduct(null);
                    onNavigate('developers');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  View Developer API Spec
                </button>
                <button
                  onClick={() => {
                    setActiveModalProduct(null);
                    onOpenContactModal(`Product Demo: ${activeModalProduct.name}`);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
