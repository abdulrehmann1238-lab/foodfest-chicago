import React, { useState, useEffect } from 'react';
import { Calendar, Download, Clock } from 'lucide-react';
import { formatEventCountdown } from '../../lib/format';
import { useUiStore } from '../../store/uiStore';

export const CountdownStrip: React.FC = () => {
  const [countdown, setCountdown] = useState(formatEventCountdown());
  const addToast = useUiStore((state) => state.addToast);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatEventCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    addToast({
      title: 'Calendar Event Downloaded',
      message: 'Food Fest Chicago 2027 (June 12–13, 2027) added to your calendar.',
      type: 'success',
    });
  };

  return (
    <div className="w-full bg-[#FAF7F0] border-b border-[var(--border)] py-4 px-4">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4A433B]">
        {/* Countdown */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#B9502F]" />
          <span className="font-medium text-[#1D1A17]">Doors Open In:</span>
          <div className="flex items-baseline gap-1 font-mono font-bold text-[#1D1A17]">
            <span className="bg-white border border-[#E4DCCF] px-1.5 py-0.5 rounded text-xs">{countdown.days}d</span>
            <span>:</span>
            <span className="bg-white border border-[#E4DCCF] px-1.5 py-0.5 rounded text-xs">{countdown.hours}h</span>
            <span>:</span>
            <span className="bg-white border border-[#E4DCCF] px-1.5 py-0.5 rounded text-xs">{countdown.minutes}m</span>
            <span>:</span>
            <span className="bg-white border border-[#E4DCCF] px-1.5 py-0.5 rounded text-xs">{countdown.seconds}s</span>
          </div>
        </div>

        {/* Date location summary */}
        <div className="hidden md:flex items-center gap-2 text-[#80766A]">
          <span>Saturday & Sunday, June 12–13, 2027</span>
          <span>·</span>
          <span>11:00 AM – 10:00 PM</span>
        </div>

        {/* Add to Calendar Action */}
        <button
          onClick={handleAddToCalendar}
          className="flex items-center gap-1.5 font-semibold text-[#2F5D62] hover:text-[#1D1A17] hover:underline cursor-pointer transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Add to Calendar (.ics)</span>
        </button>
      </div>
    </div>
  );
};
