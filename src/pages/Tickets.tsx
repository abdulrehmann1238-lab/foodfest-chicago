import React, { useState, useEffect } from 'react';
import {
  Ticket,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  QrCode,
  RotateCcw,
  Sparkles,
  Crown,
  ChevronDown,
} from 'lucide-react';
import { TICKET_TIERS, VIP_COMPARISON_MATRIX, VipComparisonRow } from '../data/tickets';
import { formatCurrency } from '../lib/format';
import { useCheckoutStore } from '../store/checkoutStore';
import { useAnalyticsStore } from '../store/analyticsStore';
import { Button } from '../components/ui/Button';

export const Tickets: React.FC = () => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<'All' | 'Sat' | 'Sun' | 'Weekend'>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const openCheckout = useCheckoutStore((state) => state.openCheckout);
  const logEvent = useAnalyticsStore((state) => state.logEvent);

  useEffect(() => {
    window.scrollTo(0, 0);
    logEvent('page_view', {
      page_title: 'Tickets & Pricing · Food Fest Chicago 2027',
      page_path: '/tickets',
    });
  }, [logEvent]);

  const displayedTiers = TICKET_TIERS.filter((tier) => {
    if (selectedDayFilter === 'All') return true;
    if (selectedDayFilter === 'Weekend') return tier.period === 'Weekend';
    return tier.period === 'Day';
  });

  const ticketFaqs = [
    {
      q: 'Can I upgrade my General Admission ticket to VIP later?',
      a: 'Yes! If VIP passes are still available, you can upgrade by paying the difference via your confirmation management link up to 72 hours before the festival.',
    },
    {
      q: 'Do tasting tokens expire?',
      a: 'Tasting tokens are valid throughout both days of the 2027 festival weekend. Any unspent tokens cannot be refunded or carried to future years.',
    },
    {
      q: 'How do group purchases work?',
      a: 'You can purchase up to 10 passes in a single checkout. After purchase, you can enter the individual names and emails of your guests to assign their personal QR codes.',
    },
    {
      q: 'What is included in the Cashless RFID Wristband?',
      a: 'Every ticket holder receives an RFID wristband at the gate. It stores your ticket access, preloaded tasting tokens, and allows contactless tap-to-pay at all 60+ vendor stalls.',
    },
  ];

  return (
    <main className="w-full bg-[var(--bg)] min-h-screen pt-20">
      {/* Header with Phase 1 Early-Bird Banner */}
      <section className="bg-[#1D1A17] text-[#F7F2E9] py-16 sm:py-20 border-b border-[#4A433B]/50 relative overflow-hidden">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/20 border border-[#D9A441]/40 text-[#D9A441] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1 Early-Bird Pricing Active</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
            Choose your weekend.
          </h1>

          <p className="text-base sm:text-lg text-[#E4DCCF]/80 max-w-2xl mx-auto leading-relaxed font-sans mb-8">
            Single-day and full-weekend passes for Chicago's premier international food festival. All passes include grounds entry and cashless wristband.
          </p>

          {/* Segmented Filter Control */}
          <div className="inline-flex bg-[#2C2723] p-1.5 rounded-full border border-[#4A433B] max-w-md mx-auto">
            {(['All', 'Sat', 'Sun', 'Weekend'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedDayFilter(filter)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDayFilter === filter
                    ? 'bg-[#B9502F] text-white shadow-sm'
                    : 'text-[#E4DCCF]/70 hover:text-white'
                }`}
              >
                {filter === 'All'
                  ? 'All Tiers'
                  : filter === 'Sat'
                  ? 'Saturday Passes'
                  : filter === 'Sun'
                  ? 'Sunday Passes'
                  : 'Full Weekend'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TIER CARDS GRID */}
      <section className="py-20 border-b border-[var(--border)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTiers.map((tier) => {
              const isVip = tier.isVip;

              return (
                <div
                  key={tier.id}
                  className={`rounded-[var(--r-lg)] p-8 flex flex-col justify-between transition-all ${
                    isVip
                      ? 'bg-[#1D1A17] text-[#F7F2E9] border-2 border-[#D9A441] shadow-2xl relative'
                      : 'bg-white border border-[#E4DCCF] shadow-sm hover:border-[#1D1A17]'
                  }`}
                >
                  {tier.badge && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 self-start ${
                        isVip
                          ? 'bg-[#D9A441] text-[#1D1A17]'
                          : 'bg-[#B9502F]/10 text-[#B9502F] border border-[#B9502F]/20'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  )}

                  <div>
                    <span
                      className={`text-xs uppercase font-bold tracking-wider ${
                        isVip ? 'text-[#D9A441]' : 'text-[#80766A]'
                      }`}
                    >
                      {tier.period} Pass
                    </span>

                    <h3
                      className={`font-display text-2xl font-bold mt-1 mb-2 ${
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

                    <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-inherit/20">
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
                        / person
                      </span>
                    </div>

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

                  <Button
                    size="lg"
                    variant={isVip ? 'primary' : 'secondary'}
                    onClick={() => openCheckout(tier.id, 2)}
                    leftIcon={<Ticket className="w-4 h-4" />}
                    className="w-full text-sm font-semibold"
                  >
                    Select Pass & Add-ons
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VIP VS GA COMPARISON TABLE */}
      <section id="vip" className="py-24 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-[#D9A441]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
                SIDE-BY-SIDE EVALUATION
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17]">
              General Admission vs. VIP Experience
            </h2>
            <p className="text-sm text-[#80766A] mt-2">
              A detailed breakdown to help you pick the right experience for your group.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block bg-white rounded-[var(--r-lg)] border border-[#E4DCCF] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F0] border-b border-[#E4DCCF] text-xs uppercase font-bold text-[#1D1A17]">
                  <th className="py-4 px-6 w-1/2">Experience Feature</th>
                  <th className="py-4 px-6 text-center w-1/4">General Admission</th>
                  <th className="py-4 px-6 text-center w-1/4 bg-[#1D1A17] text-white">
                    <span className="flex items-center justify-center gap-1.5 text-[#D9A441]">
                      <Crown className="w-3.5 h-3.5" />
                      <span>VIP Experience</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DCCF] text-xs text-[#4A433B]">
                {VIP_COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F0]/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#1D1A17] text-sm">{row.feature}</div>
                      <div className="text-xs text-[#80766A] mt-0.5">{row.description}</div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      {typeof row.ga === 'boolean' ? (
                        row.ga ? (
                          <CheckCircle2 className="w-5 h-5 text-[#3F7D58] mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#80766A]/40 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-[#1D1A17]">{row.ga}</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-center bg-[#1D1A17]/5 font-semibold text-[#1D1A17]">
                      {typeof row.vip === 'boolean' ? (
                        row.vip ? (
                          <CheckCircle2 className="w-5 h-5 text-[#B9502F] mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#80766A]/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-[#B9502F] font-bold">{row.vip}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Accordion View */}
          <div className="sm:hidden flex flex-col gap-3">
            {VIP_COMPARISON_MATRIX.map((row, idx) => (
              <div key={idx} className="p-4 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
                <h4 className="text-sm font-bold text-[#1D1A17] mb-1">{row.feature}</h4>
                <p className="text-xs text-[#80766A] mb-3">{row.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E4DCCF] text-xs">
                  <div>
                    <span className="text-[#80766A] block text-[10px] uppercase">GA:</span>
                    <span className="font-semibold">
                      {typeof row.ga === 'boolean' ? (row.ga ? 'Included' : 'Not included') : row.ga}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#B9502F] block text-[10px] uppercase font-bold">VIP:</span>
                    <span className="font-bold text-[#B9502F]">
                      {typeof row.vip === 'boolean' ? (row.vip ? 'Included' : 'Not included') : row.vip}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => openCheckout('vip-day')}
              leftIcon={<Crown className="w-4 h-4 text-[#D9A441]" />}
              className="px-8"
            >
              Get VIP Pass · $135
            </Button>
          </div>
        </div>
      </section>

      {/* TICKETS MICRO-FAQ */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
              TICKETING ASSISTANCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1D1A17] mt-1">
              Ticketing & Admission FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {ticketFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[var(--r-md)] border border-[#E4DCCF] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-semibold text-sm text-[#1D1A17] flex justify-between items-center cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#80766A] transition-transform ${
                        isOpen ? 'rotate-180 text-[#B9502F]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#4A433B] leading-relaxed border-t border-[#FAF7F0] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
