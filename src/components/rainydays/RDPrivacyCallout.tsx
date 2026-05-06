import { IconArrowRight } from './RDIcons';

export default function RDPrivacyCallout() {
    return (
        <section
            id="rd-security"
            className="rd-callout bg-[linear-gradient(135deg,#0A0A0A_0%,#111111_50%,#1A1A1A_100%)] text-white py-32 relative overflow-hidden text-center lg:py-24 sm:py-[72px]">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6 relative z-10">
                <div className="max-w-[640px] mx-auto flex flex-col items-center gap-6 rd-reveal">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/10 text-white border border-white/15">
                        Privacy by design
                    </span>

                    <h2 className="text-[clamp(36px,4.5vw,56px)] font-bold tracking-[-0.025em] leading-[1.1]">
                        Each device is sovereign.
                    </h2>

                    <p className="text-lg leading-relaxed text-[#D5D5D5] max-w-[540px] sm:text-base">
                        There is no central database. No backend that can be breached, subpoenaed, or shut down. Syncing
                        happens directly between group members — on the same Wi-Fi, or by scanning a QR code in person.
                        Delete the app and your data is gone, because it was only ever on your device.
                    </p>

                    <a
                        href="#rd-download"
                        className="bg-white/10 text-white border border-white/15 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2.5 hover:bg-white/15 active:scale-[0.98] transition-all">
                        Download now <IconArrowRight size={16} strokeWidth={2} />
                    </a>
                </div>
            </div>
        </section>
    );
}
