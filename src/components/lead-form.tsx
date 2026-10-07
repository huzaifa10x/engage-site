'use client';

import { CheckCircle2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const TEAM_SIZES = ['Just one (SMB)', '2–5', '6–20 (agency)', '20+ (agency)'];

const field =
    'h-12 w-full rounded-xl border border-line bg-paper px-4 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 hover:border-muted/50 focus-visible:border-brand-500 focus-visible:ring-[3px] focus-visible:ring-brand-500/20';
const label = 'grid gap-1.5 text-[14px] font-medium';

/** Demo / contact form. Sends to this site's /api/lead, which forwards it to the product's API. */
export function LeadForm({
    topic = 'demo',
    submitLabel = 'Request a demo',
    withMessage = false,
}: {
    topic?: 'demo' | 'contact' | 'enterprise';
    submitLabel?: string;
    withMessage?: boolean;
}) {
    const pathname = usePathname();
    const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [error, setError] = useState<string | null>(null);

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setState('sending');
        setError(null);
        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), topic, source: pathname }),
            });
            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { message?: string } | null;
                throw new Error(body?.message ?? 'Something went wrong. Please try again.');
            }
            setState('sent');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
            setState('idle');
        }
    };

    if (state === 'sent') {
        return (
            <div role="status" className="rounded-2xl border border-brand-500/40 bg-brand-50 p-8 text-center">
                <CheckCircle2Icon className="mx-auto size-10 text-brand-600" />
                <h3 className="mt-3 text-xl font-semibold">Thank you, we have your request</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">We usually reply within one business day, at the email you gave us.</p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="grid gap-4" noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>
                    Full name
                    <input name="name" required maxLength={120} autoComplete="name" className={field} />
                </label>
                <label className={label}>
                    Work email
                    <input name="email" type="email" required maxLength={190} autoComplete="email" inputMode="email" className={field} />
                </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>
                    Company
                    <input name="company" maxLength={160} autoComplete="organization" className={field} />
                </label>
                <label className={label}>
                    WhatsApp numbers or clients
                    <select name="team_size" defaultValue="" className={cn(field, 'appearance-none')}>
                        <option value="">Choose one</option>
                        {TEAM_SIZES.map((size) => (
                            <option key={size}>{size}</option>
                        ))}
                    </select>
                </label>
            </div>
            {withMessage && (
                <label className={label}>
                    How can we help?
                    <textarea name="message" rows={4} maxLength={4000} className={cn(field, 'h-auto py-3 leading-relaxed')} />
                </label>
            )}
            {/* Not for people: a field only bots fill in. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

            {error && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={state === 'sending'}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-lime px-6 text-base font-semibold text-lime-ink shadow-[inset_0_-1px_0_rgba(16,26,2,.14),0_1px_2px_rgba(16,26,2,.16)] transition-colors hover:bg-lime-hover disabled:opacity-60"
            >
                {state === 'sending' ? 'Sending…' : submitLabel}
            </button>
        </form>
    );
}
