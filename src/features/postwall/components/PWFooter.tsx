import { Link } from 'react-router-dom';

import { useLatestRelease } from '../hooks/use-latest-release';
import { PW_RELEASES_URL, PW_REPO } from '../releases';
import { PW } from '../pwTokens';

export default function PWFooter() {
    const release = useLatestRelease();
    /** Only links that actually resolve. The changelog needs a resolved tag to point at. */
    const links: { label: string; href: string }[] = [
        { label: 'Releases', href: PW_RELEASES_URL },
        ...(release.tag ? [{ label: 'Changelog', href: release.pageUrl }] : []),
        { label: 'GitHub', href: PW_REPO },
    ];

    return (
        <footer style={{ padding: '40px 32px 30px', background: PW.ink, color: 'rgba(250,249,245,0.5)' }}>
            <div
                className="max-w-[1180px] mx-auto flex flex-wrap items-center gap-6"
                style={{
                    borderTop: '0.5px solid rgba(255,255,255,0.08)',
                    paddingTop: 28,
                    fontSize: 12.5,
                }}>
                <div className="flex items-center gap-[9px]">
                    <img src="/postwall/postwall-mark.svg" alt="" width={26} height={26} />
                    <span style={{ fontWeight: 600, color: PW.paper }}>PostWall</span>
                    <span>© 2026</span>
                </div>
                <div className="flex-1" />
                {links.map(l => (
                    <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer hover:opacity-80">
                        {l.label}
                    </a>
                ))}
                <Link to="/" className="hover:opacity-80">
                    Made by Karl Roxas
                </Link>
                {release.tag && (
                    <span style={{ fontFamily: PW.mono, fontSize: 11 }}>
                        {release.tag}
                        {release.isBeta ? ' beta' : ''}
                    </span>
                )}
            </div>
        </footer>
    );
}
