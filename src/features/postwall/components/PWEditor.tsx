import { useRef, useState, type ReactNode } from 'react';

import { Check, SectionHead, TagChip } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { PW, PW_GRAIN, noteColor } from '../pwTokens';

/* ------------------------------------------------------------------ */
/*  Chapters — the right column. Each one owns a third of the scroll.  */
/* ------------------------------------------------------------------ */

const CHAPTERS: { eyebrow: string; title: string; body: string; rows: [string, string?][] }[] = [
    {
        eyebrow: '01 — Write',
        title: 'Markdown in. Formatting out.',
        body: 'Type the way you already think. Asterisks become bold, dashes become lists, brackets become checkboxes — live, as you go. Select anything and a quiet toolbar shows up exactly where your cursor is.',
        rows: [
            ['Bold · italic · underline · strike', '**bold**, *it*, ~~s~~'],
            ['Headings — H1 & H2', '# Title  ·  ## Section'],
            ['Bulleted & numbered lists', '- item  ·  1. item'],
            ['Checkboxes / to-dos', '[ ]  →  ☐'],
        ],
    },
    {
        eyebrow: '02 — Summon',
        title: 'Slash. Anything.',
        body: 'One key opens a menu with everything the editor can do — heading, code block, image, date, divider. Fuzzy-matched, keyboard-first, gone the moment you pick.',
        rows: [
            ['Slash command menu', '/'],
            ['Inline code & code blocks', '`inline`  ·  ``` block'],
            ['Highlight / marker', '==yellow=='],
            ['Image drop-in (drag from anywhere)'],
        ],
    },
    {
        eyebrow: '03 — Sort',
        title: 'Tag it. Find it.',
        body: 'Type a hash and pick a tag — or make one on the spot. No folder tree to maintain, no place a note can be filed wrong. When the wall gets busy, one shortcut narrows it to what you meant.',
        rows: [
            ['Color-coded tags', '#copy'],
            ['As many tags per note as it needs'],
            ['Filter the wall down to one tag'],
            ['⌘K fuzzy search across every note'],
        ],
    },
];

function FeatureItem({ label, mk }: { label: string; mk?: string }) {
    return (
        <div className="flex items-center gap-3 py-3" style={{ borderBottom: '0.5px solid ' + PW.hairline }}>
            <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 22, height: 22, borderRadius: 6, background: PW.accentSoft, color: PW.accent }}>
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
                        background: 'rgba(42,39,34,0.05)',
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
/*  The note — the left column. Overlays crossfade with the chapter.   */
/* ------------------------------------------------------------------ */

function TbBtn({
    label,
    icon,
    active,
    bold,
    italic,
    under,
}: {
    label?: string;
    icon?: ReactNode;
    active?: boolean;
    bold?: boolean;
    italic?: boolean;
    under?: boolean;
}) {
    return (
        <div
            className="flex items-center justify-center"
            style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                background: active ? 'rgba(255,255,255,0.85)' : 'transparent',
                color: active ? PW.ink : 'rgba(255,255,255,0.85)',
                fontSize: 12,
                fontWeight: bold ? 800 : 600,
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: under ? 'underline' : 'none',
            }}>
            {icon ?? label}
        </div>
    );
}

const DARK_POPOVER = {
    background: 'rgba(28,25,22,0.96)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 10,
    boxShadow: '0 1px 0 rgba(255,255,255,0.08) inset, 0 14px 36px rgba(0,0,0,0.32)',
    color: 'rgba(255,255,255,0.9)',
    zIndex: 10,
} as const;

function Toolbar({ on }: { on: boolean }) {
    return (
        <div
            className={`pw-step flex items-center ${on ? 'is-on' : ''}`}
            style={{
                ...DARK_POPOVER,
                position: 'absolute',
                top: 'calc(100% + 9px)',
                left: 0,
                padding: 4,
                gap: 1,
                transformOrigin: '24px -9px',
            }}>
            <TbBtn label="B" bold />
            <TbBtn label="I" italic />
            <TbBtn label="U" under />
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.14)', margin: '0 3px' }} />
            <TbBtn
                active
                icon={
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M3 9.5L8 4.5l2 2-5 5H3v-1.5z" />
                        <path d="M2 12.5h10" />
                    </svg>
                }
            />
            <TbBtn
                icon={
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M5 4l-3 3 3 3M9 4l3 3-3 3" />
                    </svg>
                }
            />
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    top: -4,
                    left: 20,
                    width: 8,
                    height: 8,
                    background: 'rgba(28,25,22,0.96)',
                    transform: 'rotate(45deg)',
                }}
            />
        </div>
    );
}

