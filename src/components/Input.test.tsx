import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
    it('renders with default props', () => {
        render(<Input />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<Input label="Email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with error state', () => {
        render(<Input error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveClass('border-sapliy-error');
    });

    it('renders with hint text', () => {
        render(<Input hint="Enter your email address" />);
        expect(screen.getByText('Enter your email address')).toBeInTheDocument();
        expect(screen.getByText('Enter your email address')).toHaveClass('text-slate-500');
    });

    it('renders with left icon', () => {
        render(<Input leftIcon={<span data-testid="left-icon">@</span>} />);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
        render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders as currency input', () => {
        render(<Input isCurrency currencySymbol="€" />);
        expect(screen.getByText('€')).toBeInTheDocument();
    });

    it('applies different sizes', () => {
        const { rerender } = render(<Input inputSize="sm" />);
        expect(screen.getByRole('textbox')).toHaveClass('px-3', 'py-1.5', 'text-sm');

        rerender(<Input inputSize="lg" />);
        expect(screen.getByRole('textbox')).toHaveClass('px-5', 'py-3', 'text-lg');
    });

    it('applies different variants', () => {
        const { rerender } = render(<Input variant="filled" />);
        expect(screen.getByRole('textbox')).toHaveClass('bg-slate-100', 'border-transparent');

        rerender(<Input variant="flushed" />);
        expect(screen.getByRole('textbox')).toHaveClass('bg-transparent', 'border-b-2');
    });

    it('handles user input', async () => {
        const user = userEvent.setup();
        render(<Input />);
        const input = screen.getByRole('textbox');
        
        await user.type(input, 'test@example.com');
        expect(input).toHaveValue('test@example.com');
    });

    it('can be disabled', () => {
        render(<Input disabled />);
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
        expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('generates id from label when not provided', () => {
        render(<Input label="Test Label" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-label');
    });

    it('uses provided id', () => {
        render(<Input label="Test Label" id="custom-id" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('forwards ref correctly', () => {
        const ref = { current: null };
        render(<Input ref={ref} />);
        expect(ref.current).toBe(screen.getByRole('textbox'));
    });

    it('applies custom className', () => {
        render(<Input className="custom-input-class" />);
        expect(screen.getByRole('textbox')).toHaveClass('custom-input-class');
    });

    it('prioritizes error over hint', () => {
        render(<Input error="Error message" hint="Hint message" />);
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toHaveClass('text-sapliy-error');
        expect(screen.queryByText('Hint message')).not.toBeInTheDocument();
    });
});