import type { CSSProperties, ReactNode } from 'react';

import { PW, type NoteColor } from '../pwTokens';

export function Check({ checked, ink, edge }: { checked?: boolean; ink: string; edge: string }) {
    return (
        <span
            style={{
                display: 'inline-flex',
                width: 14,
                height: 14,
                borderRadius: 4,
                border: '1px solid ' + edge,
                background: checked ? ink : 'transparent',
                flexShrink: 0,
                marginTop: 3,
                marginRight: 8,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {checked && (
                <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2" />
                </svg>
            )}
        </span>
    );
}

export function TagChip({ label, color, ink }: { label: string; color: string; ink: string }) {
    return (
        <span
            className="inline-flex items-center gap-1 rounded-full"
            style={{
                padding: '2px 7px 2px 6px',
                background: 'rgba(255,255,255,0.4)',
                fontSize: 10.5,
                fontWeight: 500,
                color: ink,
                lineHeight: 1.3,
            }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
            {label}
        </span>
    );
}

/** One-shot fade/rise on first intersection. `delay` staggers siblings. */
export function Reveal({
    children,
    delay = 0,
    className = '',
    style,
    as: Tag = 'div',
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
    style?: CSSProperties;
    as?: 'div' | 'section' | 'li' | 'span' | 'p';
}) {
    return (
        <Tag className={`pw-reveal ${className}`} style={{ ...style, ['--d' as string]: `${delay}ms` }}>
            {children}
        </Tag>
    );
}

type ButtonVariant = 'ink' | 'paper' | 'ghost' | 'onDark' | 'onDarkGhost';

const BUTTON_STYLES: Record<ButtonVariant, CSSProperties> = {
    ink: {
        background: PW.ink,
        color: PW.paper,
        boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 16px rgba(42,39,34,0.18)',
    },
    paper: {
        background: 'rgba(255,255,255,0.7)',
        color: PW.ink,
        boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
    },
    ghost: { background: 'transparent', color: PW.inkSoft },
    onDark: { background: PW.paper, color: PW.ink },
    onDarkGhost: {
        background: 'rgba(255,255,255,0.08)',
        color: PW.paper,
        boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.18)',
    },
};

/** Press-responsive button: highlights on pointer-down (CSS :active), never only on release. */
export function PWButton({
    children,
    variant = 'ink',
    size = 'md',
    href,
    newTab = false,
    onClick,
    style,
    className = '',
    ariaLabel,
}: {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    /** Opens the link in a new tab. Used for GitHub release downloads so the page is not lost. */
    newTab?: boolean;
    onClick?: () => void;
    style?: CSSProperties;
    className?: string;
    ariaLabel?: string;
}) {
    const pad = size === 'sm' ? '7px 14px' : size === 'lg' ? '15px 24px' : '12px 18px';
    const font = size === 'sm' ? 13 : size === 'lg' ? 16 : 14.5;
    const s: CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: pad,
        borderRadius: size === 'sm' ? 8 : 11,
        fontSize: font,
        fontWeight: 600,
        letterSpacing: -0.1,
        cursor: 'pointer',
        border: 0,
        fontFamily: 'inherit',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ...BUTTON_STYLES[variant],
        ...style,
    };
    if (href) {
        return (
            <a
                className={`pw-btn ${className}`}
                href={href}
                style={s}
                aria-label={ariaLabel}
                {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {children}
            </a>
        );
    }
    return (
        <button type="button" className={`pw-btn ${className}`} onClick={onClick} style={s} aria-label={ariaLabel}>
            {children}
        </button>
    );
}

export function ArrowIcon({ size = 10 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M2 5h6M5 2l3 3-3 3" />
        </svg>
    );
}

export function PinIcon({ size = 10, color = PW.accent }: { size?: number; color?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round">
            <path d="M5 1.5h4M7 1.5v4M3.5 5.5h7l-1 3h-5z M7 8.5v4" />
        </svg>
    );
}

export function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <div
            className="inline-flex items-center gap-2 uppercase mb-[18px]"
            style={{
                fontSize: 11,
                fontWeight: 700,
                color: PW.accent,
                letterSpacing: 1.2,
            }}>
            <span style={{ width: 18, height: 1, background: PW.accent }} />
            {children}
        </div>
    );
}

export function SectionHead({
    eyebrow,
    title,
    kicker,
    align = 'left',
    onDark = false,
}: {
    eyebrow: string;
    title: ReactNode;
    kicker?: string;
    align?: 'left' | 'center';
    onDark?: boolean;
}) {
    const center = align === 'center';
    return (
        <div className={`max-w-[760px] mb-14 ${center ? 'mx-auto text-center' : ''}`}>
            <Reveal>
                <SectionLabel>{eyebrow}</SectionLabel>
            </Reveal>
            <Reveal delay={60}>
                <h2
                    className="m-0 mb-[18px]"
                    style={{
                        fontFamily: PW.serif,
                        fontWeight: 500,
                        fontSize: 'clamp(36px, 4.8vw, 60px)',
                        lineHeight: 1.0,
                        letterSpacing: '-0.025em',
                        textWrap: 'balance',
                        color: onDark ? PW.paper : PW.ink,
                    }}>
                    {title}
                </h2>
            </Reveal>
            {kicker && (
                <Reveal delay={120}>
                    <p
                        className={`m-0 ${center ? 'mx-auto' : ''}`}
                        style={{
                            fontSize: 17.5,
                            lineHeight: 1.55,
                            color: onDark ? 'rgba(250,248,243,0.62)' : PW.inkSoft,
                            maxWidth: 580,
                            textWrap: 'pretty',
                        }}>
                        {kicker}
                    </p>
                </Reveal>
            )}
        </div>
    );
}

