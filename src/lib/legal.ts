import 'server-only';

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { marked } from 'marked';

/**
 * Policy pages are plain Markdown files in /content/legal. Each file says, at the top, what it is
 * called and WHICH ADDRESS it lives at:
 *
 *     ---
 *     title: Privacy Policy
 *     url: /privacy-policy
 *     updated: 10 September 2026
 *     order: 1
 *     ---
 *
 * The page is served at exactly that address, the footer and /legal list it automatically, and it
 * is added to the sitemap. Adding or changing a policy never needs a code change:
 * `npm run policies:import <file>` creates these files from the policy document.
 */

export type Policy = { title: string; url: string; slug: string[]; updated: string | null; order: number; summary: string | null; html: string };

const DIR = path.join(process.cwd(), 'content', 'legal');

function parse(file: string): Policy | null {
    const raw = readFileSync(path.join(DIR, file), 'utf8').replace(/\r\n/g, '\n');
    const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
    if (!match) return null;

    const meta: Record<string, string> = {};
    for (const line of match[1].split('\n')) {
        const at = line.indexOf(':');
        if (at > 0)
            meta[line.slice(0, at).trim().toLowerCase()] = line
                .slice(at + 1)
                .trim()
                .replace(/^["']|["']$/g, '');
    }
    const url = `/${(meta.url ?? file.replace(/\.md$/, '')).replace(/^\/+|\/+$/g, '')}`;
    if (!meta.title || url === '/') return null;

    return {
        title: meta.title,
        url,
        slug: url.slice(1).split('/'),
        updated: meta.updated || null,
        order: Number(meta.order ?? 99),
        summary: meta.summary || null,
        html: marked.parse(match[2], { async: false, gfm: true }) as string,
    };
}

let cache: Policy[] | null = null;

export function getPolicies(): Policy[] {
    if (cache && process.env.NODE_ENV === 'production') return cache;
    let files: string[] = [];
    try {
        files = readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
    } catch {
        // No folder yet: the site simply has no policy pages.
    }
    cache = files
        .map(parse)
        .filter((p): p is Policy => p !== null)
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

    return cache;
}

export function getPolicy(slug: string[]): Policy | null {
    const url = `/${slug.join('/')}`;

    return getPolicies().find((p) => p.url === url) ?? null;
}
