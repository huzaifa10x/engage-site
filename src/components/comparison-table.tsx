import { CheckIcon, MinusIcon } from 'lucide-react';
import { Fragment } from 'react';

import { comparison } from '@/lib/pricing';
import type { Catalog } from '@/lib/plans';

/** Every feature and limit of every plan, side by side. Built entirely from the catalog. */
export function ComparisonTable({ catalog }: { catalog: Catalog }) {
    const groups = comparison(catalog.plans);

    return (
        <>
            <p className="mb-3 text-[13px] text-muted lg:hidden">Scroll sideways to see every plan →</p>
            <div className="overflow-x-auto rounded-2xl border border-line bg-paper shadow-card">
                <table className="w-full min-w-[46rem] border-collapse text-left text-[14.5px]">
                    <caption className="sr-only">Plan comparison</caption>
                    <thead>
                        <tr className="border-b border-line">
                            <th scope="col" className="sticky left-0 z-10 min-w-40 bg-paper px-4 py-4 font-semibold sm:px-5">
                                Compare plans
                            </th>
                            {catalog.plans.map((plan) => (
                                <th key={plan.key} scope="col" className="px-4 py-4 text-center font-semibold">
                                    {plan.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <Fragment key={group.title}>
                                <tr className="bg-paper-2">
                                    <th
                                        scope="colgroup"
                                        colSpan={catalog.plans.length + 1}
                                        className="px-5 py-2.5 text-[12.5px] font-semibold tracking-wider text-muted uppercase"
                                    >
                                        {group.title}
                                    </th>
                                </tr>
                                {group.rows.map((row) => (
                                    <tr key={row.key} className="border-t border-line">
                                        <th
                                            scope="row"
                                            className="sticky left-0 z-10 bg-paper px-4 py-3 font-medium text-body shadow-[1px_0_0_var(--line)] sm:px-5"
                                        >
                                            {row.label}
                                        </th>
                                        {row.values.map((value, i) => (
                                            <td key={catalog.plans[i].key} className="px-4 py-3 text-center text-body">
                                                {value === true ? (
                                                    <CheckIcon className="mx-auto size-4.5 text-brand-600" aria-label="Included" />
                                                ) : value === false ? (
                                                    <MinusIcon className="mx-auto size-4 text-line" aria-label="Not included" />
                                                ) : (
                                                    value
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
