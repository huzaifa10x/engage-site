import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container } from '@/components/ui';
import { getPolicies, getPolicy } from '@/lib/legal';

/**
 * Policy pages. Each Markdown file in content/legal is served at the address written in that file
 * (for example /privacy-policy), so the public URLs are set by the content, not by this code.
 * Only those addresses exist here: anything else is a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
    return getPolicies().map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const policy = getPolicy((await params).slug);

    return policy ? { title: policy.title, description: policy.summary ?? `${policy.title} for 10X Engage.`, alternates: { canonical: policy.url } } : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const policy = getPolicy((await params).slug);
    if (!policy) notFound();
    const others = getPolicies().filter((p) => p.url !== policy.url);

    return (
        <Container className="py-12 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <article className="min-w-0">
                    <p className="text-[13.5px] font-semibold tracking-wider text-brand-600 uppercase">Legal</p>
                    <h1 className="mt-2 text-4xl leading-tight font-semibold sm:text-5xl">{policy.title}</h1>
                    {policy.updated && <p className="mt-3 text-[15px] text-muted">Last updated: {policy.updated}</p>}
                    <div className="prose-legal mt-8 max-w-3xl border-t border-line pt-8" dangerouslySetInnerHTML={{ __html: policy.html }} />
                </article>

                {others.length > 0 && (
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <nav aria-label="Other policies" className="rounded-2xl border border-line bg-paper-2 p-5">
                            <p className="text-[12.5px] font-semibold tracking-wider text-muted uppercase">More policies</p>
                            <ul className="mt-3 grid gap-2">
                                {others.map((p) => (
                                    <li key={p.url}>
                                        <Link href={p.url} className="text-[14.5px] font-medium text-body hover:text-brand-600">
                                            {p.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                )}
            </div>
        </Container>
    );
}
