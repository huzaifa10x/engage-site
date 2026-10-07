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

                <div className="ml-auto hidden items-center gap-2 lg:flex">
                    <Button href={app.signIn} variant="ghost">
                        Sign in
                    </Button>
                    <Button href="/demo" variant="outline">
                        Book a demo
                    </Button>
                    <Button href="/start">Start free trial</Button>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    className="ml-auto inline-flex size-11 items-center justify-center rounded-xl border border-line lg:hidden"
                >
                    {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                </button>
            </Container>

            {open && (
                <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper lg:hidden">
                    <Container className="flex flex-col gap-1 py-5">
                        {mainNav.map((item) => (
                            <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3.5 text-lg font-medium hover:bg-paper-2">
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-4 grid gap-2.5 border-t border-line pt-5">
                            <Button href="/start" size="lg">
                                Start free trial
                            </Button>
                            <Button href="/demo" variant="outline" size="lg">
                                Book a demo
                            </Button>
                            <Button href={app.signIn} variant="ghost" size="lg">
                                Sign in
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
}
