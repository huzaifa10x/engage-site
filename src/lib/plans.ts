import 'server-only';

/**
 * The live plan catalog, read from the product's API on the server.
 *
 * Nothing about plans is written into this website: names, prices, limits, features, the trial
 * length and the VAT rate all come from the API, which reads the same catalog that Super Admin
 * edits and that billing charges from. Change a plan there and this site follows within a minute.
 */

export type PlanFeature = {
    key: string;
    label: string;
    type: 'boolean' | 'limit' | 'metered' | 'config' | (string & {});
    unit: string | null;
    enabled: boolean;
    limit: number | null;
    unlimited: boolean;
    config: Record<string, unknown>;
};

export type Plan = {
    key: string;
    name: string;
    description: string | null;
    currency: string;
    price_monthly_minor: number | null;
    price_yearly_minor: number | null;
    custom_price: boolean;
    free: boolean;
    features: PlanFeature[];
};

export type Catalog = {
    trial: { plan_key: string; days: number };
    vat: { country: string; percent: number; inclusive: boolean };
    plans: Plan[];
};

const API = (process.env.ENGAGE_API_URL ?? 'https://app.10xdigital.ae/api/v1').replace(/\/+$/, '');

/** How long a fetched catalog is reused before the site asks the API again (seconds). */
export const CATALOG_REVALIDATE_SECONDS = 60;

/**
 * Returns the catalog, or null when the API cannot be reached. Pages must handle null (they show
 * a short "pricing is loading" state with a link to the app) rather than fall back to numbers
 * typed into this codebase, which could be wrong.
 */
export async function getCatalog(): Promise<Catalog | null> {
    try {
        const response = await fetch(`${API}/public/plans`, {
            headers: { Accept: 'application/json' },
            next: { revalidate: CATALOG_REVALIDATE_SECONDS, tags: ['catalog'] },
            signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) return null;
        const body = (await response.json()) as { data?: Catalog };

        return body.data && Array.isArray(body.data.plans) && body.data.plans.length > 0 ? body.data : null;
    } catch {
        return null;
    }
}

export const engageApiUrl = API;
