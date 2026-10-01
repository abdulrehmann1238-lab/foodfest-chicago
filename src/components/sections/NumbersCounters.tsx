import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  { value: 60, suffix: '+', label: 'Global Kitchens', sub: 'From street carts to James Beard honorees' },
  { value: 30, suffix: '', label: 'Countries Represented', sub: 'Authentic regional culinary traditions' },
  { value: 2, suffix: ' Days', label: 'Lakefront Weekend', sub: 'Saturday & Sunday on the water' },
  { value: 40, suffix: '+', label: 'Live Concert Sets', sub: 'Across 3 lakeside & pavilion stages' },
];

export const NumbersCounters: React.FC = () => {
  const isReduced = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReduced) {
      setCounts(STATS.map((s) => s.value));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200;
          const steps = 30;
          const intervalTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((s) => Math.round(s.value * easeProgress))
            );

            if (step >= steps) {
              clearInterval(timer);
              setCounts(STATS.map((s) => s.value));
            }
          }, intervalTime);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, isReduced]);

  return (
    <section ref={sectionRef} className="py-16 bg-[#1D1A17] text-[#F7F2E9] border-b border-[#4A433B]/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col border-l border-[#4A433B]/60 pl-5">
              <div className="font-display text-4xl sm:text-5xl font-medium text-[#D9A441] leading-none mb-2">
                {counts[i]}
                {stat.suffix}
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight">{stat.label}</h3>
              <p className="text-xs text-[#E4DCCF]/65 mt-1 leading-normal font-sans">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
