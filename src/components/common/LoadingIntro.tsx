import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Module-level in-memory flag so loader runs only once per app session (no storage APIs per PRD)
let hasLoadedSession = false;

interface LoadingIntroProps {
  onComplete?: () => void;
}

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(!hasLoadedSession);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (hasLoadedSession) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      hasLoadedSession = true;
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1250);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        exit={{
          y: isReduced ? 0 : '-100%',
          opacity: isReduced ? 0 : 1,
          transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
        }}
        className="fixed inset-0 z-[var(--z-loader)] bg-[#1D1A17] text-[#F7F2E9] flex flex-col items-center justify-center p-6 select-none"
      >
        <div className="flex flex-col items-center text-center max-w-sm">
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-[0.1em] text-white">
              FOOD FEST
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441] inline-block mb-1" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-[#80766A] mt-2"
          >
            CHICAGO · 2027
          </motion.p>

          {/* Hairline Progress Bar */}
          <div className="w-48 h-[1.5px] bg-[#4A433B]/40 mt-7 overflow-hidden rounded-full relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: 'easeInOut', delay: 0.2 }}
              style={{ originX: 0 }}
              className="h-full w-full bg-[#D9A441]"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
