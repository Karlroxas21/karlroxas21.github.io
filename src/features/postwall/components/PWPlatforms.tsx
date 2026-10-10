import { useRef, type ReactNode } from 'react';

import { Reveal, SectionHead } from './PWPrimitives';
import { useScrollProgress } from '../hooks/use-scroll-progress';
import { PW } from '../pwTokens';

type Platform = 'mac' | 'win' | 'linux';

/** Only what ships in the release assets. No notarization, no Intel build, no AppImage/Flatpak. */
const SUBTITLE: Record<Platform, string> = {
    mac: 'Apple Silicon (M1 and later), .dmg installer.',
    win: 'x64, .exe installer.',
    linux: '.deb for Debian and Ubuntu, .rpm for Fedora and RHEL.',
};

/**
 * Real captures of the app's note window (the launch reel's, postwall-ui videos/…/assets/cap), so
 * the page shows the window exactly as it ships rather than a drawing of it.
 */
const CAPTURE: Record<Platform, { src: string; alt: string }> = {
    mac: { src: '/postwall/note-pinned.webp', alt: 'A yellow PostWall note, "Launch week", with a checklist' },
    win: { src: '/postwall/note-standup.webp', alt: 'A blue PostWall note, "Standup", with a bulleted list' },
    linux: { src: '/postwall/note-groceries.webp', alt: 'A green PostWall note, "Groceries", with a bulleted list' },
};

function PlatformCard({
    platform,
    label,
    eyebrow,
    lag,
    delay,
}: {
    platform: Platform;
    label: string;
    eyebrow: string;
    /** px the card lags behind the scroll — the middle card sits "closer" and moves more. */
    lag: number;
    delay: number;
}) {
    const capture = CAPTURE[platform];
    return (
        <Reveal delay={delay} className="flex-1 min-w-0 flex flex-col gap-[18px]">
            <div
                className="pw-parallax relative"
                style={{
                    filter: 'drop-shadow(0 18px 36px rgba(40,30,20,0.22)) drop-shadow(0 2px 4px rgba(40,30,20,0.10))',
                    transform: `translate3d(0, calc((0.5 - var(--p, 0.5)) * ${lag}px * var(--pw-depth, 1)), 0)`,
                    willChange: 'transform',
                }}>
                <img
                    src={capture.src}
                    alt={capture.alt}
                    width={600}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto"
                />
            </div>
            <div>
                <div
                    className="uppercase mb-1"
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: PW.inkSoft,
                        letterSpacing: '0.06em',
                    }}>
                    {eyebrow}
                </div>
                <div
                    className="mb-1"
                    style={{ fontSize: 18, fontWeight: 600, color: PW.ink, letterSpacing: '-0.015em' }}>
                    {label}
                </div>
                <div style={{ fontSize: 13.5, color: PW.inkSoft, lineHeight: 1.5 }}>{SUBTITLE[platform]}</div>
            </div>
        </Reveal>
    );
}

function StripItem({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
    return (
        <div className="flex items-center gap-3 flex-1">
            <div
                className="grid place-items-center shrink-0"
                style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: PW.selected,
                }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 12.5, color: PW.inkSoft }}>{body}</div>
            </div>
        </div>
    );
}

export default function PWPlatforms() {
    const section = useRef<HTMLElement>(null);
    useScrollProgress(section, { reduced: 0.5 });

    const stroke = {
        fill: 'none' as const,
        stroke: PW.ink,
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    };
    return (
        <section ref={section} id="pw-platforms" className="py-[110px] md:py-[140px]" style={{ scrollMarginTop: 64 }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="One app · three OSes"
                    title="Same notes, whichever desk you sit at."
                    kicker="One app for macOS, Windows and Linux. The same note window, the same wall, the same shortcuts, so switching machines changes nothing."
                />
                <div className="flex flex-col lg:flex-row gap-7 items-stretch">
                    <PlatformCard platform="mac" label="macOS" eyebrow="01 · Mac" lag={30} delay={0} />
                    <PlatformCard platform="win" label="Windows" eyebrow="02 · Windows" lag={90} delay={90} />
                    <PlatformCard platform="linux" label="Linux" eyebrow="03 · Linux" lag={30} delay={180} />
                </div>

                <Reveal delay={120}>
                    <div
                        className="mt-14 flex flex-col md:flex-row gap-6 p-[22px] rounded-[14px]"
                        style={{
                            background: 'rgba(255,255,255,0.6)',
                            boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
                        }}>
                        <StripItem
                            icon={
                                <svg width="18" height="18" viewBox="0 0 18 18" {...stroke}>
                                    <path d="M9 2v14M2 9h14M9 2a7 7 0 010 14M9 2a7 7 0 000 14" />
                                </svg>
                            }
                            title="Bring your own cloud"
                            body="Point sync at a folder iCloud, Dropbox or Syncthing already syncs. Or let Pro host it."
                        />
                        <div className="hidden md:block" style={{ width: 0.5, background: PW.hairlineStrong }} />
                        <StripItem
                            icon={
                                <svg width="18" height="18" viewBox="0 0 18 18" {...stroke}>
                                    <path d="M3 14V6l6-3 6 3v8M3 14l6 3 6-3M9 17V8" />
                                </svg>
                            }
                            title="Works offline"
                            body="Every note is saved on your machine first. Sync is optional, never required."
                        />
                        <div className="hidden md:block" style={{ width: 0.5, background: PW.hairlineStrong }} />
                        <StripItem
                            icon={
                                <svg width="18" height="18" viewBox="0 0 18 18" {...stroke}>
                                    <path d="M9 1v3M9 14v3M1 9h3M14 9h3M3.3 3.3l2.1 2.1M12.6 12.6l2.1 2.1M3.3 14.7l2.1-2.1M12.6 5.4l2.1-2.1" />
                                </svg>
                            }
                            title="One download"
                            body="Free and Pro are the same app. A Pro license key unlocks hosted sync inside it."
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
