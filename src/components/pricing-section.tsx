import { Button } from '@/components/ui';
import { app, appHost } from '@/config/site';
import { getCatalog } from '@/lib/plans';
import { bestYearlySaving } from '@/lib/pricing';

import { PricingPlans } from './pricing-plans';

/**
 * Fetches the live catalog on the server and renders the plan cards. When the API cannot be
 * reached, it says so and points at the app instead of showing numbers that might be wrong.
 */
export async function PricingSection({ compact = false }: { compact?: boolean }) {
    const catalog = await getCatalog();

    if (!catalog) {
        return (
            <div className="mx-auto max-w-xl rounded-2xl border border-line bg-paper p-8 text-center shadow-card">
                <h3 className="text-xl font-semibold">Pricing is taking a moment to load</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    We could not reach the plan catalog just now. Please refresh in a minute, or see current plans after signing in at {appHost}.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button href="/start">Start free trial</Button>
                    <Button href={app.signIn} variant="outline">
                        Sign in
                    </Button>
                </div>
            </div>
        );
    }

    const currency = catalog.plans.find((p) => !p.custom_price)?.currency ?? 'USD';

    return (
        <>
            <PricingPlans catalog={catalog} saving={bestYearlySaving(catalog.plans)} compact={compact} />
            <p className="mx-auto mt-8 max-w-3xl text-center text-[13.5px] leading-relaxed text-muted">
                Prices in {currency}. {catalog.vat.percent > 0 && `UAE VAT (${catalog.vat.percent}%) is added where applicable. `}
                WhatsApp message fees are charged by Meta at its published rates; <strong className="font-semibold text-ink">we add 0% markup</strong>.
            </p>
        </>
    );
}
