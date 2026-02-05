import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'filled', 'flushed'],
        },
        error: {
            control: 'text',
        },
        label: {
            control: 'text',
        },
        hint: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
        label: 'Label',
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter email...',
        value: 'invalid-email',
        error: 'Please enter a valid email address',
    },
};

export const WithHint: Story = {
    args: {
        label: 'Password',
        type: 'password',
        hint: 'Must be at least 8 characters',
    },
};

export const WithIcon: Story = {
    args: {
        label: 'Search',
        placeholder: 'Search...',
        leftIcon: <span>🔍</span>,
    },
};

export const Currency: Story = {
    args: {
        label: 'Amount',
        placeholder: '0.00',
        leftIcon: <span>$</span>,
        type: 'number',
    },
};
