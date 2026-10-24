# Housefest

The official web app for **DLSU Laguna Senior High School Housefest 2026**, where the four houses (Mutien, Benilde, Jaime and Miguel) compete across a series of games. It has two parts: a live scoreboard for the event and a merch store for the student council.

**Live site:** [housefest1.vercel.app](https://housefest1.vercel.app)

## Features

### Live scoreboard

- Overall house standings plus per-game results (wins, losses and points)
- Updates in real time for everyone watching, pushed through Pusher
- Admin controls for creating games and recording scores

### Merch store

- Product catalog with variants (such as size) and stock tracking
- Cart and checkout with Google sign-in
- Online payment through **PayMongo** (GCash, GrabPay, Maya and QR Ph), with a service fee that covers processing costs
- A signed PayMongo webhook confirms payments, marks orders paid and deducts stock in a single transaction
- "My orders" page where buyers can track orders and resume unpaid checkouts

### Admin dashboard

- Sign in with an admin Google account or the admin password; all admin API routes check this on the server
- Manage products, variants, stock and product images (stored on Vercel Blob)
- Record walk-in orders paid by cash, GCash, Maya, card or bank transfer
- Track order status from pending to paid to fulfilled
- Sales analytics with charts, and CSV export of orders

## Tech stack

- Next.js 15 (App Router), React 18 and TypeScript
- Prisma with PostgreSQL
- NextAuth.js with Google sign-in
- PayMongo for payments, Pusher for real-time updates, Vercel Blob for images
- Recharts for analytics
- Deployed on Vercel

## Getting started

Requires Node.js 18.18 or newer and a PostgreSQL database.

```bash
npm install
```

Create a `.env` file:

```bash
# Database
DATABASE_URL="postgresql://user:password@host/dbname"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a long random string"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
ADMIN_EMAILS="you@example.com"          # Google accounts with admin access (comma-separated)
ADMIN_PASSWORD="..."                    # alternative password login for the admin panel

# Real-time scoreboard
PUSHER_APP_ID="..."
PUSHER_KEY="..."
PUSHER_SECRET="..."
PUSHER_CLUSTER="ap1"
NEXT_PUBLIC_PUSHER_KEY="..."
NEXT_PUBLIC_PUSHER_CLUSTER="ap1"

# Payments
PAYMONGO_SECRET_KEY="sk_test_..."
PAYMONGO_WEBHOOK_SECRET="whsk_..."

# Image uploads
BLOB_READ_WRITE_TOKEN="..."
```

Set up the database and start the app:

```bash
npm run db:push
npm run dev
```

Open <http://localhost:3000>.

To test PayMongo webhooks locally, `npm run dev:all` starts the app, a Cloudflare tunnel and Prisma Studio together. Point a PayMongo test-mode webhook at the tunnel URL plus `/api/webhooks/paymongo`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run dev:all` | Dev server, Cloudflare tunnel and Prisma Studio together |
| `npm run build` | Generate the Prisma client and build for production |
| `npm run db:push` | Sync the database schema |
| `npm run db:studio` | Open Prisma Studio |

## Project structure

| Path | Contents |
| --- | --- |
| `src/app/page.tsx` | Live scoreboard |
| `src/app/store/` | Storefront, product pages, cart, checkout and orders |
| `src/app/admin/` | Admin dashboard |
| `src/app/api/` | Games, scores, products, orders, checkout and webhook endpoints |
| `src/components/` | Scoreboard, store and admin UI |
| `src/lib/` | Auth, PayMongo client, fees, order logic and Pusher setup |
| `prisma/schema.prisma` | Database schema |

## License

[GPL-3.0](COPYING)
