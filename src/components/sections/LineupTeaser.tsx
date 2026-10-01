import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight, Music } from 'lucide-react';
import { useCmsStore } from '../../store/cmsStore';
import { useUiStore } from '../../store/uiStore';
import { Button } from '../ui/Button';

export const LineupTeaser: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'Sat' | 'Sun'>('Sat');
  const acts = useCmsStore((state) => state.schedule);
  const { myPlan, togglePlanAct, addToast } = useUiStore();

  const filteredActs = acts.filter((act) => act.day === activeDay).slice(0, 4);

  const handleTogglePlan = (actId: string, actName: string) => {
    const isAdded = togglePlanAct(actId);
    addToast({
      title: isAdded ? 'Added to My Plan' : 'Removed from Plan',
      message: `${actName} ${isAdded ? 'saved to your festival schedule.' : 'removed from your plan.'}`,
      type: isAdded ? 'success' : 'info',
    });
  };

  return (
    <section className="py-24 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2F5D62]">
              LIVE ENTERTAINMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1D1A17] mt-2">
              Music Across Three Stages
            </h2>
            <p className="text-sm sm:text-base text-[#80766A] mt-2 max-w-xl">
              From daylight afrobeat horn collectives to twilight headline sets overlooking the water.
            </p>
          </div>

          {/* Day segmented tabs + plan counter */}
          <div className="flex items-center gap-3">
            <div className="flex bg-[#F7F2E9] p-1 rounded-full border border-[var(--border)]">
              <button
                onClick={() => setActiveDay('Sat')}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeDay === 'Sat'
                    ? 'bg-[#1D1A17] text-white shadow-xs'
                    : 'text-[#4A433B] hover:text-[#1D1A17]'
                }`}
              >
                Saturday, June 12
              </button>
              <button
                onClick={() => setActiveDay('Sun')}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeDay === 'Sun'
                    ? 'bg-[#1D1A17] text-white shadow-xs'
                    : 'text-[#4A433B] hover:text-[#1D1A17]'
                }`}
              >
                Sunday, June 13
              </button>
            </div>

            <Link to="/festival#entertainment">
              <Button size="sm" variant="lake" className="hidden md:flex text-xs">
                Full Stage Schedule
              </Button>
            </Link>
          </div>
        </div>

        {/* Acts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActs.map((act) => {
            const isInPlan = myPlan.includes(act.id);
            return (
              <div
                key={act.id}
                className="bg-white rounded-[var(--r-md)] border border-[#E4DCCF] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full bg-[#1D1A17] overflow-hidden">
                  <img
                    src={act.photo}
                    alt={act.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {act.isHeadliner && (
                    <span className="absolute top-3 left-3 bg-[#D9A441] text-[#1D1A17] font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      Headliner
                    </span>
                  )}

                  <button
                    onClick={() => handleTogglePlan(act.id, act.name)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                      isInPlan
                        ? 'bg-[#B9502F] text-white'
                        : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80'
                    }`}
                    aria-label={isInPlan ? 'Remove from plan' : 'Add to plan'}
                    title={isInPlan ? 'In your festival plan' : 'Add to your plan'}
                  >
                    <Star className={`w-3.5 h-3.5 ${isInPlan ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-semibold text-[#D9A441] tracking-wider block">
                      {act.stage}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-tight truncate">
                      {act.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#80766A] mb-2 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#B9502F]" />
                      <span>{act.time}</span>
                    </div>
                    <p className="text-xs text-[#4A433B] leading-relaxed line-clamp-2">
                      {act.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E4DCCF] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#80766A]">{act.genre}</span>
                    <button
                      onClick={() => handleTogglePlan(act.id, act.name)}
                      className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                        isInPlan ? 'text-[#B9502F]' : 'text-[#2F5D62] hover:underline'
                      }`}
                    >
                      <span>{isInPlan ? 'Saved in Plan' : '+ Add to Plan'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/festival#entertainment">
            <Button size="md" variant="lake" className="w-full">
              View Full 40+ Act Schedule
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
