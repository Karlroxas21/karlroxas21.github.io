import { PW } from '../pwTokens';

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
                {['About', 'Privacy', 'Changelog', 'Press', 'Twitter', 'GitHub'].map(l => (
                    <a key={l} className="cursor-pointer hover:opacity-80">
                        {l}
                    </a>
                ))}
                <span style={{ opacity: 0.6, fontFamily: PW.mono, fontSize: 11 }}>v2.4.1 — May 2026</span>
            </div>
        </footer>
    );
}
