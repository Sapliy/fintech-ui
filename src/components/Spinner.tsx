import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'white';
    label?: string;
}

const sizeStyles = {
    xs: 'w-3 h-3 border',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-2',
    xl: 'w-12 h-12 border-3',
};

const variantStyles = {
    default: 'border-slate-200 border-t-slate-600',
    primary: 'border-sapliy-accent/30 border-t-sapliy-accent',
    white: 'border-white/30 border-t-white',
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size = 'md', variant = 'default', label, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="status"
                aria-label={label || 'Loading'}
                className={twMerge(clsx('inline-flex items-center gap-2', className))}
                {...props}
            >
                <div
                    className={clsx(
                        'rounded-full animate-spin',
                        sizeStyles[size],
                        variantStyles[variant]
                    )}
                />
                {label && (
                    <span
                        className={clsx(
                            'text-sm font-medium',
                            variant === 'white' ? 'text-white' : 'text-slate-600'
                        )}
                    >
                        {label}
                    </span>
                )}
                <span className="sr-only">{label || 'Loading'}</span>
            </div>
        );
    }
);

Spinner.displayName = 'Spinner';

// Full-page loading overlay
export const LoadingOverlay = ({
    isVisible = true,
    message = 'Loading...',
    blur = true,
}: {
    isVisible?: boolean;
    message?: string;
    blur?: boolean;
}) => {
    if (!isVisible) return null;

    return (
        <div
            className={clsx(
                'fixed inset-0 z-50 flex items-center justify-center bg-white/80',
                blur && 'backdrop-blur-sm'
            )}
        >
            <div className="flex flex-col items-center gap-4">
                <Spinner size="xl" variant="primary" />
                <p className="text-slate-600 font-medium">{message}</p>
            </div>
        </div>
    );
};
