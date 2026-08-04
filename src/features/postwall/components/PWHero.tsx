import { Check } from './PWPrimitives';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

interface FloaterLine {
    check?: boolean;
    text: string;
}

interface FloaterProps {
    color: NoteColorKey;
    w: number;
    h: number;
    x: number;
    y: number;
    rot: number;
    z: number;
    pinned?: boolean;
    title: string;
    lines: FloaterLine[];
}

function HeroFloater({ color, w, h, x, y, rot, z, title, lines, pinned }: FloaterProps) {
    const c = noteColor(color);
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: w,
                height: h,
                transform: `rotate(${rot}deg)`,
                zIndex: z,
                borderRadius: 14,
                background: c.bg,
                color: c.ink,
                backgroundImage: PW_GRAIN,
                padding: '12px 14px',
                boxShadow: '0 1px 2px rgba(40,30,20,0.10), 0 16px 36px rgba(40,30,20,0.16)',
                fontFamily: PW.font,
            }}>
            <div className="flex items-center mb-1.5">
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: -0.2, flex: 1 }}>{title}</div>
                {pinned && (
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke={PW.accent}
                        strokeWidth="1.6"
                        strokeLinecap="round">
                        <path d="M5 1.5h4M7 1.5v4M3.5 5.5h7l-1 3h-5z M7 8.5v4" />
                    </svg>
                )}
            </div>
            {lines.map((l, i) => (
                <div key={i} className="flex items-start mb-[2px]">
                    {l.check !== undefined && <Check checked={l.check} ink={c.ink} edge={c.edge} />}
                    <span
                        style={{
                            fontSize: 11,
                            opacity: l.check ? 0.55 : 1,
                            textDecoration: l.check ? 'line-through' : 'none',
                            lineHeight: 1.4,
                        }}>
                        {l.text}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function PWHero() {
    return (
        <section
            className="relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #faf8f3 0%, #f3efe5 100%)',
                borderBottom: '0.5px solid ' + PW.hairline,
            }}>
            <div className="max-w-[1180px] mx-auto px-8 pt-[100px] pb-[120px] relative">
                <div
                    className="inline-flex items-center gap-1.5 rounded-full mb-7"
                    style={{
                        padding: '5px 10px 5px 6px',
                        background: 'rgba(255,255,255,0.7)',
                        boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
                        fontSize: 12,
                        fontWeight: 500,
                        color: PW.inkSoft,
                    }}>
                    <span
                        className="rounded-full"
                        style={{
                            padding: '2px 7px',
                            background: PW.accentSoft,
                            color: PW.accent,
                            fontSize: 10.5,
                            fontWeight: 700,
                            letterSpacing: 0.3,
                        }}>
                        v2.4
                    </span>
                    Now syncing across Mac, Windows &amp; Linux
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round">
                        <path d="M2 5h6M5 2l3 3-3 3" />
                    </svg>
                </div>

                <h1
                    className="m-0 mb-6 max-w-[880px]"
                    style={{
                        fontFamily: PW.serif,
                        fontWeight: 500,
                        fontSize: 'clamp(46px, 7vw, 88px)',
                        lineHeight: 0.98,
                        letterSpacing: -1.8,
                        textWrap: 'balance',
                    }}>
                    Sticky notes,
                    <br />
                    <span
                        style={{
                            background:
                                'linear-gradient(180deg, transparent 0%, transparent 30%, rgba(245,230,168,0.85) 30%, rgba(245,230,168,0.85) 92%, transparent 92%)',
                            padding: '0 0.08em',
                        }}>
                        finally
                    </span>{' '}
                    at home on every desktop.
                </h1>

                <p
                    className="m-0 mb-9 max-w-[560px]"
                    style={{
                        fontSize: 19,
                        lineHeight: 1.5,
                        color: PW.inkSoft,
                        textWrap: 'pretty',
                    }}>
                    A minimal, native sticky-notes app for Mac, Windows and Linux. Paper-warm colors that are easy on
                    the eyes, a quiet WYSIWYG editor, and a wall that finally feels like yours.
                </p>

                <div className="flex gap-3 items-center flex-wrap mb-6">
                    <a
                        className="inline-flex items-center gap-[9px] cursor-pointer"
                        style={{
                            padding: '13px 20px',
                            borderRadius: 11,
                            background: PW.ink,
                            color: PW.paper,
                            fontSize: 15,
                            fontWeight: 600,
                            boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 16px rgba(42,39,34,0.18)',
                        }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M11.5 2.2c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8.9-.4.4-.7 1.1-.6 1.8.7 0 1.4-.3 1.8-.8zm.5 1.1c-1 0-1.8.6-2.3.6-.5 0-1.2-.6-2-.6-1 0-2 .6-2.5 1.5-1.1 1.8-.3 4.6.8 6.1.5.7 1.1 1.5 2 1.5.8 0 1.1-.5 2-.5.9 0 1.2.5 2 .5.8 0 1.4-.7 1.9-1.5.6-.8.8-1.6.8-1.6-.1 0-1.6-.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.1-1.2z" />
                        </svg>
                        Download for Mac
                    </a>
                    <a
                        className="inline-flex items-center gap-2 cursor-pointer"
                        style={{
                            padding: '12px 18px',
                            borderRadius: 11,
                            background: 'rgba(255,255,255,0.7)',
                            boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
                            fontSize: 14.5,
                            fontWeight: 600,
                            color: PW.ink,
                        }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <rect x="1" y="1" width="5.5" height="5.5" />
                            <rect x="7.5" y="1" width="5.5" height="5.5" />
                            <rect x="1" y="7.5" width="5.5" height="5.5" />
                            <rect x="7.5" y="7.5" width="5.5" height="5.5" />
                        </svg>
                        Windows
                    </a>
                    <a
                        className="inline-flex items-center gap-2 cursor-pointer"
                        style={{
                            padding: '12px 18px',
                            borderRadius: 11,
                            background: 'rgba(255,255,255,0.7)',
                            boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
                            fontSize: 14.5,
                            fontWeight: 600,
                            color: PW.ink,
                        }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <path d="M7 0.5c-1.5 0-2.5 1.3-2.5 3 0 .6.2 1.1.4 1.6-1.2.4-2.2 1.5-2.4 2.8L1.5 11l1 2h9l1-2-1-3.1c-.2-1.3-1.2-2.4-2.4-2.8.2-.5.4-1 .4-1.6 0-1.7-1-3-2.5-3z" />
                        </svg>
                        Linux
                    </a>
                    <span style={{ fontSize: 13, color: PW.inkSoft, marginLeft: 6 }}>Free · 2.8 MB · v2.4.1</span>
                </div>

                <div className="flex items-center gap-4" style={{ fontSize: 12.5, color: PW.inkFaint }}>
                    <span className="inline-flex items-center gap-[5px]">
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: PW.ok }} />
                        All systems synced
                    </span>
                    <span>·</span>
                    <span>End-to-end encrypted</span>
                    <span>·</span>
                    <span>Open file format</span>
                </div>
            </div>

            <div
                className="hidden lg:block pointer-events-none"
                style={{ position: 'absolute', top: 80, right: -40, width: 560, height: 520 }}>
                <HeroFloater
                    color="butter"
                    w={240}
                    h={220}
                    x={120}
                    y={20}
                    rot={-3.5}
                    z={3}
                    pinned
                    title="Launch checklist"
                    lines={[
                        { check: true, text: 'Confirm hero copy' },
                        { check: true, text: 'Export og-image' },
                        { check: false, text: 'Review pricing module' },
                        { check: false, text: 'Send draft to Sarah' },
                        { check: false, text: 'Schedule announcement' },
                    ]}
                />
                <HeroFloater
                    color="sage"
                    w={200}
                    h={140}
                    x={310}
                    y={250}
                    rot={2.5}
                    z={2}
                    title="Q2 ideas"
                    lines={[{ text: '· Inline AI rewrite' }, { text: '· Voice capture' }, { text: '· Calendar sync' }]}
                />
                <HeroFloater
                    color="blush"
                    w={180}
                    h={120}
                    x={40}
                    y={290}
                    rot={-2}
                    z={2}
                    title="Reading"
                    lines={[
                        { text: '· Dieter Rams — Ten' },
                        { text: '· Notes on Synthesis' },
                        { text: '· The Design of Everyday Things' },
                    ]}
                />
                <HeroFloater
                    color="sky"
                    w={160}
                    h={100}
                    x={380}
                    y={70}
                    rot={4}
                    z={1}
                    title="Standup"
                    lines={[{ text: 'Y: shipped onboarding' }, { text: 'T: editor polish' }]}
                />
            </div>
        </section>
    );
}
