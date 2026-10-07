import { CheckIcon, LockIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { StartForm } from '@/components/start-form';
import { Container } from '@/components/ui';
import { app, appHost, type Interval } from '@/config/site';
import { getCatalog } from '@/lib/plans';
import { formatMoney, monthlyEquivalent } from '@/lib/pricing';

export const metadata: Metadata = {
    title: 'Start your free trial',
    description: 'Create your 10X Engage workspace in a few minutes. Free trial, no card required.',
    alternates: { canonical: '/start' },
};

const STEPS = [
    { title: 'Create your account', body: 'Your name, company and a password.' },
    { title: 'Confirm your email', body: 'Enter the 6-digit code we send you.' },
    { title: 'Connect WhatsApp', body: 'A new number, or your WhatsApp Business app number.' },
];

export default async function StartPage({ searchParams }: { searchParams: Promise<{ plan?: string; interval?: string }> }) {
    const params = await searchParams;
    const catalog = await getCatalog();
    const interval: Interval = params.interval === 'yearly' ? 'yearly' : 'monthly';
    // Only a plan that really exists (and can be bought online) is carried into sign-up.
    const plan = catalog?.plans.find((p) => p.key === params.plan && !p.custom_price) ?? null;
    const trialPlan = catalog?.plans.find((p) => p.key === catalog.trial.plan_key) ?? null;
    const days = catalog?.trial.days ?? null;
    const price = plan && !plan.free ? monthlyEquivalent(plan, interval) : null;

    return (
        <section className="relative overflow-hidden bg-ink text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_10%_0%,rgba(169,227,36,.2),transparent_60%)]" aria-hidden />
            <Container className="relative grid gap-9 py-10 sm:gap-12 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
                <div>
                    <h1 className="text-[2rem] leading-[1.1] font-semibold sm:text-5xl sm:leading-[1.08]">
                        {days ? `Start your ${days}-day free trial.` : 'Start your free trial.'}
                    </h1>
                    <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
                        {trialPlan ? `Your trial includes everything in ${trialPlan.name}.` : 'Your trial includes the full product.'} No card required, and
                        your workspace moves to the Free plan if you do nothing.
                    </p>
                    <ul className="mt-8 grid gap-3 text-[15.5px] text-white/80">
                        {['0% markup on WhatsApp messages', 'Shared inbox, campaigns and templates from day one', 'Cancel or change plan at any time'].map(
                            (line) => (
                                <li key={line} className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-lime-ink">
                                        <CheckIcon className="size-3.5" aria-hidden />
                                    </span>
                                    {line}
                                </li>
                            ),
                        )}
                    </ul>
                </div>

                <div className="rounded-3xl bg-paper p-5 text-ink shadow-lift sm:p-8">
                    {plan && (
                        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper-2 px-4 py-3.5">
                            <div>
                                <p className="text-[12.5px] font-semibold tracking-wider text-muted uppercase">Selected plan</p>
                                <p className="text-[17px] font-semibold">{plan.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[17px] font-semibold">
                                    {plan.free ? 'Free' : price !== null ? `${formatMoney(price, plan.currency)} / month` : ''}
                                </p>
                                {!plan.free && (
                                    <p className="text-[12.5px] text-muted">
                                        {days ? `after your ${days}-day trial` : 'after your trial'} · billed {interval}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <h2 className="text-xl font-semibold">Enter your work email</h2>
                    <p className="mt-1 text-[14.5px] text-muted">We will take you to {appHost} to finish creating your account.</p>
                    <div className="mt-5">
                        <StartForm plan={plan?.key} interval={plan && !plan.free ? interval : undefined} />
                    </div>

                    <ol className="mt-7 grid gap-4 border-t border-line pt-6">
                        {STEPS.map((step, i) => (
                            <li key={step.title} className="flex gap-3.5">
                                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[13px] font-semibold text-brand-600">
                                    {i + 1}
                                </span>
                                <div>
                                    <p className="text-[15px] font-semibold">{step.title}</p>
                                    <p className="text-[14px] text-muted">{step.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <p className="mt-6 flex items-center gap-2 text-[13px] text-muted">
                        <LockIcon className="size-3.5" aria-hidden /> Already have an account?{' '}
                        <a href={app.signIn} className="font-semibold text-brand-600 underline-offset-4 hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </Container>
        </section>
    );
}
