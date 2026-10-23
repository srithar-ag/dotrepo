import React, { useEffect, useRef, useState } from 'react';
import { PERFORMANCE_METRICS } from '../constants';

export const CloudPerformanceStrip: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters over 1.6s
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            const updated = PERFORMANCE_METRICS.map((metric) =>
              Math.round(metric.value * ease)
            );
            setCounts(updated);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(PERFORMANCE_METRICS.map((m) => m.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="bg-[#000000] text-white border-y border-[#1A1A1A] py-20 lg:py-28"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header label */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#22C55E] font-mono font-semibold mb-2">
            HARDWARE & NETWORK BENCHMARKS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Deterministic throughput. Verified SLAs.
          </h2>
        </div>

        {/* 4 Stat Counters with Hairline Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#1A1A1A] bg-[#0A0A0A]">
          {PERFORMANCE_METRICS.map((metric, idx) => {
            const displayValue = hasAnimated ? counts[idx] : metric.value;
            return (
              <div
                key={metric.id}
                className={`p-8 lg:p-10 flex flex-col justify-between ${
                  idx < 3 ? 'border-b sm:border-b-0 lg:border-r border-[#1A1A1A]' : ''
                } ${idx === 1 ? 'sm:border-r-0 lg:border-r' : ''}`}
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-6">
                    {metric.label}
                  </span>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-mono flex items-baseline gap-1">
                    {metric.prefix && (
                      <span className="text-neutral-500 font-sans">{metric.prefix}</span>
                    )}
                    <span className="text-white">{displayValue}</span>
                    <span className="text-[#22C55E] text-2xl sm:text-3xl font-sans font-semibold">
                      {metric.suffix}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1A1A1A]">
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {metric.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote on SLA / Benchmark testing methodology */}
        <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono gap-4">
          <span>ALL TESTS CONDUCTED ACROSS PRODUCTION FLEET (MUMBAI & BANGALORE DATA CENTERS)</span>
          <span className="text-[#22C55E]">LAST VERIFIED: OCTOBER 2026</span>
        </div>
      </div>
    </section>
  );
};
