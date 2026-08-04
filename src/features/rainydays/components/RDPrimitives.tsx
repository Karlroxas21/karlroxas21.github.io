import type { MouseEvent, ReactNode } from 'react';

import {
    RD_FOCUS,
    RD_FOCUS_DARK,
    RD_H2,
    RD_LEAD,
    RD_NUM,
    RD_SHELL,
    citation,
    sectionHref,
    type RDCitationKey,
} from '../rdTokens';
import { scrollToSection } from '../utils/scroll';
import { IconArrowRight } from './RDIcons';

type Tone = 'light' | 'dark';

/**
 * In-page link. Scrolls on plain click; the href stays a valid route so
 * middle-click and "open in new tab" land on the page instead of NotFound.
 */
export function SectionLink({
    id,
    children,
    className = '',
    onNavigate,
    ...rest
}: {
    id: string;
    children: ReactNode;
    className?: string;
    onNavigate?: () => void;
    'aria-current'?: 'true';
    'aria-label'?: string;
}) {
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
        // Let the browser handle modified clicks (new tab, new window, download).
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        scrollToSection(id);
        onNavigate?.();
    };
    return (
        <a href={sectionHref(id)} onClick={handle} className={className} {...rest}>
            {children}
        </a>
    );
}

/**
 * Footnote marker. Renders the reference numbers for a claim and jumps to the
 * references block in the footer.
 */
export function Cite({ keys, tone = 'light' }: { keys: readonly RDCitationKey[]; tone?: Tone }) {
    const skin = tone === 'dark' ? 'text-[#B0B0B0] hover:text-white' : 'text-[#808080] hover:text-[#0A0A0A]';
    return (
        <sup className="ml-0.5 font-mono text-[10px] font-medium tracking-normal">
            {keys.map((key, i) => {
                const c = citation(key);
                return (
                    <span key={key}>
                        {i > 0 && <span className={skin}>,</span>}
                        <SectionLink
                            id="rd-references"
                            aria-label={`Reference ${c.n}: ${c.label}`}
                            className={`rounded underline decoration-dotted underline-offset-2 transition-colors ${skin}`}>
                            {c.n}
                        </SectionLink>
                    </span>
                );
            })}
        </sup>
    );
}

/** Section body wrapper — single source of gutters and max width. */
export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`${RD_SHELL} ${className}`}>{children}</div>;
}

/** Mono section marker: a short rule followed by the section name. */
export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
    const dark = tone === 'dark';
    return (
        <div
            className={`flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${
                dark ? 'text-[#B0B0B0]' : 'text-[#808080]'
            }`}>
            <span className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-[#E5E5E5]'}`} aria-hidden="true" />
            <span>{children}</span>
        </div>
    );
}

