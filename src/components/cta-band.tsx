import { ArrowRightIcon } from 'lucide-react';

import { Button, Container } from '@/components/ui';

export function CtaBand({
    title,
    lead,
    primary = { label: 'Start free trial', href: '/start' },
    secondary = { label: 'Book a demo', href: '/demo' },
}: {
    title: string;
    lead: string;
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string } | null;
}) {
    return (
        <section className="py-16 sm:py-20">
            <Container>
                <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-white sm:px-12 sm:py-16">
                    <div
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_90%_at_50%_0%,rgba(169,227,36,.22),transparent_65%)]"
                        aria-hidden
                    />
                    <div className="relative">
                        <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-semibold sm:text-4xl">{title}</h2>
                        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/70">{lead}</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Button href={primary.href} size="lg">
                                {primary.label} <ArrowRightIcon className="size-4" />
                            </Button>
                            {secondary && (
                                <Button href={secondary.href} size="lg" variant="onDark">
                                    {secondary.label}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
