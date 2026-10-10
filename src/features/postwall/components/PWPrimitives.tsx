import type { CSSProperties, ReactNode } from 'react';

import { PW } from '../pwTokens';

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
        boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 16px rgba(44,43,41,0.18)',
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

export function PinIcon({ size = 10, color = PW.pinActive }: { size?: number; color?: string }) {
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
                color: PW.inkSoft,
                letterSpacing: 1.2,
            }}>
            <span style={{ width: 18, height: 1, background: PW.inkSoft }} />
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
                        fontFamily: PW.font,
                        fontWeight: 700,
                        fontSize: 'clamp(34px, 4.6vw, 56px)',
                        lineHeight: 1.02,
                        letterSpacing: '-0.035em',
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
                            color: onDark ? 'rgba(250,249,245,0.62)' : PW.inkSoft,
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
