import { ArrowRightIcon } from 'lucide-react';

import { TrialNote } from '@/components/trial-note';
import { Button, Container } from '@/components/ui';

type Action = { label: string; href: string };

/** The closing banner of a page: one primary action, at most one alternative. */
export function CtaBand({
    title,
    lead,
    primary = { label: 'Start free trial', href: '/start' },
    secondary = { label: 'Book a demo', href: '/demo' },
}: {
    title: string;
    lead: string;
    primary?: Action;
    secondary?: Action | null;
}) {
    return (
        <section className="py-12 sm:py-20">
            <Container>
                <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-11 text-center text-white sm:px-12 sm:py-16">
                    <div
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_90%_at_50%_0%,rgba(169,227,36,.22),transparent_65%)]"
                        aria-hidden
                    />
                    <div className="relative">
                        <h2 className="mx-auto max-w-2xl text-[1.7rem] leading-tight font-semibold sm:text-4xl">{title}</h2>
                        <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-white/70 sm:text-[17px]">{lead}</p>
                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button href={primary.href} size="lg" className="w-full sm:w-auto">
                                {primary.label} <ArrowRightIcon className="size-4" />
                            </Button>
                            {secondary && (
                                <Button href={secondary.href} size="lg" variant="onDark" className="w-full sm:w-auto">
                                    {secondary.label}
                                </Button>
                            )}
                        </div>
                        {primary.href.startsWith('/start') && <TrialNote onDark className="mt-4" />}
                    </div>
                </div>
            </Container>
        </section>
    );
}

/**
 * A quiet, single-line prompt between two sections: a sentence and one button. Used once in the
 * middle of a long page, never next to a closing banner.
 */
export function InlineCta({ text, action = { label: 'Start free trial', href: '/start' }, note = true }: { text: string; action?: Action; note?: boolean }) {
    return (
        <Container>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-paper p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                    <p className="text-[17px] leading-snug font-semibold sm:text-lg">{text}</p>
                    {note && action.href.startsWith('/start') && <TrialNote className="mt-1" />}
                </div>
                <Button href={action.href} className="w-full shrink-0 sm:w-auto">
                    {action.label} <ArrowRightIcon className="size-4" />
                </Button>
            </div>
        </Container>
    );
}
