# EcoXchange - Digital Product Passport Platform

**The digital identity infrastructure for physical products.**

Every product gets a persistent DPP (Digital Product Passport) — tracking its ownership, repairs, condition, and resale history forever via a QR code that never changes.

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd ecoxchange
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your values in `.env.local`:

| Variable | Where to Get |
|----------|-------------|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection String (Transaction mode) |
| `DIRECT_URL` | Supabase → Project Settings → Database → Connection String (Session mode) |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API |

### 3. Set Up Database

```bash
# Push schema to Supabase
npm run db:push

# Seed with demo data (5 users, 8 products)
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## Demo Credentials

After seeding:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@ecoxchange.in` | `password123` |
| User | `rahul@dtu.ac.in` | `password123` |
| User | `priya@nsut.ac.in` | `password123` |
| User | `arjun@dtu.ac.in` | `password123` |

---

## 📋 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/sign-in` | Authentication |
| `/sign-up` | Registration |
| `/activate/[dppId]` | QR Activation flow |
| `/passport/[dppId]` | Product Passport (public) |
| `/marketplace` | Verified marketplace feed |
| `/transfer/[dppId]` | Ownership transfer |
| `/dashboard` | User's products |
| `/profile` | User profile |
| `/admin` | Admin dashboard |

---

## 🔗 Test DPP Passport URLs

After seeding, these product passports will be live:

- `http://localhost:3000/passport/ECO-LPT-2024-A8X3K9PQ` (MacBook Pro)
- `http://localhost:3000/passport/ECO-PHN-2024-B2Y7M1NR` (Samsung Galaxy)
- `http://localhost:3000/passport/ECO-GCN-2023-C5W4L8TS` (PlayStation 5)

---

## 🏗️ Architecture

```
ecoxchange/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth pages)        # sign-in, sign-up
│   │   ├── activate/[dppId]    # QR Activation
│   │   ├── passport/[dppId]    # Product Passport
│   │   ├── marketplace/        # Marketplace
│   │   ├── transfer/[dppId]    # Ownership Transfer
│   │   ├── dashboard/          # User Dashboard
│   │   ├── admin/              # Admin Dashboard
│   │   └── api/                # API Routes
│   │       ├── auth/           # NextAuth
│   │       ├── products/       # Product endpoints
│   │       ├── marketplace/    # Listing endpoints
│   │       ├── transfer/       # Transfer endpoints
│   │       ├── repairs/        # Repair log endpoints
│   │       ├── user/           # User endpoints
│   │       └── admin/          # Admin endpoints
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   └── providers/          # AuthProvider
│   ├── lib/
│   │   ├── prisma.ts           # DB client
│   │   ├── auth.ts             # NextAuth config
│   │   ├── server-auth.ts      # Server-side session
│   │   ├── qr.ts               # QR generation (PNG + SVG)
│   │   ├── supabase.ts         # Storage client
│   │   └── utils.ts            # Utilities
│   ├── types/
│   │   └── next-auth.d.ts      # Auth type augmentation
│   └── middleware.ts           # Route protection
├── prisma/
│   ├── schema.prisma           # DB schema (8 tables)
│   └── seed.ts                 # Demo data seed
└── prisma.config.ts            # Prisma v7 config
```

---

## 🗃️ Database Schema

| Table | Purpose |
|-------|---------|
| `users` | User accounts with trust scores |
| `accounts` | NextAuth OAuth/credentials accounts |
| `sessions` | NextAuth sessions |
| `products` | Product DPPs with QR, status, scores |
| `ownership_history` | Append-only ownership ledger |
| `repair_logs` | Repair events with costs |
| `product_documents` | Invoice/warranty uploads |
| `marketplace_listings` | Resale listings |
| `transfer_requests` | Pending ownership transfers |
| `admin_actions` | Admin audit log |

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/products/activate?dppId=` | Get product for activation |
| POST | `/api/products/activate` | Activate product |
| PUT | `/api/products/activate` | Admin: generate QR + DPP |
| GET | `/api/products/[dppId]` | Full product passport data |
| GET | `/api/marketplace` | Public marketplace feed |
| POST | `/api/marketplace` | Create listing |
| POST | `/api/transfer` | Initiate transfer request |
| PATCH | `/api/transfer` | Confirm/cancel transfer |
| POST | `/api/repairs/log` | Log repair |
| GET | `/api/repairs/log?dppId=` | Get repair history |
| GET | `/api/user/products` | Current user's products |
| GET | `/api/admin/stats` | Platform statistics |
| GET | `/api/admin/products` | All products (admin) |
| PATCH | `/api/admin/products` | Verify/flag product |

---

## 🚀 Deployment (Vercel + Supabase)

### 1. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### 2. Set Environment Variables in Vercel

Go to Vercel → Project → Settings → Environment Variables and add all variables from `.env.local.example`.

### 3. Run Migration on Production DB

```bash
DATABASE_URL="<your-supabase-url>" npx prisma db push
DATABASE_URL="<your-supabase-url>" npm run db:seed
```

### 4. Set Supabase Storage Buckets

In Supabase Dashboard → Storage, create these public buckets:
- `product-documents`
- `qr-codes`
- `avatars`

---

## 🧱 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, custom design system
- **Auth**: NextAuth.js v4 (credentials provider)
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma v7
- **Storage**: Supabase Storage
- **QR**: `qrcode` library (PNG + SVG + branded stickers)
- **Icons**: Lucide React

---

## 📝 Notes

- QR codes encode `ecoxchange.in/activate/[DPP-ID]`  
- Same QR persists forever — even after ownership transfers  
- Trust score calculated from: verified invoice + admin check + repair transparency + ownership count  
- Ownership history is append-only — nothing can be deleted
"# testing_env" 
