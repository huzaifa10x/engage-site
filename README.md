# 10X Engage: marketing website

The public website for 10X Engage. A separate Next.js project from the product
(`engage-web`, at app.10xdigital.ae) and its API (`engage-backend`).

## How it connects to the product

| What | How |
|---|---|
| Pricing (plans, prices, limits, features, trial length, VAT) | Read on the server from `GET {ENGAGE_API_URL}/public/plans`, refreshed every minute. Nothing about plans is hard-coded here. |
| Start free trial | `/start` collects the work email, then continues in the product's sign-up at `{APP_URL}/register?plan=…&interval=…&email=…`. |
| Demo and contact forms | Posted to this site's `/api/lead`, which forwards to `POST {ENGAGE_API_URL}/public/leads`. The lead is stored and emailed to sales. |
| Sign in | Links to `{APP_URL}/login`. |

## Run it

```bash
cp .env.example .env.local     # set ENGAGE_API_URL to a running API
npm install
npm run dev                    # http://localhost:3100
```

Checks: `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`.

## Where things live

```
content/legal/        Policy pages as Markdown (one file per policy; the file sets its URL)
scripts/              import-policies.mjs: builds content/legal from the policy document
src/config/site.ts    Names, addresses, navigation, footer links, links into the product
src/content/          Page copy that is data (FAQs)
src/lib/plans.ts      The plan catalog client (server only)
src/lib/pricing.ts    How catalog values are worded, ordered and grouped
src/lib/legal.ts      Reads the policy files
src/components/       Shared building blocks (ui.tsx) and sections
src/app/              One folder per page
```

### Add a page
Create `src/app/<name>/page.tsx`, add it to `mainNav` or `footerNav` in `src/config/site.ts`
and to `PAGES` in `src/app/sitemap.ts`.

### Add or change a policy
Export the policy document from Google Docs (File → Download → Markdown), then:

```bash
npm run policies:import -- path/to/10X-Engage-Policy-Pages.md
```

Each policy in the document starts with its title, `Last updated: …` and `Url: /…`.
The page is served at exactly that Url and is added to the footer, `/legal` and the sitemap.

### Change what a plan card shows
The values come from the API. The order of the lines on a card is `CARD_FEATURE_ORDER`
and the groups of the comparison table are `GROUPS`, both in `src/lib/pricing.ts`.

## Deploy
Built as a Docker image (`Dockerfile`, standalone output, port 3100) and run by the same
Compose file as the product. On the server: `bash /opt/engage/backend/deploy/deploy.sh site`.
