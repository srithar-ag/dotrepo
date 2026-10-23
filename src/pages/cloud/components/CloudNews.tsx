import React from 'react';
import { NEWS_ARTICLES } from '../constants';
import { ArrowRight, Newspaper } from 'lucide-react';

export const CloudNews: React.FC = () => {
  return (
    <section id="news" className="bg-[#FFFFFF] text-neutral-900 py-20 lg:py-28 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#16A34A] font-mono font-semibold mb-2">
              ENGINEERING ADVISORIES & DISPATCHES
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
              News and architecture benchmarks.
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
              Read in-depth technical whitepapers, network topology expansions, and latency benchmark disclosures from our core engineering team.
            </p>
          </div>

          <a
            href="#next-steps"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-900 hover:text-[#16A34A] transition-colors self-start md:self-auto border-b border-neutral-900 hover:border-[#16A34A] pb-1"
          >
            <span>VIEW ALL DISPATCHES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between p-8 bg-[#F4F4F4] border border-neutral-200 hover:border-neutral-400 rounded-[2px] transition-all duration-200 hover:-translate-y-0.5"
            >
              <div>
                {/* Thin top rule indicator */}
                <div className="h-[2px] w-8 bg-neutral-300 group-hover:bg-[#22C55E] group-hover:w-full transition-all duration-300 mb-6" />

                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-3 font-semibold">
                  {article.category}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-neutral-950 group-hover:text-black leading-snug mb-6">
                  {article.title}
                </h3>
              </div>

              <div>
                {/* Zero-Pill Metadata */}
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#16A34A] transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
