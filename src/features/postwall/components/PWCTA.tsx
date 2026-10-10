import { useRef, type ReactNode } from 'react';

import { ArrowIcon, PWButton, Reveal } from './PWPrimitives';
import { useLatestRelease, type LatestRelease } from '../hooks/use-latest-release';
import { useOS } from '../hooks/use-os';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { FOUNDING_OFFER, FREE_FEATURES, PRO_CHECKOUT_URL, PRO_FEATURES, PRO_PRICE_USD } from '../pricing';
import { PW_DOWNLOADS, type PWDownload } from '../releases';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';
import { type OSFamily } from '../utils/detect-os';
import { isFoundingOfferLive } from '../utils/founding-offer';
import { formatSize } from '../utils/format-size';
import { scrollToSection } from '../utils/scroll-to';

/** Faint notes at three depths behind the quote; nearer ones travel further. */
const BACKDROP: { color: NoteColorKey; x: string; y: string; w: number; h: number; rot: number; depth: number }[] = [
    { color: 'yellow', x: '6%', y: '10%', w: 160, h: 120, rot: -8, depth: 0.9 },
    { color: 'green', x: '82%', y: '18%', w: 140, h: 100, rot: 6, depth: 0.6 },
    { color: 'blue', x: '70%', y: '72%', w: 180, h: 130, rot: -4, depth: 1 },
    { color: 'purple', x: '12%', y: '70%', w: 120, h: 92, rot: 9, depth: 0.3 },
    { color: 'orange', x: '46%', y: '-6%', w: 110, h: 84, rot: -5, depth: 0.45 },
];

const byId = (id: PWDownload['id']) => PW_DOWNLOADS.find(d => d.id === id) as PWDownload;

/** The Free card's one-click download. Linux gets no single file — a browser cannot tell .deb from .rpm. */
const PRIMARY_FOR: Record<OSFamily, PWDownload | null> = {
    mac: byId('mac-arm64'),
    win: byId('win-x64'),
    linux: null,
    other: byId('mac-arm64'),
};

const ON_DARK_MUTED = 'rgba(250,249,245,0.6)';

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

function Chip({ lit, children }: { lit: boolean; children: ReactNode }) {
    return (
        <span
            style={{
                fontFamily: PW.mono,
                fontSize: 10,
                letterSpacing: '0.06em',
                padding: '2px 7px',
                borderRadius: 999,
                fontWeight: 600,
                background: lit ? PW.notes.yellow.bg : 'rgba(255,255,255,0.08)',
                color: lit ? PW.notes.yellow.ink : ON_DARK_MUTED,
                boxShadow: lit ? 'none' : 'inset 0 0 0 0.5px rgba(255,255,255,0.16)',
            }}>
            {children}
        </span>
    );
}

