import { useCallback, useEffect, useRef, useState } from 'react';

import { RD_SECTION } from '../rdTokens';
import { IconArrowLeft, IconArrowRight } from './RDIcons';
import { PhoneFrame, SectionHead, Shell } from './RDPrimitives';

const SCREENS = [
    {
        src: '/rainydays/dashboard.png',
        name: 'Emergency fund',
        desc: "What you've set aside, with goal progress.",
    },
    { src: '/rainydays/groups.png', name: 'Groups', desc: 'Separate groups for separate purposes.' },
    { src: '/rainydays/activity.png', name: 'Activity log', desc: 'Hash-linked, signature-verified entries.' },
    { src: '/rainydays/join-group.png', name: 'Invite via QR', desc: 'Scan in person or sync on the same Wi-Fi.' },
    { src: '/rainydays/dashboard-white.png', name: 'Light mode', desc: 'Same monochrome system, inverted.' },
    { src: '/rainydays/profile.png', name: 'Profile', desc: 'Reset your signing key, edit your goal.' },
];

export default function RDScreens() {
    const rail = useRef<HTMLUListElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const sync = useCallback(() => {
        const el = rail.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 2);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    }, []);

    useEffect(() => {
        sync();
        const el = rail.current;
        if (!el) return;
        el.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        return () => {
            el.removeEventListener('scroll', sync);
            window.removeEventListener('resize', sync);
        };
    }, [sync]);

    const nudge = (dir: 1 | -1) => {
        const el = rail.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>('li');
        const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
        el.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    return (
        <section id="rd-screens" className={`overflow-hidden bg-[#F5F5F5] ${RD_SECTION}`}>
            <Shell>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <SectionHead
                        eyebrow="Built for use under stress"
                        title="Every screen, purpose-built."
                        lead="Operable quickly. Readable in low light. No decoration that adds cognitive load."
                        className="mb-0"
                    />

                    <div className="rd-reveal flex shrink-0 gap-2">
                        <RailButton label="Previous screens" disabled={atStart} onClick={() => nudge(-1)}>
                            <IconArrowLeft size={18} strokeWidth={2} />
                        </RailButton>
                        <RailButton label="Next screens" disabled={atEnd} onClick={() => nudge(1)}>
                            <IconArrowRight size={18} strokeWidth={2} />
                        </RailButton>
                    </div>
                </div>
            </Shell>

            {/* Full-bleed rail: gutters come from the list padding so cards can bleed off-screen */}
            <div className="relative mt-12 md:mt-16">
                <ul
                    ref={rail}
                    tabIndex={0}
                    aria-label="App screens"
                    className="rd-rail flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 scroll-pl-6 md:px-10 md:scroll-pl-10 lg:px-20 lg:scroll-pl-20">
                    {SCREENS.map((s, i) => (
                        <li
                            key={s.name}
                            className={`rd-reveal rd-stagger-${Math.min(i + 1, 6)} w-[220px] shrink-0 snap-start sm:w-[240px] lg:w-[260px]`}>
                            <PhoneFrame src={s.src} alt={`RainyDays ${s.name} screen`} />
                            <div className="mt-5">
                                <div className="text-base font-semibold tracking-[-0.01em] text-[#0A0A0A]">
                                    {s.name}
                                </div>
                                <div className="mt-1 text-sm leading-snug text-[#808080]">{s.desc}</div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Edge fades hint at more content without another control */}
                <div
                    className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F5F5F5] to-transparent transition-opacity duration-200 ${
                        atStart ? 'opacity-0' : 'opacity-100'
                    }`}
                    aria-hidden="true"
                />
                <div
                    className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F5F5F5] to-transparent transition-opacity duration-200 ${
                        atEnd ? 'opacity-0' : 'opacity-100'
                    }`}
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}

function RailButton({
    children,
    label,
    disabled,
    onClick,
}: {
    children: React.ReactNode;
    label: string;
    disabled: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#E5E5E5] bg-white text-[#0A0A0A] transition-all duration-150 hover:border-[#0A0A0A] active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#E5E5E5]">
            {children}
        </button>
    );
}
