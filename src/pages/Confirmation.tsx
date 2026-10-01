import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  Ticket,
  Smartphone,
  MapPin,
} from 'lucide-react';
import { useCheckoutStore } from '../store/checkoutStore';
import { useUiStore } from '../store/uiStore';
import { useAnalyticsStore } from '../store/analyticsStore';
import { formatCurrency } from '../lib/format';
import { QrTicket } from '../components/features/checkout/QrTicket';
import { Button } from '../components/ui/Button';

export const Confirmation: React.FC = () => {
  const { completedOrder } = useCheckoutStore();
  const { addToast, setShareModalOpen } = useUiStore();
  const logEvent = useAnalyticsStore((state) => state.logEvent);

  // 900ms Interstitial state per PRD §13.10
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsRedirecting(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isRedirecting && completedOrder) {
      logEvent('purchase', {
        transaction_id: completedOrder.orderNumber,
        value: completedOrder.total,
        currency: 'USD',
        guest_name: `${completedOrder.customer.firstName} ${completedOrder.customer.lastName}`,
        tier: completedOrder.tier.name,
      });
    }
  }, [isRedirecting, completedOrder, logEvent]);

  const handleWalletAdd = (walletType: 'Apple' | 'Google') => {
    addToast({
      title: `Added to ${walletType} Wallet`,
      message: `Your Food Fest Chicago ticket (${completedOrder?.orderNumber}) is now synced.`,
      type: 'success',
    });
  };

  const handleDownloadPdf = () => {
    addToast({
      title: 'Ticket PDF Downloaded',
      message: `Festival receipt and high-resolution barcode saved (${completedOrder?.orderNumber}.pdf).`,
      type: 'success',
    });
  };

  const handleAddToCalendar = () => {
    addToast({
      title: 'Calendar Event Saved',
      message: 'Food Fest Chicago 2027 added to your calendar (June 12–13, 2027).',
      type: 'success',
    });
  };

  // 1. Interstitial redirect screen
  if (isRedirecting) {
    return (
      <div className="fixed inset-0 z-[var(--z-loader)] bg-[#1D1A17] text-[#F7F2E9] flex flex-col items-center justify-center p-6 select-none">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="font-display text-2xl font-bold tracking-wider text-white mb-2">
            FOOD FEST CHICAGO
          </div>
          <p className="text-xs uppercase tracking-widest text-[#D9A441] mb-6">
            Returning you to Food Fest…
          </p>
          <div className="w-48 h-[2px] bg-[#4A433B]/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="h-full w-full bg-[#B9502F]"
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty state if accessed without order
  if (!completedOrder) {
    return (
      <main className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6 text-center pt-28">
        <Ticket className="w-12 h-12 text-[#80766A] mb-4" />
        <h2 className="font-display text-3xl font-bold text-[#1D1A17] mb-2">
          No Order Found
        </h2>
        <p className="text-sm text-[#80766A] max-w-md mb-8">
          It looks like you haven't completed a ticket purchase yet. Browse our ticket options for Chicago 2027.
        </p>
        <Link to="/tickets">
          <Button size="md" variant="primary">
            Explore Ticket Passes
          </Button>
        </Link>
      </main>
    );
  }

  const order = completedOrder;

  return (
    <main className="w-full bg-[var(--bg)] min-h-screen pt-24 pb-20">
      <div className="container-custom max-w-3xl">
        {/* Celebration Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-[#3F7D58] mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B9502F] block mb-1">
            ORDER CONFIRMED & ISSUED
          </span>

          <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#1D1A17] mb-3">
            You’re in, {order.customer.firstName}.
          </h1>

          <p className="text-sm text-[#80766A] max-w-md mx-auto leading-relaxed">
            Your passes and receipt have been dispatched to <strong>{order.customer.email}</strong>.
          </p>
        </div>

        {/* 3D Flippable QR Ticket Card */}
        <QrTicket order={order} />

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-6">
          <Button
            size="sm"
            variant="dark"
            onClick={() => handleWalletAdd('Apple')}
            leftIcon={<Smartphone className="w-4 h-4" />}
          >
            Add to Apple Wallet
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleWalletAdd('Google')}
            leftIcon={<Smartphone className="w-4 h-4" />}
          >
            Google Wallet
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleAddToCalendar}
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            Add to Calendar
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadPdf}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Save PDF
          </Button>

          <Button
            size="sm"
            variant="lake"
            onClick={() => setShareModalOpen(true)}
            leftIcon={<Share2 className="w-4 h-4" />}
          >
            Share "I'm Going"
          </Button>
        </div>

        {/* Order Breakdown Card */}
        <div className="bg-white rounded-[var(--r-md)] border border-[#E4DCCF] p-6 shadow-xs my-8 text-xs">
          <div className="flex items-center justify-between border-b border-[#E4DCCF] pb-4 mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#80766A] tracking-wider block">
                Reference Code
              </span>
              <span className="font-mono text-sm font-bold text-[#1D1A17]">{order.orderNumber}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#80766A] tracking-wider block">
                Payment Status
              </span>
              <span className="font-semibold text-[#3F7D58]">Paid in Full · Digital Delivery</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-[#4A433B]">
            <div className="flex justify-between">
              <span>{order.tier.name} (Qty: {order.quantity})</span>
              <span className="font-semibold text-[#1D1A17]">{formatCurrency(order.tier.price * order.quantity)}</span>
            </div>

            {order.addons.map((a, i) => (
              <div key={i} className="flex justify-between">
                <span>{a.addon.name} (Qty: {a.quantity})</span>
                <span className="font-semibold text-[#1D1A17]">{formatCurrency(a.addon.price * a.quantity)}</span>
              </div>
            ))}

            <div className="flex justify-between text-[#80766A]">
              <span>Service Fee (8%)</span>
              <span>{formatCurrency(order.serviceFee)}</span>
            </div>

            <div className="flex justify-between text-[#80766A]">
              <span>Chicago Composite Sales Tax (10.25%)</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>

            <div className="pt-3 border-t border-[#E4DCCF] flex justify-between font-bold text-sm text-[#1D1A17]">
              <span>Total Paid</span>
              <span className="font-display text-lg text-[#B9502F]">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Cross-Sell & Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Link
            to="/festival#activities"
            className="p-5 rounded-[var(--r-md)] bg-white border border-[#E4DCCF] hover:border-[#B9502F] transition-all group flex items-start justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#B9502F] block mb-1">
                Enhance Experience
              </span>
              <h4 className="font-display text-base font-bold text-[#1D1A17] group-hover:text-[#B9502F]">
                Book a Chef Masterclass →
              </h4>
              <p className="text-xs text-[#80766A] mt-1">Limited hands-on spots in knife skills and dumpling folding.</p>
            </div>
          </Link>

          <Link
            to="/visit"
            className="p-5 rounded-[var(--r-md)] bg-white border border-[#E4DCCF] hover:border-[#2F5D62] transition-all group flex items-start justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2F5D62] block mb-1">
                Logistics
              </span>
              <h4 className="font-display text-base font-bold text-[#1D1A17] group-hover:text-[#2F5D62]">
                Plan Transit & Hotels →
              </h4>
              <p className="text-xs text-[#80766A] mt-1">View partner hotel rates and CTA rail directions.</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};
