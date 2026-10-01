import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'lake' | 'accent' | 'olive' | 'success' | 'warning' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-[#1D1A17]/5 text-[#4A433B] border border-[#E4DCCF]',
    primary: 'bg-[#B9502F]/10 text-[#B9502F] border border-[#B9502F]/25 font-semibold',
    lake: 'bg-[#2F5D62]/10 text-[#2F5D62] border border-[#2F5D62]/25 font-medium',
    accent: 'bg-[#D9A441]/20 text-[#1D1A17] border border-[#D9A441]/40 font-semibold',
    olive: 'bg-[#66714A]/15 text-[#66714A] border border-[#66714A]/30 font-medium',
    success: 'bg-[#3F7D58]/15 text-[#3F7D58] border border-[#3F7D58]/30 font-semibold',
    warning: 'bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30 font-semibold',
    dark: 'bg-[#1D1A17] text-[#F7F2E9] border border-[#1D1A17] font-medium',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[var(--r-pill)] text-xs tracking-tight transition-colors ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
