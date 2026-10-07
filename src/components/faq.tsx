import { PlusIcon } from 'lucide-react';

import type { Faq } from '@/content/faq';

/** Questions that open and close without any JavaScript (native <details>), so they work everywhere. */
export function FaqList({ items }: { items: Faq[] }) {
    return (
        <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-paper shadow-card">
            {items.map((item) => (
                <details key={item.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold sm:px-6 [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <PlusIcon className="size-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45" aria-hidden />
                    </summary>
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6">{item.a}</p>
                </details>
            ))}
        </div>
    );
}

/** The same questions as structured data, so search engines can show them. */
export function FaqJsonLd({ items }: { items: Faq[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
