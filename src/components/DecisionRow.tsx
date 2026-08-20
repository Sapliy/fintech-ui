import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ConfidenceBadge, ConfidenceLevel } from './ConfidenceBadge';

export type DecisionStatus = 'executed' | 'pending' | 'blocked' | 'denied';

export interface DecisionRowProps extends React.HTMLAttributes<HTMLDivElement> {
    eventType: string;
    action: string;
    reason: string;
    status?: DecisionStatus;
    confidence?: number;
    policy?: string;
    timestamp?: string;
    compact?: boolean;
}

const statusStyles: Record<DecisionStatus, { badge: string; dot: string }> = {
    executed: { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
    pending: { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
    blocked: { badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
    denied: { badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

export const DecisionRow = React.forwardRef<HTMLDivElement, DecisionRowProps>(
    (
        { className, eventType, action, reason, status = 'executed', confidence, policy, timestamp, compact = false, ...props },
        ref
    ) => {
        const statusStyle = statusStyles[status];
        const confidenceLevel: ConfidenceLevel =
            confidence === undefined ? 'med' : confidence >= 0.8 ? 'high' : confidence >= 0.5 ? 'med' : 'low';

        return (
            <div
                ref={ref}
                className={twMerge(
                    clsx(
                        'rounded-lg border border-slate-200 bg-white',
                        compact ? 'px-3 py-2' : 'px-4 py-3',
                        className
                    )
                )}
                {...props}
            >
                <div className="flex items-center gap-3">
                    <span className={clsx('flex-shrink-0 rounded-full', compact ? 'w-2 h-2' : 'w-2.5 h-2.5', statusStyle.dot)} />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <span className="font-mono text-xs text-slate-400">{eventType}</span>
                            <span className={clsx('font-semibold text-slate-800', compact ? 'text-sm' : 'text-base')}>
                                {action}
                            </span>
                            {policy && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-500">
                                    {policy}
                                </span>
                            )}
                        </div>
                        <p className={clsx('text-slate-500', compact ? 'text-xs mt-0.5' : 'text-sm mt-0.5')}>{reason}</p>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-end gap-1">
                        {confidence !== undefined && <ConfidenceBadge level={confidenceLevel} value={confidence} showValue />}
                        <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', statusStyle.badge)}>{status}</span>
                        {timestamp && <span className="text-[11px] text-slate-400">{timestamp}</span>}
                    </div>
                </div>
            </div>
        );
    }
);

DecisionRow.displayName = 'DecisionRow';