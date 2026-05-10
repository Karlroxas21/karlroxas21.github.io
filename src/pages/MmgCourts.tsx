import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MmgNav from '../components/mmg/MmgNav';
import MmgChatbot from '../components/mmg/MmgChatbot';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SPORTS = [
    {
        id: 'pickleball',
        label: 'Pickleball',
        courts: ['Court 1', 'Court 2', 'Court 3'],
        info: '20 × 44 ft regulation. Paddles & balls available at front desk for ₱50.',
    },
    {
        id: 'badminton',
        label: 'Badminton',
        courts: ['Court 1', 'Court 2', 'Court 3'],
        info: 'Wood floor with regulation lines. Rackets ₱75 / shuttle pack ₱120.',
    },
    {
        id: 'basketball',
        label: 'Basketball',
        courts: ['Full Court'],
        info: 'Regulation full court (94 × 50 ft). Pick-up Tue/Thu 7pm — open court otherwise.',
    },
] as const;

type SportId = (typeof SPORTS)[number]['id'];

const SLOT_TIMES = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
];

function isBooked(sportId: string, dateOffset: number, court: string, time: string) {
    const seed = (sportId.length * 7 + dateOffset * 13 + court.length * 11 + parseInt(time) * 19) % 11;
    return seed < 4;
}

function dayLabel(d: Date) {
    return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
}
function dateLabel(d: Date) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Colors ────────────────────────────────────────────────────────────────────

const C = {
    bg: '#f4ede0',
    bg2: '#ece3d2',
    ink: '#161412',
    ink2: '#3d3833',
    ink3: '#6b6259',
    line: 'rgba(22,20,18,0.12)',
    lineStrong: 'rgba(22,20,18,0.25)',
    rust: '#b94e2a',
    moss: '#4d7c3a',
} as const;

// ─── Slot ──────────────────────────────────────────────────────────────────────

interface SlotKey {
    key: string;
    court: string;
    time: string;
    sport: string;
    day: string;
}

