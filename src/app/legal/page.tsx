import { ArrowRightIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Container, PageHero, Section } from '@/components/ui';
import { getPolicies } from '@/lib/legal';

export const metadata: Metadata = { title: 'Legal', description: 'Policies and terms for 10X Engage.', alternates: { canonical: '/legal' } };

export default function LegalPage() {
    const policies = getPolicies();

    return (
        <>
            <PageHero eyebrow="Legal" title="Legal and compliance." lead="The terms and policies that apply when you use 10X Engage." />
            <Section>
                <Container>
                    {policies.length === 0 ? (
                        <div className="max-w-xl">
                            <p className="text-[17px] leading-relaxed text-body">
                                Our policies are being published. If you need a copy now, please contact us and we will send it to you.
                            </p>
                            <Button href="/contact" variant="outline" className="mt-6">
                                Contact us
                            </Button>
                        </div>
                    ) : (
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {policies.map((policy) => (
                                <li key={policy.url}>
                                    <Link
                                        href={policy.url}
                                        className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line bg-paper p-6 shadow-card transition-shadow hover:shadow-lift"
                                    >
                                        <span>
                                            <span className="block text-lg font-semibold">{policy.title}</span>
                                            {policy.updated && <span className="text-[14px] text-muted">Updated {policy.updated}</span>}
                                        </span>
                                        <ArrowRightIcon className="size-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </Container>
            </Section>
        </>
    );
}
