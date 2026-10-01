import { TicketTier, TicketAddon } from '../types';

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'early-bird-ga',
    name: 'Early-Bird General Admission',
    price: 38,
    period: 'Day',
    badge: 'Limited Quantity · Save $10',
    description: 'Full day access to 60+ global kitchens, all three live concert stages, and interactive tasting pavilions.',
    perks: [
      'Single-day entry (11:00 AM – 10:00 PM)',
      'Access to 60+ international food booths',
      'Free cashless RFID wristband for tap-to-pay',
      'All 3 live music stages & chef cooking stages',
      'Festival culinary passport guide map'
    ],
    isVip: false,
    status: 'available',
  },
  {
    id: 'ga-day',
    name: 'General Admission',
    price: 48,
    period: 'Day',
    description: 'Standard single-day festival ticket for Saturday or Sunday on Chicago’s lakefront.',
    perks: [
      'Single-day festival entry',
      'Access to 60+ international food booths',
      'Free cashless RFID wristband',
      'All 3 music stages & headliner shows',
      'Access to games, market stalls & culinary demos'
    ],
    isVip: false,
    status: 'available',
  },
  {
    id: 'weekend-pass',
    name: 'Full Weekend Pass',
    price: 79,
    period: 'Weekend',
    badge: 'Best Value · 2-Day Access',
    description: 'Eat your way through both Saturday & Sunday without missing a single headline act or secret menu drop.',
    perks: [
      'Full 2-day access (Saturday & Sunday)',
      'Save over 20% compared to buying single days',
      'Expedited general queue line on Sunday',
      'Free cashless RFID wristband',
      'Access to both Saturday & Sunday headliner sets'
    ],
    isVip: false,
    status: 'available',
  },
  {
    id: 'vip-day',
    name: 'VIP Experience Pass',
    price: 135,
    period: 'Day',
    badge: 'Almost Gone · 40 Left',
    description: 'Fast-track entry, elevated shaded lakefront lounge, private cocktail bar, and tasting tokens included.',
    perks: [
      'Dedicated express fast-track entrance gate',
      'Access to Lakeview VIP Lounge with prime shade',
      '6 complimentary tasting tokens ($18 value)',
      'Air-conditioned executive restroom suites',
      'Dedicated VIP craft cocktail bar & lounge seating',
      'Exclusive viewing riser for Main Stage headliners'
    ],
    isVip: true,
    status: 'almost-gone',
  },
  {
    id: 'vip-weekend',
    name: 'VIP Weekend All-Access',
    price: 240,
    period: 'Weekend',
    badge: 'Premium Experience',
    description: 'The ultimate culinary weekend. Everything in VIP for both days, plus chef talk access and welcome gift.',
    perks: [
      'Full VIP access for both Saturday and Sunday',
      '12 complimentary tasting tokens ($36 value)',
      'Exclusive intimate Chef Table Q&A panel access',
      'Welcome sparkling cocktail on arrival each day',
      'Limited-edition ceramic tasting bowl & canvas tote',
      'Dedicated concierge and priority seating reservations'
    ],
    isVip: true,
    status: 'available',
  },
];

export const TICKET_ADDONS: TicketAddon[] = [
  {
    id: 'token-pack-10',
    name: 'Tasting Token Pack (10 Tokens)',
    price: 30,
    description: 'Pre-loaded digital tokens on your wristband for swift, touchless small-plate sampling ($35 on-site value).',
    category: 'Tasting',
  },
  {
    id: 'chef-workshop',
    name: 'Master Chef Workshop & Intimate Tasting',
    price: 45,
    description: 'Hands-on 45-minute interactive masterclass with international guest chefs + paired wine tasting.',
    category: 'Masterclass',
  },
  {
    id: 'festival-tote',
    name: 'Official 2027 Heavyweight Canvas Tote',
    price: 18,
    description: 'Screen-printed organic cotton festival tote with insulated pocket for take-home delicacies.',
    category: 'Merch',
  },
  {
    id: 'lakefront-parking',
    name: 'Reserved Lakefront Parking Pass',
    price: 25,
    description: 'Guaranteed covered parking bay adjacent to the festival entrance grounds with in/out privileges.',
    category: 'Parking',
  },
];

export interface VipComparisonRow {
  feature: string;
  ga: boolean | string;
  vip: boolean | string;
  description: string;
}

export const VIP_COMPARISON_MATRIX: VipComparisonRow[] = [
  {
    feature: 'Lakefront Grounds Access',
    ga: true,
    vip: true,
    description: 'Entry to 60+ global kitchens, artisans, and Lake Michigan views.'
  },
  {
    feature: 'Live Music & Cooking Stages',
    ga: 'General lawn',
    vip: 'Dedicated viewing terrace',
    description: 'VIP ticket holders enjoy an elevated covered terrace right by the Main Stage.'
  },
  {
    feature: 'Dedicated Express Entry Gate',
    ga: false,
    vip: true,
    description: 'Zero wait entry with dedicated security check and wristband activation.'
  },
  {
    feature: 'Lakeview VIP Shaded Lounge',
    ga: false,
    vip: true,
    description: 'Plush couches, cooling fans, shaded pergolas, and mobile phone charging lockers.'
  },
  {
    feature: 'Complimentary Tasting Tokens',
    ga: false,
    vip: '6–12 tokens included',
    description: 'Redeemable immediately at any food vendor stall for signature bites.'
  },
  {
    feature: 'Restroom Facilities',
    ga: 'Standard festival units',
    vip: 'Air-conditioned luxury suites',
    description: 'Private flushing porcelain trailers with attendants, mirrors, and mints.'
  },
  {
    feature: 'Private VIP Craft Cocktail Bar',
    ga: false,
    vip: true,
    description: 'Specialty mixologist cocktails, sommelier wine list, and zero line waits.'
  },
  {
    feature: 'Chef Masterclass Priority Seating',
    ga: 'Stand-by only',
    vip: 'Guaranteed reserved seats',
    description: 'Front-row seats for all celebrity chef and culinary battle demonstrations.'
  },
];
