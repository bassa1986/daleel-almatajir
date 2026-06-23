/**
 * Shared fetch helper for the platform pricing scraper.
 *
 * Responsible behavior built in:
 *  - A descriptive User-Agent (so site operators can see who's hitting them
 *    and block/contact us if they object).
 *  - A minimum delay between requests to the same host (rate limiting).
 *  - A simple robots.txt check before fetching a page — if disallowed, we
 *    skip the platform and report it rather than fetching anyway.
 *  - Timeouts so a slow/dead site doesn't hang the whole job.
 *
 * IMPORTANT: This checks robots.txt mechanically (Disallow rules under our
 * User-Agent or '*'), but robots.txt is not the same as a site's Terms of
 * Service. Before enabling the scheduled GitHub Action, skim each target
 * platform's ToS for an anti-scraping clause. If a platform prohibits it,
 * remove that source file from scripts/scrape/sources/ and enter its
 * pricing manually in /admin instead.
 */

const USER_AGENT =
  'DaleelAlMatajirPricingBot/1.0 (+https://daleel-almatajir.com/about-bot; contact: admin@daleel-almatajir.com)';

const MIN_DELAY_MS = 2000; // minimum gap between requests to the same host
const FETCH_TIMEOUT_MS = 15000;

const lastRequestByHost = new Map<string, number>();
const robotsCache = new Map<string, string | null>();

function getHost(url: string): string {
  return new URL(url).host;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchRobotsTxt(url: string): Promise<string | null> {
  const host = getHost(url);
  if (robotsCache.has(host)) return robotsCache.get(host)!;

  try {
    const robotsUrl = `${new URL(url).origin}/robots.txt`;
    const res = await fetch(robotsUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const text = res.ok ? await res.text() : null;
    robotsCache.set(host, text);
    return text;
  } catch {
    robotsCache.set(host, null);
    return null;
  }
}

/** Very small robots.txt parser — checks Disallow rules under '*' and our UA. */
function isPathAllowed(robotsTxt: string, path: string): boolean {
  const lines = robotsTxt.split('\n').map((l) => l.trim());
  let relevant = false;
  const disallows: string[] = [];

  for (const line of lines) {
    if (/^user-agent:/i.test(line)) {
      const ua = line.split(':')[1]?.trim().toLowerCase();
      relevant = ua === '*' || ua === 'daleelalmatajirpricingbot';
      continue;
    }
    if (!relevant) continue;
    if (/^disallow:/i.test(line)) {
      const rule = line.split(':')[1]?.trim();
      if (rule) disallows.push(rule);
    }
  }

  return !disallows.some((rule) => rule !== '' && path.startsWith(rule));
}

export async function fetchHtml(
  url: string
): Promise<{ ok: true; html: string } | { ok: false; reason: string }> {
  const host = getHost(url);

  // 1. robots.txt check
  const robotsTxt = await fetchRobotsTxt(url);
  if (robotsTxt) {
    const path = new URL(url).pathname;
    if (!isPathAllowed(robotsTxt, path)) {
      return { ok: false, reason: `Disallowed by robots.txt: ${path}` };
    }
  }

  // 2. rate limit per host
  const last = lastRequestByHost.get(host) ?? 0;
  const wait = MIN_DELAY_MS - (Date.now() - last);
  if (wait > 0) await sleep(wait);
  lastRequestByHost.set(host, Date.now());

  // 3. fetch with timeout
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      return { ok: false, reason: `HTTP ${res.status} ${res.statusText}` };
    }

    return { ok: true, html: await res.text() };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, reason: `Fetch error: ${message}` };
  }
}
