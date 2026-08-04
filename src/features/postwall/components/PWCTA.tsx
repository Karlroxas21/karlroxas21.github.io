import { PW } from '../pwTokens';

export default function PWCTA() {
    return (
        <section
            className="relative overflow-hidden"
            style={{
                padding: '120px 32px',
                background: PW.ink,
                color: PW.paper,
            }}>
            <div className="max-w-[980px] mx-auto text-center relative">
                <div
                    style={{
                        fontFamily: PW.serif,
                        fontWeight: 400,
                        fontStyle: 'italic',
                        fontSize: 'clamp(36px, 5vw, 64px)',
                        lineHeight: 1.05,
                        letterSpacing: -1.2,
                        textWrap: 'balance',
                    }}>
                    &ldquo;Less, but better.&rdquo;
                </div>
                <div style={{ fontSize: 14, opacity: 0.55, marginTop: 16, letterSpacing: 0.4 }}>— Dieter Rams</div>

                <div
                    className="flex flex-col md:flex-row items-center gap-5 text-left"
                    style={{
                        marginTop: 56,
                        padding: 28,
                        borderRadius: 16,
                        background: 'rgba(255,255,255,0.06)',
                        boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.1)',
                    }}>
                    <div className="flex-1">
                        <div
                            style={{
                                fontFamily: PW.serif,
                                fontSize: 28,
                                fontWeight: 500,
                                letterSpacing: -0.5,
                                marginBottom: 6,
                            }}>
                            Try PostWall today.
                        </div>
                        <div style={{ fontSize: 14.5, opacity: 0.6, lineHeight: 1.5 }}>
                            Free forever for personal use. No account required. 2.8 MB. Quit anytime — your notes are
                            plain text on disk.
                        </div>
                    </div>
                    <a
                        className="inline-flex items-center gap-2 cursor-pointer"
                        style={{
                            padding: '13px 20px',
                            borderRadius: 11,
                            background: PW.paper,
                            color: PW.ink,
                            fontSize: 14.5,
                            fontWeight: 600,
                        }}>
                        Download for Mac
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 10 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round">
                            <path d="M2 5h6M5 2l3 3-3 3" />
                        </svg>
                    </a>
                    <a
                        className="inline-flex items-center gap-2 cursor-pointer"
                        style={{
                            padding: '13px 20px',
                            borderRadius: 11,
                            background: 'rgba(255,255,255,0.08)',
                            color: PW.paper,
                            fontSize: 14.5,
                            fontWeight: 600,
                            boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.18)',
                        }}>
                        All platforms
                    </a>
                </div>
            </div>
        </section>
    );
}
