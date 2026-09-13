import { useEffect, useRef } from 'react';

import { ArrowIcon, PWButton } from './PWPrimitives';
import { useScrolled } from '../hooks/use-scrolled';
import { onScrollFrame } from '../utils/scroll-bus';
import { scrollToSection, scrollToTop } from '../utils/scroll-to';
import { PW } from '../pwTokens';

const LINKS: { label: string; target: string }[] = [
    { label: 'A day', target: 'pw-day' },
    { label: 'Platforms', target: 'pw-platforms' },
    { label: 'Editor', target: 'pw-editor' },
    { label: 'The Wall', target: 'pw-wall' },
    { label: 'Features', target: 'pw-features' },
    { label: 'Download', target: 'pw-download' },
];

export default function PWNav() {
    const scrolled = useScrolled(12);
    const bar = useRef<HTMLDivElement>(null);

    // Page-level read progress → a hairline that grows along the nav's bottom edge.
    useEffect(() => {
        const el = bar.current;
        if (!el) return;
        return onScrollFrame(() => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            el.style.transform = `scaleX(${p.toFixed(4)})`;
        });
    }, []);

    return (
        <nav
            className="pw-nav sticky top-0 z-50"
            style={{
                background: scrolled ? 'rgba(250,248,243,0.78)' : 'rgba(250,248,243,0.4)',
                backdropFilter: 'blur(22px) saturate(170%)',
                WebkitBackdropFilter: 'blur(22px) saturate(170%)',
                boxShadow: scrolled ? '0 1px 0 ' + PW.hairline : 'none',
            }}>
            <div
                ref={bar}
                aria-hidden
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -0.5,
                    height: 1.5,
                    background: PW.accent,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    opacity: 0.85,
                }}
            />
            <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-[13px] flex items-center gap-7">
                <button
                    type="button"
                    onClick={scrollToTop}
                    className="pw-btn flex items-center gap-[9px] bg-transparent border-0 p-0 cursor-pointer"
                    style={{ color: PW.ink, fontFamily: 'inherit' }}
                    aria-label="Back to top">
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: PW.notes.butter.bg,
                            boxShadow: 'inset 0 0 0 0.5px ' + PW.notes.butter.edge,
                            fontSize: 13,
                            fontWeight: 700,
                            color: PW.notes.butter.ink,
                            transform: 'rotate(-4deg)',
                        }}>
                        P
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>PostWall</span>
                </button>

                <div className="hidden md:flex gap-[22px]" style={{ fontSize: 13.5, fontWeight: 500 }}>
                    {LINKS.map(l => (
                        <button
                            key={l.target}
                            type="button"
                            onClick={() => scrollToSection(l.target)}
                            className="pw-btn bg-transparent border-0 p-0 cursor-pointer hover:opacity-100"
                            style={{ color: PW.inkSoft, opacity: 0.9, fontFamily: 'inherit', fontSize: 'inherit' }}>
                            {l.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1" />

                <PWButton variant="ink" size="sm" onClick={() => scrollToSection('pw-download')}>
                    Get PostWall
                    <ArrowIcon />
                </PWButton>
            </div>
        </nav>
    );
}
