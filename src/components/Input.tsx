import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    inputSize?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled' | 'flushed';
    isCurrency?: boolean;
    currencySymbol?: string;
}

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
};

const variantStyles = {
    default: 'bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-sapliy-accent focus:border-transparent',
    filled: 'bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-sapliy-accent focus:border-transparent',
    flushed: 'bg-transparent border-b-2 border-slate-200 rounded-none focus:border-sapliy-accent px-0',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            inputSize = 'md',
            variant = 'default',
            isCurrency = false,
            currencySymbol = '$',
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
        const hasLeftContent = leftIcon || isCurrency;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {hasLeftContent && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center">
                            {isCurrency ? (
                                <span className="text-slate-500 font-medium">{currencySymbol}</span>
                            ) : (
                                leftIcon
                            )}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        className={twMerge(
                            clsx(
                                'block w-full transition-all duration-200 outline-none text-sapliy-primary placeholder:text-slate-400',
                                variantStyles[variant],
                                sizeStyles[inputSize],
                                hasLeftContent && 'pl-10',
                                rightIcon && 'pr-10',
                                error && 'border-sapliy-error focus:ring-sapliy-error/20',
                                disabled && 'opacity-50 cursor-not-allowed bg-slate-50',
                                className
                            )
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {(error || hint) && (
                    <p
                        className={clsx(
                            'mt-1.5 text-sm',
                            error ? 'text-sapliy-error' : 'text-slate-500'
                        )}
                    >
                        {error || hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
