'use client';

import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';

import { app, type Interval } from '@/config/site';

/**
 * First step of the trial: the work email. Submitting continues in the product's own sign-up
 * with the email and the chosen plan filled in, so nothing is typed or chosen twice.
 */
export function StartForm({ plan, interval, cta = 'Continue' }: { plan?: string; interval?: Interval; cta?: string }) {
    const [email, setEmail] = useState('');
    const [busy, setBusy] = useState(false);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setBusy(true);
                window.location.assign(app.register({ plan, interval, email: email.trim() }));
            }}
            className="grid gap-3 sm:flex"
        >
            <label className="sr-only" htmlFor="start-email">
                Work email
            </label>
            <input
                id="start-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
                className="h-12 w-full min-w-0 flex-1 rounded-xl border border-line bg-paper px-4 text-[16px] text-ink outline-none placeholder:text-muted/70 focus-visible:border-brand-500 focus-visible:ring-[3px] focus-visible:ring-brand-500/25"
            />
            <button
                type="submit"
                disabled={busy}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-lime px-6 text-base font-semibold text-lime-ink shadow-[inset_0_-1px_0_rgba(16,26,2,.14),0_1px_2px_rgba(16,26,2,.16)] transition-colors hover:bg-lime-hover disabled:opacity-70"
            >
                {busy ? 'One moment…' : cta} <ArrowRightIcon className="size-4" />
            </button>
        </form>
    );
}
