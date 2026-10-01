export type DietaryTag = 'Vegan' | 'Vegetarian' | 'Halal' | 'Gluten-Free';
export type DayOption = 'Sat' | 'Sun' | 'Both';
export type PriceBand = '$' | '$$' | '$$$';

export interface Vendor {
  id: string;
  name: string;
  country: string;
  flag: string;
  cuisine: string;
  signatureDish: string;
  dietary: DietaryTag[];
  days: DayOption;
  priceBand: PriceBand;
  photo: string;
  description: string;
  location: string;
  isFeatured?: boolean;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  period: 'Day' | 'Weekend';
  badge?: string;
  description: string;
  perks: string[];
  isVip?: boolean;
  status: 'available' | 'almost-gone' | 'waitlist';
}

export interface TicketAddon {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Tasting' | 'Merch' | 'Parking' | 'Masterclass';
}

export interface ScheduleAct {
  id: string;
  name: string;
  stage: 'Main Stage' | 'Lakeside Stage' | 'Global Pavilion';
  day: 'Sat' | 'Sun';
  time: string;
  genre: string;
  description: string;
  isHeadliner?: boolean;
  photo: string;
}

export interface FestivalActivity {
  id: string;
  name: string;
  duration: string;
  isAddon: boolean;
  price?: number;
  capacity: string;
  description: string;
  schedule: string;
}

export interface Hotel {
  id: string;
  name: string;
  distance: string;
  distanceMiles: number;
  priceBand: PriceBand;
  rating: number;
  image: string;
  address: string;
  perks: string;
  coords: { x: number; y: number }; // Percentage for the stylized map (0-100)
}

export interface FaqItem {
  id: string;
  category: 'Tickets & Entry' | 'Food & Dietary' | 'Travel & Venue' | 'Vendors & Partners';
  question: string;
  answer: string;
}

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  marketingOptIn: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  tier: TicketTier;
  selectedDate: 'Saturday, June 12' | 'Sunday, June 13' | 'Weekend Pass (June 12–13)';
  quantity: number;
  addons: { addon: TicketAddon; quantity: number }[];
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  createdAt: string;
  qrPayload: string;
  status: 'confirmed' | 'pending';
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  name: 'page_view' | 'view_item' | 'add_to_cart' | 'begin_checkout' | 'add_shipping_info' | 'add_payment_info' | 'purchase' | 'apply_filter' | 'search_faq' | 'vendor_application_submit';
  platform: 'GA4' | 'Meta Pixel' | 'Both';
  parameters: Record<string, unknown>;
}
