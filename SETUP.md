# 🚀 Local Development Setup — Windows

This guide walks you through running the Daleel Al-Matajir site locally on your Windows machine.

## Prerequisites

You need:
- **Node.js 18+** — Download from https://nodejs.org/ (choose LTS)
- **PostgreSQL Database Access** — You should have the connection strings from Neon:
  - `DATABASE_URL` (pooled connection, for the app)
  - `DIRECT_URL` (direct connection, for migrations)

## Quick Start (Easiest)

### Option A: Double-Click (No PowerShell needed)

1. Open Windows File Explorer
2. Navigate to the project folder
3. **Double-click `run-local.bat`**
4. Follow the prompts on screen
5. The site will open at http://localhost:3000

### Option B: PowerShell (If .bat doesn't work)

1. Open PowerShell (Windows key → type `PowerShell` → Enter)
2. Navigate to the project folder:
   ```powershell
   cd C:\path\to\daleel-almatajir
   ```
3. Run the setup script:
   ```powershell
   .\run-local.ps1
   ```
4. Follow the prompts
5. The site will open at http://localhost:3000

## First Time Setup: Step-by-Step

### Step 1: Clone or Extract the Project

Make sure you have the project folder on your machine. The folder should contain:
- `package.json`
- `next.config.ts`
- `run-local.ps1` and `run-local.bat` (these files)

### Step 2: Configure Your Database

The script will create a `.env` file from `.env.example` if it doesn't exist.

**Edit `.env` with your credentials:**

```bash
# Database connections from Neon
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-soft-scene-asu7agts-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-soft-scene-asu7agts.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Admin credentials (optional, only used if you restore web-based login later)
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD_HASH=""
```

**Replace `YOUR_PASSWORD` with your actual Neon password.**

### Step 3: Run the Setup Script

Double-click `run-local.bat` or run the PowerShell command above.

The script will:
1. ✓ Check that Node.js is installed
2. ✓ Create `.env` if needed (and wait for you to fill it in)
3. ✓ Install npm packages
4. ✓ Generate Prisma Client
5. ✓ Push the database schema
6. ✓ Seed the database with initial data
7. ✓ Start the development server

### Step 4: Access Your Site

Once running, open your browser:

- **Public site:** http://localhost:3000
- **Admin dashboard:** http://localhost:3000/admin
  - Articles, platforms, subscribers, settings — all managed here
  - This is **local-only**, not accessible on the internet

## Using the Admin Dashboard

### Manage Content

While the dev server is running, visit http://localhost:3000/admin to:
- Create/edit platforms (Salla, Shopify, Zid, etc.)
- Create/edit comparison pages
- Create/edit guides/articles
- View subscribers
- Manage affiliate links
- Change site settings

### Make Changes Go Live

Since your local admin is connected to your **production database**, any changes you make in `/admin` appear on the live public site immediately. There's no "deploy" step — it's instant.

## Troubleshooting

### Node.js is installed but the script can't find it

**Solution:** Restart PowerShell or Command Prompt after installing Node.js, so it picks up the new PATH.

### `npm install` fails

**Solution:** Try clearing npm cache:
```powershell
npm cache clean --force
npm install
```

### Database connection fails ("can't reach database")

**Check:**
1. Is `DATABASE_URL` in your `.env` correct?
2. Can you reach the database from your network? (Some corporate networks/VPNs block outbound database connections)
3. If using Neon, is the IP allowlist configured? (In Neon console, check project Security settings)

### `Prisma db push` fails

Usually means the database URL is wrong or unreachable. Double-check `.env`:
```bash
echo $env:DATABASE_URL  # PowerShell
# or
echo %DATABASE_URL%    # Command Prompt
```

If the output is empty or looks wrong, the `.env` file isn't being read.

### Port 3000 is already in use

**Solution:** The script will fail with a port error. Either:
- Close the other app using port 3000, or
- Edit `package.json` and change the dev script:
  ```json
  "dev": "next dev -p 3001"
  ```
  Then run again — site will be at http://localhost:3001

### Still stuck?

Check the full error message and share it. Common issues:
- Node.js version too old (need 18+)
- `.env` file not set up correctly
- Database unreachable or credentials wrong

## Advanced: Skipping Steps

If you've already set things up once, you can skip parts:

```powershell
# Skip npm install (reuse existing node_modules)
.\run-local.ps1 -SkipInstall

# Skip database seeding (don't re-populate demo data)
.\run-local.ps1 -SkipSeed

# Both
.\run-local.ps1 -SkipInstall -SkipSeed
```

## Stopping the Dev Server

Press **Ctrl+C** in the PowerShell/Command Prompt window where the server is running.

## Notes

- The dev server automatically reloads when you save files — no need to restart
- The admin dashboard (`/admin`) is **only accessible locally** — it returns a 404 in production to keep it private
- Changes to the database show on the live site immediately (no separate deploy needed)
- To manage the site from a different computer, you'd need to either:
  - Copy the project folder to that machine and run the script again, or
  - Set up remote admin access (would require adding back the login system)

---

**Questions?** Check the main README.md for more details about the project structure.
