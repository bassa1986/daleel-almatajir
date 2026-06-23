# Platform Pricing Scraper

Automatically fetches pricing tiers from each platform's own public pricing
page and (optionally) updates the database.

## How it's triggered

1. **Scheduled** — runs automatically every Monday at 03:00 UTC via GitHub
   Actions (`.github/workflows/scrape-platforms.yml`). Change the cron
   expression there to adjust frequency.
2. **Manual** — go to your repo's **Actions** tab → **Scrape Platform
   Pricing** → **Run workflow** button. You'll see an `apply` checkbox.

## ⚠️ Safety model: dry-run by default

**Scheduled runs always dry-run** (fetch + parse + write a JSON report, but
never touch the database). This is intentional: if a platform redesigns
their pricing page, a broken CSS selector could otherwise silently write
wrong prices ($0, garbage numbers) into your live site with no human in the
loop. A scheduled job has no one watching it run.

**Manual runs** let you tick "apply" to actually write to the database —
but only after you've reviewed a recent dry-run report and are confident
the selectors are still accurate.

### Recommended workflow
1. Let the scheduled job run (or trigger manually with `apply: false`).
2. Go to the workflow run → download the **scrape-report** artifact.
3. Open the JSON, sanity-check the prices against the actual pricing pages.
4. If it looks right, trigger manually again with `apply: true`.

This is slightly more manual than "fully automatic," but for data that
visitors will make business decisions from (e.g. which e-commerce platform
to pay for), a wrong number is worse than a stale number.

## Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** in your repo and add:

| Secret | Value |
|---|---|
| `DATABASE_URL` | Your Neon pooled connection string |
| `DIRECT_URL` | Your Neon direct connection string |

(Same values as your local `.env` — see SETUP.md.)

## Running locally

```bash
npm run scrape:dry      # safe — writes scripts/scrape/output/*.json only
npm run scrape:apply    # writes to whichever DB your local .env points to
```

## What gets scraped

Only **pricing tiers** (monthly fee, transaction %, per-order fee) —
objective numbers from each platform's own pricing page. Editorial content
(descriptions, pros/cons, "best for" verdicts) is intentionally NOT
scraped — that stays manually curated in `/admin`, since it requires
judgment a scraper can't make.

**WooCommerce and PrestaShop are excluded** — both are free, open-source
software where the real cost is hosting + paid extensions, not a fixed
pricing tier. Their costs are modeled as `HiddenCost` scenarios
(minimal/typical/managed) and should stay manually curated; see
`prisma/seed.ts` for the existing structure.

## ⚠️ Before you rely on this in production

1. **Selectors are unverified placeholders.** I wrote `scripts/scrape/sources/*.ts`
   without live access to the actual pricing pages, so the CSS selectors are
   my best guess at typical pricing-card markup. **Open each source URL,
   inspect the real HTML, and update the selectors** in each file before
   trusting the output. Each file has a comment explaining what to check.
2. **Check each platform's Terms of Service** for an anti-scraping clause.
   `robots.txt` is checked automatically (the scraper skips any URL
   disallowed there), but ToS often goes further than robots.txt and isn't
   machine-checkable. If a platform prohibits scraping, remove its file from
   `scripts/scrape/sources/` and keep pricing manually updated in `/admin`
   instead.
3. **Shopify (and similar JS-heavy sites) may not render pricing into raw
   HTML.** If `npm run scrape:dry` reports "No pricing tiers parsed" for a
   source, the page likely loads pricing via client-side JavaScript, which
   a plain `fetch()` won't see. You'd need a headless browser (Playwright/
   Puppeteer) for that source instead — happy to add this if needed.
4. **Currency conversions are estimates.** Where a platform only publishes
   USD pricing, the scraper converts to SAR using a fixed ~3.75 rate and
   flags it in the `notes` field. This is not the platform's actual SAR
   price (if one exists) — verify and update the scraper if they publish
   one directly.

## Adding a new platform

1. Create `scripts/scrape/sources/<slug>.ts` following the pattern in
   `salla.ts`.
2. Import and add it to the `scrapers` array in `scripts/scrape/index.ts`.
3. Make sure a `Platform` row with the matching `slug` already exists in
   the database (create it in `/admin` first) — the scraper updates
   existing platforms' pricing tiers, it doesn't create new platforms.
