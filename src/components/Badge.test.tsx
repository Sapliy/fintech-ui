import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
    it('renders children correctly', () => {
        render(<Badge>Active</Badge>);
        expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('applies variant styles', () => {
        const { rerender } = render(<Badge variant="success">Success</Badge>);
        expect(screen.getByText('Success')).toHaveClass('bg-green-100');

        rerender(<Badge variant="error" data-testid="badge">Error</Badge>);
        expect(screen.getByText('Error')).toHaveClass('bg-red-100');
    });

    it('applies size styles', () => {
        const { rerender } = render(<Badge size="sm">Small</Badge>);
        expect(screen.getByText('Small')).toHaveClass('text-xs');

        rerender(<Badge size="md">Medium</Badge>);
        expect(screen.getByText('Medium')).toHaveClass('text-sm');
    });

    it('renders with dot correctly', () => {
        const { container } = render(<Badge dot>With Dot</Badge>);
        const dot = container.querySelector('.w-1\\.5');
        expect(dot).toBeInTheDocument();
    });
});
