import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  isLight = false,
  showSubtitle = true,
}) => {
  return (
    <Link
      to="/"
      className={`inline-flex flex-col group tracking-normal focus-visible:ring-2 focus-visible:ring-[#2F5D62] rounded-sm ${className}`}
      aria-label="Food Fest Chicago 2027 - Return to Home"
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`font-display text-xl sm:text-2xl font-semibold tracking-[0.08em] transition-colors leading-none ${
            isLight ? 'text-white' : 'text-[#1D1A17]'
          }`}
        >
          FOOD FEST
        </span>
        <span className="w-2 h-2 rounded-full bg-[#D9A441] inline-block mb-0.5 group-hover:scale-125 transition-transform" />
      </div>
      {showSubtitle && (
        <span
          className={`text-[10px] uppercase tracking-[0.18em] font-semibold mt-0.5 transition-colors ${
            isLight ? 'text-white/70' : 'text-[#80766A]'
          }`}
        >
          CHICAGO · 2027
        </span>
      )}
    </Link>
  );
};
