```
███████╗ █████╗ ██████╗ ██╗     ██╗   ██╗ ██╗   ██╗
██╔════╝██╔══██╗██╔══██╗██║     ██║   ██║ ╚██╗ ██╔╝
███████╗███████║██████╔╝██║     ██║   ██║  ╚████╔╝
╚════██║██╔══██║██╔══██╗██║     ██║   ██║   ╚██╔╝
███████║██║  ██║██║  ██║███████╗╚██████╔╝    ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝     ╚═╝
```

# @sapliyio/fintech-ui

React component library for the Sapliy AI-Native Financial Operations Platform.

> **Sapliy is an AI-native Financial Operations Intelligence Layer that turns business goals into reliable, explainable, auditable financial outcomes — by orchestrating the systems companies already run (Stripe, PayPal, Paddle, HubSpot, Xero), not replacing them.**

| Badge | |
|---|---|
| Package | [`@sapliyio/fintech-ui`](https://www.npmjs.com/package/@sapliyio/fintech-ui) |
| Version | `1.1.0` |
| License | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) |
| Build | [![npm version](https://badge.fury.io/js/%40sapliyio%2Ffintech-ui.svg)](https://badge.fury.io/js/%40sapliyio%2Ffintech-ui) |
| Peer deps | React `^18 \|\| ^19` |

> **Legacy package name:** `@sapliyio/fintech-ui` is the published name, kept for compatibility with the platform's fintech heritage. It is the official Sapliy React component library.

---

## What is this?

The **official React component library** for building Sapliy-powered financial UIs. It ships two families of components:

- **Foundation & playbook UI** — `Button`, `Card`, `Badge`, `Alert`, `Input`, `Spinner`, plus the human-in-the-loop building blocks of the Sapliy console: `ConfidenceBadge`, `IntentPreviewCard`, and `DecisionRow`.
- **Payment experiences** — `PaymentForm`, `Checkout`, and `TransactionTable` for lightweight, self-contained checkout flows.

Everything is themed via CSS variables and consumed through a single `SapliyProvider` context.

## Key features

- **Playbook components** — `ConfidenceBadge`, `IntentPreviewCard`, `DecisionRow` render the AI-native explainability layer (confidence gradients, intent previews, audit decisions)
- **Payment components** — `Checkout`, `PaymentForm`, `TransactionTable` for embeddable payment UX
- **Foundation kit** — `Button`, `Card`, `Badge`/`StatusBadge`, `Alert`, `Input`, `Spinner`/`LoadingOverlay`, `Dialog`, `ZoneSelector`
- **Theming** — CSS variables (`sapliy.css`) or a `styles` config object on the provider
- **TypeScript** — full type definitions included
- **Storybook** — component playground included

## Install

```bash
npm install @sapliyio/fintech-ui
# or
yarn add @sapliyio/fintech-ui
```

Import the theme CSS once (optional):

```css
@import '@sapliyio/fintech-ui/styles.css';
```

## Quickstart

```tsx
import { SapliyProvider, Card, Button, ConfidenceBadge } from '@sapliyio/fintech-ui';

function App() {
  return (
    <SapliyProvider config={{ apiKey: 'sk_test_...' }}>
      <Card padding="md">
        <CardHeader title="Revenue Recovery" subtitle="Dunning playbook status" />
        <CardBody>
          <ConfidenceBadge value={0.84} showValue />
          <Button onClick={() => alert('Run playbook')}>Run Playbook</Button>
        </CardBody>
      </Card>
    </SapliyProvider>
  );
}
```

> **Note:** `SapliyProvider` takes a `config` object (`{ apiKey, baseURL?, styles? }`) — there is no `publishableKey` prop.

## Components

### SapliyProvider

Wraps your app and provides the Sapliy configuration context via `useSapliy()`:

```tsx
import { SapliyProvider } from '@sapliyio/fintech-ui';

<SapliyProvider
  config={{
    apiKey: 'sk_test_...',          // required
    baseURL: 'https://api.sapliy.io', // optional
    styles: {
      primaryColor: '#6366f1',
      borderRadius: '8px',
      fontFamily: 'Inter, sans-serif'
    }
  }}
>
  {children}
</SapliyProvider>
```

### Playbook components

`ConfidenceBadge` — the AI-confidence gradient indicator:

```tsx
import { ConfidenceBadge, confidenceToLevel } from '@sapliyio/fintech-ui';

<ConfidenceBadge value={0.84} showValue size="md" />   // "High · 84%"
<ConfidenceBadge level="low" />
confidenceToLevel(0.9); // 'high'
```

`IntentPreviewCard` — shows what a goal maps to *before* anything executes:

```tsx
import { IntentPreviewCard } from '@sapliyio/fintech-ui';

<IntentPreviewCard
  intent="Recover failed subscription payments"
  confidence={0.9}
  risk="medium"
  steps={[
    { id: 's1', title: 'Create Payment Intent', description: 'Amount $19.90', risk: 'low', confidence: 0.95 },
    { id: 's2', title: 'Schedule Dunning Retry', description: 'First retry at ~5h, then days 3/5/7', risk: 'medium', confidence: 0.84 },
  ]}
/>
```

`DecisionRow` — a single audit decision (action + reason + policy + confidence):

```tsx
import { DecisionRow } from '@sapliyio/fintech-ui';

<DecisionRow
  eventType="payment.failed"
  action="schedule_retry"
  reason="First retry in 4–6h (~22% recovery expected)"
  policy="dunning-policy"
  status="executed"
  confidence={0.82}
  timestamp="2026-08-19T10:30:00Z"
/>
```

### Foundation components

`Button` — variants `primary | secondary | outline | ghost | danger`, sizes `sm | md | lg`:

```tsx
<Button variant="primary" size="lg" isLoading onClick={handleApprove}>
  Approve
</Button>
```

`Card` — `Card`, `CardHeader`, `CardBody`, `CardFooter` with `variant` / `padding` / `rounded`:

```tsx
<Card variant="elevated" padding="lg">
  <CardHeader title="Balance" subtitle="Across all zones" action={<Badge>Live</Badge>} />
  <CardBody>{/* content */}</CardBody>
  <CardFooter align="between">{/* actions */}</CardFooter>
</Card>
```

`Badge` / `StatusBadge` — status and risk indicators:

```tsx
<Badge variant="success" dot>Succeeded</Badge>
<StatusBadge status="failed" />
```

Also exported: `Alert`, `Input`, `Spinner` / `LoadingOverlay`, `Dialog`, `ZoneSelector`.

### Payment components

`Checkout` — a complete review → pay → success flow:

```tsx
import { Checkout } from '@sapliyio/fintech-ui';

<Checkout
  amount={5000}             // amount in cents ($50.00)
  currency="USD"
  productName="Pro Plan"
  onSuccess={(payment) => console.log('Paid:', payment)}
  onError={(error) => console.error(error)}
/>
```

`PaymentForm` — card form backed by the configured `apiKey`/`baseURL`:

```tsx
import { PaymentForm } from '@sapliyio/fintech-ui';

<PaymentForm
  amount={2000}
  currency="USD"
  title="Order #1234"
  onSuccess={(response) => console.log('Payment:', response)}
  onError={(error) => console.error(error)}
/>
```

`TransactionTable` — transaction history display:

```tsx
import { TransactionTable } from '@sapliyio/fintech-ui';

<TransactionTable
  transactions={[{ id: 'txn_123', amount: 2000, currency: 'USD', status: 'succeeded', description: 'Order #1234', createdAt: '2026-08-19T10:30:00Z' }]}
  onRowClick={(txn) => console.log('Clicked:', txn.id)}
/>
```

## Operational Playbooks

The playbook-facing components are built for the three MVP playbooks and the console's human-in-the-loop flow:

- **Revenue Recovery & Dunning** — surface retry schedules and recovery confidence with `IntentPreviewCard` + `ConfidenceBadge`
- **Refund & Invoice Orchestration** — render policy-gated refund/invoice decisions with `DecisionRow` (status: `executed | pending | blocked | denied`)
- **Audit Decision Log** — render immutable, explainable decisions (action + reason + policy applied) as decision rows

Combine them with `Button`/`Card` to build approval centers, playbook dashboards, and audit log views.

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

Or via the `styles` config on the provider (see `SapliyProvider` above).

## Development

```bash
npm run build        # tsup + tailwindcss
npm run test         # vitest run
npm run test:coverage
npm run lint         # eslint src --ext .ts,.tsx
npm run typecheck    # tsc --noEmit
npm run storybook    # storybook dev -p 6006
```

## Part of the Sapliy platform

- [`sapliy-ecosystem`](https://github.com/Sapliy/sapliy-ecosystem) — core backend, playbook engine, policy & audit engines
- [`sapliy-sdk-node`](https://github.com/Sapliy/sapliy-sdk-node) — Node.js SDK (`@sapliyio/fintech`)
- [`sapliy-automation`](https://github.com/Sapliy/sapliy-automation) — Sapliy console (prompt-first goal UI, playbooks dashboard)
- [`sapliy-testing`](https://github.com/Sapliy/sapliy-testing) — shared test kit, playbook fixtures & mocks
- Docs — [docs.sapliy.io](https://docs.sapliy.io)

## License

MIT © [Sapliy](https://github.com/sapliy)