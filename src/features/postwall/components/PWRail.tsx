import { useEffect, useState } from 'react';

import { scrollToSection } from '../utils/scroll-to';
import { PW } from '../pwTokens';

/** The page's acts, in order. Ids match the section elements. */
const ACTS: { id: string; label: string; dark?: boolean }[] = [
    { id: 'pw-top', label: 'Top' },
    { id: 'pw-why', label: 'Why', dark: true },
    { id: 'pw-day', label: 'A day' },
    { id: 'pw-platforms', label: 'Platforms' },
    { id: 'pw-editor', label: 'Editor' },
    { id: 'pw-wall', label: 'The Wall' },
    { id: 'pw-features', label: 'Features' },
    { id: 'pw-download', label: 'Get it', dark: true },
];

/**
 * Fixed chapter rail: where am I, where can I go, one click to get there. Wayfinding for a long
 * scroll — it is navigation, not decoration, so it stays put under reduced motion.
 */
export default function PWRail() {
    const [active, setActive] = useState(ACTS[0].id);

    useEffect(() => {
        const sections = ACTS.map(a => document.getElementById(a.id)).filter((el): el is HTMLElement => !!el);
        if (!sections.length) return;

        // Whichever act's top has most recently passed the upper third of the viewport is the current one.
        const io = new IntersectionObserver(
            entries => {
                const hit = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (hit) setActive(hit.target.id);
            },
            { rootMargin: '-33% 0px -60% 0px', threshold: 0 }
        );
        sections.forEach(s => io.observe(s));
        return () => io.disconnect();
    }, []);

    return (
        <nav
            className="pw-rail hidden xl:flex flex-col gap-1 fixed z-40"
            style={{ right: 22, top: '50%', transform: 'translateY(-50%)' }}
            data-on-dark={ACTS.find(a => a.id === active)?.dark ? '1' : undefined}
            aria-label="Page sections">
            {ACTS.map(a => {
                const on = a.id === active;
                return (
                    <button
                        key={a.id}
                        type="button"
                        onClick={() => scrollToSection(a.id)}
                        className="pw-rail-item group flex items-center justify-end gap-2.5 bg-transparent border-0 cursor-pointer"
                        style={{ padding: '5px 0', fontFamily: 'inherit' }}
                        aria-current={on ? 'true' : undefined}>
                        <span
                            className="pw-rail-label"
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                letterSpacing: '0.02em',
                                color: on ? PW.ink : PW.inkSoft,
                            }}>
                            {a.label}
                        </span>
                        <span
                            className="pw-rail-tick"
                            style={{
                                width: on ? 20 : 10,
                                height: 2,
                                borderRadius: 2,
                                background: on ? PW.accent : PW.hairlineStrong,
                            }}
                        />
                    </button>
                );
            })}
        </nav>
    );
}
