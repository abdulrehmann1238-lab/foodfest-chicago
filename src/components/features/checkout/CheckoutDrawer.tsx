import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../../../store/checkoutStore';
import { TICKET_TIERS, TICKET_ADDONS } from '../../../data/tickets';
import { calculateOrderTotals } from '../../../lib/pricing';
import { formatCurrency } from '../../../lib/format';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const CheckoutDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isOpen,
    step,
    selectedTier,
    selectedDate,
    quantity,
    addons,
    customer,
    cardNumber,
    cardExpiry,
    cardCvc,
    isProcessing,
    errorMessage,
    closeCheckout,
    setStep,
    setSelectedTier,
    setSelectedDate,
    setQuantity,
    updateAddonQuantity,
    updateCustomer,
    setCardDetails,
    processPayment,
  } = useCheckoutStore();

  if (!isOpen) return null;

  const totals = calculateOrderTotals(
    selectedTier.price,
    quantity,
    addons.map((a) => ({ price: a.addon.price, quantity: a.quantity }))
  );

  const handleNextStep = () => {
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleCompletePay = async () => {
    const success = await processPayment();
    if (success) {
      navigate('/confirmation');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[var(--z-drawer)] bg-black/60 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full sm:w-[500px] h-full bg-[var(--surface-elevated)] flex flex-col shadow-2xl overflow-hidden border-l border-[var(--border)]"
          role="dialog"
          aria-modal="true"
          aria-label="Festival Checkout"
        >
          {/* Top Faux Browser / Branded Subdomain Bar */}
          <div className="px-5 py-3 bg-[#1D1A17] text-[#F7F2E9] border-b border-[#4A433B]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2C2723] border border-[#4A433B] text-xs font-mono text-[#E4DCCF]">
                <Lock className="w-3 h-3 text-[#D9A441]" />
                <span className="text-[#D9A441]">tickets.foodfestchicago.com</span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#80766A] hidden sm:inline">
                Branded Subdomain
              </span>
            </div>

            <button
              onClick={closeCheckout}
              className="p-1 rounded-full text-[#80766A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Header */}
          <div className="px-6 py-4 bg-[#F7F2E9] border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="p-1 -ml-1 text-[#4A433B] hover:text-[#1D1A17] transition-colors cursor-pointer mr-1"
                  aria-label="Go to previous step"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B9502F]">
                  Step {step} of 4
                </span>
                <h3 className="font-display text-lg font-semibold text-[#1D1A17] leading-tight">
                  {step === 1 && 'Choose Ticket & Date'}
                  {step === 2 && 'Enhance Your Pass'}
                  {step === 3 && 'Guest & Delivery Info'}
                  {step === 4 && 'Review & Payment'}
                </h3>
              </div>
            </div>

            {/* Step progress dots */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <span
                  key={s}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    s === step
                      ? 'w-6 bg-[#B9502F]'
                      : s < step
                      ? 'w-2 bg-[#2F5D62]'
                      : 'w-2 bg-[#E4DCCF]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Choose Tier & Date */}
          {step === 1 && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6">
              {/* Date Selection */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2 block">
                  Select Attendance Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Saturday, June 12',
                    'Sunday, June 13',
                    'Weekend Pass (June 12–13)',
                  ].map((dateOption) => (
                    <button
                      key={dateOption}
                      type="button"
                      onClick={() => {
                        setSelectedDate(dateOption as any);
                        if (dateOption.includes('Weekend') && !selectedTier.period.includes('Weekend')) {
                          setSelectedTier(TICKET_TIERS[2]); // Weekend GA
                        }
                      }}
                      className={`p-2.5 text-center rounded-[var(--r-sm)] border text-xs font-semibold transition-all cursor-pointer ${
                        selectedDate === dateOption
                          ? 'border-[#B9502F] bg-[#B9502F]/10 text-[#B9502F] ring-1 ring-[#B9502F]'
                          : 'border-[#E4DCCF] bg-white text-[#4A433B] hover:border-[#1D1A17]'
                      }`}
                    >
                      {dateOption.replace(' (June 12–13)', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier Selection */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2 block">
                  Choose Ticket Tier
                </label>
                <div className="flex flex-col gap-3">
                  {TICKET_TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-4 rounded-[var(--r-md)] border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#B9502F] bg-[#B9502F]/5 ring-2 ring-[#B9502F]/30'
                            : 'border-[#E4DCCF] bg-white hover:border-[#80766A]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#1D1A17]">{tier.name}</h4>
                              {tier.badge && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#D9A441]/20 text-[#1D1A17]">
                                  {tier.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#80766A] mt-1 leading-relaxed">
                              {tier.description}
                            </p>
                          </div>
                          <span className="font-display text-lg font-bold text-[#1D1A17] shrink-0">
                            {formatCurrency(tier.price)}
                          </span>
                        </div>

                        {isSelected && (
                          <ul className="mt-3 pt-3 border-t border-[#B9502F]/15 flex flex-col gap-1.5">
                            {tier.perks.slice(0, 3).map((perk, i) => (
                              <li key={i} className="text-xs text-[#4A433B] flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58] shrink-0" />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="p-4 rounded-[var(--r-md)] bg-[#F7F2E9] border border-[#E4DCCF] flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#1D1A17]">
                    Number of Passes
                  </h4>
                  <p className="text-xs text-[#80766A]">Limit 10 per transaction</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full border border-[#1D1A17] bg-white flex items-center justify-center font-bold text-base disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-display text-lg font-bold w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className="w-8 h-8 rounded-full border border-[#1D1A17] bg-white flex items-center justify-center font-bold text-base disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Add-ons */}
          {step === 2 && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
              <div className="bg-[#2F5D62]/10 p-3.5 rounded-[var(--r-md)] border border-[#2F5D62]/20 text-xs text-[#2F5D62] flex items-center gap-2">
                <Ticket className="w-4 h-4 shrink-0" />
                <span>Save up to 25% by bundling tasting tokens and parking ahead of time.</span>
              </div>

              <div className="flex flex-col gap-3">
                {TICKET_ADDONS.map((addon) => {
                  const selectedItem = addons.find((a) => a.addon.id === addon.id);
                  const count = selectedItem ? selectedItem.quantity : 0;

                  return (
                    <div
                      key={addon.id}
                      className="p-4 rounded-[var(--r-md)] border border-[#E4DCCF] bg-white flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#1D1A17]">{addon.name}</h4>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#1D1A17]/5 text-[#80766A]">
                            {addon.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#80766A] mt-1 leading-relaxed">{addon.description}</p>
                        <p className="text-sm font-semibold text-[#B9502F] mt-2">
                          {formatCurrency(addon.price)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-center shrink-0">
                        {count > 0 ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateAddonQuantity(addon, -1)}
                              className="w-7 h-7 rounded-full border border-[#1D1A17] flex items-center justify-center font-bold text-sm cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{count}</span>
                            <button
                              type="button"
                              onClick={() => updateAddonQuantity(addon, 1)}
                              className="w-7 h-7 rounded-full border border-[#1D1A17] flex items-center justify-center font-bold text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateAddonQuantity(addon, 1)}
                            className="h-8 text-xs px-3"
                          >
                            + Add
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Guest Details */}
          {step === 3 && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name"
                  value={customer.firstName}
                  onChange={(e) => updateCustomer({ firstName: e.target.value })}
                  required
                />
                <Input
                  label="Last Name"
                  value={customer.lastName}
                  onChange={(e) => updateCustomer({ lastName: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Email Address (Tickets Sent Here)"
                type="email"
                value={customer.email}
                onChange={(e) => updateCustomer({ email: e.target.value })}
                required
                hint="Your QR code and wristband instructions arrive here"
              />

              <Input
                label="Mobile Phone (Optional SMS alerts)"
                type="tel"
                value={customer.phone}
                onChange={(e) => updateCustomer({ phone: e.target.value })}
                hint="For day-of festival gate and weather updates"
              />

              <label className="flex items-start gap-2.5 p-3 rounded-[var(--r-sm)] bg-[#F7F2E9] border border-[#E4DCCF] cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={customer.marketingOptIn}
                  onChange={(e) => updateCustomer({ marketingOptIn: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-[#B9502F] focus:ring-[#2F5D62]"
                />
                <span className="text-xs text-[#4A433B] leading-relaxed">
                  Send me secret chef pop-up schedules and culinary guides before doors open.
                </span>
              </label>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-5">
              {errorMessage && (
                <div className="p-3.5 rounded-[var(--r-sm)] bg-red-50 border border-red-300 text-red-800 text-xs flex items-start gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Payment Unsuccessful:</span>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Quick Pay Buttons */}
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2 block">
                  Express Checkout
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleCompletePay}
                    disabled={isProcessing}
                    className="h-11 rounded-[var(--r-md)] bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <span>Pay with Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCompletePay}
                    disabled={isProcessing}
                    className="h-11 rounded-[var(--r-md)] bg-[#F7F2E9] border border-[#1D1A17] text-[#1D1A17] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <span>Google Pay</span>
                  </button>
                </div>
              </div>

              <div className="relative flex items-center my-1">
                <div className="flex-grow border-t border-[#E4DCCF]"></div>
                <span className="flex-shrink mx-3 text-xs uppercase font-bold text-[#80766A]">or credit card</span>
                <div className="flex-grow border-t border-[#E4DCCF]"></div>
              </div>

              {/* Card Inputs */}
              <div className="flex flex-col gap-3">
                <Input
                  label="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardDetails({ cardNumber: e.target.value })}
                  placeholder="4242 4242 4242 4242"
                  hint="Test: Use 4000...0002 for simulated decline"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expiry Date"
                    value={cardExpiry}
                    onChange={(e) => setCardDetails({ cardExpiry: e.target.value })}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVC / CVV"
                    value={cardCvc}
                    onChange={(e) => setCardDetails({ cardCvc: e.target.value })}
                    placeholder="123"
                  />
                </div>
              </div>

              {/* Order breakdown summary */}
              <div className="p-4 rounded-[var(--r-md)] bg-[#FAF7F0] border border-[#E4DCCF] flex flex-col gap-2 text-xs">
                <div className="flex justify-between text-[#4A433B]">
                  <span>
                    {selectedTier.name} × {quantity}
                  </span>
                  <span>{formatCurrency(totals.tierSubtotal)}</span>
                </div>

                {totals.addonsSubtotal > 0 && (
                  <div className="flex justify-between text-[#4A433B]">
                    <span>Selected Add-ons</span>
                    <span>{formatCurrency(totals.addonsSubtotal)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#80766A]">
                  <span>Service Fee (8%)</span>
                  <span>{formatCurrency(totals.serviceFee)}</span>
                </div>

                <div className="flex justify-between text-[#80766A]">
                  <span>Chicago Composite Sales Tax (10.25%)</span>
                  <span>{formatCurrency(totals.tax)}</span>
                </div>

                <div className="pt-2 border-t border-[#E4DCCF] flex justify-between font-bold text-sm text-[#1D1A17]">
                  <span>Total Amount</span>
                  <span className="font-display text-base text-[#B9502F]">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#80766A]">
                <ShieldCheck className="w-4 h-4 text-[#3F7D58] shrink-0" />
                <span>Demo environment. No actual bank charge will occur.</span>
              </div>
            </div>
          )}

          {/* Sticky Drawer Footer */}
          <div className="p-5 border-t border-[var(--border)] bg-[#F7F2E9] flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#80766A]">Order Total</span>
              <div className="font-display text-xl font-bold text-[#1D1A17] leading-none">
                {formatCurrency(totals.total)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {step < 4 ? (
                <Button
                  size="md"
                  variant="primary"
                  onClick={handleNextStep}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="px-6"
                >
                  {step === 2 && addons.length === 0 ? 'Continue' : 'Next Step'}
                </Button>
              ) : (
                <Button
                  size="md"
                  variant="primary"
                  onClick={handleCompletePay}
                  isLoading={isProcessing}
                  className="px-7"
                >
                  Pay {formatCurrency(totals.total)}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
