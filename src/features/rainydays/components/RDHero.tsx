import { RD_INK_GRADIENT } from '../rdTokens';
import { IconArrowDown, IconFileKey, IconGoogle, IconUsers, IconWifiOff } from './RDIcons';
import { Chip, InkBackdrop, PhoneFrame, Shell, StoreButton, TextLink } from './RDPrimitives';

const HEADLINE = 'Build your safety net.';
const SUBLEDE =
    "A coordination tool for families and trusted groups. Each member tracks their own emergency fund on their own device. The group sees what's prepared and what the gap is, without anyone moving money through an app.";

const TRUST = [
    { icon: <IconUsers size={15} strokeWidth={1.8} />, label: 'No account required' },
    { icon: <IconWifiOff size={15} strokeWidth={1.8} />, label: 'Works fully offline' },
    { icon: <IconFileKey size={15} strokeWidth={1.8} />, label: 'AES-256 encrypted export' },
];

export default function RDHero() {
    return (
        <section
            id="rd-top"
            className={`rd-hero relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 text-white md:pb-24 md:pt-32 lg:pb-32 ${RD_INK_GRADIENT}`}>
            <InkBackdrop />

            <Shell className="relative z-10">
                <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16">
                    {/* Copy */}
                    <div className="rd-reveal max-w-[620px]">
                        <Chip tone="dark">For families and trusted groups</Chip>

                        <h1 className="mt-6 text-[clamp(40px,7vw,72px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance">
                            {HEADLINE}
                        </h1>

                        <p className="mt-5 max-w-[540px] text-base leading-relaxed text-[#D5D5D5] md:mt-6 md:text-lg">
                            {SUBLEDE}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 md:mt-10">
                            <StoreButton
                                tone="dark"
                                sectionId="rd-download"
                                icon={<IconGoogle size={22} />}
                                label="Get it on"
                                name="Google Play"
                            />
                            <TextLink sectionId="rd-how" tone="dark">
                                See how it works
                            </TextLink>
                        </div>

                        <ul className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#B0B0B0] sm:flex-row sm:flex-wrap sm:gap-x-7">
                            {TRUST.map(t => (
                                <li key={t.label} className="flex items-center gap-2">
                                    <span className="text-white/70">{t.icon}</span>
                                    {t.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Device */}
                    <div className="rd-reveal relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:max-w-[360px]">
                        <div
                            className="absolute inset-x-4 top-10 -bottom-4 rounded-full bg-white/[0.07] blur-3xl"
                            aria-hidden="true"
                        />
                        <PhoneFrame
                            src="/rainydays/dashboard.png"
                            alt="RainyDays emergency fund screen showing balance and goal progress"
                            priority
                            className="relative"
                        />
                    </div>
                </div>
            </Shell>

            {/* Scroll cue — desktop only, where there's room below the fold */}
            <div className="rd-scroll-pulse absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] lg:flex">
                Scroll
                <IconArrowDown size={14} strokeWidth={1.5} />
                <span className="h-8 w-px bg-gradient-to-b from-[#808080] to-transparent" aria-hidden="true" />
            </div>
        </section>
    );
}
