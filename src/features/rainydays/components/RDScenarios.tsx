import { RD_BODY, RD_CARD, RD_NUM, RD_SECTION } from '../rdTokens';
import { Amount, Cite, SectionHead, Shell } from './RDPrimitives';

const SCENARIOS = [
    {
        chip: 'Hospital',
        amount: '₱115,000',
        split: '6 members × ₱18,000',
        title: 'After PhilHealth, the gap is due before discharge.',
        cite: 'lending56' as const,
        body: 'A family member is admitted for a serious illness. The bill is ₱150,000; the PhilHealth case rate covers ₱35,000. The household has ₱8,000 on hand. The group has been tracking for months, so the gap closes without a 5-6 lender at 240% annualized.',
    },
    {
        chip: 'Livelihood',
        amount: '₱6,500',
        split: '1 member fronts it',
        title: 'The motorcycle is the only way to work.',
        body: 'It breaks down on a Tuesday morning and the repair shop wants full payment. A trusted member of the group can front the cost. Repayment happens informally over two months, between people who know each other.',
    },
    {
        chip: 'Rent',
        amount: '₱7,500',
        split: '4 members × ₱1,500',
        title: 'Eight days until rent is due.',
        body: "A contractual job ends with one week's notice. An SSS calamity loan needs more time than the family has. Four members can each put in ₱1,500 without strain. Rent is paid, and the job search continues from home.",
    },
];

export default function RDScenarios() {
    return (
        <section id="rd-scenarios" className={`bg-white ${RD_SECTION}`}>
            <Shell>
                <SectionHead
                    eyebrow="What a rainy day looks like"
                    title="Specific moments. Real numbers."
                    lead="These are the situations RainyDays is built for, when the group needs to know, quickly and clearly, what's prepared and what the gap is."
                    className="mb-12 md:mb-16"
                />

                <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
                    {SCENARIOS.map((s, i) => (
                        <article
                            key={s.title}
                            className={`rd-reveal rd-stagger-${i + 1} ${RD_CARD} group flex flex-col gap-5 p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(10,10,10,.04),0_20px_40px_-18px_rgba(10,10,10,.18)] md:flex-row md:items-start md:gap-8 md:p-8 lg:flex-col lg:gap-5`}>
                            <div className="flex shrink-0 flex-col gap-3 md:w-[210px] lg:w-auto">
                                <span className="inline-flex w-fit items-center rounded-full bg-[#F0F0F0] px-3 py-1.5 text-xs font-medium tracking-wide text-[#0A0A0A]">
                                    {s.chip}
                                </span>

                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#808080]">
                                        Gap to close
                                    </span>
                                    <Amount value={s.amount} countUp className="text-3xl font-bold text-[#0A0A0A]" />
                                    <span className={`text-xs text-[#808080] ${RD_NUM}`}>{s.split}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 border-t border-[#E5E5E5] pt-5 md:border-t-0 md:border-l md:pl-8 md:pt-0 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-5">
                                <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-balance md:text-xl">
                                    {s.title}
                                </h3>
                                <p className={`${RD_BODY} text-[#808080]`}>
                                    {s.body}
                                    {s.cite && <Cite keys={[s.cite]} />}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="mx-auto mt-10 max-w-[680px] text-center text-sm leading-relaxed text-[#808080] md:mt-14 md:text-[15px]">
                    RainyDays does not pool money or process payments. It tracks what each person has set aside on their
                    own device, so the group can see where they stand the moment something happens.
                </p>
            </Shell>
        </section>
    );
}
