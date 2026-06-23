# دليل المتاجر (Daleel Al-Matajir)

Arabic E-Commerce Platform Intelligence Hub — Next.js 15 (App Router) + Tailwind CSS 4 +
TypeScript + Prisma/PostgreSQL.

## ⚠️ Build status

This package contains **Steps 1–4** of the master build plan:

- ✅ Step 1 — Prisma schema + seed data (all 6 platforms, pricing tiers, hidden costs, feature matrix)
- ✅ Step 2 — Calculator engine (`lib/calculator/`) + `useCalculator` hook
- ✅ Step 3 — Design system (`app/globals.css`, Cairo font, dark glass theme)
- ✅ Step 4 — Homepage (all 7 sections)

Routes for `/مقارنات`, `/حاسبة-التكاليف`, `/أدلة`, `/admin/*`, etc. are included as
**functional but visually simplified stubs** so the site builds and deploys cleanly end
to end (no 404s/500s from nav links or the sitemap). The full interactive versions of
these pages (full calculator UI, head-to-head VS pages, Tiptap article editor, platform
manager, etc.) are Steps 5–14 of the build plan and are not yet implemented.

## Quick Start

### 🪟 Windows Users
**Easiest way:** Read **SETUP.md** (in this repo) for a complete step-by-step guide.  
Or just double-click `run-local.bat` in the project folder and it will handle everything.

The script handles:
- Installing dependencies
- Setting up `.env` with your database credentials
- Running migrations
- Seeding the database
- Starting the dev server

All you need is your Neon connection strings (see SETUP.md).

### 🐧 Mac / Linux Users
Follow the manual steps below:

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` with your database connection strings:

```bash
# Pooled connection (for the app to use at runtime)
DATABASE_URL="postgresql://neondb_owner:PASSWORD@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
# Direct connection (for migrations only)
DIRECT_URL="postgresql://neondb_owner:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

> Get these strings from your Neon console at https://console.neon.tech

## 3. Set up the database

```bash
npx prisma generate   # generates Prisma Client
npx prisma db push    # creates tables from prisma/schema.prisma
npm run db:seed       # seeds the 6 platforms, pricing tiers, features, etc.
```

## 4. Run locally

```bash
npm run dev
```

Visit http://localhost:3000  
Admin dashboard: http://localhost:3000/admin (local-only)

## 5. Build for production

```bash
npm run build
npm start
```

`npm run build` automatically runs `prisma generate` first, so the Prisma Client is always present before Next.js compiles.

> **Build-time database requirement:** several pages query the database at build time, so `DATABASE_URL` must point to a reachable, seeded database before running `npm run build` — always run setup steps first.

## 6. Windows / PowerShell notes

- **For Windows users setting up locally:** use the `run-local.ps1` PowerShell script or double-click `run-local.bat` instead of manual steps. See **SETUP.md** for details.
- `next/font/google` (Cairo font) downloads font files from Google Fonts at build time — make sure the machine running `npm run build` has internet access.
- If `npm install` reports peer-dependency conflicts, retry with `npm install --legacy-peer-deps`.
- `npx prisma studio` opens a local browser GUI for inspecting/editing database records.

## 7. Deploying (e.g. Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project into Vercel (or your host of choice).
3. Set these environment variables in your deployment settings:
   - `DATABASE_URL` — pooled connection string (for the live app)
   - `DIRECT_URL` — direct connection string (for migrations)
   
   Both are provided by your database host (e.g., Neon). See SETUP.md for details.
4. Ensure your PostgreSQL database is reachable from the deployment environment.
5. Run `npx prisma db push && npx prisma db seed` once against the production
   database (locally, pointed at the prod URLs, or via a one-off job).
6. Deploy. The build command `npm run build` and start command `npm start` work
   out of the box.

## Project structure

```
app/                    Next.js App Router routes (RTL public site + LTR /admin)
components/
  layout/               Site header & footer
  home/                  Homepage section components
  ui/                    Shared UI primitives (StarRating, etc.)
  theme-provider.tsx     next-themes wrapper (dark-only)
lib/
  calculator/            Pure calculator engine + types + PDF export
  hooks/                 useCalculator, useDebounce
  data/                  Prisma data-access helpers
  actions/               Server actions (newsletter subscribe)
  design/tokens.ts        JS-side color tokens
  db.ts                   Prisma client singleton
  fonts.ts                Cairo font loader
  cn.ts                   Tailwind class-merge helper
prisma/
  schema.prisma           Database schema
  seed.ts                  Seed data for all 6 platforms
tsconfig.seed.json          ts-node config for `prisma db seed` (Windows-safe)
middleware.ts              Blocks /admin/* routes in production (local-only access)
run-local.ps1              PowerShell setup script for Windows users
run-local.bat              Batch wrapper for the PowerShell script
```

## Known issues / not-yet-built links

These are expected given the current build status (Steps 1–4) — not bugs to debug:

- **VS comparison pages** (`/مقارنات/salla-vs-zid` and the other 14 pairs) currently resolve to a simplified stub. The full head-to-head comparison UI is Step 7.
- **`/admin/articles/new` and `/admin/articles/[id]`** (linked from the admin dashboard) are 404 until the Tiptap article editor (Step 10) is built.

## Design system

- Dark-only theme: background `#0A0F1E`, glass panels (`bg-white/5 backdrop-blur border-white/10`), accents `#3B82F6` (primary) / `#06B6D4` (secondary).
- Typeface: Cairo (Arabic + Latin), loaded via `next/font/google`.
- Public site is `dir="rtl"` (served to the internet); `/admin` is `dir="ltr"` with a dark sidebar (`#0F1629`, local-only, never deployed).
- See `app/globals.css` for the full `@theme` token set and shared component classes (`.glass`, `.btn-primary`, `.badge-*`, `.figure`, `.mesh-gradient`, etc.)

## Calculator engine

`lib/calculator/engine.ts` exports `calculatePlatformCosts(inputs, platforms)` —
a pure function implementing tier resolution, Shopify's cost-minimizing tier
selection, WooCommerce hidden-cost scenarios (minimal/typical/managed), the
Magento revenue-threshold warning, and tier-upgrade warnings. See
`lib/hooks/useCalculator.ts` for the React integration (debounced inputs,
memoized output).
