import type { ReactNode } from 'react';

import { Check, SectionHead, TagChip } from './PWPrimitives';
import { PW, PW_GRAIN, noteColor } from '../pwTokens';

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

function TbSep() {
    return <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.14)', margin: '0 3px' }} />;
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

function FeatureItem({ label, mk }: { label: string; mk?: string }) {
    return (
        <div className="flex items-center gap-3 py-3" style={{ borderBottom: '0.5px solid ' + PW.hairline }}>
            <div
                className="flex items-center justify-center shrink-0"
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: PW.accentSoft,
                    color: PW.accent,
                }}>
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
                    }}>
                    {mk}
                </span>
            )}
        </div>
    );
}

export default function PWEditor() {
    const c = noteColor('butter');
    return (
        <section
            className="py-[120px]"
            style={{
                background: '#f3efe5',
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
            }}>
            <div className="max-w-[1180px] mx-auto px-8">
                <SectionHead
                    eyebrow="The editor"
                    title="A WYSIWYG that gets out of the way."
                    kicker="Type like Markdown if you want — bold, lists, checkboxes, links, code. Or use the floating toolbar. The shape of your thinking, never the keyboard's."
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
                    <div className="relative">
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
                            }}>
                            <div className="flex items-center gap-[7px] mb-4 flex-wrap">
                                <TagChip label="Q2 launch" color={PW.tagColors[0]} ink={c.ink} />
                                <TagChip label="copy" color={PW.tagColors[2]} ink={c.ink} />
                                <span className="flex-1" />
                                <span
                                    className="inline-flex items-center gap-1"
                                    style={{ fontSize: 11, color: c.ink, opacity: 0.65 }}>
                                    <svg
                                        width="11"
                                        height="11"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.2">
                                        <circle cx="5" cy="5" r="3.5" />
                                        <path d="M5 3v2.2L6.4 6.4" strokeLinecap="round" />
                                    </svg>
                                    Due Tue, 4pm
                                </span>
                            </div>

                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 700,
                                    letterSpacing: -0.6,
                                    lineHeight: 1.1,
                                    marginBottom: 10,
                                }}>
                                Launch checklist
                            </div>

                            <div className="relative" style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: 14 }}>
                                Final pass before <b>Friday review</b>. The hero needs to read{' '}
                                <span
                                    className="relative"
                                    style={{
                                        background: '#2a2722',
                                        color: '#fff',
                                        padding: '2px 4px',
                                        borderRadius: 3,
                                        boxShadow: '0 0 0 2px rgba(42,39,34,0.18)',
                                    }}>
                                    calm but confident
                                </span>
                                . Owner is{' '}
                                <span
                                    style={{
                                        color: PW.accent,
                                        borderBottom: '1px solid ' + PW.accentSoft,
                                        paddingBottom: 1,
                                    }}>
                                    Mira
                                </span>
                                . See <span style={{ color: PW.accent, fontWeight: 500 }}>[[Q2 brief]]</span> for
                                context.
                            </div>

                            <div
                                className="flex items-center"
                                style={{
                                    position: 'absolute',
                                    top: 122,
                                    left: '24%',
                                    background: 'rgba(28,25,22,0.96)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    borderRadius: 10,
                                    padding: 4,
                                    boxShadow: '0 1px 0 rgba(255,255,255,0.08) inset, 0 14px 36px rgba(0,0,0,0.32)',
                                    gap: 1,
                                    zIndex: 10,
                                }}>
                                <TbBtn label="B" bold />
                                <TbBtn label="I" italic />
                                <TbBtn label="U" under />
                                <TbSep />
                                <TbBtn
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
                                    active
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
                                            <path d="M6 8l2-2M5 4h2a3 3 0 010 6H6M9 10H7a3 3 0 010-6h1" />
                                        </svg>
                                    }
                                />
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 148,
                                    left: 'calc(24% + 50px)',
                                    width: 8,
                                    height: 8,
                                    background: 'rgba(28,25,22,0.96)',
                                    transform: 'rotate(45deg)',
                                    zIndex: 9,
                                }}
                            />

                            <div style={{ fontSize: 16.5, fontWeight: 600, marginTop: 6, marginBottom: 8 }}>Today</div>
                            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                                <Row checked text="Confirm hero copy with Sarah" ink={c.ink} edge={c.edge} />
                                <Row checked text="Export og-image at 2x" ink={c.ink} edge={c.edge} />
                                <Row
                                    text={
                                        <>
                                            Review{' '}
                                            <span
                                                style={{
                                                    background: 'rgba(217,194,112,0.6)',
                                                    padding: '0 3px',
                                                    borderRadius: 2,
                                                }}>
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
                                    color: c.ink,
                                }}>
                                <div>
                                    <span style={{ opacity: 0.5 }}>$</span> npm run build:prod
                                </div>
                                <div style={{ opacity: 0.55 }}>→ deploy to staging.postwall.app</div>
                            </div>

                            <div
                                className="flex items-center gap-2"
                                style={{
                                    marginTop: 14,
                                    padding: '8px 12px',
                                    borderRadius: 8,
                                    background: 'rgba(255,255,255,0.55)',
                                    boxShadow: 'inset 0 0 0 0.5px ' + c.edge,
                                    fontSize: 12,
                                }}>
                                <span
                                    className="flex items-center justify-center"
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: 4,
                                        background: c.ink,
                                        color: c.bg,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        fontFamily: PW.mono,
                                    }}>
                                    /
                                </span>
                                <span style={{ color: c.ink, opacity: 0.75 }}>
                                    type slash to summon anything — heading, checkbox, code, image, link
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            className="uppercase mb-3.5"
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: PW.accent,
                                letterSpacing: 1.2,
                            }}>
                            Editor capabilities
                        </div>
                        <FeatureItem label="Bold · italic · underline · strike" mk="**bold**, *it*, ~~s~~" />
                        <FeatureItem label="Headings — H1 & H2" mk="# Title  ·  ## Section" />
                        <FeatureItem label="Bulleted & numbered lists" mk="- item  ·  1. item" />
                        <FeatureItem label="Checkboxes / to-dos" mk="[ ]  →  ☐" />
                        <FeatureItem label="Inline code & code blocks" mk="`inline`  ·  ``` block" />
                        <FeatureItem label="Links and [[wikilinks]] between notes" />
                        <FeatureItem label="Highlight / marker" mk="==yellow==" />
                        <FeatureItem label="Image drop-in (drag from anywhere)" />
                        <FeatureItem label="Slash command menu" mk="/" />
                        <FeatureItem label="Markdown shortcuts (live)" />
                    </div>
                </div>
            </div>
        </section>
    );
}
