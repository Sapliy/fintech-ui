import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('handles click events', async () => {
        const user = userEvent.setup();
        let clicked = false;
        render(<Button onClick={() => (clicked = true)}>Click</Button>);

        await user.click(screen.getByRole('button'));
        expect(clicked).toBe(true);
    });

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('applies variant styles', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-sapliy-primary');

        rerender(<Button variant="danger">Danger</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-sapliy-error');
    });

    it('applies size styles', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole('button')).toHaveClass('text-sm');

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole('button')).toHaveClass('text-lg');
    });

    it('renders with icons', () => {
        render(
            <Button leftIcon={<span data-testid="left-icon">←</span>}>
                With Icon
            </Button>
        );
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('applies fullWidth style', () => {
        render(<Button fullWidth>Full Width</Button>);
        expect(screen.getByRole('button')).toHaveClass('w-full');
    });
});
