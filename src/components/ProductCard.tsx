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
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (productId: string) => void;
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
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const Icon = ICON_MAP[product.iconName] || Cpu;

  return (
    <div
      onClick={() => onSelect(product.id)}
      className="group p-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs"
    >
      <div>
        {/* Top Icon & Metric */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 flex items-center justify-center transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-neutral-500 font-medium tabular-nums bg-neutral-100/80 px-2 py-0.5 rounded border border-neutral-200">
            {product.metrics}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
          {product.description}
        </p>

        {/* Key capabilities */}
        <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5">
          {product.capabilities.slice(0, 2).map((cap) => (
            <div key={cap} className="flex items-center gap-2 text-xs text-neutral-600">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learn More link */}
      <div className="mt-6 pt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
        <span>Learn More</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
