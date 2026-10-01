import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Heart, Share2, Tag, Utensils } from 'lucide-react';
import { useUiStore } from '../../../store/uiStore';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

export const VendorDrawer: React.FC = () => {
  const { selectedVendorForDrawer, setSelectedVendorForDrawer, addToast } = useUiStore();

  if (!selectedVendorForDrawer) return null;

  const vendor = selectedVendorForDrawer;

  const handleFavorite = () => {
    addToast({
      title: 'Added to Taste List',
      message: `${vendor.name} saved to your visit tasting itinerary.`,
      type: 'success',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[var(--z-drawer)] bg-black/60 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full sm:w-[480px] h-full bg-[var(--surface-elevated)] flex flex-col shadow-2xl overflow-hidden border-l border-[var(--border)]"
        >
          {/* Header Image */}
          <div className="relative h-64 w-full bg-[#1D1A17] overflow-hidden shrink-0">
            <img
              src={vendor.photo}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <button
              onClick={() => setSelectedVendorForDrawer(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Close Vendor Details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{vendor.flag}</span>
                <span className="text-xs uppercase tracking-widest text-[#D9A441] font-semibold">
                  {vendor.country} · {vendor.cuisine}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                {vendor.name}
              </h2>
            </div>
          </div>

          {/* Details Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[var(--border)]">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#1D1A17]/5 text-[#1D1A17] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B9502F]" />
                {vendor.location}
              </span>

              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#1D1A17]/5 text-[#1D1A17] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2F5D62]" />
                {vendor.days === 'Both' ? 'Sat & Sun' : `${vendor.days} Only`}
              </span>

              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#D9A441]/15 text-[#1D1A17]">
                Price: {vendor.priceBand}
              </span>
            </div>

            {/* Signature Dish */}
            <div className="p-4 rounded-[var(--r-md)] bg-[#FAF7F0] border border-[#E4DCCF]">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#B9502F] mb-1">
                <Utensils className="w-4 h-4" />
                <span>Featured Signature Dish</span>
              </div>
              <p className="font-display text-lg font-semibold text-[#1D1A17] leading-snug">
                {vendor.signatureDish}
              </p>
            </div>

            {/* Culinary Story */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2">
                About The Kitchen
              </h4>
              <p className="text-sm text-[#4A433B] leading-relaxed font-sans">
                {vendor.description}
              </p>
            </div>

            {/* Dietary Tags */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2">
                Dietary Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {vendor.dietary.map((tag) => (
                  <Badge key={tag} variant="olive">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="default">Locally Sourced Ingredients</Badge>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-[var(--border)] bg-[#F7F2E9] flex items-center justify-between gap-3">
            <Button
              size="md"
              variant="secondary"
              onClick={handleFavorite}
              leftIcon={<Heart className="w-4 h-4 text-[#B9502F]" />}
              className="flex-1"
            >
              Add to Taste List
            </Button>

            <Button
              size="md"
              variant="outline"
              onClick={() => setSelectedVendorForDrawer(null)}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
