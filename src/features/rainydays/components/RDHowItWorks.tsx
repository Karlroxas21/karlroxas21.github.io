import { RD_SECTION } from '../rdTokens';
import { InkBackdrop, SectionHead, Shell } from './RDPrimitives';

const STEPS = [
    {
        n: '01',
        t: 'Track on your device',
        b: 'Each member records their own contributions locally. Nothing leaves the phone unless you choose to sync.',
        meta: 'Local only',
    },
    {
        n: '02',
        t: 'See what the group has',
        b: 'Sync over the same Wi-Fi or scan a QR code. Members see contributions and progress toward a shared goal.',
        meta: 'Peer-to-peer',
    },
    {
        n: '03',
        t: 'Coordinate the gap',
        b: 'When a need arises, the conversation starts with a clear number, not a guess. Money still moves the way it always has.',
        meta: 'Off-app, between people',
    },
];

export default function RDHowItWorks() {
    return (
        <section id="rd-how" className={`relative isolate overflow-hidden bg-[#0A0A0A] text-white ${RD_SECTION}`}>
            <InkBackdrop />

            <Shell className="relative z-10">
                <SectionHead
                    eyebrow="How it works"
                    title="Three steps. No accounts. No cloud."
                    lead="RainyDays gives an existing social system a better record-keeping layer."
                    tone="dark"
                    align="center"
                    className="mb-14 md:mb-20"
                />

                <ol className="grid gap-10 lg:grid-cols-3 lg:gap-x-0">
                    {STEPS.map((s, i) => (
                        <li
                            key={s.n}
                            className={`rd-reveal rd-stagger-${i + 1} relative border-t border-white/15 pt-8 lg:pr-10`}>
                            <span
                                className="absolute -top-[4.5px] left-0 h-2 w-2 rounded-full bg-white"
                                aria-hidden="true"
                            />
                            <div className="font-mono text-[64px] font-bold leading-none tracking-[-0.05em] text-white md:text-[80px]">
                                {s.n}
                            </div>
                            <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] md:text-[22px]">{s.t}</h3>
                            <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[#B0B0B0]">{s.b}</p>
                            <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#808080]">
                                <span className="h-px w-5 bg-white/20" aria-hidden="true" />
                                {s.meta}
                            </span>
                        </li>
                    ))}
                </ol>
            </Shell>
        </section>
    );
}
