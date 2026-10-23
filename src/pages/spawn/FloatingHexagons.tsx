import React, { useEffect, useRef } from 'react';

export const FloatingHexagons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const f1Ref = useRef<HTMLDivElement>(null);
  const f2Ref = useRef<HTMLDivElement>(null);
  const f3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animFrame: number;

    const onScroll = () => {
      if (!containerRef.current) return;
      const b = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = b.top + b.height / 2 - vh / 2;

      if (f1Ref.current) {
        const speed = 0.12;
        const y = progress * speed;
        const rot = b.top * 0.06 * speed * 8;
        f1Ref.current.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}deg)`;
      }

      if (f2Ref.current) {
        const speed = -0.08;
        const y = progress * speed;
        const rot = b.top * 0.06 * speed * 8;
        f2Ref.current.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}deg)`;
      }

      if (f3Ref.current) {
        const speed = 0.18;
        const y = progress * speed;
        const rot = b.top * 0.06 * speed * 8;
        f3Ref.current.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}deg)`;
      }
    };

    const loop = () => {
      onScroll();
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div ref={f1Ref} className="spawn-fl spawn-fl-1" />
      <div ref={f2Ref} className="spawn-fl spawn-fl-2" />
      <div ref={f3Ref} className="spawn-fl spawn-fl-3" />
    </div>
  );
};
