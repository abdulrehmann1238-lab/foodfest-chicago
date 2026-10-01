import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, ArrowRight } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';
import { useCheckoutStore } from '../../store/checkoutStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const openCheckout = useCheckoutStore((state) => state.openCheckout);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const navLinks = [
    { label: 'The Festival', path: '/festival', desc: 'Experience, 60+ vendors, music & activities' },
    { label: 'Tickets', path: '/tickets', desc: 'Single-day, weekend passes & VIP packages' },
    { label: 'Partner With Us', path: '/partner', desc: 'Sponsorship tiers & vendor application' },
    { label: 'Plan Your Visit', path: '/visit', desc: 'Interactive map, hotels & full festival FAQ' },
    { label: 'About & Contact', path: '/about', desc: 'Our mission, team & media inquiries' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[var(--z-drawer)] bg-[#F7F2E9] flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
            <Logo />
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#1D1A17]/5 text-[#1D1A17] hover:bg-[#1D1A17]/10 transition-colors cursor-pointer"
              aria-label="Close Navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-5 my-auto py-8">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between pb-3 border-b border-[var(--border)]/60 ${
                    isActive ? 'text-[#B9502F]' : 'text-[#1D1A17]'
                  }`
                }
              >
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-[#B9502F] transition-colors">
                    {link.label}
                  </span>
                  <p className="text-xs text-[#80766A] mt-0.5">{link.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#80766A] group-hover:text-[#B9502F] group-hover:translate-x-1 transition-all" />
              </NavLink>
            ))}
          </nav>

          {/* Bottom Bar CTA */}
          <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-[#80766A]">
              <span>June 12–13, 2027</span>
              <span>Lakefront Grounds, Chicago</span>
            </div>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                onClose();
                openCheckout();
              }}
              leftIcon={<Ticket className="w-5 h-5" />}
              className="w-full text-base font-semibold"
            >
              Get Tickets · From $38
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
