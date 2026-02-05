import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
    title: 'Components/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        status: {
            control: 'select',
            options: ['info', 'success', 'warning', 'error'],
        },
        title: {
            control: 'text',
        },
        dismissible: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        status: 'info',
        title: 'Information',
        children: 'This is an informational alert message.',
    },
};

export const Success: Story = {
    args: {
        status: 'success',
        title: 'Success!',
        children: 'Operation completed successfully.',
    },
};

export const Warning: Story = {
    args: {
        status: 'warning',
        title: 'Warning',
        children: 'Please check your input values.',
    },
};

export const Error: Story = {
    args: {
        status: 'error',
        title: 'Error Occurred',
        children: 'Something went wrong while processing your request.',
    },
};

export const Dismissible: Story = {
    args: {
        status: 'info',
        children: 'You can dismiss this alert.',
        dismissible: true,
    },
};
