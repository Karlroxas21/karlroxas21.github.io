import { useRef } from 'react';

import { Check, SectionHead } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

interface Panel {
    time: string;
    label: string;
    title: string;
    body: string;
    color: NoteColorKey;
    rot: number;
    items: [done: boolean, text: string][];
    /** 0 = drifts slowly (far), 1 = leads the track (near). Layered depth inside the pin. */
    depth: number;
}

const PANELS: Panel[] = [
    {
        time: '07:12',
        label: 'Kitchen table',
        title: 'Before the laptop opens',
        body: '⌘⇧N from the menu bar. Three lines, one tag, back to coffee. The note is on disk before the lid is fully up.',
        color: 'butter',
        rot: -2.2,
        items: [
            [false, 'Call the vet back'],
            [false, 'Ask Mira re: pricing'],
            [false, 'Bread + oat milk'],
        ],
        depth: 0.2,
    },
    {
        time: '09:30',
        label: 'Standup',
        title: 'Pinned above the call',
        body: 'One note floats over the meeting window. Yesterday, today, blockers. It never gets buried under a browser.',
        color: 'sky',
        rot: 1.8,
        items: [
            [true, 'Y: shipped onboarding'],
            [false, 'T: editor polish'],
            [false, 'B: design review'],
        ],
        depth: 0.55,
    },
    {
        time: '11:45',
        label: 'Deep work',
        title: 'Everything rolled up',
        body: 'Collapse the wall to title bars docked in the corner. Six notes, six lines, zero noise. Click one to expand it back.',
        color: 'sage',
        rot: -1.4,
        items: [
            [true, 'Draft the launch post'],
            [true, 'Export og-image'],
            [false, 'Review pricing module'],
        ],
        depth: 0.85,
    },
    {
        time: '16:20',
        label: 'Handoff',
        title: 'One hash, sorted',
        body: 'Tag today’s note #copy and it joins the rest. No folder shuffling, no deciding where a note belongs.',
        color: 'blush',
        rot: 2.4,
        items: [
            [true, 'Send draft to Sarah'],
            [false, 'Tagged #copy'],
            [false, 'Schedule announcement'],
        ],
        depth: 0.4,
    },
    {
        time: '22:05',
        label: 'Other desk, other OS',
        title: 'Same wall, waiting',
        body: 'The Windows machine wakes up and the wall is already there — carried over by the folder you already sync.',
        color: 'peach',
        rot: -2,
        items: [
            [true, 'Synced 14 notes'],
            [true, 'Nothing to merge'],
            [false, 'Tomorrow: ship it'],
        ],
        depth: 1,
    },
];

function JourneyPanel({ panel, index }: { panel: Panel; index: number }) {
    const c = noteColor(panel.color);
    // Inside the pinned track each panel also drifts vertically at its own depth — parallax within parallax.
    const lift = 14 + panel.depth * 34;
    return (
        <article
            className="pw-panel shrink-0"
            style={{
                width: 'min(78vw, 480px)',
                transform: `translate3d(0, calc((0.5 - var(--p, 0)) * ${lift}px * var(--pw-depth, 1)), 0)`,
                willChange: 'transform',
            }}>
            <div className="flex items-baseline gap-3 mb-4">
                <span
                    style={{
                        fontFamily: PW.mono,
                        fontSize: 13,
                        fontWeight: 500,
                        color: PW.accent,
                        letterSpacing: '0.02em',
                    }}>
                    {panel.time}
                </span>
                <span
                    className="uppercase"
                    style={{ fontSize: 11, fontWeight: 700, color: PW.inkFaint, letterSpacing: '0.12em' }}>
                    {panel.label}
                </span>
                <span className="flex-1" style={{ height: 0.5, background: PW.hairlineStrong }} />
                <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.inkFaint }}>
                    0{index + 1}/0{PANELS.length}
                </span>
            </div>

            <div
                className="relative mb-5"
                style={{
                    borderRadius: 14,
                    background: c.bg,
                    color: c.ink,
                    backgroundImage: PW_GRAIN,
                    padding: '16px 18px 18px',
                    boxShadow: '0 1px 2px rgba(40,30,20,0.10), 0 18px 38px rgba(40,30,20,0.16)',
                    transform: `rotate(${panel.rot}deg)`,
                }}>
                <div className="flex items-center mb-2.5">
                    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', flex: 1 }}>
                        {panel.label}
                    </div>
                    <span style={{ fontFamily: PW.mono, fontSize: 10, opacity: 0.55 }}>{panel.time}</span>
                </div>
                {panel.items.map(([done, text], i) => (
                    <div key={i} className="flex items-start" style={{ marginBottom: 3 }}>
                        <Check checked={done} ink={c.ink} edge={c.edge} />
                        <span
                            style={{
                                fontSize: 12.5,
                                lineHeight: 1.45,
                                textDecoration: done ? 'line-through' : 'none',
                                opacity: done ? 0.55 : 1,
                            }}>
                            {text}
                        </span>
                    </div>
                ))}
            </div>

            <h3
                className="m-0 mb-2"
                style={{
                    fontFamily: PW.serif,
                    fontWeight: 500,
                    fontSize: 'clamp(22px, 2.4vw, 30px)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                }}>
                {panel.title}
            </h3>
            <p className="m-0" style={{ fontSize: 14.5, lineHeight: 1.6, color: PW.inkSoft, textWrap: 'pretty' }}>
                {panel.body}
            </p>
        </article>
    );
}

/**
 * Horizontal act. A 340vh wrapper pins one viewport while `--p` slides the track sideways — the
 * translate is a percentage of the track's own width, so it needs no measurement and stays correct
 * at every viewport. Under reduced motion the CSS drops the pin and the track wraps into a grid,
 * so every panel stays reachable with no sideways movement at all.
 */
export default function PWJourney() {
    const wrap = useRef<HTMLDivElement>(null);
    useScrollProgress(wrap, { mode: 'pin', range: [0.06, 0.94], trackWhenReduced: true });

    return (
        <section
            id="pw-day"
            style={{
                background: '#f3efe5',
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
                scrollMarginTop: 64,
            }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-[110px] md:pt-[140px]">
                <SectionHead
                    eyebrow="One day · five notes"
                    title="A Tuesday, sideways."
                    kicker="This is the whole product, in the order you actually meet it. Keep scrolling — the day moves across, not down."
                />
            </div>

            <div ref={wrap} className="pw-hwrap relative" style={{ height: '340vh' }}>
                <div className="pw-hpin sticky top-0 h-[100vh] flex flex-col justify-center overflow-hidden">
                    <div
                        className="pw-htrack flex items-start gap-8 md:gap-14 px-6 md:px-8"
                        style={{
                            width: 'max-content',
                            transform: 'translate3d(calc(var(--p, 0) * (100vw - 100% - 3rem)), 0, 0)',
                            willChange: 'transform',
                        }}>
                        {PANELS.map((p, i) => (
                            <JourneyPanel key={p.time} panel={p} index={i} />
                        ))}
                    </div>

                    {/* Track progress — the one bit of chrome that says how far the day has left to run. */}
                    <div
                        className="pw-hbar mx-auto mt-12 flex items-center gap-3"
                        style={{ width: 'min(90vw, 420px)' }}
                        aria-hidden>
                        <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.inkFaint }}>07:12</span>
                        <span className="relative flex-1" style={{ height: 2, background: PW.hairlineStrong }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: PW.accent,
                                    transform: 'scaleX(var(--p, 0))',
                                    transformOrigin: 'left',
                                }}
                            />
                        </span>
                        <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.inkFaint }}>22:05</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
