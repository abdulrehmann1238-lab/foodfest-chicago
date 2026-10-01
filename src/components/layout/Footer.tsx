import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Share2, ArrowUp, Mail, Check, Copy } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';
import { useCheckoutStore } from '../../store/checkoutStore';
import { useUiStore } from '../../store/uiStore';
import { useAnalyticsStore } from '../../store/analyticsStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const openCheckout = useCheckoutStore((state) => state.openCheckout);
  const { setShareModalOpen, addToast } = useUiStore();
  const logEvent = useAnalyticsStore((state) => state.logEvent);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ title: 'Invalid Email', message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSubscribed(true);

    logEvent('page_view', { action: 'newsletter_signup', email });
    addToast({
      title: "You're on the list!",
      message: 'Early-bird access and secret vendor releases will land in your inbox.',
      type: 'success',
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@foodfestchicago.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    addToast({ title: 'Email Copied', message: 'hello@foodfestchicago.com copied to clipboard', type: 'info' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1D1A17] text-[#F7F2E9] border-t border-[#4A433B]/40">
      {/* Pre-footer CTA Band */}
      <div className="border-b border-[#4A433B]/40 py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9502F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2F5D62]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441] mb-3">
            JUNE 12–13, 2027 · LAKEFRONT GROUNDS, CHICAGO
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6">
            See you on the lake.
          </h2>
          <p className="text-base sm:text-lg text-[#E4DCCF]/80 max-w-xl mb-9 leading-relaxed font-sans">
            60+ world chefs, 30 countries, three music stages, and two days of unforgettable eating along Lake Michigan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={() => openCheckout()}
              leftIcon={<Ticket className="w-5 h-5" />}
              className="text-base font-semibold px-8"
            >
              Get Tickets · From $38
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setShareModalOpen(true)}
              leftIcon={<Share2 className="w-5 h-5" />}
              className="text-white border-[#E4DCCF]/40 hover:border-white hover:text-white"
            >
              Share Festival
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Col 1: Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo isLight showSubtitle />
            <p className="text-sm text-[#E4DCCF]/70 max-w-sm leading-relaxed mt-2">
              Every kitchen in the world. One weekend on the lake. Chicago’s premier international food festival bringing culinary traditions and global street cultures together.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E4DCCF]/60 mt-2">
              <span>Direct inquiries:</span>
              <button
                onClick={handleCopyEmail}
                className="text-[#D9A441] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>hello@foodfestchicago.com</span>
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Col 2: The Festival */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#D9A441]">The Festival</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#E4DCCF]/80">
              <li>
                <Link to="/festival" className="hover:text-white transition-colors">The Experience</Link>
              </li>
              <li>
                <Link to="/festival#vendors" className="hover:text-white transition-colors">60+ Food Vendors</Link>
              </li>
              <li>
                <Link to="/festival#entertainment" className="hover:text-white transition-colors">Music & Live Acts</Link>
              </li>
              <li>
                <Link to="/festival#activities" className="hover:text-white transition-colors">Workshops & Contests</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Plan & Tickets */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#D9A441]">Tickets & Plan</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#E4DCCF]/80">
              <li>
                <Link to="/tickets" className="hover:text-white transition-colors">Ticket Tiers & Pricing</Link>
              </li>
              <li>
                <Link to="/tickets#vip" className="hover:text-white transition-colors">VIP Experience</Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-white transition-colors">Travel, Transit & Hotels</Link>
              </li>
              <li>
                <Link to="/visit#faqs" className="hover:text-white transition-colors">Festival FAQ</Link>
              </li>
              <li>
                <Link to="/partner" className="hover:text-white transition-colors">Vendor & Sponsor Intake</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#D9A441]">Stay in the Loop</h4>
            <p className="text-xs text-[#E4DCCF]/70 leading-relaxed">
              Sign up for secret menu announcements, ticket drops, and festival updates.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-[var(--r-sm)] text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You’re subscribed! Watch your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#80766A] absolute left-3 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full h-10 pl-9 pr-3 text-xs bg-[#2C2723] border border-[#4A433B] rounded-[var(--r-sm)] text-white placeholder:text-[#80766A] focus:outline-none focus:ring-2 focus:ring-[#2F5D62]"
                  />
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full text-xs h-9"
                >
                  Join Guest List
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#4A433B]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E4DCCF]/60">
          <p>© 2027 Food Fest Chicago. All rights reserved. Built as a prototype for the festival founder.</p>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/about#contact" className="hover:text-white transition-colors">Contact</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
