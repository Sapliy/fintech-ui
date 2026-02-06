import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardBody, CardFooter, CardHeader } from './Card';

describe('Card', () => {
    it('renders title and children correctly', () => {
        render(
            <Card>
                <CardHeader title="Test Card" />
                <CardBody>
                    <p>Card content</p>
                </CardBody>
            </Card>
        );
        expect(screen.getByText('Test Card')).toBeInTheDocument();
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders subtitle correctly', () => {
        render(
            <Card>
                <CardHeader title="Title" subtitle="Description of card" />
            </Card>
        );
        expect(screen.getByText('Description of card')).toBeInTheDocument();
    });

    it('renders footer correctly', () => {
        render(
            <Card>
                <CardBody>Content</CardBody>
                <CardFooter>
                    <button>Action</button>
                </CardFooter>
            </Card>
        );
        expect(screen.getByRole('button')).toHaveTextContent('Action');
    });

    it('applies padding styles', () => {
        const { container } = render(<Card padding="none">Content</Card>);
        expect(container.firstChild).not.toHaveClass('p-5');
    });

    it('renders with header action', () => {
        render(
            <Card>
                <CardHeader
                    title="Title"
                    action={<span data-testid="action">Action</span>}
                />
            </Card>
        );
        expect(screen.getByTestId('action')).toBeInTheDocument();
    });
});