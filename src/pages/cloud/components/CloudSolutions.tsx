import React from 'react';
import { INDUSTRY_SOLUTIONS } from '../constants';
import { ArrowRight, Layers, CreditCard, Gamepad2, BrainCircuit } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  startups: Layers,
  fintech: CreditCard,
  gaming: Gamepad2,
  'ai-platforms': BrainCircuit,
};

export const CloudSolutions: React.FC = () => {
  return (
    <section id="solutions" className="bg-[#FFFFFF] text-neutral-900 py-20 lg:py-28 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#16A34A] font-mono font-semibold mb-2">
            VERTICAL PLATFORM ARCHITECTURES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Engineered for industry-critical scale.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Pre-validated architectural topologies tuned for strict latency, regulatory compliance, and non-blocking IOPS across critical sectors.
          </p>
        </div>

        {/* 4 Cards Grid with Green Top Border on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_SOLUTIONS.map((sol) => {
            const Icon = ICON_MAP[sol.id] || Layers;
            return (
              <a
                key={sol.id}
                href={sol.link}
                className="group relative flex flex-col justify-between p-8 bg-[#F4F4F4] border border-neutral-200 hover:border-neutral-400 rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {/* Green Top Border Indicator on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                <div>
                  <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center rounded-[2px] mb-6 text-neutral-700 group-hover:text-[#16A34A] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                    {sol.category}
                  </span>

                  <h3 className="text-lg font-bold text-neutral-950 group-hover:text-black mb-3">
                    {sol.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {sol.copy}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:text-[#16A34A]">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
