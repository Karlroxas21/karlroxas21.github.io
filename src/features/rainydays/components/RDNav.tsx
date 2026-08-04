import { useEffect, useState } from 'react';

import { useActiveSection } from '../hooks/use-active-section';
import { useScrolled } from '../hooks/use-scrolled';
import { RD_FOCUS_DARK, RD_SECTIONS, RD_SHELL } from '../rdTokens';
import { IconClose, IconCloudRain, IconMenu } from './RDIcons';
import { SectionLink } from './RDPrimitives';

const SECTION_IDS = RD_SECTIONS.map(s => s.id);

export default function RDNav() {
    const scrolled = useScrolled(48);
    const active = useActiveSection(SECTION_IDS);
    const [open, setOpen] = useState(false);

    // Lock the page while the mobile sheet is up.
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    // Sheet is mobile-only; never leave it stranded open on resize to desktop.
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const onChange = () => mq.matches && setOpen(false);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const solid = scrolled || open;

    return (
        <>
            <SectionLink
                id="rd-main"
                className="sr-only rounded bg-white px-4 py-2 text-sm font-semibold text-[#0A0A0A] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]">
                Skip to content
            </SectionLink>

            <header
                className={`fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color,backdrop-filter] duration-300 ${
                    solid
                        ? 'border-b border-[#E5E5E5] bg-white/90 backdrop-blur-md'
                        : 'border-b border-transparent bg-transparent'
                }`}>
                <div className={`${RD_SHELL} flex h-full items-center justify-between gap-4`}>
                    <SectionLink
                        id="rd-top"
                        onNavigate={() => setOpen(false)}
                        className={`flex items-center gap-2.5 rounded font-bold tracking-[-0.01em] transition-colors ${
                            solid ? 'text-[#0A0A0A]' : 'text-white'
                        }`}>
                        <span
                            className={`grid h-7 w-7 place-items-center rounded-lg transition-colors ${
                                solid ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#0A0A0A]'
                            }`}>
                            <IconCloudRain size={16} strokeWidth={2.2} />
                        </span>
                        RainyDays
                    </SectionLink>

                    <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
                        {RD_SECTIONS.filter(s => s.id !== 'rd-download' && s.inNav !== false).map(({ id, label }) => (
                            <SectionLink
                                key={id}
                                id={id}
                                aria-current={active === id ? 'true' : undefined}
                                className={`rd-nav-link relative rounded text-sm font-medium transition-colors ${
                                    solid
                                        ? active === id
                                            ? 'text-[#0A0A0A]'
                                            : 'text-[#808080] hover:text-[#0A0A0A]'
                                        : active === id
                                          ? 'text-white'
                                          : 'text-[#B0B0B0] hover:text-white'
                                } ${active === id ? 'is-active' : ''}`}>
                                {label}
                            </SectionLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <SectionLink
                            id="rd-download"
                            className={`hidden rounded-[10px] border px-[18px] py-2.5 text-sm font-semibold transition-colors sm:inline-flex ${
                                solid
                                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white hover:bg-[#1A1A1A]'
                                    : `border-white bg-white text-[#0A0A0A] hover:bg-[#E5E5E5] ${RD_FOCUS_DARK}`
                            }`}>
                            Get the app
                        </SectionLink>

                        <button
                            type="button"
                            onClick={() => setOpen(v => !v)}
                            aria-expanded={open}
                            aria-controls="rd-mobile-nav"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            className={`grid h-10 w-10 place-items-center rounded-[10px] border transition-colors md:hidden ${
                                solid ? 'border-[#E5E5E5] text-[#0A0A0A]' : 'border-white/25 text-white'
                            }`}>
                            {open ? <IconClose size={18} /> : <IconMenu size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile sheet */}
            <div
                id="rd-mobile-nav"
                hidden={!open}
                className="fixed inset-x-0 bottom-0 top-16 z-40 border-t border-[#E5E5E5] bg-white md:hidden">
                <nav className={`${RD_SHELL} flex flex-col divide-y divide-[#E5E5E5] py-2`} aria-label="Sections">
                    {RD_SECTIONS.map(({ id, label }) => (
                        <SectionLink
                            key={id}
                            id={id}
                            onNavigate={() => setOpen(false)}
                            className="py-4 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0A]">
                            {label}
                        </SectionLink>
                    ))}
                    <SectionLink
                        id="rd-download"
                        onNavigate={() => setOpen(false)}
                        className="mt-4 rounded-xl border border-[#0A0A0A] bg-[#0A0A0A] px-5 py-3.5 text-center text-sm font-semibold text-white">
                        Get the app
                    </SectionLink>
                </nav>
            </div>
        </>
    );
}
