import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCheckoutStore } from '../../store/checkoutStore';

export const StickyTicketBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckout, isOpen: isCheckoutOpen } = useCheckoutStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 60% of viewport height
      const threshold = window.innerHeight * 0.6;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isCheckoutOpen) return null;

  return (
    <div
      role="region"
      aria-label="Quick Checkout"
      className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[#1D1A17] text-[#F7F2E9] border-t border-[#4A433B]/50 px-4 py-3 shadow-2xl flex md:hidden items-center justify-between transition-transform duration-300 pb-[calc(12px+env(safe-area-inset-bottom))]"
    >
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold">Tickets From</span>
          <span className="font-display text-xl font-bold text-white leading-none">$38</span>
        </div>
        <p className="text-[11px] text-[#E4DCCF]/70">June 12–13 · Chicago Lakefront</p>
      </div>

      <Button
        size="md"
        variant="primary"
        onClick={() => openCheckout()}
        leftIcon={<Ticket className="w-4 h-4" />}
        className="h-10 text-xs px-4"
      >
        Get Tickets
      </Button>
    </div>
  );
};
