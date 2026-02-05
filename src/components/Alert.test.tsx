import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
    it('renders message correctly', () => {
        render(<Alert title="Something happened" />);
        expect(screen.getByText('Something happened')).toBeInTheDocument();
    });

    it('renders description correctly', () => {
        render(
            <Alert title="Error">
                Failed to save data
            </Alert>
        );
        expect(screen.getByText('Failed to save data')).toBeInTheDocument();
    });

    it('applies type styles', () => {
        const { rerender } = render(<Alert title="Info" variant="info" />);
        expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');

        rerender(<Alert title="Error" variant="error" />);
        expect(screen.getByRole('alert')).toHaveClass('bg-red-50');

        rerender(<Alert title="Success" variant="success" />);
        expect(screen.getByRole('alert')).toHaveClass('bg-green-50');

        rerender(<Alert title="Warning" variant="warning" />);
        expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');
    });

    it('renders actions correctly', () => {
        render(
            <Alert title="Confirm">
                <button>Undo</button>
            </Alert>
        );
        expect(screen.getByRole('button')).toHaveTextContent('Undo');
    });
});
