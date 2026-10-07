import type { MetadataRoute } from 'next';

import { site } from '@/config/site';
import { getPolicies } from '@/lib/legal';

const PAGES = ['', '/product', '/agencies', '/pricing', '/start', '/demo', '/about', '/contact', '/security', '/legal'];

export default function sitemap(): MetadataRoute.Sitemap {
    return [...PAGES, ...getPolicies().map((p) => p.url)].map((path) => ({
        url: `${site.url}${path}`,
        changeFrequency: path === '/pricing' ? 'daily' : 'monthly',
        priority: path === '' ? 1 : path === '/pricing' || path === '/product' ? 0.9 : 0.6,
    }));
}
