import { useRef } from 'react';

import { ArrowIcon, PWButton, Reveal } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import {
    PW_DOWNLOADS,
    PW_RELEASES_URL,
    PW_REPO,
    PW_TIERS,
    PW_VERSION,
    type PWDownload,
    type PWTier,
} from '../releases';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

/** Faint notes at three depths behind the quote; nearer ones travel further. */
const BACKDROP: { color: NoteColorKey; x: string; y: string; w: number; h: number; rot: number; depth: number }[] = [
    { color: 'butter', x: '6%', y: '10%', w: 160, h: 120, rot: -8, depth: 0.9 },
    { color: 'sage', x: '82%', y: '18%', w: 140, h: 100, rot: 6, depth: 0.6 },
    { color: 'sky', x: '70%', y: '72%', w: 180, h: 130, rot: -4, depth: 1 },
    { color: 'blush', x: '12%', y: '70%', w: 120, h: 92, rot: 9, depth: 0.3 },
    { color: 'peach', x: '46%', y: '-6%', w: 110, h: 84, rot: -5, depth: 0.45 },
];

const MAC = PW_DOWNLOADS.find(d => d.os === 'mac') as PWDownload;
const OTHERS = PW_DOWNLOADS.filter(d => d.os !== 'mac');

function TierCheck() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: 5, opacity: 0.85 }}
            aria-hidden>
            <path d="M2 6.3L4.6 9 10 3" />
        </svg>
    );
}

/**
 * Prominence follows availability, not price: the tier you can actually install is the lit one.
 * An unavailable tier gets a status chip and a "watch the repo" link — never a button that lies.
 */
