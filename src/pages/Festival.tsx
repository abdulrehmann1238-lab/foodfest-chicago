import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Utensils,
  Music,
  Flame,
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  RotateCcw,
  AlertTriangle,
  Heart,
  Edit3,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useCmsStore } from '../store/cmsStore';
import { useUiStore } from '../store/uiStore';
import { useAnalyticsStore } from '../store/analyticsStore';
import { DietaryTag, DayOption, PriceBand, Vendor } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FESTIVAL_ACTIVITIES } from '../data/schedule';

export const Festival: React.FC = () => {
  const vendors = useCmsStore((state) => state.vendors);
  const schedule = useCmsStore((state) => state.schedule);
  const highlightedId = useCmsStore((state) => state.highlightedId);
  const {
    setSelectedVendorForDrawer,
    isEditorModeActive,
    setEditingTarget,
    myPlan,
    togglePlanAct,
    addToast,
    simulateNetworkError,
    setSimulateNetworkError,
  } = useUiStore();
  const logEvent = useAnalyticsStore((state) => state.logEvent);

  // Subnav sticky active tab
  const [activeSection, setActiveSection] = useState<'experience' | 'vendors' | 'entertainment' | 'activities'>('vendors');

  // Vendor Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayOption | 'All'>('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceBand | 'All'>('All');
  const [isLoadingSkeletons, setIsLoadingSkeletons] = useState(false);

  // Entertainment Day Tab
  const [scheduleDay, setScheduleDay] = useState<'Sat' | 'Sun'>('Sat');

  useEffect(() => {
    window.scrollTo(0, 0);
    logEvent('page_view', {
      page_title: 'The Festival · Food Fest Chicago 2027',
      page_path: '/festival',
    });
  }, [logEvent]);

  // Simulate short loading skeleton when filter changes
  const handleDietaryToggle = (tag: DietaryTag) => {
    setIsLoadingSkeletons(true);
    setTimeout(() => setIsLoadingSkeletons(false), 250);
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    logEvent('apply_filter', { filter_type: 'dietary', value: tag });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDietary([]);
    setSelectedDay('All');
    setSelectedPrice('All');
  };

  // Filtered Vendors calculation
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      // Search
      const matchesSearch =
        searchQuery === '' ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.signatureDish.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary (must have all selected dietary tags)
      const matchesDietary =
        selectedDietary.length === 0 ||
        selectedDietary.every((d) => v.dietary.includes(d));

      // Day
      const matchesDay =
        selectedDay === 'All' || v.days === 'Both' || v.days === selectedDay;

      // Price
      const matchesPrice =
        selectedPrice === 'All' || v.priceBand === selectedPrice;

      return matchesSearch && matchesDietary && matchesDay && matchesPrice;
    });
  }, [vendors, searchQuery, selectedDietary, selectedDay, selectedPrice]);

  const scrollToAnchor = (id: string) => {
    setActiveSection(id as any);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -130;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-[var(--bg)] min-h-screen pt-20">
      {/* Page Header */}
      <section className="bg-[#1D1A17] text-[#F7F2E9] py-16 sm:py-20 border-b border-[#4A433B]/50 relative overflow-hidden">
        <div className="container-custom max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441] mb-2 block">
            THE FESTIVAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
            Four ways to eat the world.
          </h1>
          <p className="text-base sm:text-lg text-[#E4DCCF]/80 max-w-2xl mx-auto leading-relaxed">
            Explore 60+ global kitchens, three live concert stages, hands-on culinary masterclasses, and an immersive lakeside food market.
          </p>
        </div>
      </section>

      {/* Sticky Subnav Bar */}
      <nav
        aria-label="Festival Sections"
        className="sticky top-[68px] z-[var(--z-sticky)] bg-[#FFFDF8] border-b border-[var(--border)] shadow-xs"
      >
        <div className="container-custom flex items-center justify-between overflow-x-auto no-scrollbar py-3">
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {[
              { id: 'experience', label: 'The Experience' },
              { id: 'vendors', label: `Food & Vendors (${vendors.length})` },
              { id: 'entertainment', label: 'Music & Lineup' },
              { id: 'activities', label: 'Workshops & Activities' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToAnchor(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-[#1D1A17] text-white shadow-xs'
                    : 'text-[#4A433B] hover:text-[#1D1A17] hover:bg-[#1D1A17]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Dev error simulation toggle */}
          <div className="hidden md:flex items-center gap-2 pl-4 text-xs text-[#80766A]">
            <span>Simulate Network Error:</span>
            <button
              onClick={() => setSimulateNetworkError(!simulateNetworkError)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                simulateNetworkError
                  ? 'bg-red-600 text-white'
                  : 'bg-[#1D1A17]/10 text-[#4A433B] hover:bg-[#1D1A17]/20'
              }`}
            >
              {simulateNetworkError ? 'FAILING' : 'OFF'}
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: THE EXPERIENCE */}
      <section id="experience" className="py-20 border-b border-[var(--border)]">
        <div className="container-custom">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
              01 / ATMOSPHERE & CULTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1">
              Curated for taste, not throughput.
            </h2>
            <p className="text-base text-[#4A433B] mt-3 leading-relaxed">
              Every detail of Food Fest Chicago is engineered to make international culinary heritage feel intimate, welcoming, and delightfully unhurried.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
              <div className="w-10 h-10 rounded-lg bg-[#B9502F]/10 text-[#B9502F] flex items-center justify-center font-bold mb-4 font-display text-xl">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">
                Generational Heritage
              </h3>
              <p className="text-xs text-[#4A433B] leading-relaxed">
                We hand-selected each operator based on family recipe authenticity, regional technique, and ingredient transparency—from Oaxaca to Lagos.
              </p>
            </div>

            <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
              <div className="w-10 h-10 rounded-lg bg-[#2F5D62]/10 text-[#2F5D62] flex items-center justify-center font-bold mb-4 font-display text-xl">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">
                Effortless Cashless RFID
              </h3>
              <p className="text-xs text-[#4A433B] leading-relaxed">
                Zero wallet digging. Your digital ticket transfers to an ultra-fast RFID wristband at check-in so you tap-to-pay at every stall in under 3 seconds.
              </p>
            </div>

            <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
              <div className="w-10 h-10 rounded-lg bg-[#D9A441]/20 text-[#1D1A17] flex items-center justify-center font-bold mb-4 font-display text-xl">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">
                Lakefront Promenade
              </h3>
              <p className="text-xs text-[#4A433B] leading-relaxed">
                Eat right along Lake Michigan with scenic breezes, shaded dining pergolas, grassy lawns, and picturesque views of Chicago’s skyline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FOOD & VENDORS */}
      <section id="vendors" className="py-20 border-b border-[var(--border)]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
                02 / CULINARY DIRECTORY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1">
                60+ International Kitchens
              </h2>
              <p className="text-sm text-[#80766A] mt-1">
                Filter by cuisine, dietary options, or price band to build your weekend eating map.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#2F5D62] bg-[#2F5D62]/10 px-3 py-1 rounded-full">
                {filteredVendors.length} {filteredVendors.length === 1 ? 'Vendor' : 'Vendors'} Available
              </span>
            </div>
          </div>

          {/* FILTER CONTROLS BAR */}
          <div className="p-5 rounded-[var(--r-md)] bg-white border border-[#E4DCCF] shadow-xs mb-8 flex flex-col gap-4">
            {/* Search Input & Segmented Day */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-[#80766A] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by restaurant name, cuisine (Oaxacan, Korean, Lebanese), country, or dish..."
                  className="w-full h-11 pl-10 pr-4 text-sm bg-[var(--surface)] border border-[#E4DCCF] rounded-[var(--r-sm)] text-[#1D1A17] placeholder:text-[#80766A] focus:outline-none focus:ring-2 focus:ring-[#2F5D62]"
                />
              </div>

              {/* Day Filter */}
              <div className="md:col-span-4 flex rounded-[var(--r-sm)] border border-[#E4DCCF] p-1 bg-[var(--bg)]">
                {(['All', 'Sat', 'Sun'] as const).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex-1 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                      selectedDay === day
                        ? 'bg-[#1D1A17] text-white shadow-xs'
                        : 'text-[#4A433B] hover:text-[#1D1A17]'
                    }`}
                  >
                    {day === 'All' ? 'All Days' : day === 'Sat' ? 'Sat Only' : 'Sun Only'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Filter Chips & Price Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E4DCCF]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#80766A] mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Dietary:</span>
                </span>
                {(['Halal', 'Vegetarian', 'Vegan', 'Gluten-Free'] as DietaryTag[]).map((tag) => {
                  const isChecked = selectedDietary.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleDietaryToggle(tag)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#66714A] text-white shadow-xs'
                          : 'bg-[#1D1A17]/5 text-[#4A433B] hover:bg-[#1D1A17]/10'
                      }`}
                    >
                      {isChecked ? `✓ ${tag}` : tag}
                    </button>
                  );
                })}
              </div>

              {/* Price Band & Reset */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-[#80766A]">
                  <span>Price:</span>
                  {(['All', '$', '$$', '$$$'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(p)}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
                        selectedPrice === p
                          ? 'bg-[#B9502F] text-white'
                          : 'text-[#4A433B] hover:bg-black/5'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {(searchQuery || selectedDietary.length > 0 || selectedDay !== 'All' || selectedPrice !== 'All') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[#B9502F] hover:underline flex items-center gap-1 cursor-pointer ml-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SIMULATED NETWORK ERROR STATE */}
          {simulateNetworkError ? (
            <div className="p-8 rounded-[var(--r-md)] bg-red-50 border border-red-300 text-center max-w-md mx-auto my-8">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-red-950 mb-1">
                Unable to Load Vendor Catalog
              </h3>
              <p className="text-xs text-red-800 mb-4 leading-relaxed">
                That didn’t load. Check your internet connection or turn off the demo error toggle above to resume browsing.
              </p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSimulateNetworkError(false)}
              >
                Retry Request
              </Button>
            </div>
          ) : isLoadingSkeletons ? (
            /* LOADING SKELETONS */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="rounded-[var(--r-md)] bg-white border border-[#E4DCCF] overflow-hidden p-4 flex flex-col gap-3 animate-pulse">
                  <div className="aspect-[16/10] bg-neutral-200 rounded-md" />
                  <div className="h-5 bg-neutral-200 rounded w-2/3" />
                  <div className="h-4 bg-neutral-200 rounded w-1/2" />
                  <div className="h-8 bg-neutral-100 rounded w-full mt-2" />
                </div>
              ))}
            </div>
          ) : filteredVendors.length === 0 ? (
            /* EMPTY STATE */
            <div className="text-center py-16 bg-white rounded-[var(--r-md)] border border-[#E4DCCF] max-w-lg mx-auto">
              <Utensils className="w-8 h-8 text-[#80766A] mx-auto mb-3 opacity-60" />
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-1">
                No vendors match your filters
              </h3>
              <p className="text-xs text-[#80766A] mb-5">
                Try clearing one or more filters or searching for another regional cuisine.
              </p>
              <Button size="sm" variant="secondary" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            /* 3-COLUMN VENDOR GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => {
                const isHighlighted = highlightedId === vendor.id;

                return (
                  <div
                    key={vendor.id}
                    onClick={() => {
                      if (isEditorModeActive) {
                        setEditingTarget({ type: 'vendor', id: vendor.id });
                      } else {
                        setSelectedVendorForDrawer(vendor);
                      }
                    }}
                    className={`bg-white rounded-[var(--r-md)] border overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer group ${
                      isHighlighted ? 'ring-4 ring-[#D9A441] scale-[1.02]' : ''
                    } ${
                      isEditorModeActive
                        ? 'border-dashed border-2 border-[#2F5D62] hover:bg-teal-50/20'
                        : 'border-[#E4DCCF] hover:border-[#1D1A17] hover:shadow-[var(--sh-2)] hover:-translate-y-1'
                    }`}
                  >
                    {/* Image Header */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1D1A17]">
                      <img
                        src={vendor.photo}
                        alt={vendor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Flag & Cuisine */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                        <span>{vendor.flag}</span>
                        <span>{vendor.country}</span>
                      </div>

                      {/* Price Band */}
                      <div className="absolute top-3 right-3 bg-black/60 text-[#D9A441] font-mono text-xs font-bold px-2 py-0.5 rounded">
                        {vendor.priceBand}
                      </div>

                      {/* Edit Badge */}
                      {isEditorModeActive && (
                        <div className="absolute bottom-3 right-3 bg-[#2F5D62] text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-md">
                          <Edit3 className="w-3 h-3" />
                          <span>EDIT</span>
                        </div>
                      )}

                      {/* Booth Location */}
                      <div className="absolute bottom-3 left-3 text-xs text-white flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B9502F]" />
                        <span className="text-[#E4DCCF] truncate">{vendor.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between mb-1">
                          <h3 className="font-display text-xl font-bold text-[#1D1A17] group-hover:text-[#B9502F] transition-colors">
                            {vendor.name}
                          </h3>
                        </div>
                        <p className="text-xs uppercase font-semibold text-[#80766A] tracking-wider mb-3">
                          {vendor.cuisine} Cuisine
                        </p>

                        <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E4DCCF] mb-3">
                          <span className="text-[10px] uppercase font-bold text-[#B9502F] block">
                            Signature Dish
                          </span>
                          <p className="text-xs font-semibold text-[#1D1A17] mt-0.5 leading-snug">
                            {vendor.signatureDish}
                          </p>
                        </div>

                        <p className="text-xs text-[#4A433B] leading-relaxed line-clamp-2">
                          {vendor.description}
                        </p>
                      </div>

                      {/* Dietary Badges */}
                      <div className="mt-4 pt-3 border-t border-[#E4DCCF] flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {vendor.dietary.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#66714A]/10 text-[#66714A]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="text-xs font-semibold text-[#2F5D62] group-hover:underline">
                          View Dish Bio →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: ENTERTAINMENT & SCHEDULE */}
      <section id="entertainment" className="py-20 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2F5D62]">
                03 / MUSIC & PERFORMANCE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1">
                Stage Lineup & Timetable
              </h2>
              <p className="text-sm text-[#80766A] mt-1 max-w-xl">
                Non-stop music across Main Stage, Lakeside Stage, and Global Pavilion. Click star to save acts to your personal schedule.
              </p>
            </div>

            {/* Saturday / Sunday Switch */}
            <div className="flex bg-[#F7F2E9] p-1 rounded-full border border-[var(--border)]">
              <button
                onClick={() => setScheduleDay('Sat')}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  scheduleDay === 'Sat'
                    ? 'bg-[#1D1A17] text-white shadow-xs'
                    : 'text-[#4A433B] hover:text-[#1D1A17]'
                }`}
              >
                Saturday, June 12
              </button>
              <button
                onClick={() => setScheduleDay('Sun')}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  scheduleDay === 'Sun'
                    ? 'bg-[#1D1A17] text-white shadow-xs'
                    : 'text-[#4A433B] hover:text-[#1D1A17]'
                }`}
              >
                Sunday, June 13
              </button>
            </div>
          </div>

          {/* Schedule Acts List */}
          <div className="flex flex-col gap-4">
            {schedule
              .filter((act) => act.day === scheduleDay)
              .map((act) => {
                const isInPlan = myPlan.includes(act.id);

                return (
                  <div
                    key={act.id}
                    className={`bg-white rounded-[var(--r-md)] border border-[#E4DCCF] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                      act.isHeadliner ? 'ring-2 ring-[#D9A441]/50 bg-amber-50/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-[var(--r-sm)] overflow-hidden bg-[#1D1A17] shrink-0">
                        <img
                          src={act.photo}
                          alt={act.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs uppercase font-bold text-[#B9502F] tracking-wide">
                            {act.stage}
                          </span>
                          {act.isHeadliner && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D9A441] text-[#1D1A17]">
                              Headliner
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-xl font-bold text-[#1D1A17] leading-snug">
                          {act.name}
                        </h3>

                        <p className="text-xs text-[#80766A] mt-0.5">{act.genre}</p>
                        <p className="text-xs text-[#4A433B] mt-2 max-w-xl leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E4DCCF]">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#1D1A17]">
                        <Clock className="w-3.5 h-3.5 text-[#B9502F]" />
                        <span>{act.time}</span>
                      </div>

                      <button
                        onClick={() => {
                          const added = togglePlanAct(act.id);
                          addToast({
                            title: added ? 'Saved to Festival Plan' : 'Removed from Plan',
                            message: `${act.name} updated in your schedule.`,
                            type: added ? 'success' : 'info',
                          });
                        }}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isInPlan
                            ? 'bg-[#B9502F] text-white border-[#B9502F]'
                            : 'border-[#1D1A17] text-[#1D1A17] hover:bg-black/5'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isInPlan ? 'fill-current' : ''}`} />
                        <span>{isInPlan ? 'In My Plan' : '+ Add to Plan'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* SECTION 4: FESTIVAL ACTIVITIES & WORKSHOPS */}
      <section id="activities" className="py-20">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441]">
              04 / INTERACTIVE WORKSHOPS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1">
              Culinary Masterclasses & Contests
            </h2>
            <p className="text-sm text-[#80766A] mt-1">
              Roll up your sleeves with hands-on cooking labs, spice blending apothecary bars, and spirited culinary dares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FESTIVAL_ACTIVITIES.map((act) => (
              <div
                key={act.id}
                className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        act.isAddon
                          ? 'bg-[#B9502F]/10 text-[#B9502F] border border-[#B9502F]/20'
                          : 'bg-[#3F7D58]/10 text-[#3F7D58] border border-[#3F7D58]/20'
                      }`}
                    >
                      {act.isAddon ? `Add-on $${act.price}` : 'Included with Pass'}
                    </span>
                    <span className="text-xs text-[#80766A] font-mono">{act.duration}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#1D1A17] mb-2 leading-snug">
                    {act.name}
                  </h3>

                  <p className="text-xs text-[#4A433B] leading-relaxed mb-4">
                    {act.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4DCCF] flex items-center justify-between text-xs text-[#80766A]">
                  <span>{act.capacity}</span>
                  <span className="font-semibold text-[#1D1A17]">{act.schedule.split('·')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
