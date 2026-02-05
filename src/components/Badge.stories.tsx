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
            options: ['neutral', 'primary', 'success', 'warning', 'error', 'brand'],
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
        variant: 'neutral',
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
        status: 'success',
        children: 'Paid',
    },
    argTypes: {
        status: {
            control: 'select',
            options: ['success', 'warning', 'error', 'neutral'],
        }
    }
};