export function Chip({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
    const skin =
        tone === 'dark' ? 'bg-white/10 text-white border-white/15' : 'bg-[#F0F0F0] text-[#0A0A0A] border-[#E5E5E5]';
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide ${skin}`}>
            {children}
        </span>
    );
}

export function SectionHead({
    eyebrow,
    title,
    lead,
    tone = 'light',
    align = 'start',
    className = '',
}: {
    eyebrow: string;
    title: ReactNode;
    lead?: ReactNode;
    tone?: Tone;
    align?: 'start' | 'center';
    className?: string;
}) {
    const dark = tone === 'dark';
    const centered = align === 'center';
    return (
        <div
            className={`rd-reveal flex max-w-[760px] flex-col gap-4 ${
                centered ? 'mx-auto items-center text-center' : ''
            } ${className}`}>
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
            <h2 className={`${RD_H2} ${dark ? 'text-white' : 'text-[#0A0A0A]'}`}>{title}</h2>
            {lead && <p className={`${RD_LEAD} max-w-[600px] ${dark ? 'text-[#B0B0B0]' : 'text-[#808080]'}`}>{lead}</p>}
        </div>
    );
}

/**
 * Device bezel around a raw 1284×2778 screenshot.
 *
 * The image keeps its own aspect ratio: never cropped, never upscaled past its
 * intrinsic width. Card width is the only lever on how large a screen reads.
 *
 * The PNGs ship their own anti-aliased rounded corners (66px radius at 1284px
 * wide) inside a transparent margin of 12px at the sides and 25px top/bottom, so
 * the image is never masked in CSS — a bigger radius would cut through opaque
 * pixels, which reads as a hard edge on the light-mode shot.
 *
 * The bezel is the same box as the image and its radius is a percentage, so it
 * tracks the screenshot's own corner at every card width: (66+12)/1284 across,
 * (66+25)/2778 down. The slight ellipse absorbs the asymmetric margin and keeps
 * the dark edge an even thickness around the corner.
 */
const BEZEL_RADIUS = '6.07% / 3.28%';

export function PhoneFrame({
    src,
    alt,
    priority = false,
    className = '',
}: {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <div
            className={`relative overflow-hidden bg-[#0A0A0A] shadow-[0_2px_8px_rgba(0,0,0,.35),0_40px_80px_-40px_rgba(0,0,0,.7)] ${className}`}
            style={{ borderRadius: BEZEL_RADIUS }}>
            <img
                src={src}
                alt={alt}
                width={1284}
                height={2778}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                className="block h-auto w-full"
            />
        </div>
    );
}

/**
 * Store badge. `sectionId` scrolls in-page (used until the Play listing is live);
 * `href` sends the user to a real external URL.
 */
export function StoreButton({
    icon,
    label,
    name,
    href,
    sectionId,
    tone = 'light',
    className = '',
}: {
    icon: ReactNode;
    label: string;
    name: string;
    href?: string;
    sectionId?: string;
    tone?: Tone;
    className?: string;
}) {
    const skin =
        tone === 'dark'
            ? `bg-white text-[#0A0A0A] border-white hover:bg-[#E5E5E5] ${RD_FOCUS_DARK}`
            : `bg-[#0A0A0A] text-white border-[#0A0A0A] hover:bg-[#1A1A1A] ${RD_FOCUS}`;
    const sub = tone === 'dark' ? 'text-[#5A5A5A]' : 'text-[#B0B0B0]';
    const body = (
        <>
            <span className="h-6 w-6 shrink-0">{icon}</span>
            <span className="flex flex-col leading-tight">
                <span className={`text-[10px] tracking-wide ${sub}`}>{label}</span>
                <span className="text-[15px] font-semibold">{name}</span>
            </span>
        </>
    );
    const shell = `inline-flex items-center gap-3 rounded-xl border px-[18px] py-2.5 text-left transition-all duration-150 active:scale-[0.98] ${skin} ${className}`;

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer noopener" className={shell}>
                {body}
            </a>
        );
    }
    return (
        <SectionLink id={sectionId ?? 'rd-download'} className={shell}>
            {body}
        </SectionLink>
    );
}

export function TextLink({
    sectionId,
    href,
    children,
    tone = 'light',
}: {
    sectionId?: string;
    href?: string;
    children: ReactNode;
    tone?: Tone;
}) {
    const skin =
        tone === 'dark'
            ? `text-[#B0B0B0] hover:text-white ${RD_FOCUS_DARK}`
            : `text-[#808080] hover:text-[#0A0A0A] ${RD_FOCUS}`;
    const shell = `group inline-flex items-center gap-2 rounded text-sm transition-colors ${skin}`;
    const body = (
        <>
            {children}
            <IconArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
        </>
    );

    if (sectionId) {
        return (
            <SectionLink id={sectionId} className={shell}>
                {body}
            </SectionLink>
        );
    }
    return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={shell}>
            {body}
        </a>
    );
}

/** Peso figure. Optional count-up on first scroll into view (see useCountUp). */
export function Amount({
    value,
    countUp = false,
    className = '',
}: {
    value: string;
    countUp?: boolean;
    className?: string;
}) {
    return (
        <span className={`${RD_NUM} ${className}`} {...(countUp ? { 'data-countup': value } : {})}>
            {value}
        </span>
    );
}

/** Animated mono mesh + grid texture used by every ink-coloured section. */
export function InkBackdrop({ grid = true }: { grid?: boolean }) {
    return (
        <>
            <div className="rd-mesh absolute inset-[-10%] z-0" aria-hidden="true">
                {[
                    { pos: 'left-[-10%] top-[-10%]', color: '#2A2A2A' },
                    { pos: 'right-[-15%] top-[10%]', color: '#1F1F1F' },
                    { pos: 'bottom-[-20%] left-[20%]', color: '#353535' },
                    { pos: 'bottom-[10%] right-[25%]', color: '#181818' },
                ].map(b => (
                    <span
                        key={b.pos}
                        className={`absolute aspect-square w-1/2 rounded-full ${b.pos}`}
                        style={{
                            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
                            mixBlendMode: 'screen',
                        }}
                    />
                ))}
            </div>
            {grid && <div className="rd-grid-texture" aria-hidden="true" />}
        </>
    );
}