const SLASH_ITEMS = ['Heading', 'Checklist', 'Code block', 'Image', 'Date', 'Divider'];

function SlashMenu({ on }: { on: boolean }) {
    return (
        <div
            className={`pw-step ${on ? 'is-on' : ''}`}
            style={{
                ...DARK_POPOVER,
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                width: 210,
                padding: 6,
                transformOrigin: '20px -6px',
            }}>
            <div
                className="flex items-center gap-2 px-2 py-1.5"
                style={{ fontFamily: PW.mono, fontSize: 11.5, opacity: 0.6 }}>
                <span style={{ color: PW.notes.butter.bg }}>/</span>
                <span>he</span>
                <span className="flex-1" />
                <span style={{ fontSize: 10 }}>esc</span>
            </div>
            {SLASH_ITEMS.map((it, i) => (
                <div
                    key={it}
                    className="flex items-center gap-2 px-2"
                    style={{
                        height: 26,
                        borderRadius: 6,
                        fontSize: 12.5,
                        background: i === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
                        opacity: i === 0 ? 1 : 0.75,
                    }}>
                    <span
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 3,
                            background: PW.tagColors[i % PW.tagColors.length],
                            opacity: 0.9,
                        }}
                    />
                    {it}
                    {i === 0 && (
                        <span className="ml-auto" style={{ fontSize: 10, opacity: 0.6 }}>
                            ↵
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

function TagMenu({ on }: { on: boolean }) {
    return (
        <div
            className={`pw-step ${on ? 'is-on' : ''}`}
            style={{
                ...DARK_POPOVER,
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                width: 200,
                padding: 6,
                transformOrigin: '20px -6px',
                fontWeight: 400,
            }}>
            <div className="px-2 py-1.5" style={{ fontFamily: PW.mono, fontSize: 11.5, opacity: 0.6 }}>
                #co
            </div>
            {['copy', 'collab', 'colors'].map((it, i) => (
                <div
                    key={it}
                    className="flex items-center gap-2 px-2"
                    style={{
                        height: 26,
                        borderRadius: 6,
                        fontSize: 12.5,
                        color: 'rgba(255,255,255,0.9)',
                        background: i === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
                        opacity: i === 0 ? 1 : 0.75,
                    }}>
                    <span style={{ color: PW.notes.butter.bg }}>#</span>
                    {it}
                </div>
            ))}
        </div>
    );
}

function TagPill({ on }: { on: boolean }) {
    return (
        <div
            className={`pw-step inline-flex items-center gap-1.5 ${on ? 'is-on' : ''}`}
            style={{
                position: 'absolute',
                right: 24,
                bottom: 18,
                padding: '5px 9px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.7)',
                boxShadow: 'inset 0 0 0 0.5px rgba(120,98,40,0.18)',
                fontSize: 11,
                fontWeight: 600,
                color: PW.notes.butter.ink,
                transitionDelay: on ? '120ms' : '0ms',
            }}>
            <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M2.2 7.4V2.2h5.2l5 5-5.2 5.2z" />
                <circle cx="4.6" cy="4.6" r="0.9" />
            </svg>
            3 notes tagged
        </div>
    );
}

function Row({ checked, text, ink, edge }: { checked?: boolean; text: ReactNode; ink: string; edge: string }) {
    return (
        <div className="flex items-start" style={{ marginBottom: 5 }}>
            <Check checked={checked} ink={ink} edge={edge} />
            <span style={{ textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.5 : 1 }}>
                {text}
            </span>
        </div>
    );
}

function EditorNote({ step }: { step: number }) {
    const c = noteColor('butter');
    return (
        <div
            className="relative"
            style={{
                borderRadius: 16,
                background: c.bg,
                color: c.ink,
                backgroundImage: PW_GRAIN,
                padding: '28px 32px',
                boxShadow: '0 1px 2px rgba(40,30,20,0.08), 0 24px 48px rgba(40,30,20,0.16)',
                transform: 'rotate(-0.6deg)',
                minHeight: 440,
            }}>
            <div className="flex items-center gap-[7px] mb-4 flex-wrap">
                <TagChip label="Q2 launch" color={PW.tagColors[0]} ink={c.ink} />
                <TagChip label="copy" color={PW.tagColors[2]} ink={c.ink} />
                <span className="flex-1" />
                <span className="inline-flex items-center gap-1" style={{ fontSize: 11, opacity: 0.65 }}>
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <circle cx="5" cy="5" r="3.5" />
                        <path d="M5 3v2.2L6.4 6.4" strokeLinecap="round" />
                    </svg>
                    Due Tue, 4pm
                </span>
            </div>

            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10 }}>
                Launch checklist
            </div>

            <div style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: 14 }}>
                Final pass before <b>Friday review</b>. The hero needs to read{' '}
                <span
                    className="relative inline-block"
                    style={{
                        background: step === 0 ? '#2a2722' : 'transparent',
                        color: step === 0 ? '#fff' : 'inherit',
                        padding: '2px 4px',
                        borderRadius: 3,
                        boxShadow: step === 0 ? '0 0 0 2px rgba(42,39,34,0.18)' : 'none',
                        transition: 'background-color 240ms ease, color 240ms ease, box-shadow 240ms ease',
                    }}>
                    calm but confident
                    <Toolbar on={step === 0} />
                </span>
                . Owner is{' '}
                <span style={{ color: PW.accent, borderBottom: '1px solid ' + PW.accentSoft, paddingBottom: 1 }}>
                    Mira
                </span>
                . Tagged{' '}
                <span
                    className="relative inline-block"
                    style={{
                        color: PW.accent,
                        fontWeight: 500,
                        background: step === 2 ? 'rgba(201,100,66,0.14)' : 'transparent',
                        borderRadius: 3,
                        padding: '0 2px',
                        transition: 'background-color 240ms ease',
                    }}>
                    #copy
                    <TagMenu on={step === 2} />
                </span>{' '}
                for later.
            </div>

            <div style={{ fontSize: 16.5, fontWeight: 600, marginTop: 6, marginBottom: 8 }}>Today</div>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <Row checked text="Confirm hero copy with Sarah" ink={c.ink} edge={c.edge} />
                <Row checked text="Export og-image at 2x" ink={c.ink} edge={c.edge} />
                <Row
                    text={
                        <>
                            Review{' '}
                            <span style={{ background: 'rgba(217,194,112,0.6)', padding: '0 3px', borderRadius: 2 }}>
                                pricing module
                            </span>{' '}
                            with finance
                        </>
                    }
                    ink={c.ink}
                    edge={c.edge}
                />
                <Row
                    text={
                        <>
                            Send draft to <i>Sarah</i> by EOD
                        </>
                    }
                    ink={c.ink}
                    edge={c.edge}
                />
            </div>

            <div
                style={{
                    marginTop: 16,
                    padding: '10px 12px',
                    borderRadius: 7,
                    background: 'rgba(0,0,0,0.06)',
                    fontFamily: PW.mono,
                    fontSize: 12,
                    lineHeight: 1.6,
                }}>
                <div>
                    <span style={{ opacity: 0.5 }}>$</span> npm run build:prod
                </div>
                <div style={{ opacity: 0.55 }}>→ deploy to staging.postwall.app</div>
            </div>

            {/* Chapter 2 types a slash; the caret blinks in the empty line below the code block. */}
            <div className="relative flex items-center gap-1 mt-3 w-fit" style={{ fontSize: 14, height: 20 }}>
                <span
                    style={{
                        fontFamily: PW.mono,
                        opacity: step === 1 ? 1 : 0,
                        transition: 'opacity 200ms ease',
                    }}>
                    /he
                </span>
                <span
                    aria-hidden
                    style={{
                        width: 1.5,
                        height: 16,
                        background: c.ink,
                        opacity: step === 1 ? 0.8 : 0,
                        transition: 'opacity 200ms ease',
                    }}
                />
                <SlashMenu on={step === 1} />
            </div>

            <TagPill on={step === 2} />
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
                background: '#f3efe5',
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
                scrollMarginTop: 64,
            }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="The editor"
                    title="A WYSIWYG that gets out of the way."
                    kicker="Type like Markdown if you want. Or use the floating toolbar. The shape of your thinking, never the keyboard's. Scroll — the note follows along."
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
                                        color: PW.accent,
                                        letterSpacing: '0.12em',
                                    }}>
                                    {ch.eyebrow}
                                </div>
                                <h3
                                    className="m-0 mb-3"
                                    style={{
                                        fontFamily: PW.serif,
                                        fontWeight: 500,
                                        fontSize: 'clamp(28px, 3vw, 38px)',
                                        lineHeight: 1.05,
                                        letterSpacing: '-0.02em',
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
