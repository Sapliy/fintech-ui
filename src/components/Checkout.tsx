import React, { useState } from 'react';
import { PaymentForm } from './PaymentForm';
import '../styles/fintech.css';

interface CheckoutProps {
    amount: number;
    currency: string;
    productName: string;
    productImage?: string;
    onSuccess?: (response: unknown) => void; // Changed from any to unknown for better type safety
    onError?: (error: Error) => void; // Changed from any to Error for common error handling
}

export const Checkout = ({
    amount,
    currency,
    productName,
    productImage,
    onSuccess,
    onError
}: CheckoutProps) => {
    const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
    const [paymentData, setPaymentData] = useState<unknown>(null); // Changed from any to unknown

    const handleSuccess = (res: unknown) => { // Changed from any to unknown
        setPaymentData(res);
        setStep('success');
        onSuccess?.(res);
    };

    if (step === 'success') {
        return (
            <div className="sapliy-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--sapliy-success)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: 'white',
                    fontSize: '32px'
                }}>✓</div>
                <h2 style={{ margin: '0 0 8px' }}>Payment Successful</h2>
                <p style={{ color: 'var(--sapliy-text-muted)', marginBottom: '32px' }}>
                    Thank you for your purchase of {productName}.
                </p>
                <div style={{
                    background: '#f9fafb',
                    padding: '16px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    marginBottom: '24px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Amount paid</span>
                        <span style={{ fontWeight: 600 }}>{currency} {(amount / 100).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Transaction ID</span>
                        <span style={{ color: 'var(--sapliy-text-muted)' }}>{(paymentData as { id: string })?.id || 'tx_...'}</span>
                    </div>
                </div>
                <button onClick={() => setStep('review')} className="sapliy-button" style={{ background: '#f3f4f6', color: 'var(--sapliy-text)' }}>
                    Done
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {step === 'review' ? (
                <div className="sapliy-card">
                    <h3 style={{ margin: '0 0 24px' }}>Order Review</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                        {productImage && (
                            <img src={productImage} alt={productName} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                        )}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{productName}</div>
                            <div style={{ color: 'var(--sapliy-text-muted)', fontSize: '0.875rem' }}>Qty: 1</div>
                        </div>
                        <div style={{ fontWeight: 600 }}>{currency} {(amount / 100).toFixed(2)}</div>
                    </div>
                    <hr style={{ border: 0, borderTop: '1px solid var(--sapliy-border)', margin: '0 0 24px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--sapliy-text-muted)' }}>Subtotal</span>
                        <span>{currency} {(amount / 100).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontWeight: 600, fontSize: '1.1rem' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--sapliy-primary)' }}>{currency} {(amount / 100).toFixed(2)}</span>
                    </div>
                    <button onClick={() => setStep('payment')} className="sapliy-button">
                        Checkout Now
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setStep('review')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--sapliy-primary)',
                            cursor: 'pointer',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}
                    >
                        ← Back to review
                    </button>
                    <PaymentForm
                        amount={amount}
                        currency={currency}
                        title={productName}
                        onSuccess={handleSuccess}
                        onError={onError}
                    />
                </div>
            )}
        </div>
    );
};
