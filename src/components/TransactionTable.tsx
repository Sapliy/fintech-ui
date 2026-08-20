import React from 'react';
import '../styles/sapliy.css';

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: 'succeeded' | 'pending' | 'failed';
    description: string;
    createdAt: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    loading?: boolean;
}

export const TransactionTable = ({ transactions, loading }: TransactionTableProps) => {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount: number, currency: string) => {
        const symbol = currency === 'USD' ? '$' : currency;
        return `${symbol} ${(amount / 100).toFixed(2)}`;
    };

    return (
        <div className="sapliy-table-container">
            <table className="sapliy-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '48px' }}>
                                <div className="sapliy-spinner" style={{ borderTopColor: 'var(--sapliy-primary)', margin: '0 auto' }} />
                            </td>
                        </tr>
                    ) : transactions.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '48px', color: 'var(--sapliy-text-muted)' }}>
                                No transactions found
                            </td>
                        </tr>
                    ) : (
                        transactions.map((tx) => (
                            <tr key={tx.id}>
                                <td style={{ color: 'var(--sapliy-text-muted)', fontSize: '0.8rem' }}>
                                    {formatDate(tx.createdAt)}
                                </td>
                                <td style={{ fontWeight: 500 }}>{tx.description}</td>
                                <td style={{ fontWeight: 600 }}>{formatAmount(tx.amount, tx.currency)}</td>
                                <td>
                                    <span className={`sapliy-badge sapliy-badge-${tx.status}`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