function PinButton({
    pinned,
    color,
    square,
    round,
}: {
    pinned?: boolean;
    color: string;
    square?: boolean;
    round?: boolean;
}) {
    const r = square ? 0 : round ? '50%' : 6;
    const bg = pinned ? 'rgba(201,100,66,0.16)' : 'transparent';
    return (
        <div
            title={pinned ? 'Unpin' : 'Pin on top'}
            style={{
                width: round ? 26 : square ? 38 : 22,
                height: round ? 26 : square ? 30 : 22,
                borderRadius: r,
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                stroke={pinned ? PW.accent : color}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    opacity: pinned ? 1 : 0.7,
                    transform: pinned ? 'rotate(-30deg)' : 'none',
                    transition: 'transform 0.15s',
                }}>
                <path d="M5 1.5h4M7 1.5v4M3.5 5.5h7l-1 3h-5z M7 8.5v4" />
            </svg>
        </div>
    );
}

function CollapseButton({ color }: { color: string }) {
    return (
        <div
            title="Roll up"
            style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.7">
                <path d="M3 6h8M3 9h8" />
            </svg>
        </div>
    );
}

function WinIconBtn({ color, kind }: { color: string; kind: 'min' | 'max' | 'close' }) {
    return (
        <div
            style={{
                width: 38,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1" opacity="0.85">
                {kind === 'min' && <path d="M2 5h6" />}
                {kind === 'max' && <rect x="2" y="2" width="6" height="6" />}
                {kind === 'close' && (
                    <>
                        <path d="M2 2l6 6" />
                        <path d="M8 2l-6 6" />
                    </>
                )}
            </svg>
        </div>
    );
}

interface ChromeProps {
    children?: ReactNode;
    title?: string;
    radius?: number;
    color?: NoteColor;
    pinned?: boolean;
}

export function MacChrome({ children, title = 'PostWall', radius = 14, color, pinned = false }: ChromeProps) {
    const tint = color ?? PW.notes.butter;
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: radius,
                overflow: 'hidden',
                background: tint.bg,
                fontFamily: PW.font,
                position: 'relative',
                boxShadow: 'inset 0 0 0 0.5px ' + tint.edge,
            }}>
            <div
                style={{
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '0 12px',
                    borderBottom: '0.5px solid ' + tint.edge,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0))',
                }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#ed6a5e', '#f4be4f', '#61c554'].map(c => (
                        <div
                            key={c}
                            style={{
                                width: 11,
                                height: 11,
                                borderRadius: '50%',
                                background: c,
                                boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)',
                            }}
                        />
                    ))}
                </div>
                <div
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                        color: tint.ink,
                        letterSpacing: -0.1,
                    }}>
                    {title}
                </div>
                <PinButton pinned={pinned} color={tint.ink} />
                <CollapseButton color={tint.ink} />
            </div>
            <div style={{ position: 'relative', height: 'calc(100% - 32px)' }}>{children}</div>
        </div>
    );
}

export function WinChrome({ children, title = 'PostWall', radius = 8, color, pinned = false }: ChromeProps) {
    const tint = color ?? PW.notes.sky;
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: radius,
                overflow: 'hidden',
                background: tint.bg,
                fontFamily: PW.font,
                position: 'relative',
                boxShadow: 'inset 0 0 0 0.5px ' + tint.edge,
            }}>
            <div
                style={{
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 0 0 12px',
                    borderBottom: '0.5px solid ' + tint.edge,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0))',
                }}>
                <div style={{ flex: 1, fontSize: 12, fontWeight: 500, color: tint.ink, letterSpacing: -0.05 }}>
                    {title}
                </div>
                <div style={{ display: 'flex' }}>
                    <PinButton pinned={pinned} color={tint.ink} square />
                    <WinIconBtn color={tint.ink} kind="min" />
                    <WinIconBtn color={tint.ink} kind="max" />
                    <WinIconBtn color={tint.ink} kind="close" />
                </div>
            </div>
            <div style={{ position: 'relative', height: 'calc(100% - 30px)' }}>{children}</div>
        </div>
    );
}

export function GnomeChrome({ children, title = 'PostWall', radius = 12, color, pinned = false }: ChromeProps) {
    const tint = color ?? PW.notes.sage;
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: radius,
                overflow: 'hidden',
                background: tint.bg,
                fontFamily: PW.font,
                position: 'relative',
                boxShadow: 'inset 0 0 0 0.5px ' + tint.edge,
            }}>
            <div
                style={{
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '0 8px 0 14px',
                    borderBottom: '0.5px solid ' + tint.edge,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0))',
                }}>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: tint.ink, letterSpacing: -0.1 }}>
                    {title}
                </div>
                <PinButton pinned={pinned} color={tint.ink} round />
                <div
                    style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 0 0.5px ' + tint.edge,
                    }}>
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke={tint.ink}
                        strokeWidth="1.4"
                        strokeLinecap="round">
                        <path d="M2 2l6 6" />
                        <path d="M8 2l-6 6" />
                    </svg>
                </div>
            </div>
            <div style={{ position: 'relative', height: 'calc(100% - 36px)' }}>{children}</div>
        </div>
    );
}
