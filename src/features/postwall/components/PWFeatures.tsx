import type { ReactNode } from 'react';

import { Reveal, SectionHead } from './PWPrimitives';
import { PW } from '../pwTokens';

function FeatureCard({ icon, title, body, delay }: { icon: ReactNode; title: string; body: string; delay: number }) {
    return (
        <Reveal delay={delay}>
            <div
                className="pw-card h-full"
                style={{
                    padding: '24px 22px',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: 14,
                    boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
                }}>
                <div
                    className="flex items-center justify-center"
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: PW.selected,
                        color: PW.ink,
                        marginBottom: 16,
                    }}>
                    {icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: PW.inkSoft }}>{body}</div>
            </div>
        </Reveal>
    );
}

function ic(path: ReactNode) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round">
            {path}
        </svg>
    );
}

/** Only what the shipped app does. Each line is checkable against postwall-ui. */
const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
    {
        icon: ic(<path d="M6 1.5h6M9 1.5v6M4.5 7.5h9l-1.5 4h-6z M9 11.5v5" />),
        title: 'Always on top',
        body: 'Pin any note and it floats above every other window. Unpin it and it behaves like a normal window again.',
    },
    {
        icon: ic(
            <>
                <circle cx="7" cy="8" r="4" />
                <path d="M10.5 11.5L15 16" />
            </>
        ),
        title: 'Search everything',
        body: 'Ctrl / ⌘ K searches every note’s title, text and tags. Start typing and the list narrows as you go.',
    },
    {
        icon: ic(<path d="M3 9l4 4 8-8" />),
        title: 'Tags, not folders',
        body: 'Up to three tags on a note instead of a folder tree. Click one to filter the wall down to it.',
    },
    {
        icon: ic(
            <>
                <rect x="1.5" y="1.5" width="15" height="15" rx="3" />
                <path d="M5 6.5h8M5 9.5h8M5 12.5h5" />
            </>
        ),
        title: 'Today, Pinned, Archived',
        body: 'The wall sorts itself into what you touched today, what you pinned, and what you have finished with.',
    },
    {
        icon: ic(
            <>
                <circle cx="9" cy="9" r="6.5" />
                <path d="M2.5 9h13M9 2.5a9 9 0 010 13M9 2.5a9 9 0 000 13" />
            </>
        ),
        title: 'Your own cloud',
        body: 'Free sync through a folder iCloud, Dropbox or Syncthing already syncs. No account, nothing hosted by us.',
    },
    {
        icon: ic(
            <>
                <circle cx="9" cy="9" r="6.5" />
                <path d="M9 5v4l2.5 2.5" />
            </>
        ),
        title: 'Version history (Pro)',
        body: 'Pro keeps 30 days of every note’s earlier versions. Open an earlier one and restore it in a click.',
    },
];

export default function PWFeatures() {
    return (
        <section
            id="pw-features"
            className="py-[110px] md:py-[140px]"
            style={{
                background: PW.sidebar,
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
                scrollMarginTop: 64,
            }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="Power, quietly"
                    title="Everything you need. Nothing you don't."
                    kicker="The features that matter to a daily user, and nothing that gets in the way."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map((f, i) => (
                        <FeatureCard key={f.title} {...f} delay={(i % 3) * 70 + Math.floor(i / 3) * 40} />
                    ))}
                </div>
            </div>
        </section>
    );
}
