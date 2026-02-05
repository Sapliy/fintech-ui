import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: React.ReactNode;
}

const variantStyles = {
    info: {
        container: 'bg-blue-50 border-blue-200 text-blue-800',
        icon: 'text-blue-500',
        iconComponent: Info,
    },
    success: {
        container: 'bg-green-50 border-green-200 text-green-800',
        icon: 'text-green-500',
        iconComponent: CheckCircle,
    },
    warning: {
        container: 'bg-amber-50 border-amber-200 text-amber-800',
        icon: 'text-amber-500',
        iconComponent: AlertTriangle,
    },
    error: {
        container: 'bg-red-50 border-red-200 text-red-800',
        icon: 'text-red-500',
        iconComponent: AlertCircle,
    },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className,
            variant = 'info',
            title,
            dismissible = false,
            onDismiss,
            icon,
            children,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(true);

        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
        };

        if (!isVisible) return null;

        const styles = variantStyles[variant];
        const IconComponent = styles.iconComponent;

        return (
            <div
                ref={ref}
                role="alert"
                className={twMerge(
                    clsx(
                        'flex gap-3 p-4 border rounded-lg transition-all duration-200',
                        styles.container,
                        className
                    )
                )}
                {...props}
            >
                <div className={clsx('flex-shrink-0 mt-0.5', styles.icon)}>
                    {icon || <IconComponent className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                    {title && <p className="font-semibold mb-1">{title}</p>}
                    <div className="text-sm opacity-90">{children}</div>
                </div>
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        );
    }
);

Alert.displayName = 'Alert';
