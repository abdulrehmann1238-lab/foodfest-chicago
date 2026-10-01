import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, MapPin, Edit3 } from 'lucide-react';
import { useCmsStore } from '../../store/cmsStore';
import { useUiStore } from '../../store/uiStore';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const FeaturedVendorsRow: React.FC = () => {
  const vendors = useCmsStore((state) => state.vendors);
  const highlightedId = useCmsStore((state) => state.highlightedId);
  const { setSelectedVendorForDrawer, isEditorModeActive, setEditingTarget } = useUiStore();

  const featured = vendors.slice(0, 8);

  return (
    <section className="py-24 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
              CULINARY LINEUP TEASER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1D1A17] mt-2">
              Featured Food Artisans
            </h2>
            <p className="text-sm sm:text-base text-[#80766A] mt-2 max-w-xl">
              Preview 8 of our 60+ global kitchens. Swipe or scroll horizontally to explore dishes and regional specialties.
            </p>
          </div>

          <Link to="/festival#vendors">
            <Button
              size="md"
              variant="outline"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              See All 60+ Vendors
            </Button>
          </Link>
        </div>

        {/* Horizontal Scroll Snap Row */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          {featured.map((vendor) => {
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
                className={`snap-start shrink-0 w-[290px] sm:w-[340px] bg-white rounded-[var(--r-md)] border overflow-hidden transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                  isHighlighted ? 'ring-4 ring-[#D9A441] scale-[1.02]' : ''
                } ${
                  isEditorModeActive
                    ? 'border-dashed border-2 border-[#2F5D62] hover:bg-teal-50/20'
                    : 'border-[#E4DCCF] hover:border-[#1D1A17] hover:shadow-[var(--sh-2)] hover:-translate-y-1'
                }`}
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1D1A17]">
                  <img
                    src={vendor.photo}
                    alt={vendor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Flag & Cuisine Chip */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                    <span>{vendor.flag}</span>
                    <span>{vendor.country}</span>
                  </div>

                  {/* Edit badge if edit mode is active */}
                  {isEditorModeActive && (
                    <div className="absolute top-3 right-3 bg-[#2F5D62] text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-md">
                      <Edit3 className="w-3 h-3" />
                      <span>EDIT CMS</span>
                    </div>
                  )}

                  {/* Booth Location */}
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-[#E4DCCF]/90">
                      <MapPin className="w-3.5 h-3.5 text-[#B9502F]" />
                      <span className="truncate">{vendor.location.split('·')[0]}</span>
                    </span>
                    <span className="font-bold text-[#D9A441]">{vendor.priceBand}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#1D1A17] group-hover:text-[#B9502F] transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-xs uppercase font-semibold text-[#80766A] mt-0.5 tracking-wider">
                      {vendor.cuisine} Cuisine
                    </p>

                    <div className="mt-3 p-2.5 rounded bg-[#FAF7F0] border border-[#E4DCCF]">
                      <span className="text-[10px] uppercase font-bold text-[#B9502F] tracking-wide block">
                        Must-Try Signature
                      </span>
                      <p className="text-xs font-semibold text-[#1D1A17] mt-0.5 line-clamp-1">
                        {vendor.signatureDish}
                      </p>
                    </div>
                  </div>

                  {/* Dietary & Day Tags */}
                  <div className="mt-4 pt-3 border-t border-[#E4DCCF] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {vendor.dietary.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#66714A]/10 text-[#66714A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#2F5D62] group-hover:underline flex items-center gap-1">
                      <span>View Bio</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
