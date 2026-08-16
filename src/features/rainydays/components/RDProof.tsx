import { RD_SHELL } from '../rdTokens';
import { IconShieldCheck, IconWifiOff, IconQrCode } from './RDIcons';

const CLAIMS = [
    {
        icon: <IconShieldCheck size={20} strokeWidth={1.8} />,
        title: 'No money moves',
        body: "RainyDays doesn't hold or transfer funds. The app keeps the record; you keep the money.",
    },
    {
        icon: <IconWifiOff size={20} strokeWidth={1.8} />,
        title: 'Works offline',
        body: 'During a brownout, on the way to the hospital, in any signal-poor place. Always available.',
    },
    {
        icon: <IconQrCode size={20} strokeWidth={1.8} />,
        title: 'Same Wi-Fi sync',
        body: 'Members sync records peer-to-peer on the local network. No cloud, no middleman.',
    },
];

export default function RDProof() {
    return (
        <section id="rd-proof" className="border-y border-[#E5E5E5] bg-[#F5F5F5]">
            <div className={RD_SHELL}>
                <div className="grid divide-y divide-[#E5E5E5] md:grid-cols-3 md:divide-x md:divide-y-0">
                    {CLAIMS.map((c, i) => (
                        <div
                            key={c.title}
                            className={`rd-reveal rd-stagger-${i + 1} flex flex-col gap-3 py-8 md:px-8 md:py-12 ${
                                i === 0 ? 'md:pl-0' : ''
                            } ${i === CLAIMS.length - 1 ? 'md:pr-0' : ''}`}>
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#E5E5E5] bg-white text-[#0A0A0A]">
                                {c.icon}
                            </span>
                            <h3 className="text-lg font-semibold tracking-[-0.01em] text-[#0A0A0A]">{c.title}</h3>
                            <p className="max-w-[36ch] text-sm leading-relaxed text-[#808080]">{c.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
