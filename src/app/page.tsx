import { ArrowRightIcon, Building2Icon, FileTextIcon, HeadsetIcon, MegaphoneIcon, MessagesSquareIcon, PercentIcon, ShieldCheckIcon } from 'lucide-react';

import Link from 'next/link';

import { ChatMock } from '@/components/chat-mock';
import { CtaBand } from '@/components/cta-band';
import { FaqJsonLd, FaqList } from '@/components/faq';
import { PricingSection } from '@/components/pricing-section';
import { StartForm } from '@/components/start-form';
import { Button, Card, Container, Eyebrow, FeatureCard, Section, SectionHeading } from '@/components/ui';
import { homeFaq } from '@/content/faq';

const PROOF = [
    { value: 'Meta', label: 'Tech Provider' },
    { value: '0%', label: 'markup on messages' },
    { value: 'Coexistence', label: 'keep your phone app' },
    { value: 'UAE', label: 'VAT-compliant billing' },
    { value: 'Opt-in', label: 'compliance built in' },
];

const STEPS = [
    { title: 'Connect your number', body: 'Secure Meta sign-up, with a new number or your existing WhatsApp Business app number through coexistence.' },
    { title: 'Bring your team in', body: 'Invite teammates into one shared inbox, each with the right role.' },
    { title: 'Broadcast safely', body: 'Send campaigns to opted-in contacts with quality guardrails built in.' },
    { title: 'Measure and improve', body: 'Track delivery, replies and campaign performance for every number.' },
];

const WHY = [
    { icon: <PercentIcon />, title: '0% markup', body: "You pay Meta's published message rates. We never add a margin." },
    { icon: <ShieldCheckIcon />, title: 'Quality guardrails', body: 'Auto-pause on quality drops and limit awareness protect your number.' },
    { icon: <Building2Icon />, title: 'Agency-first', body: 'Many numbers, per-client roles and consolidated oversight by design.' },
    { icon: <HeadsetIcon />, title: 'Real support', body: 'Guided onboarding and people who answer, not a ticket void.' },
];

// Rebuilt in the background at most once a minute, so plan changes in the product appear here
// without a deploy, and a moment when the API was unreachable heals by itself.
export const revalidate = 60;

export default function HomePage() {
    return (
        <>
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_12%_0%,rgba(169,227,36,.22),transparent_60%),radial-gradient(45%_60%_at_100%_100%,rgba(169,227,36,.12),transparent_60%)]"
                    aria-hidden
                />
                <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
                    <div>
                        <Eyebrow onDark>Meta Tech Provider · built by 10X Digital</Eyebrow>
                        <h1 className="mt-6 text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl">
                            Run WhatsApp like a <span className="text-lime">premium business</span>.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                            A shared team inbox, broadcasts with real guardrails and multi-number management, built for growing businesses and the agencies that
                            run them.
                        </p>
                        <div className="mt-8 max-w-lg">
                            <StartForm cta="Start free trial" />
                            <p className="mt-3 text-[13.5px] text-white/55">
                                Free trial, no card required. Or{' '}
                                <Link href="/demo" className="font-medium text-white underline underline-offset-4 hover:text-lime">
                                    book a demo
                                </Link>
                                .
                            </p>
                        </div>
                        <p className="mt-8 flex items-start gap-2.5 text-[14.5px] text-white/70">
                            <PercentIcon className="mt-0.5 size-4.5 shrink-0 text-lime" aria-hidden />
                            <span>
                                <strong className="font-semibold text-white">No message markup.</strong> You pay Meta&apos;s rates. We never add a margin on
                                conversations.
                            </span>
                        </p>
                    </div>
                    <ChatMock />
                </Container>

                <Container className="relative pb-12">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
                        {PROOF.map((item) => (
                            <div key={item.label}>
                                <dt className="sr-only">{item.label}</dt>
                                <dd>
                                    <span className="block text-xl font-semibold text-white">{item.value}</span>
                                    <span className="text-[13.5px] text-white/55">{item.label}</span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </section>

            <Section>
                <Container>
                    <SectionHeading
                        eyebrow="The platform"
                        title="Everything your team needs on WhatsApp."
                        lead="Not a bulk blaster. A proper conversation platform."
                    />
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<MessagesSquareIcon />}
                            title="Shared team inbox"
                            body="One inbox for the whole team. Assign, add notes, mention teammates and reply together."
                        />
                        <FeatureCard
                            icon={<MegaphoneIcon />}
                            title="Broadcasts done right"
                            body="Opt-in enforced, quality auto-pause and a clear preview before you send."
                        />
                        <FeatureCard
                            icon={<FileTextIcon />}
                            title="Message templates"
                            body="Create, submit and manage approved WhatsApp templates with media and variables, synced from Meta."
                        />
                        <FeatureCard
                            icon={<Building2Icon />}
                            title="Built for many numbers"
                            body="Run several WhatsApp numbers with per-number roles. Ideal for agencies."
                        />
                    </div>
                    <div className="mt-8">
                        <Button href="/product" variant="outline">
                            See every feature <ArrowRightIcon className="size-4" />
                        </Button>
                    </div>
                </Container>
            </Section>

            <Section tone="soft">
                <Container>
                    <SectionHeading eyebrow="How it works" title="Live in an afternoon." />
                    <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map((step, i) => (
                            <li key={step.title}>
                                <Card className="h-full">
                                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-lime">
                                        {i + 1}
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-semibold">{step.title}</h3>
                                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.body}</p>
                                </Card>
                            </li>
                        ))}
                    </ol>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionHeading eyebrow="Premium, not budget" title="Why teams choose Engage." />
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {WHY.map((item) => (
                            <FeatureCard key={item.title} {...item} />
                        ))}
                    </div>
                </Container>
            </Section>

            <Section tone="soft">
                <Container>
                    <SectionHeading center eyebrow="Pricing" title="Simple, transparent pricing." lead="Every plan includes 0% markup on WhatsApp messages." />
                    <div className="mt-10">
                        <PricingSection compact />
                    </div>
                    <div className="mt-8 text-center">
                        <Button href="/pricing" variant="outline">
                            Compare all plans <ArrowRightIcon className="size-4" />
                        </Button>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <div className="grid items-center gap-8 rounded-3xl border border-line bg-brand-50 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
                        <div>
                            <Eyebrow>For agencies</Eyebrow>
                            <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">Running WhatsApp for clients?</h2>
                            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-body">
                                Engage was built by an agency, for agencies. Manage every client number from one place.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 lg:justify-end">
                            <Button href="/agencies" variant="dark" size="lg">
                                See the agency platform
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section tone="soft">
                <Container>
                    <SectionHeading center eyebrow="Questions" title="Good to know." />
                    <div className="mt-10">
                        <FaqList items={homeFaq} />
                    </div>
                    <FaqJsonLd items={homeFaq} />
                </Container>
            </Section>

            <CtaBand title="Try it free." lead="Connect a number and send your first message today." secondary={{ label: 'See pricing', href: '/pricing' }} />
        </>
    );
}
