import { BarChart3Icon, FileTextIcon, HashIcon, KeyRoundIcon, LinkIcon, MegaphoneIcon, MessagesSquareIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { CtaBand, InlineCta } from '@/components/cta-band';
import { Button, Container, PageHero, Section } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Product',
    description: 'Shared inbox, campaigns, templates, contacts, coexistence, roles, analytics and compliance: every feature of 10X Engage.',
    alternates: { canonical: '/product' },
};

const FEATURES = [
    {
        icon: MessagesSquareIcon,
        tag: 'Shared inbox',
        title: 'One inbox for the whole team',
        body: 'Your whole team answers from one shared inbox. Everyone sees every conversation and its full history, so nothing gets stuck on one phone and no customer is left waiting.',
    },
    {
        icon: MegaphoneIcon,
        tag: 'Broadcasts',
        title: 'Campaigns that respect your number',
        body: 'Opt-in enforced at send, quality-rating auto-pause and marketing-limit awareness, so campaigns stay compliant and your number stays healthy.',
    },
    {
        icon: FileTextIcon,
        tag: 'Templates',
        title: 'Manage and sync approved templates',
        body: 'Create, submit and track template approval status, with variables and media, synced straight from Meta.',
    },
    {
        icon: UsersIcon,
        tag: 'Contacts',
        title: 'Contacts and segments',
        body: 'Stored contacts with tags, custom fields and saved segments to reach the right people.',
    },
    {
        icon: LinkIcon,
        tag: 'Coexistence',
        title: 'Keep your phone, add your team',
        body: 'Connect an existing WhatsApp Business app number. Chat from your phone while the team works in Engage, with history synced.',
    },
    {
        icon: HashIcon,
        tag: 'Multiple numbers',
        title: 'Run every number from one place',
        body: 'Connect and manage several WhatsApp numbers, with health and status visible for each. Built for teams and agencies.',
    },
    {
        icon: KeyRoundIcon,
        tag: 'Roles and permissions',
        title: 'The right access for everyone',
        body: 'Role-based access control with per-number permissions, so each teammate sees and does exactly what they should.',
    },
    {
        icon: BarChart3Icon,
        tag: 'Analytics',
        title: "See what's working",
        body: 'Track delivery, reads, replies and campaign performance across all your numbers.',
    },
    {
        icon: ShieldCheckIcon,
        tag: 'Compliance and audit log',
        title: 'Compliant by default',
        body: "Opt-in capture and opt-out handling keep you within Meta's rules, with a complete, exportable audit log of every action.",
    },
];

export default function ProductPage() {
    return (
        <>
            <PageHero eyebrow="Product" title="Every feature, built for how teams actually use WhatsApp." lead="Only what is shipped and working today.">
                <Button href="/start" size="lg">
                    Start free trial
                </Button>
                <Button href="/pricing" size="lg" variant="onDark">
                    See pricing
                </Button>
            </PageHero>

            <Section>
                <Container>
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {FEATURES.slice(0, 6).map(({ icon: Icon, tag, title, body }) => (
                            <article
                                key={tag}
                                className="flex flex-col rounded-2xl border border-line bg-paper p-6 shadow-card transition-shadow hover:shadow-lift sm:p-7"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-lime">
                                        <Icon className="size-5" aria-hidden />
                                    </span>
                                    <span className="text-[12.5px] font-semibold tracking-wider text-brand-600 uppercase">{tag}</span>
                                </div>
                                <h2 className="mt-5 text-xl leading-snug font-semibold">{title}</h2>
                                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{body}</p>
                            </article>
                        ))}
                    </div>
                </Container>
                {/* One prompt, two thirds of the way down: enough has been shown to act on. */}
                <div className="my-8 sm:my-10">
                    <InlineCta text="See it working on your own number." />
                </div>
                <Container>
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {FEATURES.slice(6).map(({ icon: Icon, tag, title, body }) => (
                            <article
                                key={tag}
                                className="flex flex-col rounded-2xl border border-line bg-paper p-6 shadow-card transition-shadow hover:shadow-lift sm:p-7"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-lime">
                                        <Icon className="size-5" aria-hidden />
                                    </span>
                                    <span className="text-[12.5px] font-semibold tracking-wider text-brand-600 uppercase">{tag}</span>
                                </div>
                                <h2 className="mt-5 text-xl leading-snug font-semibold">{title}</h2>
                                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{body}</p>
                            </article>
                        ))}
                    </div>
                </Container>
            </Section>

            <CtaBand
                title="Every feature is in your trial."
                lead="Start free, connect a number and try all of it with your own team."
                secondary={{ label: 'See pricing', href: '/pricing' }}
            />
        </>
    );
}
