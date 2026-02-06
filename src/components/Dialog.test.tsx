import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './Dialog';

describe('Dialog', () => {
    const mockOnConfirm = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        mockOnConfirm.mockClear();
        mockOnCancel.mockClear();
    });

    it('renders when open', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
        expect(screen.getByText('Test message')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(
            <Dialog
                isOpen={false}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
    });

    it('calls onConfirm when confirm button is clicked', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText('Confirm'));
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when cancel button is clicked', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when overlay is clicked', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const overlay = screen.getByText('Test Dialog').closest('[role="dialog"]')?.parentElement;
        expect(overlay).toBeInTheDocument();

        if (overlay) {
            fireEvent.click(overlay);
            expect(mockOnCancel).toHaveBeenCalledTimes(1);
        }
    });

    it('uses custom button text', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                confirmText="Delete"
                cancelText="Keep"
            />
        );

        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByText('Keep')).toBeInTheDocument();
        expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
        expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('applies different dialog types', () => {
        const { rerender } = render(
            <Dialog
                isOpen={true}
                title="Warning Dialog"
                message="Warning message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                type="warning"
            />
        );

        // Test warning type
        rerender(
            <Dialog
                isOpen={true}
                title="Danger Dialog"
                message="Danger message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                type="danger"
            />
        );

        expect(screen.getByText('Danger Dialog')).toBeInTheDocument();
    });

    it('handles Escape key', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('prevents body scroll when open', () => {
        render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
        const { unmount } = render(
            <Dialog
                isOpen={true}
                title="Test Dialog"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        unmount();
        expect(document.body.style.overflow).toBe('unset');
    });
});