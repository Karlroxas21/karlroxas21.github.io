import { useRef, type CSSProperties, type ReactElement } from 'react';

import { Check, PWButton, PinIcon } from './PWPrimitives';
import { useDragSpring } from '../hooks/use-drag-spring';
import { usePointerSpring } from '../hooks/use-pointer-spring';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { useLatestRelease, type LatestRelease } from '../hooks/use-latest-release';
import { useOS } from '../hooks/use-os';
import { useStageScale } from '../hooks/use-stage-scale';
import { PW_DOWNLOADS, type PWDownload } from '../releases';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';
import { type OSFamily } from '../utils/detect-os';
import { formatSize } from '../utils/format-size';
import { scrollToSection } from '../utils/scroll-to';

const byOs = (os: PWDownload['os']) => PW_DOWNLOADS.find(d => d.os === os) as PWDownload;
const MAC = byOs('mac');
const WIN = byOs('win');

const AppleGlyph = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M11.5 2.2c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8.9-.4.4-.7 1.1-.6 1.8.7 0 1.4-.3 1.8-.8zm.5 1.1c-1 0-1.8.6-2.3.6-.5 0-1.2-.6-2-.6-1 0-2 .6-2.5 1.5-1.1 1.8-.3 4.6.8 6.1.5.7 1.1 1.5 2 1.5.8 0 1.1-.5 2-.5.9 0 1.2.5 2 .5.8 0 1.4-.7 1.9-1.5.6-.8.8-1.6.8-1.6-.1 0-1.6-.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.1-1.2z" />
    </svg>
);

const WindowsGlyph = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
        <rect x="1" y="1" width="5.5" height="5.5" />
        <rect x="7.5" y="1" width="5.5" height="5.5" />
        <rect x="1" y="7.5" width="5.5" height="5.5" />
        <rect x="7.5" y="7.5" width="5.5" height="5.5" />
    </svg>
);

const LinuxGlyph = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
        <path d="M7 0.5c-1.5 0-2.5 1.3-2.5 3 0 .6.2 1.1.4 1.6-1.2.4-2.2 1.5-2.4 2.8L1.5 11l1 2h9l1-2-1-3.1c-.2-1.3-1.2-2.4-2.4-2.8.2-.5.4-1 .4-1.6 0-1.7-1-3-2.5-3z" />
    </svg>
);

type HeroDownload = {
    os: OSFamily;
    label: string;
    glyph: () => ReactElement;
    /** Absent for Linux: two packages ship and a browser cannot tell .deb from .rpm. */
    download?: PWDownload;
};

/** Canonical order. Detection only promotes one entry to the front; it never removes any. */
const HERO_DOWNLOADS: HeroDownload[] = [
    { os: 'mac', label: 'Mac', glyph: AppleGlyph, download: MAC },
    { os: 'win', label: 'Windows', glyph: WindowsGlyph, download: WIN },
    { os: 'linux', label: 'Linux', glyph: LinuxGlyph },
];

/** Visitor's OS first, the rest untouched. An unknown OS keeps the Mac-first default. */
function orderFor(os: OSFamily): HeroDownload[] {
    const match = HERO_DOWNLOADS.find(d => d.os === os);
    return match ? [match, ...HERO_DOWNLOADS.filter(d => d !== match)] : HERO_DOWNLOADS;
}

function HeroDownloadButton({
    entry,
    primary,
    release,
}: {
    entry: HeroDownload;
    primary: boolean;
    release: LatestRelease;
}) {
    const Glyph = entry.glyph;
    const text = primary ? `Download for ${entry.label}` : entry.label;
    const look = { variant: primary ? 'ink' : 'paper', size: primary ? 'lg' : 'md' } as const;

    if (!entry.download) {
        return (
            <PWButton {...look} onClick={() => scrollToSection('pw-download')} ariaLabel={`${text}, .deb or .rpm`}>
                <Glyph />
                {text}
            </PWButton>
        );
    }
    const { href, size } = release.asset(entry.download.id);
    const hint = size ? `${entry.download.detail}, ${formatSize(size)}` : entry.download.detail;
    return (
        <PWButton {...look} href={href} newTab ariaLabel={`${text}, ${hint}`}>
            <Glyph />
            {text}
        </PWButton>
    );
}

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
    /** 0 = far/slow, 1 = near/fast. Drives both scroll parallax and pointer drift. */
    depth: number;
    delay: number;
    pinned?: boolean;
    title: string;
    lines: FloaterLine[];
}

const STAGE_W = 560;
const STAGE_H = 520;

