import { BadgeCheckIcon, ClipboardListIcon, KeyRoundIcon, LandmarkIcon, LockIcon, UserCheckIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta-band';
import { Container, FeatureCard, PageHero, Section } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Security and compliance',
    description: 'How 10X Engage protects customer conversations: encryption, roles and permissions, audit log, consent handling and UAE-ready billing.',
    alternates: { canonical: '/security' },
};

const ITEMS = [
    { icon: <LockIcon />, title: 'Encrypted everywhere', body: 'Data encrypted in transit and at rest, behind strict access controls.' },
    {
        icon: <KeyRoundIcon />,
        title: 'Roles and permissions',
        body: 'Role-based access with per-number permissions, so people only ever see what they should.',
    },
    { icon: <ClipboardListIcon />, title: 'Audit log', body: 'A complete, exportable record of who did what, ready for review and accountability.' },
    { icon: <UserCheckIcon />, title: 'Opt-in and opt-out built in', body: "Consent capture and opt-out handling keep your messaging within Meta's rules." },
    {
        icon: <BadgeCheckIcon />,
        title: 'Meta Tech Provider',
        body: "Official WhatsApp Business Platform access through Meta's approved Tech Provider programme.",
    },
    { icon: <LandmarkIcon />, title: 'UAE-ready', body: 'VAT-compliant billing and data handling aligned to local requirements.' },
];

export default function SecurityPage() {
    return (
        <>
            <PageHero
                eyebrow="Security and compliance"
                title="Your clients' data, handled properly."
                lead="Engage holds other businesses' customer conversations, so security and compliance are built in, not bolted on."
            />
            <Section>
                <Container>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                        {ITEMS.map((item) => (
                            <FeatureCard key={item.title} {...item} />
                        ))}
                    </div>
                </Container>
            </Section>
            <CtaBand
                title="Need our DPA or security details?"
                lead="We will share documentation for your review during a demo."
                primary={{ label: 'Book a demo', href: '/demo' }}
                secondary={{ label: 'Read our policies', href: '/legal' }}
            />
        </>
    );
}
