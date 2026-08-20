import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ConfidenceBadge, ConfidenceLevel } from './ConfidenceBadge';
import { Badge } from './Badge';

export interface IntentStep {
    id: string;
    title: string;
    description?: string;
    risk: 'low' | 'medium' | 'high';
    confidence?: number;
}

export interface IntentPreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
    intent: string;
    steps: IntentStep[];
    confidence?: number;
    risk?: 'low' | 'medium' | 'high';
}

const riskBadgeVariant: Record<IntentStep['risk'], 'success' | 'warning' | 'error'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
};

export const IntentPreviewCard = React.forwardRef<HTMLDivElement, IntentPreviewCardProps>(
    ({ className, intent, steps, confidence, risk = 'low', ...props }, ref) => {
        const confidenceLevel: ConfidenceLevel =
            confidence === undefined ? 'med' : confidence >= 0.8 ? 'high' : confidence >= 0.5 ? 'med' : 'low';

        return (
            <div
                ref={ref}
                className={twMerge(
                    clsx(
                        'rounded-xl border border-slate-200 bg-white p-5',
                        'shadow-sm transition-shadow hover:shadow-md',
                        className
                    )
                )}
                {...props}
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Intent Preview</p>
                        <h3 className="mt-1 text-base font-semibold text-sapliy-primary">{intent}</h3>
                    </div>
                    {confidence !== undefined && <ConfidenceBadge level={confidenceLevel} value={confidence} size="md" showValue />}
                </div>

                <ol className="mt-4 space-y-2">
                    {steps.map((step) => (
                        <li key={step.id} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2">
                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sapliy-primary/10 text-xs font-semibold text-sapliy-primary">
                                {step.title.charAt(0)}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-slate-700">{step.title}</p>
                                {step.description && (
                                    <p className="text-xs text-slate-500">{step.description}</p>
                                )}
                            </div>
                            <div className="flex flex-shrink-0 items-center gap-2">
                                {step.confidence !== undefined && (
                                    <ConfidenceBadge level={step.confidence >= 0.8 ? 'high' : step.confidence >= 0.5 ? 'med' : 'low'} value={step.confidence} />
                                )}
                                <Badge variant={riskBadgeVariant[step.risk]} size="sm">
                                    {step.risk} risk
                                </Badge>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="mt-4 flex items-center gap-2">
                    <Badge variant={riskBadgeVariant[risk]} size="sm">Overall: {risk} risk</Badge>
                    <span className="text-xs text-slate-400">Review before anything executes.</span>
                </div>
            </div>
        );
    }
);

IntentPreviewCard.displayName = 'IntentPreviewCard';