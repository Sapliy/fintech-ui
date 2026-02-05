import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, LoadingOverlay } from './Spinner';

const meta = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
        },
        variant: {
            control: 'select',
            options: ['primary', 'white', 'brand'],
        },
        label: {
            control: 'text',
        },
    },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithLabel: Story = {
    args: {
        label: 'Loading data...',
    },
};

export const Overlay: StoryObj<typeof LoadingOverlay> = {
    render: () => (
        <div className="relative h-64 w-96 border rounded bg-gray-50 p-4">
            <p>Content behind overlay...</p>
            <LoadingOverlay message="Processing payment..." />
        </div>
    ),
};
