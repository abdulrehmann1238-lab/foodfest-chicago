import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2, Check } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'lake' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isSuccess = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-9 px-3.5 text-xs font-semibold rounded-[var(--r-sm)] gap-1.5',
      md: 'h-11 px-5 text-sm font-semibold rounded-[var(--r-md)] gap-2',
      lg: 'h-13 px-7 text-base font-semibold rounded-[var(--r-md)] gap-2.5',
    }[size];

    const variantClasses = {
      primary:
        'bg-[#B9502F] text-white hover:bg-[#A14427] active:bg-[#8B3A20] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#2F5D62] focus-visible:ring-offset-2',
      secondary:
        'bg-transparent border border-[#1D1A17] text-[#1D1A17] hover:bg-[#1D1A17]/5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#2F5D62]',
      lake:
        'bg-[#2F5D62] text-white hover:bg-[#264D51] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#2F5D62]',
      ghost:
        'bg-transparent text-[#4A433B] hover:text-[#1D1A17] hover:bg-[#1D1A17]/5 active:scale-[0.98]',
      outline:
        'bg-transparent border border-[#E4DCCF] text-[#4A433B] hover:border-[#1D1A17] hover:text-[#1D1A17] active:scale-[0.98]',
      dark:
        'bg-[#1D1A17] text-[#F7F2E9] hover:bg-[#2C2723] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D9A441]',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-sans tracking-tight transition-all duration-150 select-none cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span>Confirmed</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
