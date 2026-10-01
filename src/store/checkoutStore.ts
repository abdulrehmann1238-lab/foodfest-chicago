import { create } from 'zustand';
import { TicketTier, TicketAddon, Order, OrderCustomer } from '../types';
import { TICKET_TIERS } from '../data/tickets';
import { calculateOrderTotals } from '../lib/pricing';
import { generateOrderNumber } from '../lib/format';
import { useAnalyticsStore } from './analyticsStore';

interface CheckoutState {
  isOpen: boolean;
  step: 1 | 2 | 3 | 4;
  selectedTier: TicketTier;
  selectedDate: 'Saturday, June 12' | 'Sunday, June 13' | 'Weekend Pass (June 12–13)';
  quantity: number;
  addons: { addon: TicketAddon; quantity: number }[];
  customer: OrderCustomer;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  isProcessing: boolean;
  errorMessage: string | null;
  completedOrder: Order | null;

  openCheckout: (tierId?: string, defaultStep?: 1 | 2 | 3 | 4) => void;
  closeCheckout: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  setSelectedTier: (tier: TicketTier) => void;
  setSelectedDate: (date: 'Saturday, June 12' | 'Sunday, June 13' | 'Weekend Pass (June 12–13)') => void;
  setQuantity: (quantity: number) => void;
  updateAddonQuantity: (addon: TicketAddon, delta: number) => void;
  updateCustomer: (customer: Partial<OrderCustomer>) => void;
  setCardDetails: (details: { cardNumber?: string; cardExpiry?: string; cardCvc?: string }) => void;
  processPayment: () => Promise<boolean>;
  resetCheckout: () => void;
}

const defaultCustomer: OrderCustomer = {
  firstName: 'Maya',
  lastName: 'Lin',
  email: 'maya.lin@example.com',
  phone: '312-555-0194',
  marketingOptIn: true,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  isOpen: false,
  step: 1,
  selectedTier: TICKET_TIERS[0],
  selectedDate: 'Saturday, June 12',
  quantity: 2,
  addons: [],
  customer: { ...defaultCustomer },
  cardNumber: '4242 4242 4242 4242',
  cardExpiry: '08/28',
  cardCvc: '888',
  isProcessing: false,
  errorMessage: null,
  completedOrder: null,

  openCheckout: (tierId, defaultStep = 1) => {
    let tier = get().selectedTier;
    if (tierId) {
      const found = TICKET_TIERS.find((t) => t.id === tierId);
      if (found) {
        tier = found;
      }
    }

    // Set appropriate default date if weekend
    const date = tier.period === 'Weekend' ? 'Weekend Pass (June 12–13)' : 'Saturday, June 12';

    set({
      isOpen: true,
      step: defaultStep,
      selectedTier: tier,
      selectedDate: date,
      errorMessage: null,
    });

    useAnalyticsStore.getState().logEvent('begin_checkout', {
      tier_id: tier.id,
      tier_name: tier.name,
      price: tier.price,
      quantity: get().quantity,
      currency: 'USD',
    });
  },

  closeCheckout: () => set({ isOpen: false, errorMessage: null }),

  setStep: (step) => {
    set({ step, errorMessage: null });
    const { selectedTier, quantity, addons } = get();
    if (step === 2) {
      useAnalyticsStore.getState().logEvent('view_item', {
        item_id: selectedTier.id,
        item_name: selectedTier.name,
        price: selectedTier.price,
        quantity,
      });
    } else if (step === 3) {
      useAnalyticsStore.getState().logEvent('add_to_cart', {
        tier_id: selectedTier.id,
        addons_count: addons.length,
        quantity,
      });
    } else if (step === 4) {
      useAnalyticsStore.getState().logEvent('add_payment_info', {
        payment_type: 'Credit Card',
        currency: 'USD',
      });
    }
  },

  setSelectedTier: (tier) => {
    const isWeekend = tier.period === 'Weekend';
    set({
      selectedTier: tier,
      selectedDate: isWeekend ? 'Weekend Pass (June 12–13)' : 'Saturday, June 12',
    });
  },

  setSelectedDate: (selectedDate) => set({ selectedDate }),

  setQuantity: (quantity) => {
    if (quantity < 1 || quantity > 10) return;
    set({ quantity });
  },

  updateAddonQuantity: (addon, delta) => {
    const current = get().addons;
    const existingIndex = current.findIndex((item) => item.addon.id === addon.id);

    if (existingIndex > -1) {
      const newQty = current[existingIndex].quantity + delta;
      if (newQty <= 0) {
        set({ addons: current.filter((item) => item.addon.id !== addon.id) });
      } else {
        const updated = [...current];
        updated[existingIndex] = { addon, quantity: newQty };
        set({ addons: updated });
      }
    } else if (delta > 0) {
      set({ addons: [...current, { addon, quantity: delta }] });
    }
  },

  updateCustomer: (updates) => {
    set((state) => ({ customer: { ...state.customer, ...updates } }));
  },

  setCardDetails: (details) => {
    set((state) => ({
      cardNumber: details.cardNumber ?? state.cardNumber,
      cardExpiry: details.cardExpiry ?? state.cardExpiry,
      cardCvc: details.cardCvc ?? state.cardCvc,
    }));
  },

  processPayment: async () => {
    const { selectedTier, quantity, addons, customer, selectedDate, cardNumber } = get();

    set({ isProcessing: true, errorMessage: null });

    // Simulated latency ~900ms per PRD §11.1
    await new Promise((resolve) => setTimeout(resolve, 950));

    // Decline card simulation if 4000 0000 0000 0002 per PRD §11.1
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.endsWith('0002')) {
      set({
        isProcessing: false,
        errorMessage: 'Your card was declined. Please try another card (e.g. 4242 4242 4242 4242).',
      });
      return false;
    }

    const totals = calculateOrderTotals(
      selectedTier.price,
      quantity,
      addons.map((a) => ({ price: a.addon.price, quantity: a.quantity }))
    );

    const orderNumber = generateOrderNumber();
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customer,
      tier: selectedTier,
      selectedDate,
      quantity,
      addons,
      subtotal: totals.subtotal,
      serviceFee: totals.serviceFee,
      tax: totals.tax,
      total: totals.total,
      createdAt: new Date().toISOString(),
      qrPayload: `FFC-2027|ORDER:${orderNumber}|GUEST:${customer.firstName} ${customer.lastName}|TIER:${selectedTier.name}|QTY:${quantity}|GATE:LAKEFRONT-A`,
      status: 'confirmed',
    };

    set({
      isProcessing: false,
      completedOrder: newOrder,
      isOpen: false,
    });

    useAnalyticsStore.getState().logEvent('purchase', {
      transaction_id: orderNumber,
      value: totals.total,
      currency: 'USD',
      items: [
        {
          item_id: selectedTier.id,
          item_name: selectedTier.name,
          price: selectedTier.price,
          quantity,
        },
        ...addons.map((a) => ({
          item_id: a.addon.id,
          item_name: a.addon.name,
          price: a.addon.price,
          quantity: a.quantity,
        })),
      ],
    });

    return true;
  },

  resetCheckout: () => {
    set({
      step: 1,
      selectedTier: TICKET_TIERS[0],
      selectedDate: 'Saturday, June 12',
      quantity: 2,
      addons: [],
      customer: { ...defaultCustomer },
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '08/28',
      cardCvc: '888',
      isProcessing: false,
      errorMessage: null,
      completedOrder: null,
    });
  },
}));