function TierCard({ tier }: { tier: PWTier }) {
    const live = tier.available;
    return (
        <div
            className="pw-glass flex-1 min-w-0 flex flex-col text-left"
            style={{
                padding: 26,
                borderRadius: 18,
                background: live ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.035)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: live
                    ? 'inset 0 0.5px 0 rgba(255,255,255,0.24), inset 0 0 0 1px rgba(245,230,168,0.35)'
                    : 'inset 0 0 0 0.5px rgba(255,255,255,0.1)',
            }}>
            <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }}>{tier.name}</span>
                <span
                    style={{
                        fontFamily: PW.mono,
                        fontSize: 10,
                        letterSpacing: '0.06em',
                        padding: '2px 7px',
                        borderRadius: 999,
                        fontWeight: 600,
                        background: live ? PW.notes.butter.bg : 'rgba(255,255,255,0.08)',
                        color: live ? PW.notes.butter.ink : 'rgba(250,248,243,0.6)',
                        boxShadow: live ? 'none' : 'inset 0 0 0 0.5px rgba(255,255,255,0.16)',
                    }}>
                    {live ? 'AVAILABLE NOW' : 'COMING SOON'}
                </span>
            </div>

            <div className="flex items-baseline gap-2" style={{ marginBottom: 10 }}>
                <span
                    style={{
                        fontFamily: PW.serif,
                        fontSize: 30,
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.05,
                        opacity: live ? 1 : 0.62,
                    }}>
                    {tier.price}
                </span>
                <span style={{ fontSize: 12.5, opacity: 0.5 }}>{tier.priceNote}</span>
            </div>

            <div
                style={{
                    fontSize: 14,
                    opacity: live ? 0.66 : 0.5,
                    lineHeight: 1.55,
                    textWrap: 'pretty',
                    marginBottom: 18,
                }}>
                {tier.summary}
            </div>

            <ul className="flex flex-col gap-[7px] m-0 p-0 list-none" style={{ marginBottom: 22 }}>
                {tier.points.map(point => (
                    <li
                        key={point}
                        className="flex gap-2"
                        style={{ fontSize: 13.5, opacity: live ? 0.78 : 0.52, lineHeight: 1.5 }}>
                        <TierCheck />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                {live ? (
                    <PWButton
                        variant="onDark"
                        size="md"
                        href={MAC.href}
                        newTab
                        ariaLabel={`${tier.ctaLabel} PostWall ${PW_VERSION} for Mac — ${tier.name} tier`}>
                        {tier.ctaLabel}
                        <ArrowIcon size={11} />
                    </PWButton>
                ) : (
                    <a
                        href={PW_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-[6px] hover:opacity-90"
                        style={{ fontSize: 13, opacity: 0.6, textDecoration: 'underline' }}>
                        Watch the repo for updates
                        <ArrowIcon size={10} />
                    </a>
                )}
            </div>
        </div>
    );
}

export default function PWCTA() {
    const section = useRef<HTMLElement>(null);
    useScrollProgress(section, { reduced: 0.5 });

    return (
        <section
            ref={section}
            id="pw-download"
            className="relative overflow-hidden"
            style={{ padding: '140px 24px', background: PW.ink, color: PW.paper, scrollMarginTop: 64 }}>
            {BACKDROP.map((b, i) => {
                const c = noteColor(b.color);
                const travel = 120 + b.depth * 260;
                return (
                    <div
                        key={i}
                        aria-hidden
                        className="pw-parallax"
                        style={{
                            position: 'absolute',
                            left: b.x,
                            top: b.y,
                            width: b.w,
                            height: b.h,
                            borderRadius: 12,
                            background: c.bg,
                            backgroundImage: PW_GRAIN,
                            opacity: 0.08 + b.depth * 0.14,
                            transform:
                                `translate3d(0, calc((0.5 - var(--p, 0.5)) * ${travel}px * var(--pw-depth, 1)), 0)` +
                                ` rotate(${b.rot}deg)`,
                            willChange: 'transform',
                        }}
                    />
                );
            })}

            <div className="max-w-[980px] mx-auto text-center relative">
                <Reveal>
                    <div
                        className="pw-parallax"
                        style={{
                            fontFamily: PW.serif,
                            fontWeight: 400,
                            fontStyle: 'italic',
                            fontSize: 'clamp(38px, 5.4vw, 72px)',
                            lineHeight: 1.02,
                            letterSpacing: '-0.03em',
                            textWrap: 'balance',
                            transform: 'translate3d(0, calc((0.5 - var(--p, 0.5)) * 50px * var(--pw-depth, 1)), 0)',
                            willChange: 'transform',
                        }}>
                        &ldquo;Less, but better.&rdquo;
                    </div>
                </Reveal>
                <Reveal delay={80}>
                    <div style={{ fontSize: 14, opacity: 0.55, marginTop: 18, letterSpacing: '0.03em' }}>
                        — Dieter Rams
                    </div>
                </Reveal>

                <Reveal delay={140}>
                    <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: 64 }}>
                        <span
                            className="inline-flex items-center gap-2"
                            style={{
                                fontFamily: PW.mono,
                                fontSize: 11.5,
                                letterSpacing: '0.06em',
                                padding: '5px 11px',
                                borderRadius: 999,
                                background: 'rgba(201,100,66,0.22)',
                                boxShadow: 'inset 0 0 0 0.5px rgba(245,230,168,0.32)',
                            }}>
                            <span
                                style={{ width: 6, height: 6, borderRadius: '50%', background: PW.notes.butter.bg }}
                            />
                            PUBLIC BETA · {PW_VERSION}
                        </span>
                        <span style={{ fontSize: 13, opacity: 0.55 }}>
                            Free tier only for now — Pro sync is still being built.
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="flex flex-col md:flex-row gap-5 items-stretch" style={{ marginTop: 28 }}>
                        {PW_TIERS.map(tier => (
                            <TierCard key={tier.id} tier={tier} />
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={280}>
                    <div
                        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
                        style={{ marginTop: 30 }}>
                        <span style={{ fontSize: 13, opacity: 0.5 }}>Not on a Mac?</span>
                        {OTHERS.map(d => (
                            <PWButton
                                key={d.id}
                                variant="onDarkGhost"
                                size="sm"
                                href={d.href}
                                newTab
                                ariaLabel={`Download PostWall ${PW_VERSION} — ${d.label}, ${d.detail}, ${d.size}`}>
                                {d.label}
                            </PWButton>
                        ))}
                        <a
                            href={PW_RELEASES_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-[6px] hover:opacity-90"
                            style={{ fontSize: 13, opacity: 0.62, textDecoration: 'underline' }}>
                            All builds &amp; checksums
                            <ArrowIcon size={10} />
                        </a>
                    </div>
                </Reveal>

                <Reveal delay={340}>
                    <div
                        className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-7"
                        style={{ fontSize: 12.5, opacity: 0.45, fontFamily: PW.mono }}>
                        <span>{MAC.detail}</span>
                        <span>·</span>
                        <span>Windows x64 .exe</span>
                        <span>·</span>
                        <span>Linux .deb · .rpm</span>
                    </div>
                </Reveal>

                <Reveal delay={380}>
                    <div
                        className="mx-auto mt-6"
                        style={{ fontSize: 12.5, opacity: 0.4, lineHeight: 1.6, maxWidth: 620, textWrap: 'pretty' }}>
                        Beta build — expect rough edges. Your notes sit in a folder you picked, so nothing is trapped if
                        you uninstall.
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
