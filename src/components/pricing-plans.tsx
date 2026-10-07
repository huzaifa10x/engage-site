'use client';

import { CheckIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui';
import type { Interval } from '@/config/site';
import { cardFeatures, formatMoney, monthlyEquivalent } from '@/lib/pricing';
import type { Catalog, Plan } from '@/lib/plans';
import { cn } from '@/lib/utils';

/** Where each plan's button goes. Decided by what the plan IS in the catalog, not by its name. */
function action(plan: Plan, interval: Interval, catalog: Catalog): { label: string; href: string; note: string } {
    if (plan.custom_price) return { label: 'Talk to us', href: '/demo?topic=enterprise', note: 'Tailored to your team' };
    if (plan.free) return { label: 'Start free', href: `/start?plan=${plan.key}`, note: 'Free forever' };

    return {
        label: `Start ${catalog.trial.days}-day free trial`,
        href: `/start?plan=${plan.key}&interval=${interval}`,
        note:
            interval === 'yearly' && plan.price_yearly_minor !== null
                ? `${formatMoney(plan.price_yearly_minor, plan.currency)} billed yearly`
                : 'Billed monthly',
    };
}

/**
 * Plan cards with a monthly / yearly switch. Every name, price, limit and feature shown here is
 * the `catalog` prop, which the page fetched from the product's API.
 *
 * On phones the cards form one swipeable row that opens on the trial plan, so comparing plans
 * does not mean scrolling through five full screens. From tablets up they are a grid.
 */
export function PricingPlans({ catalog, saving, compact = false }: { catalog: Catalog; saving: number; compact?: boolean }) {
    const [interval, setInterval] = useState<Interval>('monthly');
    const plans = catalog.plans;
    const hasYearly = plans.some((p) => p.price_yearly_minor);
    // The plan the trial runs on is the one worth pointing at; its button is the only lime one.
    const featured = plans.find((p) => p.key === catalog.trial.plan_key && !p.custom_price)?.key ?? null;

    const row = useRef<HTMLDivElement>(null);
    const featuredCard = useRef<HTMLElement>(null);
    useEffect(() => {
        const track = row.current;
        const card = featuredCard.current;
        // Only when the row actually scrolls sideways (phones).
        if (track && card && track.scrollWidth > track.clientWidth + 8) {
            track.scrollLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        }
    }, []);

    return (
        <div>
            {hasYearly && (
                <div className="flex justify-center">
                    <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-paper p-1 shadow-card">
                        {(['monthly', 'yearly'] as const).map((value) => (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={interval === value}
                                onClick={() => setInterval(value)}
                                className={cn(
                                    'min-h-10 rounded-full px-4 text-[14.5px] font-semibold transition-colors sm:px-5',
                                    interval === value ? 'bg-ink text-white' : 'text-muted hover:text-ink',
                                )}
                            >
                                {value === 'monthly' ? 'Monthly' : 'Yearly'}
                                {value === 'yearly' && saving > 0 && (
                                    <span
                                        className={cn(
                                            'ml-2 rounded-full px-2 py-0.5 text-[11.5px]',
                                            interval === 'yearly' ? 'bg-lime text-lime-ink' : 'bg-brand-100 text-brand-600',
                                        )}
                                    >
                                        Save {saving}%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <p className="mt-5 text-center text-[13px] text-muted sm:hidden">Swipe to compare plans →</p>

            <div
                ref={row}
                className={cn(
                    // Phones: one snapping row that bleeds to the screen edges.
                    '-mx-5 mt-3 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pt-4 pb-4 [&::-webkit-scrollbar]:hidden',
                    // Tablets and up: a grid.
                    'sm:mx-0 sm:mt-10 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0',
                    plans.length >= 5 ? 'lg:grid-cols-3 xl:grid-cols-5' : plans.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
                )}
            >
                {plans.map((plan) => {
                    const price = monthlyEquivalent(plan, interval);
                    const cta = action(plan, interval, catalog);
                    const isFeatured = plan.key === featured;

                    return (
                        <article
                            key={plan.key}
                            ref={isFeatured ? featuredCard : undefined}
                            className={cn(
                                'relative flex w-[82%] max-w-[21rem] shrink-0 snap-center flex-col rounded-2xl border bg-paper p-6 shadow-card sm:w-auto sm:max-w-none sm:shrink',
                                isFeatured ? 'border-brand-500 ring-2 ring-lime/50' : 'border-line',
                            )}
                        >
                            {isFeatured && (
                                <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[11.5px] font-bold tracking-wide text-lime-ink uppercase">
                                    Your trial plan
                                </span>
                            )}
                            <h3 className="text-lg font-semibold">{plan.name}</h3>
                            <div className="mt-3 flex items-baseline gap-1">
                                <span className="text-4xl font-semibold tracking-tight">{price === null ? 'Custom' : formatMoney(price, plan.currency)}</span>
                                {price !== null && price > 0 && <span className="text-[15px] text-muted">/ month</span>}
                            </div>
                            <p className="mt-1 text-[13.5px] text-muted">{cta.note}</p>
                            {plan.description && !compact && <p className="mt-3 text-[14px] leading-relaxed text-body">{plan.description}</p>}

                            <Button href={cta.href} variant={isFeatured ? 'primary' : 'outline'} className="mt-5 w-full">
                                {cta.label}
                            </Button>

                            <ul className="mt-6 grid gap-2.5 border-t border-line pt-5 text-[14.5px]">
                                {cardFeatures(plan, compact ? 5 : 8).map((line) => (
                                    <li key={line} className="flex gap-2.5">
                                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                                        <span className="text-body">{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
