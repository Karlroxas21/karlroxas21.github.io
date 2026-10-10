import { useRef, useState } from 'react';

import { SectionHead } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { PW } from '../pwTokens';

/* ------------------------------------------------------------------ */
/*  Chapters — the right column. Each one owns a third of the scroll.  */
/* ------------------------------------------------------------------ */

const CHAPTERS: { eyebrow: string; title: string; body: string; rows: [string, string?][] }[] = [
    {
        eyebrow: '01 · Write',
        title: 'Markdown in. Formatting out.',
        body: 'Type the way you already think. Asterisks become bold, dashes become lists, brackets become checkboxes, live as you go. Select any text and the formatting toolbar opens right above it.',
        rows: [
            ['Bold · italic · underline · strike', '**bold**, *it*, ~~s~~'],
            ['Headings: H1 & H2', '# Title  ·  ## Section'],
            ['Bulleted & numbered lists', '- item  ·  1. item'],
            ['Checkboxes / to-dos', '[ ]  →  ☐'],
        ],
    },
    {
        eyebrow: '02 · Summon',
        title: 'Slash. Anything.',
        body: 'One key opens a menu with every block the editor has: headings, lists, checklists, quotes, code, dividers, images. Type to filter, Enter to insert, keyboard all the way.',
        rows: [
            ['Slash command menu', '/'],
            ['Inline code & code blocks', '`inline`  ·  ``` block'],
            ['Quotes & dividers', '>  ·  ---'],
            ['Paste or drop images straight in'],
        ],
    },
    {
        eyebrow: '03 · Sort',
        title: 'Tag it. Find it.',
        body: 'Give a note up to three tags from its + TAG button. No folder tree to maintain, no place a note can be filed wrong. When the wall gets busy, one shortcut narrows it to what you meant.',
        rows: [
            ['Up to three tags per note', '+ TAG'],
            ['Filter the wall down to one tag'],
            ['Search titles, text and tags', 'Ctrl / ⌘ K'],
        ],
    },
];

