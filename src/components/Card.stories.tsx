import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from './Button';

const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'elevated', 'outlined', 'glass'],
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Card Title</h3>
                </CardHeader>
                <CardBody>
                    <p className="text-gray-600">
                        This is a simple card component with header, body, and footer sections.
                    </p>
                </CardBody>
                <CardFooter>
                    <Button size="sm">Action</Button>
                </CardFooter>
            </>
        ),
    },
};

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        children: (
            <>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Elevated Card</h3>
                </CardHeader>
                <CardBody>
                    <p>This card has a stronger shadow for emphasis.</p>
                </CardBody>
            </>
        ),
    },
};

export const Glass: Story = {
    args: {
        variant: 'glass',
        children: (
            <>
                <CardHeader>
                    <h3 className="text-lg font-semibold text-white">Glass Card</h3>
                </CardHeader>
                <CardBody>
                    <p className="text-white/80">
                        This card uses a glassmorphism effect (backdrop blur).
                    </p>
                </CardBody>
            </>
        ),
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};
