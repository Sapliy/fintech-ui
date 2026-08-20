import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IntentPreviewCard } from './IntentPreviewCard';

const steps = [
    { id: '1', title: 'Create Payment Intent', description: 'Amount $19.90 (1,990 cents)', risk: 'low' as const, confidence: 0.95 },
    { id: '2', title: 'Refund Request', description: 'Over $1,000 — requires manager approval', risk: 'high' as const, confidence: 0.6 },
];

describe('IntentPreviewCard', () => {
    it('renders intent and preview label', () => {
        render(<IntentPreviewCard intent="Recover failed subscription payments" steps={steps} />);
        expect(screen.getByText('Intent Preview')).toBeInTheDocument();
        expect(screen.getByText('Recover failed subscription payments')).toBeInTheDocument();
    });

    it('renders each step with risk badge', () => {
        render(<IntentPreviewCard intent="Recover failed payments" steps={steps} />);
        expect(screen.getByText('Create Payment Intent')).toBeInTheDocument();
        expect(screen.getByText('Refund Request')).toBeInTheDocument();
        expect(screen.getByText('low risk')).toBeInTheDocument();
        expect(screen.getByText('high risk')).toBeInTheDocument();
    });

    it('shows confidence value when provided', () => {
        render(<IntentPreviewCard intent="Recover failed payments" steps={steps} confidence={0.9} />);
        expect(screen.getByText('90%')).toBeInTheDocument();
    });

    it('renders overall risk', () => {
        render(<IntentPreviewCard intent="Recover failed payments" steps={steps} risk="medium" />);
        expect(screen.getByText('Overall: medium risk')).toBeInTheDocument();
    });
});