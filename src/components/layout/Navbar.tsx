import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Ticket, Menu, X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';
import { useCheckoutStore } from '../../store/checkoutStore';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, isMobileMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const openCheckout = useCheckoutStore((state) => state.openCheckout);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Festival', path: '/festival' },
    { label: 'Tickets', path: '/tickets' },
    { label: 'Partner With Us', path: '/partner' },
    { label: 'Plan Your Visit', path: '/visit' },
    { label: 'About & Contact', path: '/about' },
  ];

  // When on top of Home hero, use light text
  const isLightNav = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[var(--z-nav)] transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[var(--sh-1)] py-3.5'
          : isHome
          ? 'bg-transparent py-5'
          : 'bg-[var(--bg)] border-b border-[var(--border)] py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Logo isLight={isLightNav} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-tight relative py-1 transition-colors duration-150 group ${
                  isLightNav
                    ? isActive
                      ? 'text-white font-semibold'
                      : 'text-white/85 hover:text-white'
                    : isActive
                    ? 'text-[#1D1A17] font-semibold'
                    : 'text-[#4A433B] hover:text-[#1D1A17]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ${
                      isActive
                        ? isLightNav
                          ? 'w-full bg-[#D9A441]'
                          : 'w-full bg-[#B9502F]'
                        : 'w-0 group-hover:w-full ' + (isLightNav ? 'bg-white/50' : 'bg-[#1D1A17]/30')
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            size="sm"
            variant="primary"
            onClick={() => openCheckout()}
            leftIcon={<Ticket className="w-4 h-4" />}
            className="shadow-sm"
          >
            Get Tickets
          </Button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Button
            size="sm"
            variant="primary"
            onClick={() => openCheckout()}
            className="h-8.5 px-3 text-xs"
          >
            Tickets
          </Button>

          <button
            onClick={onOpenMobileMenu}
            className={`p-2 rounded-[var(--r-sm)] transition-colors cursor-pointer ${
              isLightNav
                ? 'text-white hover:bg-white/10'
                : 'text-[#1D1A17] hover:bg-[#1D1A17]/10'
            }`}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
