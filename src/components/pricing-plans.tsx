'use client';

import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { Interval } from '@/config/site';
import { cardFeatures, formatMoney, monthlyEquivalent, yearlySaving } from '@/lib/pricing';
import type { Catalog, Plan } from '@/lib/plans';
import { cn } from '@/lib/utils';

/**
 * Plan cards with a monthly / yearly switch. Every name, price, limit and feature shown is the
 * `catalog` prop, which the page fetched from the product's API.
 *
 * Layout, decided by what the catalog contains rather than by plan names:
 *   • plans with a published price are cards: one swipeable row on phones (opening on the trial
 *     plan), two columns on tablets, one row on desktop;
 *   • the plan the free trial runs on is the dark, highlighted card;
 *   • a plan without a published price (sold through sales) is a wide band under the cards, so
 *     the priced plans get room to breathe instead of being squeezed five across.
 */
export function PricingPlans({ catalog, saving, compact = false }: { catalog: Catalog; saving: number; compact?: boolean }) {
    const [interval, setInterval] = useState<Interval>('monthly');
    const priced = catalog.plans.filter((p) => !p.custom_price);
    const custom = catalog.plans.filter((p) => p.custom_price);
    const hasYearly = priced.some((p) => p.price_yearly_minor);
    const featured = priced.find((p) => p.key === catalog.trial.plan_key)?.key ?? null;
    const days = catalog.trial.days;

    const row = useRef<HTMLDivElement>(null);
    const featuredCard = useRef<HTMLElement>(null);
    useEffect(() => {
        const track = row.current;
        const card = featuredCard.current;
        // Only when the row actually scrolls sideways (phones): open on the highlighted plan.
        if (track && card && track.scrollWidth > track.clientWidth + 8) {
            track.scrollLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        }
    }, []);

    return (
        <div>
            {hasYearly && (
                <div className="flex flex-col items-center gap-2.5">
                    <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-paper p-1 shadow-card">
                        {(['monthly', 'yearly'] as const).map((value) => (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={interval === value}
                                onClick={() => setInterval(value)}
                                className={cn(
                                    'inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-[14.5px] font-semibold transition-colors',
                                    interval === value ? 'bg-ink text-white' : 'text-muted hover:text-ink',
                                )}
                            >
                                {value === 'monthly' ? 'Monthly' : 'Yearly'}
                                {value === 'yearly' && saving > 0 && (
                                    <span
                                        className={cn(
                                            'rounded-full px-2 py-0.5 text-[11.5px] leading-4',
                                            interval === 'yearly' ? 'bg-lime text-lime-ink' : 'bg-brand-100 text-brand-600',
                                        )}
                                    >
                                        -{saving}%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-[13px] text-muted sm:hidden">Swipe to compare plans →</p>
                </div>
            )}

            <div
                ref={row}
                className={cn(
                    // Phones: one snapping row that bleeds to the screen edges.
                    '-mx-5 mt-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pt-5 pb-5 [&::-webkit-scrollbar]:hidden',
                    // Tablets: two columns. Desktop: one row, however many priced plans there are (up to four).
                    'sm:mx-0 sm:mt-8 sm:grid sm:snap-none sm:grid-cols-2 sm:items-stretch sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0',
                    priced.length >= 4 ? 'xl:grid-cols-4' : priced.length === 3 ? 'lg:grid-cols-3' : '',
                )}
            >
                {priced.map((plan, index) => {
                    const isFeatured = plan.key === featured;
                    const price = monthlyEquivalent(plan, interval) ?? 0;
                    const yearly = interval === 'yearly' && !plan.free && plan.price_yearly_minor !== null;
                    const previous = index > 0 ? priced[index - 1] : null;
                    const lines = cardFeatures(plan, compact ? 5 : 7, previous);
                    const href = plan.free ? `/start?plan=${plan.key}` : `/start?plan=${plan.key}&interval=${interval}`;

                    return (
                        <article
                            key={plan.key}
                            ref={isFeatured ? featuredCard : undefined}
                            className={cn(
                                'relative flex w-[84%] max-w-[22rem] shrink-0 snap-center flex-col rounded-3xl border p-6 sm:w-auto sm:max-w-none sm:shrink sm:p-7',
                                isFeatured ? 'border-ink bg-ink text-white shadow-lift' : 'border-line bg-paper text-ink shadow-card',
                            )}
                        >
                            {isFeatured && (
                                <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[11px] font-bold tracking-wider text-lime-ink uppercase shadow-card">
                                    Included in your trial
                                </span>
                            )}

                            <h3 className="text-[17px] font-semibold">{plan.name}</h3>
                            {plan.description && !compact && (
                                <p className={cn('mt-1.5 line-clamp-3 min-h-[4.2em] text-[14px] leading-[1.4]', isFeatured ? 'text-white/65' : 'text-muted')}>
                                    {plan.description}
                                </p>
                            )}

                            <div className="mt-5 flex items-end gap-1.5">
                                <span className="text-[2.75rem] leading-none font-semibold tracking-tight tabular-nums">
                                    {formatMoney(price, plan.currency)}
                                </span>
                                {!plan.free && <span className={cn('pb-1 text-[14.5px]', isFeatured ? 'text-white/60' : 'text-muted')}>/ month</span>}
                            </div>
                            <p className={cn('mt-2 min-h-5 text-[13.5px]', isFeatured ? 'text-white/60' : 'text-muted')}>
                                {plan.free ? (
                                    'Free forever'
                                ) : yearly ? (
                                    <>
                                        {formatMoney(plan.price_yearly_minor ?? 0, plan.currency)} billed yearly
                                        {yearlySaving(plan) > 0 && (
                                            <span className={cn('ml-1.5 font-semibold', isFeatured ? 'text-lime' : 'text-brand-600')}>
                                                save {yearlySaving(plan)}%
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    'Billed monthly'
                                )}
                            </p>

                            <Link
                                href={href}
                                className={cn(
                                    'mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15.5px] font-semibold transition-colors active:translate-y-px',
                                    isFeatured
                                        ? 'bg-lime text-lime-ink shadow-[inset_0_-1px_0_rgba(16,26,2,.14)] hover:bg-lime-hover'
                                        : 'border border-line bg-paper text-ink hover:border-ink/30 hover:bg-paper-2',
                                )}
                            >
                                {plan.free ? 'Start free' : 'Start free trial'}
                                {isFeatured && <ArrowRightIcon className="size-4" aria-hidden />}
                            </Link>
                            <p className={cn('mt-2.5 text-center text-[12.5px]', isFeatured ? 'text-white/50' : 'text-muted')}>
                                {plan.free ? 'No card required' : `${days} days free · no card required`}
                            </p>

                            <div className={cn('mt-6 border-t pt-5', isFeatured ? 'border-white/12' : 'border-line')}>
                                <p className={cn('text-[12.5px] font-semibold tracking-wide uppercase', isFeatured ? 'text-white/50' : 'text-muted')}>
                                    {previous ? `Everything in ${previous.name}, plus` : 'Includes'}
                                </p>
                                <ul className="mt-3.5 grid gap-2.5 text-[14.5px]">
                                    {lines.map((line) => (
                                        <li key={line} className="flex items-start gap-2.5">
                                            <span
                                                className={cn(
                                                    'mt-0.5 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full',
                                                    isFeatured ? 'bg-lime text-lime-ink' : 'bg-brand-100 text-brand-600',
                                                )}
                                            >
                                                <CheckIcon className="size-3" strokeWidth={3} aria-hidden />
                                            </span>
                                            <span className={isFeatured ? 'text-white/85' : 'text-body'}>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    );
                })}
            </div>

            {custom.map((plan) => (
                <CustomPlan key={plan.key} plan={plan} previous={priced.at(-1) ?? null} />
            ))}
        </div>
    );
}

/** A plan sold through sales: a wide band with its headline extras and one button. */
function CustomPlan({ plan, previous }: { plan: Plan; previous: Plan | null }) {
    const lines = cardFeatures(plan, 6, previous);

    return (
        <article className="mt-5 grid gap-6 rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1.5fr_auto] lg:items-center lg:gap-10">
            <div>
                <p className="text-[12.5px] font-semibold tracking-wider text-brand-600 uppercase">Custom pricing</p>
                <h3 className="mt-1.5 text-2xl font-semibold">{plan.name}</h3>
                {plan.description && <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{plan.description}</p>}
            </div>
            <ul className="grid gap-x-6 gap-y-2.5 text-[14.5px] sm:grid-cols-2">
                {lines.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                            <CheckIcon className="size-3" strokeWidth={3} aria-hidden />
                        </span>
                        <span className="text-body">{line}</span>
                    </li>
                ))}
            </ul>
            <Link
                href="/demo?topic=enterprise"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[15.5px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-ink-2 lg:w-auto"
            >
                Talk to sales <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
        </article>
    );
}