function TierCard({
    name,
    chip,
    price,
    summary,
    points,
    children,
}: {
    name: string;
    chip: ReactNode;
    price: ReactNode;
    summary: string;
    points: string[];
    /** The card's call to action. */
    children: ReactNode;
}) {
    return (
        <div
            className="pw-glass flex-1 min-w-0 flex flex-col text-left"
            style={{
                padding: 26,
                borderRadius: 18,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.24), inset 0 0 0 1px rgba(253,241,184,0.25)',
            }}>
            <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }}>{name}</span>
                {chip}
            </div>
            <div style={{ marginBottom: 10 }}>{price}</div>
            <div style={{ fontSize: 14, opacity: 0.66, lineHeight: 1.55, textWrap: 'pretty', marginBottom: 18 }}>
                {summary}
            </div>
            <ul className="flex flex-col gap-[7px] m-0 p-0 list-none" style={{ marginBottom: 22 }}>
                {points.map(point => (
                    <li key={point} className="flex gap-2" style={{ fontSize: 13.5, opacity: 0.78, lineHeight: 1.5 }}>
                        <TierCheck />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-auto">{children}</div>
        </div>
    );
}

function PriceLine({ amount, note, struck }: { amount: string; note?: string; struck?: string }) {
    return (
        <div className="flex items-baseline gap-2 flex-wrap">
            <span
                style={{
                    fontFamily: PW.font,
                    fontSize: 30,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                }}>
                {amount}
            </span>
            {struck && <s style={{ fontSize: 15, opacity: 0.5 }}>{struck}</s>}
            {note && <span style={{ fontSize: 12.5, opacity: 0.5 }}>{note}</span>}
        </div>
    );
}

function FreeDownload({ os, release }: { os: OSFamily; release: LatestRelease }) {
    const download = PRIMARY_FOR[os];
    if (!download) {
        return (
            <PWButton variant="onDark" size="md" onClick={() => scrollToSection('pw-all-downloads')}>
                Download for Linux
                <ArrowIcon size={11} />
            </PWButton>
        );
    }
    return (
        <PWButton
            variant="onDark"
            size="md"
            href={release.asset(download.id).href}
            newTab
            ariaLabel={`Download PostWall for ${download.os === 'win' ? 'Windows' : 'Mac'}, free`}>
            {download.os === 'win' ? 'Download for Windows' : 'Download for Mac'}
            <ArrowIcon size={11} />
        </PWButton>
    );
}

function ProCheckout() {
    if (PRO_CHECKOUT_URL) {
        return (
            <PWButton variant="onDark" size="md" href={PRO_CHECKOUT_URL} newTab>
                Get Pro
                <ArrowIcon size={11} />
            </PWButton>
        );
    }
    return (
        <button
            type="button"
            disabled
            aria-disabled="true"
            style={{
                padding: '12px 18px',
                borderRadius: 11,
                fontSize: 14.5,
                fontWeight: 600,
                fontFamily: 'inherit',
                border: 0,
                background: 'rgba(255,255,255,0.08)',
                color: ON_DARK_MUTED,
                cursor: 'not-allowed',
            }}>
            Checkout opens soon
        </button>
    );
}

export default function PWCTA() {
    const section = useRef<HTMLElement>(null);
    useScrollProgress(section, { reduced: 0.5 });
    const release = useLatestRelease();
    const os = useOS();
    const founding = isFoundingOfferLive(FOUNDING_OFFER);

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
                        className="pw-parallax hidden md:block"
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
                            fontFamily: PW.font,
                            fontWeight: 700,
                            fontSize: 'clamp(36px, 5vw, 66px)',
                            lineHeight: 1.04,
                            letterSpacing: '-0.04em',
                            textWrap: 'balance',
                            transform: 'translate3d(0, calc((0.5 - var(--p, 0.5)) * 50px * var(--pw-depth, 1)), 0)',
                            willChange: 'transform',
                        }}>
                        &ldquo;Less, but better.&rdquo;
                    </div>
                </Reveal>
                <Reveal delay={80}>
                    <div style={{ fontSize: 14, opacity: 0.55, marginTop: 18, letterSpacing: '0.03em' }}>
                        Dieter Rams
                    </div>
                </Reveal>

                {release.tag && (
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
                                    background: 'rgba(250,249,245,0.1)',
                                    boxShadow: 'inset 0 0 0 0.5px rgba(253,241,184,0.32)',
                                }}>
                                <span
                                    style={{ width: 6, height: 6, borderRadius: '50%', background: PW.notes.yellow.bg }}
                                />
                                {release.isBeta ? `PUBLIC BETA · ${release.tag}` : release.tag}
                            </span>
                            {release.isBeta && (
                                <span style={{ fontSize: 13, opacity: 0.55 }}>Beta build. Expect rough edges.</span>
                            )}
                        </div>
                    </Reveal>
                )}

                <Reveal delay={200}>
                    <div id="pw-pricing" style={{ marginTop: release.tag ? 28 : 64, scrollMarginTop: 96 }}>
                        <h2
                            className="m-0 mb-5 uppercase"
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: PW.notes.yellow.bg,
                            }}>
                            Pricing
                        </h2>
                        <div className="flex flex-col md:flex-row gap-5 items-stretch">
                            <TierCard
                                name="Free"
                                chip={<Chip lit>AVAILABLE NOW</Chip>}
                                price={<PriceLine amount="$0" note="free forever, no account needed" />}
                                summary="The whole app, yours to keep. Sync through a cloud folder you already have."
                                points={FREE_FEATURES}>
                                <FreeDownload os={os} release={release} />
                            </TierCard>
                            <TierCard
                                name="Pro"
                                chip={
                                    <Chip lit={!!PRO_CHECKOUT_URL}>
                                        {PRO_CHECKOUT_URL ? 'AVAILABLE NOW' : 'COMING SOON'}
                                    </Chip>
                                }
                                price={
                                    founding ? (
                                        <>
                                            <PriceLine
                                                amount={`$${FOUNDING_OFFER.priceUsd}/yr`}
                                                struck={`$${PRO_PRICE_USD}/yr`}
                                                note="billed yearly, USD"
                                            />
                                            <div style={{ marginTop: 10 }}>
                                                <Chip lit>FOUNDING RATE · LOCKED FOR LIFE</Chip>
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 12.5,
                                                    opacity: 0.55,
                                                    marginTop: 8,
                                                    lineHeight: 1.5,
                                                }}>
                                                First {FOUNDING_OFFER.buyerCap} buyers or {FOUNDING_OFFER.durationDays}{' '}
                                                days after launch, whichever comes first.
                                            </div>
                                        </>
                                    ) : (
                                        <PriceLine amount={`$${PRO_PRICE_USD}/yr`} note="billed yearly, USD" />
                                    )
                                }
                                summary="We run the sync for you, and keep a month of every note's history."
                                points={PRO_FEATURES}>
                                <ProCheckout />
                            </TierCard>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={280}>
                    <div
                        id="pw-all-downloads"
                        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
                        style={{ marginTop: 36, scrollMarginTop: 96 }}>
                        <span style={{ fontSize: 13, opacity: 0.5 }}>All downloads:</span>
                        {PW_DOWNLOADS.map(d => {
                            const { href, size } = release.asset(d.id);
                            const label = d.os === 'mac' ? 'macOS' : d.label;
                            return (
                                <PWButton
                                    key={d.id}
                                    variant="onDarkGhost"
                                    size="sm"
                                    href={href}
                                    newTab
                                    ariaLabel={`Download PostWall for ${label}, ${d.detail}${size ? `, ${formatSize(size)}` : ''}`}>
                                    {label}
                                </PWButton>
                            );
                        })}
                        <a
                            href={release.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-[6px] hover:opacity-90"
                            style={{ fontSize: 13, opacity: 0.62, textDecoration: 'underline' }}>
                            All builds &amp; checksums
                            <ArrowIcon size={10} />
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
