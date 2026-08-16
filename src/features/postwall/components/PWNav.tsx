import { PW } from '../pwTokens';

export default function PWNav() {
    return (
        <nav
            className="sticky top-0 z-50"
            style={{
                background: 'rgba(250,248,243,0.82)',
                backdropFilter: 'blur(20px) saturate(160%)',
                WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                borderBottom: '0.5px solid ' + PW.hairline,
            }}>
            <div className="max-w-[1180px] mx-auto px-8 py-[14px] flex items-center gap-7">
                <div className="flex items-center gap-[9px]">
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: PW.notes.butter.bg,
                            boxShadow: 'inset 0 0 0 0.5px ' + PW.notes.butter.edge,
                            fontSize: 13,
                            fontWeight: 700,
                            color: PW.notes.butter.ink,
                            transform: 'rotate(-4deg)',
                        }}>
                        P
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3 }}>PostWall</span>
                </div>
                <div
                    className="hidden md:flex gap-[22px]"
                    style={{ fontSize: 13.5, color: PW.inkSoft, fontWeight: 500 }}>
                    <a className="cursor-pointer hover:opacity-100" style={{ opacity: 0.85 }}>
                        Features
                    </a>
                    <a className="cursor-pointer hover:opacity-100" style={{ opacity: 0.85 }}>
                        The Wall
                    </a>
                    <a className="cursor-pointer hover:opacity-100" style={{ opacity: 0.85 }}>
                        Download
                    </a>
                    <a className="cursor-pointer hover:opacity-100" style={{ opacity: 0.85 }}>
                        Changelog
                    </a>
                    <a className="cursor-pointer hover:opacity-100" style={{ opacity: 0.85 }}>
                        Pricing
                    </a>
                </div>
                <div className="flex-1" />
                <a
                    className="hidden sm:inline cursor-pointer"
                    style={{ fontSize: 13.5, color: PW.inkSoft, fontWeight: 500 }}>
                    Sign in
                </a>
                <a
                    className="inline-flex items-center gap-1.5 cursor-pointer"
                    style={{
                        padding: '7px 14px',
                        borderRadius: 8,
                        background: PW.ink,
                        color: PW.paper,
                        fontSize: 13,
                        fontWeight: 600,
                    }}>
                    Get PostWall
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round">
                        <path d="M2 5h6M5 2l3 3-3 3" />
                    </svg>
                </a>
            </div>
        </nav>
    );
}
