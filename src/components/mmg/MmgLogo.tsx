export default function MmgLogo({ size = 38, invert = false }: { size?: number; invert?: boolean }) {
    const h = Math.round((size * 230) / 200);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 230"
            fill="none"
            width={size}
            height={h}
            style={invert ? { filter: 'invert(1)' } : undefined}>
            <path
                d="M14 12 L48 12 L48 22 L72 22 L72 12 L128 12 L128 22 L152 22 L152 12 L186 12 L186 130 Q186 178 100 222 Q14 178 14 130 Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M22 20 L52 20 L52 30 L68 30 L68 20 L132 20 L132 30 L148 30 L148 20 L178 20 L178 128 Q178 172 100 212 Q22 172 22 128 Z"
                fill="none"
                stroke="#fefcf6"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
            <g fill="#fefcf6">
                <path d="M48 50 L50.4 56 L56.6 56.4 L51.7 60.3 L53.5 66.4 L48 62.9 L42.5 66.4 L44.3 60.3 L39.4 56.4 L45.6 56 Z" />
                <path d="M152 50 L154.4 56 L160.6 56.4 L155.7 60.3 L157.5 66.4 L152 62.9 L146.5 66.4 L148.3 60.3 L143.4 56.4 L149.6 56 Z" />
                <text
                    x="100"
                    y="64"
                    textAnchor="middle"
                    style={{
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 900,
                        fontSize: 22,
                        letterSpacing: '0.5px',
                    }}>
                    TEAM
                </text>
                <text
                    x="100"
                    y="90"
                    textAnchor="middle"
                    style={{
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 900,
                        fontSize: 17,
                        letterSpacing: '0.3px',
                    }}>
                    METRO MUSCLES
                </text>
            </g>
            <rect x="28" y="100" width="144" height="92" fill="#fefcf6" />
            <text
                x="100"
                y="172"
                textAnchor="middle"
                fill="currentColor"
                style={{
                    fontFamily: "Helvetica, 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 76,
                    letterSpacing: '-2px',
                }}>
                MMG
            </text>
        </svg>
    );
}
