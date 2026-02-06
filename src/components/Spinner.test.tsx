import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner, LoadingOverlay } from './Spinner';

describe('Spinner', () => {
    it('renders with default props', () => {
        render(<Spinner />);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    it('renders with custom size', () => {
        render(<Spinner size="lg" />);
        const spinnerElement = screen.getByRole('status').firstChild;
        expect(spinnerElement).toHaveClass('w-8', 'h-8');
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Spinner variant="primary" />);
        const spinnerElement = screen.getByRole('status').firstChild;
        expect(spinnerElement).toHaveClass('border-sapliy-accent/30', 'border-t-sapliy-accent');

        rerender(<Spinner variant="white" />);
        expect(spinnerElement).toHaveClass('border-white/30', 'border-t-white');
    });

    it('renders with label', () => {
        render(<Spinner label="Processing..." />);
        expect(screen.getByText('Processing...')).toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing...');
    });

    it('applies custom className', () => {
        render(<Spinner className="custom-class" />);
        expect(screen.getByRole('status')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
        const ref = { current: null };
        render(<Spinner ref={ref} />);
        expect(ref.current).toBe(screen.getByRole('status'));
    });
});

describe('LoadingOverlay', () => {
    it('renders when visible', () => {
        render(<LoadingOverlay isVisible={true} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not render when not visible', () => {
        render(<LoadingOverlay isVisible={false} />);
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('renders with custom message', () => {
        render(<LoadingOverlay message="Please wait..." />);
        expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('applies blur effect by default', () => {
        render(<LoadingOverlay />);
        const overlay = screen.getByText('Loading...').closest('div');
        expect(overlay?.parentElement).toHaveClass('backdrop-blur-sm');
    });

    it('can disable blur effect', () => {
        render(<LoadingOverlay blur={false} />);
        const overlay = screen.getByText('Loading...').closest('div');
        expect(overlay?.parentElement).not.toHaveClass('backdrop-blur-sm');
    });
});