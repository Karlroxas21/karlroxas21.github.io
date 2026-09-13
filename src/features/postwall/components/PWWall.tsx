import { useRef } from 'react';

import { Check, PinIcon, SectionHead } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { useStageScale } from '../hooks/use-stage-scale';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';
import { easeInOutCubic } from '../utils/spring';

type Item = [string, string];

const STAGE_W = 960;
const STAGE_H = 520;
const NOTE_W = 210;
const NOTE_H = 190;
const COLS = 4;
const GAP = 22;
const PAD_X = (STAGE_W - COLS * NOTE_W - (COLS - 1) * GAP) / 2;
const PAD_Y = 64;

interface WallNote {
    color: NoteColorKey;
    title: string;
    items: Item[];
    due?: string;
    pinned?: boolean;
    /** Where it starts before the scroll tidies it: offset from its grid slot + tilt + scale. */
    scatter: [dx: number, dy: number, rot: number, scale: number];
}

const NOTES: WallNote[] = [
    {
        color: 'butter',
        title: 'Launch checklist',
        pinned: true,
        due: 'Tue 4pm',
        items: [
            ['c', 'Confirm hero copy'],
            ['c', 'Export og-image'],
            ['', 'Review pricing'],
            ['', 'Send draft to Sarah'],
        ],
        scatter: [64, 48, -12, 1.04],
    },
    {
        color: 'sage',
        title: 'Q2 ideas',
        items: [
            ['', 'Inline AI rewrite'],
            ['', 'Calendar sync'],
            ['', 'Voice capture'],
        ],
        scatter: [-96, 128, 9, 0.96],
    },
    {
        color: 'sky',
        title: 'Reading',
        items: [
            ['', 'Dieter Rams — Ten'],
            ['', 'Synthesis of form'],
            ['', 'The Design of Everyday Things'],
        ],
        scatter: [72, -28, -7, 1.02],
    },
    {
        color: 'peach',
        title: 'Standup',
        items: [
            ['', 'Y: onboarding'],
            ['', 'T: editor polish'],
            ['', 'B: design review'],
        ],
        scatter: [-44, 156, 14, 0.94],
    },
    {
        color: 'blush',
        title: 'Copy variants',
        items: [
            ['', 'A. "Think on paper, on screen."'],
            ['', 'B. "Cross-platform, finally."'],
            ['', 'C. "Your wall, everywhere."'],
        ],
        scatter: [118, -132, 8, 0.98],
    },
    {
        color: 'sand',
        title: 'Errands',
        items: [
            ['c', 'Pick up keys'],
            ['', 'Dry cleaning'],
            ['', 'Book vet'],
        ],
        scatter: [-66, -84, -11, 1.03],
    },
    {
        color: 'butter',
        title: 'Quote',
        items: [
            ['', '"As few as possible, but as many as necessary."'],
            ['', '— Rams'],
        ],
        scatter: [36, -168, 6, 0.95],
    },
    {
        color: 'sage',
        title: 'Grocery',
        items: [
            ['', 'Bread, eggs, oat milk'],
            ['', 'Tomatoes, basil'],
            ['', 'Olive oil'],
        ],
        scatter: [-128, -44, -9, 1.01],
    },
];

function WSNote({ note, index }: { note: WallNote; index: number }) {
    const c = noteColor(note.color);
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const gx = PAD_X + col * (NOTE_W + GAP);
    const gy = PAD_Y + row * (NOTE_H + GAP);
    const [dx, dy, rot, sc] = note.scatter;

    // At --p = 0 the note sits at its scattered pose; at 1 it has settled into the grid slot.
    const transform =
        `translate3d(calc(${gx + dx}px - var(--p, 1) * ${dx}px), calc(${gy + dy}px - var(--p, 1) * ${dy}px), 0) ` +
        `rotate(calc(${rot}deg * (1 - var(--p, 1)))) ` +
        `scale(calc(${sc} + (1 - ${sc}) * var(--p, 1)))`;

    return (
        <div
            className="pw-parallax"
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: NOTE_W,
                height: NOTE_H,
                transform,
                willChange: 'transform',
                borderRadius: 13,
                background: c.bg,
                color: c.ink,
                backgroundImage: PW_GRAIN,
                boxShadow: '0 1px 2px rgba(40,30,20,0.10), 0 10px 24px rgba(40,30,20,0.14)',
                padding: '12px 14px',
                fontFamily: PW.font,
                zIndex: note.pinned ? 3 : 1,
            }}>
            <div className="flex items-center" style={{ marginBottom: 5 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '-0.01em', flex: 1 }}>{note.title}</div>
                {note.pinned && <PinIcon />}
            </div>
            {note.items.map(([k, txt], i) => (
                <div key={i} className="flex items-start" style={{ marginBottom: 2 }}>
                    <Check checked={k === 'c'} ink={c.ink} edge={c.edge} />
                    <span
                        style={{
                            fontSize: 11,
                            lineHeight: 1.45,
                            textDecoration: k === 'c' ? 'line-through' : 'none',
                            opacity: k === 'c' ? 0.55 : 1,
                        }}>
                        {txt}
                    </span>
                </div>
            ))}
            {note.due && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 14,
                        fontSize: 9.5,
                        fontFamily: PW.mono,
                        opacity: 0.6,
                    }}>
                    {note.due}
                </div>
            )}
        </div>
    );
}