function Slot({ booked, selected, onClick }: { booked: boolean; selected: boolean; onClick: () => void }) {
    let bg = C.bg;
    let color = C.ink;
    let cursor = 'pointer';
    let dotColor = C.moss;

    if (booked) {
        bg = 'repeating-linear-gradient(135deg, transparent 0 8px, rgba(22,20,18,0.06) 8px 9px)';
        color = C.ink3;
        cursor = 'not-allowed';
        dotColor = C.ink3;
    } else if (selected) {
        bg = C.rust;
        color = C.bg;
        dotColor = C.bg;
    }

    return (
        <div
            onClick={onClick}
            style={{
                cursor,
                background: bg,
                color,
                borderBottom: `1px solid ${C.line}`,
                borderRight: `1px solid ${C.line}`,
                padding: '14px 16px',
                minHeight: 56,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'background 0.15s',
            }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
            <span style={{ fontSize: 13 }}>{booked ? 'Booked' : selected ? 'Selected' : 'Available'}</span>
            <span
                style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: '1px',
                    opacity: 0.6,
                    marginLeft: 'auto',
                }}>
                60 MIN
            </span>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MmgCourts() {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const initialSport = (params.get('sport') as SportId) || 'pickleball';

    const [sportId, setSportId] = useState<SportId>(initialSport);
    const [dateOffset, setDateOffset] = useState(0);
    const [weekOffset, setWeekOffset] = useState(0);
    const [selected, setSelected] = useState<SlotKey[]>([]);
    const [memberType, setMemberType] = useState<'member' | 'walkin'>('member');
    const [confirmed, setConfirmed] = useState(false);

    const sport = SPORTS.find(s => s.id === sportId) || SPORTS[0];

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + weekOffset * 7);

    const days = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            return d;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startOfWeek.getTime()]);

    function toggleSlot(court: string, time: string) {
        if (isBooked(sport.id, dateOffset + weekOffset * 7, court, time)) return;
        const key = `${court}|${time}`;
        setSelected(prev =>
            prev.find(s => s.key === key)
                ? prev.filter(s => s.key !== key)
                : [...prev, { key, court, time, sport: sport.label, day: dateLabel(days[dateOffset]) }]
        );
        setConfirmed(false);
    }

    const ratePerSession = memberType === 'member' ? 200 : 250;
    const total = selected.length * ratePerSession;
    const padCount = 3 - sport.courts.length;

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#f4ede0',
                color: '#161412',
                fontFamily: "'Manrope', Helvetica, sans-serif",
                WebkitFontSmoothing: 'antialiased',
                fontSize: '15px',
                lineHeight: '1.5',
            }}>
            <MmgNav />

            <div
                style={{ minHeight: 'calc(100vh - 73px)' }}
                className="grid grid-cols-[1fr_380px] max-[1100px]:grid-cols-1">
                {/* ── Main ── */}
                <div
                    style={{ borderRight: `1px solid ${C.line}` }}
                    className="p-14 max-[1100px]:px-5 max-[1100px]:py-8">
                    <div
                        className="uppercase"
                        style={{
                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                            fontSize: 11,
                            letterSpacing: '2px',
                            color: C.ink3,
                        }}>
                        Reserve · Courts
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Archivo Black', Helvetica, sans-serif",
                            fontSize: 'clamp(40px,5vw,64px)',
                            lineHeight: 1,
                            letterSpacing: '-2px',
                            margin: '8px 0 8px',
                        }}>
                        Book your{' '}
                        <span
                            style={{
                                fontFamily: "'DM Serif Display', Georgia, serif",
                                fontStyle: 'italic',
                                fontWeight: 400,
                            }}>
                            court.
                        </span>
                    </h1>
                    <p style={{ fontSize: 18, color: C.ink2, marginBottom: 32 }}>
                        Live availability · pay on arrival or with the card on file. Free cancellation up to 2 hours
                        before your slot.
                    </p>

                    {/* Sport tabs */}
                    <div
                        style={{
                            display: 'flex',
                            border: `1px solid ${C.line}`,
                            marginBottom: 32,
                            overflowX: 'auto',
                            width: 'fit-content',
                            maxWidth: '100%',
                        }}>
                        {SPORTS.map(s => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setSportId(s.id);
                                    setSelected([]);
                                }}
                                style={{
                                    fontFamily: "'Archivo Black', Helvetica, sans-serif",
                                    background: s.id === sportId ? C.ink : 'transparent',
                                    color: s.id === sportId ? C.bg : C.ink,
                                    border: 'none',
                                    borderRight: `1px solid ${C.line}`,
                                    padding: '12px 24px',
                                    fontSize: 14,
                                    letterSpacing: '0.3px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                    ...(s.id === 'basketball' ? { borderRight: 'none' } : {}),
                                }}>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Court info */}
                    <div style={{ padding: 18, border: `1px solid ${C.line}`, marginBottom: 24, background: C.bg }}>
                        <div
                            className="uppercase"
                            style={{
                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                fontSize: 11,
                                letterSpacing: '1.5px',
                                color: C.ink3,
                                marginBottom: 8,
                            }}>
                            About this court
                        </div>
                        <p style={{ margin: 0, fontSize: 14 }}>{sport.info}</p>
                    </div>

                    {/* Date strip */}
                    <div style={{ overflowX: 'auto', margin: '24px 0 32px' }}>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '32px repeat(7, 1fr) 32px',
                                gap: 8,
                                alignItems: 'center',
                                minWidth: 480,
                            }}>
                            <button
                                onClick={() => setWeekOffset(w => w - 1)}
                                style={{
                                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    color: C.ink,
                                }}>
                                ‹
                            </button>
                            {days.map((d, i) => {
                                const isToday = i + weekOffset * 7 === 0;
                                const sel = i === dateOffset;
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setDateOffset(i)}
                                        style={{
                                            padding: '14px 8px',
                                            border: `1px solid ${sel ? C.ink : C.line}`,
                                            background: sel ? C.ink : C.bg,
                                            color: sel ? C.bg : C.ink,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.15s',
                                        }}>
                                        <div
                                            style={{
                                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                                fontSize: 10,
                                                letterSpacing: '1.5px',
                                                textTransform: 'uppercase',
                                                opacity: 0.6,
                                            }}>
                                            {dayLabel(d)}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "'Archivo Black', Helvetica, sans-serif",
                                                fontSize: 24,
                                                lineHeight: 1,
                                                marginTop: 4,
                                            }}>
                                            {d.getDate()}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                                fontSize: 9,
                                                letterSpacing: '1px',
                                                opacity: 0.5,
                                                marginTop: 4,
                                            }}>
                                            {isToday
                                                ? 'TODAY'
                                                : d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                                        </div>
                                    </div>
                                );
                            })}
                            <button
                                onClick={() => setWeekOffset(w => w + 1)}
                                style={{
                                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    color: C.ink,
                                }}>
                                ›
                            </button>
                        </div>
                    </div>

                    {/* Slot grid */}
                    <div style={{ overflowX: 'auto' }}>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `100px repeat(3, 1fr)`,
                                border: `1px solid ${C.line}`,
                                minWidth: 380,
                            }}>
                            {/* Header row */}
                            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", ...headStyle }}>
                                Time
                            </div>
                            {sport.courts.map(c => (
                                <div
                                    key={c}
                                    style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", ...headStyle }}>
                                    {c}
                                </div>
                            ))}
                            {Array.from({ length: padCount }).map((_, i) => (
                                <div
                                    key={`phd${i}`}
                                    style={{
                                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                        ...headStyle,
                                        opacity: 0.3,
                                    }}>
                                    —
                                </div>
                            ))}

                            {/* Time rows */}
                            {SLOT_TIMES.map(t => (
                                <>
                                    <div
                                        key={`t${t}`}
                                        style={{
                                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                            fontSize: 13,
                                            color: C.ink2,
                                            background: C.bg2,
                                            borderBottom: `1px solid ${C.line}`,
                                            borderRight: `1px solid ${C.line}`,
                                            padding: '14px 16px',
                                        }}>
                                        {t}
                                    </div>
                                    {sport.courts.map(c => (
                                        <Slot
                                            key={c + t}
                                            booked={isBooked(sport.id, dateOffset + weekOffset * 7, c, t)}
                                            selected={!!selected.find(s => s.key === `${c}|${t}`)}
                                            onClick={() => toggleSlot(c, t)}
                                        />
                                    ))}
                                    {Array.from({ length: padCount }).map((_, i) => (
                                        <div
                                            key={`ps${t}${i}`}
                                            style={{
                                                background: C.bg2,
                                                opacity: 0.2,
                                                borderBottom: `1px solid ${C.line}`,
                                                borderRight: `1px solid ${C.line}`,
                                                minHeight: 56,
                                            }}
                                        />
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div
                        className="flex flex-wrap gap-4 uppercase"
                        style={{
                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                            marginTop: 16,
                            fontSize: 10,
                            letterSpacing: '1px',
                            color: C.ink3,
                        }}>
                        {[
                            { label: 'Available', color: C.moss },
                            { label: 'Booked', color: C.ink3 },
                            { label: 'Your selection', color: C.rust },
                        ].map(({ label, color }) => (
                            <span key={label} className="flex items-center gap-1.5">
                                <span
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: color,
                                        display: 'inline-block',
                                    }}
                                />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <aside
                    style={{
                        padding: '40px 32px',
                        background: C.bg2,
                        top: 73,
                        overflowY: 'auto',
                    }}
                    className="sticky h-[calc(100vh-73px)] max-[1100px]:static max-[1100px]:h-auto">
                    <div
                        className="uppercase"
                        style={{
                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                            fontSize: 11,
                            letterSpacing: '2px',
                            color: C.ink3,
                        }}>
                        Your reservation
                    </div>
                    <h3
                        style={{
                            fontFamily: "'Archivo Black', Helvetica, sans-serif",
                            fontSize: 22,
                            letterSpacing: '-0.5px',
                            margin: '8px 0 24px',
                        }}>
                        {sport.label} · {dateLabel(days[dateOffset])}
                    </h3>

                    {selected.length === 0 ? (
                        <div style={{ padding: '32px 0', textAlign: 'center', color: C.ink3, fontStyle: 'italic' }}>
                            <p style={{ margin: '0 0 8px' }}>No slots selected.</p>
                            <p style={{ fontSize: 12, margin: 0 }}>Click a green slot in the grid →</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                {selected.map(s => (
                                    <div
                                        key={s.key}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '12px 0',
                                            borderBottom: `1px dashed ${C.lineStrong}`,
                                            fontSize: 14,
                                        }}>
                                        <span
                                            style={{
                                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                                fontSize: 11,
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                color: C.ink3,
                                            }}>
                                            {s.court} · {s.time}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                                fontSize: 13,
                                            }}>
                                            ₱{ratePerSession}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Rate toggle */}
                            <div style={{ marginTop: 24 }}>
                                <div
                                    className="uppercase"
                                    style={{
                                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                        fontSize: 11,
                                        letterSpacing: '2px',
                                        color: C.ink3,
                                        marginBottom: 8,
                                    }}>
                                    Rate
                                </div>
                                <div style={{ display: 'flex', border: `1px solid ${C.lineStrong}` }}>
                                    {(['member', 'walkin'] as const).map((type, i) => (
                                        <button
                                            key={type}
                                            onClick={() => setMemberType(type)}
                                            style={{
                                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                                flex: 1,
                                                padding: 10,
                                                border: 'none',
                                                borderLeft: i === 1 ? `1px solid ${C.lineStrong}` : 'none',
                                                background: memberType === type ? C.ink : 'transparent',
                                                color: memberType === type ? C.bg : C.ink,
                                                fontSize: 11,
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s',
                                            }}>
                                            {type === 'member' ? 'Member · ₱200' : 'Walk-in · ₱250'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    margin: '24px 0 16px',
                                }}>
                                <span
                                    className="uppercase"
                                    style={{
                                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                        fontSize: 11,
                                        letterSpacing: '1px',
                                        color: C.ink3,
                                    }}>
                                    Total · {selected.length} hr
                                </span>
                                <span
                                    style={{
                                        fontFamily: "'Archivo Black', Helvetica, sans-serif",
                                        fontSize: 40,
                                        letterSpacing: '-1px',
                                    }}>
                                    ₱{total.toLocaleString()}
                                </span>
                            </div>

                            {/* Confirm */}
                            <button
                                onClick={() => setConfirmed(true)}
                                style={{
                                    width: '100%',
                                    padding: '14px 22px',
                                    background: confirmed ? C.ink : C.rust,
                                    color: C.bg,
                                    border: 'none',
                                    fontSize: 13,
                                    letterSpacing: '0.8px',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    fontFamily: 'Manrope, Helvetica, sans-serif',
                                    cursor: 'pointer',
                                    marginBottom: 12,
                                    transition: 'background 0.15s',
                                }}>
                                {confirmed ? '✓ Reserved — see you soon' : 'Confirm reservation'}
                            </button>
                            <button
                                onClick={() => {
                                    setSelected([]);
                                    setConfirmed(false);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '14px 22px',
                                    background: 'transparent',
                                    color: C.ink,
                                    border: `1px solid ${C.line}`,
                                    fontSize: 13,
                                    letterSpacing: '0.8px',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    fontFamily: 'Manrope, Helvetica, sans-serif',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s',
                                }}>
                                Clear
                            </button>

                            {confirmed && (
                                <div
                                    style={{
                                        marginTop: 24,
                                        padding: 16,
                                        background: C.bg,
                                        border: `1px solid ${C.moss}`,
                                        fontSize: 13,
                                    }}>
                                    <strong
                                        style={{ fontFamily: "'Archivo Black', Helvetica, sans-serif", fontSize: 14 }}>
                                        You're set.
                                    </strong>
                                    <p style={{ margin: '8px 0 0', color: C.ink2 }}>
                                        Confirmation sent to your member email. Cancel free up to 2 hours before.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Help */}
                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.line}` }}>
                        <div
                            className="uppercase"
                            style={{
                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                fontSize: 11,
                                letterSpacing: '2px',
                                color: C.ink3,
                                marginBottom: 12,
                            }}>
                            Need help?
                        </div>
                        <p style={{ fontSize: 13, color: C.ink2, margin: 0 }}>
                            Front desk: +63 2 8855 1212
                            <br />
                            Or ask the chatbot ↘
                        </p>
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.line}` }}>
                        <Link
                            to="/mmg"
                            className="uppercase"
                            style={{
                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                fontSize: 11,
                                letterSpacing: '1px',
                                color: C.ink3,
                                textDecoration: 'none',
                            }}>
                            ← Back to home
                        </Link>
                    </div>
                </aside>
            </div>

            <MmgChatbot />
        </div>
    );
}

const headStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: C.ink3,
    background: C.bg2,
    borderBottom: `1px solid ${C.line}`,
    borderRight: `1px solid ${C.line}`,
    padding: '14px 16px',
};
