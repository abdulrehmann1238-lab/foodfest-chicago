export interface OrderBreakdown {
  tierSubtotal: number;
  addonsSubtotal: number;
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
}

export function calculateOrderTotals(
  tierPrice: number,
  quantity: number,
  addons: { price: number; quantity: number }[] = []
): OrderBreakdown {
  const tierSubtotal = tierPrice * quantity;
  const addonsSubtotal = addons.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = tierSubtotal + addonsSubtotal;

  // 8% service fee
  const serviceFee = Math.round(subtotal * 0.08 * 100) / 100;
  // 10.25% Chicago composite sales tax
  const tax = Math.round(subtotal * 0.1025 * 100) / 100;
  const total = Math.round((subtotal + serviceFee + tax) * 100) / 100;

  return {
    tierSubtotal,
    addonsSubtotal,
    subtotal,
    serviceFee,
    tax,
    total,
  };
}
