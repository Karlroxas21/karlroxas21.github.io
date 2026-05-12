import { IconCloudRain, IconWallet, IconUsers, IconQrCode, IconFileKey, IconShieldCheck } from './RDIcons';

const FEATURES = [
    {
        icon: <IconUsers size={22} strokeWidth={1.8} />,
        title: 'Group coordination',
        body: "See what each member has tracked toward a shared goal. Replace 'may pera ba kayo?' with a clear record of what's prepared.",
    },
    {
        icon: <IconWallet size={22} strokeWidth={1.8} />,
        title: 'Personal fund',
        body: 'Track your own savings on your own device. Running balance, goal progress, deposit and withdrawal history.',
    },
    {
        icon: <IconQrCode size={22} strokeWidth={1.8} />,
        title: 'Peer-to-peer sync',
        body: 'Sync with the group over the same Wi-Fi or by scanning a QR code in person. No internet, no middleman, no account.',
    },
    {
        icon: <IconShieldCheck size={22} strokeWidth={1.8} />,
        title: 'No money moves',
        body: 'RainyDays is not a banking app. It does not hold funds or process payments. Money still moves the way it always has — between people you trust.',
    },
    {
        icon: <IconFileKey size={22} strokeWidth={1.8} />,
        title: 'Encrypted export',
        body: 'Back up your data as an encrypted .rdSync file. AES-256-GCM with a passphrase you control. Nothing leaves your device unless you want it to.',
    },
    {
        icon: <IconCloudRain size={22} strokeWidth={1.8} />,
        title: 'Tamper-evident by design',
        body: 'Every entry is signed with Ed25519 and hash-linked to the previous one. Any change breaks the chain — and the app sees it.',
    },
];

export default function RDFeatures() {
    return (
        <section id="rd-features" className="py-24 bg-[#F5F5F5] lg:py-[72px] sm:py-14">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-[720px] sm:mb-10 rd-reveal">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#F0F0F0] text-[#0A0A0A] self-start border border-[#E5E5E5]">
                        What RainyDays does
                    </span>
                    <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] leading-[1.15] text-balance">
                        A coordination tool, not a financial product.
                    </h2>
                    <p className="text-lg leading-relaxed text-[#808080] max-w-[580px] sm:text-base">
                        Six things, deliberately. RainyDays adds clarity to what your group already does well.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 sm:grid-cols-3">
                    {FEATURES.map((f, i) => (
                        <div
                            key={f.title}
                            className={`rd-reveal rd-stagger-${i + 1} bg-white border border-[#E5E5E5] rounded-2xl p-7 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,.08),0_4px_12px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,.12)] transition-all duration-200 sm:p-[22px] sm:gap-3`}>
                            <div className="w-12 h-12 rounded-xl bg-[#F0F0F0] text-[#0A0A0A] grid place-items-center flex-shrink-0">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-semibold tracking-[-0.01em]">{f.title}</h3>
                            <p className="text-[15px] leading-[1.55] text-[#808080]">{f.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
