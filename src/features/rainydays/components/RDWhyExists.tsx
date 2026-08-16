import type { ReactNode } from 'react';

import { RD_H2, RD_NUM, RD_SECTION } from '../rdTokens';
import { Cite, Eyebrow, Shell } from './RDPrimitives';

/** Both figures are quoted from the 2021 FIS, reference 1. */
const FIGURES = [
    { value: '66%', label: 'Hit a liquidity gap at least once' },
    { value: '₱33,137', label: 'Average gap, from ₱11,606 in 2019' },
];

const PARAS: ReactNode[] = [
    <>
        Most Filipino households do not have a financial cushion. Only 37% of adults had any savings in 2021, down from
        53% two years earlier, and of those who do save, 52% keep the money at home.
        <Cite keys={['fis2021']} />
    </>,
    <>
        When a crisis hits, whether a hospitalization, a broken motorcycle or a sudden job loss, the formal safety nets
        leave gaps. PhilHealth case rates do not cover everything. SSS calamity loans take time the family does not
        have. Borrowing is what households fall back on, and the fastest lenders are the informal ones: family and
        friends, alongside 5-6 schemes.
        <Cite keys={['fis2021', 'lending56']} />
    </>,
    <>
        These groups already work. They are based on trust between people who know each other. The bottleneck is not
        willingness. It is clarity. RainyDays makes that conversation precise: who has what, how much is needed, and
        when.
    </>,
];

export default function RDWhyExists() {
    return (
        <section id="rd-why" className={`bg-white ${RD_SECTION}`}>
            <Shell>
                <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
                    {/* Claim + figures */}
                    <div className="rd-reveal flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
                        <Eyebrow>Why this exists</Eyebrow>
                        <h2 className={RD_H2}>
                            Two in three adults ran short at least once, and the gap averages ₱33,137.
                            <Cite keys={['fis2021']} />
                        </h2>

                        <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#E5E5E5]">
                            {FIGURES.map(f => (
                                <div
                                    key={f.value}
                                    className="flex min-h-[104px] flex-col justify-between gap-3 bg-[#F5F5F5] p-5">
                                    <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#808080]">
                                        {f.label}
                                    </dt>
                                    <dd className={`text-2xl font-bold text-[#0A0A0A] md:text-[28px] ${RD_NUM}`}>
                                        {f.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Argument */}
                    <div className="rd-reveal rd-stagger-2 flex flex-col gap-5">
                        {PARAS.map((p, i) => (
                            <p
                                key={i}
                                className={
                                    i === 0
                                        ? 'text-[17px] leading-[1.7] text-[#2A2A2A] md:text-lg'
                                        : 'text-base leading-[1.75] text-[#808080] md:text-[17px]'
                                }>
                                {p}
                            </p>
                        ))}

                        <p className="mt-4 border-l-2 border-[#0A0A0A] pl-5 text-sm italic leading-relaxed text-[#0A0A0A]">
                            Built in the Philippines, for the people who already help each other.
                        </p>
                    </div>
                </div>
            </Shell>
        </section>
    );
}
