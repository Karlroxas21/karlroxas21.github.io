import { RD_NUM, RD_SECTION } from '../rdTokens';
import { IconArrowRight } from './RDIcons';
import { Cite, InkBackdrop, SectionHead, Shell } from './RDPrimitives';

/**
 * Figures are quoted from the BSP's own reports, each tagged with the survey it
 * came from. Nothing here is derived or rounded by us.
 */
const FIGURES = [
    {
        value: '3 in 10',
        label: 'Adults whose finances or savings would last through a setback',
        source: '2025 CFIS',
        cite: 'cfis2025',
    },
    {
        value: '37%',
        label: 'Adults with any savings in 2021, down from 53% in 2019',
        source: '2021 FIS',
        cite: 'fis2021',
    },
    {
        value: '52%',
        label: 'Of those who do save, share keeping the money at home',
        source: '2021 FIS',
        cite: 'fis2021',
    },
    {
        value: '₱9,159',
        label: 'Average cost of one unexpected family event',
        source: '2021 FIS',
        cite: 'fis2021',
    },
] as const;

const SOURCES = [
    {
        label: '2025 Consumer Finance and Inclusion Survey',
        note: '8,784 adults, February to July 2025',
        href: 'https://www.bsp.gov.ph/Inclusive%20Finance/Financial%20Inclusion%20Reports%20and%20Publications/2025/2025CFISreport.pdf',
    },
    {
        label: '2021 Financial Inclusion Survey',
        note: '1,200 adults, fielded January to February 2022',
        href: 'https://www.bsp.gov.ph/Inclusive%20Finance/Financial%20Inclusion%20Reports%20and%20Publications/2021/2021FISToplineReport.pdf',
    },
];

export default function RDResearch() {
    return (
        <section id="rd-evidence" className={`relative isolate overflow-hidden bg-[#0A0A0A] text-white ${RD_SECTION}`}>
            <InkBackdrop />

            <Shell className="relative z-10">
                <SectionHead
                    eyebrow="The evidence"
                    title="The buffer is thin, and the numbers say so."
                    lead="Bangko Sentral ng Pilipinas measures this every few years. Its own surveys describe the gap RainyDays is built around."
                    tone="dark"
                    className="mb-12 md:mb-16"
                />

                <dl className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                    {FIGURES.map((f, i) => (
                        <div
                            key={f.value}
                            className={`rd-reveal rd-stagger-${i + 1} flex flex-col gap-3 bg-[#0F0F0F] p-6 md:p-7`}>
                            <dd className={`text-3xl font-bold text-white md:text-[34px] ${RD_NUM}`}>{f.value}</dd>
                            <dt className="text-sm leading-snug text-[#B0B0B0]">{f.label}</dt>
                            <span className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#808080]">
                                {f.source}
                                <Cite keys={[f.cite]} tone="dark" />
                            </span>
                        </div>
                    ))}
                </dl>

                <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
                    <div className="rd-reveal flex flex-col gap-4">
                        <p className="text-base leading-[1.7] text-[#D5D5D5] md:text-[17px]">
                            Around five in ten Filipino adults faced a resiliency need in the survey year, arising from
                            an unexpected incidence in the family such as sickness, death, or loss of job. Borrowing was
                            the main coping mechanism across every kind of financial need, and informal sources, meaning
                            family and friends alongside 5-6 lending schemes, were the top providers of those loans
                            because they release funds fastest.
                            <Cite keys={['fis2021']} tone="dark" />
                        </p>
                        <p className="text-base leading-[1.7] text-[#B0B0B0] md:text-[17px]">
                            That is the choice most households actually face: the group, or the lender. RainyDays does
                            not add another lender. It makes the group legible, so what each member has set aside is
                            already on the record before the day it is needed.
                        </p>
                    </div>

                    <div className="rd-reveal rd-stagger-2 flex flex-col gap-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#808080]">
                            Sources
                        </span>
                        {SOURCES.map(s => (
                            <a
                                key={s.href}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="group flex flex-col gap-1 text-sm text-[#D5D5D5] transition-colors hover:text-white">
                                <span className="inline-flex items-center gap-1.5 font-medium">
                                    {s.label}
                                    <IconArrowRight
                                        size={13}
                                        strokeWidth={2}
                                        className="transition-transform duration-150 group-hover:translate-x-0.5"
                                    />
                                </span>
                                <span className="text-xs text-[#808080]">{s.note}</span>
                            </a>
                        ))}
                        <span className="text-xs leading-relaxed text-[#808080]">
                            Bangko Sentral ng Pilipinas. Figures quoted as published; the two surveys use different
                            methodologies and sample sizes.
                        </span>
                    </div>
                </div>
            </Shell>
        </section>
    );
}
