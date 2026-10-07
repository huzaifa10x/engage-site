import { BadgeCheckIcon, Building2Icon, PercentIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta-band';
import { Container, FeatureCard, PageHero, Section } from '@/components/ui';
import { site } from '@/config/site';

export const metadata: Metadata = {
    title: 'About',
    description: '10X Engage is a product of 10X Digital, a UAE agency that built the WhatsApp platform it always wanted.',
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <>
            <PageHero
                eyebrow="About"
                title="Built by an agency that lives in WhatsApp."
                lead="Engage is a product of 10X Digital, a UAE agency that ran WhatsApp for its own clients and got tired of tools that skimmed a margin on every message or were never built for managing many numbers. So we built the one we wanted."
            />
            <Section>
                <Container>
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                        <FeatureCard
                            icon={<Building2Icon />}
                            title="Who we are"
                            body="A Dubai-based agency turned software company, building the WhatsApp platform we always wished existed."
                        />
                        <FeatureCard
                            icon={<BadgeCheckIcon />}
                            title="Meta Tech Provider"
                            body="An approved Meta Tech Provider on the official WhatsApp Business Platform, not a reseller sitting on top of someone else's."
                        />
                        <FeatureCard
                            icon={<PercentIcon />}
                            title="0% markup, on principle"
                            body="You pay Meta's published message rates. We make money on software, not by taxing your conversations."
                        />
                    </div>
                    <p className="mt-10 text-[15px] text-muted">
                        {site.company} · {site.location} ·{' '}
                        <a href={site.companyUrl} className="font-medium text-brand-600 underline-offset-4 hover:underline">
                            10xdigital.ae
                        </a>
                    </p>
                </Container>
            </Section>
            <CtaBand title="Come build on it with us." lead="We are onboarding teams and agencies now. Start on your own, or let us walk you through it." />
        </>
    );
}
