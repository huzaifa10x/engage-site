import { CalendarIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { LeadForm } from '@/components/lead-form';
import { Button, Card, Container, PageHero, Section } from '@/components/ui';
import { site, whatsappLink } from '@/config/site';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Talk to the 10X Engage team. We usually reply within one business day.',
    alternates: { canonical: '/contact' },
};

export default function ContactPage() {
    return (
        <>
            <PageHero eyebrow="Contact" title="Talk to a human." lead="Reach us however suits you. We usually reply within one business day." />
            <Section>
                <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-8">
                        <h2 className="text-2xl font-semibold">Send us a message</h2>
                        <p className="mt-1.5 mb-6 text-[15px] text-muted">Sales, support or anything else.</p>
                        <LeadForm topic="contact" submitLabel="Send message" withMessage />
                    </div>

                    <div className="grid content-start gap-5">
                        {whatsappLink && (
                            <Card>
                                <MessageCircleIcon className="size-6 text-brand-600" aria-hidden />
                                <h2 className="mt-3 text-lg font-semibold">WhatsApp</h2>
                                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                                    Message us on the very platform we build. The fastest way to reach us.
                                </p>
                                <Button href={whatsappLink} variant="dark" className="mt-4">
                                    Chat on WhatsApp
                                </Button>
                            </Card>
                        )}
                        {site.contactEmail && (
                            <Card>
                                <MailIcon className="size-6 text-brand-600" aria-hidden />
                                <h2 className="mt-3 text-lg font-semibold">Email</h2>
                                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                                    Support and sales at{' '}
                                    <a href={`mailto:${site.contactEmail}`} className="font-semibold text-brand-600 underline-offset-4 hover:underline">
                                        {site.contactEmail}
                                    </a>
                                    .
                                </p>
                            </Card>
                        )}
                        <Card>
                            <CalendarIcon className="size-6 text-brand-600" aria-hidden />
                            <h2 className="mt-3 text-lg font-semibold">Book a demo</h2>
                            <p className="mt-1 text-[15px] leading-relaxed text-muted">Prefer a walkthrough? Take 20 minutes and we will set you up live.</p>
                            <Button href="/demo" variant="outline" className="mt-4">
                                Book a demo
                            </Button>
                        </Card>
                        <p className="text-[14.5px] text-muted">
                            {site.company} · {site.location}
                        </p>
                    </div>
                </Container>
            </Section>
        </>
    );
}
