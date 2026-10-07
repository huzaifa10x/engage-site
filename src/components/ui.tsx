import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Small shared building blocks. Every page is assembled from these, so spacing and type stay consistent. */

export function Container({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('mx-auto w-full max-w-site px-5 sm:px-8', className)} {...props} />;
}

export function Section({ className, tone = 'paper', ...props }: ComponentProps<'section'> & { tone?: 'paper' | 'soft' | 'ink' }) {
    return <section className={cn('py-16 sm:py-20 lg:py-24', tone === 'soft' && 'bg-paper-2', tone === 'ink' && 'bg-ink text-white', className)} {...props} />;
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
    return (
        <p
            className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-semibold tracking-wide',
                onDark ? 'bg-white/10 text-lime' : 'bg-brand-100 text-brand-600',
            )}
        >
            <span className={cn('size-1.5 rounded-full', onDark ? 'bg-lime' : 'bg-brand-500')} aria-hidden />
            {children}
        </p>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    lead,
    center = false,
    onDark = false,
}: {
    eyebrow?: string;
    title: string;
    lead?: string;
    center?: boolean;
    onDark?: boolean;
}) {
    return (
        <div className={cn('max-w-2xl', center && 'mx-auto text-center')}>
            {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
            <h2 className={cn('text-3xl leading-[1.12] font-semibold sm:text-4xl', eyebrow && 'mt-4')}>{title}</h2>
            {lead && <p className={cn('mt-4 text-[17px] leading-relaxed', onDark ? 'text-white/70' : 'text-muted')}>{lead}</p>}
        </div>
    );
}

type ButtonProps = {
    href: string;
    variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'onDark';
    size?: 'md' | 'lg';
    className?: string;
    children: ReactNode;
    external?: boolean;
};

const BUTTON = {
    base: 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-[background-color,border-color,box-shadow,transform] duration-150 active:translate-y-px',
    size: { md: 'h-11 px-5 text-[15px]', lg: 'h-12 px-6 text-base' },
    variant: {
        primary: 'bg-lime text-lime-ink shadow-[inset_0_-1px_0_rgba(16,26,2,.14),0_1px_2px_rgba(16,26,2,.16)] hover:bg-lime-hover',
        dark: 'bg-ink text-white hover:bg-ink-2',
        outline: 'border border-line bg-paper text-ink hover:border-brand-500/60 hover:bg-paper-2',
        ghost: 'text-ink hover:bg-paper-2',
        onDark: 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
    },
};

/** A link that looks like a button. Internal links use the router; links to the app are plain anchors. */
export function Button({ href, variant = 'primary', size = 'md', className, children, external }: ButtonProps) {
    const classes = cn(BUTTON.base, BUTTON.size[size], BUTTON.variant[variant], className);
    const outside = external ?? /^(https?:|mailto:|tel:)/.test(href);

    return outside ? (
        <a href={href} className={classes}>
            {children}
        </a>
    ) : (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('rounded-2xl border border-line bg-paper p-6 shadow-card', className)} {...props} />;
}

export function FeatureCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
    return (
        <Card className="transition-shadow hover:shadow-lift">
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 [&>svg]:size-5">{icon}</div>
            <h3 className="mt-4 text-[17px] font-semibold">{title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{body}</p>
        </Card>
    );
}

/** Top of every inner page. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
    return (
        <section className="relative overflow-hidden bg-ink text-white">
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_15%_0%,rgba(169,227,36,.20),transparent_60%),radial-gradient(40%_60%_at_95%_100%,rgba(169,227,36,.10),transparent_60%)]"
                aria-hidden
            />
            <Container className="relative py-16 sm:py-20 lg:py-24">
                <Eyebrow onDark>{eyebrow}</Eyebrow>
                <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl">{title}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{lead}</p>
                {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
            </Container>
        </section>
    );
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
    return (
        <span className="inline-flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-lime text-[13px] font-extrabold tracking-tight text-lime-ink">
                10X
            </span>
            <span className={cn('text-[19px] font-semibold tracking-tight', onDark ? 'text-white' : 'text-ink')}>Engage</span>
        </span>
    );
}
