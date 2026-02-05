import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'pending';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    outline?: boolean;
}

const variantStyles = {
    default: {
        solid: 'bg-slate-100 text-slate-700',
        outline: 'border-slate-300 text-slate-700',
        dot: 'bg-slate-500',
    },
    success: {
        solid: 'bg-green-100 text-green-700',
        outline: 'border-green-300 text-green-700',
        dot: 'bg-green-500',
    },
    warning: {
        solid: 'bg-amber-100 text-amber-700',
        outline: 'border-amber-300 text-amber-700',
        dot: 'bg-amber-500',
    },
    error: {
        solid: 'bg-red-100 text-red-700',
        outline: 'border-red-300 text-red-700',
        dot: 'bg-red-500',
    },
    info: {
        solid: 'bg-blue-100 text-blue-700',
        outline: 'border-blue-300 text-blue-700',
        dot: 'bg-blue-500',
    },
    pending: {
        solid: 'bg-purple-100 text-purple-700',
        outline: 'border-purple-300 text-purple-700',
        dot: 'bg-purple-500',
    },
};

const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = 'default',
            size = 'md',
            dot = false,
            outline = false,
            children,
            ...props
        },
        ref
    ) => {
        const styles = variantStyles[variant];

        return (
            <span
                ref={ref}
                className={twMerge(
                    clsx(
                        'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors',
                        outline ? clsx('bg-transparent border', styles.outline) : styles.solid,
                        sizeStyles[size],
                        className
                    )
                )}
                {...props}
            >
                {dot && (
                    <span
                        className={clsx(
                            'flex-shrink-0 rounded-full',
                            size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5',
                            styles.dot
                        )}
                    />
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

// Convenience components for common status badges
export const StatusBadge = ({
    status,
    ...props
}: {
    status: 'succeeded' | 'pending' | 'failed' | 'processing' | 'cancelled';
} & Omit<BadgeProps, 'variant'>) => {
    const statusMap: Record<typeof status, BadgeProps['variant']> = {
        succeeded: 'success',
        pending: 'pending',
        failed: 'error',
        processing: 'info',
        cancelled: 'default',
    };

    const labelMap: Record<typeof status, string> = {
        succeeded: 'Succeeded',
        pending: 'Pending',
        failed: 'Failed',
        processing: 'Processing',
        cancelled: 'Cancelled',
    };

    return (
        <Badge variant={statusMap[status]} dot {...props}>
            {labelMap[status]}
        </Badge>
    );
};
