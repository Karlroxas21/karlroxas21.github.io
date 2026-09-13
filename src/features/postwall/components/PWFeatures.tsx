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
                        background: PW.accentSoft,
                        color: PW.accent,
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

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
    {
        icon: ic(<path d="M6 1.5h6M9 1.5v6M4.5 7.5h9l-1.5 4h-6z M9 11.5v5" />),
        title: 'Always on top',
        body: 'Pin any note so it floats above your work. Or roll it up to a single line and dock it in a corner.',
    },
    {
        icon: ic(
            <>
                <circle cx="9" cy="9" r="6.5" />
                <path d="M9 5v4l2.5 2.5" />
            </>
        ),
        title: 'Due dates & reminders',
        body: "Mark a note with a date and it surfaces itself when you need it. Natural language: 'fri 4pm'.",
    },
    {
        icon: ic(
            <>
                <circle cx="7" cy="8" r="4" />
                <path d="M10.5 11.5L15 16" />
            </>
        ),
        title: 'Search everything',
        body: '⌘K opens a fuzzy search across every note and every tag. Start typing, the wall narrows as you go.',
    },
    {
        icon: ic(<path d="M3 9l4 4 8-8" />),
        title: 'Tags, not folders',
        body: 'Color-coded tags instead of a folder tree. A note carries as many as it needs, and none if it does not.',
    },
    {
        icon: ic(
            <>
                <rect x="1.5" y="1.5" width="15" height="15" rx="3" />
                <path d="M5 9h8M9 5v8" />
            </>
        ),
        title: 'Global quick capture',
        body: '⌘⇧N anywhere on your system. PostWall slides down from the menu bar, you type, it tucks itself back.',
    },
    {
        icon: ic(<path d="M3 6l6 6 6-6" />),
        title: 'Roll-up',
        body: 'Collapse any note to a single-line title bar that lives on your desktop. Click to expand.',
    },
    {
        icon: ic(
            <>
                <circle cx="9" cy="9" r="6.5" />
                <path d="M2.5 9h13M9 2.5a9 9 0 010 13M9 2.5a9 9 0 000 13" />
            </>
        ),
        title: 'Your own cloud',
        body: 'Keep the notes folder in iCloud, Dropbox or Syncthing. Hosted sync you can sign in to is in the works.',
    },
];

export default function PWFeatures() {
    return (
        <section
            id="pw-features"
            className="py-[110px] md:py-[140px]"
            style={{
                background: '#f3efe5',
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
                scrollMarginTop: 64,
            }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="Power, quietly"
                    title="Everything you need. Nothing you don't."
                    kicker="The features that matter to a daily user, hidden behind one tasteful keystroke each."
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
