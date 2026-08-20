import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfidenceBadge, confidenceToLevel } from './ConfidenceBadge';

describe('ConfidenceBadge', () => {
    it('maps value to level', () => {
        expect(confidenceToLevel(0.95)).toBe('high');
        expect(confidenceToLevel(0.65)).toBe('med');
        expect(confidenceToLevel(0.3)).toBe('low');
    });

    it('renders label and dot', () => {
        const { container } = render(<ConfidenceBadge level="high" />);
        expect(screen.getByText('High')).toBeInTheDocument();
        expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    });

    it('shows percentage when showValue is set', () => {
        render(<ConfidenceBadge value={0.85} showValue />);
        expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('uses children as label when provided', () => {
        render(<ConfidenceBadge value={0.42}>Low confidence</ConfidenceBadge>);
        expect(screen.getByText('Low confidence')).toBeInTheDocument();
    });

    it('applies level-based styles', () => {
        render(<ConfidenceBadge level="low" data-testid="badge" />);
        expect(screen.getByTestId('badge')).toHaveClass('bg-red-100');
    });
});