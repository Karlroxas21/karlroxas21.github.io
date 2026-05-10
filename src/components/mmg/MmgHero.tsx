import { Link } from 'react-router-dom';

const STATS = [
    { value: '3', label: 'indoor courts' },
    { value: '15+', label: 'weekly classes' },
    { value: '12', label: 'certified coaches' },
    { value: '800+', label: 'active members' },
];

export default function MmgHero() {
    return (
        <section
            className="relative overflow-hidden text-[#f4ede0]"
            style={{ minHeight: 760, borderBottom: '1px solid rgba(22,20,18,0.12)' }}>
            <video
                className="absolute inset-0 z-0 w-full h-full object-cover"
                src="/video/mmg-stellar.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.13) 30%, rgba(0,0,0,0.60) 100%), linear-gradient(90deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0) 60%)',
                }}
            />

            <div className="relative z-[2] px-4 sm:px-14 pt-16 sm:pt-[120px] pb-12 sm:pb-24">
                <div
                    className="uppercase text-[#f4ede0]"
                    style={{
                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                        fontSize: 11,
                        letterSpacing: '2px',
                        opacity: 0.85,
                        marginBottom: 24,
                    }}>
                    EST. 2026 · TAGUIG CITY
                </div>

                <h1
                    className="text-[#f4ede0] m-0"
                    style={{
                        fontFamily: "'Archivo Black', Helvetica, sans-serif",
                        fontSize: 'clamp(40px, 9vw, 144px)',
                        lineHeight: 0.92,
                        letterSpacing: '-2px',
                    }}>
                    Train hard.
                    <br />
                    Stay close.{' '}
                    <p
                        style={{
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: '0.95em',
                        }}>
                        stellar.
                    </p>
                </h1>

                <p
                    className="text-[#f4ede0]"
                    style={{ fontSize: 16, lineHeight: 1.5, marginTop: 24, maxWidth: '52ch', opacity: 0.9 }}>
                    MMG Stellar is a neighborhood gym for everyone — basketball, MMA, courts, classes, and a coaching
                    team that knows your name.
                </p>

                <div className="flex gap-3 flex-wrap" style={{ marginTop: 28 }}>
                    <Link
                        to="#membership"
                        className="inline-flex items-center no-underline transition-colors"
                        style={{
                            padding: '12px 18px',
                            background: '#b94e2a',
                            border: '1px solid #b94e2a',
                            color: '#f4ede0',
                            fontSize: 13,
                            letterSpacing: '0.8px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            fontFamily: 'Manrope, Helvetica, sans-serif',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = '#8a3a1f';
                            (e.currentTarget as HTMLElement).style.borderColor = '#8a3a1f';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = '#b94e2a';
                            (e.currentTarget as HTMLElement).style.borderColor = '#b94e2a';
                        }}>
                        Become a member
                    </Link>
                    <Link
                        to="#courts"
                        className="inline-flex items-center no-underline transition-colors"
                        style={{
                            padding: '12px 18px',
                            border: '1px solid rgba(244,237,224,0.7)',
                            color: '#f4ede0',
                            fontSize: 13,
                            letterSpacing: '0.8px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            fontFamily: 'Manrope, Helvetica, sans-serif',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = '#f4ede0';
                            (e.currentTarget as HTMLElement).style.color = '#161412';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = '#f4ede0';
                        }}>
                        Reserve a court →
                    </Link>
                </div>

                <div
                    className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 uppercase text-[#f4ede0]"
                    style={{
                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                        marginTop: 64,
                        fontSize: 11,
                        letterSpacing: '1.5px',
                        opacity: 0.85,
                    }}>
                    {STATS.map(({ value, label }) => (
                        <div key={label}>
                            <strong
                                className="block text-[#f4ede0]"
                                style={{
                                    fontFamily: "'Archivo Black', Helvetica, sans-serif",
                                    fontSize: 22,
                                    letterSpacing: '-0.5px',
                                    marginBottom: 4,
                                }}>
                                {value}
                            </strong>
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
