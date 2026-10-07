import { getCatalog } from '@/lib/plans';
import { cn } from '@/lib/utils';

/**
 * The reassurance line under a primary button. The trial length comes from the product, so it
 * never disagrees with what sign-up actually gives.
 */
export async function TrialNote({ onDark = false, className }: { onDark?: boolean; className?: string }) {
    const days = (await getCatalog())?.trial.days ?? null;

    return (
        <p className={cn('text-[13.5px]', onDark ? 'text-white/55' : 'text-muted', className)}>
            No card required · {days ? `${days}-day free trial` : 'Free trial'} · Cancel any time
        </p>
    );
}
