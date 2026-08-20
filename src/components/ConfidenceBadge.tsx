import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ConfidenceLevel = 'low' | 'med' | 'high';

export interface ConfidenceBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    level?: ConfidenceLevel;
    value?: number;
    size?: 'sm' | 'md';
    showValue?: boolean;
}

const levelStyles: Record<ConfidenceLevel, { badge: string; dot: string; label: string }> = {
    low: {
        badge: 'bg-red-100 text-red-700',
        dot: 'bg-red-500',
        label: 'Low',
    },
    med: {
        badge: 'bg-amber-100 text-amber-700',
        dot: 'bg-amber-500',
        label: 'Med',
    },
    high: {
        badge: 'bg-green-100 text-green-700',
        dot: 'bg-green-500',
        label: 'High',
    },
};

const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
};

export function confidenceToLevel(value: number): ConfidenceLevel {
    if (value >= 0.8) return 'high';
    if (value >= 0.5) return 'med';
    return 'low';
}

export const ConfidenceBadge = React.forwardRef<HTMLSpanElement, ConfidenceBadgeProps>(
    ({ className, level, value, size = 'sm', showValue = false, children, ...props }, ref) => {
        const resolvedLevel = level ?? (value !== undefined ? confidenceToLevel(value) : 'med');
        const styles = levelStyles[resolvedLevel];
        const label = children ?? styles.label;

        return (
            <span
                ref={ref}
                className={twMerge(
                    clsx(
                        'inline-flex items-center gap-1.5 font-medium rounded-full',
                        styles.badge,
                        sizeStyles[size],
                        className
                    )
                )}
                {...props}
            >
                <span className={clsx('flex-shrink-0 rounded-full', size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2', styles.dot)} />
                {label}
                {showValue && value !== undefined && (
                    <span className="opacity-70">{Math.round(value * 100)}%</span>
                )}
            </span>
        );
    }
);

ConfidenceBadge.displayName = 'ConfidenceBadge';