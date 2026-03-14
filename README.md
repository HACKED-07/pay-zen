# PayZen

PayZen is a shared-expense workspace built with Next.js, Prisma, Auth.js, and Razorpay. It supports:

- email/password authentication
- automatic wallet provisioning on signup
- a starter group for tracking shared bills
- equal-split expense creation
- live settlement suggestions
- wallet top-ups through Razorpay Checkout
- wallet-to-wallet settlement execution inside the app

## Setup

1. Copy [`.env.example`](/Users/hrishikeshpatel/Desktop/Folder/projects/pay-zen/.env.example) to `.env` and fill in your values.
2. Run `npm install`.
3. Run `npx prisma migrate deploy`.
4. Run `npm run dev`.

## Razorpay

Set these variables to enable payments:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

Without them, the dashboard still works but the Razorpay checkout button stays disabled.

## End-to-End Flow

1. Register a user.
2. Log in.
3. Add funds to the wallet with Razorpay.
4. Add expenses to the group ledger.
5. Use the suggested settlement actions to transfer wallet balance between members.
