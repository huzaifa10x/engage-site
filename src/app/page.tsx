import { ArrowRightIcon, Building2Icon, FileTextIcon, HeadsetIcon, MegaphoneIcon, MessagesSquareIcon, PercentIcon, ShieldCheckIcon } from 'lucide-react';

import { ChatMock } from '@/components/chat-mock';
import { CtaBand, InlineCta } from '@/components/cta-band';
import { FaqJsonLd, FaqList } from '@/components/faq';
import { PricingSection } from '@/components/pricing-section';
import { StartForm } from '@/components/start-form';
import { TrialNote } from '@/components/trial-note';
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

/**
 * Order of the page, and where it asks for action:
 *   hero (trial form + demo) → platform → how it works → ONE mid-page prompt → why Engage →
 *   pricing (each plan has its own button) → agencies (demo) → questions → closing banner.
 */
export default function HomePage() {
    return (
        <>
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_12%_0%,rgba(169,227,36,.22),transparent_60%),radial-gradient(45%_60%_at_100%_100%,rgba(169,227,36,.12),transparent_60%)]"
                    aria-hidden
                />
                <Container className="relative grid items-center gap-10 pt-12 pb-10 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-28">
                    <div>
                        <Eyebrow onDark>Meta Tech Provider · built by 10X Digital</Eyebrow>
                        <h1 className="mt-5 text-[2.15rem] leading-[1.07] font-semibold sm:mt-6 sm:text-6xl sm:leading-[1.04]">
                            Run WhatsApp like a <span className="text-lime">premium business</span>.
                        </h1>
                        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
                            A shared team inbox, broadcasts with real guardrails and multi-number management, built for growing businesses and the agencies that
                            run them.
                        </p>

                        <div className="mt-7 max-w-lg sm:mt-8">
                            <StartForm cta="Start free trial" />
                            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <TrialNote onDark />
                                <Button href="/demo" variant="onDark" className="h-10 w-full px-4 text-[14.5px] sm:w-auto">
                                    Book a demo
                                </Button>
                            </div>
                        </div>

                        <p className="mt-7 flex items-start gap-2.5 text-[14.5px] text-white/70 sm:mt-8">
                            <PercentIcon className="mt-0.5 size-4.5 shrink-0 text-lime" aria-hidden />
                            <span>
                                <strong className="font-semibold text-white">No message markup.</strong> You pay Meta&apos;s rates. We never add a margin on
                                conversations.
                            </span>
                        </p>
                    </div>
                    <ChatMock />
                </Container>

                <Container className="relative pb-10 sm:pb-12">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:pt-8 lg:grid-cols-5">
                        {PROOF.map((item) => (
                            <div key={item.label} className="last:col-span-2 sm:last:col-span-1">
                                <dt className="sr-only">{item.label}</dt>
                                <dd>
                                    <span className="block text-lg font-semibold text-white sm:text-xl">{item.value}</span>
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
                    <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
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
                    <div className="mt-7">
                        <Button href="/product" variant="outline" className="w-full sm:w-auto">
                            See every feature <ArrowRightIcon className="size-4" />
                        </Button>
                    </div>
                </Container>
            </Section>

            <Section tone="soft">
                <Container>
                    <SectionHeading eyebrow="How it works" title="Live in an afternoon." />
                    <ol className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                        {STEPS.map((step, i) => (
                            <li key={step.title}>
                                <Card className="flex h-full gap-4 sm:block">
                                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-lime">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-[17px] font-semibold sm:mt-4">{step.title}</h3>
                                        <p className="mt-1 text-[15px] leading-relaxed text-muted sm:mt-1.5">{step.body}</p>
                                    </div>
                                </Card>
                            </li>
                        ))}
                    </ol>
                </Container>
                {/* The one mid-page prompt: the visitor has just seen how little it takes to start. */}
                <div className="mt-8 sm:mt-10">
                    <InlineCta text="Connect your number and send your first message today." />
                </div>
            </Section>

            <Section>
                <Container>
                    <SectionHeading eyebrow="Premium, not budget" title="Why teams choose Engage." />
                    <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                        {WHY.map((item) => (
                            <FeatureCard key={item.title} {...item} />
                        ))}
                    </div>
                </Container>
            </Section>

            <Section tone="soft" id="pricing">
                <Container>
                    <SectionHeading center eyebrow="Pricing" title="Simple, transparent pricing." lead="Every plan includes 0% markup on WhatsApp messages." />
                    <div className="mt-8 sm:mt-10">
                        <PricingSection compact />
                    </div>
                    <div className="mt-7 text-center">
                        <Button href="/pricing" variant="outline" className="w-full sm:w-auto">
                            Compare all plans <ArrowRightIcon className="size-4" />
                        </Button>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <div className="grid items-center gap-6 rounded-3xl border border-line bg-brand-50 p-6 sm:gap-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
                        <div>
                            <Eyebrow>For agencies</Eyebrow>
                            <h2 className="mt-4 text-[1.7rem] leading-tight font-semibold sm:text-4xl">Running WhatsApp for clients?</h2>
                            <p className="mt-3 max-w-xl text-base leading-relaxed text-body sm:text-[17px]">
                                Engage was built by an agency, for agencies. Manage every client number from one place.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                            <Button href="/demo" variant="dark" size="lg" className="w-full sm:w-auto">
                                Book a demo
                            </Button>
                            <Button href="/agencies" variant="outline" size="lg" className="w-full sm:w-auto">
                                See the agency platform
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section tone="soft">
                <Container>
                    <SectionHeading center eyebrow="Questions" title="Good to know." />
                    <div className="mt-8 sm:mt-10">
                        <FaqList items={homeFaq} />
                    </div>
                    <FaqJsonLd items={homeFaq} />
                </Container>
            </Section>

            <CtaBand title="Try it free." lead="Connect a number and send your first message today." secondary={{ label: 'See pricing', href: '/pricing' }} />
        </>
    );
}
