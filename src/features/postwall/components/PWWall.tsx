import { Check, SectionHead } from './PWPrimitives';

import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

type Item = [string, string];

function WSNote({
    color,
    w,
    h,
    x,
    y,
    rot,
    title,
    items,
    due,
    pinned,
}: {
    color: NoteColorKey;
    w: number;
    h: number;
    x: number;
    y: number;
    rot: number;
    title: string;
    items: Item[];
    due?: string;
    pinned?: boolean;
}) {
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
                borderRadius: 13,
                background: c.bg,
                color: c.ink,
                backgroundImage: PW_GRAIN,
                boxShadow: '0 1px 2px rgba(40,30,20,0.10), 0 10px 24px rgba(40,30,20,0.14)',
                padding: '12px 14px',
                fontFamily: PW.font,
            }}>
            <div className="flex items-center" style={{ marginBottom: 5 }}>
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
            {items.map(([k, txt], i) => (
                <div key={i} className="flex items-start" style={{ marginBottom: 2 }}>
                    {k !== undefined && <Check checked={k === 'c'} ink={c.ink} edge={c.edge} />}
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
            {due && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 14,
                        fontSize: 9.5,
                        fontFamily: PW.mono,
                        opacity: 0.6,
                    }}>
                    {due}
                </div>
            )}
        </div>
    );
}

export default function PWWall() {
    return (
        <section className="py-[120px]">
            <div className="max-w-[1180px] mx-auto px-8">
                <SectionHead
                    eyebrow="The Wall"
                    title="Your desktop, structured."
                    kicker="Group, scatter, pin and re-arrange. The Wall is where loose thoughts learn to live together — without becoming a database."
                />

                <div
                    className="relative overflow-hidden"
                    style={{
                        borderRadius: 18,
                        height: 460,
                        background: PW.paper,
                        boxShadow:
                            '0 1px 2px rgba(40,30,20,0.06), 0 30px 60px rgba(40,30,20,0.18), inset 0 0 0 0.5px ' +
                            PW.hairlineStrong,
                    }}>
                    <div
                        className="flex items-center gap-2.5"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 40,
                            background: 'rgba(255,255,255,0.55)',
                            borderBottom: '0.5px solid ' + PW.hairline,
                            padding: '0 16px',
                        }}>
                        <div className="flex gap-1.5">
                            {['#ed6a5e', '#f4be4f', '#61c554'].map(c => (
                                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                            ))}
                        </div>
                        <div className="flex-1 text-center" style={{ fontSize: 12.5, fontWeight: 600 }}>
                            Wall · 14 notes
                        </div>
                        <div
                            className="inline-flex items-center gap-[5px]"
                            style={{ fontSize: 11.5, color: PW.inkSoft }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: PW.ok }} />
                            Synced
                        </div>
                    </div>

                    <div style={{ position: 'absolute', inset: 0, paddingTop: 50 }}>
                        <WSNote
                            color="butter"
                            w={196}
                            h={170}
                            x={56}
                            y={26}
                            rot={-2.2}
                            pinned
                            title="Launch checklist"
                            items={[
                                ['c', 'Confirm hero copy'],
                                ['c', 'Export og-image'],
                                ['', 'Review pricing'],
                                ['', 'Send draft to Sarah'],
                            ]}
                            due="Tue 4pm"
                        />
                        <WSNote
                            color="sage"
                            w={200}
                            h={148}
                            x={282}
                            y={52}
                            rot={1.4}
                            title="Q2 ideas"
                            items={[
                                ['', 'Inline AI rewrite'],
                                ['', 'Calendar sync'],
                                ['', 'Voice capture'],
                            ]}
                        />
                        <WSNote
                            color="sky"
                            w={194}
                            h={184}
                            x={510}
                            y={20}
                            rot={-1.8}
                            title="Reading"
                            items={[
                                ['', 'Dieter Rams — Ten'],
                                ['', 'Synthesis of form'],
                                ['', 'The Design of Everyday Things'],
                                ['', 'Pattern Language'],
                            ]}
                        />
                        <WSNote
                            color="peach"
                            w={178}
                            h={142}
                            x={732}
                            y={56}
                            rot={2.4}
                            title="Standup"
                            items={[
                                ['', 'Y: onboarding'],
                                ['', 'T: editor polish'],
                                ['', 'B: design review'],
                            ]}
                        />
                        <WSNote
                            color="blush"
                            w={208}
                            h={156}
                            x={86}
                            y={238}
                            rot={2.0}
                            title="Copy variants"
                            items={[
                                ['', 'A. "Think on paper, on screen."'],
                                ['', 'B. "Cross-platform, finally."'],
                                ['', 'C. "Your wall, everywhere."'],
                            ]}
                        />
                        <WSNote
                            color="sand"
                            w={186}
                            h={140}
                            x={324}
                            y={238}
                            rot={-1.4}
                            title="Errands"
                            items={[
                                ['c', 'Pick up keys'],
                                ['', 'Dry cleaning'],
                                ['', 'Book vet'],
                            ]}
                        />
                        <WSNote
                            color="butter"
                            w={170}
                            h={158}
                            x={544}
                            y={236}
                            rot={2.6}
                            title="Quote"
                            items={[
                                ['', '"As few as possible, but as many as necessary."'],
                                ['', '— Rams'],
                            ]}
                        />
                        <WSNote
                            color="sage"
                            w={188}
                            h={136}
                            x={742}
                            y={238}
                            rot={-2.0}
                            title="Grocery"
                            items={[
                                ['', 'Bread, eggs, oat milk'],
                                ['', 'Tomatoes, basil'],
                                ['', 'Olive oil'],
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
