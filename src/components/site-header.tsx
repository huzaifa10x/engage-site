'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, Container, Logo } from '@/components/ui';
import { app, mainNav } from '@/config/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [last, setLast] = useState(pathname);

    // Close the mobile menu when the page changes.
    if (last !== pathname) {
        setLast(pathname);
        setOpen(false);
    }

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        const escape = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', escape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', escape);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
            <Container className="flex h-16 items-center gap-6">
                <Link href="/" aria-label="10X Engage home" className="shrink-0">
                    <Logo />
                </Link>

                <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={pathname === item.href ? 'page' : undefined}
                            className={cn(
                                'rounded-lg px-3 py-2 text-[15px] font-medium text-body transition-colors hover:bg-paper-2 hover:text-ink',
                                pathname === item.href && 'bg-paper-2 text-ink',
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop: one button. Signing in is a quiet link; booking a demo lives in the navigation. */}
                <div className="ml-auto hidden items-center gap-1 lg:flex">
                    <a href={app.signIn} className="rounded-lg px-3 py-2 text-[15px] font-medium text-body hover:text-ink">
                        Sign in
                    </a>
                    <Button href="/start">Start free trial</Button>
                </div>

                {/* Phones and tablets: the trial stays one tap away next to the menu button. */}
                <div className="ml-auto flex items-center gap-2 lg:hidden">
                    <Button href="/start" className="h-10 px-4 text-[14.5px] max-[380px]:hidden">
                        Start free trial
                    </Button>
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        className="inline-flex size-11 items-center justify-center rounded-xl border border-line"
                    >
                        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                    </button>
                </div>
            </Container>

            {open && (
                <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col border-t border-line bg-paper lg:hidden">
                    <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
                        {[{ label: 'Home', href: '/' }, ...mainNav.filter((item) => item.href !== '/demo')].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={pathname === item.href ? 'page' : undefined}
                                className={cn(
                                    'flex min-h-14 items-center rounded-xl px-4 text-lg font-medium',
                                    pathname === item.href ? 'bg-brand-50 font-semibold text-brand-600' : 'text-ink hover:bg-paper-2',
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a href={app.signIn} className="mt-2 flex min-h-12 items-center border-t border-line px-4 pt-2 text-[15.5px] font-medium text-muted">
                            Already a customer? Sign in
                        </a>
                    </nav>
                    {/* The two main actions stay pinned at the bottom of the open menu. */}
                    <div className="grid gap-2.5 border-t border-line bg-paper px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-8">
                        <Button href="/start" size="lg" className="w-full">
                            Start free trial
                        </Button>
                        <Button href="/demo" variant="outline" size="lg" className="w-full">
                            Book a demo
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
