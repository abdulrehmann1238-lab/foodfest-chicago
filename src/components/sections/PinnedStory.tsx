import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Music, Flame, Hotel, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface Beat {
  id: string;
  tag: string;
  title: string;
  description: string;
  photo: string;
  icon: React.ReactNode;
  actionLabel: string;
  actionLink: string;
}

const BEATS: Beat[] = [
  {
    id: 'taste',
    tag: '01 / TASTE',
    title: 'Wander from Oaxaca to Osaka in a single afternoon.',
    description:
      'Stroll between open-flame comales, sizzling takoyaki griddles, wood-fired tandoor ovens, and slow-pressed Cuban bakeries. Every bite is an authentic masterclass in regional heritage.',
    photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    icon: <Utensils className="w-5 h-5 text-[#B9502F]" />,
    actionLabel: 'Explore 60+ Food Vendors',
    actionLink: '/festival#vendors',
  },
  {
    id: 'hear',
    tag: '02 / HEAR',
    title: 'Live sets from the lakeside stage until sunset.',
    description:
      'Three performance stages programmed with global rhythm—Afrobeat horns, Mediterranean fusion strings, Chicago blues & soul, and ambient dusk electronics drifting across Lake Michigan.',
    photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    icon: <Music className="w-5 h-5 text-[#2F5D62]" />,
    actionLabel: 'View Music Lineup',
    actionLink: '/festival#entertainment',
  },
  {
    id: 'play',
    tag: '03 / PLAY',
    title: 'Learn to fold dumplings. Win a hot-sauce dare.',
    description:
      'Roll sleeves up in chef knife skills masterclasses, blend personalized spice apothecary jars, cheer on the great dumpling championship, or taste through the Botanical Cocktail Passport.',
    photo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    icon: <Flame className="w-5 h-5 text-[#D9A441]" />,
    actionLabel: 'See Interactive Activities',
    actionLink: '/festival#activities',
  },
  {
    id: 'stay',
    tag: '04 / STAY',
    title: 'Make a weekend of it, with hotels minutes away.',
    description:
      'Chicago in June is magical. We partnered with premier boutique hotels along Michigan Avenue, The Loop, and River North with festival shuttles, late checkouts, and lake views.',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    icon: <Hotel className="w-5 h-5 text-[#66714A]" />,
    actionLabel: 'View Partner Hotels & Map',
    actionLink: '/visit',
  },
];

export const PinnedStory: React.FC = () => {
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const activeBeat = BEATS[activeBeatIndex];

  return (
    <section className="py-24 sm:py-32 bg-[var(--surface)] border-b border-[var(--border)] overflow-hidden">
      <div className="container-custom">
        {/* Section Eyebrow */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
            THE FESTIVAL EXPERIENCE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#1D1A17] mt-2 mb-4">
            Four ways to experience Food Fest.
          </h2>
          <p className="text-sm sm:text-base text-[#80766A]">
            More than just food stalls—an immersive weekend celebrating international culinary traditions, music, and community on the water.
          </p>
        </div>

        {/* Interactive Story Showcase (Tabs on desktop, card stack on mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
          {/* Left: Beat Selector & Narrative */}
          <div className="col-span-5 flex flex-col gap-4">
            {BEATS.map((beat, idx) => {
              const isSelected = activeBeatIndex === idx;
              return (
                <div
                  key={beat.id}
                  onClick={() => setActiveBeatIndex(idx)}
                  className={`p-6 rounded-[var(--r-md)] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#B9502F] shadow-[var(--sh-2)] ring-1 ring-[#B9502F]/30'
                      : 'bg-transparent border-transparent hover:border-[var(--border)] hover:bg-white/50 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-[var(--bg)]">{beat.icon}</div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#80766A]">
                      {beat.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#1D1A17] leading-snug mb-2">
                    {beat.title}
                  </h3>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3"
                    >
                      <p className="text-sm text-[#4A433B] leading-relaxed mb-4">
                        {beat.description}
                      </p>
                      <Link to={beat.actionLink}>
                        <Button
                          size="sm"
                          variant="secondary"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          className="text-xs"
                        >
                          {beat.actionLabel}
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Crossfading High-Resolution Image */}
          <div className="col-span-7 h-[540px] rounded-[var(--r-lg)] overflow-hidden border border-[#E4DCCF] shadow-2xl relative bg-[#1D1A17]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeBeat.id}
                src={activeBeat.photo}
                alt={activeBeat.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D9A441] mb-1 block">
                {activeBeat.tag}
              </span>
              <p className="font-display text-2xl font-semibold leading-tight">
                {activeBeat.title}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Responsive Stack */}
        <div className="flex flex-col gap-8 lg:hidden">
          {BEATS.map((beat) => (
            <div
              key={beat.id}
              className="bg-white rounded-[var(--r-md)] border border-[#E4DCCF] shadow-sm overflow-hidden"
            >
              <div className="aspect-[16/10] w-full bg-[#1D1A17] overflow-hidden">
                <img
                  src={beat.photo}
                  alt={beat.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B9502F]">
                    {beat.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2 leading-snug">
                  {beat.title}
                </h3>
                <p className="text-sm text-[#4A433B] leading-relaxed mb-4">
                  {beat.description}
                </p>
                <Link to={beat.actionLink}>
                  <Button
                    size="sm"
                    variant="secondary"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="w-full text-xs"
                  >
                    {beat.actionLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
