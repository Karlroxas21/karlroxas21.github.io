import { useRef } from 'react';

import { SectionHead } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { PW, PW_GRAIN, type NoteColorKey } from '../pwTokens';

/** Resting tilt of each card while the deck is still stacked. */
const STACK_TILT = [-9, 5, -3, 7, -6, 4];

/**
 * The six swatches start as one stacked deck in the centre and fan out into the row as the section
 * scrolls into view (`--f`, 0→1, derived from `--p` in CSS). Below `lg` the grid simply reflows.
 */
export default function PWPalette() {
    const section = useRef<HTMLElement>(null);
    useScrollProgress(section, { reduced: 1 });

    const swatches = Object.entries(PW.notes) as [NoteColorKey, (typeof PW.notes)[NoteColorKey]][];
    return (
        <section ref={section} className="py-[110px] md:py-[140px]">
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="The palette"
                    title="Six colors. All easy on the eyes."
                    kicker="Picked for long sessions and low glare. Muted enough that a wall of them stays calm — saturated enough that you can tell them apart at a glance."
                />
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                    style={{ ['--f' as string]: 'clamp(0, calc((var(--p, 1) - 0.2) / 0.3), 1)' }}>
                    {swatches.map(([name, c], i) => (
                        <div
                            key={name}
                            className="pw-fan relative overflow-hidden"
                            style={{
                                ['--i' as string]: i,
                                ['--r' as string]: STACK_TILT[i],
                                aspectRatio: '4 / 5',
                                borderRadius: 12,
                                background: c.bg,
                                backgroundImage: PW_GRAIN,
                                boxShadow:
                                    '0 1px 2px rgba(40,30,20,0.08), 0 14px 28px rgba(40,30,20,0.12), inset 0 0 0 0.5px ' +
                                    c.edge,
                                padding: '14px 14px',
                                color: c.ink,
                                zIndex: 6 - Math.abs(i - 2.5) * 2,
                            }}>
                            <div style={{ fontSize: 11, fontFamily: PW.mono, opacity: 0.55, letterSpacing: '0.04em' }}>
                                {name.toUpperCase()}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 14,
                                    left: 14,
                                    right: 14,
                                    opacity: 'var(--f, 1)',
                                }}>
                                <div style={{ fontFamily: PW.mono, fontSize: 11, opacity: 0.75 }}>{c.bg}</div>
                                <div style={{ fontFamily: PW.mono, fontSize: 11, opacity: 0.55, marginTop: 2 }}>
                                    {c.ink}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
