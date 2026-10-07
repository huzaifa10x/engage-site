import { CheckIcon, HandshakeIcon, HashIcon, KeyRoundIcon, LayoutDashboardIcon, TagIcon, WalletIcon, XIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { CtaBand, InlineCta } from '@/components/cta-band';
import { Button, Container, FeatureCard, PageHero, Section, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
    title: 'For agencies',
    description: "Run every client's WhatsApp from one place: many numbers, per-client roles, consolidated oversight and 0% message markup.",
    alternates: { canonical: '/agencies' },
};

const COMPARE = [
    {
        before: 'Separate logins and phones for every client. No oversight, constant context-switching.',
        after: 'Every client number in one console, with per-client teams and roles.',
    },
    { before: 'Budget tools skim a margin on every message your clients send.', after: "0% markup. The margin between Meta's cost and your price is yours." },
];

const BENEFITS = [
    { icon: <HashIcon />, title: 'Multi-number management', body: 'Add and run your client numbers from one place.' },
    { icon: <KeyRoundIcon />, title: 'Per-client roles', body: "Give each client's team exactly the access they should have, nothing more." },
    { icon: <LayoutDashboardIcon />, title: 'Consolidated view', body: 'Health, activity and performance across every client at a glance.' },
    { icon: <HandshakeIcon />, title: 'Guided onboarding', body: 'We help you set up clients so you look good from day one.' },
    { icon: <WalletIcon />, title: 'Your margin, protected', body: '0% message markup means the resale economics work in your favour.' },
    { icon: <TagIcon />, title: 'White-label (coming soon)', body: 'Client-branded portals are on the roadmap. Tell us if you need them.' },
];

export default function AgenciesPage() {
    return (
        <>
            <PageHero
                eyebrow="For agencies"
                title="Run every client's WhatsApp from one place."
                lead="Stop juggling logins and phones. Manage all your clients' numbers, teams and campaigns from one console, and keep the margin."
            >
                <Button href="/demo" size="lg">
                    Book a demo
                </Button>
                <Button href="/start" size="lg" variant="onDark">
                    Start free trial
                </Button>
            </PageHero>

            <Section>
                <Container>
                    <SectionHeading eyebrow="The problem" title="Agencies outgrow single-inbox tools fast." />
                    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5">
                        {COMPARE.map((row) => (
                            <div key={row.before} className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-line bg-paper-2 p-6">
                                    <p className="flex items-center gap-2 text-[13px] font-semibold tracking-wider text-muted uppercase">
                                        <XIcon className="size-4" aria-hidden /> Before
                                    </p>
                                    <p className="mt-2 text-[16px] leading-relaxed text-body">{row.before}</p>
                                </div>
                                <div className="rounded-2xl border border-brand-500/40 bg-brand-50 p-6">
                                    <p className="flex items-center gap-2 text-[13px] font-semibold tracking-wider text-brand-600 uppercase">
                                        <CheckIcon className="size-4" aria-hidden /> With Engage
                                    </p>
                                    <p className="mt-2 text-[16px] leading-relaxed font-medium text-ink">{row.after}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <div className="pb-12 sm:pb-20">
                <InlineCta text="See your clients' numbers in one console." action={{ label: 'Book a demo', href: '/demo' }} />
            </div>

            <Section tone="soft">
                <Container>
                    <SectionHeading eyebrow="Built for agencies" title="What you get." />
                    <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                        {BENEFITS.map((item) => (
                            <FeatureCard key={item.title} {...item} />
                        ))}
                    </div>
                </Container>
            </Section>

            <CtaBand
                title="See it with your own client list."
                lead="Book a 20-minute demo and we will set up a client number live."
                primary={{ label: 'Book a demo', href: '/demo' }}
                secondary={{ label: 'Start free trial', href: '/start' }}
            />
        </>
    );
}
