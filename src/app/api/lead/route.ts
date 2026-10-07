import { NextResponse } from 'next/server';

import { engageApiUrl } from '@/lib/plans';

/**
 * The demo / contact form posts here, and this server passes it to the product's API.
 * Going through our own server keeps the API address and its rate limit out of the browser and
 * needs no cross-origin setup on the API.
 */
export async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
    }

    const text = (key: string, max: number) => (typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, max) : '');
    const payload = {
        name: text('name', 120),
        email: text('email', 190),
        company: text('company', 160) || null,
        phone: text('phone', 40) || null,
        team_size: text('team_size', 40) || null,
        topic: ['demo', 'contact', 'enterprise'].includes(text('topic', 20)) ? text('topic', 20) : 'demo',
        message: text('message', 4000) || null,
        source: text('source', 190) || null,
        website: text('website', 10), // honeypot, checked by the API
    };
    if (!payload.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        return NextResponse.json({ message: 'Please enter your name and a valid work email.' }, { status: 422 });
    }

    try {
        const response = await fetch(`${engageApiUrl}/public/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Forwarded-For': request.headers.get('x-forwarded-for') ?? '' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000),
            cache: 'no-store',
        });
        if (response.status === 429) return NextResponse.json({ message: 'Too many requests. Please try again in a minute.' }, { status: 429 });
        if (response.status === 422) return NextResponse.json({ message: 'Please check your details and try again.' }, { status: 422 });
        if (!response.ok) throw new Error(`API answered ${response.status}`);

        return NextResponse.json({ status: 'received' }, { status: 201 });
    } catch {
        return NextResponse.json({ message: 'We could not send your request just now. Please try again, or contact us directly.' }, { status: 502 });
    }
}
