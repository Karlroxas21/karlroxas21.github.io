import { RD_BODY, RD_CARD, RD_SECTION } from '../rdTokens';
import { IconCloudRain, IconFileKey, IconQrCode, IconShieldCheck, IconUsers, IconWallet } from './RDIcons';
import { SectionHead, Shell } from './RDPrimitives';

const FEATURES = [
    {
        icon: <IconUsers size={22} strokeWidth={1.8} />,
        title: 'Group coordination',
        body: "See what each member has tracked toward a shared goal. Replace 'may pera ba kayo?' with a clear record of what's prepared, before anyone has to ask.",
        wide: true,
    },
    {
        icon: <IconWallet size={22} strokeWidth={1.8} />,
        title: 'Personal fund',
        body: 'Track your own savings on your own device. Keep an emergency fund plus separate funds for personal goals and specific expenses, each with its own balance and history.',
    },
    {
        icon: <IconQrCode size={22} strokeWidth={1.8} />,
        title: 'Peer-to-peer sync',
        body: 'Sync with the group over the same Wi-Fi or by scanning a QR code in person. No internet, no middleman, no account.',
    },
    {
        icon: <IconShieldCheck size={22} strokeWidth={1.8} />,
        title: 'No money moves',
        body: 'Not a banking app. It does not hold funds or process payments. Money still moves the way it always has, between people you trust.',
    },
    {
        icon: <IconFileKey size={22} strokeWidth={1.8} />,
        title: 'Encrypted export',
        body: 'Back up as an encrypted .rdSync file. AES-256-GCM with a passphrase you control. Nothing leaves your device unless you want it to.',
    },
    {
        icon: <IconCloudRain size={22} strokeWidth={1.8} />,
        title: 'Tamper-evident by design',
        body: 'Every entry is signed with Ed25519 and hash-linked to the previous one. Any change breaks the chain, and the app sees it.',
    },
];

export default function RDFeatures() {
    return (
        <section id="rd-features" className={`bg-[#F5F5F5] ${RD_SECTION}`}>
            <Shell>
                <SectionHead
                    eyebrow="What RainyDays does"
                    title="A coordination tool, not a financial product."
                    lead="Six things, deliberately. Built for emergency funds first, with room to track a personal fund and separate expenses alongside it."
                    className="mb-12 md:mb-16"
                />

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {FEATURES.map((f, i) => {
                        const dark = f.wide;
                        return (
                            <div
                                key={f.title}
                                className={`rd-reveal rd-stagger-${Math.min(i + 1, 6)} flex flex-col gap-4 p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 md:p-7 ${
                                    f.wide ? 'md:col-span-2 lg:col-span-1' : ''
                                } ${
                                    dark
                                        ? 'rounded-2xl border border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-[0_20px_50px_-24px_rgba(10,10,10,.5)]'
                                        : `${RD_CARD} hover:shadow-[0_1px_2px_rgba(10,10,10,.04),0_20px_40px_-18px_rgba(10,10,10,.18)]`
                                }`}>
                                <span
                                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                                        dark
                                            ? 'border border-white/15 bg-white/10 text-white'
                                            : 'bg-[#F0F0F0] text-[#0A0A0A]'
                                    }`}>
                                    {f.icon}
                                </span>
                                <h3
                                    className={`text-lg font-semibold tracking-[-0.01em] md:text-xl ${
                                        dark ? 'text-white' : 'text-[#0A0A0A]'
                                    }`}>
                                    {f.title}
                                </h3>
                                <p className={`${RD_BODY} ${dark ? 'max-w-[52ch] text-[#B0B0B0]' : 'text-[#808080]'}`}>
                                    {f.body}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <p className="rd-reveal mx-auto mt-10 max-w-[680px] text-center text-sm leading-relaxed text-[#808080] md:mt-14 md:text-[15px]">
                    RainyDays was built for emergency funds. The same tracking works for a personal fund or a specific
                    expense, each kept separate with its own goal and history.
                </p>
            </Shell>
        </section>
    );
}
