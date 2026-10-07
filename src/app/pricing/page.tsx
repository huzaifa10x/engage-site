import type { Metadata } from 'next';

import { ComparisonTable } from '@/components/comparison-table';
import { CtaBand } from '@/components/cta-band';
import { FaqJsonLd, FaqList } from '@/components/faq';
import { PricingSection } from '@/components/pricing-section';
import { Container, PageHero, Section, SectionHeading } from '@/components/ui';
import { pricingFaq } from '@/content/faq';
import { getCatalog } from '@/lib/plans';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'Simple, transparent plans for 10X Engage, with 0% markup on WhatsApp messages. Start with a free trial, no card required.',
    alternates: { canonical: '/pricing' },
};

// Rebuilt in the background at most once a minute, so plan changes in the product appear here
// without a deploy, and a moment when the API was unreachable heals by itself.
export const revalidate = 60;

export default async function PricingPage() {
    // Same request as the cards below (the fetch is shared within one render).
    const catalog = await getCatalog();

    return (
        <>
            <PageHero
                eyebrow="Pricing"
                title="Simple, transparent pricing."
                lead="Every plan includes 0% markup on WhatsApp messages. Start with a free trial and choose a plan when you are ready."
            />

            <Section tone="soft">
                <Container>
                    <PricingSection />
                </Container>
            </Section>

            {catalog && (
                <Section>
                    <Container>
                        <SectionHeading
                            eyebrow="Compare"
                            title="Everything in each plan."
                            lead="Limits and features come straight from the product, so this table is always current."
                        />
                        <div className="mt-10">
                            <ComparisonTable catalog={catalog} />
                        </div>
                    </Container>
                </Section>
            )}

            <Section tone="soft">
                <Container>
                    <SectionHeading center eyebrow="Billing questions" title="Pricing, answered." />
                    <div className="mt-10">
                        <FaqList items={pricingFaq} />
                    </div>
                    <FaqJsonLd items={pricingFaq} />
                </Container>
            </Section>

            <CtaBand title="Start free. Upgrade when it pays for itself." lead="Your trial includes the full product. No card required." />
        </>
    );
}
