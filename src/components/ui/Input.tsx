import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightAction?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightAction, id, className = '', ...props }, ref) => {
    const inputId = id || 'input-' + label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex justify-between items-baseline">
          <label
            htmlFor={inputId}
            className="text-xs uppercase font-semibold tracking-wider text-[#4A433B]"
          >
            {label}
            {props.required && <span className="text-[#B9502F] ml-1">*</span>}
          </label>
          {hint && !error && (
            <span className="text-xs text-[#80766A]">{hint}</span>
          )}
        </div>

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[#80766A] pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`w-full h-11 px-3.5 text-sm bg-[var(--surface-elevated)] border rounded-[var(--r-sm)] text-[#1D1A17] placeholder:text-[#80766A]/60 transition-all focus:outline-none focus:ring-2 focus:ring-[#2F5D62] focus:border-transparent ${
              leftIcon ? 'pl-10' : ''
            } ${rightAction ? 'pr-11' : ''} ${
              error
                ? 'border-[#B23A3A] bg-red-50/20 focus:ring-[#B23A3A]'
                : 'border-[#E4DCCF] hover:border-[#1D1A17]/40'
            } ${className}`}
            {...props}
          />

          {rightAction && (
            <div className="absolute right-3 text-[#80766A] flex items-center">
              {rightAction}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-[#B23A3A] flex items-center gap-1 mt-0.5"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
