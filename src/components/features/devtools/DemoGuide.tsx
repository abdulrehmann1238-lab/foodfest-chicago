import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useUiStore } from '../../../store/uiStore';
import { useCheckoutStore } from '../../../store/checkoutStore';

export const DemoGuide: React.FC = () => {
  const { isDemoGuideVisible, dismissDemoGuide, toggleUnderTheHood, toggleEditorMode } = useUiStore();
  const { openCheckout, isOpen: isCheckoutOpen } = useCheckoutStore();

  if (!isDemoGuideVisible || isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.95 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-sticky)] w-[92vw] max-w-lg bg-[#1D1A17] text-[#F7F2E9] border border-[#D9A441]/50 rounded-[var(--r-md)] shadow-2xl p-4 hidden md:flex items-center justify-between gap-4 backdrop-blur-md"
      >
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-[#D9A441]/20 text-[#D9A441] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#D9A441]">Founder Demo Walkthrough</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-white/10 rounded text-[#E4DCCF]/80">Interactive Proof</span>
            </div>
            <p className="text-xs text-[#E4DCCF]/90 mt-1 leading-normal">
              Quick test paths: <button onClick={() => openCheckout()} className="text-white underline font-semibold hover:text-[#D9A441] cursor-pointer">Buy a Ticket</button> → <button onClick={toggleUnderTheHood} className="text-white underline font-semibold hover:text-[#D9A441] cursor-pointer">Open Under the Hood</button> → <button onClick={toggleEditorMode} className="text-white underline font-semibold hover:text-[#D9A441] cursor-pointer">Toggle Edit Mode</button>
            </p>
          </div>
        </div>

        <button
          onClick={dismissDemoGuide}
          className="text-[#80766A] hover:text-white transition-colors p-1.5 rounded cursor-pointer shrink-0"
          aria-label="Dismiss guide"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
