import type { Meta, StoryObj } from '@storybook/react';
import { Badge, StatusBadge } from './Badge';

const meta = {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'pending'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        dot: {
            control: 'boolean',
        },
        outline: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Badge',
        variant: 'default',
    },
};

export const WithDot: Story = {
    args: {
        children: 'Online',
        variant: 'success',
        dot: true,
    },
};

export const StatusWrapper: StoryObj<typeof StatusBadge> = {
    render: (args) => <StatusBadge {...args} />,
    args: {
        status: 'succeeded',
        children: 'Paid',
    },
    argTypes: {
        status: {
            control: 'select',
            options: ['succeeded', 'pending', 'failed', 'processing', 'cancelled'],
        }
    }
};
