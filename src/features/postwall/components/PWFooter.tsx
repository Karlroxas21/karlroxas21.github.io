import { PW_RELEASES_URL, PW_REPO, PW_RELEASE_DATE, PW_VERSION } from '../releases';
import { PW } from '../pwTokens';

/** Only links that actually resolve today. A dead href reads worse than no link. */
const LINKS: { label: string; href?: string }[] = [
    { label: 'Releases', href: PW_RELEASES_URL },
    { label: 'Changelog', href: `${PW_RELEASES_URL}/tag/${PW_VERSION}` },
    { label: 'GitHub', href: PW_REPO },
];

export default function PWFooter() {
    return (
        <footer style={{ padding: '40px 32px 30px', background: PW.ink, color: 'rgba(250,248,243,0.5)' }}>
            <div
                className="max-w-[1180px] mx-auto flex flex-wrap items-center gap-6"
                style={{
                    borderTop: '0.5px solid rgba(255,255,255,0.08)',
                    paddingTop: 28,
                    fontSize: 12.5,
                }}>
                <div className="flex items-center gap-[9px]">
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            background: PW.notes.butter.bg,
                            color: PW.notes.butter.ink,
                            fontSize: 12,
                            fontWeight: 700,
                            transform: 'rotate(-4deg)',
                        }}>
                        P
                    </div>
                    <span style={{ fontWeight: 600, color: PW.paper }}>PostWall</span>
                    <span style={{ opacity: 0.6 }}>© 2026</span>
                </div>
                <div className="flex-1" />
                {LINKS.map(l => (
                    <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer hover:opacity-80">
                        {l.label}
                    </a>
                ))}
                <span style={{ opacity: 0.6, fontFamily: PW.mono, fontSize: 11 }}>
                    {PW_VERSION} beta — {PW_RELEASE_DATE}
                </span>
            </div>
        </footer>
    );
}
