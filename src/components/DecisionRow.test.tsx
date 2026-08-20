import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DecisionRow } from './DecisionRow';

describe('DecisionRow', () => {
    it('renders event type, action, and reason', () => {
        render(
            <DecisionRow
                eventType="payment.failed"
                action="schedule_retry"
                reason="First retry in 4-6h (~22% recovery expected)"
            />
        );
        expect(screen.getByText('payment.failed')).toBeInTheDocument();
        expect(screen.getByText('schedule_retry')).toBeInTheDocument();
        expect(screen.getByText('First retry in 4-6h (~22% recovery expected)')).toBeInTheDocument();
    });

    it('renders policy tag', () => {
        render(
            <DecisionRow
                eventType="refund.requested"
                action="request_approval"
                reason="Over $1,000 threshold"
                policy="refund-approval-policy"
            />
        );
        expect(screen.getByText('refund-approval-policy')).toBeInTheDocument();
    });

    it('shows status badge and confidence', () => {
        render(
            <DecisionRow
                eventType="payment.failed"
                action="schedule_retry"
                reason="Retry scheduled"
                status="pending"
                confidence={0.82}
            />
        );
        expect(screen.getByText('pending')).toBeInTheDocument();
        expect(screen.getByText('82%')).toBeInTheDocument();
    });

    it('renders timestamp when provided', () => {
        render(
            <DecisionRow eventType="payment.failed" action="schedule_retry" reason="Retry" timestamp="Aug 19, 10:00" />
        );
        expect(screen.getByText('Aug 19, 10:00')).toBeInTheDocument();
    });
});