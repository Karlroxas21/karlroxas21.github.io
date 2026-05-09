type ClassCell = [string, string, string] | null;

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const SCHEDULE: [string, ...ClassCell[]][] = [
    [
        '6:30',
        null,
        ['Strength', 'Coach Mio', 'strength'],
        null,
        ['Strength', 'Coach Mio', 'strength'],
        null,
        ['Hyrox', 'Coach Joy', 'cardio'],
        null,
    ],
    [
        '8:00',
        ['Mobility', 'Coach Pia', 'mobility'],
        null,
        ['Mobility', 'Coach Pia', 'mobility'],
        null,
        ['Mobility', 'Coach Pia', 'mobility'],
        ['Open Floor', '—', ''],
        ['Yoga', 'Coach Pia', 'mobility'],
    ],
    [
        '12:00',
        ['Boxing 101', 'Coach Rey', 'mma'],
        ['HIIT', 'Coach Joy', 'cardio'],
        ['Boxing 101', 'Coach Rey', 'mma'],
        ['HIIT', 'Coach Joy', 'cardio'],
        ['Boxing 101', 'Coach Rey', 'mma'],
        null,
        null,
    ],
    [
        '18:00',
        ['MMA Open Mat', 'Coach Rey', 'mma'],
        ['Strength', 'Coach Mio', 'strength'],
        ['BJJ', 'Coach Jen', 'mma'],
        ['Strength', 'Coach Mio', 'strength'],
        ['MMA Open Mat', 'Coach Rey', 'mma'],
        ['Bootcamp', 'Coach Joy', 'cardio'],
        null,
    ],
    [
        '19:30',
        ['Muay Thai', 'Coach Mio', 'mma'],
        ['Pickleball Clinic', 'Coach Tina', ''],
        ['Muay Thai', 'Coach Mio', 'mma'],
        ['Pick-up B-ball', '—', ''],
        ['Muay Thai', 'Coach Mio', 'mma'],
        null,
        null,
    ],
];

const CELL_CLASS: Record<string, string> = {
    mma: 'mmg-cell-mma',
    cardio: 'mmg-cell-cardio',
    strength: 'mmg-cell-strength',
    mobility: 'mmg-cell-mobility',
};

export default function MmgSchedule() {
    return (
        <section id="classes" style={{ padding: '96px 0', borderTop: '1px solid rgba(22,20,18,0.12)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                <div className="flex justify-between items-end flex-wrap gap-6" style={{ marginBottom: 32 }}>
                    <div>
                        <div
                            className="mmg-mono uppercase text-[#6b6259]"
                            style={{ fontSize: 11, letterSpacing: '2px' }}>
                            02 — Group classes
                        </div>
                        <h2
                            className="mmg-display"
                            style={{
                                fontSize: 'clamp(32px,4vw,56px)',
                                lineHeight: 1,
                                letterSpacing: '-1px',
                                margin: '8px 0 0',
                            }}>
                            This week <span className="mmg-serif">at MMG.</span>
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="mmg-page transition-colors"
                            style={{
                                padding: '8px 14px',
                                background: '#161412',
                                border: '1px solid #161412',
                                color: '#f4ede0',
                                fontSize: 11,
                                letterSpacing: '0.8px',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}>
                            This week
                        </button>
                        <button
                            className="mmg-page transition-colors"
                            style={{
                                padding: '8px 14px',
                                border: '1px solid rgba(22,20,18,0.25)',
                                background: 'transparent',
                                color: '#161412',
                                fontSize: 11,
                                letterSpacing: '0.8px',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}>
                            Next week
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '80px repeat(7, 1fr)',
                        border: '1px solid rgba(22,20,18,0.12)',
                        overflowX: 'auto',
                    }}>
                    {/* Header row */}
                    <div
                        className="mmg-mono uppercase text-[#6b6259]"
                        style={{
                            padding: '14px 12px',
                            fontSize: 10,
                            letterSpacing: '1.5px',
                            borderBottom: '1px solid rgba(22,20,18,0.12)',
                            borderRight: '1px solid rgba(22,20,18,0.12)',
                        }}
                    />
                    {DAYS.map((day, i) => (
                        <div
                            key={day}
                            className="mmg-mono uppercase text-[#6b6259]"
                            style={{
                                padding: '14px 12px',
                                fontSize: 10,
                                letterSpacing: '1.5px',
                                borderBottom: '1px solid rgba(22,20,18,0.12)',
                                borderRight: i < 6 ? '1px solid rgba(22,20,18,0.12)' : undefined,
                            }}>
                            {day}
                        </div>
                    ))}

                    {/* Schedule rows */}
                    {SCHEDULE.map((row, ri) => (
                        <>
                            <div
                                key={`time-${ri}`}
                                className="mmg-mono text-[#6b6259]"
                                style={{
                                    padding: '14px 12px',
                                    fontSize: 11,
                                    borderRight: '1px solid rgba(22,20,18,0.12)',
                                    borderBottom:
                                        ri < SCHEDULE.length - 1 ? '1px solid rgba(22,20,18,0.12)' : undefined,
                                }}>
                                {row[0]}
                            </div>
                            {(row.slice(1) as ClassCell[]).map((cell, ci) => (
                                <div
                                    key={`cell-${ri}-${ci}`}
                                    className={`cursor-pointer transition-colors ${cell?.[2] ? (CELL_CLASS[cell[2]] ?? '') : ''}`}
                                    style={{
                                        padding: 10,
                                        borderRight: ci < 6 ? '1px solid rgba(22,20,18,0.12)' : undefined,
                                        borderBottom:
                                            ri < SCHEDULE.length - 1 ? '1px solid rgba(22,20,18,0.12)' : undefined,
                                        minHeight: 64,
                                    }}>
                                    {cell && (
                                        <>
                                            <div
                                                className="mmg-display"
                                                style={{ fontSize: 12, letterSpacing: '-0.2px', lineHeight: 1.1 }}>
                                                {cell[0]}
                                            </div>
                                            <div
                                                className="mmg-coach mmg-mono uppercase text-[#6b6259]"
                                                style={{ fontSize: 10, letterSpacing: '1px', marginTop: 4 }}>
                                                {cell[1]}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
}
