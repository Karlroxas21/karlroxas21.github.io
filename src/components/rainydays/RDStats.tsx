const STATS = [
    {
        num: 'No money moves',
        label: "RainyDays doesn't hold or transfer funds. The app keeps the record; you keep the money.",
    },
    {
        num: 'Works offline',
        label: 'During a brownout, on the way to the hospital, in any signal-poor place. Always available.',
    },
    {
        num: 'Same Wi-Fi sync',
        label: 'Group members sync records peer-to-peer on the local network. No cloud, no middleman.',
    },
];

export default function RDStats() {
    return (
        <section id="rd-stats" className="bg-[#F5F5F5] py-16 border-t border-b border-[#E5E5E5]">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-10 text-center md:text-left">
                    {STATS.map((s, i) => (
                        <div
                            key={i}
                            className={`rd-reveal px-8 sm:px-0 ${i < STATS.length - 1 ? 'border-r border-[#E5E5E5] md:border-r-0' : ''}`}>
                            <div className="text-[36px] font-bold leading-none font-mono tracking-[-0.03em] lg:text-[28px] sm:text-2xl">
                                {s.num}
                            </div>
                            <div className="text-sm text-[#808080] mt-3">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
