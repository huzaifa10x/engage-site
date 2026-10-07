import Link from 'next/link';

import { Container, Logo } from '@/components/ui';
import { app, appHost, footerNav, site, whatsappLink } from '@/config/site';
import { getPolicies } from '@/lib/legal';

export function SiteFooter() {
    // The Legal column is whatever policy pages exist: add a file in content/legal and it appears here.
    const policies = getPolicies();
    const columns = [...footerNav, ...(policies.length > 0 ? [{ title: 'Legal', links: policies.map((p) => ({ label: p.title, href: p.url })) }] : [])];

    return (
        <footer className="bg-ink text-white">
            <Container className="py-14 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
                    <div>
                        <Logo onDark />
                        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">
                            {site.tagline} A {site.company} product. Meta Tech Provider.
                        </p>
                        <div className="mt-5 grid gap-1.5 text-[14.5px] text-white/70">
                            <a href={app.signIn} className="w-fit font-medium text-lime hover:underline">
                                {appHost}
                            </a>
                            {site.contactEmail && (
                                <a href={`mailto:${site.contactEmail}`} className="w-fit hover:text-white">
                                    {site.contactEmail}
                                </a>
                            )}
                            {whatsappLink && (
                                <a href={whatsappLink} className="w-fit hover:text-white">
                                    Chat on WhatsApp
                                </a>
                            )}
                        </div>
                    </div>

                    <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {columns.map((column) => (
                            <div key={column.title}>
                                <p className="text-[12.5px] font-semibold tracking-wider text-white/45 uppercase">{column.title}</p>
                                <ul className="mt-4 grid gap-2.5">
                                    {column.links.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-[14.5px] text-white/75 hover:text-white">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="mt-12 grid gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50">
                    <p>
                        © {new Date().getFullYear()} {site.company}. All rights reserved. {site.location}.
                    </p>
                    <p>
                        {site.name} is an independent software platform that uses official Meta APIs. WhatsApp and Meta are trademarks of Meta Platforms, Inc.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
