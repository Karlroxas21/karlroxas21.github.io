import { IconApple, IconGoogle } from './RDIcons';

export default function RDDownload() {
    return (
        <section id="rd-download" className="py-24 bg-white lg:py-[72px] sm:py-14">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6 flex flex-col items-center text-center gap-6 rd-reveal">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#F0F0F0] text-[#0A0A0A]">
                    Available now · v1.1.0
                </span>

                <h2 className="text-[clamp(36px,4vw,48px)] font-bold tracking-[-0.02em]">Get RainyDays.</h2>

                <p className="text-lg leading-relaxed text-[#808080] text-center max-w-[480px] sm:text-base">
                    iOS 16 or later. Android 10 or later. No account required. Free.
                </p>

                <div className="flex gap-3 mt-2 flex-wrap justify-center">
                    <StoreBtn icon={<IconApple size={22} />} label="Download on the" name="App Store" />
                    <StoreBtn icon={<IconGoogle size={22} />} label="Get it on" name="Google Play" />
                </div>
            </div>
        </section>
    );
}

function StoreBtn({ icon, label, name }: { icon: React.ReactNode; label: string; name: string }) {
    return (
        <a
            href="#"
            className="bg-[#0A0A0A] text-white px-[18px] py-2.5 rounded-xl border border-[#0A0A0A] inline-flex items-center gap-3 text-left hover:bg-[#1A1A1A] active:scale-[0.98] transition-all">
            <span className="w-6 h-6">{icon}</span>
            <span className="flex flex-col leading-tight">
                <span className="text-[10px] text-[#B0B0B0] tracking-wide">{label}</span>
                <span className="text-[15px] font-semibold">{name}</span>
            </span>
        </a>
    );
}