/**
 * Three transform layers, so nothing fights:
 *  1. parallax wrapper — scroll (`--p`) + pointer (`--mx/--my`) via CSS vars
 *  2. drop wrapper     — one-shot entrance keyframe (rotation lives here)
 *  3. grab layer       — 1:1 drag + spring home, written by useDragSpring
 */
function HeroFloater({ color, w, h, x, y, rot, depth, delay, title, lines, pinned }: FloaterProps) {
    const c = noteColor(color);
    const grab = useRef<HTMLDivElement>(null);
    useDragSpring(grab, 220);

    const scrollShift = 80 + depth * 160; // px of upward travel over the hero's exit
    const drift = 8 + depth * 18; // px of pointer drift
    const parallax: CSSProperties = {
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        zIndex: Math.round(1 + depth * 5),
        transform:
            `translate3d(calc(var(--mx, 0) * ${drift}px * var(--pw-depth, 1)),` +
            ` calc((var(--my, 0) * ${drift}px - var(--p, 0) * ${scrollShift}px) * var(--pw-depth, 1)), 0)`,
        willChange: 'transform',
    };

    return (
        <div className="pw-parallax" style={parallax}>
            <div
                className="pw-drop"
                style={{ ['--rot' as string]: `${rot}deg`, ['--d' as string]: `${delay}ms`, height: '100%' }}>
                <div
                    ref={grab}
                    className="pw-grab"
                    role="img"
                    aria-label={`${title} sticky note`}
                    style={{
                        height: '100%',
                        borderRadius: 14,
                        background: c.bg,
                        color: c.ink,
                        backgroundImage: PW_GRAIN,
                        padding: '12px 14px',
                        boxShadow: `0 1px 2px rgba(40,30,20,0.10), 0 ${14 + depth * 14}px ${30 + depth * 20}px rgba(40,30,20,${0.12 + depth * 0.08})`,
                        fontFamily: PW.font,
                    }}>
                    <div className="flex items-center mb-1.5">
                        <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '-0.01em', flex: 1 }}>
                            {title}
                        </div>
                        {pinned && <PinIcon />}
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
            </div>
        </div>
    );
}

