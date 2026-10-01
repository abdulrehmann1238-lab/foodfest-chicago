import React from 'react';
import { Crown, Sparkles, Check, Ticket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useCheckoutStore } from '../../store/checkoutStore';

export const VipCallout: React.FC = () => {
  const openCheckout = useCheckoutStore((state) => state.openCheckout);

  const vipPerks = [
    'Fast-track express entrance gate with zero queuing',
    'Lakeview VIP Lounge with covered shade and lake breeze',
    '6 to 12 complimentary tasting tokens included ($18–$36 value)',
    'Air-conditioned executive restroom trailers with attendants',
    'Dedicated mixologist cocktail bar & premium wine list',
    'Elevated viewing riser for Main Stage headliners',
  ];

  return (
    <section className="py-24 bg-[#1D1A17] text-[#F7F2E9] relative overflow-hidden border-b border-[#4A433B]/40">
      {/* Warm background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D9A441]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-[#D9A441]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441]">
                THE VIP EXPERIENCE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
              Skip the lines. Keep the best seat on the lake.
            </h2>

            <p className="text-base sm:text-lg text-[#E4DCCF]/85 leading-relaxed font-sans mb-8 max-w-xl">
              Elevate your festival with shaded lounge seating, private bars, air-conditioned suites, and complimentary tasting tokens for effortless grazing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {vipPerks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#E4DCCF]/90">
                  <Check className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => openCheckout('vip-day')}
                leftIcon={<Ticket className="w-5 h-5" />}
                className="text-base font-semibold px-8"
              >
                Get VIP Day Pass · $135
              </Button>

              <Link to="/tickets#vip">
                <Button
                  size="lg"
                  variant="outline"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="text-white border-white/30 hover:border-white hover:text-white"
                >
                  Compare GA vs VIP
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[var(--r-lg)] overflow-hidden border border-[#D9A441]/40 shadow-2xl bg-[#25211D] aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                alt="VIP Lounge on Lakefront"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute -bottom-5 -right-5 sm:bottom-4 sm:right-4 bg-[#1D1A17] border border-[#D9A441]/50 p-4 rounded-[var(--r-md)] shadow-xl text-left">
              <span className="text-[10px] uppercase font-bold text-[#D9A441] tracking-widest block">
                VIP ALL-ACCESS WEEKEND
              </span>
              <span className="font-display text-2xl font-bold text-white leading-none mt-1 block">
                $240
              </span>
              <span className="text-[11px] text-[#80766A]">Includes 12 tasting tokens & chef talk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
