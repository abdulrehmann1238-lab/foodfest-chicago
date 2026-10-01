import React from 'react';
import { Reveal } from '../common/Reveal';

export const WhatIsFoodFest: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F] mb-3 block">
                WHAT IS FOOD FEST CHICAGO
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1D1A17] leading-[1.1] mb-6">
                A festival built around the table.
              </h2>
              <p className="text-base sm:text-lg text-[#4A433B] leading-relaxed mb-4 font-sans">
                Food Fest brings 60+ chefs, pitmasters, and street-food makers from 30 countries to Chicago's lakefront for two days of eating, music, and good company. Come hungry. Bring your friends.
              </p>
              <p className="text-sm sm:text-base text-[#80766A] leading-relaxed font-sans mb-8">
                From wood-fired Oaxacan comales and Lagos suya skewers to hand-pinched Ukrainian pierogi and Neapolitan pizzaioli, this is not a generic food truck gathering. It is an editorial culinary voyage where every booth represents an authentic, generational kitchen.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--border)]">
                <div>
                  <h4 className="font-display text-2xl font-bold text-[#1D1A17]">100%</h4>
                  <p className="text-xs text-[#80766A] mt-0.5">Authentic family-owned & chef-driven operators</p>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-[#1D1A17]">0 Gimmicks</h4>
                  <p className="text-xs text-[#80766A] mt-0.5">No long ticket lines; seamless digital cashless wristbands</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Stacked Offset Photo Pair */}
          <div className="lg:col-span-6 relative">
            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-md sm:max-w-none">
                {/* Large Base Image */}
                <div className="rounded-[var(--r-lg)] overflow-hidden border border-[#E4DCCF] shadow-[var(--sh-2)] bg-[#1D1A17] aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                    alt="Chefs plating culinary dishes"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Smaller Overlapping Image */}
                <div className="absolute -bottom-8 -left-6 sm:-left-10 w-2/3 rounded-[var(--r-md)] overflow-hidden border-4 border-[var(--bg)] shadow-[var(--sh-3)] aspect-[4/3] hidden sm:block">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                    alt="Festival guests dining on Lake Michigan"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Saffron Lakefront Badge */}
                <div className="absolute top-4 right-4 bg-[#1D1A17] text-[#FAF7F0] border border-[#D9A441]/40 rounded-full px-4 py-1.5 shadow-xl text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                  <span>On Chicago Lakefront</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
