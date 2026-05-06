import { IconCloudRain, IconArrowDown, IconApple, IconGoogle } from './RDIcons';
import { DashboardMock } from './RDMockups';

const HEADLINE = 'Build your safety net.';
const SUBLEDE =
    "RainyDays is a coordination tool for families and trusted groups. Each member tracks their own savings on their own device. The group sees what's prepared and what the gap is — without anyone moving money through an app.";

export default function RDHero() {
    return (
        <section
            id="rd-top"
            className="rd-hero bg-[linear-gradient(135deg,#0A0A0A_0%,#111111_50%,#1A1A1A_100%)] text-white relative overflow-hidden min-h-screen flex items-center py-24 lg:min-h-0 lg:py-20 sm:py-14 isolate">
            {/* Mono mesh gradient blobs */}
            <div
                className="absolute inset-[-10%] z-0 pointer-events-none"
                style={{ filter: 'blur(60px) saturate(0%)', opacity: 0.9 }}
                aria-hidden="true">
                {[
                    { cls: 'top-[-10%] left-[-10%]', color: '#2a2a2a', anim: 'rd-mesh-1 22s ease-in-out infinite' },
                    { cls: 'top-[10%] right-[-15%]', color: '#1f1f1f', anim: 'rd-mesh-2 26s ease-in-out infinite' },
                    { cls: 'bottom-[-20%] left-[20%]', color: '#353535', anim: 'rd-mesh-3 28s ease-in-out infinite' },
                    { cls: 'bottom-[10%] right-[25%]', color: '#181818', anim: 'rd-mesh-4 24s ease-in-out infinite' },
                ].map((b, i) => (
                    <span
                        key={i}
                        className={`absolute w-1/2 aspect-square rounded-full ${b.cls}`}
                        style={{
                            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
                            mixBlendMode: 'screen',
                            animation: b.anim,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 gap-20 items-center w-full lg:grid-cols-1 lg:gap-14 sm:gap-10">
                    {/* Copy */}
                    <div className="rd-reveal max-w-[580px]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/10 text-white border border-white/15">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shadow-[0_0_0_3px_rgba(52,211,153,.18)]" />
                            For families and trusted groups
                        </span>

                        <h1 className="text-[clamp(48px,6.5vw,72px)] font-bold leading-[1.05] tracking-[-0.025em] mt-6 text-balance sm:mt-4">
                            {HEADLINE}
                        </h1>

                        <p className="text-lg leading-relaxed text-[#E0E0E0] mt-6 max-w-[520px] sm:text-base sm:mt-4">
                            {SUBLEDE}
                        </p>

                        <div className="flex gap-3 mt-10 flex-wrap sm:mt-6">
                            <StoreBtn icon={<IconApple size={22} />} label="Download on the" name="App Store" />
                            <StoreBtn icon={<IconGoogle size={22} />} label="Get it on" name="Google Play" />
                        </div>

                        <a
                            href="#rd-how"
                            className="mt-6 text-sm text-[#B0B0B0] inline-flex items-center gap-1.5 hover:text-white transition-colors">
                            → See how it works
                        </a>
                    </div>

                    {/* Device mock */}
                    <div className="rd-reveal flex justify-center lg:justify-start">
                        <div
                            className="rd-device-animate relative w-[360px] lg:w-[320px] sm:w-[260px]"
                            style={{
                                aspectRatio: '9/19.5',
                                borderRadius: 44,
                                background: '#0A0A0A',
                                padding: 12,
                                boxShadow:
                                    '0 0 0 2px rgba(255,255,255,.04), 0 24px 64px rgba(0,0,0,.5), 0 8px 32px rgba(0,0,0,.4)',
                                transform: 'rotate(6deg)',
                            }}>
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[88px] h-7 rounded-full bg-black z-10 sm:top-[18px] sm:w-[72px] sm:h-[22px]" />
                            <div className="w-full h-full overflow-hidden" style={{ borderRadius: 32 }}>
                                <DashboardMock />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="rd-scroll-pulse absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#B0B0B0] flex flex-col items-center gap-1.5 tracking-[0.08em] uppercase lg:hidden">
                Scroll
                <IconArrowDown size={14} strokeWidth={1.5} />
                <span className="w-px h-8 bg-gradient-to-b from-[#808080] to-transparent" />
            </div>

            {/* Cloud icon watermark */}
            <div className="absolute top-8 right-8 opacity-5 pointer-events-none hidden lg:block">
                <IconCloudRain size={48} />
            </div>
        </section>
    );
}

function StoreBtn({ icon, label, name }: { icon: React.ReactNode; label: string; name: string }) {
    return (
        <a
            href="#rd-download"
            className="bg-[#0A0A0A] text-white px-[18px] py-2.5 rounded-xl border border-white/10 inline-flex items-center gap-3 text-left hover:bg-[#1A1A1A] active:scale-[0.98] transition-all sm:flex-1 sm:min-w-[140px] sm:px-3.5">
            <span className="w-6 h-6">{icon}</span>
            <span className="flex flex-col leading-tight">
                <span className="text-[10px] text-[#B0B0B0] tracking-wide">{label}</span>
                <span className="text-[15px] font-semibold sm:text-sm">{name}</span>
            </span>
        </a>
    );
}
