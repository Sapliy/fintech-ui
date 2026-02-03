# @sapliyio/fintech-ui

[![npm version](https://badge.fury.io/js/%40sapliyio%2Ffintech-ui.svg)](https://badge.fury.io/js/%40sapliyio%2Ffintech-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React component library for building payment experiences. Pre-built, customizable components for checkout, payment forms, and transaction dashboards.

## Features

- **PaymentForm** — Card input with validation and tokenization
- **Checkout** — Complete checkout flow with amount display
- **TransactionTable** — Transaction history with filtering
- **TypeScript** — Full type definitions included
- **Theming** — CSS variables for easy customization
- **Secure** — Uses publishable keys only (no secrets in client)

## Installation

```bash
npm install @sapliyio/fintech-ui
# or
yarn add @sapliyio/fintech-ui
```

## Quick Start

```tsx
import { SapliyProvider, Checkout } from '@sapliyio/fintech-ui';

function App() {
  return (
    <SapliyProvider publishableKey="pk_test_...">
      <Checkout
        amount={2000}
        currency="USD"
        onSuccess={(payment) => console.log('Paid:', payment.id)}
        onError={(error) => console.error(error)}
      />
    </SapliyProvider>
  );
}
```

## Components

### SapliyProvider

Wrap your app to provide the API context:

```tsx
import { SapliyProvider } from '@sapliyio/fintech-ui';

<SapliyProvider 
  publishableKey="pk_test_..."
  apiUrl="https://api.yourdomain.com"  // optional, for self-hosted
>
  {children}
</SapliyProvider>
```

### PaymentForm

Secure card input component:

```tsx
import { PaymentForm } from '@sapliyio/fintech-ui';

<PaymentForm
  onSubmit={(paymentMethod) => {
    // paymentMethod.id can be used server-side
    console.log('Token:', paymentMethod.id);
  }}
  onError={(error) => console.error(error)}
  submitLabel="Pay Now"  // optional
/>
```

### Checkout

Complete checkout flow:

```tsx
import { Checkout } from '@sapliyio/fintech-ui';

<Checkout
  amount={5000}           // Amount in cents ($50.00)
  currency="USD"
  description="Pro Plan"  // optional
  metadata={{ plan: 'pro' }}  // optional
  onSuccess={(payment) => {
    console.log('Payment succeeded:', payment.id);
    // Redirect to success page
  }}
  onError={(error) => {
    console.error('Payment failed:', error.message);
  }}
/>
```

### TransactionTable

Display transaction history:

```tsx
import { TransactionTable } from '@sapliyio/fintech-ui';

<TransactionTable
  transactions={[
    {
      id: 'txn_123',
      amount: 2000,
      currency: 'USD',
      status: 'succeeded',
      description: 'Order #1234',
      createdAt: '2024-01-15T10:30:00Z'
    }
  ]}
  onRowClick={(txn) => console.log('Clicked:', txn.id)}
/>
```

## Theming

Customize with CSS variables:

```css
:root {
  --sapliy-primary: #6366f1;
  --sapliy-primary-hover: #4f46e5;
  --sapliy-success: #22c55e;
  --sapliy-error: #ef4444;
  --sapliy-border: #e5e7eb;
  --sapliy-radius: 8px;
  --sapliy-font: 'Inter', sans-serif;
}
```

Or use the theme prop:

```tsx
<SapliyProvider
  publishableKey="pk_test_..."
  theme={{
    primaryColor: '#6366f1',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif'
  }}
>
  {children}
</SapliyProvider>
```

## Security Model

> **Important**: This library uses **publishable keys only**.

- ✅ Safe to include in client-side code
- ✅ Tokens are created client-side, charged server-side
- ❌ Never exposes secret keys
- ❌ Cannot perform admin actions

Always confirm payments server-side using the secret key.

## Server-Side Confirmation

```tsx
// Client: Get payment method token
<PaymentForm
  onSubmit={async (pm) => {
    await fetch('/api/pay', {
      method: 'POST',
      body: JSON.stringify({ 
        paymentMethodId: pm.id,
        amount: 2000 
      })
    });
  }}
/>
```

```js
// Server (Node.js)
const { FintechClient } = require('@sapliyio/fintech');
const client = new FintechClient('sk_test_...');

app.post('/api/pay', async (req, res) => {
  const { paymentMethodId, amount } = req.body;
  
  const payment = await client.payments.create({
    amount,
    currency: 'USD',
    sourceId: paymentMethodId
  });
  
  res.json({ success: true, paymentId: payment.id });
});
```

## Part of Sapliy Fintech Ecosystem

- [fintech-ecosystem](https://github.com/Sapliy/fintech-ecosystem) — Core backend
- [fintech-sdk-node](https://github.com/Sapliy/fintech-sdk-node) — Node.js SDK
- [fintech-automation](https://github.com/Sapliy/fintech-automation) — Flow Builder

## License

MIT © [Sapliy](https://github.com/sapliy)
