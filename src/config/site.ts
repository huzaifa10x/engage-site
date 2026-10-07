/**
 * One place for everything that is "about the site" rather than "on a page": names, addresses,
 * navigation and footer links. Pages and components read from here, so a new page or a renamed
 * link is a one-line change.
 */

const trim = (url: string) => url.replace(/\/+$/, '');

export const site = {
    name: '10X Engage',
    shortName: 'Engage',
    company: '10X Digital',
    legalName: 'Tenx Digital Fzco',
    tagline: 'The premium WhatsApp platform for teams and agencies.',
    description:
        'A shared team inbox, broadcasts with real guardrails and multi-number management on the official WhatsApp Business Platform. 0% markup on messages. Built by 10X Digital, a Meta Tech Provider.',
    location: 'Dubai, United Arab Emirates',
    url: trim(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://engage-site.10xdigital.ae'),
    appUrl: trim(process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.10xdigital.ae'),
    companyUrl: 'https://www.10xdigital.ae',
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@10xdigital.ae',
    whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '') || null,
} as const;

/** The app's address without the protocol, as shown to people: "app.10xdigital.ae". */
export const appHost = site.appUrl.replace(/^https?:\/\//, '');

export const whatsappLink = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : null;

// ── Links into the product ─────────────────────────────────────────────────────────────────

export type Interval = 'monthly' | 'yearly';

export const app = {
    signIn: `${site.appUrl}/login`,
    /**
     * Where a trial starts: the product's own sign-up, so the account, the email code and the
     * workspace are created by one system. The plan the visitor was looking at and their email
     * travel along, so they do not type or choose anything twice.
     */
    register(options: { plan?: string; interval?: Interval; email?: string } = {}): string {
        const params = new URLSearchParams();
        if (options.plan) params.set('plan', options.plan);
        if (options.interval) params.set('interval', options.interval);
        if (options.email) params.set('email', options.email);
        params.set('utm_source', 'website');
        const query = params.toString();

        return `${site.appUrl}/register${query ? `?${query}` : ''}`;
    },
};

// ── Navigation ─────────────────────────────────────────────────────────────────────────────

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
    { label: 'Product', href: '/product' },
    { label: 'For agencies', href: '/agencies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Security', href: '/security' },
];

/** Footer columns. The "Legal" column is filled automatically from content/legal (see lib/legal.ts). */
export const footerNav: { title: string; links: NavLink[] }[] = [
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '/product' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'For agencies', href: '/agencies' },
            { label: 'Start free trial', href: '/start' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Security', href: '/security' },
            { label: 'Book a demo', href: '/demo' },
        ],
    },
];
