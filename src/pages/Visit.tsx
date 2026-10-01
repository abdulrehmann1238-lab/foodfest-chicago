import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Hotel,
  Car,
  Train,
  Clock,
  Search,
  ChevronDown,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { FESTIVAL_HOTELS } from '../data/hotels';
import { FESTIVAL_FAQS } from '../data/faqs';
import { PriceBand, FaqItem } from '../types';
import { useAnalyticsStore } from '../store/analyticsStore';
import { useUiStore } from '../store/uiStore';
import { Button } from '../components/ui/Button';

export const Visit: React.FC = () => {
  const logEvent = useAnalyticsStore((state) => state.logEvent);
  const addToast = useUiStore((state) => state.addToast);

  // Hotel Filters
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [selectedPrice, setSelectedPrice] = useState<PriceBand | 'All'>('All');
  const [hoveredHotelId, setHoveredHotelId] = useState<string | null>(null);

  // FAQ Filters
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FESTIVAL_FAQS[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
    logEvent('page_view', {
      page_title: 'Plan Your Visit · Food Fest Chicago 2027',
      page_path: '/visit',
    });
  }, [logEvent]);

  // Filtered Hotels
  const filteredHotels = useMemo(() => {
    return FESTIVAL_HOTELS.filter((h) => {
      const matchDistance = h.distanceMiles <= maxDistance;
      const matchPrice = selectedPrice === 'All' || h.priceBand === selectedPrice;
      return matchDistance && matchPrice;
    });
  }, [maxDistance, selectedPrice]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FESTIVAL_FAQS.filter((f) => {
      const matchCategory =
        selectedCategory === 'All' || f.category === selectedCategory;
      const matchSearch =
        faqSearch === '' ||
        f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.answer.toLowerCase().includes(faqSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, faqSearch]);

  const handleBookHotel = (hotelName: string) => {
    addToast({
      title: 'Partner Booking Portal',
      message: `Festival group discount rates unlocked for ${hotelName}. Redirecting to partner reservations...`,
      type: 'info',
    });
  };

  const categories = [
    'All',
    'Tickets & Entry',
    'Food & Dietary',
    'Travel & Venue',
    'Vendors & Partners',
  ];

  return (
    <main className="w-full bg-[var(--bg)] min-h-screen pt-20">
      {/* Header */}
      <section className="bg-[#1D1A17] text-[#F7F2E9] py-16 sm:py-20 border-b border-[#4A433B]/50 text-center">
        <div className="container-custom max-w-4xl">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441] mb-2 block">
            LOGISTICS & STAY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
            Plan your Chicago weekend.
          </h1>
          <p className="text-base sm:text-lg text-[#E4DCCF]/80 max-w-2xl mx-auto leading-relaxed">
            Venue access, discounted boutique hotel room blocks, public transit routes, and our complete festival knowledge base.
          </p>
        </div>
      </section>

      {/* TRAVEL & HOTELS SECTION */}
      <section className="py-20 border-b border-[var(--border)]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
              ACCOMMODATIONS & MAP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1">
              Official Partner Hotels & Grounds Map
            </h2>
            <p className="text-sm text-[#80766A] mt-2">
              Stay near the lake or in downtown Chicago's historic dining neighborhoods with partner perks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Stylized Interactive SVG Map */}
            <div className="lg:col-span-5 bg-[#1D1A17] rounded-[var(--r-lg)] p-5 border border-[#4A433B] shadow-xl text-[#F7F2E9] relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#4A433B]/60 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#D9A441]">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>DOWNTOWN CHICAGO & LAKEFRONT</span>
                </div>
                <span className="text-[10px] text-[#80766A]">Interactive Pins</span>
              </div>

              {/* Stylized SVG Map Representation */}
              <div className="relative aspect-[4/3] w-full bg-[#25211D] rounded-[var(--r-md)] overflow-hidden border border-[#4A433B]/40">
                <svg viewBox="0 0 100 100" className="w-full h-full select-none">
                  {/* Lake Michigan blue area */}
                  <path
                    d="M 62 0 Q 58 50, 70 100 L 100 100 L 100 0 Z"
                    fill="#2F5D62"
                    opacity="0.35"
                  />
                  <text x="75" y="50" fill="#E4DCCF" opacity="0.3" fontSize="4" fontStyle="italic">
                    Lake Michigan
                  </text>

                  {/* Grid roads */}
                  <line x1="20" y1="0" x2="20" y2="100" stroke="#4A433B" strokeWidth="0.5" strokeDasharray="1,2" />
                  <line x1="38" y1="0" x2="38" y2="100" stroke="#4A433B" strokeWidth="0.5" strokeDasharray="1,2" />
                  <line x1="0" y1="35" x2="60" y2="35" stroke="#4A433B" strokeWidth="0.5" strokeDasharray="1,2" />
                  <line x1="0" y1="65" x2="65" y2="65" stroke="#4A433B" strokeWidth="0.5" strokeDasharray="1,2" />

                  {/* CTA Line */}
                  <path d="M 32 0 L 32 100" stroke="#B23A3A" strokeWidth="0.8" opacity="0.7" />
                  <text x="24" y="90" fill="#B23A3A" fontSize="3" fontWeight="bold">CTA Red</text>

                  {/* FESTIVAL GROUNDS (Anchor) */}
                  <g transform="translate(60, 48)">
                    <circle r="7" fill="#B9502F" opacity="0.25" className="animate-ping" />
                    <circle r="3.5" fill="#B9502F" />
                    <circle r="1.5" fill="#D9A441" />
                    <text x="5" y="2" fill="#FFFFFF" fontSize="3.5" fontWeight="bold">
                      Festival Grounds
                    </text>
                  </g>

                  {/* HOTEL PINS */}
                  {FESTIVAL_HOTELS.map((hotel) => {
                    const isHovered = hoveredHotelId === hotel.id;
                    return (
                      <g
                        key={hotel.id}
                        transform={`translate(${hotel.coords.x}, ${hotel.coords.y})`}
                        className="cursor-pointer transition-transform"
                        onMouseEnter={() => setHoveredHotelId(hotel.id)}
                        onMouseLeave={() => setHoveredHotelId(null)}
                      >
                        <circle
                          r={isHovered ? 4.5 : 2.8}
                          fill={isHovered ? '#D9A441' : '#FFFDF8'}
                          stroke="#1D1A17"
                          strokeWidth="0.8"
                        />
                        <text
                          x="3"
                          y="1"
                          fill={isHovered ? '#D9A441' : '#E4DCCF'}
                          fontSize="2.8"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                        >
                          {hotel.name.split(' ')[1] || hotel.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Transit Quick Cards */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="p-2.5 rounded bg-[#171513] border border-[#4A433B]/40 flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#B9502F]" />
                  <div>
                    <span className="font-bold text-white block">CTA Transit</span>
                    <span className="text-[10px] text-[#80766A]">Red / Green Line (8 min walk)</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#171513] border border-[#4A433B]/40 flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#2F5D62]" />
                  <div>
                    <span className="font-bold text-white block">Rideshare Drop</span>
                    <span className="text-[10px] text-[#80766A]">Dedicated Gate A zone</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hotel Filters & Cards List */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Hotel Filter Controls */}
              <div className="p-4 rounded-[var(--r-md)] bg-white border border-[#E4DCCF] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#1D1A17]">Max Distance:</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                    className="accent-[#B9502F] cursor-pointer w-28"
                  />
                  <span className="font-mono font-bold text-[#B9502F]">{maxDistance} mi</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#80766A]">Price Band:</span>
                  {(['All', '$', '$$', '$$$'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(p)}
                      className={`px-2.5 py-0.5 rounded font-mono font-semibold transition-colors cursor-pointer ${
                        selectedPrice === p
                          ? 'bg-[#1D1A17] text-white'
                          : 'bg-[#1D1A17]/5 text-[#4A433B] hover:bg-[#1D1A17]/10'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hotels List */}
              <div className="flex flex-col gap-4">
                {filteredHotels.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-[var(--r-md)] border border-[#E4DCCF]">
                    <p className="text-xs text-[#80766A]">No hotels found within {maxDistance} miles. Expand the distance slider.</p>
                  </div>
                ) : (
                  filteredHotels.map((hotel) => {
                    const isHovered = hoveredHotelId === hotel.id;

                    return (
                      <div
                        key={hotel.id}
                        onMouseEnter={() => setHoveredHotelId(hotel.id)}
                        onMouseLeave={() => setHoveredHotelId(null)}
                        className={`p-4 rounded-[var(--r-md)] bg-white border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isHovered
                            ? 'border-[#B9502F] ring-2 ring-[#B9502F]/20 shadow-md'
                            : 'border-[#E4DCCF] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-20 h-20 rounded-[var(--r-sm)] overflow-hidden bg-[#1D1A17] shrink-0">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display text-base font-bold text-[#1D1A17]">
                                {hotel.name}
                              </h4>
                              <span className="text-xs font-mono font-bold text-[#B9502F]">
                                {hotel.priceBand}
                              </span>
                            </div>

                            <p className="text-xs text-[#2F5D62] font-semibold mt-0.5">
                              {hotel.distance}
                            </p>

                            <p className="text-[11px] text-[#80766A] mt-1 leading-snug">
                              {hotel.perks}
                            </p>
                          </div>
                        </div>

                        <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E4DCCF]">
                          <div className="flex items-center gap-1 text-xs text-[#B7791F]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-bold">{hotel.rating}</span>
                          </div>

                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleBookHotel(hotel.name)}
                            rightIcon={<ExternalLink className="w-3 h-3" />}
                            className="text-xs h-8"
                          >
                            Partner Rate
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL FAQ SECTION */}
      <section id="faqs" className="py-24">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2F5D62]">
              FESTIVAL KNOWLEDGE BASE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#80766A]">
              Live searchable answers to all festival guidelines, bag policies, and ticketing inquiries.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <Search className="w-4 h-4 text-[#80766A] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. wristband, parking, rain, gluten-free, kids)..."
                className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-[#E4DCCF] rounded-[var(--r-sm)] text-[#1D1A17] placeholder:text-[#80766A] focus:outline-none focus:ring-2 focus:ring-[#2F5D62]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1D1A17] text-white shadow-xs'
                      : 'bg-white border border-[#E4DCCF] text-[#4A433B] hover:border-[#1D1A17]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-[var(--r-md)] border border-[#E4DCCF]">
                <p className="text-xs text-[#80766A]">No questions match "{faqSearch}".</p>
                <button
                  onClick={() => {
                    setFaqSearch('');
                    setSelectedCategory('All');
                  }}
                  className="mt-2 text-xs font-semibold text-[#B9502F] hover:underline"
                >
                  Reset FAQ Filter
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-[var(--r-md)] border border-[#E4DCCF] overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#1D1A17] hover:text-[#B9502F] transition-colors cursor-pointer"
                    >
                      <span className="font-display pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#80766A] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#B9502F]' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-200 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-xs sm:text-sm text-[#4A433B] leading-relaxed font-sans border-t border-[#FAF7F0] pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
