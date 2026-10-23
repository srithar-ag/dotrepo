import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { Plus, Minus } from 'lucide-react';

export const CloudFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#FFFFFF] text-neutral-900 py-20 lg:py-28 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#16A34A] font-mono font-semibold mb-2">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Technical answers on data sovereignty, hypervisor overhead, failover mechanics, and enterprise deployment guarantees.
          </p>
        </div>

        {/* 6 Accordion Items */}
        <div className="max-w-4xl space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-[2px] bg-white transition-colors overflow-hidden"
              >
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-[#22C55E] transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-950 pr-4">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-[2px] bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700">
                    {isOpen ? <Minus className="w-4 h-4 text-[#16A34A]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
