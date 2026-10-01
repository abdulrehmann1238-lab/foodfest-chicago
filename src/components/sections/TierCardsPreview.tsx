import React from 'react';
import { CheckCircle2, Ticket, Sparkles, ShieldCheck, QrCode, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TICKET_TIERS } from '../../data/tickets';
import { formatCurrency } from '../../lib/format';
import { useCheckoutStore } from '../../store/checkoutStore';
import { Button } from '../ui/Button';

export const TierCardsPreview: React.FC = () => {
  const openCheckout = useCheckoutStore((state) => state.openCheckout);

  // Take 3 representative tiers: Early-Bird GA, Weekend Pass, VIP Day
  const featuredTiers = [TICKET_TIERS[0], TICKET_TIERS[2], TICKET_TIERS[3]];

  return (
    <section className="py-24 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
            TICKET TIERS & ACCESS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#1D1A17] mt-2 mb-4">
            Choose your weekend pass.
          </h2>
          <p className="text-sm sm:text-base text-[#80766A]">
            Phase 1 Early-Bird rates available for a limited allocation. Every ticket includes cashless RFID wristband and grounds entry.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {featuredTiers.map((tier) => {
            const isVip = tier.isVip;
            const isWeekend = tier.period === 'Weekend';

            return (
              <div
                key={tier.id}
                className={`rounded-[var(--r-lg)] p-8 flex flex-col justify-between transition-all duration-200 ${
                  isVip
                    ? 'bg-[#1D1A17] text-[#F7F2E9] border-2 border-[#D9A441] shadow-xl relative'
                    : isWeekend
                    ? 'bg-white border-2 border-[#B9502F] shadow-[var(--sh-2)] relative'
                    : 'bg-white border border-[#E4DCCF] shadow-sm'
                }`}
              >
                {/* Badge if featured */}
                {tier.badge && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${
                      isVip
                        ? 'bg-[#D9A441] text-[#1D1A17]'
                        : 'bg-[#B9502F] text-white'
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      className={`text-xs uppercase font-bold tracking-wider ${
                        isVip ? 'text-[#D9A441]' : 'text-[#80766A]'
                      }`}
                    >
                      {tier.period} Ticket
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isVip ? 'text-[#3F7D58]' : 'text-[#3F7D58]'
                      }`}
                    >
                      {tier.status === 'almost-gone' ? '⚡ Almost Gone' : 'Available'}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-2xl font-bold mb-2 ${
                      isVip ? 'text-white' : 'text-[#1D1A17]'
                    }`}
                  >
                    {tier.name}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-6 font-sans ${
                      isVip ? 'text-[#E4DCCF]/75' : 'text-[#80766A]'
                    }`}
                  >
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-inherit/20">
                    <span
                      className={`font-display text-5xl font-bold tracking-tight ${
                        isVip ? 'text-white' : 'text-[#1D1A17]'
                      }`}
                    >
                      {formatCurrency(tier.price)}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isVip ? 'text-[#E4DCCF]/70' : 'text-[#80766A]'
                      }`}
                    >
                      / guest
                    </span>
                  </div>

                  {/* Perk list */}
                  <ul className="flex flex-col gap-3 mb-8">
                    {tier.perks.map((perk, i) => (
                      <li
                        key={i}
                        className={`text-xs flex items-start gap-2.5 leading-snug ${
                          isVip ? 'text-[#E4DCCF]/90' : 'text-[#4A433B]'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isVip ? 'text-[#D9A441]' : 'text-[#3F7D58]'
                          }`}
                        />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    size="lg"
                    variant={isVip ? 'primary' : isWeekend ? 'primary' : 'secondary'}
                    onClick={() => openCheckout(tier.id)}
                    leftIcon={<Ticket className="w-4 h-4" />}
                    className="w-full text-sm font-semibold"
                  >
                    Select {tier.name.split(' ')[0]} Pass
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <QrCode className="w-5 h-5 text-[#B9502F]" />
            <h4 className="text-xs font-bold text-[#1D1A17]">Instant Digital QR Tickets</h4>
            <p className="text-xs text-[#80766A]">Delivered straight to email, Apple Wallet, or Google Wallet.</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-[#2F5D62]" />
            <h4 className="text-xs font-bold text-[#1D1A17]">100% White-Label Branded Checkout</h4>
            <p className="text-xs text-[#80766A]">Encrypted, transparent pricing with zero surprise add-ons.</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <RotateCcw className="w-5 h-5 text-[#66714A]" />
            <h4 className="text-xs font-bold text-[#1D1A17]">Free 24h Name Transfer</h4>
            <p className="text-xs text-[#80766A]">Can't make it? Transfer your pass to a friend in one tap.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