function FeatureItem({ label, mk }: { label: string; mk?: string }) {
    return (
        <div className="flex items-center gap-3 py-3" style={{ borderBottom: '0.5px solid ' + PW.hairline }}>
            <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 22, height: 22, borderRadius: 6, background: PW.selected, color: PW.ink }}>
                <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M2 5.8L4.6 8.2L9 3" />
                </svg>
            </div>
            <span style={{ fontSize: 14, color: PW.ink, fontWeight: 500, flex: 1 }}>{label}</span>
            {mk && (
                <span
                    style={{
                        fontFamily: PW.mono,
                        fontSize: 11.5,
                        color: PW.inkFaint,
                        background: 'rgba(44,43,41,0.05)',
                        padding: '3px 7px',
                        borderRadius: 4,
                        whiteSpace: 'nowrap',
                    }}>
                    {mk}
                </span>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  The note — the left column. Real captures crossfade per chapter.   */
/* ------------------------------------------------------------------ */

/**
 * Geometry in the app's CSS px. All three windows are captured from the app itself: the note is 300×360;
 * main opens the bubble menu (488×36) 8 px above the selection and centred on it, and the slash menu
 * (252×290) at (16, 191) inside the note. Both menus are their own windows and paint past the note's
 * edges, so the stage is the union of the three.
 */
const STAGE = { w: 488, h: 481 };
const NOTE = { x: 120, w: 300 };
const BUBBLE = { x: 0, y: 99, w: 488 };
const SLASH = { x: NOTE.x + 16, y: 191, w: 252 };
const TAG_RING = { x: NOTE.x + 10, y: 34, w: 46, h: 20 };

const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;

/** Absolute placement of a stage element from app CSS px. */
const place = (x: number, y: number, w: number) =>
    ({ position: 'absolute', left: pct(x, STAGE.w), top: pct(y, STAGE.h), width: pct(w, STAGE.w) }) as const;

/** One capture per chapter: a selected word, the "/" with its menu, the note with its + TAG button. */
const STEPS = [
    {
        src: '/postwall/editor-note-selected.webp',
        label: 'A PostWall note with a word selected and the formatting toolbar above it',
    },
    { src: '/postwall/editor-note-slash.webp', label: 'A PostWall note with the slash menu open, Checklist selected' },
    { src: '/postwall/note-pinned.webp', label: 'A PostWall note; its + TAG button adds a tag' },
];

function EditorNote({ step }: { step: number }) {
    return (
        <div
            role="img"
            aria-label={STEPS[step].label}
            className="relative mx-auto lg:mx-0"
            style={{
                width: '100%',
                maxWidth: 600,
                aspectRatio: `${STAGE.w} / ${STAGE.h}`,
                filter: 'drop-shadow(0 24px 40px rgba(40,30,20,0.16)) drop-shadow(0 1px 2px rgba(40,30,20,0.08))',
            }}>
            {STEPS.map((s, i) => (
                <img
                    key={s.src}
                    src={s.src}
                    alt=""
                    width={600}
                    height={720}
                    decoding="async"
                    style={{
                        ...place(NOTE.x, 0, NOTE.w),
                        height: 'auto',
                        opacity: step === i ? 1 : 0,
                        transition: 'opacity 240ms ease',
                    }}
                />
            ))}
            <img
                src="/postwall/editor-bubble-menu.webp"
                alt=""
                width={976}
                height={72}
                decoding="async"
                className={`pw-step ${step === 0 ? 'is-on' : ''}`}
                style={{ ...place(BUBBLE.x, BUBBLE.y, BUBBLE.w), height: 'auto' }}
            />
            <img
                src="/postwall/editor-slash-menu.webp"
                alt=""
                width={504}
                height={580}
                decoding="async"
                className={`pw-step ${step === 1 ? 'is-on' : ''}`}
                style={{ ...place(SLASH.x, SLASH.y, SLASH.w), height: 'auto', transformOrigin: '8% 0' }}
            />
            {/* Points at the note's own + TAG button. */}
            <span
                aria-hidden
                className={`pw-step ${step === 2 ? 'is-on' : ''}`}
                style={{
                    ...place(TAG_RING.x, TAG_RING.y, TAG_RING.w),
                    height: pct(TAG_RING.h, STAGE.h),
                    borderRadius: 6,
                    boxShadow: `0 0 0 2px ${PW.pinActive}`,
                }}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */

const stepFor = (p: number) => (p < 0.25 ? 0 : p < 0.75 ? 1 : 2);

/**
 * Sticky-scroll story: the note pins on the left while three chapters pass on the right.
 * Progress → chapter index is the only thing that touches React state (three flips, total).
 */
export default function PWEditor() {
    const wrap = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0);
    // trackWhenReduced: the chapters select content, so reduced motion gets an instant swap, not a freeze.
    useScrollProgress(wrap, { mode: 'pin', reduced: 0, trackWhenReduced: true, onChange: p => setStep(stepFor(p)) });

    return (
        <section
            id="pw-editor"
            className="pt-[110px] md:pt-[140px] pb-10"
            style={{
                background: PW.sidebar,
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
                scrollMarginTop: 64,
            }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="The editor"
                    title="A WYSIWYG that gets out of the way."
                    kicker="Type like Markdown if you want. Or use the floating toolbar. The shape of your thinking, never the keyboard's. Scroll, and the note follows along."
                />

                <div ref={wrap} className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-start">
                    <div className="lg:sticky" style={{ top: 'max(72px, calc(50vh - 260px))' }}>
                        <EditorNote step={step} />
                    </div>

                    <div>
                        {CHAPTERS.map((ch, i) => (
                            <div
                                key={ch.eyebrow}
                                className="pw-chapter flex flex-col justify-center min-h-[60vh] lg:min-h-[100vh]"
                                style={{ opacity: step === i ? 1 : 0.32 }}>
                                <div
                                    className="uppercase mb-3.5"
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: PW.inkSoft,
                                        letterSpacing: '0.12em',
                                    }}>
                                    {ch.eyebrow}
                                </div>
                                <h3
                                    className="m-0 mb-3"
                                    style={{
                                        fontFamily: PW.font,
                                        fontWeight: 700,
                                        fontSize: 'clamp(26px, 2.8vw, 36px)',
                                        lineHeight: 1.08,
                                        letterSpacing: '-0.03em',
                                    }}>
                                    {ch.title}
                                </h3>
                                <p className="m-0 mb-5" style={{ fontSize: 15.5, lineHeight: 1.6, color: PW.inkSoft }}>
                                    {ch.body}
                                </p>
                                <div>
                                    {ch.rows.map(([label, mk]) => (
                                        <FeatureItem key={label} label={label} mk={mk} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