/**
 * Scatter → structure. A 240vh wrapper pins the wall for one viewport while `--p` (eased) scrubs the
 * eight notes from a thrown-on-the-desk mess into a tidy grid. Reduced motion shows the tidy end state.
 */
export default function PWWall() {
    const wrap = useRef<HTMLDivElement>(null);
    const stageWrap = useRef<HTMLDivElement>(null);
    useScrollProgress(wrap, { mode: 'pin', range: [0.08, 0.8], ease: easeInOutCubic, reduced: 1 });
    useStageScale(stageWrap, STAGE_W);

    return (
        <section id="pw-wall" className="pt-[110px] md:pt-[140px]" style={{ scrollMarginTop: 64 }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="The Wall"
                    title="Chaos in. Order out."
                    kicker="Group, scatter, pin and re-arrange. The Wall is where loose thoughts learn to live together — without becoming a database. Keep scrolling and watch it tidy itself."
                />
            </div>

            <div ref={wrap} className="relative" style={{ height: '240vh' }}>
                <div className="sticky top-0 h-[100vh] flex items-center">
                    <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8">
                        <div
                            ref={stageWrap}
                            className="relative w-full"
                            style={{ height: `calc(${STAGE_H}px * var(--s, 1))` }}>
                            <div
                                className="absolute left-0 top-0 overflow-hidden"
                                style={{
                                    width: STAGE_W,
                                    height: STAGE_H,
                                    transform: 'scale(var(--s, 1))',
                                    transformOrigin: 'top left',
                                    borderRadius: 18,
                                    background: PW.paper,
                                    boxShadow:
                                        '0 1px 2px rgba(40,30,20,0.06), 0 30px 60px rgba(40,30,20,0.18), inset 0 0 0 0.5px ' +
                                        PW.hairlineStrong,
                                }}>
                                {/* Title bar — translucent material, content scrolls underneath it. */}
                                <div
                                    className="pw-glass flex items-center gap-2.5"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 40,
                                        zIndex: 5,
                                        background: 'rgba(250,248,243,0.7)',
                                        backdropFilter: 'blur(14px) saturate(160%)',
                                        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
                                        boxShadow: '0 0.5px 0 ' + PW.hairline,
                                        padding: '0 16px',
                                    }}>
                                    <div className="flex gap-1.5">
                                        {['#ed6a5e', '#f4be4f', '#61c554'].map(c => (
                                            <div
                                                key={c}
                                                style={{ width: 11, height: 11, borderRadius: '50%', background: c }}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        className="flex-1 text-center relative"
                                        style={{ fontSize: 12.5, fontWeight: 600 }}>
                                        <span
                                            style={{ opacity: 'calc(1 - var(--p, 1) * 2)' }}
                                            className="absolute inset-0">
                                            Wall · 8 notes · scattered
                                        </span>
                                        <span style={{ opacity: 'calc((var(--p, 1) - 0.5) * 2)' }}>
                                            Wall · 8 notes · arranged
                                        </span>
                                    </div>
                                    <div
                                        className="inline-flex items-center gap-[5px]"
                                        style={{ fontSize: 11.5, color: PW.inkSoft }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: PW.ok }} />
                                        Synced
                                    </div>
                                </div>

                                {/* Grid ghost — where the notes are heading. Fades in as they arrive. */}
                                <div
                                    aria-hidden
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: 'calc(var(--p, 1) * 0.8 - 0.2)',
                                    }}>
                                    {NOTES.map((_, i) => {
                                        const col = i % COLS;
                                        const row = Math.floor(i / COLS);
                                        return (
                                            <div
                                                key={i}
                                                style={{
                                                    position: 'absolute',
                                                    left: PAD_X + col * (NOTE_W + GAP),
                                                    top: PAD_Y + row * (NOTE_H + GAP),
                                                    width: NOTE_W,
                                                    height: NOTE_H,
                                                    borderRadius: 13,
                                                    border: '1px dashed ' + PW.hairlineStrong,
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                {NOTES.map((n, i) => (
                                    <WSNote key={n.title} note={n} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
