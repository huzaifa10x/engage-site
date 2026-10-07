import { CheckIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { LeadForm } from '@/components/lead-form';
import { Button, Container, PageHero, Section } from '@/components/ui';
import { whatsappLink } from '@/config/site';

export const metadata: Metadata = {
    title: 'Book a demo',
    description: 'A 20-minute walkthrough of 10X Engage tailored to your setup. We connect a real number live.',
    alternates: { canonical: '/demo' },
};

const EXPECT = [
    'A 20-minute, no-pressure walkthrough tailored to your setup.',
    'We connect a real number live, so you see onboarding end to end.',
    'Honest guidance on plan fit: self-serve trial or agency setup.',
    'Clear next steps and pricing, with no surprises.',
];

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
    const enterprise = (await searchParams).topic === 'enterprise';

    return (
        <>
            <PageHero
                eyebrow="Get started"
                title={enterprise ? 'Talk to us about Enterprise.' : 'Start free, or book a demo.'}
                lead={
                    enterprise
                        ? 'Tell us about your team and we will tailor numbers, seats and support to fit.'
                        : 'Small teams can jump straight into a free trial. Agencies: book a quick walkthrough and we will set up your first client live.'
                }
            />
            <Section>
                <Container className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
                    <div className="rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-8">
                        <h2 className="text-2xl font-semibold">Tell us about you</h2>
                        <p className="mt-1.5 mb-6 text-[15px] text-muted">We usually reply within one business day.</p>
                        <LeadForm
                            topic={enterprise ? 'enterprise' : 'demo'}
                            submitLabel={enterprise ? 'Talk to sales' : 'Request a demo'}
                            withMessage={enterprise}
                        />
                        {whatsappLink && (
                            <p className="mt-5 text-center text-[14.5px] text-muted">
                                Or{' '}
                                <a href={whatsappLink} className="font-semibold text-brand-600 underline-offset-4 hover:underline">
                                    chat with us on WhatsApp
                                </a>
                                .
                            </p>
                        )}
                    </div>

                    <div className="grid content-start gap-5">
                        <div className="rounded-3xl bg-ink p-7 text-white">
                            <h2 className="text-xl font-semibold">What to expect</h2>
                            <ul className="mt-5 grid gap-3.5">
                                {EXPECT.map((line) => (
                                    <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                                        <CheckIcon className="mt-1 size-4 shrink-0 text-lime" aria-hidden />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-3xl border border-line bg-brand-50 p-7">
                            <h2 className="text-xl font-semibold">Prefer self-serve?</h2>
                            <p className="mt-2 text-[15px] leading-relaxed text-body">Start a free trial and connect your number in minutes.</p>
                            <Button href="/start" variant="dark" className="mt-5">
                                Start free trial
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
