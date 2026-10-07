import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { site } from '@/config/site';

import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: WhatsApp for teams and agencies`, template: `%s · ${site.name}` },
    description: site.description,
    applicationName: site.name,
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        siteName: site.name,
        title: `${site.name}: WhatsApp for teams and agencies`,
        description: site.description,
        url: site.url,
        locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image', title: site.name, description: site.description },
};

export const viewport: Viewport = { themeColor: '#0B0D09', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <body className="flex min-h-dvh flex-col">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:font-semibold focus:text-lime-ink"
                >
                    Skip to content
                </a>
                <SiteHeader />
                <main id="main" className="flex-1">
                    {children}
                </main>
                <SiteFooter />
            </body>
        </html>
    );
}
