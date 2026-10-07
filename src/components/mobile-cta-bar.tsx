'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

/** Pages that are themselves the action (a form to fill in): the bar would only compete with it. */
const HIDDEN_ON = ['/start', '/demo', '/contact'];

/**
 * Phones only: the two main actions stay within thumb reach once the visitor has scrolled past
 * the first screen. It slides away again near the bottom of the page, where the footer and the
 * closing banner already offer the same actions.
 */
export function MobileCtaBar() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const agencies = pathname === '/agencies';

    useEffect(() => {
        const update = () => {
            const scrolled = window.scrollY;
            const fromBottom = document.documentElement.scrollHeight - (scrolled + window.innerHeight);
            setVisible(scrolled > 520 && fromBottom > 420);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [pathname]);

    if (HIDDEN_ON.includes(pathname)) return null;

    const primary = agencies ? { label: 'Book a demo', href: '/demo' } : { label: 'Start free trial', href: '/start' };
    const secondary = agencies ? { label: 'Start free trial', href: '/start' } : { label: 'Book a demo', href: '/demo' };

    return (
        <div
            aria-hidden={!visible}
            className={cn(
                'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-8px_rgba(11,13,9,.18)] backdrop-blur-md transition-transform duration-300 md:hidden',
                visible ? 'translate-y-0' : 'pointer-events-none translate-y-full',
            )}
        >
            <div className="mx-auto flex max-w-md gap-2.5">
                <Link
                    href={secondary.href}
                    tabIndex={visible ? 0 : -1}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line bg-paper text-[15px] font-semibold text-ink"
                >
                    {secondary.label}
                </Link>
                <Link
                    href={primary.href}
                    tabIndex={visible ? 0 : -1}
                    className="inline-flex h-11 flex-[1.25] items-center justify-center rounded-xl bg-lime text-[15px] font-semibold text-lime-ink shadow-[inset_0_-1px_0_rgba(16,26,2,.14)]"
                >
                    {primary.label}
                </Link>
            </div>
        </div>
    );
}
