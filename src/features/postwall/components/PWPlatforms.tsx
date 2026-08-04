import { Check, GnomeChrome, MacChrome, SectionHead, WinChrome } from './PWPrimitives';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

type Platform = 'mac' | 'win' | 'gnome';

const SAMPLES: Record<Platform, { title: string; body: string; items: string[] }> = {
    mac: {
        title: 'Apple Silicon',
        body: 'Native, signed, notarized. Stays out of your way.',
        items: ['M1, M2, M3, M4', 'Universal binary', 'Menu bar quick capture'],
    },
    win: {
        title: 'Windows 11',
        body: 'Mica-aware, sharp DPI, jumplist-friendly tray.',
        items: ['x64 & ARM64', 'MSIX + portable', 'Snap layouts'],
    },
    gnome: {
        title: 'GNOME & KDE',
        body: 'Real native packaging, no Electron sluggishness.',
        items: ['AppImage · .deb · .rpm', 'Flatpak', 'Wayland-native'],
    },
};

const SUBTITLE: Record<Platform, string> = {
    mac: 'Universal binary for Apple Silicon & Intel. Lives in your menu bar.',
    win: 'Tray-pinned, respects light/dark themes and Fluent acrylic.',
    gnome: 'AppImage, .deb and .rpm. Wayland-native. GNOME & KDE happy.',
};

const OS_LABEL: Record<Platform, string> = {
    mac: 'MACOS 14 +',
    win: 'WINDOWS 10 / 11',
    gnome: 'LINUX',
};

function PlatformNoteContent({ platform, color }: { platform: Platform; color: NoteColorKey }) {
    const c = noteColor(color);
    const s = SAMPLES[platform];
    return (
        <div
            style={{
                padding: '18px 20px',
                color: c.ink,
                fontFamily: PW.font,
                height: '100%',
                position: 'relative',
                backgroundImage: PW_GRAIN,
            }}>
            <div
                style={{
                    fontSize: 10.5,
                    fontFamily: PW.mono,
                    opacity: 0.55,
                    marginBottom: 8,
                    letterSpacing: 0.4,
                }}>
                {OS_LABEL[platform]}
            </div>
            <div
                style={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: -0.5,
                    marginBottom: 8,
                    lineHeight: 1.1,
                }}>
                {s.title}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>{s.body}</div>
            <div className="flex flex-col gap-1">
                {s.items.map((it, i) => (
                    <div key={i} className="flex items-start" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                        <Check checked ink={c.ink} edge={c.edge} />
                        <span>{it}</span>
                    </div>
                ))}
            </div>
            <div
                className="flex items-center gap-[5px]"
                style={{ position: 'absolute', bottom: 14, left: 20, right: 20 }}>
                {(Object.keys(PW.notes) as NoteColorKey[]).map(k => {
                    const cc = PW.notes[k];
                    const on = k === color;
                    return (
                        <div
                            key={k}
                            style={{
                                width: 11,
                                height: 11,
                                borderRadius: '50%',
                                background: cc.bg,
                                boxShadow: on
                                    ? '0 0 0 1.5px ' + c.ink + ', inset 0 0 0 0.5px ' + cc.edge
                                    : 'inset 0 0 0 0.5px ' + cc.edge,
                            }}
                        />
                    );
                })}
                <span className="flex-1" />
                <span style={{ fontSize: 10, fontFamily: PW.mono, opacity: 0.5 }}>saved</span>
            </div>
        </div>
    );
}

function PlatformCard({
    platform,
    label,
    color,
    accentText,
}: {
    platform: Platform;
    label: string;
    color: NoteColorKey;
    accentText: string;
}) {
    const Chrome = platform === 'mac' ? MacChrome : platform === 'win' ? WinChrome : GnomeChrome;
    const c = noteColor(color);
    return (
        <div className="flex-1 min-w-0 flex flex-col gap-[18px]">
            <div
                className="relative"
                style={{
                    aspectRatio: '4 / 5',
                    filter: 'drop-shadow(0 18px 36px rgba(40,30,20,0.22)) drop-shadow(0 2px 4px rgba(40,30,20,0.10))',
                }}>
                <Chrome title="Today" color={c} radius={platform === 'win' ? 8 : 14} pinned={platform === 'mac'}>
                    <PlatformNoteContent platform={platform} color={color} />
                </Chrome>
            </div>
            <div>
                <div
                    className="uppercase mb-1"
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: PW.accent,
                        letterSpacing: 0.6,
                    }}>
                    {accentText}
                </div>
                <div className="mb-1" style={{ fontSize: 18, fontWeight: 600, color: PW.ink, letterSpacing: -0.3 }}>
                    {label}
                </div>
                <div style={{ fontSize: 13.5, color: PW.inkSoft, lineHeight: 1.5 }}>{SUBTITLE[platform]}</div>
            </div>
        </div>
    );
}

function StripItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
    return (
        <div className="flex items-center gap-3 flex-1">
            <div
                className="grid place-items-center"
                style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: PW.accentSoft,
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
    const stroke = {
        fill: 'none' as const,
        stroke: PW.accent,
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    };
    return (
        <section className="py-[120px]">
            <div className="max-w-[1180px] mx-auto px-8">
                <SectionHead
                    eyebrow="One app · three OSes"
                    title="Native everywhere, identical nowhere."
                    kicker="PostWall feels like it was made by your platform. Title bars, font rendering, traffic lights, system menus — all where your hand expects them."
                />
                <div className="flex flex-col lg:flex-row gap-7 items-stretch">
                    <PlatformCard platform="mac" label="macOS" color="butter" accentText="01 — Cupertino" />
                    <PlatformCard platform="win" label="Windows 11" color="sky" accentText="02 — Redmond" />
                    <PlatformCard platform="gnome" label="GNOME / KDE" color="sage" accentText="03 — Linux" />
                </div>

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
                        title="End-to-end encrypted sync"
                        body="Your wall, every desktop, instantly — and only yours."
                    />
                    <div className="hidden md:block" style={{ width: 0.5, background: PW.hairline }} />
                    <StripItem
                        icon={
                            <svg width="18" height="18" viewBox="0 0 18 18" {...stroke}>
                                <path d="M3 14V6l6-3 6 3v8M3 14l6 3 6-3M9 17V8" />
                            </svg>
                        }
                        title="Plain-text on disk"
                        body="Markdown files in a folder you own. Quit anytime — your notes stay."
                    />
                    <div className="hidden md:block" style={{ width: 0.5, background: PW.hairline }} />
                    <StripItem
                        icon={
                            <svg width="18" height="18" viewBox="0 0 18 18" {...stroke}>
                                <path d="M9 1v3M9 14v3M1 9h3M14 9h3M3.3 3.3l2.1 2.1M12.6 12.6l2.1 2.1M3.3 14.7l2.1-2.1M12.6 5.4l2.1-2.1" />
                            </svg>
                        }
                        title="Tiny & native"
                        body="2.8 MB. Cold-start under 200 ms. No Electron, ever."
                    />
                </div>
            </div>
        </section>
    );
}