export default function PWHero() {
    const os = useOS();
    const downloads = orderFor(os);
    const release = useLatestRelease();
    const section = useRef<HTMLElement>(null);
    const stageWrap = useRef<HTMLDivElement>(null);
    useScrollProgress(section, { mode: 'exit', reduced: 0 });
    usePointerSpring(section);
    useStageScale(stageWrap, STAGE_W);

    return (
        <section
            ref={section}
            id="pw-top"
            className="relative overflow-hidden"
            style={{
                background: `linear-gradient(180deg, ${PW.paper} 0%, ${PW.sidebar} 100%)`,
                minHeight: '100svh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {/* Depth layer 0: a huge, faint wordmark that barely moves — the "far wall". */}
            <div
                aria-hidden
                className="pw-parallax pointer-events-none select-none"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '48%',
                    fontFamily: PW.font,
                    fontWeight: 800,
                    fontSize: 'clamp(150px, 26vw, 360px)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: 'rgba(44,43,41,0.035)',
                    whiteSpace: 'nowrap',
                    transform:
                        'translate3d(calc(-50% + var(--mx, 0) * -6px * var(--pw-depth, 1)), calc(-50% + (var(--p, 0) * 40px + var(--my, 0) * -4px) * var(--pw-depth, 1)), 0)',
                    willChange: 'transform',
                }}>
                postwall
            </div>

            <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 pt-[72px] md:pt-[96px] pb-16 relative flex-1 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
                {/* Copy column — drifts up a touch slower than the notes and fades as you leave. */}
                <div
                    className="pw-parallax relative z-10"
                    style={{
                        transform: 'translate3d(0, calc(var(--p, 0) * 60px * var(--pw-depth, 1)), 0)',
                        opacity: 'calc(1 - var(--p, 0) * 1.4)',
                        willChange: 'transform, opacity',
                    }}>
                    <h1
                        className="pw-drop m-0 mb-6"
                        style={{
                            ['--d' as string]: '60ms',
                            fontFamily: PW.font,
                            fontWeight: 700,
                            fontSize: 'clamp(44px, 6.8vw, 86px)',
                            lineHeight: 0.98,
                            letterSpacing: '-0.045em',
                            textWrap: 'balance',
                        }}>
                        Sticky notes that stay
                        <br />
                        <span
                            style={{
                                background:
                                    'linear-gradient(180deg, transparent 0%, transparent 30%, rgba(253,241,184,0.95) 30%, rgba(253,241,184,0.95) 92%, transparent 92%)',
                                padding: '0 0.08em',
                            }}>
                            on top
                        </span>{' '}
                        of everything.
                    </h1>

                    <p
                        className="pw-drop m-0 mb-9 max-w-[540px]"
                        style={{
                            ['--d' as string]: '140ms',
                            fontSize: 19,
                            lineHeight: 1.5,
                            color: PW.inkSoft,
                            textWrap: 'pretty',
                        }}>
                        Little windows that float above whatever you&rsquo;re doing, with a real editor inside:
                        headings, lists, checkboxes. Mac, Windows and Linux. Keep them on one machine, or sync through a
                        folder you already own.
                    </p>

                    <div
                        className="pw-drop flex gap-3 items-center flex-wrap mb-6"
                        style={{ ['--d' as string]: '220ms' }}>
                        {downloads.map((d, i) => (
                            <HeroDownloadButton key={d.os} entry={d} primary={i === 0} release={release} />
                        ))}
                        <span style={{ fontSize: 13, color: PW.inkSoft, marginLeft: 2 }}>
                            Free. Bring your own cloud.
                        </span>
                    </div>

                    {os === 'other' && (
                        <p
                            className="pw-drop m-0 mb-5"
                            style={{ ['--d' as string]: '260ms', fontSize: 13.5, color: PW.inkSoft }}>
                            PostWall is a desktop app for macOS, Windows and Linux.
                        </p>
                    )}

                    <div
                        className="pw-drop flex items-center gap-4 flex-wrap"
                        style={{ ['--d' as string]: '300ms', fontSize: 12.5, color: PW.inkFaint }}>
                        <span className="inline-flex items-center gap-[5px]">
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: PW.inkSoft }} />
                            Works offline
                        </span>
                        <span>·</span>
                        <span>No account for Free</span>
                        <span>·</span>
                        <span>Hosted sync with Pro</span>
                    </div>
                </div>

                {/* Note cluster — authored at 560×520, scaled to the column. */}
                <div ref={stageWrap} className="relative w-full" style={{ height: `calc(${STAGE_H}px * var(--s, 1))` }}>
                    <div
                        className="absolute left-0 top-0"
                        style={{
                            width: STAGE_W,
                            height: STAGE_H,
                            transform: 'scale(var(--s, 1))',
                            transformOrigin: 'top left',
                        }}>
                        <HeroFloater
                            color="yellow"
                            w={240}
                            h={220}
                            x={150}
                            y={40}
                            rot={-3.5}
                            depth={1}
                            delay={120}
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
                            color="green"
                            w={200}
                            h={140}
                            x={330}
                            y={280}
                            rot={2.5}
                            depth={0.7}
                            delay={260}
                            title="Q2 ideas"
                            lines={[
                                { text: '· Inline AI rewrite' },
                                { text: '· Voice capture' },
                                { text: '· Calendar sync' },
                            ]}
                        />
                        <HeroFloater
                            color="purple"
                            w={180}
                            h={124}
                            x={40}
                            y={310}
                            rot={-2}
                            depth={0.55}
                            delay={340}
                            title="Reading"
                            lines={[
                                { text: '· Less but Better' },
                                { text: '· Notes on Synthesis' },
                                { text: '· The Design of Everyday Things' },
                            ]}
                        />
                        <HeroFloater
                            color="blue"
                            w={160}
                            h={100}
                            x={400}
                            y={90}
                            rot={4}
                            depth={0.3}
                            delay={420}
                            title="Standup"
                            lines={[{ text: 'Y: shipped onboarding' }, { text: 'T: editor polish' }]}
                        />
                        <HeroFloater
                            color="orange"
                            w={150}
                            h={92}
                            x={10}
                            y={130}
                            rot={3}
                            depth={0.15}
                            delay={500}
                            title="Call mom"
                            lines={[{ text: 'Sunday, after lunch' }]}
                        />
                    </div>
                </div>
            </div>

            {/* Scroll cue — fades out as soon as scrolling begins. */}
            <div
                aria-hidden
                className="pw-parallax hidden md:flex flex-col items-center gap-2 mx-auto mb-7"
                style={{
                    color: PW.inkFaint,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    opacity: 'calc(1 - var(--p, 0) * 6)',
                }}>
                Scroll
                <span
                    className="pw-cue relative block"
                    style={{ width: 1, height: 36, background: PW.hairlineStrong }}
                />
            </div>
        </section>
    );
}
