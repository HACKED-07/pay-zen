# Pay Zen

Pay Zen is a shared-expense workspace built with Next.js, Prisma, Auth.js (NextAuth Beta), and Stripe. Designed with a Neo-Brutalist aesthetic, it supports:

- **Authentication**: Email/password and Google OAuth
- **Automatic Setup**: Wallet provisioning on signup, with a starter group for tracking shared bills
- **Expense Tracking**: Equal-split expense creation and group ledgers
- **Live Settlements**: Settlement suggestions between group members
- **Wallet and Payments**: Wallet top-ups through Stripe Checkout, and wallet-to-wallet settlement execution directly inside the app
- **Notifications**: Email notifications (integrated via Resend)

## Setup

1. Copy `.env.example` to `.env` and fill in your values.
2. Run `npm install` to install dependencies.
3. Run `npm run prisma:generate` to generate the Prisma client.
4. Run `npm run prisma:migrate:deploy` to apply the database migrations.
5. Run `npm run dev` to start the development server.

## Environment Variables

In addition to your Postgres database (`DATABASE_URL`) and NextAuth setup (`AUTH_SECRET`), Pay Zen optionally uses the following services:

### Stripe Checkout
Set these variables to enable wallet top-ups:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

*(Without them, the dashboard still works but top-ups via Stripe will be disabled or fail.)*

### Google OAuth
To use Google for login, set:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Email Notifications
Used for various application emails via Resend:
- `RESEND_API_KEY`

## End-to-End Flow

1. Register a user (via Email or Google Auth).
2. Log in to the dashboard.
3. Top up the wallet using Stripe.
4. Add expenses to the group ledger.
5. Review the suggested settlement actions to seamlessly transfer wallet balance between members.
