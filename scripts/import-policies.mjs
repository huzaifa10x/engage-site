#!/usr/bin/env node
/**
 * Turns the policy document into the site's policy pages.
 *
 *   1. In Google Docs: File → Download → Markdown (.md)   (plain text .txt also works)
 *   2. npm run policies:import -- path/to/10X-Engage-Policy-Pages.md
 *
 * The document holds several policies one after another. Each starts with its title, then
 *     Last updated: 10 September 2026
 *     Url: /privacy-policy
 * and this script writes one file per policy into content/legal, served at exactly that Url.
 * Running it again replaces the files, so the document stays the single source of the wording.
 *
 * Placeholders such as [Company Legal Name] are filled from REPLACEMENTS below; any other
 * [Placeholder] left in the text is reported so nothing unfinished goes live unnoticed.
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// Matched without regard to capitals. The values are the company details given in the policy
// document's own "Contact" sections; change them here if the document changes.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://engage-site.10xdigital.ae').replace(/\/+$/, '');
const REPLACEMENTS = {
    // A link written with a placeholder domain points at the real page on this site.
    'https://[yourdomain.com]/data-deletion': `${SITE_URL}/user-data-deletion`,
    '[yourdomain.com]': SITE_URL.replace(/^https?:\/\//, ''),
    '[Company Legal Name]': 'Tenx Digital Fzco',
    '[Company Name]': 'Tenx Digital Fzco',
    '[App Name]': '10X Engage',
    '[Product Name]': '10X Engage',
    '[support email]': 'info@10xdigital.ae',
    '[registered address]': '6162 Building A1: DDP, Dubai Silicon Oasis',
    '[Emirate]': 'Dubai',
    '[info@10xdigital.ae]': 'info@10xdigital.ae',
};

const input = process.argv[2];
if (!input) {
    console.error('Usage: npm run policies:import -- <policy-document.md|.txt>');
    process.exit(1);
}

// Markdown exports put a backslash before punctuation (\\[ \\] \\. \\: \\+ …); the text itself has none.
const clean = (s) => s.replace(/\\([!-\/:-@\[-`{-~])/g, '$1').replace(/\u00a0/g, ' ');
const bare = (s) =>
    clean(s)
        .replace(/^#+\s*/, '')
        .replace(/[*_]/g, '')
        .trim();
const lines = readFileSync(input, 'utf8')
    .replace(/\r\n/g, '\n')
    .replace(/^\uFEFF/, '')
    .split('\n');

// Every policy is announced by a "Url: /something" line.
const starts = [];
lines.forEach((line, i) => {
    const m = /^url\s*:\s*(\/[^\s*_]*)/i.exec(bare(line));
    if (m) starts.push({ at: i, url: m[1].replace(/\/+$/, '') || '/' });
});
if (starts.length === 0) {
    console.error('No "Url: /…" lines found. Is this the policy document?');
    process.exit(1);
}

// The title is the nearest non-empty line above (skipping "Last updated"); it marks where the policy begins.
for (const start of starts) {
    let i = start.at - 1;
    let updated = null;
    while (i >= 0) {
        const text = bare(lines[i]);
        const u = /^last updated\s*:\s*(.+)$/i.exec(text);
        if (u) updated = u[1].trim();
        else if (text !== '') break;
        i--;
    }
    start.titleAt = Math.max(i, 0);
    start.title = bare(lines[start.titleAt]);
    start.updated = updated;
}
// "Last updated" may also sit just below the Url line.
starts.forEach((start, n) => {
    const end = n + 1 < starts.length ? starts[n + 1].titleAt : lines.length;
    let from = start.at + 1;
    for (let i = from; i < Math.min(from + 4, end); i++) {
        const u = /^last updated\s*:\s*(.+)$/i.exec(bare(lines[i]));
        if (u) {
            start.updated ??= u[1].trim();
            from = i + 1;
        }
    }
    // Google Docs tabs export their tab name as an extra heading right before the next policy's
    // title: headings (and blank lines) left dangling at the very end belong to nothing.
    let last = end;
    while (last > from && (bare(lines[last - 1]) === '' || /^#{1,6}\s/.test(lines[last - 1].trim()))) last--;
    start.body = lines.slice(from, last);
});

const out = path.join(process.cwd(), 'content', 'legal');
mkdirSync(out, { recursive: true });
for (const file of readdirSync(out)) if (file.endsWith('.md') && !file.startsWith('_')) rmSync(path.join(out, file));

const leftovers = new Set();
const seen = new Set();
starts.forEach((policy, index) => {
    if (seen.has(policy.url)) {
        console.error(`Two policies use the address ${policy.url}. Each needs its own Url.`);
        process.exit(1);
    }
    seen.add(policy.url);

    let body = policy.body.map(clean).join('\n');
    for (const [from, to] of Object.entries(REPLACEMENTS)) {
        body = body.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), to);
    }
    // Plain-text exports lose headings: a short numbered line on its own ("3. How we use data") is one.
    body = body.replace(/^(?!#)(\d{1,2}\.\s+[^\n]{2,90})\n(?=\n|[^\n])/gm, (line, heading) => (/[.:;,]$/.test(heading.trim()) ? line : `## ${heading}\n`));
    // Headings inside a policy start at level 2 (the page title is level 1).
    if (/^#\s/m.test(body)) body = body.replace(/^(#{1,5})\s/gm, '$1# ');
    body = body.replace(/\n{3,}/g, '\n\n').trim();
    for (const m of body.matchAll(/\[[A-Za-z][^\]\n]{2,60}\](?!\()/g)) leftovers.add(m[0]);

    const name = policy.url.replace(/^\//, '').replace(/\//g, '__');
    const front = [
        '---',
        `title: ${policy.title}`,
        `url: ${policy.url}`,
        policy.updated ? `updated: ${policy.updated}` : null,
        `order: ${index + 1}`,
        '---',
        '',
    ].filter((l) => l !== null);
    writeFileSync(path.join(out, `${name}.md`), `${front.join('\n')}\n${body}\n`);
    console.log(`  ✓ ${policy.url.padEnd(28)} ${policy.title}${policy.updated ? `  (updated ${policy.updated})` : ''}`);
});

console.log(`\n${starts.length} policy page(s) written to content/legal.`);
if (leftovers.size > 0) {
    console.log('\n⚠ Placeholders still in the text (fill them in the document, or add them to REPLACEMENTS in this script):');
    for (const item of leftovers) console.log(`    ${item}`);
}
