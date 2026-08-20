import React, { useState } from 'react';
import { useSapliy } from '../provider';
import '../styles/sapliy.css';

interface PaymentFormProps {
    amount: number;
    currency: string;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    title?: string;
}

export const PaymentForm = ({
    amount,
    currency,
    onSuccess,
    onError,
    title = "Payment Details"
}: PaymentFormProps) => {
    const { config } = useSapliy();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${config.baseURL || 'http://localhost:8080'}/v1/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': config.apiKey,
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    sourceId: 'tok_mock',
                    description: `Payment for ${title}`,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Payment failed');

            onSuccess?.(data);
        } catch (err: any) {
            onError?.(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sapliy-card">
            <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.25rem' }}>{title}</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label className="sapliy-label">Card Number</label>
                    <input
                        type="text"
                        className="sapliy-input"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                    />
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 1 }}>
                        <label className="sapliy-label">Expiry Date</label>
                        <input
                            type="text"
                            className="sapliy-input"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="sapliy-label">CVC</label>
                        <input
                            type="text"
                            className="sapliy-input"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="sapliy-button"
                    disabled={loading}
                >
                    {loading ? <div className="sapliy-spinner" /> : `Pay ${currency === 'USD' ? '$' : currency} ${(amount / 100).toFixed(2)}`}
                </button>
                <p style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--sapliy-text-muted)',
                    marginTop: '16px',
                    marginBottom: 0
                }}>
                    Securely processed by **Sapliy**
                </p>
            </form>
        </div>
    );
};
