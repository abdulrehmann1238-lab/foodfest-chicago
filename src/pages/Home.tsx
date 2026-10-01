import React, { useEffect } from 'react';
import { Hero } from '../components/sections/Hero';
import { CountdownStrip } from '../components/sections/CountdownStrip';
import { WhatIsFoodFest } from '../components/sections/WhatIsFoodFest';
import { NumbersCounters } from '../components/sections/NumbersCounters';
import { PinnedStory } from '../components/sections/PinnedStory';
import { FeaturedVendorsRow } from '../components/sections/FeaturedVendorsRow';
import { LineupTeaser } from '../components/sections/LineupTeaser';
import { TierCardsPreview } from '../components/sections/TierCardsPreview';
import { VipCallout } from '../components/sections/VipCallout';
import { FaqTeaser } from '../components/sections/FaqTeaser';
import { useAnalyticsStore } from '../store/analyticsStore';

export const Home: React.FC = () => {
  const logEvent = useAnalyticsStore((state) => state.logEvent);

  useEffect(() => {
    window.scrollTo(0, 0);
    logEvent('page_view', {
      page_title: 'Home · Food Fest Chicago 2027',
      page_path: '/',
    });
  }, [logEvent]);

  return (
    <main className="w-full">
      {/* 1. Hero with live food footage, headline & cuisine passport */}
      <Hero />

      {/* 2. Countdown + Event dates strip */}
      <CountdownStrip />

      {/* 3. What is Food Fest manifesto */}
      <WhatIsFoodFest />

      {/* 4. Numerical milestones counters */}
      <NumbersCounters />

      {/* 5. The Experience pinned story (Taste, Hear, Play, Stay) */}
      <PinnedStory />

      {/* 6. Featured vendors horizontal snap row */}
      <FeaturedVendorsRow />

      {/* 7. Lineup & stage teaser */}
      <LineupTeaser />

      {/* 8. Ticket tiers preview */}
      <TierCardsPreview />

      {/* 9. VIP Experience callout */}
      <VipCallout />

      {/* 10. FAQ teaser accordion */}
      <FaqTeaser />
    </main>
  );
};
