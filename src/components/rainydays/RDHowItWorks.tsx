const STEPS = [
    {
        n: '01',
        t: 'Track on your device',
        b: 'Each member records their own contributions locally. Nothing leaves the phone unless you choose to sync.',
    },
    {
        n: '02',
        t: 'See what the group has',
        b: 'Sync over the same Wi-Fi or scan a QR code. Members can see contributions and progress toward a shared goal.',
    },
    {
        n: '03',
        t: 'Coordinate the gap',
        b: 'When a need arises, the conversation starts with a clear number — not a guess. Money still moves the way it always has.',
    },
];

export default function RDHowItWorks() {
    return (
        <section
            id="rd-how"
            className="rd-how bg-[#0A0A0A] text-white py-32 relative overflow-hidden lg:py-24 sm:py-[72px]">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6 relative z-10">
                <div className="flex flex-col items-center gap-4 mb-14 max-w-[720px] mx-auto text-center rd-reveal">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/10 text-white border border-white/15">
                        How it works
                    </span>
                    <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] leading-[1.15] text-white text-balance">
                        Three steps. No accounts. No cloud.
                    </h2>
                    <p className="text-lg leading-relaxed text-[#B0B0B0] text-center sm:text-base">
                        RainyDays gives an existing social system a better record-keeping layer.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-12 lg:grid-cols-1">
                    {STEPS.map((s, i) => (
                        <div
                            key={s.n}
                            className={`rd-reveal rd-stagger-${i + 1} border-t border-white/10 pt-8 flex flex-col gap-4`}>
                            <div className="font-mono text-[80px] font-bold tracking-[-0.04em] text-white/10 leading-none sm:text-[56px]">
                                {s.n}
                            </div>
                            <h3 className="text-[22px] font-semibold tracking-[-0.01em]">{s.t}</h3>
                            <p className="text-[15px] leading-relaxed text-[#B0B0B0] max-w-[320px]">{s.b}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
