import { DashboardMock, GroupMock, ActivityMock, QRMock } from './RDMockups';

const SCREENS = [
    { name: 'Personal fund', desc: "What you've set aside, with goal progress.", el: <DashboardMock /> },
    { name: 'Group view', desc: "Each member's tracked contribution, ranked.", el: <GroupMock /> },
    { name: 'Activity log', desc: 'Hash-linked, signature-verified entries.', el: <ActivityMock /> },
    { name: 'Invite via QR', desc: 'Scan in person or sync on the same Wi-Fi.', el: <QRMock /> },
    { name: 'Light mode', desc: 'Same monochrome system, inverted.', el: <DashboardMock light /> },
];

export default function RDScreens() {
    return (
        <section id="rd-screens" className="py-24 bg-[#F5F5F5] lg:py-[72px] sm:py-14">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6">
                <div className="flex flex-col items-center gap-4 mb-14 max-w-[720px] mx-auto text-center rd-reveal">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#F0F0F0] text-[#0A0A0A] border border-[#E5E5E5] self-start mx-auto">
                        Built for use under stress
                    </span>
                    <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] leading-[1.15] text-balance">
                        Every screen, purpose-built.
                    </h2>
                    <p className="text-lg leading-relaxed text-[#808080] text-center sm:text-base">
                        Operable quickly. Readable in low light. No decoration that adds cognitive load.
                    </p>
                </div>
            </div>

            {/* Full-width horizontal scroll */}
            <div
                className="flex gap-8 overflow-x-auto px-20 pb-12 scroll-snap-type-x-mandatory lg:px-10 sm:px-6"
                style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin' }}>
                {SCREENS.map(s => (
                    <div
                        key={s.name}
                        className="rd-reveal flex-none flex flex-col gap-4 w-[320px] sm:w-[260px]"
                        style={{ scrollSnapAlign: 'start' }}>
                        <div
                            className="overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,.3)] bg-[#0A0A0A]"
                            style={{ borderRadius: 28, aspectRatio: '9/19.5' }}>
                            {s.el}
                        </div>
                        <div className="px-1">
                            <div className="text-base font-semibold">{s.name}</div>
                            <div className="text-sm text-[#808080] mt-1">{s.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
