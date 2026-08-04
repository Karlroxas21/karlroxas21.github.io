import { RD_INK_GRADIENT, RD_SECTION } from '../rdTokens';
import { IconArrowRight, IconFileKey, IconFingerprint, IconLink } from './RDIcons';
import { Chip, InkBackdrop, SectionLink, Shell } from './RDPrimitives';

const CRYPTO = [
    { icon: <IconFingerprint size={16} strokeWidth={1.8} />, label: 'Ed25519 signatures', note: 'Every entry signed' },
    { icon: <IconLink size={16} strokeWidth={1.8} />, label: 'Hash-linked log', note: 'Tampering breaks the chain' },
    { icon: <IconFileKey size={16} strokeWidth={1.8} />, label: 'AES-256-GCM export', note: 'Your passphrase only' },
];

export default function RDPrivacyCallout() {
    return (
        <section
            id="rd-security"
            className={`rd-callout relative isolate overflow-hidden text-center text-white ${RD_INK_GRADIENT} ${RD_SECTION}`}>
            <InkBackdrop grid={false} />

            <Shell className="relative z-10">
                <div className="rd-reveal mx-auto flex max-w-[680px] flex-col items-center gap-6">
                    <Chip tone="dark">Privacy by design</Chip>

                    <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
                        Each device is sovereign.
                    </h2>

                    <p className="max-w-[560px] text-base leading-relaxed text-[#D5D5D5] md:text-lg">
                        There is no central database and no backend that can be breached, subpoenaed, or shut down.
                        Syncing happens directly between group members, on the same Wi-Fi or by QR code in person.
                        Delete the app and your data is gone, because it was only ever on your device.
                    </p>

                    <SectionLink
                        id="rd-download"
                        className="mt-2 inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 font-semibold text-white transition-all hover:bg-white/15 active:scale-[0.98]">
                        Download now
                        <IconArrowRight size={16} strokeWidth={2} />
                    </SectionLink>
                </div>

                <ul className="rd-reveal rd-stagger-2 mx-auto mt-12 grid max-w-[880px] gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
                    {CRYPTO.map(c => (
                        <li
                            key={c.label}
                            className="flex flex-col items-center gap-2 bg-[#0F0F0F] px-5 py-6 text-center">
                            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/[0.06] text-white">
                                {c.icon}
                            </span>
                            <span className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                                {c.label}
                            </span>
                            <span className="text-[13px] text-[#808080]">{c.note}</span>
                        </li>
                    ))}
                </ul>
            </Shell>
        </section>
    );
}
