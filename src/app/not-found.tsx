import { Button, Container } from '@/components/ui';

export default function NotFound() {
    return (
        <Container className="py-24 text-center sm:py-32">
            <p className="text-[13.5px] font-semibold tracking-wider text-brand-600 uppercase">404</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">This page does not exist.</h1>
            <p className="mx-auto mt-4 max-w-md text-[17px] text-muted">The link may be old, or the address may have a typo.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/">Back to home</Button>
                <Button href="/pricing" variant="outline">
                    See pricing
                </Button>
            </div>
        </Container>
    );
}
