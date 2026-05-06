export default function RDWhyExists() {
    return (
        <section id="rd-why" className="py-24 bg-white lg:py-[72px] sm:py-14">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6">
                <div className="max-w-[720px] mx-auto flex flex-col gap-6 rd-reveal">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#F0F0F0] text-[#0A0A0A] self-start">
                        Why this exists
                    </span>

                    <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] leading-[1.15] text-balance">
                        A single emergency can cost ₱15,000 — and trigger a ₱80,000 cascade.
                    </h2>

                    <div className="flex flex-col gap-[18px] text-[17px] leading-[1.7] text-[#808080] sm:text-base">
                        <p>
                            Most Filipino households do not have a financial cushion. The math is merciless: wages have
                            not kept pace with the cost of living, so the buffer stays thin even for households that
                            manage money carefully.
                        </p>
                        <p>
                            When a crisis hits — a hospitalization, a broken motorcycle, a sudden job loss — the formal
                            safety nets leave gaps. PhilHealth case rates do not cover everything. SSS calamity loans
                            take time the family does not have. Into that gap, Filipino households have always placed
                            the extended family network.
                        </p>
                        <p>
                            These groups already work. They are based on trust between people who know each other. The
                            bottleneck is not willingness — it is clarity. RainyDays is a tool to make that conversation
                            precise: who has what, how much is needed, and when.
                        </p>
                        <p className="text-sm text-[#808080] italic mt-3">
                            — Built in the Philippines, for the people who already help each other.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
