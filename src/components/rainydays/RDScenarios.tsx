const SCENARIOS = [
    {
        chip: 'Hospital',
        amount: '₱115,000',
        rawAmount: 115000,
        title: 'After PhilHealth, the gap is due before discharge.',
        body: 'A family member is admitted for a serious illness. The total bill is ₱150,000. PhilHealth case rate covers ₱35,000. The household has ₱8,000 in the house. The group has been tracking for months — six members can each put in ₱18,000, and the gap closes without a 5-6 lender at 240% annualized.',
    },
    {
        chip: 'Livelihood',
        amount: '₱6,500',
        rawAmount: 6500,
        title: 'The motorcycle is the only way to work.',
        body: 'It breaks down on a Tuesday morning. The repair shop wants full payment. A trusted member of the group can front the cost. Repayment happens informally over two months — between people who know each other.',
    },
    {
        chip: 'Rent',
        amount: '₱7,500',
        rawAmount: 7500,
        title: 'Eight days until rent is due.',
        body: "A contractual job ends with one week's notice. SSS calamity loan needs more time than the family has. Four members of the group can each put in ₱1,500 without strain. Rent is paid. The job search continues from home.",
    },
];

export default function RDScenarios() {
    return (
        <section id="rd-scenarios" className="py-24 bg-white lg:py-[72px] sm:py-14">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-[720px] sm:mb-10 rd-reveal">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#F0F0F0] text-[#0A0A0A] self-start">
                        What a rainy day looks like
                    </span>
                    <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] leading-[1.15] text-balance">
                        Specific moments. Real numbers.
                    </h2>
                    <p className="text-lg leading-relaxed text-[#808080] max-w-[580px] sm:text-base">
                        These are the situations RainyDays is built for — when the group needs to know, quickly and
                        clearly, what's prepared and what the gap is.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 lg:grid-cols-1">
                    {SCENARIOS.map((s, i) => (
                        <article
                            key={s.title}
                            className={`rd-reveal rd-stagger-${i + 1} bg-white border border-[#E5E5E5] rounded-2xl p-8 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,.08),0_4px_12px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,.12),0_1px_4px_rgba(0,0,0,.06)] transition-all duration-200 sm:p-6`}>
                            <div className="flex justify-between items-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#F0F0F0] text-[#0A0A0A]">
                                    {s.chip}
                                </span>
                                <span
                                    className="font-mono text-2xl font-bold tracking-[-0.02em] text-[#0A0A0A] tabular-nums"
                                    data-countup={s.amount}>
                                    {s.amount}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold tracking-[-0.01em] leading-snug text-balance">
                                {s.title}
                            </h3>
                            <p className="text-[15px] leading-[1.6] text-[#808080]">{s.body}</p>
                        </article>
                    ))}
                </div>

                <p className="mt-12 mx-auto max-w-[720px] text-center text-[15px] leading-relaxed text-[#808080] italic">
                    RainyDays does not pool money or process payments. It tracks what each person has set aside on their
                    own device — so the group can see where they stand the moment something happens.
                </p>
            </div>
        </section>
    );
}
