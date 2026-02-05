import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'left' | 'center' | 'right' | 'between';
}

const variantStyles = {
    default: 'bg-white border border-slate-200',
    elevated: 'bg-white shadow-lg shadow-slate-200/50',
    outlined: 'bg-transparent border-2 border-slate-300',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-xl',
};

const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
};

const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', padding = 'md', rounded = 'lg', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={twMerge(
                    clsx(
                        'overflow-hidden transition-all duration-200',
                        variantStyles[variant],
                        paddingStyles[padding],
                        roundedStyles[rounded],
                        className
                    )
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, title, subtitle, action, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={twMerge(clsx('flex items-start justify-between gap-4 mb-4', className))}
                {...props}
            >
                {children || (
                    <>
                        <div>
                            {title && <h3 className="text-lg font-semibold text-sapliy-primary">{title}</h3>}
                            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
                        </div>
                        {action && <div className="flex-shrink-0">{action}</div>}
                    </>
                )}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={twMerge(clsx('', className))} {...props}>
                {children}
            </div>
        );
    }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, align = 'right', children, ...props }, ref) => {
        const alignStyles = {
            left: 'justify-start',
            center: 'justify-center',
            right: 'justify-end',
            between: 'justify-between',
        };

        return (
            <div
                ref={ref}
                className={twMerge(
                    clsx('flex items-center gap-3 mt-4 pt-4 border-t border-slate-100', alignStyles[align], className)
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooter.displayName = 'CardFooter';
